import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@views": path.resolve(__dirname, "src/components/views"),
      "@tools": path.resolve(__dirname, "src/components/tools"),
      "@contexts": path.resolve(__dirname, "src/components/contexts"),
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
