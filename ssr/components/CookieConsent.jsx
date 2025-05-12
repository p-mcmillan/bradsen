import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    const stored = Cookies.get('cookie_consent');
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set(
      'cookie_consent',
      JSON.stringify({ analytics: analyticsConsent }),
      {
        expires: 365,
      }
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-5 text-sm shadow-lg z-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="text-gray-700 max-w-md">
          <p className="mb-2 font-medium">
            We use cookies to improve your experience.
          </p>
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={analyticsConsent}
              onChange={() => setAnalyticsConsent(!analyticsConsent)}
            />
            Allow Analytics Cookies
          </label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAccept}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
