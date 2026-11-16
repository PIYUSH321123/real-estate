"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import {
  BadgePercent,
  Building2,
  CalendarCheck,
  Coins,
  FileText,
  Flame,
  Globe,
  Home,
  LayoutDashboard,
  ListTodo,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { gharsetuStore } from "@/lib/mock/store"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [query, setQuery] = React.useState("")

  // Global Ctrl/Cmd + K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  // Reset query on open
  React.useEffect(() => {
    if (open) setQuery("")
  }, [open])

  const navigateTo = (url: string) => {
    onOpenChange(false)
    router.push(url)
  }

  // Filter leads
  const filteredLeads = gharsetuStore.leads.filter(
    (l) =>
      !query ||
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.locality.toLowerCase().includes(query.toLowerCase()) ||
      l.bhk.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4)

  // Filter properties
  const filteredProperties = gharsetuStore.properties.filter(
    (p) =>
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.locality.toLowerCase().includes(query.toLowerCase()) ||
      p.bhk.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3)

  const quickPages = [
    { title: "Dashboard Overview", url: `/c/${companySlug}/dashboard`, icon: LayoutDashboard },
    { title: "Leads & Kanban Pipeline", url: `/c/${companySlug}/dashboard/leads`, icon: Users },
    { title: "Property Catalog", url: `/c/${companySlug}/dashboard/properties`, icon: Building2 },
    { title: "Agent Follow-up Tracker", url: `/c/${companySlug}/dashboard/follow-ups`, icon: ListTodo },
    { title: "Site Visits Route Planner", url: `/c/${companySlug}/dashboard/site-visits`, icon: CalendarCheck },
    { title: "Loan & EMI Calculator", url: `/c/${companySlug}/dashboard/loan-emi`, icon: BadgePercent },
  ].filter((p) => !query || p.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden bg-white border border-[#E3E7E4] shadow-2xl rounded-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Gharsetu CRM</DialogTitle>
        </DialogHeader>

        {/* Input Bar */}
        <div className="flex items-center px-4 border-b border-[#EEF1EF] bg-[#F6F7F5]">
          <Search className="size-4 text-[#5B6B65] shrink-0 mr-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search leads, properties, pages... (ESC to close)"
            className="w-full bg-transparent py-3.5 text-sm text-[#14211C] placeholder:text-[#8A9993] outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-[#E3E7E4] text-[#5B6B65] rounded shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 flex flex-col gap-3 text-xs">
          {/* Section: Leads */}
          {filteredLeads.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold text-[#5B6B65] uppercase tracking-wider">
                Leads &amp; Clients
              </div>
              <div className="flex flex-col gap-0.5 mt-1">
                {filteredLeads.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => navigateTo(`/c/${companySlug}/dashboard/leads/${l.id}`)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#F1F8F6] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-full bg-[#E3F2EF] text-[#0F766E] flex items-center justify-center font-bold text-[11px]">
                        {l.name[0]}
                      </div>
                      <div>
                        <span className="font-semibold text-[#14211C] group-hover:text-[#0F766E]">
                          {l.name}
                        </span>
                        <span className="text-[#5B6B65] text-[11px] ml-2">
                          {l.bhk} · {l.locality} · {l.budgetDisplay}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
                      {l.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Properties */}
          {filteredProperties.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold text-[#5B6B65] uppercase tracking-wider">
                Inventory Units
              </div>
              <div className="flex flex-col gap-0.5 mt-1">
                {filteredProperties.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => navigateTo(`/c/${companySlug}/dashboard/properties`)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#F1F8F6] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="size-4 text-[#0F766E]" />
                      <div>
                        <span className="font-semibold text-[#14211C] group-hover:text-[#0F766E]">
                          {p.title}
                        </span>
                        <span className="text-[#5B6B65] text-[11px] ml-2">
                          {p.bhk} · {p.locality}
                        </span>
                      </div>
                    </div>
                    <span className="font-extrabold text-[#0F766E]">
                      {p.priceDisplay}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Quick Navigation */}
          {quickPages.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold text-[#5B6B65] uppercase tracking-wider">
                Quick Navigation
              </div>
              <div className="flex flex-col gap-0.5 mt-1">
                {quickPages.map((page) => {
                  const Icon = page.icon
                  return (
                    <div
                      key={page.title}
                      onClick={() => navigateTo(page.url)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F1F8F6] cursor-pointer transition-colors group text-[#14211C]"
                    >
                      <Icon className="size-4 text-[#5B6B65] group-hover:text-[#0F766E]" />
                      <span className="font-medium group-hover:text-[#0F766E]">
                        {page.title}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
