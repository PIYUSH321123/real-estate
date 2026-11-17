"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Flame,
  Info,
  Layers,
  MapPin,
  MessageSquare,
  MoreVertical,
  Navigation,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Send,
  Share2,
  Shield,
  Smartphone,
  Sparkles,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { gharsetuStore } from "@/lib/mock/store"
import { INITIAL_PROPERTIES, INITIAL_SITE_VISITS } from "@/lib/mock/gharsetu"
import { FollowUpTask, Lead, LeadSource, SiteVisit } from "@/types/real-estate"
import { CommandPalette } from "@/components/dashboard/command-palette"
import { LeadSidePanel } from "@/components/dashboard/lead-side-panel"
import { toast } from "sonner"

export default function DashboardPage() {
  const params = useParams()
  const router = useRouter()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  // Role toggle: Agent View vs Owner / Manager View
  const [activeRole, setActiveRole] = React.useState<"agent" | "owner">("agent")

  // Date Range filter: Today / 7D / 30D / Custom
  const [dateRange, setDateRange] = React.useState<"today" | "7d" | "30d">("7d")

  // Alert strip dismiss
  const [showAlert, setShowAlert] = React.useState(true)

  // Live CRM store states (leads, site visits, follow-ups)
  const [leads, setLeads] = React.useState<Lead[]>(() => [...gharsetuStore.leads])
  const [siteVisits, setSiteVisits] = React.useState<SiteVisit[]>(() => [...gharsetuStore.siteVisits])
  const [followUps, setFollowUps] = React.useState<FollowUpTask[]>(() => [...gharsetuStore.followUps])
  const [selectedTasks, setSelectedTasks] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    gharsetuStore.hydrateFromStorage()
    setLeads([...gharsetuStore.leads])
    setSiteVisits([...gharsetuStore.siteVisits])
    setFollowUps([...gharsetuStore.followUps])
    const unsub = gharsetuStore.subscribe(() => {
      setLeads([...gharsetuStore.leads])
      setSiteVisits([...gharsetuStore.siteVisits])
      setFollowUps([...gharsetuStore.followUps])
    })
    gharsetuStore.syncFromServer()
    return unsub
  }, [])

  // Command palette & Lead side panel state
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false)
  const [selectedLeadForPanel, setSelectedLeadForPanel] = React.useState<Lead | null>(null)
  const [sidePanelOpen, setSidePanelOpen] = React.useState(false)

  // Quick Action Dialogs
  const [addLeadOpen, setAddLeadOpen] = React.useState(false)
  const [addVisitOpen, setAddVisitOpen] = React.useState(false)

  // Form states for new lead
  const [leadName, setLeadName] = React.useState("")
  const [leadMobile, setLeadMobile] = React.useState("")
  const [leadBhk, setLeadBhk] = React.useState("3 BHK")
  const [leadLocality, setLeadLocality] = React.useState("Baner")
  const [leadBudget, setLeadBudget] = React.useState("₹1.4 Cr")
  const [leadSource, setLeadSource] = React.useState<LeadSource>("Facebook Ad")

  // Compare overlay toggle in chart
  const [showCompare, setShowCompare] = React.useState(false)

  // Follow-ups filter on dashboard table: all vs overdue
  const [followUpFilter, setFollowUpFilter] = React.useState<"all" | "overdue">("all")

  // Handle Add Lead
  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadName || !leadMobile) return

    const newLead = gharsetuStore.addLead({
      name: leadName,
      mobile: leadMobile,
      bhk: leadBhk,
      locality: leadLocality,
      city: "Pune",
      budgetDisplay: leadBudget,
      source: leadSource,
      assignedAgent: activeRole === "agent" ? "Sameer Khan" : "Anita Rao",
      status: "New",
      tags: [`${leadLocality} preference`, "Direct enquiry"],
    })

    setLeadName("")
    setLeadMobile("")
    setAddLeadOpen(false)
    toast.success("Lead Created Successfully", {
      description: `${newLead.name} (${newLead.bhk}, ${newLead.locality}) added to pipeline.`,
    })
  }

  // Handle Quick Task Actions
  const handleTaskDone = (taskId: string, leadName: string) => {
    const next = followUps.filter((t) => t.id !== taskId)
    gharsetuStore.updateFollowUps(next)
    toast.success("Follow-up Completed", {
      description: `Task for ${leadName} marked as completed.`,
    })
  }

  const handleTaskSnooze = (taskId: string, leadName: string) => {
    const next = followUps.map((t) =>
      t.id === taskId
        ? { ...t, status: "Due today" as const, overdueDays: undefined, dueTime: "Tomorrow" }
        : t
    )
    gharsetuStore.updateFollowUps(next)
    toast.success("Task Snoozed +1 Day", {
      description: `Follow-up for ${leadName} moved to tomorrow.`,
    })
  }

  const handleBulkComplete = () => {
    const idsToComplete = Object.keys(selectedTasks).filter((id) => selectedTasks[id])
    if (idsToComplete.length === 0) return

    const next = followUps.filter((t) => !idsToComplete.includes(t.id))
    gharsetuStore.updateFollowUps(next)
    setSelectedTasks({})
    toast.success(`${idsToComplete.length} Tasks Marked Done`, {
      description: "Batch task updates committed.",
    })
  }

  const openLeadDrawer = (leadId: string) => {
    const lead =
      leads.find((l) => l.id === leadId) ||
      leads.find((l) => l.id === "lead-3") ||
      leads[0]
    setSelectedLeadForPanel(lead)
    setSidePanelOpen(true)
  }

  // Reactive KPI calculation based on date range, role & live CRM bookings
  const kpiData = React.useMemo(() => {
    const multiplier = dateRange === "today" ? 0.3 : dateRange === "30d" ? 3.8 : 1
    const roleFactor = activeRole === "agent" ? 0.5 : 1
    const extraLeads = Math.max(0, leads.length - 8)
    const extraVisits = Math.max(0, siteVisits.length - 3)

    return {
      newLeads: Math.round(24 * multiplier * roleFactor) + extraLeads,
      leadsDelta: "+25% vs last period",
      siteVisits: Math.round(11 * multiplier * roleFactor) + extraVisits,
      visitsDelta: "+18% vs last period",
      followUpsDue: followUps.length,
      overdueCount: followUps.filter((t) => t.status === "Overdue").length,
      pipelineValue: activeRole === "agent" ? "₹ 6.8 Cr" : "₹ 14.2 Cr",
      pipelineDeals: activeRole === "agent" ? "4 in negotiation" : "9 in negotiation",
      pipelineDelta: "+8% vs last month",
    }
  }, [dateRange, activeRole, followUps, leads.length, siteVisits.length])

  // Sorted follow-ups: Overdue first, then due today
  const sortedFollowUps = React.useMemo(() => {
    return [...followUps]
      .filter((t) => (followUpFilter === "overdue" ? t.status === "Overdue" : true))
      .sort((a, b) => {
        if (a.status === "Overdue" && b.status !== "Overdue") return -1
        if (b.status === "Overdue" && a.status !== "Overdue") return 1
        return 0
      })
  }, [followUps, followUpFilter])

  // Weekly bar data
  const weeklyChartData = [
    { day: "Mon", current: 4, previous: 3 },
    { day: "Tue", current: 6, previous: 5 },
    { day: "Wed", current: 5, previous: 4 },
    { day: "Thu", current: 9, previous: 7 },
    { day: "Fri", current: 7, previous: 6 },
    { day: "Sat", current: 11, previous: 8, isToday: true },
    { day: "Sun", current: 8, previous: 5 },
  ]

  const maxChartVal = 12

  // Pipeline stages for Funnel Widget
  const pipelineStages = [
    { name: "New", count: 8, value: "₹ 5.2 Cr", pct: "100%", color: "bg-[#0F766E]" },
    { name: "Contacted", count: 6, value: "₹ 3.8 Cr", pct: "75%", color: "bg-[#115e59]" },
    { name: "Site Visit", count: 5, value: "₹ 4.8 Cr", pct: "62%", color: "bg-[#0d9488]" },
    { name: "Negotiation", count: 4, value: "₹ 6.2 Cr", pct: "50%", color: "bg-[#14b8a6]" },
    { name: "Won", count: 3, value: "₹ 2.8 Cr", pct: "37%", color: "bg-[#2dd4bf]" },
  ]

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-5 text-sm">
        {/* ========================================================================= */}
        {/* B. TOP BAR: Universal Command & Controls */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-3.5 md:p-4 border border-[#E3E7E4] rounded-2xl shadow-xs">
          {/* Left: Role Switcher & Context */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#F6F7F5] p-1 rounded-xl border border-[#E3E7E4]">
              <button
                type="button"
                onClick={() => setActiveRole("agent")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeRole === "agent"
                    ? "bg-[#0F766E] text-white shadow-xs"
                    : "text-[#5B6B65] hover:text-[#14211C]"
                }`}
              >
                Agent View (Sameer)
              </button>
              <button
                type="button"
                onClick={() => setActiveRole("owner")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeRole === "owner"
                    ? "bg-[#0F766E] text-white shadow-xs"
                    : "text-[#5B6B65] hover:text-[#14211C]"
                }`}
              >
                Owner / Manager View
              </button>
            </div>

            <span className="hidden md:inline-block text-xs text-[#5B6B65] border-l border-[#EEF1EF] pl-3">
              Pune Hub · Baner &amp; Hinjewadi
            </span>
          </div>

          {/* Right: Search, Date Filter, Bell, Add Action */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Global Search Button (Cmd+K) */}
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 bg-[#F6F7F5] hover:bg-[#EEF1EF] text-[#5B6B65] border border-[#E3E7E4] px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              <Search className="size-3.5" />
              <span className="hidden sm:inline">Search leads, properties...</span>
              <span className="sm:hidden">Search</span>
              <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.2 bg-white border border-[#E3E7E4] text-[10px] font-mono rounded text-[#5B6B65]">
                ⌘K
              </kbd>
            </button>

            {/* Date Range Selector */}
            <div className="flex items-center bg-[#F6F7F5] p-0.5 rounded-xl border border-[#E3E7E4]">
              {(["today", "7d", "30d"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setDateRange(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    dateRange === r
                      ? "bg-white text-[#0F766E] shadow-xs"
                      : "text-[#5B6B65] hover:text-[#14211C]"
                  }`}
                >
                  {r === "today" ? "Today" : r === "7d" ? "7D" : "30D"}
                </button>
              ))}
            </div>

            {/* Notifications Bell */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => router.push(`/c/${companySlug}/dashboard/notifications`)}
                  className="relative p-2 rounded-xl bg-[#F6F7F5] hover:bg-[#EEF1EF] border border-[#E3E7E4] text-[#14211C] transition-colors cursor-pointer"
                  aria-label="View notifications"
                >
                  <Bell className="size-4 text-[#5B6B65]" />
                  <span className="absolute -top-1 -right-1 size-4 bg-[#8F2A1D] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    5
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#0F2F2A] text-white text-xs">
                5 urgent notifications (3 buyer replies, 2 overdue payouts)
              </TooltipContent>
            </Tooltip>

            {/* Action Dropdown (+ Add) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold rounded-xl px-3.5 py-1.5 text-xs h-9 flex items-center gap-1.5 shadow-sm cursor-pointer">
                  <Plus className="size-4" />
                  <span>Add</span>
                  <ChevronDown className="size-3.5 opacity-80" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5 bg-white border-[#E3E7E4]">
                <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-wider text-[#5B6B65] px-2 py-1">
                  Quick Actions
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => setAddLeadOpen(true)}
                  className="text-xs font-semibold rounded-lg cursor-pointer py-2"
                >
                  <Users className="size-3.5 mr-2 text-[#0F766E]" />
                  <span>+ New Lead</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/c/${companySlug}/dashboard/properties`)}
                  className="text-xs font-semibold rounded-lg cursor-pointer py-2"
                >
                  <Building2 className="size-3.5 mr-2 text-[#0F766E]" />
                  <span>+ New Property</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/c/${companySlug}/dashboard/site-visits`)}
                  className="text-xs font-semibold rounded-lg cursor-pointer py-2"
                >
                  <CalendarCheck className="size-3.5 mr-2 text-[#0F766E]" />
                  <span>+ Schedule Site Visit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/c/${companySlug}/dashboard/calls`)}
                  className="text-xs font-semibold rounded-lg cursor-pointer py-2"
                >
                  <Phone className="size-3.5 mr-2 text-[#0F766E]" />
                  <span>+ Log Call Activity</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* C. ALERT STRIP: Overdue Follow-ups Banner */}
        {/* ========================================================================= */}
        {showAlert && kpiData.overdueCount > 0 && (
          <div className="bg-[#FFF5F3] border border-[#FBE0DC] rounded-xl p-3 md:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <span className="size-6 rounded-full bg-[#FBE0DC] text-[#8F2A1D] flex items-center justify-center shrink-0">
                <AlertCircle className="size-4" />
              </span>
              <div>
                <span className="font-extrabold text-[#8F2A1D]">
                  {kpiData.overdueCount} follow-ups are overdue.
                </span>
                <span className="text-[#5B6B65] ml-1.5 hidden sm:inline">
                  3 hot buyers are awaiting response. Quick callback prevents deal drop-off.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setFollowUpFilter("overdue")}
                className="font-bold text-[#8F2A1D] hover:underline flex items-center gap-1 text-xs"
              >
                <span>Review overdue tasks</span>
                <ArrowRight className="size-3" />
              </button>
              <button
                type="button"
                onClick={() => setShowAlert(false)}
                className="text-[#8F2A1D] hover:bg-[#FBE0DC]/60 p-1 rounded-md transition-colors"
                title="Dismiss banner"
                aria-label="Dismiss banner"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* D. KPI CARDS: Top-Left, Sparkline, Trend, Popover */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: New Leads */}
          <Card
            onClick={() => router.push(`/c/${companySlug}/dashboard/leads`)}
            className="p-4 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs hover:border-[#0F766E] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5B6B65]">New leads</span>
                <Tooltip>
                  <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Info className="size-3.5 text-[#8A9993] hover:text-[#14211C] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#0F2F2A] text-white text-xs">
                    Total new inquiries captured from Meta, 99acres, MagicBricks, and WhatsApp.
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-baseline justify-between my-2">
                <div className="text-3xl font-black text-[#14211C] tracking-tight group-hover:text-[#0F766E] transition-colors">
                  {kpiData.newLeads}
                </div>
                {/* Mini SVG Sparkline */}
                <svg className="w-16 h-7 text-[#0F766E]" viewBox="0 0 60 25" fill="none">
                  <path
                    d="M 0,20 Q 15,10 30,16 T 60,4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#EEF1EF]">
              <span className="inline-flex items-center text-[#0B4F49] font-bold bg-[#E3F2EF] px-2 py-0.5 rounded-full">
                <ArrowUpRight className="size-3 mr-0.5" />
                {kpiData.leadsDelta}
              </span>
              <span className="text-[#8A9993]">Updated 2m ago</span>
            </div>
          </Card>

          {/* KPI 2: Site Visits */}
          <Card
            onClick={() => router.push(`/c/${companySlug}/dashboard/site-visits`)}
            className="p-4 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs hover:border-[#0F766E] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5B6B65]">Site visits</span>
                <Tooltip>
                  <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Info className="size-3.5 text-[#8A9993] hover:text-[#14211C] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#0F2F2A] text-white text-xs">
                    Completed &amp; confirmed project physical inspections.
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-baseline justify-between my-2">
                <div className="text-3xl font-black text-[#14211C] tracking-tight group-hover:text-[#0F766E] transition-colors">
                  {kpiData.siteVisits}
                </div>
                {/* Mini SVG Sparkline */}
                <svg className="w-16 h-7 text-[#0F766E]" viewBox="0 0 60 25" fill="none">
                  <path
                    d="M 0,18 Q 15,14 30,8 T 60,2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#EEF1EF]">
              <span className="inline-flex items-center text-[#0B4F49] font-bold bg-[#E3F2EF] px-2 py-0.5 rounded-full">
                <ArrowUpRight className="size-3 mr-0.5" />
                {kpiData.visitsDelta}
              </span>
              <span className="text-[#8A9993]">4 today</span>
            </div>
          </Card>

          {/* KPI 3: Follow-ups Due */}
          <Card
            onClick={() => setFollowUpFilter("overdue")}
            className="p-4 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs hover:border-[#0F766E] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5B6B65]">Follow-ups due</span>
                <Tooltip>
                  <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Info className="size-3.5 text-[#8A9993] hover:text-[#14211C] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#0F2F2A] text-white text-xs">
                    Pending agent calls, WhatsApp brochures, and negotiation tasks.
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-baseline justify-between my-2">
                <div className="text-3xl font-black text-[#14211C] tracking-tight">
                  {kpiData.followUpsDue}
                </div>
                {/* Mini SVG Sparkline */}
                <svg className="w-16 h-7 text-[#8F2A1D]" viewBox="0 0 60 25" fill="none">
                  <path
                    d="M 0,8 Q 20,18 40,12 T 60,22"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#EEF1EF]">
              <span className="inline-flex items-center text-[#8F2A1D] font-bold bg-[#FBE0DC] px-2 py-0.5 rounded-full">
                <AlertCircle className="size-3 mr-1" />
                {kpiData.overdueCount} overdue
              </span>
              <span className="text-[#8A9993]">Click to filter</span>
            </div>
          </Card>

          {/* KPI 4: Pipeline Value with Stage Popover Breakdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Card className="p-4 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs hover:border-[#0F766E] transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#5B6B65]">Pipeline value</span>
                    <Tooltip>
                      <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Info className="size-3.5 text-[#8A9993] hover:text-[#14211C] cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#0F2F2A] text-white text-xs">
                        Estimated gross deal value across all active negotiation and visit stages.
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex items-baseline justify-between my-2">
                    <div className="text-3xl font-black text-[#0F766E] tracking-tight">
                      {kpiData.pipelineValue}
                    </div>
                    {/* Mini SVG Sparkline */}
                    <svg className="w-16 h-7 text-[#0F766E]" viewBox="0 0 60 25" fill="none">
                      <path
                        d="M 0,16 Q 15,20 30,10 T 60,3"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#EEF1EF]">
                  <span className="inline-flex items-center text-[#8A4B00] font-bold bg-[#FDEBD0] px-2 py-0.5 rounded-full">
                    {kpiData.pipelineDeals}
                  </span>
                  <span className="text-[#0F766E] font-semibold flex items-center">
                    Breakdown <ChevronDown className="size-3 ml-0.5" />
                  </span>
                </div>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-3 bg-white rounded-xl border-[#E3E7E4] shadow-xl text-xs">
              <DropdownMenuLabel className="font-bold text-[#14211C] pb-1 border-b border-[#EEF1EF]">
                Pipeline Value Breakdown
              </DropdownMenuLabel>
              <div className="flex flex-col gap-2 py-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#5B6B65]">Negotiation (4 deals)</span>
                  <span className="font-bold text-[#14211C]">₹ 6.2 Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#5B6B65]">Site Visit (5 deals)</span>
                  <span className="font-bold text-[#14211C]">₹ 4.8 Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#5B6B65]">Contacted (6 leads)</span>
                  <span className="font-bold text-[#14211C]">₹ 3.2 Cr</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="flex justify-between items-center pt-1 font-bold text-[#0F766E]">
                <span>Total Active</span>
                <span>{kpiData.pipelineValue}</span>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* ========================================================================= */}
        {/* E. LEADS THIS WEEK & SOURCE MIX (Accessible & Visual) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left (7 cols): Leads This Week Bar Chart */}
          <Card className="lg:col-span-7 p-5 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-bold text-base text-[#14211C]">Leads this week</h3>
                  <p className="text-xs text-[#5B6B65]">Daily volume &amp; weekend surge tracking</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={showCompare ? "default" : "outline"}
                    onClick={() => setShowCompare(!showCompare)}
                    className={`text-xs h-7 px-2.5 rounded-lg ${
                      showCompare
                        ? "bg-[#0F766E] text-white"
                        : "border-[#E3E7E4] text-[#5B6B65] hover:text-[#14211C]"
                    }`}
                  >
                    vs Previous Week
                  </Button>
                </div>
              </div>

              {/* Chart Canvas with Y-axis & gridlines */}
              <div className="relative pt-2 pb-1">
                {/* Horizontal Gridlines & Y-axis labels */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 pr-2">
                  <div className="flex items-center w-full">
                    <span className="text-[10px] text-[#8A9993] w-6">12</span>
                    <div className="flex-1 border-b border-dashed border-[#EEF1EF]" />
                  </div>
                  <div className="flex items-center w-full">
                    <span className="text-[10px] text-[#8A9993] w-6">8</span>
                    <div className="flex-1 border-b border-dashed border-[#EEF1EF]" />
                  </div>
                  <div className="flex items-center w-full">
                    <span className="text-[10px] text-[#8A9993] w-6">4</span>
                    <div className="flex-1 border-b border-dashed border-[#EEF1EF]" />
                  </div>
                  <div className="flex items-center w-full">
                    <span className="text-[10px] text-[#8A9993] w-6">0</span>
                    <div className="flex-1 border-b border-[#E3E7E4]" />
                  </div>
                </div>

                {/* Bars */}
                <div className="flex items-end justify-between pl-8 pr-2 h-[150px] gap-2 pt-2">
                  {weeklyChartData.map((item) => {
                    const currentPct = (item.current / maxChartVal) * 100
                    const prevPct = (item.previous / maxChartVal) * 100

                    return (
                      <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                        {/* Hover Tooltip */}
                        <div className="absolute -top-8 bg-[#0F2F2A] text-white text-[10px] font-bold py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-20">
                          {item.day}: {item.current} leads {showCompare ? `(vs ${item.previous})` : ""}
                        </div>

                        <div className="flex items-end gap-1 w-full justify-center">
                          {/* Current Period Bar */}
                          <div
                            style={{ height: `${currentPct}%` }}
                            className={`w-full max-w-[26px] rounded-t-md transition-all duration-300 ${
                              item.isToday
                                ? "bg-[#0F766E] shadow-sm ring-2 ring-[#0F766E]/20"
                                : "bg-[#5EEAD4] hover:bg-[#0F766E]"
                            }`}
                          />
                          {/* Compare Overlay Bar */}
                          {showCompare && (
                            <div
                              style={{ height: `${prevPct}%` }}
                              className="w-full max-w-[14px] bg-[#E3E7E4] rounded-t-sm transition-all duration-300"
                              title={`Previous week: ${item.previous}`}
                            />
                          )}
                        </div>

                        <span
                          className={`text-xs font-semibold ${
                            item.isToday ? "text-[#0F766E] font-bold" : "text-[#5B6B65]"
                          }`}
                        >
                          {item.day}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Source Mix Visual Stacked Bar with accessible labels */}
            <div className="mt-5 pt-3 border-t border-[#EEF1EF]">
              <div className="flex items-center justify-between text-xs font-bold text-[#14211C] mb-2">
                <span>Inbound Channel Mix</span>
                <span className="text-[#5B6B65] font-normal">50 Leads Total</span>
              </div>

              {/* Stacked bar */}
              <div className="h-3 w-full rounded-full overflow-hidden flex shadow-xs mb-3">
                <div style={{ width: "42%" }} className="bg-[#0F766E]" title="Ads: 42%" />
                <div style={{ width: "31%" }} className="bg-[#0284C7]" title="Portals: 31%" />
                <div style={{ width: "18%" }} className="bg-[#25D366]" title="WhatsApp: 18%" />
                <div style={{ width: "9%" }} className="bg-[#D97706]" title="Walk-in: 9%" />
              </div>

              {/* Accessible Legend with icons & contrast >= 4.5:1 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#0F766E]" />
                  <span className="font-semibold text-[#14211C]">Ads: 42%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#0284C7]" />
                  <span className="font-semibold text-[#14211C]">Portals: 31%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#25D366]" />
                  <span className="font-semibold text-[#14211C]">WhatsApp: 18%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#D97706]" />
                  <span className="font-semibold text-[#14211C]">Walk-in: 9%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Right (5 cols): ACTIONABLE Today's Follow-ups Table */}
          <Card className="lg:col-span-5 p-5 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-base text-[#14211C]">Today&apos;s follow-ups</h3>
                  <p className="text-xs text-[#5B6B65]">Quick actions with 1-click side inspection</p>
                </div>

                <div className="flex items-center gap-2">
                  {Object.values(selectedTasks).filter(Boolean).length > 0 && (
                    <Button
                      size="sm"
                      onClick={handleBulkComplete}
                      className="bg-[#0F766E] hover:bg-[#0d655e] text-white text-[11px] h-7 px-2.5 rounded-lg shadow-xs"
                    >
                      <Check className="size-3 mr-1" />
                      Complete ({Object.values(selectedTasks).filter(Boolean).length})
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setFollowUpFilter(followUpFilter === "all" ? "overdue" : "all")
                    }
                    className={`text-xs h-7 px-2 rounded-lg ${
                      followUpFilter === "overdue" ? "bg-[#FBE0DC] text-[#8F2A1D]" : "text-[#5B6B65]"
                    }`}
                  >
                    {followUpFilter === "overdue" ? "Overdue only" : "All"}
                  </Button>
                </div>
              </div>

              {/* Follow-up rows with quick actions & side-drawer trigger */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                      <th className="py-2 px-1 w-6">
                        <span className="sr-only">Select</span>
                      </th>
                      <th className="py-2 px-2 font-semibold">Lead</th>
                      <th className="py-2 px-2 font-semibold">Task</th>
                      <th className="py-2 px-2 font-semibold text-center">Status</th>
                      <th className="py-2 px-2 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEF1EF]">
                    {sortedFollowUps.slice(0, 4).map((f) => {
                      const isSelected = !!selectedTasks[f.id]
                      const isOverdue = f.status === "Overdue"

                      return (
                        <tr
                          key={f.id}
                          className="hover:bg-[#F9FAF9] transition-colors group cursor-pointer"
                          onClick={() => openLeadDrawer(f.leadId)}
                        >
                          {/* Checkbox */}
                          <td
                            className="py-2.5 px-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) =>
                                setSelectedTasks((prev) => ({ ...prev, [f.id]: !!checked }))
                              }
                            />
                          </td>

                          {/* Lead Name */}
                          <td className="py-2.5 px-2 font-bold text-[#14211C] group-hover:text-[#0F766E] transition-colors whitespace-nowrap">
                            {f.leadName}
                          </td>

                          {/* Task Description */}
                          <td className="py-2.5 px-2 text-[#5B6B65] max-w-[140px] truncate">
                            {f.task}
                          </td>

                          {/* Status Badge + Icon (Not color alone) */}
                          <td className="py-2.5 px-2 text-center whitespace-nowrap">
                            {isOverdue ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FBE0DC] text-[#8F2A1D]">
                                <AlertCircle className="size-3" />
                                Overdue
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FDEBD0] text-[#8A4B00]">
                                <Clock className="size-3" />
                                {f.dueTime || "Today"}
                              </span>
                            )}
                          </td>

                          {/* Quick Actions (Call, WhatsApp, Mark done, Snooze) */}
                          <td
                            className="py-2.5 px-2 text-right whitespace-nowrap"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-end gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => window.open("tel:+919890145210", "_self")}
                                    className="p-1 rounded-md hover:bg-[#E3F2EF] text-[#0F766E] transition-colors"
                                    aria-label="Call lead"
                                  >
                                    <Phone className="size-3.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#0F2F2A] text-white text-xs">Call lead</TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => window.open("https://wa.me/919890145210", "_blank")}
                                    className="p-1 rounded-md hover:bg-[#D9F2E3] text-[#25D366] transition-colors"
                                    aria-label="WhatsApp lead"
                                  >
                                    <MessageSquare className="size-3.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#0F2F2A] text-white text-xs">WhatsApp message</TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => handleTaskDone(f.id, f.leadName)}
                                    className="p-1 rounded-md hover:bg-[#E3F2EF] text-[#0F766E] transition-colors"
                                    aria-label="Mark task done"
                                  >
                                    <CheckCircle2 className="size-3.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#0F2F2A] text-white text-xs">Mark completed</TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => handleTaskSnooze(f.id, f.leadName)}
                                    className="p-1 rounded-md hover:bg-[#F6F7F5] text-[#8A9993] hover:text-[#14211C] transition-colors"
                                    aria-label="Snooze task 1 day"
                                  >
                                    <Clock className="size-3.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#0F2F2A] text-white text-xs">Snooze +1 day</TooltipContent>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EEF1EF] flex items-center justify-between text-xs">
              <span className="text-[#5B6B65]">Click any lead to inspect details</span>
              <a
                href={`/c/${companySlug}/dashboard/follow-ups`}
                className="font-bold text-[#0F766E] hover:underline flex items-center gap-1"
              >
                View all ({followUps.length})
                <ArrowRight className="size-3" />
              </a>
            </div>
          </Card>
        </div>

        {/* ========================================================================= */}
        {/* G. 3 HIGH-VALUE DECISION WIDGETS (Replacing Redundant Link Tiles) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Widget 1: Pipeline Funnel */}
          <Card className="p-5 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="size-4 text-[#0F766E]" />
                  <h3 className="font-bold text-sm text-[#14211C]">Pipeline Funnel</h3>
                </div>
                <span className="text-[11px] font-bold text-[#0F766E] bg-[#E3F2EF] px-2 py-0.5 rounded-full">
                  26 Active Deals
                </span>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                {pipelineStages.map((stage) => (
                  <div
                    key={stage.name}
                    onClick={() => router.push(`/c/${companySlug}/dashboard/leads`)}
                    className="flex flex-col gap-1 p-1.5 rounded-lg hover:bg-[#F9FAF9] cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#14211C]">{stage.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#5B6B65]">{stage.value}</span>
                        <span className="font-bold text-[#0F766E] text-xs">
                          {stage.count} deals
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-[#ECEFED] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                        style={{ width: stage.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#EEF1EF] mt-3">
              <a
                href={`/c/${companySlug}/dashboard/leads`}
                className="text-xs font-bold text-[#0F766E] hover:underline flex items-center justify-between"
              >
                <span>Open Kanban Board</span>
                <ArrowRight className="size-3" />
              </a>
            </div>
          </Card>

          {/* Widget 2: Hot Leads & Smart Matches */}
          <Card className="p-5 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="size-4 text-[#F59E0B]" />
                  <h3 className="font-bold text-sm text-[#14211C]">Hot Smart Matches</h3>
                </div>
                <span className="text-[11px] font-bold text-[#8A4B00] bg-[#FDEBD0] px-2 py-0.5 rounded-full">
                  7 Matched
                </span>
              </div>

              <p className="text-xs text-[#5B6B65] mb-3">
                High-intent buyers matching <strong>Skyline Heights</strong> (3 BHK, ₹1.45 Cr):
              </p>

              <div className="flex flex-col gap-2.5">
                {[
                  { name: "Priya Nair", match: "94%", pref: "3 BHK · Baner", heat: "Hot", score: 86 },
                  { name: "Vikas More", match: "88%", pref: "3 BHK · Baner", heat: "Warm", score: 74 },
                  { name: "Anil Gokhale", match: "81%", pref: "3 BHK · Aundh", heat: "Warm", score: 68 },
                ].map((buyer) => (
                  <div
                    key={buyer.name}
                    className="p-2.5 bg-[#F6F7F5] rounded-xl border border-[#E3E7E4] flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-[#14211C]">{buyer.name}</span>
                        <span className="text-[10px] font-bold text-[#0F766E] bg-[#E3F2EF] px-1.5 py-0.2 rounded">
                          {buyer.match}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#5B6B65]">{buyer.pref}</span>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => {
                        toast.success(`Brochure Dispatched to ${buyer.name}`, {
                          description: "Sent Skyline Heights interactive card on WhatsApp.",
                        })
                      }}
                      className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] h-7 px-2 rounded-lg font-semibold shadow-xs"
                    >
                      <MessageSquare className="size-3 mr-1" />
                      Send
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#EEF1EF] mt-3">
              <a
                href={`/c/${companySlug}/dashboard/smart-matches`}
                className="text-xs font-bold text-[#0F766E] hover:underline flex items-center justify-between"
              >
                <span>View all smart matches</span>
                <ArrowRight className="size-3" />
              </a>
            </div>
          </Card>

          {/* Widget 3: Today's Site Visits Timeline */}
          <Card className="p-5 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="size-4 text-[#0F766E]" />
                  <h3 className="font-bold text-sm text-[#14211C]">Today&apos;s Site Visits</h3>
                </div>
                <span className="text-[11px] font-bold text-[#0B4F49] bg-[#E3F2EF] px-2 py-0.5 rounded-full">
                  Saturday Route
                </span>
              </div>

              <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto pr-1">
                {siteVisits.slice(0, 5).map((visit) => (
                  <div
                    key={visit.id}
                    className="p-2.5 rounded-xl border border-[#E3E7E4] bg-[#F6F7F5] flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#0F766E]">{visit.time}</span>
                        <span className="font-bold text-xs text-[#14211C]">{visit.leadName}</span>
                      </div>
                      <span className="text-[11px] text-[#5B6B65]">
                        {visit.propertyTitle} ({visit.locality}) · {visit.date}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        toast.success("Navigation Map Pin Launched", {
                          description: `Opened Google Maps directions to ${visit.propertyTitle}, ${visit.locality}.`,
                        })
                      }
                      className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
                    >
                      <Navigation className="size-3" />
                      <span>Navigate</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#EEF1EF] mt-3">
              <a
                href={`/c/${companySlug}/dashboard/site-visits`}
                className="text-xs font-bold text-[#0F766E] hover:underline flex items-center justify-between"
              >
                <span>Full route schedule &amp; GPS</span>
                <ArrowRight className="size-3" />
              </a>
            </div>
          </Card>
        </div>

        {/* ========================================================================= */}
        {/* MODALS & SLIDE-OVER COMPONENTS */}
        {/* ========================================================================= */}

        {/* Global Command Palette (Cmd+K) */}
        <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />

        {/* Slide-over Lead Detail Drawer */}
        <LeadSidePanel
          lead={selectedLeadForPanel}
          open={sidePanelOpen}
          onOpenChange={setSidePanelOpen}
        />

        {/* Dialog: Add New Lead */}
        <Dialog open={addLeadOpen} onOpenChange={setAddLeadOpen}>
          <DialogContent className="sm:max-w-[480px]">
            <form onSubmit={handleAddLeadSubmit}>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-[#14211C]">
                  Add New Real Estate Lead
                </DialogTitle>
                <DialogDescription>
                  Enter buyer requirements to immediately calculate smart matches and route to an agent.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4 text-xs">
                <div className="grid gap-1.5">
                  <Label htmlFor="dlg-name">Client Full Name</Label>
                  <Input
                    id="dlg-name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Anand Kulkarni"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="dlg-mobile">Mobile Number</Label>
                    <Input
                      id="dlg-mobile"
                      value={leadMobile}
                      onChange={(e) => setLeadMobile(e.target.value)}
                      placeholder="+91 98..."
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="dlg-bhk">Configuration</Label>
                    <Select value={leadBhk} onValueChange={setLeadBhk}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 BHK">1 BHK</SelectItem>
                        <SelectItem value="2 BHK">2 BHK</SelectItem>
                        <SelectItem value="3 BHK">3 BHK</SelectItem>
                        <SelectItem value="4 BHK Villa">4 BHK Villa</SelectItem>
                        <SelectItem value="Plot">Plot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="dlg-locality">Locality</Label>
                    <Input
                      id="dlg-locality"
                      value={leadLocality}
                      onChange={(e) => setLeadLocality(e.target.value)}
                      placeholder="e.g. Baner"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="dlg-budget">Budget Target</Label>
                    <Input
                      id="dlg-budget"
                      value={leadBudget}
                      onChange={(e) => setLeadBudget(e.target.value)}
                      placeholder="e.g. ₹1.4 Cr"
                    />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="dlg-source">Lead Source</Label>
                  <Select value={leadSource} onValueChange={(val) => setLeadSource(val as LeadSource)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Facebook Ad">Facebook Ad</SelectItem>
                      <SelectItem value="99acres">99acres</SelectItem>
                      <SelectItem value="MagicBricks">MagicBricks</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Walk-in">Walk-in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="bg-[#0F766E] hover:bg-[#0d655e] text-white">
                  Create Lead
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
