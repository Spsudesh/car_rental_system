//import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss(),],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // during development we can proxy API calls to the server
  server: {
    proxy: {
      // any request beginning with /api will be forwarded to backend
      '/api': 'http://localhost:3000'
    }
  }
});
