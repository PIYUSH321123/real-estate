"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  ExternalLink,
  Globe,
  Layout,
  MessageSquare,
  QrCode,
  Send,
  Share2,
  Sparkles,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function AgentMiniWebsitePage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [template, setTemplate] = React.useState("Clean")
  const [slug, setSlug] = React.useState("sameer")

  const handlePublish = () => {
    toast.success("Mini-Website Published!", {
      description: `Live at https://gharsetu.com/${slug}. All form entries route straight to your leads Kanban.`,
    })
  }

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello! View my verified Pune property portfolio at https://gharsetu.com/${slug} - featuring verified homes in Baner, Wakad, and Hinjewadi.`
    )
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Agent Mini-website
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Personal digital storefront for consultants to showcase verified listings and capture buyer inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            onClick={handleShareWhatsApp}
            className="border-[#0F766E] text-[#0F766E] hover:bg-[#E3F2EF] font-semibold text-xs h-9 px-3"
          >
            <MessageSquare className="size-3.5 mr-1" />
            Send on WhatsApp
          </Button>
          <Button
            onClick={handlePublish}
            className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm text-xs h-9 cursor-pointer"
          >
            <Globe className="size-4" />
            <span>Publish site</span>
          </Button>
        </div>
      </div>

      {/* Main Grid: Settings & Live Preview matching Mockup Screen 18 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Site Settings */}
        <Card className="lg:col-span-5 p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              Site settings
            </h3>

            <div className="flex flex-col gap-4 text-xs">
              <div className="grid gap-1.5">
                <Label className="text-[#5B6B65]">Design Template</Label>
                <div className="flex gap-2">
                  {["Clean", "Bold", "Classic"].map((t) => (
                    <Button
                      key={t}
                      type="button"
                      variant={template === t ? "default" : "outline"}
                      onClick={() => setTemplate(t)}
                      className={`flex-1 text-xs h-8 ${
                        template === t
                          ? "bg-[#0F766E] text-white"
                          : "border-[#E3E7E4] text-[#14211C]"
                      }`}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="address" className="text-[#5B6B65]">Personal URL Address</Label>
                <div className="flex items-center gap-1 bg-[#F6F7F5] border border-[#E3E7E4] rounded-lg px-3 py-1.5">
                  <span className="text-[#5B6B65]">gharsetu.com/</span>
                  <input
                    id="address"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="font-bold text-[#14211C] bg-transparent outline-none w-full"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1">Listings shown</div>
                <div className="text-[#5B6B65]">
                  6 of 6 inventory units picked from your catalog. Automatically syncs price adjustments.
                </div>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1">Lead capture fields</div>
                <div className="text-[#5B6B65]">
                  Client Name · Mobile Number · Preferred BHK · Budget Target
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#F1F8F6] border border-[#CFE3DE] rounded-lg mt-6 text-[11px] text-[#0B4F49]">
            Every form entry automatically becomes a real estate lead in your pipeline with source <strong>Website</strong>.
          </div>
        </Card>

        {/* Right 7 Cols: Live Mini-Website Preview matching Mockup Screen 18 */}
        <Card className="lg:col-span-7 p-6 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div className="border border-[#E3E7E4] rounded-xl overflow-hidden shadow-xs">
            {/* Browser top mock */}
            <div className="bg-[#ECEFED] px-4 py-2 border-b border-[#E3E7E4] flex items-center justify-between text-xs text-[#5B6B65]">
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full bg-[#E3544D]" />
                <div className="size-2.5 rounded-full bg-[#E5B537]" />
                <div className="size-2.5 rounded-full bg-[#57C344]" />
              </div>
              <span className="font-mono text-[11px]">gharsetu.com/{slug}</span>
              <ExternalLink className="size-3" />
            </div>

            {/* Website Content */}
            <div className="p-6 bg-[#FAF9F5] flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-extrabold text-[#14211C]">Sameer Khan · Pune Homes</h2>
                <p className="text-xs text-[#5B6B65] mt-1">
                  Trusted advisory for buying and investing in Baner, Wakad, Kharadi, and Hinjewadi.
                </p>
              </div>

              {/* Sample listings preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg border border-[#E3E7E4] shadow-xs">
                  <div className="font-bold text-xs text-[#14211C]">Skyline Heights</div>
                  <div className="text-[11px] text-[#5B6B65]">3 BHK · Baner</div>
                  <div className="text-sm font-extrabold text-[#0F766E] mt-1">₹ 1.45 Cr</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E3E7E4] shadow-xs">
                  <div className="font-bold text-xs text-[#14211C]">Green Acres</div>
                  <div className="text-[11px] text-[#5B6B65]">2 BHK · Wakad</div>
                  <div className="text-sm font-extrabold text-[#0F766E] mt-1">₹ 82 L</div>
                </div>
              </div>

              {/* Lead form preview */}
              <div className="p-4 bg-white rounded-xl border border-[#E3E7E4]">
                <div className="font-bold text-xs text-[#14211C] mb-2">Request Property Brochure</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input placeholder="Your Name" className="p-2 border rounded text-xs bg-[#F6F7F5]" readOnly />
                  <input placeholder="Mobile Number" className="p-2 border rounded text-xs bg-[#F6F7F5]" readOnly />
                </div>
                <button
                  type="button"
                  className="w-full mt-2.5 bg-[#0F766E] text-white text-xs font-semibold py-2 rounded-lg"
                >
                  Send Details on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
