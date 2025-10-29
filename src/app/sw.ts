import { URLS } from '@/lib/consts';
import { defaultCache } from '@serwist/next/worker';
import { ExpirationPlugin, type PrecacheEntry, type RuntimeCaching, Serwist, StaleWhileRevalidate } from 'serwist';

declare const self: ServiceWorkerGlobalScope & { __SW_MANIFEST?: (PrecacheEntry | string)[] };

const isDev = process.env.NODE_ENV !== 'production';

const cacheStrategies: RuntimeCaching[] = [
    {
        matcher: ({ request, url: { pathname }, sameOrigin }) =>
            request.headers.get('RSC') === '1' &&
            request.headers.get('Next-Router-Prefetch') === '1' &&
            sameOrigin &&
            !pathname.startsWith('/api/'),
        handler: new StaleWhileRevalidate({
            cacheName: 'pages-rsc-prefetch',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 200,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    maxAgeFrom: 'last-used',
                }),
            ],
        }),
    },
    {
        matcher: ({ request, url: { pathname }, sameOrigin }) =>
            request.headers.get('RSC') === '1' && sameOrigin && !pathname.startsWith('/api/'),
        handler: new StaleWhileRevalidate({
            cacheName: 'pages-rsc',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 200,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    maxAgeFrom: 'last-used',
                }),
            ],
        }),
    },
    {
        matcher: ({ request, url: { pathname }, sameOrigin }) =>
            request.headers.get('Content-Type')?.includes('text/html') && sameOrigin && !pathname.startsWith('/api/'),
        handler: new StaleWhileRevalidate({
            cacheName: 'pages',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 200,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    maxAgeFrom: 'last-used',
                }),
            ],
        }),
    },
    {
        matcher: ({ request, url: { pathname }, sameOrigin }) =>
            (request.mode === 'navigate' ||
                request.destination === 'document' ||
                request.headers.get('Accept')?.includes('text/html')) &&
            sameOrigin &&
            !pathname.startsWith('/api/'),
        handler: new StaleWhileRevalidate({
            cacheName: 'pages-navigation',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 200,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    maxAgeFrom: 'last-used',
                }),
            ],
        }),
    },
    {
        matcher: ({ url: { pathname }, sameOrigin }) =>
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i.test(pathname) && sameOrigin,
        handler: new StaleWhileRevalidate({
            cacheName: 'images',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 64,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                    maxAgeFrom: 'last-used',
                }),
            ],
        }),
    },
    {
        matcher: ({ url: { pathname }, sameOrigin }) => /\/_next\/static.+\.js$/i.test(pathname) && sameOrigin,
        handler: new StaleWhileRevalidate({
            cacheName: 'next-static-js-assets',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 64,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    maxAgeFrom: 'last-used',
                }),
            ],
        }),
    },
    {
        matcher: ({ url: { pathname }, sameOrigin }) =>
            sameOrigin &&
            (/\/_next\/static.+\.js$/i.test(pathname) || /\.json$/i.test(pathname) || pathname.endsWith('.json')),
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
];

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: [...cacheStrategies, ...defaultCache],
    precacheOptions: {
        cleanupOutdatedCaches: true,
        concurrency: 20,
        ignoreURLParametersMatching: [/.*/],
    },
    fallbacks: {
        entries: [
            {
                url: '/~offline',
                matcher({ request }) {
                    return request.destination === 'document';
                },
            },
        ],
    },
});

const baseUrls = ['/', '/~offline'] as const;
const otherUrls = Object.values(URLS)
    .flat()
    .map(({ url }) => url);
const urlsToCache = [...baseUrls, ...otherUrls];

if (isDev) {
    self.addEventListener('install', (event) => {
        console.log('Event install (dev only)', event);
        void self.skipWaiting();
    });

    self.addEventListener('activate', (event) => {
        event.waitUntil(self.clients.claim());
    });

    self.addEventListener('fetch', (event) => console.log('Fetch event (dev only)', event));
}

self.addEventListener('install', (event) => {
    const promises = urlsToCache.map((entry) =>
        Promise.resolve(serwist.handleRequest({ request: new Request(entry), event })),
    );
    event.waitUntil(Promise.all(promises));
});

serwist.addEventListeners();
