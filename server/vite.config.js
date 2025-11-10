import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // ✅ Load .env file based on the current mode (development or production)
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:8080/api/v1'
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
    port: 5173, // frontend port
    proxy: {
      // 👇 this means any request starting with "/api" will go to your backend
      '/api': {
        target: `${backendUrl}/api/v1`, // your backend server
        changeOrigin: true,              // updates the origin of the host header to the target URL
        secure: false,                   // if using https on backend, set this to true
        rewrite: (path) => path.replace(/^\/api/, ''), // remove "/api" prefix before sending to backend
      },
    },
    },
  }
})
