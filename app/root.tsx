import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from 'react-router';

import '~/app.css';
import AppShell from '~/components/application/app-shell';
import SocialMetadata from '~/components/application/social-metadata';
import { useTheme } from '~/components/theme-provider';
import { APP_DEFAULT_TITLE, APP_DESCRIPTION, APP_KEYWORDS, APP_URL } from '~/lib/consts';
import { sidebarCookie } from '~/lib/sidebar-cookie.server';
import { themeCookie } from '~/lib/theme-cookie.server';
import type { Route } from './+types/root';

export async function loader({ request }: Route.LoaderArgs) {
    const cookieHeader = request.headers.get('Cookie');

    const theme = ((await themeCookie.parse(cookieHeader)) as 'light' | 'dark' | 'system' | undefined) ?? 'system';

    const sidebarState = ((await sidebarCookie.parse(cookieHeader)) as boolean | undefined) ?? false;

    return { theme, sidebarState };
}

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const { theme } = useTheme();

    return (
        <html lang="en" className={theme} suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="dcterms:rightsHolder" content="João Mendes J. B. Ribeiro" />
                <meta name="author" content="Barata Ribeiro" />
                <meta name="author_url" content="https://www.linkedin.com/in/barataribeiro/" />
                <title>{APP_DEFAULT_TITLE}</title>
                <meta name="description" content={APP_DESCRIPTION} />
                <meta name="keywords" content={APP_KEYWORDS.join(', ')} />
                <link rel="manifest" href="/manifest.webmanifest" />
                <SocialMetadata
                    openGraph={{
                        title: APP_DEFAULT_TITLE,
                        description: APP_DESCRIPTION,
                        url: APP_URL,
                    }}
                    twitter={{
                        creator: '@JohnRoachy',
                        title: APP_DEFAULT_TITLE,
                        description: APP_DESCRIPTION,
                    }}
                />
                <Meta />
                <Links />
            </head>
            <body className="relative h-full w-full scroll-smooth! antialiased">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App({ loaderData }: Route.ComponentProps) {
    return (
        <AppShell theme={loaderData.theme} sidebarOpen={loaderData.sidebarState}>
            <Outlet />
        </AppShell>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!';
    let details = 'An unexpected error occurred.';
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error';
        details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="container mx-auto p-4 pt-16">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full overflow-x-auto p-4">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
