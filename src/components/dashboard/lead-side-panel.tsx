"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import {
  Calendar,
  CheckCircle2,
  ExternalLink,
  Flame,
  MessageSquare,
  Phone,
  Plus,
  Send,
  Sparkles,
  User,
  X,
  Zap,
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lead } from "@/types/real-estate"
import { toast } from "sonner"

interface LeadSidePanelProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadSidePanel({ lead, open, onOpenChange }: LeadSidePanelProps) {
  const router = useRouter()
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [newNote, setNewNote] = React.useState("")

  if (!lead) return null

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote) return

    if (!lead.activities) lead.activities = []
    lead.activities.unshift({
      id: `act-${Date.now()}`,
      type: "note",
      title: "Agent Note",
      description: newNote,
      timestamp: "Just now",
    })

    setNewNote("")
    toast.success("Note Saved", {
      description: "Appended to client interaction timeline.",
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[460px] bg-white p-0 flex flex-col justify-between border-l border-[#E3E7E4] shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#EEF1EF] bg-[#F6F7F5]">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <SheetTitle className="text-xl font-bold text-[#14211C]">
                  {lead.name}
                </SheetTitle>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
                  {lead.status}
                </span>
              </div>
              <SheetDescription className="text-xs text-[#5B6B65] mt-0.5">
                Assigned to {lead.assignedAgent} · Source: {lead.source}
              </SheetDescription>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FBE0DC] text-[#8F2A1D] text-xs font-bold">
              <Flame className="size-3.5 fill-current" />
              <span>Score {lead.score}</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 mt-4">
            <Button
              size="sm"
              onClick={() => window.open(`tel:${lead.mobile}`, "_self")}
              className="flex-1 bg-[#F1F8F6] hover:bg-[#E3F2EF] text-[#0F766E] border border-[#CFE3DE] text-xs h-9 font-semibold"
            >
              <Phone className="size-3.5 mr-1.5" />
              Call Now
            </Button>
            <Button
              size="sm"
              onClick={() => window.open(`https://wa.me/${lead.mobile.replace(/\D/g, "")}`, "_blank")}
              className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs h-9 font-semibold shadow-xs"
            >
              <MessageSquare className="size-3.5 mr-1.5" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 text-xs">
          {/* Key Parameters */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#F6F7F5] rounded-xl border border-[#E3E7E4]">
            <div>
              <span className="text-[#5B6B65] text-[11px] block">Budget Range</span>
              <span className="font-extrabold text-[#0F766E] text-sm">{lead.budgetDisplay}</span>
            </div>
            <div>
              <span className="text-[#5B6B65] text-[11px] block">Configuration</span>
              <span className="font-bold text-[#14211C] text-sm">{lead.bhk}</span>
            </div>
            <div>
              <span className="text-[#5B6B65] text-[11px] block">Preferred Area</span>
              <span className="font-semibold text-[#14211C]">{lead.locality}, Pune</span>
            </div>
            <div>
              <span className="text-[#5B6B65] text-[11px] block">Mobile</span>
              <span className="font-semibold text-[#14211C]">{lead.mobile}</span>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="p-3.5 bg-[#F1F8F6] border border-[#CFE3DE] rounded-xl">
            <div className="flex items-center gap-1.5 font-bold text-[#0F766E] mb-1">
              <Sparkles className="size-3.5" />
              Next Best Action
            </div>
            <p className="text-[#14211C] leading-relaxed">
              {lead.nextBestAction || "Send 2 loan partner options and confirm Saturday 11 AM site visit for Skyline Heights."}
            </p>
          </div>

          {/* Activity Timeline */}
          <div>
            <div className="font-bold text-xs text-[#14211C] uppercase tracking-wider mb-2.5">
              Recent Activity Timeline
            </div>
            <div className="flex flex-col gap-2.5 pl-2 border-l-2 border-[#E3E7E4]">
              {lead.activities?.map((act) => (
                <div key={act.id} className="relative pl-3">
                  <span className="absolute -left-[17px] top-1 size-2 rounded-full bg-[#0F766E]" />
                  <div className="font-semibold text-[#14211C]">{act.title}</div>
                  <div className="text-[#5B6B65] leading-relaxed mt-0.5">{act.description}</div>
                  <span className="text-[10px] text-[#8A9993] block mt-0.5">{act.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add Note Form */}
          <form onSubmit={handleAddNote} className="flex flex-col gap-2 pt-2 border-t border-[#EEF1EF]">
            <span className="font-bold text-xs text-[#14211C]">Log Interaction Note</span>
            <div className="flex items-center gap-2">
              <Input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="e.g. Client requested 2 car parks..."
                className="text-xs h-9 bg-[#F6F7F5]"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs h-9 px-3 shrink-0"
              >
                Save
              </Button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EEF1EF] bg-[#F6F7F5] flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs text-[#5B6B65]"
          >
            Close
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onOpenChange(false)
              router.push(`/c/${companySlug}/dashboard/leads/${lead.id}`)
            }}
            className="bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Open Full Profile</span>
            <ExternalLink className="size-3.5" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
