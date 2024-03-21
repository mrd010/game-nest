import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://store.steampowered.com',
        changeOrigin: true,
      },
      '/ISteamNews': {
        target: 'https://api.steampowered.com',
        changeOrigin: true,
      },
      '/actions': {
        target: 'https://steamcommunity.com',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
