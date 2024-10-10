import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es', // Ensures that the output format is ES modules
      },
    },
  },
  worker: {
    format: 'es', // This ensures that your workers are treated as ES modules
  },
})
