"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  User,
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
import { gharsetuStore } from "@/lib/mock/store"
import { INITIAL_SCORECARDS } from "@/lib/mock/gharsetu"

export default function FollowUpsPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [tasks, setTasks] = React.useState(gharsetuStore.followUps)
  const [scorecards] = React.useState(INITIAL_SCORECARDS)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  // Form states
  const [taskLead, setTaskLead] = React.useState("")
  const [taskDesc, setTaskDesc] = React.useState("")
  const [taskAgent, setTaskAgent] = React.useState("Sameer Khan")
  const [taskDate, setTaskDate] = React.useState("2026-11-16")

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskLead || !taskDesc) return

    const newTask = {
      id: `task-${Date.now()}`,
      leadId: `lead-${Date.now()}`,
      leadName: taskLead,
      task: taskDesc,
      agentName: taskAgent,
      dueDate: taskDate,
      status: "Due today" as const,
      priority: "High" as const,
    }

    gharsetuStore.followUps.unshift(newTask)
    setTasks([...gharsetuStore.followUps])
    setTaskLead("")
    setTaskDesc("")
    setDialogOpen(false)
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Agent Follow-up Tracker
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Monitor agent responsiveness, overdue communication, and on-time task completion.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer">
              <Plus className="size-4" />
              <span>Add task</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[440px]">
            <form onSubmit={handleAddTask}>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-[#14211C]">
                  Create Follow-up Task
                </DialogTitle>
                <DialogDescription>
                  Assign a follow-up action to a property agent with a deadline.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="lead">Client / Lead Name</Label>
                  <Input
                    id="lead"
                    value={taskLead}
                    onChange={(e) => setTaskLead(e.target.value)}
                    placeholder="e.g. Priya Nair"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="task">Task Description</Label>
                  <Input
                    id="task"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    placeholder="e.g. Send loan partner comparison"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="agent">Assigned Agent</Label>
                    <Select value={taskAgent} onValueChange={setTaskAgent}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sameer Khan">Sameer Khan</SelectItem>
                        <SelectItem value="Anita Rao">Anita Rao</SelectItem>
                        <SelectItem value="Pooja Iyer">Pooja Iyer</SelectItem>
                        <SelectItem value="Rohit Jain">Rohit Jain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Due Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={taskDate}
                      onChange={(e) => setTaskDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="bg-[#0F766E] hover:bg-[#0d655e] text-white">
                  Create Task
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 3 KPI Cards matching Mockup Screen 06 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="text-xs font-medium text-[#5B6B65]">Due today</div>
          <div className="text-3xl font-extrabold text-[#14211C] my-1">18</div>
          <span className="text-xs text-[#0F766E] font-medium">Across all agents</span>
        </Card>

        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="text-xs font-medium text-[#5B6B65]">Overdue</div>
          <div className="text-3xl font-extrabold text-[#8F2A1D] my-1">7</div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FBE0DC] text-[#8F2A1D]">
            Requires urgent action
          </span>
        </Card>

        <Card className="p-4 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="text-xs font-medium text-[#5B6B65]">Done this week</div>
          <div className="text-3xl font-extrabold text-[#14211C] my-1">64</div>
          <span className="text-xs text-[#0B4F49] font-medium">92% average turnaround</span>
        </Card>
      </div>

      {/* Main Grid: Agent Scorecard & Task Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Agent Scorecard Table */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-base text-[#14211C]">Agent scorecard</h3>
            <span className="text-xs text-[#5B6B65]">Sorted by on-time %</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                  <th className="py-2.5 px-3 font-semibold">Agent</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Open</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Overdue</th>
                  <th className="py-2.5 px-3 font-semibold text-right">On-time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1EF]">
                {scorecards.map((agent) => (
                  <tr key={agent.id} className="hover:bg-[#F9FAF9] transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#14211C] flex items-center gap-2">
                      <div className="size-6 rounded-full bg-[#E3F2EF] text-[#0F766E] flex items-center justify-center text-[10px] font-bold">
                        {agent.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span>{agent.name}</span>
                    </td>
                    <td className="py-3 px-3 text-center text-[#5B6B65] font-medium">
                      {agent.openTasks}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {agent.overdueTasks > 0 ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FBE0DC] text-[#8F2A1D]">
                          {agent.overdueTasks}
                        </span>
                      ) : (
                        <span className="text-[#5B6B65]">0</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`font-bold ${
                          agent.onTimeRate >= 90
                            ? "text-[#0F766E]"
                            : agent.onTimeRate >= 70
                            ? "text-[#8A4B00]"
                            : "text-[#8F2A1D]"
                        }`}
                      >
                        {agent.onTimeRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Task Queue Table */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-base text-[#14211C]">Task queue</h3>
            <span className="text-xs text-[#5B6B65]">Real-time pending list</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                  <th className="py-2.5 px-3 font-semibold">Lead</th>
                  <th className="py-2.5 px-3 font-semibold">Task</th>
                  <th className="py-2.5 px-3 font-semibold">Agent</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1EF]">
                {tasks.map((t) => (
                  <tr key={t.id} className="hover:bg-[#F9FAF9] transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#14211C]">
                      {t.leadName}
                    </td>
                    <td className="py-3 px-3 text-[#5B6B65] max-w-[200px] truncate">
                      {t.task}
                    </td>
                    <td className="py-3 px-3 text-[#14211C] font-medium">
                      {t.agentName.split(" ")[0]}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {t.status === "Overdue" ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FBE0DC] text-[#8F2A1D]">
                          Overdue {t.overdueDays ? `${t.overdueDays}d` : ""}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E3F2EF] text-[#0B4F49]">
                          {t.dueTime || "Today"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
