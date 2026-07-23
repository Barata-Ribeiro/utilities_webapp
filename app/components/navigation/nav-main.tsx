import {
    CalculatorIcon,
    ChevronRight,
    CodeXmlIcon,
    GaugeIcon,
    type LucideIcon,
    NotebookIcon,
    PencilRulerIcon,
    RefreshCcwDotIcon,
} from 'lucide-react';
import { Activity } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '~/components/ui/sidebar';
import { URLS } from '~/lib/consts';

interface LinkItem {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: readonly {
        title: string;
        url: string;
    }[];
}

export function NavMain() {
    const { state, isMobile } = useSidebar();
    const location = useLocation();

    const LINKS: LinkItem[] = [
        {
            title: 'Utilities',
            url: '#',
            icon: PencilRulerIcon,
            isActive: location.pathname.startsWith('/utilities'),
            items: URLS.utilities,
        },
        {
            title: 'Converters',
            url: '#',
            icon: RefreshCcwDotIcon,
            isActive: location.pathname.startsWith('/converters'),
            items: URLS.converters,
        },
        {
            title: 'Calculators',
            url: '#',
            icon: CalculatorIcon,
            isActive: location.pathname.endsWith('/calculators'),
            items: URLS.calculators,
        },
        {
            title: 'Programming',
            url: '#',
            icon: CodeXmlIcon,
            isActive: location.pathname.startsWith('/programming'),
            items: URLS.programming,
        },
    ];

    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuButton
                    tooltip="Home"
                    aria-current={location.pathname === '/' ? 'page' : undefined}
                    {...(location.pathname.endsWith('/') && { 'data-current': '' })}
                    className="cursor-pointer data-current:bg-sidebar-accent data-current:text-sidebar-accent-foreground"
                    asChild
                >
                    <NavLink to="/" prefetch="render">
                        <GaugeIcon aria-hidden className="mr-2" />
                        <span>Home</span>
                    </NavLink>
                </SidebarMenuButton>
                <SidebarMenuButton
                    tooltip="About"
                    aria-current={location.pathname.endsWith('/about') ? 'page' : undefined}
                    {...(location.pathname.endsWith('/about') && { 'data-current': '' })}
                    className="cursor-pointer data-current:bg-sidebar-accent data-current:text-sidebar-accent-foreground"
                    asChild
                >
                    <NavLink to="/about" prefetch="render" end>
                        <NotebookIcon aria-hidden className="mr-2" />
                        <span>About</span>
                    </NavLink>
                </SidebarMenuButton>

                <Activity mode={state === 'collapsed' && !isMobile ? 'visible' : 'hidden'}>
                    {LINKS.map((item) => (
                        <DropdownMenu key={item.title}>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    isActive={item.isActive}
                                    aria-current={item.isActive ? 'page' : undefined}
                                    {...(item.isActive && { 'data-current': '' })}
                                    className="cursor-pointer data-current:bg-sidebar-accent data-current:text-sidebar-accent-foreground"
                                >
                                    {item.icon && <item.icon />}
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent side="right" align="start" className="w-full">
                                <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup className="grid space-y-1">
                                    {item.items?.map((subItem) => {
                                        const isActive = location.pathname.endsWith(subItem.url);

                                        return (
                                            <DropdownMenuItem
                                                asChild
                                                {...(isActive && { 'data-current': '' })}
                                                className="inline-flex cursor-pointer items-center gap-x-2 data-current:bg-sidebar-accent data-current:px-2 data-current:font-medium data-current:text-sidebar-accent-foreground"
                                                key={subItem.title}
                                            >
                                                <NavLink
                                                    to={subItem.url}
                                                    aria-current={isActive ? 'page' : undefined}
                                                    prefetch="render"
                                                    end
                                                >
                                                    <span>{subItem.title}</span>
                                                </NavLink>
                                            </DropdownMenuItem>
                                        );
                                    })}
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ))}
                </Activity>

                <Activity mode={state === 'expanded' || isMobile ? 'visible' : 'hidden'}>
                    {LINKS.map((item) => (
                        <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={item.isActive}
                                        aria-current={item.isActive ? 'page' : undefined}
                                        {...(item.isActive && { 'data-current': '' })}
                                        className="cursor-pointer data-current:bg-sidebar-accent data-current:text-sidebar-accent-foreground"
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => {
                                            const isActive = location.pathname.endsWith(subItem.url);

                                            return (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton isActive={isActive} asChild>
                                                        <NavLink
                                                            to={subItem.url}
                                                            {...(isActive && { 'data-current': '' })}
                                                            className="inline-flex items-center gap-x-2"
                                                            aria-current={isActive ? 'page' : undefined}
                                                            prefetch="render"
                                                            end
                                                        >
                                                            <span>{subItem.title}</span>
                                                        </NavLink>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                </Activity>
            </SidebarMenu>
        </SidebarGroup>
    );
}
