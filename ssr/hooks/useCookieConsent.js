import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const useCookieConsent = () => {
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = Cookies.get('cookie_consent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAnalytics(!!parsed.analytics);
      } catch (error) {
        console.warn('Invalid cookie_consent format:', error);
      }
    }
  }, []);

  const hasConsent = (type) => {
    if (type !== 'analytics') return false;
    return analytics;
  };

  return {
    analytics,
    hasConsent,
  };
};
