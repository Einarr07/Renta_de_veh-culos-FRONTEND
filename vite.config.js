import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteWindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteWindiCSS()],
  build: {
    sourcemap: true,
  },
})
