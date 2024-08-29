import { resolve } from 'path';
import { defineConfig } from 'vite';
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
        manualChunks(id) {
          if (id.includes('mathjs')) return 'mathjs';
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
          return null;
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
    VitePWA({
      manifest: {
        name: 'Utility Web App',
        short_name: 'UWA',
        description:
          "A web app dedicated to several valuable tools I've developed for me, and perhaps even you.",
        theme_color: '#ffffff',
      },
      registerType: 'autoUpdate',
    }),
  ],
});
