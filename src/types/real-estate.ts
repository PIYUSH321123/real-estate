export type LeadStatus =
  | "New"
  | "Contacted"
  | "Site visit"
  | "Negotiation"
  | "Closed"
  | "Lost";

export type LeadSource =
  | "Facebook Ad"
  | "Instagram"
  | "99acres"
  | "MagicBricks"
  | "WhatsApp"
  | "Website"
  | "Referral"
  | "Walk-in"
  | "Google Ads";

export type LeadHeat = "Hot" | "Warm" | "Cold";

export interface LeadActivity {
  id: string;
  type: "call" | "whatsapp" | "brochure" | "visit" | "form" | "note";
  title: string;
  description: string;
  timestamp: string;
  operator?: string;
}

export interface Lead {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  budgetDisplay: string;
  budgetMin?: number;
  budgetMax?: number;
  bhk: string;
  locality: string;
  city: string;
  source: LeadSource;
  assignedAgent: string;
  assignedAgentId?: string;
  status: LeadStatus;
  score: number;
  heat: LeadHeat;
  scoreReason?: string;
  nextBestAction?: string;
  tags: string[];
  activities?: LeadActivity[];
  createdAt: string;
  updatedAt?: string;
  lostReason?: string;
  notes?: string;
}

export type PropertyStatus = "Ready" | "Under construction" | "Available" | "Sold";
export type PropertyType = "Apartment" | "Villa" | "Plot" | "Commercial" | "Penthouse";

export interface Property {
  id: string;
  title: string;
  project?: string;
  locality: string;
  city: string;
  bhk: string;
  sqft: number;
  price: number;
  priceDisplay: string;
  status: PropertyStatus;
  type: PropertyType;
  imageUrl?: string;
  featured?: boolean;
  description?: string;
  builder?: string;
  possessionDate?: string;
  reraNumber?: string;
  amenities?: string[];
}

export type SiteVisitStatus = "Confirmed" | "Awaiting reply" | "Completed" | "Cancelled" | "Rescheduled";

export interface SiteVisit {
  id: string;
  leadId: string;
  leadName: string;
  leadMobile: string;
  propertyId: string;
  propertyTitle: string;
  locality: string;
  date: string;
  time: string;
  status: SiteVisitStatus;
  agentName: string;
  routeOrder?: number;
  geoCheckedIn?: boolean;
  feedback?: "Liked" | "Price high" | "Needs family" | "Not interested";
  feedbackNotes?: string;
}

export type DealPayoutStatus = "Received" | "Invoice sent" | "Overdue 12d" | "Pending" | "Draft";

export interface Deal {
  id: string;
  leadName: string;
  propertyTitle: string;
  locality: string;
  builder: string;
  dealValue: string;
  commissionRate: number; // e.g. 2.0 or 2.5
  commissionAmount: string; // e.g. "₹1.64 L"
  agentSplit: string; // e.g. "₹82,000"
  agentName: string;
  status: DealPayoutStatus;
  date: string;
  dueDate?: string;
}

export interface AgentScorecard {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  openTasks: number;
  overdueTasks: number;
  onTimeRate: number; // percentage, e.g. 92
  closedDeals: number;
  revenueGenerated?: string;
}

export interface FollowUpTask {
  id: string;
  leadId: string;
  leadName: string;
  task: string;
  agentName: string;
  dueDate: string;
  dueTime?: string;
  status: "Due today" | "Overdue" | "Upcoming" | "Completed";
  overdueDays?: number;
  priority?: "High" | "Medium" | "Low";
}

export interface SmartMatch {
  id: string;
  leadId: string;
  leadName: string;
  lookingFor: string;
  matchScore: number; // e.g. 94
  heat: LeadHeat;
  propertyTitle: string;
  priceDisplay: string;
}

export interface CoBrokingListing {
  id: string;
  title: string;
  locality: string;
  sharedByAgent: string;
  type: string;
  priceDisplay: string;
  commissionSplit: string; // e.g. "50/50" or "60/40"
  status: "Available" | "Pending agreement" | "Signed";
  agreementStatus?: "Signed by both" | "Waiting for partner";
}

export interface DocumentItem {
  id: string;
  dealName: string;
  docTitle: string;
  status: "Received" | "Signed" | "Draft" | "Verified" | "Missing";
  note: string;
  requiredFor: string;
}

export interface Referral {
  id: string;
  referrerName: string;
  relation: string;
  leadsSent: number;
  closedDeals: number;
  rewardAmount: string;
  rewardStatus: "Paid" | "Due" | "No reward yet";
}

export interface CallLog {
  id: string;
  callerNumber: string;
  callerName?: string;
  time: string;
  duration: string;
  status: "Missed" | "Answered";
  autoAction: string;
  summary?: string;
  aiAnalyzed: boolean;
}

export interface NotificationItem {
  id: string;
  type: "urgent" | "task" | "lead" | "money" | "document" | "match";
  title: string;
  message: string;
  timeAgo: string;
  isUrgent?: boolean;
}
