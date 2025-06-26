import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()],
resolve: {
  alias: {
    '@features': path.resolve(rootDir, 'src/features'),
    '@shared'  : path.resolve(rootDir, 'src/shared'),
    '@styles' : path.resolve(rootDir, 'src/styles'), },
},
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});
