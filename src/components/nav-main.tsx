"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    CalculatorIcon,
    ChevronRight,
    DotIcon,
    GaugeIcon,
    type LucideIcon,
    NotebookIcon,
    PencilRulerIcon,
    RefreshCcwDotIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Fragment } from "react"

interface LinkItem {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
        title: string
        url: string
    }[]
}

export function NavMain() {
    const { state, isMobile, toggleSidebar } = useSidebar()
    const pathname = usePathname()
    const router = useRouter()

    const links: LinkItem[] = [
        {
            title: "Utilities",
            url: "#",
            icon: PencilRulerIcon,
            isActive: pathname.startsWith("/utilities"),
            items: [
                {
                    title: "Char. Counter",
                    url: "/utilities/character-counter",
                },
                {
                    title: "Pass. Generator",
                    url: "/utilities/password-generator",
                },
                {
                    title: "Roman Converter",
                    url: "/utilities/roman-converter",
                },
            ],
        },
        {
            title: "Converters",
            url: "#",
            icon: RefreshCcwDotIcon,
            isActive: pathname.startsWith("/converters"),
            items: [
                {
                    title: "Temperature",
                    url: "/converters/temperature",
                },
                {
                    title: "Length",
                    url: "/converters/length",
                },
                {
                    title: "Mass",
                    url: "/converters/mass",
                },
                {
                    title: "Speed",
                    url: "/converters/speed",
                },
                {
                    title: "Time",
                    url: "/converters/time",
                },
            ],
        },
        {
            title: "Calculators",
            url: "#",
            icon: CalculatorIcon,
            isActive: pathname.endsWith("/calculators"),
            items: [
                {
                    title: "General",
                    url: "/calculators/general",
                },
                {
                    title: "BMI",
                    url: "/calculators/bmi",
                },
                {
                    title: "Percentage",
                    url: "/calculators/percentage",
                },
                {
                    title: "Rule of Three",
                    url: "/calculators/rule-of-three",
                },
            ],
        },
    ]

    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuButton
                    tooltip="Home"
                    aria-current={pathname === "/" ? "page" : undefined}
                    {...(pathname.endsWith("/") && { "data-current": "" })}
                    onClick={() => {
                        router.push("/")
                        toggleSidebar()
                    }}
                    className="data-current:bg-sidebar-accent data-current:text-sidebar-accent-foreground cursor-pointer">
                    <GaugeIcon aria-hidden className="mr-2" />
                    <span>Home</span>
                </SidebarMenuButton>
                <SidebarMenuButton
                    tooltip="About"
                    aria-current={pathname.endsWith("/about") ? "page" : undefined}
                    {...(pathname.endsWith("/about") && { "data-current": "" })}
                    onClick={() => {
                        router.push("/about")
                        toggleSidebar()
                    }}
                    className="data-current:bg-sidebar-accent data-current:text-sidebar-accent-foreground cursor-pointer">
                    <NotebookIcon aria-hidden className="mr-2" />
                    <span>About</span>
                </SidebarMenuButton>
                {state === "collapsed" && !isMobile && (
                    <Fragment>
                        {links.map(item => (
                            <DropdownMenu key={item.title}>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={item.isActive}
                                        aria-current={item.isActive ? "page" : undefined}
                                        {...(item.isActive && { "data-current": "" })}
                                        className="data-current:bg-sidebar-accent data-current:text-sidebar-accent-foreground cursor-pointer">
                                        {item.icon && <item.icon />}
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent side="right" align="start">
                                    <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {item.items?.map(subItem => {
                                            const isActive = pathname.endsWith(subItem.url)

                                            return (
                                                <DropdownMenuItem key={subItem.title}>
                                                    <Link
                                                        href={subItem.url}
                                                        aria-current={isActive ? "page" : undefined}
                                                        {...(isActive && { "data-current": "" })}
                                                        onClick={() => toggleSidebar()}
                                                        className="inline-flex w-full items-center gap-x-2 data-current:underline">
                                                        {isActive && <DotIcon aria-hidden />}
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ))}
                    </Fragment>
                )}
                {state === "expanded" && (
                    <Fragment>
                        {links.map(item => (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={item.isActive}
                                className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={item.isActive}
                                            aria-current={item.isActive ? "page" : undefined}
                                            {...(item.isActive && { "data-current": "" })}
                                            className="data-current:bg-sidebar-accent data-current:text-sidebar-accent-foreground cursor-pointer">
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map(subItem => {
                                                const isActive = pathname.endsWith(subItem.url)

                                                return (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link
                                                                href={subItem.url}
                                                                aria-current={isActive ? "page" : undefined}
                                                                {...(isActive && { "data-current": "" })}
                                                                onClick={() => toggleSidebar()}
                                                                className="inline-flex items-center gap-x-2 data-current:underline">
                                                                {isActive && <DotIcon aria-hidden />}
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                )
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </Fragment>
                )}{" "}
            </SidebarMenu>
        </SidebarGroup>
    )
}
