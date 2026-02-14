import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: mode === "development",
    chunkSizeWarningLimit: 1200,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react', '@radix-ui/react-slot', 'class-variance-authority', 'tailwind-merge'],
          'vendor-utils': ['@supabase/supabase-js', '@tanstack/react-query', 'date-fns']
        }
      }
    }
  },
  define: {
    'process.env': {}
  },
  ssr: {
    noExternal: ['react-helmet-async', 'react-router-dom', 'lucide-react']
  }
}));
