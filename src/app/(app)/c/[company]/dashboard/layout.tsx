"use client"

import * as React from "react"
import { Menu } from "lucide-react"

// UI Components
import { SidebarInset, SidebarProvider, useSidebar } from "@/components/ui/sidebar"

// App Components
import { AppSidebar } from "@/app/(app)/c/[company]/dashboard/_navigation/app-sidebar"

export default function CompanyLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "260px",
                    "--sidebar-width-icon": "64px",
                    "--header-height": "56px",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <MySidebarInset>
                <SidebarTriggerButton />
                {children}
            </MySidebarInset>
        </SidebarProvider>
    )
}

function MySidebarInset({ children }: { children: React.ReactNode }) {
    return (
        <SidebarInset className="bg-[#F6F7F5] min-h-screen">
            {children}
        </SidebarInset>
    )
}

function SidebarTriggerButton() {
    const { open, openMobile, isMobile, setOpen, setOpenMobile } = useSidebar()
    const showTrigger = isMobile ? !openMobile : !open

    if (!showTrigger) return null

    return (
        <button
            onClick={() => {
                if (isMobile) {
                    setOpenMobile(true)
                } else {
                    setOpen(true)
                }
            }}
            className="fixed top-3 left-3 md:top-4 md:left-4 z-40 h-8 w-8 rounded-lg border border-[#E3E7E4] bg-white/95 backdrop-blur-md hover:bg-[#EEF1EF] text-[#14211C] flex items-center justify-center shadow-sm transition-all cursor-pointer shrink-0"
            title="Open Sidebar"
            aria-label="Open Sidebar"
        >
            <Menu className="h-4 w-4" />
        </button>
    )
}
