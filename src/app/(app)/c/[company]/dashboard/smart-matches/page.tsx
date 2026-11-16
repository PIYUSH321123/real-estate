"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  Bell,
  CheckCircle2,
  Clock,
  Flame,
  Send,
  Sparkles,
  TrendingDown,
  UserCheck,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { INITIAL_SMART_MATCHES } from "@/lib/mock/gharsetu"
import { toast } from "sonner"

export default function SmartMatchesPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [matches, setMatches] = React.useState(INITIAL_SMART_MATCHES)
  const [sentMap, setSentMap] = React.useState<Record<string, boolean>>({})
  const [allSent, setAllSent] = React.useState(false)

  const handleSendSingle = (matchId: string, leadName: string) => {
    setSentMap((prev) => ({ ...prev, [matchId]: true }))
    toast.success(`Brochure Sent to ${leadName}`, {
      description: "Listing details and WhatsApp interactive card delivered.",
    })
  }

  const handleSendToAll = () => {
    setAllSent(true)
    const newMap: Record<string, boolean> = {}
    matches.forEach((m) => {
      newMap[m.id] = true
    })
    setSentMap(newMap)
    toast.success("Broadcast Complete", {
      description: `Dispatched Skyline Heights brochure to all ${matches.length} matching buyers on WhatsApp.`,
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Smart Matches
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Instant algorithmic matching connecting inventory specifications to active buyer budgets.
          </p>
        </div>

        <Button
          onClick={handleSendToAll}
          disabled={allSent}
          className={`font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer ${
            allSent
              ? "bg-[#E3F2EF] text-[#0B4F49]"
              : "bg-[#0F766E] hover:bg-[#0d655e] text-white"
          }`}
        >
          {allSent ? (
            <>
              <CheckCircle2 className="size-4" />
              <span>Sent to all 7 buyers</span>
            </>
          ) : (
            <>
              <Send className="size-4" />
              <span>Send to all 7</span>
            </>
          )}
        </Button>
      </div>

      {/* Featured Listing Trigger Banner matching Mockup Screen 08 */}
      <div className="p-4 bg-[#F1F8F6] border border-[#CFE3DE] rounded-xl flex items-center gap-3">
        <div className="size-9 rounded-lg bg-[#0F766E] text-white flex items-center justify-center shrink-0">
          <Sparkles className="size-5" />
        </div>
        <div className="text-xs text-[#14211C]">
          <span className="font-bold text-[#0F766E]">New listing added: </span>
          <span className="font-semibold">Skyline Heights, 3 BHK, ₹1.45 Cr. </span>
          <span className="text-[#5B6B65]">7 existing leads match. Review and send with one tap.</span>
        </div>
      </div>

      {/* Main Grid: Matched Buyers & Auto-alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Buyers matching this listing */}
        <Card className="lg:col-span-2 p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-base text-[#14211C]">
              Buyers matching this listing
            </h3>
            <span className="text-xs text-[#5B6B65]">Sorted by match score</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                  <th className="py-2.5 px-3 font-semibold">Lead</th>
                  <th className="py-2.5 px-3 font-semibold">Looking for</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Match</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Heat</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1EF]">
                {matches.map((m) => {
                  const isSent = !!sentMap[m.id]
                  return (
                    <tr key={m.id} className="hover:bg-[#F9FAF9] transition-colors">
                      <td className="py-3 px-3 font-semibold text-[#14211C]">
                        {m.leadName}
                      </td>
                      <td className="py-3 px-3 text-[#5B6B65]">{m.lookingFor}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="font-bold text-[#0F766E]">{m.matchScore}%</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            m.heat === "Hot"
                              ? "bg-[#FBE0DC] text-[#8F2A1D]"
                              : m.heat === "Warm"
                              ? "bg-[#FDEBD0] text-[#8A4B00]"
                              : "bg-[#E2E8F0] text-[#475569]"
                          }`}
                        >
                          <Flame className="size-2.5 fill-current" />
                          {m.heat}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Button
                          size="sm"
                          onClick={() => handleSendSingle(m.id, m.leadName)}
                          disabled={isSent}
                          className={`text-xs px-3 py-1 h-7 rounded-md cursor-pointer ${
                            isSent
                              ? "bg-[#E3F2EF] text-[#0B4F49]"
                              : "bg-[#0F766E] hover:bg-[#0d655e] text-white"
                          }`}
                        >
                          {isSent ? "Sent" : "Send"}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right 1 Col: Auto-alerts matching Mockup Screen 08 */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              Auto-alerts
            </h3>

            <div className="flex flex-col gap-4 text-xs">
              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1 flex items-center justify-between">
                  <span>Price drop</span>
                  <span className="text-[10px] font-semibold text-[#0F766E] bg-[#E3F2EF] px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <p className="text-[#5B6B65]">
                  Notify leads who viewed the property whenever developer reduces pricing.
                </p>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1 flex items-center justify-between">
                  <span>Dormant lead revival</span>
                  <span className="text-[10px] font-semibold text-[#0F766E] bg-[#E3F2EF] px-1.5 py-0.5 rounded">
                    34 Leads
                  </span>
                </div>
                <p className="text-[#5B6B65]">
                  34 leads silent for 30+ days automatically receive a matching fresh listing.
                </p>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1 flex items-center justify-between">
                  <span>Possession update</span>
                  <span className="text-[10px] font-semibold text-[#0F766E] bg-[#E3F2EF] px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <p className="text-[#5B6B65]">
                  Message all interested buyers when OC or occupancy certificate is granted.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#5B6B65] mt-4 pt-3 border-t border-[#EEF1EF]">
            Automated WhatsApp triggers maintain continuous buyer engagement without agent manual effort.
          </div>
        </Card>
      </div>
    </div>
  )
}
