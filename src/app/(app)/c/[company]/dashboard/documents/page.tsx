"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileText,
  FolderLock,
  Plus,
  Send,
  Upload,
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
import { INITIAL_DOCUMENTS } from "@/lib/mock/gharsetu"
import { DocumentItem } from "@/types/real-estate"
import { toast } from "sonner"

export default function DocumentVaultPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const [docs, setDocs] = React.useState<DocumentItem[]>(INITIAL_DOCUMENTS)
  const [selectedDeal, setSelectedDeal] = React.useState("A. Kulkarni · Aundh")
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [newDocTitle, setNewDocTitle] = React.useState("")

  const handleRequestDoc = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDocTitle) return

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      dealName: selectedDeal,
      docTitle: newDocTitle,
      status: "Missing",
      note: "WhatsApp upload link dispatched",
      requiredFor: "Compliance",
    }

    setDocs([...docs, newDoc])
    setNewDocTitle("")
    setDialogOpen(false)
    toast.success("Document Request Sent", {
      description: `Dispatched secure WhatsApp upload link to buyer for ${newDocTitle}.`,
    })
  }

  const handleNudgeClient = (docTitle: string) => {
    toast.success("WhatsApp Nudge Delivered", {
      description: `Instant upload link resent to buyer for "${docTitle}".`,
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Document Vault
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Secure client document checklist, MahaRERA checks, and 1-tap WhatsApp mobile upload links.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer">
              <Plus className="size-4" />
              <span>Request document</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <form onSubmit={handleRequestDoc}>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-[#14211C]">
                  Request Missing Document
                </DialogTitle>
                <DialogDescription>
                  Generate a WhatsApp upload link for the buyer to photograph and upload their document.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="doc">Document Name</Label>
                  <Input
                    id="doc"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    placeholder="e.g. Bank Statement (6 months)"
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="bg-[#0F766E] hover:bg-[#0d655e] text-white">
                  Send WhatsApp Upload Link
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Grid: Deals Selector & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Deals Selector */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col gap-3">
          <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-1">
            Active Deals
          </h3>

          <div
            onClick={() => setSelectedDeal("A. Kulkarni · Aundh")}
            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
              selectedDeal === "A. Kulkarni · Aundh"
                ? "bg-[#F1F8F6] border-[#0F766E]"
                : "bg-[#F6F7F5] border-[#E3E7E4] hover:bg-[#EEF1EF]"
            }`}
          >
            <div>
              <div className="font-bold text-xs text-[#14211C]">A. Kulkarni · Aundh</div>
              <div className="text-[11px] text-[#5B6B65]">3 BHK · Skyline Dev.</div>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FDEBD0] text-[#8A4B00]">
              3 of 5 ready
            </span>
          </div>

          <div
            onClick={() => setSelectedDeal("Meera Shah · Hinjewadi")}
            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
              selectedDeal === "Meera Shah · Hinjewadi"
                ? "bg-[#F1F8F6] border-[#0F766E]"
                : "bg-[#F6F7F5] border-[#E3E7E4] hover:bg-[#EEF1EF]"
            }`}
          >
            <div>
              <div className="font-bold text-xs text-[#14211C]">Meera Shah · Hinjewadi</div>
              <div className="text-[11px] text-[#5B6B65]">2 BHK · Metro Group</div>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
              Complete
            </span>
          </div>
        </Card>

        {/* Right 2 Cols: Checklist Table matching Mockup Screen 15 */}
        <Card className="lg:col-span-2 p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-base text-[#14211C]">
                Checklist · {selectedDeal}
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#E3F2EF] text-[#0B4F49]">
                Legal &amp; Registration Track
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                    <th className="py-2.5 px-3 font-semibold">Document</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                    <th className="py-2.5 px-3 font-semibold">Verification Note</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF1EF]">
                  {docs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-[#F9FAF9] transition-colors">
                      <td className="py-3 px-3 font-semibold text-[#14211C]">
                        {doc.docTitle}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            doc.status === "Received" || doc.status === "Verified" || doc.status === "Signed"
                              ? "bg-[#E3F2EF] text-[#0B4F49]"
                              : doc.status === "Draft"
                              ? "bg-[#FDEBD0] text-[#8A4B00]"
                              : "bg-[#FBE0DC] text-[#8F2A1D]"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#5B6B65]">{doc.note}</td>
                      <td className="py-3 px-3 text-right">
                        {doc.status === "Missing" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleNudgeClient(doc.docTitle)}
                            className="text-[#0F766E] hover:text-[#0d655e] hover:bg-[#E3F2EF] text-xs h-7 px-2"
                          >
                            <Send className="size-3 mr-1" />
                            Nudge
                          </Button>
                        )}
                        {doc.status !== "Missing" && (
                          <span className="text-[#0B4F49] text-xs font-medium flex items-center justify-end gap-1">
                            <CheckCircle2 className="size-3.5" />
                            OK
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-[#F1F8F6] border border-[#CFE3DE] rounded-lg mt-6 text-xs text-[#0B4F49]">
            <strong>Clients upload directly from a secure WhatsApp link.</strong> No external app download needed.
          </div>
        </Card>
      </div>
    </div>
  )
}
