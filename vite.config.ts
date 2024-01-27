import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: "127.0.0.1",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      container: `${path.resolve(__dirname, "./src/containers/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      helpers: `${path.resolve(__dirname, "./src/helpers/")}`,
      services: `${path.resolve(__dirname, "./src/services/")}`,
      recipies: `${path.resolve(__dirname, "./src/recipies/")}`,
      styles: `${path.resolve(__dirname, "./src/styles/")}`,
    },
  },
});
