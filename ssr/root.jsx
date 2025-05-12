import './index.css';

import { LiveReload } from '@ssr/liveReload.jsx';
import { ViteScripts } from '@ssr/viteScripts.jsx';
import { Outlet } from 'react-router-dom';
import AnalyticsSetup from './components/AnalyticsSetup';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

export const RootDocument = async () => {
  let styles = '';
  let scripts = '';

  if (typeof window === 'undefined') {
    const { getClientAssets } = await import('../utils/getClientAssets.js');
    const assets = getClientAssets();
    styles = assets.styles;
    scripts = assets.scripts;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          North Vancouver, Burnaby & Vancouver Real Estate | Bradsen
        </title>

        {/* <!-- Basic Meta --> */}
        <meta
          name="description"
          content="Looking to buy or sell in North Vancouver, Burnaby or Vancouver? Tyler Bradsen offers expert real estate services backed by local insight and dedication."
        />
        <meta
          name="keywords"
          content="Deep Cove real estate, North Vancouver realtor, homes for sale Deep Cove, Bradsen, luxury condos North Van, Vancouver property listings, Deep Cove property expert, North Van real estate agent, Vancouver real estate, Burnaby homes for sale, Westmar Realty, Macdonald Realty, real estate agent North Vancouver, real estate expert Burnaby, luxury homes Vancouver, condos for sale Burnaby, Bradsen Westmar"
        />
        <meta name="author" content="Bradsen" />
        <link rel="canonical" href="https://tylerbradsen.com/contact-me" />

        {/* <!-- Favicon and Icons --> */}
        <link
          rel="icon"
          href="https://westmar.ca/_media/custom/Vector-color.svg"
          type="image/svg+xml"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://westmar.ca/_media/custom/Vector-color.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="https://westmar.ca/_media/custom/Vector-color.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="https://westmar.ca/_media/custom/Vector-color.svg"
        />

        {/* <!-- Open Graph (Facebook & LinkedIn) --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="North Vancouver, Burnaby & Vancouver Real Estate | Bradsen"
        />
        <meta
          property="og:description"
          content="Find your next home with Tyler Bradsen. I specialize in North Vancouver, Burnaby & Vancouver homes. Visit me at 203-5188 Westminster Hwy, Richmond, BC."
        />
        <meta property="og:url" content="https://tylerbradsen.com/contact-me" />
        <meta
          property="og:image"
          content="https://westmar.ca/_media/custom/Vector-color.svg"
        />
        <meta property="og:locale" content="en_CA" />

        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Bradsen | North Vancouver, Burnaby & Vancouver Real Estate"
        />
        <meta
          name="twitter:description"
          content="Your trusted realtor in Deep Cove and North Van. Buy or sell with confidence."
        />
        <meta
          name="twitter:image"
          content="https://westmar.ca/_media/custom/Vector-color.svg"
        />
        {/* 
  <!-- Web Manifest --> */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        {/* 
  <!-- Structured Data (Schema.org JSON-LD) --> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Tyler Bradsen',
              image:
                'https://tylerbradsen.com/assets/tyler_bradsen-BJUJG6OL.webp',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '203 - 5188 Westminster Hwy',
                addressLocality: 'Richmond',
                addressRegion: 'BC',
                postalCode: 'V7C 5S7',
                addressCountry: 'CA',
              },
              openingHours: ['Mo-Fr 09:00-18:00', 'Sa 10:00-16:00'],
              url: 'https://tylerbradsen.com/contact-me',
              telephone: '+1-604-989-8442',
              areaServed: [
                // Vancouver
                'Downtown',
                'Yaletown',
                'Gastown',
                'Coal Harbour',
                'West End',
                'Kitsilano',
                'Fairview',
                'Mount Pleasant',
                'Main Street',
                'Fraser',
                'Cambie Village',
                'Shaughnessy',
                'Marpole',
                'Oakridge',
                'Kerrisdale',
                'Dunbar',
                'Point Grey',
                'Hastings-Sunrise',
                'Renfrew-Collingwood',
                'Strathcona',
                'South Vancouver',

                // North Vancouver
                'Lonsdale',
                'Lower Lonsdale',
                'Upper Lonsdale',
                'Edgemont',
                'Lynn Valley',
                'Blueridge',
                'Deep Cove',
                'Canyon Heights',
                'Delbrook',
                'Capilano',
                'Seymour',
                'Queensbury',
                'Westlynn',
                'Grousewoods',
                'Indian River',

                // Burnaby
                'Metrotown',
                'Brentwood',
                'Edmonds',
                'Burnaby Heights',
                'Capitol Hill',
                'Forest Glen',
                'South Slope',
                'Big Bend',
                'Deer Lake',
                'Central Park',
                'Willingdon Heights',
                'Montecito',
                'Lochdale',
                'Government Road',
                'Simon Fraser Hills',
                'Sperling-Duthie',
              ].map((area) => ({
                '@type': 'Place',
                name: area,
              })),
            }),
          }}
        />

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
      </head>

      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W8VPZTM2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* App Layout */}

        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <CookieConsent />
        <AnalyticsSetup />
        {/* ✅ Inject built JS */}
        <div dangerouslySetInnerHTML={{ __html: scripts }} />
        <ViteScripts />
        {/* Ionicons */}
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          noModule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W8VPZTM2');`,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rihca1buky");`,
          }}
        />
      </body>
    </html>
  );
};
