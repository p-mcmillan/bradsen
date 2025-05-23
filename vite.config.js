import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import pages from "vite-plugin-pages";
import ssr from "vite-plugin-ssr-config";
import vitePluginSitemap from "vite-plugin-sitemap";
import { createHtmlPlugin } from "vite-plugin-html";

let generatedPaths = []; // 🔧 Capture from vite-plugin-pages

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    pages({
      routeStyle: "remix",
      dirs: "./ssr/pages",
      resolve: true,
      onRoutesGenerated(routes) {
        generatedPaths = routes
          .map((r) => r.path)
          .filter((path) => !path.includes(":")); // exclude dynamic routes
        // console.log('📦 Sitemap paths:', generatedPaths);
      },
    }),

    ssr({
      rootDocument: "./ssr/root.jsx",
    }),

    vitePluginSitemap({
      baseUrl: "https://tylerbradsen.com",
      routes: () => generatedPaths,
    }),

    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: "North Vancouver, Burnaby & Vancouver Real Estate | Bradsen",
          description:
            "Looking to buy or sell in North Vancouver, Burnaby or Vancouver? Tyler Bradsen offers expert real estate services backed by local insight and dedication.",
        },
      },
    }),
  ],
  build: {
    manifest: true,
    outDir: "dist/client",
    rollupOptions: {
      external: ["express"],
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
  optimizeDeps: {
    include: ["jspdf", "html2canvas"],
  },
});
