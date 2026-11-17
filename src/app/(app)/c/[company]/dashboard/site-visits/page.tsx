"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  Plus,
  Send,
  UserCheck,
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
import { SiteVisit } from "@/types/real-estate"
import { toast } from "sonner"

export default function SiteVisitsPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [visits, setVisits] = React.useState<SiteVisit[]>(() => [...gharsetuStore.siteVisits])
  const [dialogOpen, setDialogOpen] = React.useState(false)

  React.useEffect(() => {
    gharsetuStore.hydrateFromStorage()
    setVisits([...gharsetuStore.siteVisits])
    const unsub = gharsetuStore.subscribe(() => {
      setVisits([...gharsetuStore.siteVisits])
    })
    gharsetuStore.syncFromServer()
    return unsub
  }, [])

  // Schedule visit form
  const [leadName, setLeadName] = React.useState("")
  const [leadMobile, setLeadMobile] = React.useState("")
  const [project, setProject] = React.useState("Skyline Heights")
  const [locality, setLocality] = React.useState("Baner")
  const [time, setTime] = React.useState("11:00 AM")
  const [date, setDate] = React.useState("Saturday, 18 Nov")

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadName) return

    const visitData = {
      leadId: `lead-${Date.now()}`,
      leadName,
      leadMobile: leadMobile || "+91 98000 00000",
      propertyId: "skyline",
      propertyTitle: project,
      locality,
      date,
      time,
      status: "Confirmed" as const,
      agentName: "Sameer Khan",
      routeOrder: visits.length + 1,
    }

    gharsetuStore.addSiteVisit(visitData)
    try {
      await fetch("/api/site-visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitData),
      })
    } catch {
      // Already saved locally
    }

    setLeadName("")
    setLeadMobile("")
    setDialogOpen(false)
    toast.success("Site Visit Scheduled", {
      description: `Visit booked for ${leadName} at ${project} (${time}). Route auto-optimized.`,
    })
  }

  const handleGeoCheckIn = (visitId: string) => {
    gharsetuStore.updateSiteVisit(visitId, { geoCheckedIn: true, status: "Completed" })
    toast.success("Geo Check-in Verified", {
      description: "GPS coordinates verified at project site. Visit logged as completed.",
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Site Visits
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Optimized travel routing, automated WhatsApp map pins, and post-visit geo check-ins.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer">
              <Plus className="size-4" />
              <span>Schedule visit</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[440px]">
            <form onSubmit={handleScheduleSubmit}>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-[#14211C]">
                  Schedule Site Visit
                </DialogTitle>
                <DialogDescription>
                  Book a client inspection slot. The route planner will re-optimize the daily schedule.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Client Name</Label>
                  <Input
                    id="name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Meera Shah"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      value={leadMobile}
                      onChange={(e) => setLeadMobile(e.target.value)}
                      placeholder="+91 98..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time Slot</Label>
                    <Input
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="11:00 AM"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="project">Project</Label>
                    <Input
                      id="project"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      placeholder="e.g. Skyline Heights"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="locality">Locality</Label>
                    <Input
                      id="locality"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="e.g. Baner"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="bg-[#0F766E] hover:bg-[#0d655e] text-white">
                  Confirm Visit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Grid: Today's Route & After the visit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Route Table matching Mockup Screen 09 */}
        <Card className="lg:col-span-2 p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-base text-[#14211C]">
                Today · Saturday route
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
                Optimized Route Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                    <th className="py-2.5 px-3 font-semibold">Time</th>
                    <th className="py-2.5 px-3 font-semibold">Lead</th>
                    <th className="py-2.5 px-3 font-semibold">Project</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF1EF]">
                  {visits.map((v) => (
                    <tr key={v.id} className="hover:bg-[#F9FAF9] transition-colors">
                      <td className="py-3.5 px-3 font-bold text-[#14211C]">
                        {v.time}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-[#14211C]">
                        {v.leadName}
                      </td>
                      <td className="py-3.5 px-3 text-[#5B6B65]">
                        {v.propertyTitle} ({v.locality})
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            v.status === "Confirmed"
                              ? "bg-[#E3F2EF] text-[#0B4F49]"
                              : "bg-[#FDEBD0] text-[#8A4B00]"
                          }`}
                        >
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-[#F1F8F6] border border-[#CFE3DE] rounded-lg mt-6 text-xs text-[#0B4F49] flex items-center gap-2">
            <Navigation className="size-4 shrink-0 text-[#0F766E]" />
            <span>
              <strong>Optimised order saves about 40 min of travel.</strong> Reminders go to leads on WhatsApp with a live map pin.
            </span>
          </div>
        </Card>

        {/* Right 1 Col: After the visit Card matching Mockup Screen 09 */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              After the visit
            </h3>

            <div className="flex flex-col gap-4 text-xs">
              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#14211C]">Geo check-in</div>
                  <p className="text-[#5B6B65]">Proves visit happened on site</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleGeoCheckIn("visit-3")}
                  className="bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs h-7 px-2.5 rounded-md"
                >
                  Verify GPS
                </Button>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-2">Client Feedback</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-[#E3F2EF] text-[#0B4F49] cursor-pointer">
                    Liked
                  </span>
                  <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-[#FBE0DC] text-[#8F2A1D] cursor-pointer">
                    Price high
                  </span>
                  <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-[#FDEBD0] text-[#8A4B00] cursor-pointer">
                    Needs family
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1">Follow-up task</div>
                <p className="text-[#5B6B65]">
                  Auto-created for tomorrow 10:00 AM with draft WhatsApp summary.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#5B6B65] mt-4 pt-3 border-t border-[#EEF1EF]">
            Automated site-visit workflows reduce no-shows by 45% across agency teams.
          </div>
        </Card>
      </div>
    </div>
  )
}
