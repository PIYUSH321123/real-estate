import { gharsetuStore } from "@/lib/mock/store";
import { FollowUpTask, Lead, SiteVisit } from "@/types/real-estate";

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

export interface LeadSubmissionResult {
  success: boolean;
  message: string;
  leadId?: string;
  visitId?: string;
  lead?: Lead;
  siteVisit?: SiteVisit;
  followUp?: FollowUpTask;
}

// In-memory rate limiting map (clean Mobile + inquiryType -> timestamp)
const recentSubmissions = new Map<string, number>();

/**
 * Core processor that validates and creates Lead + SiteVisit (if visit) + FollowUpTask
 * in the active GharsetuStore. Used on the server (/api/leads) and as client fallback.
 */
export function processWebsiteLead(data: WebsiteLeadSubmission): LeadSubmissionResult {
  // 1. Anti-spam honeypot verification
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return { success: true, message: "Thank you for reaching out." };
  }

  // 2. Validate essential fields
  const cleanName = (data.name || "").trim();
  let cleanMobile = (data.mobile || "").replace(/\D/g, "").trim();

  if (cleanMobile.length === 12 && cleanMobile.startsWith("91")) {
    cleanMobile = cleanMobile.slice(2);
  }

  if (!cleanName || cleanName.length < 2) {
    return { success: false, message: "Enter your full name." };
  }

  if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
    return { success: false, message: "Enter a valid 10-digit mobile number." };
  }

  // 3. De-duplicate rapid double-clicks (within 10 seconds for same phone + property)
  const inquiryType = data.inquiryType || "visit";
  const dedupeKey = `${cleanMobile}:${inquiryType}:${data.propertyId || "any"}`;
  const now = Date.now();
  const lastSubmitTime = recentSubmissions.get(dedupeKey);
  if (lastSubmitTime && now - lastSubmitTime < 10000) {
    return {
      success: true,
      message: `Thanks, ${cleanName.split(" ")[0]}. Your request is already registered in our CRM.`,
    };
  }
  recentSubmissions.set(dedupeKey, now);

  if (recentSubmissions.size > 200) {
    for (const [key, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > 3600000) {
        recentSubmissions.delete(key);
      }
    }
  }

  // 4. Resolve matched property metadata from store if available
  const matchedProp = gharsetuStore.properties.find(
    (p) => p.id === data.propertyId || p.slug === data.propertyId || p.title === data.propertyTitle
  );

  const propertyId = matchedProp?.id || data.propertyId || "skyline";
  const propertyTitle = matchedProp?.title || data.propertyTitle || "Skyline Heights";
  const locality = matchedProp?.locality || data.locality || "Baner";
  const bhk = matchedProp?.bhk || data.bhk || "3 BHK";
  const budgetDisplay = matchedProp?.priceDisplay || data.budgetDisplay || "₹1.45 Cr";
  const preferredDay = data.preferredDay || "This Saturday";

  const typeNote =
    inquiryType === "callback" ? "Requested Callback" : "Free Site Visit Booking";
  const utmNotes = [
    data.utmSource ? `utm_source=${data.utmSource}` : "",
    data.utmMedium ? `utm_medium=${data.utmMedium}` : "",
    data.utmCampaign ? `utm_campaign=${data.utmCampaign}` : "",
  ]
    .filter(Boolean)
    .join(" | ");

  const combinedNotes = [
    typeNote,
    `Selected Home: ${propertyTitle} (${locality})`,
    `Preferred Day: ${preferredDay}`,
    utmNotes,
    data.notes,
  ]
    .filter(Boolean)
    .join(" • ");

  const tags = [
    "Website",
    inquiryType === "callback" ? "Callback Request" : "Site Visit Booked",
    propertyTitle,
  ];
  if (bhk) tags.push(bhk);

  const formattedMobile = `+91 ${cleanMobile.slice(0, 5)} ${cleanMobile.slice(5)}`;
  const timestampStr = new Date().toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // 5. Register Lead in CRM
  const newLead = gharsetuStore.addLead({
    name: cleanName,
    mobile: formattedMobile,
    email: data.email || `${cleanName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
    bhk,
    budgetDisplay,
    locality,
    city: "Pune",
    source: "Website",
    assignedAgent: "Sameer Khan",
    assignedAgentId: "agent-sameer",
    status: inquiryType === "visit" ? "Site visit" : "New",
    score: inquiryType === "visit" ? 90 : 80,
    heat: "Hot",
    scoreReason:
      inquiryType === "visit"
        ? `Booked free AC cab site visit for ${propertyTitle} (${preferredDay})`
        : `Requested callback on website for ${propertyTitle}`,
    nextBestAction:
      inquiryType === "callback"
        ? "Call buyer back within 1 hour"
        : `Confirm AC cab pickup for ${propertyTitle} (${preferredDay}) on WhatsApp`,
    tags,
    notes: combinedNotes,
    activities: [
      {
        id: `act-${now}`,
        type: inquiryType === "visit" ? "visit" : "form",
        title:
          inquiryType === "visit"
            ? `Site visit booked: ${propertyTitle}`
            : `Callback requested: ${propertyTitle}`,
        description: combinedNotes,
        timestamp: `Today, ${timestampStr}`,
        operator: "Website Portal",
      },
    ],
  });

  // 6. If booking a site visit, register a SiteVisit in CRM Site Visits Schedule
  let newSiteVisit: SiteVisit | undefined;
  if (inquiryType === "visit") {
    newSiteVisit = gharsetuStore.addSiteVisit({
      leadId: newLead.id,
      leadName: cleanName,
      leadMobile: formattedMobile,
      propertyId,
      propertyTitle,
      locality,
      date: preferredDay,
      time: "11:00 AM",
      status: "Confirmed",
      agentName: "Sameer Khan",
      routeOrder: gharsetuStore.siteVisits.length + 1,
    });
  }

  // 7. Register an actionable FollowUpTask in CRM Dashboard & Follow-ups Desk
  const todayIso = new Date().toISOString().split("T")[0];
  const newFollowUp = gharsetuStore.addFollowUp({
    leadId: newLead.id,
    leadName: cleanName,
    task:
      inquiryType === "visit"
        ? `Confirm AC cab & visit for ${propertyTitle} (${preferredDay})`
        : `Call back ${cleanName} regarding ${propertyTitle} (${locality})`,
    agentName: "Sameer Khan",
    dueDate: todayIso,
    dueTime: "ASAP",
    status: "Due today",
    priority: "High",
  });

  return {
    success: true,
    message: `Thanks, ${cleanName.split(" ")[0]}. Your ${
      inquiryType === "callback" ? "call back" : "visit"
    } request is registered in our CRM. We will confirm on WhatsApp.`,
    leadId: newLead.id,
    visitId: newSiteVisit?.id,
    lead: newLead,
    siteVisit: newSiteVisit,
    followUp: newFollowUp,
  };
}

/**
 * Client-callable entry point: posts to /api/leads on the server AND persists
 * immediately into the browser's gharsetuStore + localStorage for instant CRM sync.
 */
export async function submitWebsiteLead(
  data: WebsiteLeadSubmission
): Promise<LeadSubmissionResult> {
  // Server-side direct execution
  if (typeof window === "undefined") {
    return processWebsiteLead(data);
  }

  // Browser execution: POST to /api/leads first so server memory/DB registers it too
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: json.error || "Please check your details and try again.",
      };
    }

    // Mirror exact server-created records into browser store + localStorage
    if (json.lead) {
      gharsetuStore.addLead(json.lead);
    }
    if (json.siteVisit) {
      gharsetuStore.addSiteVisit(json.siteVisit);
    }
    if (json.followUp) {
      gharsetuStore.addFollowUp(json.followUp);
    }

    return json as LeadSubmissionResult;
  } catch (err) {
    console.warn("API submission unreachable, saving locally to CRM store:", err);
    return processWebsiteLead(data);
  }
}
