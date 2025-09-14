import { defaultCache } from "@serwist/next/worker"
import { ExpirationPlugin, type PrecacheEntry, type RuntimeCaching, Serwist, StaleWhileRevalidate } from "serwist"

declare const self: ServiceWorkerGlobalScope & { __SW_MANIFEST?: (PrecacheEntry | string)[] }

const isDev = process.env.NODE_ENV !== "production"
const PRECACHE_NAME = "precache-v1"

const cacheStrategies: RuntimeCaching[] = [
    {
        matcher: ({ request, url: { pathname }, sameOrigin }) =>
            request.headers.get("RSC") === "1" &&
            request.headers.get("Next-Router-Prefetch") === "1" &&
            sameOrigin &&
            !pathname.startsWith("/api/"),
        handler: new StaleWhileRevalidate({
            cacheName: "pages-rsc-prefetch",
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 200,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    maxAgeFrom: "last-used",
                }),
            ],
        }),
    },
    {
        matcher: ({ request, url: { pathname }, sameOrigin }) =>
            request.headers.get("RSC") === "1" && sameOrigin && !pathname.startsWith("/api/"),
        handler: new StaleWhileRevalidate({
            cacheName: "pages-rsc",
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 200,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    maxAgeFrom: "last-used",
                }),
            ],
        }),
    },
    {
        matcher: ({ request, url: { pathname }, sameOrigin }) =>
            request.headers.get("Content-Type")?.includes("text/html") && sameOrigin && !pathname.startsWith("/api/"),
        handler: new StaleWhileRevalidate({
            cacheName: "pages",
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 200,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    maxAgeFrom: "last-used",
                }),
            ],
        }),
    },
    {
        matcher: ({ request, url: { pathname }, sameOrigin }) =>
            (request.mode === "navigate" ||
                request.destination === "document" ||
                request.headers.get("Accept")?.includes("text/html")) &&
            sameOrigin &&
            !pathname.startsWith("/api/"),
        handler: new StaleWhileRevalidate({
            cacheName: "pages-navigation",
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 200,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    maxAgeFrom: "last-used",
                }),
            ],
        }),
    },
]

const buildManifest = self.__SW_MANIFEST ?? []
const manifestUrls = buildManifest.map(entry => (typeof entry === "string" ? entry : entry.url)).filter(Boolean)
const coreUrls = ["/", "/~offline"]
const precacheUrls = Array.from(new Set([...coreUrls, ...manifestUrls]))

const serwist = new Serwist({
    precacheEntries: [...(self.__SW_MANIFEST ?? []), ...coreUrls],
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: [...cacheStrategies, ...defaultCache],
    precacheOptions: {
        cleanupOutdatedCaches: true,
        ignoreURLParametersMatching: [/.*/],
    },
    fallbacks: {
        entries: [
            {
                url: "/~offline",
                matcher({ request }) {
                    return request.destination === "document"
                },
            },
        ],
    },
})

async function safePrecache(urls: string[]) {
    const cache = await caches.open(PRECACHE_NAME)
    await Promise.all(
        urls.map(async url => {
            try {
                const resp = await fetch(url, { cache: "no-store" })
                if (resp?.ok) await cache.put(url, resp.clone())
            } catch {
                console.warn(`Precache failed for ${url}`)
            }
        }),
    )
}

self.addEventListener("install", event => {
    const precacheTask = isDev ? Promise.resolve() : safePrecache(precacheUrls)

    event.waitUntil(
        (async () => {
            await precacheTask
            await self.skipWaiting()
        })(),
    )
})

self.addEventListener("activate", event => {
    event.waitUntil(
        (async () => {
            await self.clients.claim()
            const keys = await caches.keys()
            await Promise.all(keys.map(k => (k !== PRECACHE_NAME ? caches.delete(k) : Promise.resolve())))
        })(),
    )
})

serwist.addEventListeners()
