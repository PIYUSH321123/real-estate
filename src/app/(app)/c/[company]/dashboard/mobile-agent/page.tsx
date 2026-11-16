"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Flame,
  MessageSquare,
  Mic,
  Navigation,
  Phone,
  Plus,
  Radio,
  Send,
  Sparkles,
  Square,
  Zap,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function MobileAgentAppPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  // 3 view states matching screens 12, 22, 23
  const [viewState, setViewState] = React.useState<"app" | "recording" | "review">("app")
  const [recordSeconds, setRecordSeconds] = React.useState(42)

  const handleStartVoiceNote = () => {
    setRecordSeconds(0)
    setViewState("recording")
  }

  // Timer simulation during voice note recording
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (viewState === "recording") {
      interval = setInterval(() => {
        setRecordSeconds((s) => s + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [viewState])

  const handleStopAndSave = () => {
    setViewState("review")
  }

  const handleConfirmAll = () => {
    setViewState("app")
    toast.success("Voice Review Confirmed!", {
      description: "Updated Meera Shah's budget to ₹90L, scheduled Sunday visit, created follow-up tasks, and queued WhatsApp message.",
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#ECEFED] min-h-screen text-[#14211C] flex flex-col items-center justify-center gap-6">
      {/* Description header */}
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-[#14211C]">
          Agent Mobile App &amp; Voice AI
        </h1>
        <p className="text-xs text-[#5B6B65] mt-1">
          Interactive preview of Mockup Screens 12, 22, and 23 in native iPhone viewport (390 × 844 px).
        </p>
      </div>

      {/* iPhone Device Frame Container (390 x 844 px) */}
      <div className="w-[390px] h-[820px] bg-white rounded-[44px] border-[10px] border-[#1F2937] shadow-2xl overflow-hidden flex flex-col relative">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-50 flex items-center justify-center">
          <div className="size-2 rounded-full bg-zinc-800 ml-auto mr-3" />
        </div>

        {/* SCREEN 1: AGENT APP (Mockup Screen 12) */}
        {viewState === "app" && (
          <div className="flex-1 bg-[#F6F7F5] flex flex-col justify-between pt-10 pb-6 px-5 overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-[#14211C]">
                    Good morning, Sameer
                  </h2>
                  <p className="text-xs text-[#5B6B65]">Baner &amp; Hinjewadi territory</p>
                </div>
                <div className="size-9 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs">
                  SK
                </div>
              </div>

              {/* 2 Top KPIs matching Mockup Screen 12 */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3.5 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs">
                  <div className="text-xs text-[#5B6B65] font-medium">Due today</div>
                  <div className="text-2xl font-black text-[#14211C] my-0.5">8</div>
                  <span className="text-[10px] font-semibold text-[#8F2A1D] bg-[#FBE0DC] px-2 py-0.5 rounded-full">
                    2 overdue
                  </span>
                </div>
                <div className="p-3.5 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs">
                  <div className="text-xs text-[#5B6B65] font-medium">Hot leads</div>
                  <div className="text-2xl font-black text-[#0F766E] my-0.5">3</div>
                  <span className="text-[10px] font-semibold text-[#0B4F49] bg-[#E3F2EF] px-2 py-0.5 rounded-full">
                    High intent
                  </span>
                </div>
              </div>

              {/* Today's Schedule Cards */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#14211C] uppercase tracking-wide">
                  Today&apos;s Field Schedule
                </span>
                <span className="text-[11px] text-[#0F766E] font-semibold">Saturday Route</span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Visit 1 */}
                <div className="p-4 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-[#14211C]">Meera Shah</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
                      11:00 AM
                    </span>
                  </div>
                  <div className="text-xs text-[#5B6B65] mb-3">
                    Hinjewadi · 2 BHK (Green Acres)
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => window.open("tel:+919822054321", "_self")}
                      className="flex-1 bg-[#F6F7F5] hover:bg-[#EEF1EF] text-[#14211C] text-xs h-8 border border-[#E3E7E4]"
                    >
                      <Phone className="size-3.5 mr-1 text-[#0F766E]" />
                      Call now
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleStartVoiceNote}
                      className="flex-1 bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs h-8 shadow-xs"
                    >
                      <Mic className="size-3.5 mr-1" />
                      Voice note
                    </Button>
                  </div>
                </div>

                {/* Visit 2 */}
                <div className="p-4 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-[#14211C]">Priya Nair</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDEBD0] text-[#8A4B00]">
                      4:30 PM
                    </span>
                  </div>
                  <div className="text-xs text-[#5B6B65] mb-3">
                    Baner · 3 BHK (Skyline Heights)
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => window.open("https://wa.me/919890145210", "_blank")}
                      className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs h-8"
                    >
                      <MessageSquare className="size-3.5 mr-1" />
                      WhatsApp
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-[#14211C] text-xs h-8 border-[#E3E7E4]"
                    >
                      <Navigation className="size-3.5 mr-1 text-[#0F766E]" />
                      Map Pin
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Action Button simulation */}
            <div className="pt-3">
              <Button
                onClick={handleStartVoiceNote}
                className="w-full bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold py-3 rounded-2xl shadow-md flex items-center justify-center gap-2"
              >
                <Mic className="size-4" />
                <span>Record Post-Visit Voice Note</span>
              </Button>
            </div>
          </div>
        )}

        {/* SCREEN 2: VOICE NOTE RECORDER (Mockup Screen 22) */}
        {viewState === "recording" && (
          <div className="flex-1 bg-[#FAF9F5] flex flex-col justify-between pt-12 pb-8 px-6 text-center">
            <div>
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewState("app")}
                  className="text-xs text-[#5B6B65]"
                >
                  <ArrowLeft className="size-4 mr-1" />
                  Back
                </Button>
                <span className="text-xs font-bold text-[#0F766E] bg-[#E3F2EF] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Radio className="size-3 animate-pulse text-[#0F766E]" />
                  Hindi detected
                </span>
              </div>

              <h2 className="text-xl font-black text-[#14211C]">Voice note</h2>
              <p className="text-xs font-semibold text-[#5B6B65] mt-1">
                After the visit with Meera Shah
              </p>
              <p className="text-[11px] text-[#0F766E] mt-0.5">
                Speak in Hindi, Marathi or English
              </p>

              {/* Big Waveform Pulse animation & Timer */}
              <div className="my-10 flex flex-col items-center justify-center">
                <div className="size-28 rounded-full bg-[#E3F2EF] border-4 border-[#0F766E] flex items-center justify-center shadow-lg relative">
                  <div className="absolute inset-0 rounded-full border-4 border-[#0F766E] animate-ping opacity-30" />
                  <Mic className="size-12 text-[#0F766E]" />
                </div>
                <div className="text-4xl font-black text-[#14211C] mt-6 tracking-tight">
                  0:{recordSeconds < 10 ? `0${recordSeconds}` : recordSeconds}
                </div>
              </div>

              <div className="p-3.5 bg-white border border-[#E3E7E4] rounded-2xl text-xs text-[#5B6B65] leading-relaxed shadow-xs text-left">
                💡 <strong>Voice guidance:</strong> Mention client budget, preferred area, upcoming visit date, and any specific concerns.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setViewState("app")}
                className="flex-1 border-[#E3E7E4] text-[#14211C] text-xs h-12 rounded-2xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleStopAndSave}
                className="flex-1 bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs h-12 rounded-2xl shadow-sm"
              >
                Stop and save
              </Button>
            </div>
          </div>
        )}

        {/* SCREEN 3: VOICE REVIEW & CONFIRM (Mockup Screen 23) */}
        {viewState === "review" && (
          <div className="flex-1 bg-[#F6F7F5] flex flex-col justify-between pt-10 pb-6 px-5 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewState("app")}
                  className="text-xs text-[#5B6B65]"
                >
                  <ArrowLeft className="size-4 mr-1" />
                  Back
                </Button>
                <h2 className="text-base font-extrabold text-[#14211C]">
                  Review and confirm
                </h2>
                <div className="w-10" />
              </div>

              {/* AI Transcript Summary matching Mockup Screen 23 */}
              <div className="p-4 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs mb-3">
                <div className="flex items-center gap-1.5 text-[#0F766E] font-bold text-xs mb-1.5">
                  <Sparkles className="size-3.5" />
                  AI Visit Summary
                </div>
                <p className="text-xs text-[#14211C] leading-relaxed">
                  &ldquo;Meera liked the Hinjewadi flat but finds the price high. Her husband will see it Sunday. Budget may go to 90 lakh.&rdquo;
                </p>
              </div>

              {/* Extracted Updates matching Mockup Screen 23 */}
              <div className="p-4 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs mb-3">
                <div className="text-[11px] font-bold text-[#5B6B65] uppercase tracking-wider mb-2">
                  Lead Profile Updates
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
                    Budget up to ₹90L
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
                    Visit Sunday
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FBE0DC] text-[#8F2A1D]">
                    Price concern
                  </span>
                </div>

                <div className="text-[11px] font-bold text-[#5B6B65] uppercase tracking-wider mb-1.5">
                  Tasks Created
                </div>
                <ul className="text-xs space-y-1 text-[#14211C]">
                  <li>• Sat 6 PM: send price options</li>
                  <li>• Sun 10 AM: confirm visit on WhatsApp</li>
                </ul>
              </div>

              {/* Draft WhatsApp message matching Mockup Screen 23 */}
              <div className="p-4 bg-[#D9F2E3] border border-[#BCE4CD] rounded-2xl text-xs mb-3 text-[#14211C]">
                <div className="font-bold text-[#075E54] mb-1 flex items-center justify-between">
                  <span>Draft WhatsApp</span>
                  <span className="text-[10px] text-[#075E54]">Auto-ready</span>
                </div>
                <p className="leading-relaxed">
                  &ldquo;Hi Meera, here are two options near ₹90L for Sunday.&rdquo;
                </p>
              </div>
            </div>

            {/* Confirm Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setViewState("recording")}
                className="flex-1 border-[#E3E7E4] text-[#14211C] text-xs h-11 rounded-2xl"
              >
                Edit
              </Button>
              <Button
                onClick={handleConfirmAll}
                className="flex-1 bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs h-11 rounded-2xl shadow-sm"
              >
                Confirm all
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
