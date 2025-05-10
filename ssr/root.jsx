import "./index.css";

import { LiveReload } from "@ssr/liveReload.jsx";
import { ViteScripts } from "@ssr/viteScripts.jsx";
import { Outlet } from "react-router-dom";
import AnalyticsSetup from "./components/AnalyticsSetup";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

export const RootDocument = async () => {
  let styles = "";
  let scripts = "";

  if (typeof window === "undefined") {
    const { getClientAssets } = await import("../utils/getClientAssets.js");
    const assets = getClientAssets();
    styles = assets.styles;
    scripts = assets.scripts;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bradsen</title>
        <link rel="icon" href="#" type="image/svg+xml" />

        {/* External stylesheets */}

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />

        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <LiveReload />

        {/* ✅ Inject SSR styles */}
        {styles &&
          styles
            .match(/<link[^>]+>/g)
            ?.map((tag, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: tag }} />
            ))}

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W8VPZTM2');`,
          }}
        />
      </head>

      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W8VPZTM2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Ionicons */}
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          noModule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        ></script>

        {/* App Layout */}
        <AnalyticsSetup />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <CookieConsent />

        {/* ✅ Inject built JS */}
        <div dangerouslySetInnerHTML={{ __html: scripts }} />
        <ViteScripts />
      </body>
    </html>
  );
};
