"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  CheckCircle2,
  Globe,
  MessageSquare,
  PhoneCall,
  Plus,
  QrCode,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function LeadSourcesPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const sources = [
    {
      name: "Facebook & Instagram Ads",
      desc: "Auto-import leads from Meta Lead Gen Forms instantly",
      status: "Connected",
      metric: "68 leads / mo",
      color: "bg-[#E3F2EF] text-[#0B4F49]",
    },
    {
      name: "99acres / MagicBricks",
      desc: "Direct webhook and email parser sync every 5 min",
      status: "Connected",
      metric: "47 leads / mo",
      color: "bg-[#E3F2EF] text-[#0B4F49]",
    },
    {
      name: "Website Form & Hoarding QR",
      desc: "Embeddable capture widget and QR codes on site hoardings",
      status: "Live",
      metric: "29 leads / mo",
      color: "bg-[#E3F2EF] text-[#0B4F49]",
    },
    {
      name: "WhatsApp Click-to-Chat",
      desc: "Meta ad button launches WhatsApp chat, auto-creates lead",
      status: "Live",
      metric: "35 leads / mo",
      color: "bg-[#E3F2EF] text-[#0B4F49]",
    },
    {
      name: "Google Sheets / CSV Sync",
      desc: "Live bidirectional sync with external caller spreadsheets",
      status: "Live",
      metric: "14 leads / mo",
      color: "bg-[#E3F2EF] text-[#0B4F49]",
    },
    {
      name: "IVR / Missed-call Number",
      desc: "Dedicated virtual number: instant callback & WhatsApp brochure",
      status: "Set up",
      metric: "18 leads / mo",
      color: "bg-[#FDEBD0] text-[#8A4B00]",
    },
  ]

  const handleConnectSource = () => {
    toast.success("Source Configuration Opened", {
      description: "Webhook secret and mapping endpoint generated.",
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Lead Sources
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Connect Meta Ads, real estate portals (99acres, MagicBricks), WhatsApp click-to-chat, and hoarding QR codes.
          </p>
        </div>

        <Button
          onClick={handleConnectSource}
          className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Connect source</span>
        </Button>
      </div>

      {/* Main Grid: Sources List & Rules matching Mockup Screen 03 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Sources List */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {sources.map((s) => (
            <Card
              key={s.name}
              className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex items-center justify-between gap-4 hover:border-[#0F766E] transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm text-[#14211C]">{s.name}</h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.color}`}>
                    {s.status}
                  </span>
                </div>
                <p className="text-xs text-[#5B6B65]">{s.desc}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="font-bold text-sm text-[#0F766E] block">{s.metric}</span>
                <span className="text-[10px] text-[#5B6B65]">synced live</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Right 1 Col: Auto-assign & Duplicate check Rules */}
        <div className="flex flex-col gap-4">
          <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
            <h3 className="font-bold text-base text-[#14211C] border-b border-[#EEF1EF] pb-2 mb-3">
              Auto-assign rule
            </h3>
            <p className="text-xs text-[#5B6B65] leading-relaxed mb-3">
              Leads are distributed automatically via <strong>Round-robin</strong> across active agents.
            </p>
            <div className="p-2.5 bg-[#F1F8F6] rounded-lg border border-[#CFE3DE] text-xs text-[#0B4F49]">
              Active roster: Sameer, Anita, Pooja, Rohit (Next in queue: Sameer)
            </div>
          </Card>

          <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
            <h3 className="font-bold text-base text-[#14211C] border-b border-[#EEF1EF] pb-2 mb-3">
              Duplicate check
            </h3>
            <p className="text-xs text-[#5B6B65] leading-relaxed mb-3">
              Checked instantly by 10-digit mobile number. Repeat inquiries append notes to the original lead without creating duplicates.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#0F766E] font-semibold">
              <CheckCircle2 className="size-4" />
              <span>Smart deduplication active</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
