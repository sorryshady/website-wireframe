export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const getConsentCookie = (): CookieConsent | null => {
  if (typeof window === "undefined") return null;

  const consent = localStorage.getItem("cookieConsent");
  if (!consent) return null;

  try {
    return JSON.parse(consent);
  } catch {
    return null;
  }
};

export const setConsentCookie = (consent: CookieConsent): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cookieConsent", JSON.stringify(consent));
};

export const hasConsent = (type: keyof CookieConsent): boolean => {
  const consent = getConsentCookie();
  if (!consent) return false;
  return consent[type];
};

// Function to set a cookie
export const setCookie = (name: string, value: string, days: number): void => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

// Function to get a cookie value
export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
};

// Function to delete a cookie
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// Function to handle cookie consent
export const handleCookieConsent = (consent: CookieConsent): void => {
  setConsentCookie(consent);

  // Handle necessary cookies
  if (consent.necessary) {
    // Set necessary cookies here
    setCookie("session_id", "necessary", 365);
  }

  // Handle analytics cookies
  if (consent.analytics) {
    // Set analytics cookies here
    // This is where you would initialize analytics tools
  } else {
    // Remove analytics cookies if consent is withdrawn
    deleteCookie("_ga");
    deleteCookie("_gid");
    // Add other analytics cookies that need to be removed
  }

  // Handle marketing cookies
  if (consent.marketing) {
    // Set marketing cookies here
    // This is where you would initialize marketing tools
  } else {
    // Remove marketing cookies if consent is withdrawn
    deleteCookie("_fbp");
    // Add other marketing cookies that need to be removed
  }
};
