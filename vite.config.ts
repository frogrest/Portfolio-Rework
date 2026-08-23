import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages project sites are served from /<repository-name>/.
  base: '/Portfolio-Rework/',
})
