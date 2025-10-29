import { AppSidebar } from '@/components/app-sidebar';
import Breadcrumbs from '@/components/breadcrumbs';
import { SwRegister } from '@/components/sw-register';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import Cookies from 'js-cookie';
import type { Metadata, Viewport } from 'next';
import { Fira_Mono, Montserrat, Source_Sans_3 } from 'next/font/google';
import { type ReactNode } from 'react';
import './globals.css';

const montserrat = Montserrat({
    variable: '--font-montserrat',
    display: 'swap',
    subsets: ['latin'],
    style: ['normal', 'italic'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const sourceSans3 = Source_Sans_3({
    variable: '--font-source-sans-3',
    display: 'swap',
    subsets: ['latin'],
    style: ['normal', 'italic'],
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

const firaMono = Fira_Mono({
    variable: '--font-fira-mono',
    display: 'swap',
    subsets: ['latin'],
    style: ['normal'],
    weight: ['400', '500', '700'],
});

const APP_NAME = 'Utilities Webapp';
const APP_DEFAULT_TITLE = 'Utilities Webapp';
const APP_TITLE_TEMPLATE = '%s | Utilities Webapp';
const APP_DESCRIPTION = `Welcome to Utilities Webapp, your go-to platform for a variety of handy tools and utilities designed to make your life easier. Whether you need to perform quick calculations, convert units, or access other useful functionalities, we've got you covered.`;

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: APP_DEFAULT_TITLE,
    },
    formatDetection: {
        telephone: false,
    },
    keywords: [
        'utilities',
        'webapp',
        'tools',
        'calculators',
        'converters',
        'productivity',
        'time management',
        'data analysis',
        'online tools',
        'handy utilities',
        'digital tools',
    ],
    authors: [{ name: 'João Mendes J. B. Ribeiro', url: 'https://www.linkedin.com/in/barataribeiro/' }],
    creator: 'Barata Ribeiro',
    openGraph: {
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
        url: 'https://utilities-webapp.vercel.app/',
        locale: 'en-US',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
        creator: '@JohnRoachy',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export const viewport: Viewport = {
    themeColor: 'oklch(0.6229 0.2012 35.9323)',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const defaultOpen = Cookies.get('sidebar_state') === 'true';
    const fontVariables = `${montserrat.variable} ${sourceSans3.variable} ${firaMono.variable}`;
    const bodyStyles = cn('h-full w-full scroll-smooth! antialiased', fontVariables);

    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
            <body className={bodyStyles}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ThemeSwitcher />
                    <SwRegister />

                    <SidebarProvider defaultOpen={defaultOpen}>
                        <AppSidebar />
                        <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                                <div className="flex items-center gap-2 px-4">
                                    <SidebarTrigger className="-ml-1" />
                                    <Separator
                                        orientation="vertical"
                                        className="mr-2 data-[orientation=vertical]:h-4"
                                    />

                                    <Breadcrumbs />
                                </div>
                            </header>
                            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                                <main className="relative flex min-h-0 flex-1 flex-col gap-4 md:gap-6">{children}</main>
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
