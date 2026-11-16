"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  CheckCircle2,
  Gift,
  Plus,
  QrCode,
  Share2,
  Sparkles,
  Users,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { INITIAL_REFERRALS } from "@/lib/mock/gharsetu"
import { toast } from "sonner"

export default function ReferralsPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [referrals, setReferrals] = React.useState(INITIAL_REFERRALS)

  const handlePayReward = (referrerName: string) => {
    toast.success("Reward Payout Initiated", {
      description: `Dispatched UPI transfer of ₹20,000 to ${referrerName} with WhatsApp confirmation.`,
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Referrals
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Turn past buyers and housing society chairpersons into continuous deal referral channels.
          </p>
        </div>

        <Button
          onClick={() =>
            toast.success("Referral QR & Link Created", {
              description: "Customized referral landing page and QR code generated.",
            })
          }
          className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Add referrer</span>
        </Button>
      </div>

      {/* 3 KPI Cards matching Mockup Screen 19 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="text-xs font-medium text-[#5B6B65]">Referred leads</div>
          <div className="text-3xl font-extrabold text-[#14211C] my-1">10</div>
          <span className="text-xs text-[#0F766E] font-medium">High conversion intent</span>
        </Card>

        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="text-xs font-medium text-[#5B6B65]">Closed from referrals</div>
          <div className="text-3xl font-extrabold text-[#0F766E] my-1">3</div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
            30% closure rate
          </span>
        </Card>

        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="text-xs font-medium text-[#5B6B65]">Rewards due</div>
          <div className="text-3xl font-extrabold text-[#8A4B00] my-1">₹ 20,000</div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FDEBD0] text-[#8A4B00]">
            1 payout pending
          </span>
        </Card>
      </div>

      {/* Main Grid: Referrers & Reward Rule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Referrers Table */}
        <Card className="lg:col-span-2 p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-base text-[#14211C]">Referrers</h3>
            <span className="text-xs text-[#5B6B65]">All registered partners</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                  <th className="py-2.5 px-3 font-semibold">Referrer</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Leads sent</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Closed</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Reward Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1EF]">
                {referrals.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F9FAF9] transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-[#14211C]">
                      {r.referrerName}
                      <span className="block text-[11px] text-[#5B6B65] font-normal">
                        {r.relation}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center text-[#14211C] font-semibold">
                      {r.leadsSent}
                    </td>
                    <td className="py-3.5 px-3 text-center text-[#0F766E] font-bold">
                      {r.closedDeals}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          r.rewardStatus === "Paid"
                            ? "bg-[#E3F2EF] text-[#0B4F49]"
                            : r.rewardStatus === "Due"
                            ? "bg-[#FDEBD0] text-[#8A4B00]"
                            : "bg-[#F6F7F5] text-[#5B6B65]"
                        }`}
                      >
                        {r.rewardStatus === "Paid"
                          ? `Paid ${r.rewardAmount}`
                          : r.rewardStatus === "Due"
                          ? `Due ${r.rewardAmount}`
                          : "No reward yet"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right 1 Col: Reward Rule matching Mockup Screen 19 */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              Reward rule
            </h3>

            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-[#F1F8F6] border border-[#CFE3DE] rounded-lg">
                <div className="font-bold text-[#0F766E] mb-1">Standard Incentive</div>
                <p className="text-[#14211C]">
                  Fixed <strong>₹10,000 per closed deal</strong>, or 10% of total developer commission.
                </p>
              </div>

              <div className="p-3 bg-[#F6F7F5] border border-[#E3E7E4] rounded-lg">
                <div className="font-bold text-[#14211C] mb-1">Personal QR &amp; Link</div>
                <p className="text-[#5B6B65]">
                  Each referrer gets a unique sharing link. Referrers get automatic WhatsApp milestones whenever their lead visits or books.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#EEF1EF]">
            <Button
              onClick={() => handlePayReward("Society Chairman, Baner")}
              className="w-full bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs font-semibold py-2 rounded-lg cursor-pointer shadow-xs"
            >
              Pay reward (₹20,000)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
