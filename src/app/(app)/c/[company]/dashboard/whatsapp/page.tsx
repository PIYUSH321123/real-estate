"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  ArrowDown,
  Clock,
  MessageSquare,
  Play,
  Plus,
  Send,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function WhatsAppAutomationPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [activeFlow, setActiveFlow] = React.useState("New lead welcome")

  const handleTestFlow = () => {
    toast.success("Test Message Dispatched", {
      description: "Dispatched WhatsApp template test to your registered phone number.",
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            WhatsApp Automation
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Automated drip sequences, interactive property brochures, and smart agent task escalation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleTestFlow}
            className="border-[#0F766E] text-[#0F766E] hover:bg-[#E3F2EF] font-semibold text-xs h-9 px-3"
          >
            <Play className="size-3.5 mr-1" />
            Test flow
          </Button>
          <Button className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm text-xs h-9 cursor-pointer">
            <Plus className="size-4" />
            <span>New flow</span>
          </Button>
        </div>
      </div>

      {/* 3 Columns Layout matching Mockup Screen 04 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Col 1 (3 cols): Flows List */}
        <Card className="lg:col-span-3 p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col gap-2.5">
          <h3 className="font-bold text-sm text-[#14211C] border-b border-[#EEF1EF] pb-2 mb-1">
            Flows
          </h3>

          <div
            onClick={() => setActiveFlow("New lead welcome")}
            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
              activeFlow === "New lead welcome"
                ? "bg-[#F1F8F6] border-[#0F766E]"
                : "bg-[#F6F7F5] border-[#E3E7E4] hover:bg-[#EEF1EF]"
            }`}
          >
            <div>
              <div className="font-bold text-xs text-[#14211C]">New lead welcome</div>
              <div className="text-[10px] text-[#5B6B65]">Drip sequence (4 steps)</div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
              Active
            </span>
          </div>

          <div
            onClick={() => setActiveFlow("Site visit reminder")}
            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
              activeFlow === "Site visit reminder"
                ? "bg-[#F1F8F6] border-[#0F766E]"
                : "bg-[#F6F7F5] border-[#E3E7E4] hover:bg-[#EEF1EF]"
            }`}
          >
            <div>
              <div className="font-bold text-xs text-[#14211C]">Site visit reminder</div>
              <div className="text-[10px] text-[#5B6B65]">Map pin + slots</div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
              Active
            </span>
          </div>

          <div
            onClick={() => setActiveFlow("Old lead revival")}
            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
              activeFlow === "Old lead revival"
                ? "bg-[#F1F8F6] border-[#0F766E]"
                : "bg-[#F6F7F5] border-[#E3E7E4] hover:bg-[#EEF1EF]"
            }`}
          >
            <div>
              <div className="font-bold text-xs text-[#14211C]">Old lead revival</div>
              <div className="text-[10px] text-[#5B6B65]">30+ days inactive</div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FDEBD0] text-[#8A4B00]">
              Draft
            </span>
          </div>
        </Card>

        {/* Col 2 (5 cols): Visual Flow Builder matching Mockup Screen 04 */}
        <Card className="lg:col-span-5 p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-sm text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              {activeFlow} · Flow Builder
            </h3>

            <div className="flex flex-col items-center gap-2 text-xs">
              {/* Trigger */}
              <div className="w-full p-3 bg-[#F6F7F5] border border-[#E3E7E4] rounded-lg">
                <div className="font-bold text-[#0F766E] uppercase tracking-wide text-[10px] mb-0.5">
                  Trigger
                </div>
                <div className="font-semibold text-[#14211C]">
                  New lead captured from any connected source
                </div>
              </div>

              <ArrowDown className="size-4 text-[#5B6B65]" />

              {/* Step 1 */}
              <div className="w-full p-3 bg-[#F1F8F6] border border-[#CFE3DE] rounded-lg">
                <div className="font-bold text-[#0F766E] text-[10px] mb-0.5">Step 1 · WhatsApp Template</div>
                <div className="text-[#14211C] font-medium">
                  Send: Welcome greeting + 3 matching property cards with price
                </div>
              </div>

              <ArrowDown className="size-4 text-[#5B6B65]" />

              {/* Step 2 */}
              <div className="w-full p-2.5 bg-[#F6F7F5] border border-[#E3E7E4] rounded-lg text-center font-medium text-[#5B6B65]">
                Wait 1 day
              </div>

              <ArrowDown className="size-4 text-[#5B6B65]" />

              {/* Step 3 */}
              <div className="w-full p-3 bg-[#F1F8F6] border border-[#CFE3DE] rounded-lg">
                <div className="font-bold text-[#0F766E] text-[10px] mb-0.5">Step 2 · Condition</div>
                <div className="text-[#14211C] font-medium">
                  If no reply: dispatch PDF brochure + Saturday visit time slots
                </div>
              </div>

              <ArrowDown className="size-4 text-[#5B6B65]" />

              {/* Step 4 */}
              <div className="w-full p-3 bg-[#FBE0DC] border border-[#F5C2BC] rounded-lg">
                <div className="font-bold text-[#8F2A1D] text-[10px] mb-0.5">Step 3 · Escalation</div>
                <div className="text-[#8F2A1D] font-medium">
                  If still no reply after 3 days: auto-create urgent phone call task for agent
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Col 3 (4 cols): Live WhatsApp Chat Simulation */}
        <Card className="lg:col-span-4 p-5 bg-[#E5DDD5] border border-[#D1D7DB] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#075E54]/20 pb-3 mb-4 text-[#075E54]">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-[#128C7E] text-white flex items-center justify-center text-xs font-bold">
                  G
                </div>
                <div>
                  <div className="font-bold text-xs text-[#14211C]">Gharsetu Bot</div>
                  <div className="text-[10px] text-[#075E54]">Priya Nair preview</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#075E54]">WhatsApp Business</span>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg shadow-xs max-w-[90%] leading-relaxed text-[#14211C]">
                <p className="font-semibold mb-1">Namaste Priya! 🙏</p>
                <p>
                  Thank you for your interest in 3 BHK homes in Baner. Based on your ₹1.2–1.5 Cr budget, here are our top 3 verified matches:
                </p>
                <div className="mt-2 p-2 bg-[#F6F7F5] rounded border text-[11px]">
                  <strong>1. Skyline Heights</strong> · 3 BHK (1,280 sqft) · ₹1.45 Cr (Ready)
                </div>
                <span className="block text-[9px] text-right text-[#5B6B65] mt-1">10:02 AM</span>
              </div>

              <div className="bg-[#D9F2E3] p-3 rounded-lg shadow-xs max-w-[90%] self-end leading-relaxed text-[#14211C]">
                <p>Can you tell me about the parking slots and possession date?</p>
                <span className="block text-[9px] text-right text-[#5B6B65] mt-1">10:14 AM · Read</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2 bg-white/80 rounded-md text-[10px] text-center text-[#5B6B65]">
            Webhook auto-categorized client response as <strong>Hot Lead (Score: 86)</strong>
          </div>
        </Card>
      </div>
    </div>
  )
}
