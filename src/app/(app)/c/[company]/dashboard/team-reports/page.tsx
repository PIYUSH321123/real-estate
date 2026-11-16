"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  ArrowDown,
  Award,
  BarChart3,
  CheckCircle2,
  Clock,
  Download,
  Flame,
  LineChart,
  TrendingUp,
  Trophy,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function TeamReportsPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const funnel = [
    { label: "Leads Captured", count: 214, pct: "100%", color: "bg-[#0F766E]" },
    { label: "Contacted", count: 133, pct: "62%", color: "bg-[#115e59]" },
    { label: "Site visit", count: 66, pct: "31%", color: "bg-[#0d9488]" },
    { label: "Negotiation", count: 30, pct: "14%", color: "bg-[#14b8a6]" },
    { label: "Closed", count: 15, pct: "7%", color: "bg-[#2dd4bf]" },
  ]

  const sources = [
    { source: "Cold ads (Meta)", costLead: "₹410", costClosure: "₹6,800", quality: "Low" },
    { source: "Portals (99acres/MB)", costLead: "₹520", costClosure: "₹9,100", quality: "Medium" },
    { source: "WhatsApp Click-to-Chat", costLead: "₹180", costClosure: "₹3,200", quality: "High" },
    { source: "Referrals & Network", costLead: "₹0", costClosure: "₹0", quality: "High" },
  ]

  const leaderboard = [
    { name: "Pooja Iyer", closed: 5, value: "₹8.8 L", responseTime: "5 min" },
    { name: "Anita Rao", closed: 4, value: "₹6.4 L", responseTime: "6 min" },
    { name: "Sameer Khan", closed: 3, value: "₹6.65 L", responseTime: "6 min" },
    { name: "Rohit Jain", closed: 3, value: "₹4.2 L", responseTime: "8 min" },
  ]

  const handleExport = () => {
    toast.success("Report Exported", {
      description: "Downloaded October performance analytics in CSV and PDF formats.",
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Team &amp; Reports
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Conversion funnels, channel cost-per-closure ROI analysis, and agent closing leaderboard.
          </p>
        </div>

        <Button
          onClick={handleExport}
          className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Download className="size-4" />
          <span>Export</span>
        </Button>
      </div>

      {/* Main Grid matching Mockup Screen 11 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel Card */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-base text-[#14211C]">
                Conversion funnel · October
              </h3>
              <span className="text-xs text-[#0F766E] font-semibold">15 Closures</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {funnel.map((step) => (
                <div key={step.label} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#14211C]">{step.label}</span>
                    <span className="font-bold text-[#0F766E]">
                      {step.count} ({step.pct})
                    </span>
                  </div>
                  <div className="h-3 w-full bg-[#ECEFED] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${step.color} rounded-full transition-all duration-500`}
                      style={{ width: step.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-[#5B6B65] mt-4 pt-3 border-t border-[#EEF1EF]">
            Lead-to-visit conversion is <strong>31%</strong>; visit-to-closure rate is <strong>23%</strong>.
          </div>
        </Card>

        {/* Source ROI Card matching Mockup Screen 11 */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-base text-[#14211C]">
                Which source really pays
              </h3>
              <span className="text-xs text-[#5B6B65]">CAC vs Revenue</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                    <th className="py-2.5 px-2 font-semibold">Source</th>
                    <th className="py-2.5 px-2 font-semibold text-center">Cost / lead</th>
                    <th className="py-2.5 px-2 font-semibold text-center">Cost / closure</th>
                    <th className="py-2.5 px-2 font-semibold text-right">Quality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF1EF]">
                  {sources.map((s) => (
                    <tr key={s.source} className="hover:bg-[#F9FAF9] transition-colors">
                      <td className="py-3 px-2 font-semibold text-[#14211C]">{s.source}</td>
                      <td className="py-3 px-2 text-center text-[#5B6B65]">{s.costLead}</td>
                      <td className="py-3 px-2 text-center font-bold text-[#14211C]">
                        {s.costClosure}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            s.quality === "High"
                              ? "bg-[#E3F2EF] text-[#0B4F49]"
                              : s.quality === "Medium"
                              ? "bg-[#FDEBD0] text-[#8A4B00]"
                              : "bg-[#FBE0DC] text-[#8F2A1D]"
                          }`}
                        >
                          {s.quality}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-xs text-[#5B6B65] mt-4 pt-3 border-t border-[#EEF1EF]">
            WhatsApp and Referral channels provide <strong>3.8x lower acquisition costs</strong> compared to web portals.
          </div>
        </Card>
      </div>

      {/* Leaderboard Card matching Mockup Screen 11 */}
      <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="size-5 text-[#F59E0B]" />
            <h3 className="font-semibold text-base text-[#14211C]">Leaderboard</h3>
          </div>
          <span className="text-xs font-semibold text-[#0F766E] bg-[#E3F2EF] px-2.5 py-1 rounded-full">
            Median first response: 6 min
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaderboard.map((agent, i) => (
            <div key={agent.name} className="p-3 bg-[#F6F7F5] rounded-xl border border-[#E3E7E4]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-[#14211C]">{agent.name}</span>
                <span className="text-[10px] font-bold text-[#0F766E] bg-[#E3F2EF] px-1.5 py-0.5 rounded">
                  Rank #{i + 1}
                </span>
              </div>
              <div className="text-2xl font-black text-[#0F766E]">{agent.closed} closed</div>
              <div className="text-[11px] text-[#5B6B65] mt-1 flex justify-between">
                <span>Rev: {agent.value}</span>
                <span>Resp: {agent.responseTime}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
