import { AppSidebar } from "@/components/app-sidebar"
import Breadcrumbs from "@/components/breadcrumbs"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/providers/theme-provider"
import Cookies from "js-cookie"
import type { Metadata } from "next"
import { Montserrat, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { type ReactNode } from "react"

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const sourceSans3 = Source_Sans_3({
    variable: "--font-source-sans-3",
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
    metadataBase: new URL("https://utilities-webapp.vercel.app/"),
    title: {
        default: "Utilities Webapp",
        template: "%s | Utilities Webapp",
    },
    description:
        "Welcome to Utilities Webapp, your go-to platform for a variety of handy tools and utilities" +
        " designed to make your life easier. Whether you need to perform quick calculations, convert units, or access other useful functionalities, we've got you covered.",
    keywords: [
        "utilities",
        "webapp",
        "tools",
        "calculators",
        "converters",
        "productivity",
        "time management",
        "data analysis",
        "online tools",
        "handy utilities",
        "digital tools",
    ],
    authors: [{ name: "João Mendes J. B. Ribeiro", url: "https://www.linkedin.com/in/barataribeiro/" }],
    creator: "Barata Ribeiro",
    openGraph: {
        title: "Utilities Webapp",
        description:
            "Welcome to Utilities Webapp, your go-to platform for a variety of handy tools and utilities" +
            " designed to make your life easier. Whether you need to perform quick calculations, convert units, or access other useful functionalities, we've got you covered.",
        url: "https://utilities-webapp.vercel.app/",
        siteName: "Utilities Webapp",
        locale: "en-US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Utilities Webapp",
        description:
            "Welcome to Utilities Webapp, your go-to platform for a variety of handy tools and utilities" +
            " designed to make your life easier. Whether you need to perform quick calculations, convert units, or access other useful functionalities, we've got you covered.",
        creator: "@JohnRoachy",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    const defaultOpen = Cookies.get("sidebar_state") === "true"

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${montserrat.variable} ${sourceSans3.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ThemeSwitcher />

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
    )
}
