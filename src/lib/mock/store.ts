import {
  INITIAL_LEADS,
  INITIAL_PROPERTIES,
  INITIAL_FOLLOW_UPS,
  INITIAL_SITE_VISITS,
  INITIAL_DEALS,
} from "./gharsetu";
import { Lead, Property, SiteVisit, Deal, FollowUpTask } from "@/types/real-estate";

const STORAGE_KEY = "gharsetu_crm_store_v1";

type Listener = () => void;

function mergeUniqueById<T extends { id: string }>(incoming: T[], base: T[]): T[] {
  const map = new Map<string, T>();
  for (const item of incoming) {
    map.set(item.id, item);
  }
  for (const item of base) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  }
  return Array.from(map.values());
}

// Browser & Node safe persistent reactive store for Gharsetu Real Estate CRM
class GharsetuStore {
  leads: Lead[] = [...INITIAL_LEADS];
  properties: Property[] = [...INITIAL_PROPERTIES];
  followUps: FollowUpTask[] = [...INITIAL_FOLLOW_UPS];
  siteVisits: SiteVisit[] = [...INITIAL_SITE_VISITS];
  deals: Deal[] = [...INITIAL_DEALS];

  private listeners = new Set<Listener>();
  private hydrated = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.hydrateFromStorage();
      window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY) {
          this.hydrated = false;
          this.hydrateFromStorage();
          this.emit();
        }
      });
    }
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error("Store listener error:", err);
      }
    });
  }

  hydrateFromStorage() {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.hydrated = true;
        return;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.leads)) {
        this.leads = mergeUniqueById(parsed.leads, INITIAL_LEADS);
      }
      if (Array.isArray(parsed.siteVisits)) {
        this.siteVisits = mergeUniqueById(parsed.siteVisits, INITIAL_SITE_VISITS);
      }
      if (Array.isArray(parsed.followUps)) {
        this.followUps = mergeUniqueById(parsed.followUps, INITIAL_FOLLOW_UPS);
      }
      if (Array.isArray(parsed.properties)) {
        this.properties = mergeUniqueById(parsed.properties, INITIAL_PROPERTIES);
      }
      if (Array.isArray(parsed.deals)) {
        this.deals = mergeUniqueById(parsed.deals, INITIAL_DEALS);
      }
      this.hydrated = true;
    } catch (err) {
      console.warn("Failed to hydrate Gharsetu store from localStorage:", err);
    }
  }

  private saveToStorage() {
    if (typeof window === "undefined") return;
    try {
      const payload = {
        leads: this.leads,
        siteVisits: this.siteVisits,
        followUps: this.followUps,
        properties: this.properties,
        deals: this.deals,
        updatedAt: Date.now(),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("Failed to persist Gharsetu store to localStorage:", err);
    }
  }

  /**
   * Syncs records from server API (/api/leads) into local store so bookings
   * submitted from any tab, device, or SSR boundary immediately appear.
   */
  async syncFromServer(): Promise<void> {
    if (typeof window === "undefined") return;
    this.hydrateFromStorage();
    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      let changed = false;

      if (Array.isArray(data.leads)) {
        this.leads = mergeUniqueById(data.leads, this.leads);
        changed = true;
      }
      if (Array.isArray(data.siteVisits)) {
        this.siteVisits = mergeUniqueById(data.siteVisits, this.siteVisits);
        changed = true;
      }
      if (Array.isArray(data.followUps)) {
        this.followUps = mergeUniqueById(data.followUps, this.followUps);
        changed = true;
      }

      if (changed) {
        this.saveToStorage();
        this.emit();
      }
    } catch (err) {
      console.warn("Background CRM sync skipped:", err);
    }
  }

  addLead(
    lead: Omit<Lead, "id" | "createdAt" | "score" | "heat"> & {
      id?: string;
      createdAt?: string;
      score?: number;
      heat?: Lead["heat"];
    }
  ) {
    this.hydrateFromStorage();
    const newLead: Lead = {
      ...lead,
      id: lead.id || `lead-${Date.now()}`,
      createdAt: lead.createdAt || new Date().toISOString(),
      score: lead.score ?? 82,
      heat: lead.heat ?? "Hot",
      tags: lead.tags || ["Website inquiry"],
    };
    this.leads = [newLead, ...this.leads.filter((l) => l.id !== newLead.id)];
    this.saveToStorage();
    this.emit();
    return newLead;
  }

  updateLeadStatus(leadId: string, status: Lead["status"]) {
    this.hydrateFromStorage();
    const lead = this.leads.find((l) => l.id === leadId);
    if (lead) {
      lead.status = status;
      this.saveToStorage();
      this.emit();
    }
  }

  addProperty(prop: Omit<Property, "id"> & { id?: string }) {
    this.hydrateFromStorage();
    const newProp: Property = {
      ...prop,
      id: prop.id || `prop-${Date.now()}`,
    };
    this.properties = [newProp, ...this.properties.filter((p) => p.id !== newProp.id)];
    this.saveToStorage();
    this.emit();
    return newProp;
  }

  addSiteVisit(visit: Omit<SiteVisit, "id"> & { id?: string }) {
    this.hydrateFromStorage();
    const newVisit: SiteVisit = {
      ...visit,
      id: visit.id || `visit-${Date.now()}`,
    };
    this.siteVisits = [newVisit, ...this.siteVisits.filter((v) => v.id !== newVisit.id)];
    this.saveToStorage();
    this.emit();
    return newVisit;
  }

  updateSiteVisit(visitId: string, updates: Partial<SiteVisit>) {
    this.hydrateFromStorage();
    this.siteVisits = this.siteVisits.map((v) =>
      v.id === visitId ? { ...v, ...updates } : v
    );
    this.saveToStorage();
    this.emit();
  }

  addFollowUp(task: Omit<FollowUpTask, "id"> & { id?: string }) {
    this.hydrateFromStorage();
    const newTask: FollowUpTask = {
      ...task,
      id: task.id || `task-${Date.now()}`,
    };
    this.followUps = [newTask, ...this.followUps.filter((t) => t.id !== newTask.id)];
    this.saveToStorage();
    this.emit();
    return newTask;
  }

  updateFollowUps(tasks: FollowUpTask[]) {
    this.followUps = tasks;
    this.saveToStorage();
    this.emit();
  }

  addDeal(deal: Omit<Deal, "id"> & { id?: string }) {
    this.hydrateFromStorage();
    const newDeal: Deal = {
      ...deal,
      id: deal.id || `deal-${Date.now()}`,
    };
    this.deals = [newDeal, ...this.deals.filter((d) => d.id !== newDeal.id)];
    this.saveToStorage();
    this.emit();
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
