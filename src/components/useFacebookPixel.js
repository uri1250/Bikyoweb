import { useCallback } from "react";

export default function useFacebookPixel() {
  const trackEvent = useCallback((eventName, params = {}) => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, params);
      console.log(`📊 Facebook Pixel Event: ${eventName}`, params);
    } else {
      console.warn("⚠️ fbq not available yet");
    }
  }, []);

  return { trackEvent };
}
