import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Optional: Increases the warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and Redux into a separate chunk
          "vendor-react": [
            "react",
            "react-dom",
            "react-router-dom",
            "@reduxjs/toolkit",
            "react-redux"
          ],
          // Split PDF tools (they are heavy!) into another chunk
          "vendor-pdf": ["jspdf", "html2canvas"],
          // Split UI icons
          "vendor-ui": ["lucide-react"]
        }
      }
    }
  }
});
