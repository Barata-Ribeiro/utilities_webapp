// vite.config.js
import { resolve } from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
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
      output: {
        // eslint-disable-next-line consistent-return
        manualChunks(id) {
          if (id.includes('mathjs')) return 'mathjs';
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
    minify: 'esbuild',
  },
  server: {
    historyApiFallback: true,
  },
  plugins: [
    eslint({
      cache: false,
      fix: true,
    }),
    VitePWA({ registerType: 'autoUpdate' }),
    splitVendorChunkPlugin(),
  ],
});
