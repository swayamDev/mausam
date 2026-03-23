import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // Target modern browsers — aligns with React 19 and ES2023 in tsconfig
    target: "es2020",

    // Emit source maps for production debugging (hidden = not referenced in bundle)
    sourcemap: "hidden",

    rollupOptions: {
      output: {
        // Manual chunk splitting keeps initial bundle small:
        // - Mapbox GL is large (~800 KB) and changes infrequently → own chunk
        // - Recharts + d3 deps → own chunk
        // - React + React-DOM → own chunk (cached separately from app code)
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-mapbox": ["mapbox-gl"],
          "vendor-charts": ["recharts"],
          "vendor-query": ["@tanstack/react-query"],
        },
      },
    },
  },
});

