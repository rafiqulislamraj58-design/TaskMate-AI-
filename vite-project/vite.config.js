import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/TaskMate-AI-/',
  plugins: [
    tailwindcss(),
  ],
})