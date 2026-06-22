import type { ReactNode } from 'react';
import { AppThemeSwitcher } from '~/components/application/app-theme-switcher';
import PWABadge from '~/components/application/pwa-badge';
import { ThemeProvider } from '~/components/theme-provider';
import { TooltipProvider } from '~/components/ui/tooltip';
import type { Theme } from '~/lib/theme-cookie.server';

export default function AppShell({ children, theme }: Readonly<{ children: ReactNode; theme: Theme }>) {
    return (
        <ThemeProvider initialTheme={theme}>
            <TooltipProvider>
                {children}
                <AppThemeSwitcher />
                <PWABadge />
            </TooltipProvider>
        </ThemeProvider>
    );
}
