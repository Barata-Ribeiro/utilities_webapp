import { useEffect, useEffectEvent, type ComponentProps } from 'react';
import { useLocation } from 'react-router';
import { Logo } from '~/components/navigation/logo';
import { NavFooter } from '~/components/navigation/nav-footer';
import { NavMain } from '~/components/navigation/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from '~/components/ui/sidebar';

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    const { isMobile, setOpenMobile } = useSidebar();
    const { pathname } = useLocation();

    const onPathnameChange = useEffectEvent(() => {
        if (isMobile) {
            setOpenMobile(false);
        }
    });

    useEffect(() => onPathnameChange(), [pathname]);

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
