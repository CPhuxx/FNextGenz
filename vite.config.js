import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // ตั้งค่า Frontend ให้รันที่ 5173
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // เชื่อมกับ Backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
