"use client";

import { useState, useEffect } from "react";
import { getConsentCookie, handleCookieConsent } from "@/lib/cookie-utils";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Always true as these are essential
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = getConsentCookie();
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      setConsent(savedConsent);
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setConsent(newConsent);
    handleCookieConsent(newConsent);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const newConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setConsent(newConsent);
    handleCookieConsent(newConsent);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    handleCookieConsent(consent);
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 text-white p-6 shadow-lg font-mont border-t border-white/20">
      <div className="max-w-7xl mx-auto">
        {!showPreferences ? (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2 flex-1">
                <p className="text-sm md:text-base">
                  We value your privacy. While we currently don&apos;t use
                  cookies, we&apos;re asking for your consent for future website
                  features that may use cookies to enhance your browsing
                  experience, serve personalized content, and analyze traffic.
                </p>
                <p className="text-xs text-amber-400">
                  Note: At present, no cookies are being set. This consent will
                  apply to future features that require cookies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors rounded-md text-sm whitespace-nowrap"
                >
                  Cookie Settings
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors rounded-md text-sm whitespace-nowrap"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors rounded-md text-sm whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>
              {" | "}
              <a href="/terms" className="underline hover:text-white">
                Terms and Conditions
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Cookie Preferences</h3>
              <p className="text-sm text-amber-400">
                Note: These preferences will be applied when cookies are
                implemented in future updates.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                <div>
                  <p className="font-medium">Necessary Cookies</p>
                  <p className="text-sm text-gray-400">
                    Will be required for core website functionality when
                    implemented.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.necessary}
                  disabled
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                <div>
                  <p className="font-medium">Analytics Cookies</p>
                  <p className="text-sm text-gray-400">
                    Will help us understand how visitors interact with our
                    website (not currently in use).
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) =>
                    setConsent({ ...consent, analytics: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                <div>
                  <p className="font-medium">Marketing Cookies</p>
                  <p className="text-sm text-gray-400">
                    Will be used to deliver personalized advertisements (not
                    currently in use).
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) =>
                    setConsent({ ...consent, marketing: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 border border-white/20 hover:bg-white/10 transition-colors rounded-md text-sm"
              >
                Back
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors rounded-md text-sm"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
