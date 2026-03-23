import { useEffect } from "react";
import { useWeather } from "@/hooks/useWeather";

/**
 * Keeps the browser tab title in sync with the currently viewed location.
 * Falls back to the default title while loading.
 *
 * e.g. "Mumbai, India — Mausam"
 */
export const usePageTitle = () => {
  const { weather } = useWeather();

  useEffect(() => {
    const base = "Mausam — Real-Time Weather";

    if (!weather) {
      document.title = base;
      return;
    }

    const { name, state, country } = weather.location;
    const location = [name, state, country].filter(Boolean).join(", ");
    document.title = `${location} — Mausam`;
  }, [weather]);
};
