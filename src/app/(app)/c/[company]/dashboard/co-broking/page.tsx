"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  CheckCircle2,
  FileCheck,
  Handshake,
  Network,
  Plus,
  Search,
  Share2,
  Users,
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
import { INITIAL_CO_BROKING } from "@/lib/mock/gharsetu"
import { toast } from "sonner"

export default function CoBrokingPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [listings, setListings] = React.useState(INITIAL_CO_BROKING)
  const [requestedMap, setRequestedMap] = React.useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = React.useState("")
  const [dialogOpen, setDialogOpen] = React.useState(false)

  // Share listing form
  const [shareTitle, setShareTitle] = React.useState("")
  const [shareLocality, setShareLocality] = React.useState("Baner")
  const [shareType, setShareType] = React.useState("3 BHK")
  const [sharePrice, setSharePrice] = React.useState("₹1.45 Cr")
  const [shareSplit, setShareSplit] = React.useState("50/50")

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!shareTitle) return

    const newListing = {
      id: `cb-${Date.now()}`,
      title: `${shareTitle} · ${shareLocality}`,
      locality: shareLocality,
      sharedByAgent: "Sameer Khan",
      type: shareType,
      priceDisplay: sharePrice,
      commissionSplit: shareSplit,
      status: "Available" as const,
      agreementStatus: "Waiting for partner" as const,
    }

    setListings([newListing, ...listings])
    setShareTitle("")
    setDialogOpen(false)
    toast.success("Listing shared with Co-Broking Network", {
      description: "Agents in your network can now view and request co-broking contracts.",
    })
  }

  const handleRequestCoBroking = (listingId: string, title: string) => {
    setRequestedMap((prev) => ({ ...prev, [listingId]: true }))
    toast.success("Co-Broking Agreement Requested", {
      description: `Split proposal dispatched to listing agent for ${title}.`,
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Co-broking Network
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Cross-sell verified shared inventory with trusted agents and automate 50/50 or 60/40 splits.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer">
              <Plus className="size-4" />
              <span>Share my listing</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[440px]">
            <form onSubmit={handleShareSubmit}>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-[#14211C]">
                  Share Inventory to Network
                </DialogTitle>
                <DialogDescription>
                  List your inventory for collaborative sales with pre-agreed commission splits.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Property / Project Title</Label>
                  <Input
                    id="title"
                    value={shareTitle}
                    onChange={(e) => setShareTitle(e.target.value)}
                    placeholder="e.g. Skyline Heights"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="locality">Locality</Label>
                    <Input
                      id="locality"
                      value={shareLocality}
                      onChange={(e) => setShareLocality(e.target.value)}
                      placeholder="e.g. Baner"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Configuration</Label>
                    <Input
                      id="type"
                      value={shareType}
                      onChange={(e) => setShareType(e.target.value)}
                      placeholder="e.g. 3 BHK"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Asking Price</Label>
                    <Input
                      id="price"
                      value={sharePrice}
                      onChange={(e) => setSharePrice(e.target.value)}
                      placeholder="e.g. ₹1.45 Cr"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="split">Commission Split</Label>
                    <Select value={shareSplit} onValueChange={setShareSplit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50/50">50 / 50 Equal</SelectItem>
                        <SelectItem value="60/40">60 / 40 (Listing Agent)</SelectItem>
                        <SelectItem value="70/30">70 / 30 Exclusive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="bg-[#0F766E] hover:bg-[#0d655e] text-white">
                  Publish to Network
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar matching Mockup Screen 14 */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 border border-[#E3E7E4] rounded-xl shadow-xs">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-2.5 size-4 text-[#5B6B65]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search shared inventory…"
            className="pl-9 bg-[#F6F7F5] border-0 text-xs h-9"
          />
        </div>

        <span className="text-xs text-[#5B6B65] font-medium pr-2">
          {listings.length} Active Shared Listings
        </span>
      </div>

      {/* Main Grid: Listings from other agents & Deal agreements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Listings from other agents */}
        <Card className="lg:col-span-2 p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-base text-[#14211C]">
              Listings from other agents
            </h3>
            <span className="text-xs text-[#5B6B65]">Brokerage verified</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                  <th className="py-2.5 px-3 font-semibold">Listing</th>
                  <th className="py-2.5 px-3 font-semibold">Shared by</th>
                  <th className="py-2.5 px-3 font-semibold">Type</th>
                  <th className="py-2.5 px-3 font-semibold">Price</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Split</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1EF]">
                {listings.map((item) => {
                  const isRequested = !!requestedMap[item.id]
                  return (
                    <tr key={item.id} className="hover:bg-[#F9FAF9] transition-colors">
                      <td className="py-3 px-3 font-semibold text-[#14211C]">
                        {item.title}
                      </td>
                      <td className="py-3 px-3 text-[#5B6B65]">{item.sharedByAgent}</td>
                      <td className="py-3 px-3 text-[#5B6B65]">{item.type}</td>
                      <td className="py-3 px-3 font-bold text-[#0F766E]">
                        {item.priceDisplay}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#E3F2EF] text-[#0B4F49]">
                          {item.commissionSplit}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Button
                          size="sm"
                          onClick={() => handleRequestCoBroking(item.id, item.title)}
                          disabled={isRequested}
                          className={`text-xs px-3 py-1 h-7 rounded-md cursor-pointer ${
                            isRequested
                              ? "bg-[#E3F2EF] text-[#0B4F49]"
                              : "bg-[#0F766E] hover:bg-[#0d655e] text-white"
                          }`}
                        >
                          {isRequested ? "Requested" : "Request"}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right 1 Col: Deal agreements matching Mockup Screen 14 */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              Deal agreements
            </h3>

            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1">Aundh 3 BHK</div>
                <div className="flex items-center gap-1.5 text-[#0F766E] font-semibold text-[11px]">
                  <CheckCircle2 className="size-3.5" />
                  Split 50/50 signed by both agents
                </div>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1">Pashan 2 BHK</div>
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FDEBD0] text-[#8A4B00]">
                    Waiting for partner
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#5B6B65] mt-4 pt-3 border-t border-[#EEF1EF]">
            Splits flow into Commissions automatically once deals are registered.
          </div>
        </Card>
      </div>
    </div>
  )
}
