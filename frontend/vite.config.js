import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    proxy: {
      "/api/v1": "https://ecommify-backend.onrender.com",
    }
  },
  plugins: [react()]
})
