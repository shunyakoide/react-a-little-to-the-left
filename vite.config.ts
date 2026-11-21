import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // Relative paths, so the build works under /react-a-little-to-the-left/ on GitHub Pages.
  base: './',
  plugins: [react()],
})
