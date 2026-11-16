import {
  INITIAL_LEADS,
  INITIAL_PROPERTIES,
  INITIAL_FOLLOW_UPS,
  INITIAL_SITE_VISITS,
  INITIAL_DEALS,
  INITIAL_SCORECARDS,
  INITIAL_SMART_MATCHES,
  INITIAL_CO_BROKING,
  INITIAL_DOCUMENTS,
  INITIAL_REFERRALS,
  INITIAL_NOTIFICATIONS,
  GHARSETU_USER,
} from "./gharsetu";
import { Lead, Property, SiteVisit, Deal, FollowUpTask } from "@/types/real-estate";

// Browser & Node safe reactive store for Gharsetu Real Estate CRM
class GharsetuStore {
  leads: Lead[] = [...INITIAL_LEADS];
  properties: Property[] = [...INITIAL_PROPERTIES];
  followUps: FollowUpTask[] = [...INITIAL_FOLLOW_UPS];
  siteVisits: SiteVisit[] = [...INITIAL_SITE_VISITS];
  deals: Deal[] = [...INITIAL_DEALS];

  addLead(lead: Omit<Lead, "id" | "createdAt" | "score" | "heat">) {
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      score: 75,
      heat: "Warm",
      tags: lead.tags || ["New inquiry"],
    };
    this.leads.unshift(newLead);
    return newLead;
  }

  updateLeadStatus(leadId: string, status: Lead["status"]) {
    const lead = this.leads.find((l) => l.id === leadId);
    if (lead) {
      lead.status = status;
    }
  }

  addProperty(prop: Omit<Property, "id">) {
    const newProp: Property = {
      ...prop,
      id: `prop-${Date.now()}`,
    };
    this.properties.unshift(newProp);
    return newProp;
  }

  addSiteVisit(visit: Omit<SiteVisit, "id">) {
    const newVisit: SiteVisit = {
      ...visit,
      id: `visit-${Date.now()}`,
    };
    this.siteVisits.push(newVisit);
    return newVisit;
  }

  addDeal(deal: Omit<Deal, "id">) {
    const newDeal: Deal = {
      ...deal,
      id: `deal-${Date.now()}`,
    };
    this.deals.unshift(newDeal);
    return newDeal;
  }
}

declare const globalThis: {
  gharsetuStore?: GharsetuStore;
} & typeof global;

export const gharsetuStore = globalThis.gharsetuStore ?? new GharsetuStore();
if (process.env.NODE_ENV !== "production") {
  globalThis.gharsetuStore = gharsetuStore;
}
