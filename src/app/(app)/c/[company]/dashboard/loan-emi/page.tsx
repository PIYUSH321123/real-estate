"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  BadgePercent,
  Calculator,
  CheckCircle2,
  Landmark,
  Send,
  Share2,
  TrendingDown,
  UserCheck,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function LoanEmiPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  // Calculator states
  const [propertyPrice, setPropertyPrice] = React.useState(14500000) // 1.45 Cr
  const [downPaymentPercent, setDownPaymentPercent] = React.useState(20)
  const [tenureYears, setTenureYears] = React.useState(20)
  const [interestRate, setInterestRate] = React.useState(8.45)

  // Calculate monthly EMI formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEmi = (price: number, dpPercent: number, tenure: number, rate: number) => {
    const loanAmount = price * (1 - dpPercent / 100)
    const monthlyRate = rate / 12 / 100
    const totalMonths = tenure * 12
    if (monthlyRate === 0) return Math.round(loanAmount / totalMonths)
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    return Math.round(emi)
  }

  const calculatedEmi = calculateEmi(propertyPrice, downPaymentPercent, tenureYears, interestRate)

  const partnerOffers = [
    { lender: "HDFC Bank (Partner A)", rate: "8.45%", emi: calculateEmi(propertyPrice, downPaymentPercent, tenureYears, 8.45) },
    { lender: "State Bank of India (Partner B)", rate: "8.35%", emi: calculateEmi(propertyPrice, downPaymentPercent, tenureYears, 8.35) },
    { lender: "ICICI Home Finance (Partner C)", rate: "8.60%", emi: calculateEmi(propertyPrice, downPaymentPercent, tenureYears, 8.60) },
  ]

  const handleSendToClient = () => {
    toast.success("EMI Calculation Sent to Priya Nair", {
      description: `Dispatched detailed PDF breakdown (₹${calculatedEmi.toLocaleString("en-IN")}/mo) via WhatsApp.`,
    })
  }

  const handleShareOffer = (lender: string, emi: number) => {
    toast.success("Bank Offer Shared", {
      description: `Dispatched ${lender} pre-sanction offer (₹${emi.toLocaleString("en-IN")}/mo) to buyer. Lead status updated to 'Loan in process'.`,
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Loan &amp; EMI Tools
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Instant home loan EMI computation, buyer borrowing capacity checker, and banking partner offers.
          </p>
        </div>

        <Button
          onClick={handleSendToClient}
          className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Send className="size-4" />
          <span>Send to client</span>
        </Button>
      </div>

      {/* 3 Panels Layout matching Mockup Screen 16 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel 1: EMI Calculator */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              EMI calculator
            </h3>

            <div className="flex flex-col gap-4 text-xs">
              <div className="grid gap-1.5">
                <Label htmlFor="price" className="text-[#5B6B65]">Property Price</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="price"
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="font-bold text-[#14211C]"
                  />
                  <span className="text-xs font-semibold text-[#0F766E] shrink-0">
                    ₹ {(propertyPrice / 10000000).toFixed(2)} Cr
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="dp" className="text-[#5B6B65]">Down payment</Label>
                  <div className="flex items-center gap-1">
                    <Input
                      id="dp"
                      type="number"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    />
                    <span className="text-xs text-[#5B6B65]">%</span>
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="tenure" className="text-[#5B6B65]">Tenure</Label>
                  <div className="flex items-center gap-1">
                    <Input
                      id="tenure"
                      type="number"
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                    />
                    <span className="text-xs text-[#5B6B65]">yrs</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 p-4 bg-[#F1F8F6] border border-[#CFE3DE] rounded-xl text-center">
                <div className="text-xs font-medium text-[#5B6B65] mb-1">Monthly Estimated EMI</div>
                <div className="text-3xl font-black text-[#0F766E]">
                  ₹ {calculatedEmi.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-[#0B4F49] mt-1 font-semibold">
                  Principal: ₹ {((propertyPrice * (1 - downPaymentPercent / 100)) / 100000).toFixed(1)} L · {interestRate}% p.a.
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#5B6B65] mt-4 pt-3 border-t border-[#EEF1EF]">
            Sample figure based on standard bank benchmark. Customize bank rates in settings.
          </div>
        </Card>

        {/* Panel 2: Eligibility Check · Priya Nair */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              Eligibility check · Priya Nair
            </h3>

            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-[#EEF1EF]">
                <span className="text-[#5B6B65]">Monthly Gross Income</span>
                <span className="font-bold text-[#14211C]">₹ 2,40,000</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#EEF1EF]">
                <span className="text-[#5B6B65]">Existing Active EMIs</span>
                <span className="font-semibold text-[#8F2A1D]">₹ 18,500</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#EEF1EF]">
                <span className="text-[#5B6B65]">Buyer Age</span>
                <span className="font-semibold text-[#14211C]">34 years</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#EEF1EF]">
                <span className="text-[#5B6B65]">FOIR Capacity (50%)</span>
                <span className="font-semibold text-[#14211C]">₹ 1,01,500 / mo</span>
              </div>

              <div className="mt-3 p-3 bg-[#E3F2EF] rounded-lg text-center">
                <span className="text-[11px] font-semibold text-[#0B4F49] uppercase tracking-wide block">
                  Eligible Loan Amount
                </span>
                <span className="text-2xl font-black text-[#0F766E]">
                  ₹ 1.25 – 1.40 Cr
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#5B6B65] mt-4 pt-3 border-t border-[#EEF1EF]">
            Income, existing EMIs and age feed an indicative eligibility range to fast-track sanctions.
          </div>
        </Card>

        {/* Panel 3: Partner Offers matching Mockup Screen 16 */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              Partner offers
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                    <th className="py-2 px-1 font-semibold">Lender</th>
                    <th className="py-2 px-1 font-semibold text-center">Rate</th>
                    <th className="py-2 px-1 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF1EF]">
                  {partnerOffers.map((o) => (
                    <tr key={o.lender} className="hover:bg-[#F9FAF9] transition-colors">
                      <td className="py-3 px-1 font-semibold text-[#14211C]">
                        {o.lender.split(" (")[0]}
                        <span className="block text-[11px] text-[#5B6B65] font-normal">
                          ₹ {o.emi.toLocaleString("en-IN")} / mo
                        </span>
                      </td>
                      <td className="py-3 px-1 text-center font-bold text-[#0F766E]">
                        {o.rate}
                      </td>
                      <td className="py-3 px-1 text-right">
                        <Button
                          size="sm"
                          onClick={() => handleShareOffer(o.lender, o.emi)}
                          className="bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs h-7 px-2.5 rounded-md cursor-pointer"
                        >
                          <Share2 className="size-3 mr-1" />
                          Share
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-[11px] text-[#0B4F49] font-medium mt-4 pt-3 border-t border-[#EEF1EF] bg-[#F1F8F6] p-2.5 rounded-md">
            Lead status automatically becomes <strong>Loan in process</strong> once an offer is shared.
          </div>
        </Card>
      </div>
    </div>
  )
}
