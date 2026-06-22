import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from 'react-router';

import '~/app.css';
import AppShell from '~/components/application/app-shell';
import { themeCookie } from '~/lib/theme-cookie.server';
import type { Route } from './+types/root';
import { useTheme } from './components/theme-provider';

export async function loader({ request }: Route.LoaderArgs) {
    const cookieHeader = request.headers.get('Cookie');

    const theme = ((await themeCookie.parse(cookieHeader)) as 'light' | 'dark' | 'system' | undefined) ?? 'system';

    return {
        theme,
    };
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
        <AppShell theme={loaderData.theme}>
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
