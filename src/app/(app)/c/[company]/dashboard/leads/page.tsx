"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Filter,
  Flame,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Sparkles,
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
import { Lead, LeadSource, LeadStatus } from "@/types/real-estate"

const STAGES: { status: LeadStatus; label: string; count: number }[] = [
  { status: "New", label: "New", count: 8 },
  { status: "Contacted", label: "Contacted", count: 6 },
  { status: "Site visit", label: "Site visit", count: 5 },
  { status: "Negotiation", label: "Negotiation", count: 4 },
  { status: "Closed", label: "Closed", count: 3 },
]

export default function LeadsPipelinePage() {
  const params = useParams()
  const router = useRouter()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [leads, setLeads] = React.useState<Lead[]>(gharsetuStore.leads)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sourceFilter, setSourceFilter] = React.useState("all")
  const [agentFilter, setAgentFilter] = React.useState("all")
  const [dialogOpen, setDialogOpen] = React.useState(false)

  // New lead form
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
      tags: [`${leadLocality} preference`, "Direct enquiry"],
    })

    setLeads([...gharsetuStore.leads])
    setLeadName("")
    setLeadMobile("")
    setDialogOpen(false)
  }

  // Filtered leads
  const filteredLeads = React.useMemo(() => {
    return leads.filter((lead) => {
      const matchSearch =
        !searchTerm ||
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.bhk.toLowerCase().includes(searchTerm.toLowerCase())

      const matchSource = sourceFilter === "all" || lead.source === sourceFilter
      const matchAgent = agentFilter === "all" || lead.assignedAgent === agentFilter

      return matchSearch && matchSource && matchAgent
    })
  }, [leads, searchTerm, sourceFilter, agentFilter])

  // Move lead forward or backward in pipeline
  const handleMoveStatus = (leadId: string, currentStatus: LeadStatus) => {
    const stageOrder: LeadStatus[] = ["New", "Contacted", "Site visit", "Negotiation", "Closed"]
    const currentIndex = stageOrder.indexOf(currentStatus)
    const nextStatus = stageOrder[(currentIndex + 1) % stageOrder.length]
    gharsetuStore.updateLeadStatus(leadId, nextStatus)
    setLeads([...gharsetuStore.leads])
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Leads &amp; Pipeline
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            5-stage conversion pipeline with drag-and-drop tracking and WhatsApp integration.
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
                  Enter client information to initiate qualification and automated messaging.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Client Name</Label>
                  <Input
                    id="name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Meera Deshpande"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile</Label>
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
                  <div className="grid gap-2">
                    <Label htmlFor="locality">Locality</Label>
                    <Input
                      id="locality"
                      value={leadLocality}
                      onChange={(e) => setLeadLocality(e.target.value)}
                      placeholder="e.g. Wakad"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      value={leadBudget}
                      onChange={(e) => setLeadBudget(e.target.value)}
                      placeholder="e.g. ₹90 L"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="source">Source</Label>
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
                        <SelectItem value="Referral">Referral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="agent">Agent</Label>
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
                  Add Lead
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Bar matching Mockup Screen 02 */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 border border-[#E3E7E4] rounded-xl shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 size-4 text-[#5B6B65]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads…"
            className="pl-9 bg-[#F6F7F5] border-0 text-xs h-9"
          />
        </div>

        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[140px] text-xs h-9 bg-white border-[#E3E7E4]">
            <SelectValue placeholder="Source ▾" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Facebook Ad">Facebook Ad</SelectItem>
            <SelectItem value="99acres">99acres</SelectItem>
            <SelectItem value="MagicBricks">MagicBricks</SelectItem>
            <SelectItem value="WhatsApp">WhatsApp</SelectItem>
            <SelectItem value="Website">Website</SelectItem>
            <SelectItem value="Referral">Referral</SelectItem>
          </SelectContent>
        </Select>

        <Select value={agentFilter} onValueChange={setAgentFilter}>
          <SelectTrigger className="w-[140px] text-xs h-9 bg-white border-[#E3E7E4]">
            <SelectValue placeholder="Agent ▾" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Agents</SelectItem>
            <SelectItem value="Sameer Khan">Sameer Khan</SelectItem>
            <SelectItem value="Anita Rao">Anita Rao</SelectItem>
            <SelectItem value="Pooja Iyer">Pooja Iyer</SelectItem>
            <SelectItem value="Rohit Jain">Rohit Jain</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 5-Column Kanban Board matching Mockup Screen 02 */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 items-start">
        {STAGES.map((col) => {
          const columnLeads = filteredLeads.filter((l) => l.status === col.status)
          return (
            <div
              key={col.status}
              className="bg-[#ECEFED] rounded-xl p-3 flex flex-col gap-2.5 min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1 pb-1">
                <span className="font-bold text-[13px] text-[#14211C]">
                  {col.label} ({columnLeads.length})
                </span>
                <span className="text-[11px] text-[#5B6B65] font-semibold">
                  Stage {STAGES.indexOf(col) + 1}
                </span>
              </div>

              {/* Cards in column */}
              <div className="flex flex-col gap-2.5">
                {columnLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    className="p-3.5 bg-white border border-[#E3E7E4] rounded-lg shadow-xs hover:border-[#0F766E] transition-all cursor-pointer group"
                    onClick={() => router.push(`/c/${companySlug}/dashboard/leads/${lead.id}`)}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1.5">
                      <span className="font-bold text-[13px] text-[#14211C] group-hover:text-[#0F766E] transition-colors">
                        {lead.name}
                      </span>
                      {lead.heat === "Hot" && (
                        <span className="inline-flex items-center text-[10px] font-bold text-[#8F2A1D] bg-[#FBE0DC] px-1.5 py-0.5 rounded">
                          <Flame className="size-2.5 mr-0.5" />
                          {lead.score}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#5B6B65] font-medium mb-2.5">
                      {lead.bhk} · {lead.locality} · {lead.budgetDisplay}
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#EEF1EF]">
                      <span className="inline-block px-2 py-0.5 rounded-full font-semibold bg-[#E3F2EF] text-[#0B4F49]">
                        {lead.source}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMoveStatus(lead.id, lead.status)
                        }}
                        className="text-[10px] text-[#0F766E] hover:underline font-semibold"
                        title="Move to next stage"
                      >
                        Advance →
                      </button>
                    </div>
                  </Card>
                ))}

                {columnLeads.length === 0 && (
                  <div className="text-center py-8 text-xs text-[#8A9993]">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
