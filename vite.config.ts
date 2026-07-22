import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import devtoolsJson from 'vite-plugin-devtools-json';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';
import { routesManifest } from './routes-manifest';

export default defineConfig(({ mode }) => {
    const isTest = mode === 'test';

    return {
        resolve: { tsconfigPaths: true },
        ssr: {
            optimizeDeps: { include: ['lodash'] },
            noExternal: ['lodash'],
        },
        plugins: [
            tailwindcss(),
            routesManifest(),
            VitePWA({
                base: '/',
                outDir: 'build/client',
                registerType: 'prompt',
                injectRegister: false,

                pwaAssets: {
                    disabled: false,
                    config: true,
                    includeHtmlHeadLinks: true,
                    integration: {
                        outDir: 'build/client',
                    },
                },

                includeAssets: ['**/*'],

                manifest: {
                    name: 'Utilities Webapp',
                    short_name: 'Web Utilities',
                    description:
                        'A collection of web utilities built with React and Vite, including a password generator, calculators, and more.',
                    start_url: '/',
                    scope: '/',
                    display: 'standalone',
                    theme_color: 'oklch(0.6229 0.2012 35.9323)',
                    background_color: 'oklch(0.9851 0 0)',
                    icons: [
                        {
                            src: 'pwa-64x64.png',
                            sizes: '64x64',
                            type: 'image/png',
                        },
                        {
                            src: 'pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                        },
                    ],
                    orientation: 'portrait',
                },

                workbox: {
                    globPatterns: ['**/*'],
                    cleanupOutdatedCaches: true,
                    clientsClaim: true,
                    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
                    runtimeCaching: [
                        {
                            urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
                                request.headers.get('RSC') === '1' && sameOrigin && !pathname.startsWith('/api/'),
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'rsc-prefetch-cache',
                                expiration: {
                                    maxEntries: 200,
                                    maxAgeSeconds: 60 * 60 * 24, // 1 day
                                },
                            },
                        },
                        {
                            urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
                                request.headers.get('RSC') === '1' && sameOrigin && !pathname.startsWith('/api/'),
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'rsc-cache',
                                expiration: {
                                    maxEntries: 200,
                                    maxAgeSeconds: 60 * 60 * 24, // 1 day
                                },
                            },
                        },
                        {
                            urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
                                request.headers.get('Content-Type')?.includes('text/html') &&
                                sameOrigin &&
                                !pathname.startsWith('/api/'),
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'html-cache',
                                expiration: {
                                    maxEntries: 200,
                                    maxAgeSeconds: 60 * 60 * 24, // 1 day
                                },
                            },
                        },
                        {
                            urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
                                (request.mode === 'navigate' ||
                                    request.destination === 'document' ||
                                    request.headers.get('Accept')?.includes('text/html')) &&
                                sameOrigin &&
                                !pathname.startsWith('/api/'),
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'navigate-cache',
                                expiration: {
                                    maxEntries: 200,
                                    maxAgeSeconds: 60 * 60 * 24, // 1 day
                                },
                            },
                        },
                        {
                            urlPattern: ({ url: { pathname }, sameOrigin }) =>
                                /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i.test(pathname) && sameOrigin,
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'image-cache',
                                expiration: {
                                    maxEntries: 64,
                                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                                },
                            },
                        },
                        {
                            urlPattern: ({ url: { pathname }, sameOrigin }) =>
                                /\.(?:js|css|woff2?|eot|ttf|otf|json)$/i.test(pathname) && sameOrigin,
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'static-resources-cache',
                                expiration: {
                                    maxEntries: 64,
                                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                                },
                            },
                        },
                    ],
                },

                devOptions: {
                    enabled: mode === 'development',
                    suppressWarnings: true,
                    navigateFallback: '/',
                    navigateFallbackAllowlist: [/^\/$/],
                    type: 'module',
                    resolveTempFolder: () => 'build/client/dev',
                },
            }),
            !isTest && reactRouter(),
            devtoolsJson({ normalizeForWindowsContainer: true }),
        ].filter(Boolean),
        build: {
            target: 'esnext',
            minify: 'oxc',
            chunkSizeWarningLimit: 1000,
            rolldownOptions: {
                output: {
                    entryFileNames: '[hash].js',
                    chunkFileNames: `[hash].js`,
                    assetFileNames: `[hash].[ext]`,
                    minify: true,
                },
            },
            cssCodeSplit: true,
            sourcemap: false,
            assetsInlineLimit: 4096,
        },
        server: {
            port: 5173,
            headers: {
                'x-content-type-options': 'nosniff',
                'Referrer-Policy': 'no-referrer',
                'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
                'X-Frame-Options': 'DENY',
                'X-XSS-Protection': '1; mode=block',
                'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
            },
        },
        test: {
            globals: true,
            environment: 'jsdom',
            restoreMocks: true,
            projects: [
                {
                    extends: true,
                    test: {
                        include: [
                            'tests/functions/**/*.function.test.{js,ts,jsx,tsx}',
                            'tests/functions/**/*.function.spec.{js,ts,jsx,tsx}',
                        ],
                    },
                },
                {
                    extends: true,
                    setupFiles: ['./tests/setup.ts'],
                    test: {
                        include: [
                            'tests/browser/**/*.browser.test.{js,ts,jsx,tsx}',
                            'tests/browser/**/*.browser.spec.{js,ts,jsx,tsx}',
                        ],
                        browser: {
                            enabled: true,
                            headless: true,
                            provider: playwright(),
                            instances: [{ browser: 'chromium' }, { browser: 'firefox' }],
                        },
                    },
                },
            ],
        },
        assetsInclude: ['**/*.{svg,png,jpg,jpeg,gif,webp,ico,woff,woff2,eot,ttf,otf,json}'],
    };
});
