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
  notes?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  honeypot?: string; // Bot trap
}

// In-memory timestamp cache to prevent duplicate rapid-fire submissions
const recentSubmissions = new Map<string, number>();

export async function submitWebsiteLead(
  data: WebsiteLeadSubmission
): Promise<{ success: boolean; message: string; leadId?: string }> {
  // 1. Anti-spam honeypot verification
  if (data.honeypot && data.honeypot.trim().length > 0) {
    // Silently succeed for bots
    return { success: true, message: "Thank you for reaching out." };
  }

  // 2. Validate essential fields
  const cleanName = (data.name || "").trim();
  const cleanMobile = (data.mobile || "").replace(/[^\d+]/g, "").trim();

  if (!cleanName || cleanName.length < 2) {
    return { success: false, message: "Please provide a valid full name." };
  }

  if (!cleanMobile || cleanMobile.length < 10) {
    return { success: false, message: "Please enter a valid 10-digit mobile number." };
  }

  // 3. De-duplicate: 1 minute rate-limit per mobile
  const now = Date.now();
  const lastSubmitTime = recentSubmissions.get(cleanMobile);
  if (lastSubmitTime && now - lastSubmitTime < 60000) {
    return {
      success: true,
      message: "We have already received your request. An advisor will message you shortly!",
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
  const propertyNote = data.propertyTitle ? `Interested in: ${data.propertyTitle}` : "";
  const campaignNote = data.utmCampaign ? `Campaign: ${data.utmCampaign}` : "";
  const tags = ["Website Lead", bhk];
  if (data.propertyTitle) tags.push("Direct Listing");

  const newLead = gharsetuStore.addLead({
    name: cleanName,
    mobile: cleanMobile,
    email: data.email || `${cleanName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
    bhk,
    budgetDisplay: data.budgetDisplay || "₹1.2 - ₹1.8 Cr",
    locality,
    city: "Pune",
    source: "Website",
    assignedAgent: "Sameer Khan",
    assignedAgentId: "agent-sameer",
    status: "New",
    scoreReason: "High-intent web inquiry requesting floor plans on WhatsApp",
    nextBestAction: "Dispatch verified brochure & floor plans via WhatsApp",
    tags,
  });

  return {
    success: true,
    message: "Floor plans and brochures dispatched on WhatsApp!",
    leadId: newLead.id,
  };
}
