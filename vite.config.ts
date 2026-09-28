import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { sitemapPlugin } from './vite-plugins/sitemap.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
