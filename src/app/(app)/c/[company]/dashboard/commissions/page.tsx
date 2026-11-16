"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  Bell,
  CheckCircle2,
  CircleDollarSign,
  Coins,
  Download,
  FileText,
  Plus,
  Send,
  TrendingUp,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { INITIAL_DEALS } from "@/lib/mock/gharsetu"
import { Deal, DealPayoutStatus } from "@/types/real-estate"
import { toast } from "sonner"

export default function CommissionsPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [deals, setDeals] = React.useState<Deal[]>(INITIAL_DEALS)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  // Add deal form
  const [leadName, setLeadName] = React.useState("")
  const [propertyTitle, setPropertyTitle] = React.useState("Skyline Heights 3 BHK")
  const [builder, setBuilder] = React.useState("Skyline Developers")
  const [dealValue, setDealValue] = React.useState("₹1.45 Cr")
  const [commissionRate, setCommissionRate] = React.useState("2.0")
  const [agentName, setAgentName] = React.useState("Sameer Khan")

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadName) return

    const rateNum = parseFloat(commissionRate) || 2.0
    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      leadName,
      propertyTitle,
      locality: "Baner",
      builder,
      dealValue,
      commissionRate: rateNum,
      commissionAmount: "₹2.9 L",
      agentSplit: "₹1.45 L",
      agentName,
      status: "Invoice sent",
      date: new Date().toISOString().split("T")[0],
    }

    setDeals([newDeal, ...deals])
    setLeadName("")
    setDialogOpen(false)
    toast.success("Deal Registered", {
      description: `Commission invoice of ${newDeal.commissionAmount} logged for ${builder}.`,
    })
  }

  const handleSendReminder = (builderName: string) => {
    toast.success("Payment Reminder Dispatched", {
      description: `Dispatched GST invoice and bank payment details to finance team at ${builderName}.`,
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Deals &amp; Commissions
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Builder commission ledger, automated invoice reminders, and agent splits distribution.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer">
              <Plus className="size-4" />
              <span>Add deal</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <form onSubmit={handleAddDeal}>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-[#14211C]">
                  Register Closed Deal
                </DialogTitle>
                <DialogDescription>
                  Record closing details to compute brokerage rate and automatic agent split.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input
                    id="client"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Anand Kulkarni"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="prop">Unit / Property</Label>
                    <Input
                      id="prop"
                      value={propertyTitle}
                      onChange={(e) => setPropertyTitle(e.target.value)}
                      placeholder="e.g. Skyline Heights 3 BHK"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="builder">Developer / Builder</Label>
                    <Input
                      id="builder"
                      value={builder}
                      onChange={(e) => setBuilder(e.target.value)}
                      placeholder="e.g. Skyline Dev."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="val">Deal Value</Label>
                    <Input
                      id="val"
                      value={dealValue}
                      onChange={(e) => setDealValue(e.target.value)}
                      placeholder="₹1.45 Cr"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rate">Commission Rate (%)</Label>
                    <Input
                      id="rate"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(e.target.value)}
                      placeholder="2.0"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="agent">Closing Agent</Label>
                  <Select value={agentName} onValueChange={setAgentName}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sameer Khan">Sameer Khan</SelectItem>
                      <SelectItem value="Pooja Iyer">Pooja Iyer</SelectItem>
                      <SelectItem value="Anita Rao">Anita Rao</SelectItem>
                      <SelectItem value="Rohit Jain">Rohit Jain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="bg-[#0F766E] hover:bg-[#0d655e] text-white">
                  Save Deal &amp; Invoice
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 3 Revenue KPI Cards matching Mockup Screen 10 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="text-xs font-medium text-[#5B6B65]">Earned this month</div>
          <div className="text-3xl font-extrabold text-[#0F766E] my-1">₹ 8.3 L</div>
          <span className="text-xs text-[#0B4F49] font-medium">3 deals successfully closed</span>
        </Card>

        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="text-xs font-medium text-[#5B6B65]">Pending payout</div>
          <div className="text-3xl font-extrabold text-[#8A4B00] my-1">₹ 6.65 L</div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FDEBD0] text-[#8A4B00]">
            Invoices under developer review
          </span>
        </Card>

        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="text-xs font-medium text-[#5B6B65]">Agent splits due</div>
          <div className="text-3xl font-extrabold text-[#14211C] my-1">₹ 2.1 L</div>
          <span className="text-xs text-[#5B6B65] font-medium">Scheduled for Friday cycle</span>
        </Card>
      </div>

      {/* Deals Table Card matching Mockup Screen 10 */}
      <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-base text-[#14211C]">Deals</h3>
            <span className="text-xs text-[#5B6B65]">All deals this quarter</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                  <th className="py-2.5 px-3 font-semibold">Deal</th>
                  <th className="py-2.5 px-3 font-semibold">Builder</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Rate</th>
                  <th className="py-2.5 px-3 font-semibold">Commission</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1EF]">
                {deals.map((d) => (
                  <tr key={d.id} className="hover:bg-[#F9FAF9] transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-[#14211C]">
                      {d.leadName} · {d.propertyTitle}
                    </td>
                    <td className="py-3.5 px-3 text-[#5B6B65]">{d.builder}</td>
                    <td className="py-3.5 px-3 text-center font-medium">{d.commissionRate}%</td>
                    <td className="py-3.5 px-3 font-bold text-[#0F766E]">
                      {d.commissionAmount}
                      <span className="block text-[10px] text-[#5B6B65] font-normal">
                        Agent split: {d.agentSplit}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          d.status === "Received"
                            ? "bg-[#E3F2EF] text-[#0B4F49]"
                            : d.status === "Invoice sent"
                            ? "bg-[#FDEBD0] text-[#8A4B00]"
                            : "bg-[#FBE0DC] text-[#8F2A1D]"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {d.status !== "Received" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSendReminder(d.builder)}
                          className="text-[#0F766E] hover:text-[#0d655e] hover:bg-[#E3F2EF] text-xs h-7 px-2"
                        >
                          <Send className="size-3 mr-1" />
                          Remind
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-xs text-[#5B6B65] mt-6 pt-3 border-t border-[#EEF1EF]">
          Reminders to builders for overdue payouts and auto split by agent.
        </div>
      </Card>
    </div>
  )
}
