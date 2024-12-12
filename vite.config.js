import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: [
    '**/*.jpeg',
    '**/*.jpg',
    '**/*.JPG',
    '**/*.png',
    '**/*.webp',
    '**/*.eps',
  ], // Includes these asset types in the build pipeline
  resolve: {
    alias: [{ find: "@", replacement: "/src" }], // Simplify imports with "@" alias for /src
  },
});
