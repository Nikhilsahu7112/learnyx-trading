import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Learnyx Trading — Vite configuration.
// The dev server proxies /api/* to a local Cloudflare Worker (`npx wrangler dev --port 8787`)
// so the browser only ever talks to same-origin relative URLs.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    allowedHosts: true,
    proxy: {
      // Regex, not a plain prefix: '/api' as a string key would also swallow the
      // app's own '/api-docs' page and proxy it to the Worker.
      '^/api/': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Vite 8 / rolldown expects a function here (an object map is rejected).
        manualChunks(id: string) {
          if (id.includes('lightweight-charts')) return 'charts';
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'vendor';
          }
          return undefined;
        },
      },
    },
  },
});
