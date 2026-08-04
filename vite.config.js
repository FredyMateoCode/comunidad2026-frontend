import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3001
  }, // <-- AGREGAR ESTA COMA
  optimizeDeps: {
    // Vite pre-empaquetará estas dependencias para evitar retrasos
    include: ['@mui/material', '@emotion/styled', '@emotion/react', '@mui/icons-material']
  }
});