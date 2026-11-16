"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  CheckCircle2,
  Clock,
  Database,
  Download,
  FileSpreadsheet,
  HardDrive,
  RefreshCw,
  ShieldCheck,
  Upload,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function DataBackupPage() {
  const params = useParams()
  const companySlug = (Array.isArray(params.company) ? params.company[0] : params.company) || "demo"

  const backups = [
    { when: "Today, 2:00 AM", type: "Automatic", contents: "Leads, properties, documents", status: "Complete" },
    { when: "Yesterday, 2:00 AM", type: "Automatic", contents: "Leads, properties, documents", status: "Complete" },
    { when: "14 Nov, 2:00 AM", type: "Automatic", contents: "Full database snapshot", status: "Complete" },
  ]

  const handleExportAll = () => {
    toast.success("Full Export Package Generated", {
      description: "Downloaded complete CSV archives for Leads, Properties, Deals and ZIP for Documents.",
    })
  }

  const handleImportWizard = () => {
    toast.success("CSV Mapping Wizard Ready", {
      description: "Upload your 99acres or MagicBricks export spreadsheet to map columns.",
    })
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-[#F6F7F5] min-h-screen text-[#14211C] flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#14211C]">
            Data, Import &amp; Backup
          </h1>
          <p className="text-sm text-[#5B6B65] mt-0.5">
            Bulk portal leads import, comprehensive CSV/ZIP data export, and nightly automated snapshots.
          </p>
        </div>

        <Button
          onClick={handleExportAll}
          className="bg-[#0F766E] hover:bg-[#0d655e] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Download className="size-4" />
          <span>Export all data</span>
        </Button>
      </div>

      {/* Main Grid: Import/Export Tools & Backups Log matching Mockup Screen 21 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Col: Import & Export */}
        <div className="flex flex-col gap-5">
          <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-3">
              Import
            </h3>
            <p className="text-xs text-[#5B6B65] mb-4">
              Easily migrate legacy records or bulk upload enquiries from property expos and portal Excel exports.
            </p>

            <div className="flex flex-col gap-2.5">
              <Button
                variant="outline"
                onClick={handleImportWizard}
                className="w-full justify-between text-xs h-10 border-[#E3E7E4] hover:border-[#0F766E] hover:bg-[#F1F8F6]"
              >
                <span className="font-semibold">Import CSV or Excel</span>
                <span className="text-[11px] text-[#5B6B65]">Portal leads (99acres / MagicBricks)</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleImportWizard}
                className="w-full justify-between text-xs h-10 border-[#E3E7E4] hover:border-[#0F766E] hover:bg-[#F1F8F6]"
              >
                <span className="font-semibold">Move from another CRM</span>
                <span className="text-[11px] text-[#5B6B65]">With visual column mapping</span>
              </Button>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs">
            <h3 className="font-semibold text-base text-[#14211C] border-b border-[#EEF1EF] pb-3 mb-3">
              Export
            </h3>
            <p className="text-xs text-[#5B6B65] mb-3">
              Your real estate data always belongs to you. Download complete clean backups at any time.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-xs text-[#14211C]">Database CSVs</div>
                <div className="text-[11px] text-[#5B6B65] mt-0.5">Leads, Properties, Deals</div>
              </div>
              <div className="p-3 bg-[#F6F7F5] rounded-lg border border-[#E3E7E4]">
                <div className="font-bold text-xs text-[#14211C]">Documents ZIP</div>
                <div className="text-[11px] text-[#5B6B65] mt-0.5">Client KYC &amp; Agreements</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Backups and Activity Log */}
        <Card className="p-5 bg-white border border-[#E3E7E4] rounded-xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-base text-[#14211C]">
                Backups and activity log
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E3F2EF] text-[#0B4F49]">
                Nightly 2:00 AM Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#EEF1EF] text-[#5B6B65]">
                    <th className="py-2.5 px-2 font-semibold">When</th>
                    <th className="py-2.5 px-2 font-semibold">Type</th>
                    <th className="py-2.5 px-2 font-semibold">Contents</th>
                    <th className="py-2.5 px-2 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF1EF]">
                  {backups.map((b, i) => (
                    <tr key={i} className="hover:bg-[#F9FAF9] transition-colors">
                      <td className="py-3.5 px-2 font-semibold text-[#14211C]">{b.when}</td>
                      <td className="py-3.5 px-2 text-[#5B6B65]">{b.type}</td>
                      <td className="py-3.5 px-2 text-[#5B6B65]">{b.contents}</td>
                      <td className="py-3.5 px-2 text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E3F2EF] text-[#0B4F49]">
                          <CheckCircle2 className="size-3" />
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-[#F1F8F6] border border-[#CFE3DE] rounded-lg mt-6 text-xs text-[#0B4F49]">
            Encrypted off-site storage preserves historical client interactions and audit trail logs.
          </div>
        </Card>
      </div>
    </div>
  )
}
