import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3002,
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
