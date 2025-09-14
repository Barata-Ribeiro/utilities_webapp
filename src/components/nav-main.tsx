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
    GaugeIcon,
    type LucideIcon,
    NotebookIcon,
    PencilRulerIcon,
    RefreshCcwDotIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
    const { state, isMobile } = useSidebar()
    const pathname = usePathname()

    const LINKS: LinkItem[] = [
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
                    title: "Lorem Ipsum Generator",
                    url: "/utilities/lorem-ipsum",
                },
                {
                    title: "Pass. Generator",
                    url: "/utilities/password-generator",
                },
                {
                    title: "Roman Converter",
                    url: "/utilities/roman-converter",
                },
                {
                    title: "URL Slug Generator",
                    url: "/utilities/url-slug-generator",
                },
                {
                    title: "QR Code Generator",
                    url: "/utilities/qrcode-generator",
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
                {
                    title: "Bytes",
                    url: "/converters/bytes",
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
                {
                    title: "Dates",
                    url: "/calculators/dates",
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
                    className="data-current:bg-sidebar-accent data-current:text-sidebar-accent-foreground cursor-pointer"
                    asChild>
                    <Link href="/">
                        <GaugeIcon aria-hidden className="mr-2" />
                        <span>Home</span>
                    </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                    tooltip="About"
                    aria-current={pathname.endsWith("/about") ? "page" : undefined}
                    {...(pathname.endsWith("/about") && { "data-current": "" })}
                    className="data-current:bg-sidebar-accent data-current:text-sidebar-accent-foreground cursor-pointer"
                    asChild>
                    <Link href="/about">
                        <NotebookIcon aria-hidden className="mr-2" />
                        <span>About</span>
                    </Link>
                </SidebarMenuButton>
                {state === "collapsed" && !isMobile && (
                    <Fragment>
                        {LINKS.map(item => (
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
                                    <DropdownMenuGroup className="space-y-1">
                                        {item.items?.map(subItem => {
                                            const isActive = pathname.endsWith(subItem.url)

                                            return (
                                                <DropdownMenuItem
                                                    asChild
                                                    {...(isActive && { "data-current": "" })}
                                                    className="data-current:bg-sidebar-accent data-current:text-sidebar-accent-foreground cursor-pointer data-current:px-2 data-current:font-medium"
                                                    key={subItem.title}>
                                                    <Link
                                                        href={subItem.url}
                                                        aria-current={isActive ? "page" : undefined}
                                                        className="inline-flex w-full items-center gap-x-2">
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
                {(state === "expanded" || isMobile) && (
                    <Fragment>
                        {LINKS.map(item => (
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
                                                        <SidebarMenuSubButton isActive={isActive} asChild>
                                                            <Link
                                                                href={subItem.url}
                                                                aria-current={isActive ? "page" : undefined}
                                                                {...(isActive && { "data-current": "" })}
                                                                className="inline-flex items-center gap-x-2">
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
