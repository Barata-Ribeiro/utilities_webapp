import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { CacheFirst, ExpirationPlugin, NetworkFirst, Serwist, StaleWhileRevalidate } from 'serwist';

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

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    precacheOptions: { cleanupOutdatedCaches: true },
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    disableDevLogs: !isDev,
    runtimeCaching: [
        {
            matcher: ({ request }) => request.mode === 'navigate',
            handler: new NetworkFirst({
                cacheName: 'pages',
            }),
        },
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
    event.waitUntil(
        (async () => {
            const routes: string[] = await fetch('/routes.json').then((r) => r.json());

            const requestPromises = routes.map((route) =>
                Promise.resolve(serwist.handleRequest({ request: new Request(route), event })),
            );

            await Promise.allSettled(requestPromises);
        })(),
    );
});

serwist.addEventListeners();
