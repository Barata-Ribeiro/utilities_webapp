import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const isTest = mode === 'test';

    return {
        resolve: { tsconfigPaths: true },
        plugins: [
            tailwindcss(),
            react(),
            VitePWA({
                registerType: 'prompt',
                injectRegister: false,

                pwaAssets: {
                    disabled: false,
                    config: true,
                },

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
                },

                workbox: {
                    globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                    cleanupOutdatedCaches: true,
                    clientsClaim: true,
                },

                devOptions: {
                    enabled: false,
                    navigateFallback: 'index.html',
                    suppressWarnings: true,
                    type: 'module',
                },
            }),
            !isTest && reactRouter(),
            babel({ presets: [reactCompilerPreset()] }),
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
        assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
    };
});
