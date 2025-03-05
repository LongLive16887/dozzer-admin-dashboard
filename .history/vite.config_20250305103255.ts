import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Открывает сервер для локальной сети
    port: 5173, // Можно поменять порт, если надо
    allowedHosts: [
      '7f17-2a05-45c2-407a-e000-cc83-868-f477-9211.ngrok-free.app'
    ]
  },
})
