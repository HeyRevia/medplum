/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3003,
    fs: {
      strict: false,
    },
    proxy: {},
    cors: true,
    hmr: {
      host: 'localhost',
    },
    strictPort: false,
    allowedHosts: ['localhost', '*.loca.lt'],
  },
});
