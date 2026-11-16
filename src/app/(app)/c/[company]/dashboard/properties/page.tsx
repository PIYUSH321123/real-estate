"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  Building2,
  CheckCircle,
  Clock,
  Filter,
  Home,
  MessageSquare,
  Plus,
  Search,
  Share2,
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
import { gharsetuStore } from "@/lib/mock/store"
import { Property, PropertyStatus, PropertyType } from "@/types/real-estate"
import { toast } from "sonner"

export default function PropertiesPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [properties, setProperties] = React.useState<Property[]>(gharsetuStore.properties)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [dialogOpen, setDialogOpen] = React.useState(false)

  // New property form
  const [title, setTitle] = React.useState("")
  const [locality, setLocality] = React.useState("Baner")
  const [bhk, setBhk] = React.useState("3 BHK")
  const [sqft, setSqft] = React.useState("1280")
  const [price, setPrice] = React.useState("₹1.45 Cr")
  const [status, setStatus] = React.useState<PropertyStatus>("Ready")
  const [propType, setPropType] = React.useState<PropertyType>("Apartment")

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    const newProp = gharsetuStore.addProperty({
      title,
      locality,
      city: "Pune",
      bhk,
      sqft: parseInt(sqft) || 1000,
      price: 10000000,
      priceDisplay: price,
      status,
      type: propType,
      featured: true,
      description: `${bhk} in ${locality} with modern amenities.`,
    })

    setProperties([...gharsetuStore.properties])
    setTitle("")
    setDialogOpen(false)
    toast.success("Property added to catalog", {
      description: `${newProp.title} is now visible to all agents.`,
    })
  }

  const handleShareWhatsApp = (property: Property) => {
    const text = encodeURIComponent(
      `Hello! Check out *${property.title}* in ${property.locality}, Pune.\nSpecs: ${property.bhk} (${property.sqft} sqft)\nPrice: ${property.priceDisplay} (${property.status})\nLet me know if you would like to arrange a site visit!`
    )
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  const filteredProperties = React.useMemo(() => {
    return properties.filter((p) => {
      const matchSearch =
        !searchTerm ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.bhk.toLowerCase().includes(searchTerm.toLowerCase())

      const matchType = typeFilter === "all" || p.type === typeFilter
      const matchStatus = statusFilter === "all" || p.status === statusFilter

      return matchSearch && matchType && matchStatus
    })
  }, [properties, searchTerm, typeFilter, statusFilter])

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Property Catalog
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Verified direct listings, floor specifications, pricing, and 1-tap WhatsApp sharing.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer">
              <Plus className="size-4" />
              <span>Add property</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <form onSubmit={handleAddProperty}>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-[#14211C]">
                  Add New Listing
                </DialogTitle>
                <DialogDescription>
                  Enter project specs to add to your agency inventory and trigger smart matches.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Project / Property Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Skyline Heights"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="locality">Locality</Label>
                    <Input
                      id="locality"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="e.g. Baner"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bhk">Configuration</Label>
                    <Input
                      id="bhk"
                      value={bhk}
                      onChange={(e) => setBhk(e.target.value)}
                      placeholder="e.g. 3 BHK"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="sqft">Carpet / Super Area (sqft)</Label>
                    <Input
                      id="sqft"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      placeholder="1280"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price Display</Label>
                    <Input
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="₹1.45 Cr"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Construction Status</Label>
                    <Select value={status} onValueChange={(val) => setStatus(val as PropertyStatus)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ready">Ready to Move</SelectItem>
                        <SelectItem value="Under construction">Under construction</SelectItem>
                        <SelectItem value="Available">Available (Plot)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Property Type</Label>
                    <Select value={propType} onValueChange={(val) => setPropType(val as PropertyType)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Plot">Plot</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="bg-[#0F766E] hover:bg-[#0d655e] text-white">
                  Save to Catalog
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Bar matching Mockup Screen 05 */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 border border-[#E3E7E4] rounded-xl shadow-xs">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-2.5 size-4 text-[#5B6B65]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by project, locality…"
            className="pl-9 bg-[#F6F7F5] border-0 text-xs h-9"
          />
        </div>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[140px] text-xs h-9 bg-white border-[#E3E7E4]">
            <SelectValue placeholder="Type ▾" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
            <SelectItem value="Plot">Plot</SelectItem>
            <SelectItem value="Commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] text-xs h-9 bg-white border-[#E3E7E4]">
            <SelectValue placeholder="Status ▾" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Ready">Ready</SelectItem>
            <SelectItem value="Under construction">Under construction</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Cards Grid matching Mockup Screen 05 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProperties.map((p) => (
          <Card
            key={p.id}
            className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs hover:border-[#0F766E] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="font-bold text-base text-[#14211C]">{p.title}</h3>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    p.status === "Ready"
                      ? "bg-[#E3F2EF] text-[#0B4F49]"
                      : p.status === "Under construction"
                      ? "bg-[#FDEBD0] text-[#8A4B00]"
                      : "bg-[#E0F2FE] text-[#0369A1]"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="text-xs text-[#5B6B65] font-medium mb-3">
                {p.bhk} · {p.locality} · {p.sqft.toLocaleString()} sqft
              </div>

              <div className="text-2xl font-black text-[#0F766E] mb-3">
                {p.priceDisplay}
              </div>

              {p.description && (
                <p className="text-xs text-[#5B6B65] line-clamp-2 leading-relaxed mb-4">
                  {p.description}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-[#EEF1EF]">
              <Button
                onClick={() => handleShareWhatsApp(p)}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageSquare className="size-3.5" />
                <span>Share on WhatsApp</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
