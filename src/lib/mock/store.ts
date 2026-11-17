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

interface GharsetuData {
  leads: Lead[];
  properties: Property[];
  followUps: FollowUpTask[];
  siteVisits: SiteVisit[];
  deals: Deal[];
  listeners: Set<Listener>;
  storageListenerAttached?: boolean;
}

function mergeUniqueById<T extends { id: string }>(incoming: unknown[], base: T[]): T[] {
  const map = new Map<string, T>();
  if (Array.isArray(incoming)) {
    for (const raw of incoming) {
      const item = raw as T | null | undefined;
      if (item && typeof item === "object" && typeof item.id === "string" && item.id) {
        map.set(item.id, item);
      }
    }
  }
  if (Array.isArray(base)) {
    for (const item of base) {
      if (item && typeof item === "object" && typeof item.id === "string" && !map.has(item.id)) {
        map.set(item.id, item);
      }
    }
  }
  return Array.from(map.values());
}

declare const globalThis: {
  __gharsetuData?: GharsetuData;
} & typeof global;

function getSharedData(): GharsetuData {
  if (!globalThis.__gharsetuData) {
    globalThis.__gharsetuData = {
      leads: [...INITIAL_LEADS],
      properties: [...INITIAL_PROPERTIES],
      followUps: [...INITIAL_FOLLOW_UPS],
      siteVisits: [...INITIAL_SITE_VISITS],
      deals: [...INITIAL_DEALS],
      listeners: new Set<Listener>(),
    };
  }
  // Defensive guards in case of partial hydration
  const d = globalThis.__gharsetuData;
  if (!Array.isArray(d.leads)) d.leads = [...INITIAL_LEADS];
  if (!Array.isArray(d.properties)) d.properties = [...INITIAL_PROPERTIES];
  if (!Array.isArray(d.followUps)) d.followUps = [...INITIAL_FOLLOW_UPS];
  if (!Array.isArray(d.siteVisits)) d.siteVisits = [...INITIAL_SITE_VISITS];
  if (!Array.isArray(d.deals)) d.deals = [...INITIAL_DEALS];
  if (!(d.listeners instanceof Set)) d.listeners = new Set<Listener>();
  return d;
}

// Browser & Node safe persistent reactive store backed by plain globalThis.__gharsetuData
// Methods always come from the freshly loaded module so HMR never leaves stale prototypes.
class GharsetuStore {
  private get data(): GharsetuData {
    return getSharedData();
  }

  get leads(): Lead[] {
    return this.data.leads;
  }
  set leads(val: Lead[]) {
    this.data.leads = val;
  }

  get properties(): Property[] {
    return this.data.properties;
  }
  set properties(val: Property[]) {
    this.data.properties = val;
  }

  get followUps(): FollowUpTask[] {
    return this.data.followUps;
  }
  set followUps(val: FollowUpTask[]) {
    this.data.followUps = val;
  }

  get siteVisits(): SiteVisit[] {
    return this.data.siteVisits;
  }
  set siteVisits(val: SiteVisit[]) {
    this.data.siteVisits = val;
  }

  get deals(): Deal[] {
    return this.data.deals;
  }
  set deals(val: Deal[]) {
    this.data.deals = val;
  }

  constructor() {
    if (typeof window !== "undefined") {
      this.hydrateFromStorage();
      if (!this.data.storageListenerAttached) {
        this.data.storageListenerAttached = true;
        window.addEventListener("storage", (e) => {
          if (e.key === STORAGE_KEY) {
            this.hydrateFromStorage();
            this.emit();
          }
        });
      }
    }
  }

  subscribe(listener: Listener): () => void {
    this.data.listeners.add(listener);
    return () => {
      this.data.listeners.delete(listener);
    };
  }

  private emit() {
    this.data.listeners.forEach((fn) => {
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
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return;

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

  async syncFromServer(): Promise<void> {
    if (typeof window === "undefined") return;
    this.hydrateFromStorage();
    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      if (!res.ok) return;
      const payload = await res.json();
      let changed = false;

      if (Array.isArray(payload.leads)) {
        this.leads = mergeUniqueById(payload.leads, this.leads);
        changed = true;
      }
      if (Array.isArray(payload.siteVisits)) {
        this.siteVisits = mergeUniqueById(payload.siteVisits, this.siteVisits);
        changed = true;
      }
      if (Array.isArray(payload.followUps)) {
        this.followUps = mergeUniqueById(payload.followUps, this.followUps);
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
    this.leads = [newLead, ...this.leads.filter((l) => l && l.id !== newLead.id)];
    this.saveToStorage();
    this.emit();
    return newLead;
  }

  updateLeadStatus(leadId: string, status: Lead["status"]) {
    this.hydrateFromStorage();
    const lead = this.leads.find((l) => l && l.id === leadId);
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
    this.properties = [newProp, ...this.properties.filter((p) => p && p.id !== newProp.id)];
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
    this.siteVisits = [newVisit, ...this.siteVisits.filter((v) => v && v.id !== newVisit.id)];
    this.saveToStorage();
    this.emit();
    return newVisit;
  }

  updateSiteVisit(visitId: string, updates: Partial<SiteVisit>) {
    this.hydrateFromStorage();
    this.siteVisits = this.siteVisits.map((v) =>
      v && v.id === visitId ? { ...v, ...updates } : v
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
    this.followUps = [newTask, ...this.followUps.filter((t) => t && t.id !== newTask.id)];
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
    this.deals = [newDeal, ...this.deals.filter((d) => d && d.id !== newDeal.id)];
    this.saveToStorage();
    this.emit();
    return newDeal;
  }
}

export const gharsetuStore = new GharsetuStore();
