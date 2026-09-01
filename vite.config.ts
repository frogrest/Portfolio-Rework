import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap', 'lenis'],
        },
      },
    },
  },
  // GitHub Pages project sites are served from /<repository-name>/.
  base: '/Portfolio-Rework/',
})
