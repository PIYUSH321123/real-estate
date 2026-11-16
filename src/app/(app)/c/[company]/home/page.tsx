"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  Building2,
  CheckCircle2,
  Clock,
  Home,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { INITIAL_PROPERTIES } from "@/lib/mock/gharsetu"
import { toast } from "sonner"

export default function AgencyHomePage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [name, setName] = React.useState("")
  const [mobile, setMobile] = React.useState("")
  const [bhk, setBhk] = React.useState("3 BHK")
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !mobile) return

    setSubmitted(true)
    toast.success("Brochures Dispatched on WhatsApp", {
      description: `Hi ${name}, our senior property consultant Sameer Khan will connect shortly with full floor plans.`,
    })
  }

  return (
    <div className="min-h-screen bg-[#F6F7F5] text-[#14211C]">
      {/* Top Navbar */}
      <header className="border-b border-[#E3E7E4] bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-bold text-base shadow-sm">
              G
            </div>
            <div>
              <span className="font-extrabold text-lg text-[#14211C] tracking-tight">Gharsetu Realty</span>
              <span className="text-[10px] text-[#5B6B65] block -mt-1 capitalize">{companySlug} Advisory</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`/c/${companySlug}/dashboard`}
              className="text-xs font-semibold text-[#0F766E] hover:underline px-3 py-1.5 rounded-lg"
            >
              Agent CRM Portal →
            </a>
            <Button
              onClick={() => window.open("https://wa.me/919820144521", "_blank")}
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold h-9 px-3.5 rounded-lg flex items-center gap-1.5"
            >
              <MessageSquare className="size-3.5" />
              <span>WhatsApp Us</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-[#F6F7F5] py-14 px-6 border-b border-[#E3E7E4]">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-xs font-bold text-[#0F766E] bg-[#E3F2EF] px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Verified Pune Residential &amp; Commercial Properties
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#14211C] tracking-tight leading-tight">
            Find Your Dream Home with <span className="text-[#0F766E]">Gharsetu</span>
          </h1>
          <p className="text-sm md:text-base text-[#5B6B65] max-w-2xl mt-3 leading-relaxed">
            Exclusive developer inventory in Baner, Wakad, Kharadi, and Hinjewadi with MahaRERA verified titles and 0% buyer brokerage.
          </p>

          {/* Quick Lead Form */}
          <div className="w-full max-w-xl bg-white p-4 md:p-6 rounded-2xl border border-[#E3E7E4] shadow-sm mt-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                  className="bg-[#F6F7F5] text-xs h-10"
                  required
                />
                <Input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile (+91...)"
                  className="bg-[#F6F7F5] text-xs h-10"
                  required
                />
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="bg-[#F6F7F5] border border-[#E3E7E4] rounded-md text-xs px-2.5 h-10 text-[#14211C] outline-none"
                >
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK Villa">4 BHK Villa</option>
                  <option value="Plot">Plot</option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={submitted}
                className="w-full bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs font-bold h-10 rounded-lg shadow-xs"
              >
                {submitted ? "Inquiry Sent! Check WhatsApp" : "Get Verified Floor Plans & Prices on WhatsApp"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Properties Grid */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#14211C]">
              Featured Property Portfolio
            </h2>
            <p className="text-xs text-[#5B6B65] mt-0.5">
              Inspected, price-locked, and ready for private site visits.
            </p>
          </div>
          <span className="text-xs font-bold text-[#0F766E] bg-[#E3F2EF] px-3 py-1 rounded-full">
            6 Direct Listings
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_PROPERTIES.map((p) => (
            <Card
              key={p.id}
              className="p-5 bg-white border border-[#E3E7E4] rounded-2xl shadow-xs hover:border-[#0F766E] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-base text-[#14211C]">{p.title}</h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
                    {p.status}
                  </span>
                </div>
                <div className="text-xs text-[#5B6B65] font-medium mb-3">
                  {p.bhk} · {p.locality} · {p.sqft.toLocaleString()} sqft
                </div>
                <div className="text-2xl font-black text-[#0F766E] mb-3">
                  {p.priceDisplay}
                </div>
                <p className="text-xs text-[#5B6B65] line-clamp-2 leading-relaxed mb-4">
                  {p.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EEF1EF]">
                <Button
                  onClick={() => {
                    const text = encodeURIComponent(
                      `Hi Gharsetu! I am interested in ${p.title} (${p.bhk}, ${p.priceDisplay}) in ${p.locality}. Please share more details.`
                    )
                    window.open(`https://wa.me/919820144521?text=${text}`, "_blank")
                  }}
                  className="w-full bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="size-3.5" />
                  <span>Request Site Visit</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E3E7E4] bg-white py-8 px-6 text-center text-xs text-[#5B6B65]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© 2026 Gharsetu Real Estate CRM &amp; Advisory. All rights reserved.</span>
          <span className="text-[11px]">MahaRERA Registration: A52100029810</span>
        </div>
      </footer>
    </div>
  )
}
