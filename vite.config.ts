import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';

export default defineConfig({
    resolve: { tsconfigPaths: true },
    plugins: [tailwindcss(), react(), reactRouter(), babel({ presets: [reactCompilerPreset()] })],
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
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
});
