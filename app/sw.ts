import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { CacheFirst, ExpirationPlugin, Serwist, StaleWhileRevalidate } from 'serwist';

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;
const isDev = process.env['NODE_ENV'] !== 'production';
const PAGE_CACHE = 'pages';
const ROUTE_DATA_CACHE = 'route-data';

function toAbsoluteUrl(path: string) {
    return new URL(path, self.location.origin).toString();
}

function getRouteDocumentUrl(route: string) {
    return toAbsoluteUrl(route);
}

function getRouteDataUrl(route: string) {
    if (route === '/') {
        return toAbsoluteUrl('/_.data');
    }

    return toAbsoluteUrl(route.endsWith('/') ? `${route}_.data` : `${route}.data`);
}

function normalizeCacheKey(request: Request) {
    const url = new URL(request.url);

    if (request.mode === 'navigate' || url.pathname.endsWith('.data')) {
        url.search = '';
        url.hash = '';
    }

    return url.toString();
}

function isRouteDataRequest(request: Request) {
    const url = new URL(request.url);

    return request.method === 'GET' && (url.pathname.endsWith('.data') || url.pathname.endsWith('/_.data'));
}

async function putIfOk(cacheName: string, cacheKey: string, response: Response) {
    if (!response.ok || response.type === 'error') {
        return;
    }

    const cache = await caches.open(cacheName);
    await cache.put(cacheKey, response.clone());
}

async function matchCached(cacheName: string, request: Request) {
    const cache = await caches.open(cacheName);
    return cache.match(normalizeCacheKey(request), { ignoreSearch: true });
}

async function warmApplicationShell(event: ExtendableEvent) {
    const response = await fetch('/routes.json', { cache: 'no-store' });

    if (!response.ok) {
        throw new Error(`Unable to fetch routes manifest: ${response.status}`);
    }

    const routes: string[] = await response.json();

    await Promise.allSettled(
        routes.flatMap((route) => {
            const documentUrl = getRouteDocumentUrl(route);
            const dataUrl = getRouteDataUrl(route);

            return [
                (async () => {
                    try {
                        const documentResponse = await fetch(documentUrl);
                        await putIfOk(PAGE_CACHE, documentUrl, documentResponse);
                    } catch {
                        // Ignore warm-up misses and keep the install resilient.
                    }
                })(),
                (async () => {
                    try {
                        const dataResponse = await fetch(dataUrl);
                        await putIfOk(ROUTE_DATA_CACHE, dataUrl, dataResponse);
                    } catch {
                        // Ignore warm-up misses and keep the install resilient.
                    }
                })(),
            ];
        }),
    );
}

async function handleNavigationRequest(request: Request) {
    try {
        const response = await fetch(request);
        await putIfOk(PAGE_CACHE, normalizeCacheKey(request), response);
        return response;
    } catch (error) {
        const cachedResponse = await matchCached(PAGE_CACHE, request);

        if (cachedResponse) {
            return cachedResponse;
        }

        throw error;
    }
}

async function handleRouteDataRequest(request: Request) {
    try {
        const response = await fetch(request);
        await putIfOk(ROUTE_DATA_CACHE, normalizeCacheKey(request), response);
        return response;
    } catch (error) {
        const cachedResponse = await matchCached(ROUTE_DATA_CACHE, request);

        if (cachedResponse) {
            return cachedResponse;
        }

        throw error;
    }
}

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    precacheOptions: { cleanupOutdatedCaches: true },
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    disableDevLogs: !isDev,
    runtimeCaching: [
        {
            matcher: ({ request }) => request.destination === 'image',
            handler: new CacheFirst({
                cacheName: 'images',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 200,
                        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                    }),
                ],
            }),
        },
        {
            matcher: ({ request }) => /\.json$/i.test(request.url) || request.url.endsWith('.json'),
            handler: new StaleWhileRevalidate({
                cacheName: 'public-json',
                plugins: [
                    new ExpirationPlugin({
                        maxEntries: 128,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                        maxAgeFrom: 'last-used',
                    }),
                ],
            }),
        },
    ],
});

if (isDev) {
    self.addEventListener('install', (event) => {
        console.log('Event install (dev only)', event);
        self.skipWaiting();
    });

    self.addEventListener('activate', (event) => {
        event.waitUntil(self.clients.claim());
    });

    self.addEventListener('fetch', (event) => console.log('Fetch event (dev only)', event));
}

self.addEventListener('install', (event) => {
    event.waitUntil(warmApplicationShell(event));
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') {
        return;
    }

    if (request.mode === 'navigate') {
        event.respondWith(handleNavigationRequest(request));
        return;
    }

    if (isRouteDataRequest(request)) {
        event.respondWith(handleRouteDataRequest(request));
    }
});

serwist.addEventListeners();
