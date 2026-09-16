import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      proxy: {
        // NOTE: adjust this if your actual proxy target/path differs —
        // reconstructed from partial screenshots, verify against your original.
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching entirely when DISABLE_HMR is true (saves CPU during agent edits).
      // Otherwise, watch as normal but ignore the data folder so writing
      // investigations.json doesn't trigger a full page reload.
      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : {
              ignored: ['**/data/**', '**/data/investigations.json'],
            },
    },
  };
});