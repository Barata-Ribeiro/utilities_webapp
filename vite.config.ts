import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig(({ mode }) => {
    const isTest = mode === 'test';

    return {
        resolve: { tsconfigPaths: true },
        plugins: [tailwindcss(), react(), !isTest && reactRouter(), babel({ presets: [reactCompilerPreset()] })].filter(
            Boolean,
        ),
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
            setupFiles: ['./tests/setup.ts'],
            globals: true,
            environment: 'jsdom',
            include: ['tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
            restoreMocks: true,
            browser: {
                enabled: true,
                headless: true,
                provider: playwright(),
                instances: [{ browser: 'chromium' }, { browser: 'firefox' }],
            },
        },
        assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
    };
});
