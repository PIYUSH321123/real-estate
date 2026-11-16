"use client"

import * as React from "react"
import {
    BadgePercent,
    BarChart3,
    Building2,
    CalendarCheck,
    Coins,
    FileText,
    Gift,
    Globe,
    Handshake,
    LayoutDashboard,
    LifeBuoy,
    ListTodo,
    MessageSquare,
    PhoneCall,
    Send,
    Settings,
    Smartphone,
    Sparkles,
    Users,
    Zap,
} from "lucide-react"

import { NavUser } from "@/app/(app)/c/[company]/dashboard/_navigation/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import { useParams, usePathname } from "next/navigation"

const gharsetuNavItems = [
    {
        title: "Dashboard",
        url: "/c/[company]/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Leads & Pipeline",
        url: "/c/[company]/dashboard/leads",
        icon: Users,
    },
    {
        title: "Lead Sources",
        url: "/c/[company]/dashboard/lead-sources",
        icon: Zap,
    },
    {
        title: "Calls",
        url: "/c/[company]/dashboard/calls",
        icon: PhoneCall,
    },
    {
        title: "WhatsApp",
        url: "/c/[company]/dashboard/whatsapp",
        icon: MessageSquare,
    },
    {
        title: "Properties",
        url: "/c/[company]/dashboard/properties",
        icon: Building2,
    },
    {
        title: "Website",
        url: "/c/[company]/dashboard/website",
        icon: Globe,
    },
    {
        title: "Smart Matches",
        url: "/c/[company]/dashboard/smart-matches",
        icon: Sparkles,
    },
    {
        title: "Co-broking",
        url: "/c/[company]/dashboard/co-broking",
        icon: Handshake,
    },
    {
        title: "Site Visits",
        url: "/c/[company]/dashboard/site-visits",
        icon: CalendarCheck,
    },
    {
        title: "Follow-ups",
        url: "/c/[company]/dashboard/follow-ups",
        icon: ListTodo,
    },
    {
        title: "Documents",
        url: "/c/[company]/dashboard/documents",
        icon: FileText,
    },
    {
        title: "Loans & EMI",
        url: "/c/[company]/dashboard/loan-emi",
        icon: BadgePercent,
    },
    {
        title: "Commissions",
        url: "/c/[company]/dashboard/commissions",
        icon: Coins,
    },
    {
        title: "Referrals",
        url: "/c/[company]/dashboard/referrals",
        icon: Gift,
    },
    {
        title: "Team & Reports",
        url: "/c/[company]/dashboard/team-reports",
        icon: BarChart3,
    },
    {
        title: "Settings",
        url: "/c/[company]/dashboard/settings",
        icon: Settings,
    },
]

export function AppSidebar({
    crmVisible = true,
    erpVisible = true,
    hiddenCrmModules = [],
    hiddenErpModules = [],
    hiddenSecondaryModules = [],
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    crmVisible?: boolean
    erpVisible?: boolean
    hiddenCrmModules?: string[]
    hiddenErpModules?: string[]
    hiddenSecondaryModules?: string[]
}) {
    const { company } = useParams()
    const pathname = usePathname()
    const companyStr = (Array.isArray(company) ? company[0] : company) || "demo"
    const { open, setOpen } = useSidebar()

    const navItems = React.useMemo(() => {
        return gharsetuNavItems.map((item) => ({
            ...item,
            resolvedUrl: item.url.replace("[company]", companyStr),
        }))
    }, [companyStr])

    const userProfile = {
        name: "Sameer Khan",
        email: "sameer.khan@gharsetu.com",
        avatar: "/avatars/sameer.jpg",
    }

    return (
        <Sidebar variant="inset" className="bg-[#0F2F2A] text-[#CFE3DE] border-r-0" {...props}>
            <SidebarHeader className="border-b border-[#17564D]/50 pb-3 pt-3 bg-[#0F2F2A]">
                <div className="flex items-center justify-between px-2">
                    <a
                        href={`/c/${companyStr}/dashboard`}
                        className="flex items-center gap-2.5 w-full group-data-[collapsible=icon]:justify-center"
                    >
                        <div className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-lg bg-[#0F766E] text-white font-bold text-base shadow-sm">
                            G
                        </div>
                        <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                            <span className="truncate font-bold text-white text-[15px] tracking-tight">Gharsetu CRM</span>
                            <span className="truncate text-xs text-[#99C7BE] capitalize">{companyStr} Realty</span>
                        </div>
                    </a>
                    <SidebarTrigger className="hidden md:flex ml-auto h-7 w-7 rounded-lg hover:bg-[#17564D] text-[#CFE3DE] group-data-[collapsible=icon]:hidden cursor-pointer" />
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-[#0F2F2A] px-2 py-2">
                <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="text-[#8FBDB4] text-[11px] font-semibold uppercase tracking-wider px-2 py-1 group-data-[collapsible=icon]:hidden">
                        Operations & Sales
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-0.5">
                            {navItems.map((item) => {
                                const isActive = pathname === item.resolvedUrl
                                const Icon = item.icon
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.title}
                                            className={`rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                                                isActive
                                                    ? "bg-[#17564D] text-white font-semibold"
                                                    : "text-[#CFE3DE] hover:bg-[#17564D]/60 hover:text-white"
                                            }`}
                                        >
                                            <a href={item.resolvedUrl} className="flex items-center gap-2.5">
                                                <Icon className={`size-4 shrink-0 ${isActive ? "text-[#5EEAD4]" : "text-[#A7D7CD]"}`} />
                                                <span className="truncate">{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-2 pt-2 border-t border-[#17564D]/40 p-0">
                    <SidebarGroupLabel className="text-[#8FBDB4] text-[11px] font-semibold uppercase tracking-wider px-2 py-1 group-data-[collapsible=icon]:hidden">
                        Field App
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Agent Mobile App"
                                    className="rounded-lg px-2.5 py-2 text-[13px] text-[#CFE3DE] hover:bg-[#17564D]/60 hover:text-white"
                                >
                                    <a href={`/c/${companyStr}/dashboard/mobile-agent`} className="flex items-center gap-2.5">
                                        <Smartphone className="size-4 shrink-0 text-[#F59E0B]" />
                                        <span className="truncate">Agent Mobile App</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-[#17564D]/50 bg-[#0F2F2A] p-2">
                <NavUser user={userProfile} />
            </SidebarFooter>
        </Sidebar>
    )
}
