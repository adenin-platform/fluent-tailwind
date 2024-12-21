import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import Pages from 'vite-plugin-pages';
import themePlugin from './src/vite/vite-plugin-theme';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    themePlugin(),
    tailwindcss(),
    Pages(),
  ],
  server: {
    port: 3000,
    host: '127.0.0.1',
  },
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
