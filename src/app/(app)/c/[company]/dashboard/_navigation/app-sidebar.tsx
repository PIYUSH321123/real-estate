"use client"

import * as React from "react"
import {
    BadgePercent,
    BarChart3,
    Building2,
    CalendarCheck,
    ChevronDown,
    ChevronRight,
    Coins,
    FileText,
    Gift,
    Globe,
    Handshake,
    LayoutDashboard,
    ListTodo,
    MessageSquare,
    PhoneCall,
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useParams, usePathname } from "next/navigation"
import { gharsetuStore } from "@/lib/mock/store"

interface NavItem {
    title: string
    url: string
    icon: React.ComponentType<{ className?: string }>
    badge?: string
}

interface NavGroup {
    id: string
    label: string
    items: NavItem[]
}

const SIDEBAR_GROUPS: NavGroup[] = [
    {
        id: "sales",
        label: "Sales",
        items: [
            {
                title: "Dashboard",
                url: "/c/[company]/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Leads & Pipeline",
                url: "/c/[company]/dashboard/leads",
                icon: Users,
                badge: "8",
            },
            {
                title: "Follow-ups",
                url: "/c/[company]/dashboard/follow-ups",
                icon: ListTodo,
                badge: "7 overdue",
            },
            {
                title: "Site Visits",
                url: "/c/[company]/dashboard/site-visits",
                icon: CalendarCheck,
                badge: "3",
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
        ],
    },
    {
        id: "inventory",
        label: "Inventory",
        items: [
            {
                title: "Properties",
                url: "/c/[company]/dashboard/properties",
                icon: Building2,
                badge: "6",
            },
            {
                title: "Smart Matches",
                url: "/c/[company]/dashboard/smart-matches",
                icon: Sparkles,
                badge: "Hot",
            },
            {
                title: "Co-broking",
                url: "/c/[company]/dashboard/co-broking",
                icon: Handshake,
            },
            {
                title: "Website",
                url: "/c/[company]/dashboard/website",
                icon: Globe,
            },
        ],
    },
    {
        id: "finance",
        label: "Finance & Docs",
        items: [
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
                title: "Documents",
                url: "/c/[company]/dashboard/documents",
                icon: FileText,
            },
            {
                title: "Referrals",
                url: "/c/[company]/dashboard/referrals",
                icon: Gift,
            },
        ],
    },
    {
        id: "insights",
        label: "Insights",
        items: [
            {
                title: "Lead Sources",
                url: "/c/[company]/dashboard/lead-sources",
                icon: Zap,
            },
            {
                title: "Team & Reports",
                url: "/c/[company]/dashboard/team-reports",
                icon: BarChart3,
            },
        ],
    },
]

export function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const { company } = useParams()
    const pathname = usePathname()
    const companyStr = (Array.isArray(company) ? company[0] : company) || "demo"
    const { open, state } = useSidebar()
    const isIconOnly = state === "collapsed"

    // Live CRM counts for sidebar badges
    const [liveCounts, setLiveCounts] = React.useState({
        leads: gharsetuStore.leads.length,
        visits: gharsetuStore.siteVisits.length,
        followUps: gharsetuStore.followUps.length,
    })

    React.useEffect(() => {
        gharsetuStore.hydrateFromStorage()
        const update = () => {
            setLiveCounts({
                leads: gharsetuStore.leads.length,
                visits: gharsetuStore.siteVisits.length,
                followUps: gharsetuStore.followUps.length,
            })
        }
        update()
        const unsub = gharsetuStore.subscribe(update)
        gharsetuStore.syncFromServer()
        return unsub
    }, [])

    // Persisted expanded group states
    const [collapsedGroups, setCollapsedGroups] = React.useState<Record<string, boolean>>(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem("gharsetu_sidebar_collapsed_groups")
                if (stored) return JSON.parse(stored)
            } catch {
                // fallback
            }
        }
        return {}
    })

    const toggleGroup = (groupId: string) => {
        setCollapsedGroups((prev) => {
            const updated = { ...prev, [groupId]: !prev[groupId] }
            try {
                localStorage.setItem("gharsetu_sidebar_collapsed_groups", JSON.stringify(updated))
            } catch {
                // ignore
            }
            return updated
        })
    }

    const userProfile = {
        name: "Sameer Khan",
        email: "sameer.khan@gharsetu.com",
        avatar: "/avatars/sameer.jpg",
    }

    return (
        <TooltipProvider delayDuration={150}>
            <Sidebar variant="inset" className="bg-[#0F2F2A] text-[#CFE3DE] border-r-0 select-none" {...props}>
                {/* Header */}
                <SidebarHeader className="border-b border-[#17564D]/50 pb-3 pt-3 bg-[#0F2F2A]">
                    <div className="flex items-center justify-between px-2">
                        <a
                            href={`/c/${companyStr}/dashboard`}
                            className="flex items-center gap-2.5 w-full group-data-[collapsible=icon]:justify-center"
                        >
                            <div className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-lg bg-[#0F766E] text-white font-black text-base shadow-sm ring-1 ring-[#5EEAD4]/20">
                                G
                            </div>
                            <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                                <span className="truncate font-extrabold text-white text-[15px] tracking-tight">
                                    Gharsetu CRM
                                </span>
                                <span className="truncate text-xs text-[#99C7BE] capitalize">
                                    {companyStr} Realty Hub
                                </span>
                            </div>
                        </a>
                        <SidebarTrigger className="hidden md:flex ml-auto h-7 w-7 rounded-lg hover:bg-[#17564D] text-[#CFE3DE] group-data-[collapsible=icon]:hidden cursor-pointer" />
                    </div>
                </SidebarHeader>

                {/* Content: Grouped Navigation */}
                <SidebarContent className="bg-[#0F2F2A] px-2 py-2 gap-2 overflow-y-auto">
                    {SIDEBAR_GROUPS.map((group) => {
                        const isGroupCollapsed = !!collapsedGroups[group.id]

                        return (
                            <SidebarGroup key={group.id} className="p-0">
                                <div
                                    onClick={() => toggleGroup(group.id)}
                                    className="flex items-center justify-between px-2 py-1 text-[#8FBDB4] hover:text-white text-[11px] font-bold uppercase tracking-wider cursor-pointer group-data-[collapsible=icon]:hidden transition-colors rounded-md hover:bg-[#17564D]/30"
                                >
                                    <span>{group.label}</span>
                                    {isGroupCollapsed ? (
                                        <ChevronRight className="size-3 text-[#8FBDB4]" />
                                    ) : (
                                        <ChevronDown className="size-3 text-[#8FBDB4]" />
                                    )}
                                </div>

                                {!isGroupCollapsed && (
                                    <SidebarGroupContent className="mt-0.5">
                                        <SidebarMenu className="gap-0.5">
                                            {group.items.map((item) => {
                                                const resolvedUrl = item.url.replace("[company]", companyStr)
                                                const isActive =
                                                    pathname === resolvedUrl ||
                                                    (item.url !== "/c/[company]/dashboard" && pathname.startsWith(resolvedUrl))
                                                const Icon = item.icon
                                                const liveBadge =
                                                    item.title === "Leads & Pipeline"
                                                        ? String(liveCounts.leads)
                                                        : item.title === "Site Visits"
                                                        ? String(liveCounts.visits)
                                                        : item.title === "Follow-ups"
                                                        ? String(liveCounts.followUps)
                                                        : item.badge

                                                const buttonContent = (
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={isActive}
                                                        className={`rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-all relative ${
                                                            isActive
                                                                ? "bg-[#17564D] text-white font-semibold shadow-xs"
                                                                : "text-[#CFE3DE] hover:bg-[#17564D]/50 hover:text-white"
                                                        }`}
                                                    >
                                                        <a href={resolvedUrl} className="flex items-center gap-2.5 w-full">
                                                            {/* Active indicator bar */}
                                                            {isActive && (
                                                                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#5EEAD4] rounded-r" />
                                                            )}
                                                            <Icon
                                                                className={`size-4 shrink-0 ${
                                                                    isActive ? "text-[#5EEAD4]" : "text-[#A7D7CD]"
                                                                }`}
                                                            />
                                                            <span className="truncate flex-1 group-data-[collapsible=icon]:hidden">
                                                                {item.title}
                                                            </span>
                                                            {liveBadge && (
                                                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#0F766E] text-[#E3F2EF] group-data-[collapsible=icon]:hidden">
                                                                    {liveBadge}
                                                                </span>
                                                            )}
                                                        </a>
                                                    </SidebarMenuButton>
                                                )

                                                if (isIconOnly) {
                                                    return (
                                                        <SidebarMenuItem key={item.title}>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                                                                <TooltipContent side="right" className="bg-[#0F2F2A] text-white border-[#17564D] text-xs font-semibold">
                                                                    {item.title} {liveBadge ? `(${liveBadge})` : ""}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </SidebarMenuItem>
                                                    )
                                                }

                                                return (
                                                    <SidebarMenuItem key={item.title}>
                                                        {buttonContent}
                                                    </SidebarMenuItem>
                                                )
                                            })}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                )}
                            </SidebarGroup>
                        )
                    })}

                    {/* Bottom Utility Group */}
                    <SidebarGroup className="mt-2 pt-2 border-t border-[#17564D]/40 p-0">
                        <SidebarMenu className="gap-0.5">
                            {/* Settings */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    className={`rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-all ${
                                        pathname.includes("/settings")
                                            ? "bg-[#17564D] text-white font-semibold"
                                            : "text-[#CFE3DE] hover:bg-[#17564D]/50 hover:text-white"
                                    }`}
                                >
                                    <a href={`/c/${companyStr}/dashboard/settings`} className="flex items-center gap-2.5">
                                        <Settings className="size-4 shrink-0 text-[#A7D7CD]" />
                                        <span className="truncate group-data-[collapsible=icon]:hidden">Settings</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* Mobile App */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    className="rounded-lg px-2.5 py-1.5 text-[13px] text-[#CFE3DE] hover:bg-[#17564D]/50 hover:text-white"
                                >
                                    <a href={`/c/${companyStr}/dashboard/mobile-agent`} className="flex items-center gap-2.5">
                                        <Smartphone className="size-4 shrink-0 text-[#F59E0B]" />
                                        <span className="truncate group-data-[collapsible=icon]:hidden">
                                            Agent Mobile App
                                        </span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                {/* Footer User */}
                <SidebarFooter className="border-t border-[#17564D]/50 bg-[#0F2F2A] p-2">
                    <NavUser user={userProfile} />
                </SidebarFooter>
            </Sidebar>
        </TooltipProvider>
    )
}
