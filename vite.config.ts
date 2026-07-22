import { reactRouter } from '@react-router/dev/vite';
import { serwist } from '@serwist/vite';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import devtoolsJson from 'vite-plugin-devtools-json';
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
            !isTest && reactRouter(),
            !isTest &&
                serwist({
                    swSrc: null!,
                    swDest: null!,
                    globDirectory: null!,
                    swUrl: '/sw.js',
                    injectionPoint: 'self.__SW_MANIFEST',
                    rollupFormat: 'iife',
                    integration: {
                        closeBundleOrder: 'pre',
                        configureOptions(viteConfig, options) {
                            const clientOutDir = path.resolve(viteConfig.root, 'build', 'client');
                            const swDest = path.resolve(clientOutDir, 'sw.js');
                            options.swSrc = path.resolve(viteConfig.root, 'app', 'sw.ts');
                            options.swDest = swDest;
                            options.globDirectory = clientOutDir;
                        },
                    },
                }),
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
