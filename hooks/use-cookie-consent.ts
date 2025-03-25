import { useState, useEffect } from "react";
import { getConsentCookie, type CookieConsent } from "@/lib/cookie-utils";

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    // Get initial consent
    setConsent(getConsentCookie());

    // Listen for changes in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cookieConsent") {
        setConsent(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    consent,
    hasAnalyticsConsent: consent?.analytics ?? false,
    hasMarketingConsent: consent?.marketing ?? false,
    hasNecessaryConsent: consent?.necessary ?? false,
  };
};
