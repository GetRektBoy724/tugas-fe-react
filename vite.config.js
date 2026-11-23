import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const { API_TARGET = 'http://localhost:3000' } = loadEnv(mode, '.', 'API_')
  const proxy = {
    '/api': {
      target: API_TARGET,
      changeOrigin: true,
    },
  }
  return {
    plugins: [react(), tailwindcss()],
    server: { proxy },
    preview: { proxy },
  }
})
