// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  publicDir: 'public',
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    eslint({
      cache: false,
      fix: true,
    }),
  ],
});
