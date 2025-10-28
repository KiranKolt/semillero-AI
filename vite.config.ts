import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/semillero-AI/',
  server: {
    host: true, // Permite conexiones desde la red local (para probar en Quest)
    port: 5173,
  },
})

