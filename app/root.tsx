import { RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';
import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
    useLocation,
    useNavigate,
} from 'react-router';
import '~/app.css';
import errorImage from '~/assets/images/error-image.jpg';
import AppShell from '~/components/application/app-shell';
import { Meta as Metadata } from '~/components/application/meta';
import PwaMetadata from '~/components/application/pwa-metadata';
import SocialMetadata from '~/components/application/social-metadata';
import { useTheme } from '~/components/theme-provider';
import { Button } from '~/components/ui/button';
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
    const location = useLocation();

    return (
        <html lang="en" className={theme} suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="dcterms:rightsHolder" content="João Mendes J. B. Ribeiro" />
                <meta name="author" content="Barata Ribeiro" />
                <meta name="author_url" content="https://www.linkedin.com/in/barataribeiro/" />

                <PwaMetadata />
                {location.pathname === '/' && (
                    <>
                        <Metadata title={APP_DEFAULT_TITLE} description={APP_DESCRIPTION} keywords={APP_KEYWORDS} />
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
                    </>
                )}

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
    const location = useLocation();
    const navigate = useNavigate();

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

    useEffect(() => {
        if (!error) {
            navigate(location.pathname, { replace: true });
        }
    }, [error, location.pathname, navigate]);

    return (
        <main className="mx-auto flex min-h-dvh max-w-7xl flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16">
            <img
                src={errorImage}
                alt="there was an error"
                className="aspect-video w-full max-w-4xl rounded-xl object-cover italic dark:brightness-[0.95] dark:invert"
            />
            <div className="text-center text-balance">
                <h1 className="mb-2 text-5xl font-bold">{message}</h1>
                <p>{details}</p>
                {stack && (
                    <pre className="w-full overflow-x-auto p-4">
                        <code>{stack}</code>
                    </pre>
                )}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
                    <Button
                        className="h-9 px-4 py-2"
                        render={
                            <Link to="/" reloadDocument>
                                Go Back Home
                            </Link>
                        }
                    />

                    <Button
                        variant="ghost"
                        className="h-9 px-4 py-2"
                        onClick={() => navigate(location.pathname, { replace: true })}
                    >
                        <span>Refresh</span>
                        <RefreshCcw aria-hidden />
                    </Button>
                </div>
            </div>
        </main>
    );
}
