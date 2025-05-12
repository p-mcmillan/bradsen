import { useEffect } from 'react';
import { useCookieConsent } from '../hooks/useCookieConsent';

const AnalyticsSetup = () => {
  const { hasConsent } = useCookieConsent();

  useEffect(() => {
    if (!hasConsent('analytics')) return;

    const loadScripts = () => {
      // ✅ Google Tag Manager
      if (!document.getElementById('gtm-script')) {
        const gtmScript = document.createElement('script');
        gtmScript.id = 'gtm-script';
        gtmScript.async = true;
        gtmScript.src =
          'https://www.googletagmanager.com/gtm.js?id=GTM-W8VPZTM2';
        document.head.appendChild(gtmScript);
      }

      // --- Google Analytics (if you're also using GA4) ---
      // window.dataLayer = window.dataLayer || [];
      // function gtag(...args) {
      //   window.dataLayer.push(args);
      // }
      // gtag('js', new Date());
      // gtag('config', 'G-8CTXFDYJ61');

      // ✅ Microsoft Clarity
      if (!document.getElementById('clarity-script')) {
        const clarityScript = document.createElement('script');
        clarityScript.id = 'clarity-script';
        clarityScript.async = true;
        clarityScript.src = 'https://www.clarity.ms/tag/rihca1buky';
        document.head.appendChild(clarityScript);
      }
    };

    if (document.readyState === 'complete') {
      // Page already loaded
      requestIdleCallback(loadScripts);
    } else {
      window.addEventListener('load', () => {
        requestIdleCallback(loadScripts);
      });
    }

    return () => {
      window.removeEventListener('load', loadScripts);
    };
  }, [hasConsent]);

  return null;
};

export default AnalyticsSetup;
