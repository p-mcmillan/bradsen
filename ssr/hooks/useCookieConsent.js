import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useCookieConsent = () => {
  const [consent, setConsent] = useState({
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const stored = Cookies.get("cookie_consent");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConsent({
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
          preferences: !!parsed.preferences,
        });
      } catch (error) {
        console.warn("Invalid cookie_consent format");
      }
    }
  }, []);

  const hasConsent = (type) => {
    return !!consent[type];
  };

  return {
    consent,
    hasConsent,
  };
};
