import type { ReactNode } from 'react';
import { AppSidebar } from '~/components/application/app-sidebar';
import { AppThemeSwitcher } from '~/components/application/app-theme-switcher';
import PWABadge from '~/components/application/pwa-badge';
import Breadcrumbs from '~/components/breadcrumbs';
import { ThemeProvider } from '~/components/theme-provider';
import { Separator } from '~/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { TooltipProvider } from '~/components/ui/tooltip';
import type { Theme } from '~/lib/theme-cookie.server';

type Props = {
    children: ReactNode;
    theme: Theme;
    sidebarOpen?: boolean;
};

export default function AppShell({ children, theme, sidebarOpen }: Readonly<Props>) {
    return (
        <ThemeProvider initialTheme={theme}>
            <TooltipProvider>
                <SidebarProvider defaultOpen={sidebarOpen}>
                    <AppSidebar />

                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2" />

                                <Breadcrumbs />
                            </div>
                        </header>
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                            <main className="relative flex min-h-0 flex-1 flex-col gap-4 md:gap-6">{children}</main>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
                <AppThemeSwitcher />
                <PWABadge />
            </TooltipProvider>
        </ThemeProvider>
    );
}
