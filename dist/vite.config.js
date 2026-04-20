import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/GA/',
  server: {
    port: 4173,
    open: true,
  },
})