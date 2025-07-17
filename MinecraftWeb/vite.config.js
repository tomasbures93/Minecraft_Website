import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'; // Import the plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    mkcert() // Add the mkcert plugin here
  ],
  server: {
    https: true, // This tells Vite to use HTTPS
    // Optional: specify the port if you want it different from default (e.g., 5173)
    // port: 3000,
  }
})
