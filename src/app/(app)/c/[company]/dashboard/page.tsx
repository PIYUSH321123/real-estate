"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { LeadSource } from "@/types/real-estate"

export default function DashboardPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [leads, setLeads] = React.useState(gharsetuStore.leads)
  const [followUps, setFollowUps] = React.useState(gharsetuStore.followUps)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  // Form states for new lead
  const [leadName, setLeadName] = React.useState("")
  const [leadMobile, setLeadMobile] = React.useState("")
  const [leadBhk, setLeadBhk] = React.useState("3 BHK")
  const [leadLocality, setLeadLocality] = React.useState("Baner")
  const [leadBudget, setLeadBudget] = React.useState("₹1.4 Cr")
  const [leadSource, setLeadSource] = React.useState<LeadSource>("Facebook Ad")
  const [leadAgent, setLeadAgent] = React.useState("Sameer Khan")

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadName || !leadMobile) return

    gharsetuStore.addLead({
      name: leadName,
      mobile: leadMobile,
      bhk: leadBhk,
      locality: leadLocality,
      city: "Pune",
      budgetDisplay: leadBudget,
      source: leadSource,
      assignedAgent: leadAgent,
      status: "New",
      tags: ["Walk-in / Direct", `${leadLocality} preference`],
    })

    setLeads([...gharsetuStore.leads])
    setLeadName("")
    setLeadMobile("")
    setDialogOpen(false)
  }

  // Weekly lead bars (Mon - Sun)
  const weeklyData = [
    { day: "Mon", count: 4, height: 40 },
    { day: "Tue", count: 6, height: 64 },
    { day: "Wed", count: 5, height: 52 },
    { day: "Thu", count: 9, height: 90 },
    { day: "Fri", count: 7, height: 70 },
    { day: "Sat", count: 11, height: 110 },
    { day: "Sun", count: 8, height: 84 },
  ]

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Dashboard
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Welcome back, Sameer. Here is your agency pipeline overview for today.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer">
              <Plus className="size-4" />
              <span>Add lead</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <form onSubmit={handleAddLead}>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-[#14211C]">
                  Add New Real Estate Lead
                </DialogTitle>
                <DialogDescription>
                  Enter client details and property requirements to automatically route to an agent.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Client Full Name</Label>
                  <Input
                    id="name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      value={leadMobile}
                      onChange={(e) => setLeadMobile(e.target.value)}
                      placeholder="+91 98..."
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bhk">Configuration</Label>
                    <Select value={leadBhk} onValueChange={setLeadBhk}>
                      <SelectTrigger>
                        <SelectValue placeholder="BHK" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 BHK">1 BHK</SelectItem>
                        <SelectItem value="2 BHK">2 BHK</SelectItem>
                        <SelectItem value="3 BHK">3 BHK</SelectItem>
                        <SelectItem value="4 BHK Villa">4 BHK Villa</SelectItem>
                        <SelectItem value="Plot">Residential Plot</SelectItem>
                        <SelectItem value="Commercial">Commercial Shop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="locality">Preferred Locality</Label>
                    <Input
                      id="locality"
                      value={leadLocality}
                      onChange={(e) => setLeadLocality(e.target.value)}
                      placeholder="e.g. Baner, Wakad"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="budget">Budget Target</Label>
                    <Input
                      id="budget"
                      value={leadBudget}
                      onChange={(e) => setLeadBudget(e.target.value)}
                      placeholder="e.g. ₹1.2 Cr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="source">Lead Source</Label>
                    <Select value={leadSource} onValueChange={(val) => setLeadSource(val as LeadSource)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Facebook Ad">Facebook Ad</SelectItem>
                        <SelectItem value="99acres">99acres</SelectItem>
                        <SelectItem value="MagicBricks">MagicBricks</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                        <SelectItem value="Website">Website Form</SelectItem>
                        <SelectItem value="Walk-in">Walk-in</SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="agent">Assign Agent</Label>
                    <Select value={leadAgent} onValueChange={setLeadAgent}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sameer Khan">Sameer Khan</SelectItem>
                        <SelectItem value="Anita Rao">Anita Rao</SelectItem>
                        <SelectItem value="Pooja Iyer">Pooja Iyer</SelectItem>
                        <SelectItem value="Rohit Jain">Rohit Jain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="bg-[#0F766E] hover:bg-[#0d655e] text-white">
                  Save Lead
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 4 Core KPIs - Matching Mockup Screen 01 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div className="text-xs font-medium text-[#5B6B65]">New leads today</div>
          <div className="text-3xl font-extrabold text-[#14211C] my-1">24</div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E3F2EF] text-[#0B4F49]">
              +6 vs yesterday
            </span>
          </div>
        </Card>

        {/* KPI 2 */}
        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div className="text-xs font-medium text-[#5B6B65]">Site visits this week</div>
          <div className="text-3xl font-extrabold text-[#14211C] my-1">11</div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E3F2EF] text-[#0B4F49]">
              4 today
            </span>
          </div>
        </Card>

        {/* KPI 3 */}
        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div className="text-xs font-medium text-[#5B6B65]">Follow-ups due</div>
          <div className="text-3xl font-extrabold text-[#14211C] my-1">18</div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FBE0DC] text-[#8F2A1D]">
              7 overdue
            </span>
          </div>
        </Card>

        {/* KPI 4 */}
        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div className="text-xs font-medium text-[#5B6B65]">Pipeline value</div>
          <div className="text-3xl font-extrabold text-[#14211C] my-1">₹ 14.2 Cr</div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FDEBD0] text-[#8A4B00]">
              9 in negotiation
            </span>
          </div>
        </Card>
      </div>

      {/* Main Row: Leads this week + Today's follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Weekly Leads Bar Chart Card */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-base text-[#14211C]">Leads this week</h3>
              <span className="text-xs font-semibold text-[#0F766E] bg-[#E3F2EF] px-2 py-0.5 rounded-md">
                50 Total Leads
              </span>
            </div>

            {/* Custom Bar Visualization matching Mockup exactly */}
            <div className="flex items-end justify-between gap-3 h-[140px] pt-4 pb-2 px-2 border-b border-[#EEF1EF]">
              {weeklyData.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] text-[#5B6B65] font-medium">{item.count}</span>
                  <div
                    className="w-full bg-[#0F766E] rounded-t-sm transition-all duration-300 hover:bg-[#115e59]"
                    style={{ height: `${item.height}px` }}
                  />
                  <span className="text-xs text-[#5B6B65] font-medium">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-[#5B6B65] mt-4 pt-1">
            Mon–Sun · Source mix:{" "}
            <span className="font-semibold text-[#14211C]">Ads 42%</span> ·{" "}
            <span className="font-semibold text-[#14211C]">Portals 31%</span> ·{" "}
            <span className="font-semibold text-[#14211C]">WhatsApp 18%</span> ·{" "}
            <span className="font-semibold text-[#14211C]">Walk-in 9%</span>
          </div>
        </Card>

        {/* Today's Follow-ups Table Card */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-base text-[#14211C]">Today&apos;s follow-ups</h3>
            <a
              href={`/c/${companySlug}/dashboard/follow-ups`}
              className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
            >
              View all ({followUps.length})
              <ExternalLink className="size-3" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                  <th className="py-2.5 px-2 font-semibold">Lead</th>
                  <th className="py-2.5 px-2 font-semibold">Task</th>
                  <th className="py-2.5 px-2 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1EF]">
                {followUps.slice(0, 4).map((f) => (
                  <tr key={f.id} className="hover:bg-[#F9FAF9] transition-colors">
                    <td className="py-3 px-2 font-semibold text-[#14211C]">
                      <a
                        href={`/c/${companySlug}/dashboard/leads/${f.leadId}`}
                        className="hover:text-[#0F766E] underline-offset-2 hover:underline"
                      >
                        {f.leadName}
                      </a>
                    </td>
                    <td className="py-3 px-2 text-[#5B6B65]">{f.task}</td>
                    <td className="py-3 px-2 text-right">
                      {f.status === "Overdue" ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FBE0DC] text-[#8F2A1D]">
                          Overdue {f.overdueDays ? `${f.overdueDays}d` : ""}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FDEBD0] text-[#8A4B00]">
                          {f.dueTime || "Today"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Quick Action Shortcuts row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <a
          href={`/c/${companySlug}/dashboard/leads`}
          className="p-3 bg-white border border-[#E3E7E4] rounded-lg hover:border-[#0F766E] transition-colors flex items-center justify-between text-xs font-semibold text-[#14211C]"
        >
          <span>Leads Kanban Board</span>
          <span className="bg-[#E3F2EF] text-[#0B4F49] px-2 py-0.5 rounded text-[11px]">8 New</span>
        </a>
        <a
          href={`/c/${companySlug}/dashboard/properties`}
          className="p-3 bg-white border border-[#E3E7E4] rounded-lg hover:border-[#0F766E] transition-colors flex items-center justify-between text-xs font-semibold text-[#14211C]"
        >
          <span>Property Catalog</span>
          <span className="bg-[#E3F2EF] text-[#0B4F49] px-2 py-0.5 rounded text-[11px]">6 Units</span>
        </a>
        <a
          href={`/c/${companySlug}/dashboard/smart-matches`}
          className="p-3 bg-white border border-[#E3E7E4] rounded-lg hover:border-[#0F766E] transition-colors flex items-center justify-between text-xs font-semibold text-[#14211C]"
        >
          <span className="flex items-center gap-1.5">
            <Flame className="size-3.5 text-[#F59E0B]" />
            Smart Matches
          </span>
          <span className="bg-[#FDEBD0] text-[#8A4B00] px-2 py-0.5 rounded text-[11px]">7 Matches</span>
        </a>
        <a
          href={`/c/${companySlug}/dashboard/site-visits`}
          className="p-3 bg-white border border-[#E3E7E4] rounded-lg hover:border-[#0F766E] transition-colors flex items-center justify-between text-xs font-semibold text-[#14211C]"
        >
          <span>Site Visits Planner</span>
          <span className="bg-[#E3F2EF] text-[#0B4F49] px-2 py-0.5 rounded text-[11px]">3 Scheduled</span>
        </a>
      </div>
    </div>
  )
}
