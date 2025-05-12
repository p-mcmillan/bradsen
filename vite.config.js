// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';
// import pages from 'vite-plugin-pages';
// import ssr from 'vite-plugin-ssr-config';
// import { ViteSitemap } from 'vite-plugin-sitemap';
// import { createHtmlPlugin } from 'vite-plugin-html';
// import { viteSSG } from 'vite-ssg/serialized-data';

// export const routes = [
//   {
//     id: 'home',
//     name: 'Home',
//     path: '/',
//   },
//   {
//     id: 'about-me',
//     name: 'About Me',
//     path: '/about-me',
//   },
//   {
//     id: 'listings',
//     name: 'Listings',
//     path: '/listings',
//   },
//   // {
//   //   id: "blog",
//   //   name: "Blog",
//   //   path: "/blog",
//   // },
//   {
//     id: 'FAQ',
//     name: 'FAQ',
//     path: '/faq',
//   },
//   {
//     id: 'contact',
//     name: 'Contact',
//     path: '/contact-me',
//   },
// ];

// // // https://vite.dev/config/
// export default defineConfig({
//   // base: "/",
//   plugins: [
//     react(),
//     tailwindcss(),
//     viteSSG({ includedRoutes: () => routes }),
//     ViteSitemap({
//       baseUrl: 'https://tylerbradsen.com',
//       routes,
//       generateRobotsTxt: true,
//     }),
//     createHtmlPlugin({
//       minify: true,
//       inject: {
//         data: {
//           title: 'North Vancouver, Burnaby & Vancouver Real Estate | Bradsen',
//           description:
//             'Looking to buy or sell in North Vancouver, Burnaby or Vancouver? Tyler Bradsen offers expert real estate services backed by local insight and dedication.',
//         },
//       },
//     }),
//     pages({
//       routeStyle: 'remix',
//       dirs: './ssr/pages',
//       resolve: true,
//       onRoutesGenerated(routes) {
//         console.log('📦 Generated Routes:');
//         console.dir(routes, { depth: null });
//       },
//     }),

//     ssr({
//       rootDocument: './ssr/root.jsx',
//     }),
//   ],
//   build: {
//     manifest: true,
//     outDir: 'dist/client',
//     rollupOptions: {
//       // external: ["express"],
//       input: './ssr/root.jsx',
//       spa: './spa/index.html',
//     },
//     minify: 'esbuild',
//     treeShaking: true,
//   },

//   server: {
//     watch: {
//       usePolling: true,
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import pages from 'vite-plugin-pages';
import ssr from 'vite-plugin-ssr-config';
import vitePluginSitemap from 'vite-plugin-sitemap';
import { createHtmlPlugin } from 'vite-plugin-html';

let generatedPaths = []; // 🔧 Capture from vite-plugin-pages

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    pages({
      routeStyle: 'remix',
      dirs: './ssr/pages',
      resolve: true,
      onRoutesGenerated(routes) {
        generatedPaths = routes
          .map((r) => r.path)
          .filter((path) => !path.includes(':')); // exclude dynamic routes
        // console.log('📦 Sitemap paths:', generatedPaths);
      },
    }),

    ssr({
      rootDocument: './ssr/root.jsx',
    }),

    vitePluginSitemap({
      baseUrl: 'https://tylerbradsen.com',
      routes: () => generatedPaths,
    }),

    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'North Vancouver, Burnaby & Vancouver Real Estate | Bradsen',
          description:
            'Looking to buy or sell in North Vancouver, Burnaby or Vancouver? Tyler Bradsen offers expert real estate services backed by local insight and dedication.',
        },
      },
    }),
  ],
  build: {
    manifest: true,
    outDir: 'dist/client',
    rollupOptions: {
      external: ['express'],
      input: './ssr/root.jsx',
      spa: './spa/index.html',
    },
    minify: 'esbuild',
    treeShaking: true,
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
