"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  CheckCircle2,
  Globe,
  Layers,
  MessageSquare,
  Save,
  Shield,
  Smartphone,
  Sparkles,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function SettingsPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [agencyName, setAgencyName] = React.useState("Gharsetu Real Estate")
  const [phone, setPhone] = React.useState("+91 98201 44521")
  const [selectedPlan, setSelectedPlan] = React.useState("agency")

  const handleSave = () => {
    toast.success("Settings Saved", {
      description: "Workspace preferences and branding parameters updated successfully.",
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Settings &amp; Plans
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Configure multi-lingual client messaging, agency branding, role data isolation, and subscriptions.
          </p>
        </div>

        <Button
          onClick={handleSave}
          className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Save className="size-4" />
          <span>Save</span>
        </Button>
      </div>

      {/* Main Grid matching Mockup Screen 17 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workspace Card */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              Workspace
            </h3>

            <div className="flex flex-col gap-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-[#F1F8F6] border border-[#CFE3DE] rounded-lg">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="size-4 text-[#0F766E]" />
                  <div>
                    <div className="font-bold text-[#14211C]">WhatsApp Business API</div>
                    <div className="text-[11px] text-[#5B6B65]">Cloud API verified &amp; live</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
                  Connected
                </span>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1">Supported Languages</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#E3F2EF] text-[#0B4F49]">
                    English
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#E3F2EF] text-[#0B4F49]">
                    Hindi (हिंदी)
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#E3F2EF] text-[#0B4F49]">
                    Marathi (मराठी)
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1">Agency Branding</div>
                <p className="text-[#5B6B65] leading-relaxed">
                  Agency logo, RERA badge, and agent business cards are auto-watermarked on property PDF brochures.
                </p>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1">Team Roles &amp; Permissions</div>
                <div className="text-[#5B6B65] mt-1 space-y-1">
                  <div>• <strong>Owner:</strong> Full agency analytics, billing, and all leads.</div>
                  <div>• <strong>Manager:</strong> Team reports, lead re-allocation, and co-broking.</div>
                  <div>• <strong>Agent:</strong> Can strictly see only their own assigned leads.</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Plans Card */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              Subscription Plans
            </h3>

            <div className="flex flex-col gap-4 text-xs">
              <div
                onClick={() => setSelectedPlan("solo")}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedPlan === "solo"
                    ? "bg-[#F1F8F6] border-[#0F766E]"
                    : "bg-[#F6F7F5] border-[#E3E7E4]"
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-[#14211C]">Solo Agent</div>
                  <div className="text-[11px] text-[#5B6B65]">1 user · leads, WhatsApp, catalog, mobile app</div>
                </div>
                <span className="font-bold text-sm text-[#14211C]">₹ 1,999 / mo</span>
              </div>

              <div
                onClick={() => setSelectedPlan("agency")}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedPlan === "agency"
                    ? "bg-[#F1F8F6] border-[#0F766E]"
                    : "bg-[#F6F7F5] border-[#E3E7E4]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-[#0F766E]">
                    <span>Agency Pro</span>
                    <span className="text-[10px] bg-[#E3F2EF] px-1.5 py-0.5 rounded">Active</span>
                  </div>
                  <div className="text-[11px] text-[#5B6B65]">
                    Up to 10 agents, tracker, commissions, reports &amp; mini-websites
                  </div>
                </div>
                <span className="font-bold text-sm text-[#0F766E]">₹ 7,999 / mo</span>
              </div>

              <div className="p-3.5 bg-[#F6F7F5] rounded-xl border border-[#E3E7E4]">
                <div className="font-bold text-xs text-[#14211C] mb-1">Add-ons Activated:</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded bg-white border border-[#E3E7E4] text-[11px]">
                    Co-broking Network
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white border border-[#E3E7E4] text-[11px]">
                    Document Vault
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white border border-[#E3E7E4] text-[11px]">
                    Call Tracking &amp; AI
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#EEF1EF] text-center text-xs text-[#5B6B65]">
            Renewal Date: <strong>16 December 2026</strong> · GST Invoice enabled
          </div>
        </Card>
      </div>
    </div>
  )
}
