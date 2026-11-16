"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Clock,
  Coins,
  FileText,
  Flame,
  MessageSquare,
  Sparkles,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { INITIAL_NOTIFICATIONS } from "@/lib/mock/gharsetu"
import { NotificationItem } from "@/types/real-estate"
import { toast } from "sonner"

export default function NotificationsPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [notifications, setNotifications] = React.useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
  const [activeTab, setActiveTab] = React.useState<"All" | "Urgent" | "Tasks" | "Leads" | "Money">("All")

  const handleMarkAllRead = () => {
    toast.success("Alerts Cleared", {
      description: "All notifications marked as reviewed.",
    })
  }

  const filteredNotifs = React.useMemo(() => {
    if (activeTab === "All") return notifications
    if (activeTab === "Urgent") return notifications.filter((n) => n.isUrgent)
    if (activeTab === "Tasks") return notifications.filter((n) => n.type === "task")
    if (activeTab === "Leads") return notifications.filter((n) => n.type === "urgent" || n.type === "lead" || n.type === "match")
    if (activeTab === "Money") return notifications.filter((n) => n.type === "money")
    return notifications
  }, [notifications, activeTab])

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Notifications
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Real-time critical buyer responses, urgent overdue task nudges, and daily WhatsApp digest dispatch.
          </p>
        </div>

        <Button
          onClick={handleMarkAllRead}
          variant="outline"
          className="border-[#0F766E] text-[#0F766E] hover:bg-[#E3F2EF] font-semibold rounded-lg px-4 py-2 text-xs h-9 cursor-pointer"
        >
          <CheckCircle2 className="size-3.5 mr-1.5" />
          <span>Mark all read</span>
        </Button>
      </div>

      {/* Main Grid: Alert Centre & Daily Digest matching Mockup Screen 20 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Alert Centre */}
        <Card className="lg:col-span-2 p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEF1EF] pb-3 mb-4">
            <h3 className="font-semibold text-base text-[#14211C]">Alert centre</h3>

            {/* Filter Tabs matching Mockup Screen 20 */}
            <div className="flex items-center gap-1 bg-[#F6F7F5] p-1 rounded-lg">
              {(["All", "Urgent", "Tasks", "Leads", "Money"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-white text-[#0F766E] shadow-xs"
                      : "text-[#5B6B65] hover:text-[#14211C]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col divide-y divide-[#EEF1EF]">
            {filteredNotifs.map((n) => (
              <div key={n.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`size-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      n.isUrgent ? "bg-[#FBE0DC] text-[#8F2A1D]" : "bg-[#E3F2EF] text-[#0B4F49]"
                    }`}
                  >
                    {n.isUrgent ? <AlertCircle className="size-4" /> : <Bell className="size-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#14211C]">{n.title}</span>
                      {n.isUrgent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FBE0DC] text-[#8F2A1D]">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#5B6B65] mt-0.5">{n.message}</p>
                  </div>
                </div>

                <span className="text-[11px] text-[#5B6B65] shrink-0 font-medium">{n.timeAgo}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Right 1 Col: Daily Digest matching Mockup Screen 20 */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-4">
              Daily digest
            </h3>

            <div className="flex flex-col gap-4 text-xs">
              <div className="p-3 bg-[#F1F8F6] border border-[#CFE3DE] rounded-lg">
                <div className="font-bold text-[#0F766E] mb-1">Morning WhatsApp Briefing</div>
                <div className="text-2xl font-black text-[#14211C]">8:30 AM</div>
                <p className="text-[#5B6B65] mt-1">
                  Sent directly to each agent with their customized daily agenda: site visits, overdue calls, and fresh hot leads.
                </p>
              </div>

              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-[#14211C] mb-1">Evening Performance Tally</div>
                <div className="text-2xl font-black text-[#14211C]">8:00 PM</div>
                <p className="text-[#5B6B65] mt-1">
                  Agency manager scorecard summary: calls made, visits completed, and deals closed today.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#5B6B65] mt-4 pt-3 border-t border-[#EEF1EF]">
            Digests ensure zero leads fall through the cracks even when agents are traveling in the field.
          </div>
        </Card>
      </div>
    </div>
  )
}
