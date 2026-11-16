"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  FileText,
  Mic,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  Play,
  Plus,
  Sparkles,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function CallsPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const calls = [
    {
      id: "call-1",
      caller: "+91 98901 45210 (Priya Nair)",
      time: "Today, 4:15 PM",
      duration: "3m 42s",
      status: "Answered",
      action: "AI summary ready",
      tagColor: "bg-[#E3F2EF] text-[#0B4F49]",
    },
    {
      id: "call-2",
      caller: "+91 98220 54321 (Meera Shah)",
      time: "Today, 2:30 PM",
      duration: "Missed",
      status: "Missed",
      action: "Lead created + WhatsApp sent",
      tagColor: "bg-[#FDEBD0] text-[#8A4B00]",
    },
    {
      id: "call-3",
      caller: "+91 98211 87654 (Rahul Desai)",
      time: "Yesterday, 6:00 PM",
      duration: "5m 10s",
      status: "Answered",
      action: "Site visit booked for Saturday",
      tagColor: "bg-[#E3F2EF] text-[#0B4F49]",
    },
    {
      id: "call-4",
      caller: "+91 97654 33221 (New caller)",
      time: "Yesterday, 11:20 AM",
      duration: "Missed",
      status: "Missed",
      action: "Lead created + WhatsApp sent",
      tagColor: "bg-[#FDEBD0] text-[#8A4B00]",
    },
  ]

  const handleAddNumber = () => {
    toast.success("Virtual Number Assigned", {
      description: "Allocated dedicated Pune cloud tracking number (+91 20 6789 1234) for outdoor hoardings.",
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Calls &amp; Missed-call Leads
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Cloud telephony tracking, automated WhatsApp reply on missed calls, and AI call summarization.
          </p>
        </div>

        <Button
          onClick={handleAddNumber}
          className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Add tracking number</span>
        </Button>
      </div>

      {/* Main Grid: Call Log & Latest Call Summary matching Mockup Screen 13 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Call Log */}
        <Card className="lg:col-span-2 p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-base text-[#14211C]">Call log</h3>
            <span className="text-xs text-[#5B6B65]">Virtual IVR + SIM recording</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                  <th className="py-2.5 px-3 font-semibold">Caller</th>
                  <th className="py-2.5 px-3 font-semibold">Time</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Duration</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Auto Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1EF]">
                {calls.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F9FAF9] transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#14211C] flex items-center gap-2">
                      {c.status === "Missed" ? (
                        <PhoneMissed className="size-3.5 text-[#8F2A1D]" />
                      ) : (
                        <PhoneIncoming className="size-3.5 text-[#0F766E]" />
                      )}
                      <span>{c.caller}</span>
                    </td>
                    <td className="py-3 px-3 text-[#5B6B65]">{c.time}</td>
                    <td className="py-3 px-3 text-center text-[#5B6B65]">{c.duration}</td>
                    <td className="py-3 px-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${c.tagColor}`}>
                        {c.action}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right 1 Col: Latest Call Summary */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-[#EEF1EF] pb-3 mb-4">
              <Sparkles className="size-4 text-[#0F766E]" />
              <h3 className="font-semibold text-base text-[#14211C]">
                Latest call summary
              </h3>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-[#F1F8F6] border border-[#CFE3DE] rounded-lg">
                <div className="font-bold text-[#0F766E] mb-1">Priya Nair · 3m 42s</div>
                <p className="text-[#14211C] leading-relaxed">
                  &ldquo;Client wants 3 BHK near Baner school, budget stretches to ₹1.5 Cr. Spouse to visit Saturday. Needs home loan partner assistance.&rdquo;
                </p>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1">Key Action Items Detected:</div>
                <ul className="list-disc pl-4 text-[#5B6B65] space-y-1">
                  <li>Schedule Saturday 11 AM site visit for Skyline Heights</li>
                  <li>Dispatch 2 home loan partner eligibility options</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#EEF1EF] flex items-center justify-between">
            <span className="text-xs text-[#5B6B65]">Transcription accuracy: 98%</span>
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-7 text-[#0F766E] border-[#0F766E] hover:bg-[#E3F2EF]"
            >
              Play audio
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
