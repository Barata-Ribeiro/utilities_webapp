import { type ComponentProps } from 'react';
import { Logo } from '~/components/navigation/logo';
import { NavFooter } from '~/components/navigation/nav-footer';
import { NavMain } from '~/components/navigation/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '~/components/ui/sidebar';

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" variant="sidebar" {...props}>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <NavMain />
            </SidebarContent>
            <SidebarFooter>
                <NavFooter />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
