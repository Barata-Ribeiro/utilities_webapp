'use client';

import { Logo } from '@/components/logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { type ComponentProps } from 'react';

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
