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
      '@': path.resolve(rootDir, 'src'),
      '@hooks': path.resolve(rootDir, 'src/hooks'),
      '@stores': path.resolve(rootDir, 'src/stores'),
      '@components': path.resolve(rootDir, 'src/components'),
      '@utils': path.resolve(rootDir, 'src/utils'),          
      '@assets': path.resolve(rootDir, 'src/assets'),        
      '@data': path.resolve(rootDir, 'src/data'),  
      '@pages': path.resolve(rootDir, 'src/pages'),  
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});
