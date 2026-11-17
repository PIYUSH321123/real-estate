import { gharsetuStore } from "@/lib/mock/store";
import { Lead } from "@/types/real-estate";

export interface WebsiteLeadSubmission {
  name: string;
  mobile: string;
  email?: string;
  bhk?: string;
  budgetDisplay?: string;
  locality?: string;
  propertyTitle?: string;
  propertyId?: string;
  preferredDay?: string;
  inquiryType?: "visit" | "callback" | "general";
  notes?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  honeypot?: string; // Hidden spam trap
}

// In-memory rate limiting map (clean Mobile -> timestamp)
const recentSubmissions = new Map<string, number>();

export async function submitWebsiteLead(
  data: WebsiteLeadSubmission
): Promise<{ success: boolean; message: string; leadId?: string }> {
  // 1. Anti-spam honeypot verification
  if (data.honeypot && data.honeypot.trim().length > 0) {
    // Silently return success to bot without saving
    return { success: true, message: "Thank you for reaching out." };
  }

  // 2. Validate essential fields
  const cleanName = (data.name || "").trim();
  let cleanMobile = (data.mobile || "").replace(/\D/g, "").trim();

  // Handle +91 or 91 country code prefix for Indian numbers
  if (cleanMobile.length === 12 && cleanMobile.startsWith("91")) {
    cleanMobile = cleanMobile.slice(2);
  }

  if (!cleanName || cleanName.length < 2) {
    return { success: false, message: "Enter your full name." };
  }

  if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
    return { success: false, message: "Enter a valid 10-digit mobile number." };
  }

  // 3. De-duplicate rapid submissions (within 60 seconds)
  const now = Date.now();
  const lastSubmitTime = recentSubmissions.get(cleanMobile);
  if (lastSubmitTime && now - lastSubmitTime < 60000) {
    return {
      success: true,
      message: `Thanks, ${cleanName.split(" ")[0]}. Your request is noted. We will confirm on WhatsApp.`,
    };
  }
  recentSubmissions.set(cleanMobile, now);

  // 4. Clean up stale keys in rate-limit map
  if (recentSubmissions.size > 200) {
    for (const [phone, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > 3600000) {
        recentSubmissions.delete(phone);
      }
    }
  }

  // 5. Build CRM Lead record
  const locality = data.locality || "Baner, Pune";
  const bhk = data.bhk || "3 BHK";
  const propertyNote = data.propertyTitle ? `Selected Home: ${data.propertyTitle}` : "";
  const dayNote = data.preferredDay ? `Preferred Day: ${data.preferredDay}` : "";
  const typeNote = data.inquiryType === "callback" ? "Requested Callback" : "Free Site Visit Booking";
  const utmNotes = [
    data.utmSource ? `Source: ${data.utmSource}` : "",
    data.utmMedium ? `Medium: ${data.utmMedium}` : "",
    data.utmCampaign ? `Campaign: ${data.utmCampaign}` : "",
  ].filter(Boolean).join(" | ");

  const combinedNotes = [typeNote, propertyNote, dayNote, utmNotes, data.notes]
    .filter(Boolean)
    .join(" • ");

  const tags = ["Website", data.inquiryType === "callback" ? "Callback Request" : "Site Visit Request"];
  if (data.propertyTitle) tags.push(data.propertyTitle);
  if (data.bhk) tags.push(data.bhk);

  const newLead = gharsetuStore.addLead({
    name: cleanName,
    mobile: `+91 ${cleanMobile}`,
    email: data.email || `${cleanName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
    bhk,
    budgetDisplay: data.budgetDisplay || "₹82 L - ₹1.45 Cr",
    locality,
    city: "Pune",
    source: "Website",
    assignedAgent: "Sameer Khan",
    assignedAgentId: "agent-sameer",
    status: "New",
    scoreReason: "High-intent website lead from landing page with direct home selection",
    nextBestAction: data.inquiryType === "callback" ? "Call buyer back within 1 hour" : "Confirm private cab slot on WhatsApp",
    tags,
    notes: combinedNotes,
  });

  return {
    success: true,
    message: `Thanks, ${cleanName.split(" ")[0]}. Your ${data.inquiryType === "callback" ? "call back" : "visit"} request is noted. We will confirm on WhatsApp.`,
    leadId: newLead.id,
  };
}
