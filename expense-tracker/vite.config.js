import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220 20% 98%)', 
        surface: 'hsl(0 0% 100%)',     
        primary: 'hsl(220 13% 18%)',
        accent: 'hsl(240 5.9% 10%)',
        indigo: {
          500: '#6366F1',
          600: '#4F46E5',
        },
      }
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
