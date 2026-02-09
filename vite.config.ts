import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/cognito": {
        target: "http://35.238.154.117:8080",
        changeOrigin: true,
        secure: false,
      },
      "/ws": {
        target: "ws://35.238.154.117:8080",
        ws: true,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
