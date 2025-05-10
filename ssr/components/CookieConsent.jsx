import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState({
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const stored = Cookies.get("cookie_consent");
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleToggle = (category) => {
    setConsent((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const acceptSelected = () => {
    Cookies.set("cookie_consent", JSON.stringify(consent), { expires: 365 });
    setVisible(false);
    // Optional: initialize Google Analytics here based on consent.analytics
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-5 text-sm shadow-lg z-50">
      <div className="max-w-5xl mx-auto flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="text-gray-700 max-w-md">
          <p className="mb-2 font-medium">
            We use cookies to improve your experience.
          </p>
          <p>
            Select which types you're okay with. You can update your choices
            anytime in our Privacy Policy.
          </p>

          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={() => handleToggle("analytics")}
              />
              Analytics Cookies
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={() => handleToggle("marketing")}
              />
              Marketing Cookies
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={consent.preferences}
                onChange={() => handleToggle("preferences")}
              />
              Preference Cookies
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={acceptSelected}
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
