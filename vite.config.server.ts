import { defineConfig } from "vite";
import ssr from "vite-plugin-ssr-config";

export default defineConfig({
  build: {
    outDir: "dist", // Ensure all server output lands in `dist/`
    ssr: "ssr/entry-server.jsx", // Your entry point for SSR rendering
    rollupOptions: {
      output: {
        entryFileNames: "bin/[name]-[hash].js",
        chunkFileNames: "bin/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  plugins: [
    ssr({
      rootDocument: "ssr/root.jsx",
    }),
  ],
});
