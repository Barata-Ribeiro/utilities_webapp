// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  publicDir: 'public',
  root: './',
  base: '/',
  build: {
    outDir: 'dist',
    indexHtmlTransforms: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    historyApiFallback: true,
  },
  plugins: [
    eslint({
      cache: false,
      fix: true,
    }),
  ],
});
