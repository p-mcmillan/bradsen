import { useEffect } from "react";
import { useCookieConsent } from "../hooks/useCookieConsent";

const AnalyticsSetup = () => {
  const { hasConsent } = useCookieConsent();

  useEffect(() => {
    if (hasConsent("analytics")) {
      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-8CTXFDYJ61");
    }
  }, [hasConsent]);

  return null;
};

export default AnalyticsSetup;
