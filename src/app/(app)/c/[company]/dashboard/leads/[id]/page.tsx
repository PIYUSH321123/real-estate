"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  FileText,
  Flame,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  Zap,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { gharsetuStore } from "@/lib/mock/store"
import { toast } from "sonner"

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"
  const leadId = (Array.isArray(params.id) ? params.id[0] : params.id) || "lead-3"

  const lead =
    gharsetuStore.leads.find((l) => l.id === leadId) ||
    gharsetuStore.leads.find((l) => l.name.toLowerCase().includes("priya")) ||
    gharsetuStore.leads[2]

  const [executedAction, setExecutedAction] = React.useState(false)

  const handleDoItForMe = () => {
    setExecutedAction(true)
    toast.success("Action Executed Successfully", {
      description: "Dispatched 2 loan partner options and sent Saturday 11:00 AM calendar invite on WhatsApp.",
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Navigation & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-[#5B6B65] hover:text-[#14211C] p-2"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C] flex items-center gap-3">
              {lead.name}
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
                {lead.status}
              </span>
            </h1>
            <p className="text-xs text-[#5B6B65] mt-0.5">
              Lead ID: {lead.id} · Assigned to {lead.assignedAgent}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            className="border-[#0F766E] text-[#0F766E] hover:bg-[#E3F2EF] flex items-center gap-2 font-medium"
            onClick={() => window.open(`tel:${lead.mobile}`, "_self")}
          >
            <Phone className="size-4" />
            <span>Call</span>
          </Button>

          <Button
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center gap-2 font-medium shadow-xs"
            onClick={() => window.open(`https://wa.me/${lead.mobile.replace(/\D/g, "")}`, "_blank")}
          >
            <MessageSquare className="size-4" />
            <span>WhatsApp</span>
          </Button>
        </div>
      </div>

      {/* 3 Panels Layout matching Mockup Screen 07 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile Card */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col gap-4">
          <h3 className="font-bold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3">
            Profile
          </h3>

          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-[#5B6B65]">Phone</span>
              <span className="font-semibold text-[#14211C]">{lead.mobile}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[#5B6B65]">Budget</span>
              <span className="font-bold text-[#0F766E]">{lead.budgetDisplay}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[#5B6B65]">Wants</span>
              <span className="font-semibold text-[#14211C]">
                {lead.bhk} · {lead.locality}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[#5B6B65]">Source</span>
              <span className="inline-block px-2 py-0.5 rounded-full font-semibold bg-[#E3F2EF] text-[#0B4F49]">
                {lead.source}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[#5B6B65]">Agent</span>
              <span className="font-semibold text-[#14211C]">{lead.assignedAgent}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2 border-t border-[#EEF1EF]">
            {lead.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]"
              >
                {tag}
              </span>
            ))}
          </div>
        </Card>

        {/* Activity Timeline Card */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col gap-4">
          <h3 className="font-bold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3">
            Activity timeline
          </h3>

          <div className="flex flex-col gap-4 text-xs">
            <div className="p-3 bg-[#F1F8F6] border border-[#CFE3DE] rounded-lg">
              <div className="font-bold text-[#0F766E] flex items-center gap-1.5 mb-1">
                <Sparkles className="size-3.5" />
                Call summary (AI)
              </div>
              <p className="text-[#14211C] leading-relaxed">
                Wants 3 BHK near Baner school, budget stretches to ₹1.5 Cr. Spouse to visit Saturday. Needs home loan.
              </p>
            </div>

            <div className="flex flex-col gap-1 pl-2 border-l-2 border-[#E3E7E4]">
              <div className="font-semibold text-[#14211C]">WhatsApp: replied</div>
              <p className="text-[#5B6B65]">Asked about parking and possession date · 2h ago</p>
            </div>

            <div className="flex flex-col gap-1 pl-2 border-l-2 border-[#E3E7E4]">
              <div className="font-semibold text-[#14211C]">Opened brochure 3 times</div>
              <p className="text-[#5B6B65]">Skyline Heights PDF · yesterday</p>
            </div>

            <div className="flex flex-col gap-1 pl-2 border-l-2 border-[#E3E7E4]">
              <div className="font-semibold text-[#14211C]">Lead created</div>
              <p className="text-[#5B6B65]">Facebook Ad form · 4 days ago</p>
            </div>
          </div>
        </Card>

        {/* AI Lead Score & Next Action Card */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3">
              AI lead score
            </h3>

            <div className="flex items-center gap-3 my-4">
              <div className="text-4xl font-black text-[#14211C]">{lead.score}</div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FBE0DC] text-[#8F2A1D]">
                <Flame className="size-3.5 fill-current" />
                {lead.heat}
              </span>
            </div>

            <p className="text-xs text-[#5B6B65] leading-relaxed">
              {lead.scoreReason || "Why: replied fast, reopened brochure, budget matches 5 listings."}
            </p>
          </div>

          <div className="p-4 bg-[#F6F7F5] rounded-xl border border-[#E3E7E4] flex flex-col gap-3">
            <div>
              <div className="text-[11px] font-bold text-[#0F766E] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Zap className="size-3.5" />
                Next best action
              </div>
              <p className="text-xs font-semibold text-[#14211C]">
                {lead.nextBestAction || "Send 2 loan partners and confirm Saturday 11 AM visit"}
              </p>
            </div>

            <Button
              onClick={handleDoItForMe}
              disabled={executedAction}
              className={`w-full text-xs font-semibold py-2 rounded-lg cursor-pointer ${
                executedAction
                  ? "bg-[#E3F2EF] text-[#0B4F49]"
                  : "bg-[#0F766E] hover:bg-[#0d655e] text-white shadow-xs"
              }`}
            >
              {executedAction ? (
                <span className="flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="size-4" />
                  Action Dispatched!
                </span>
              ) : (
                "Do it for me"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
