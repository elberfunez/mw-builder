import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // In production, build a self-contained IIFE for CDN embedding:
  //   <script src="builder.js"></script>
  // In dev, normal Vite HMR server (no lib mode needed).
  ...(command === 'build' && {
    build: {
      lib: {
        entry: 'src/main.jsx',
        name: 'MWBuilder',
        fileName: () => 'builder.js',
        formats: ['iife'],
      },
    },
  }),
}))
