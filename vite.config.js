import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import pages from "vite-plugin-pages";
import ssr from "vite-plugin-ssr-config";

// // https://vite.dev/config/
export default defineConfig({
  // base: "/",
  plugins: [
    react(),
    tailwindcss(),
    pages({
      routeStyle: "remix",
      dirs: "./ssr/pages",
      resolve: true,
      onRoutesGenerated(routes) {
        // console.log("📦 Generated Routes:");
        // console.dir(routes, { depth: null });
      },
    }),

    ssr({
      rootDocument: "./ssr/root.jsx",
    }),
  ],
  build: {
    manifest: true,
    outDir: "dist/client",
    rollupOptions: {
      // external: ["express"],
      input: "./ssr/root.jsx",
      spa: "./spa/index.html",
    },
    minify: "esbuild",
    treeShaking: true,
  },

  server: {
    watch: {
      usePolling: true,
    },
  },
});
