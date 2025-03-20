import { UrlObject } from "url";
import { useCallback, useEffect, useState } from "react";

export function useIsExternalLink() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return useCallback(
    (url: UrlObject | string) => {
      if (!mounted) return false;
      if (typeof window === "undefined") return false;
      if (typeof url === "object") {
        return url.host !== window.location.host;
      } else {
        return (
          (url.startsWith("http") || url.startsWith("https")) &&
          !url.includes(window.location.host)
        );
      }
    },
    [mounted],
  );
}
