import mapboxgl from "mapbox-gl";
import { MAPBOX } from "@/config";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { useWeather } from "@/hooks/useWeather";

import { Marker } from "@/components/map/Marker";
import { Skeleton } from "@/components/ui/skeleton";

import type { LngLatLike, Map as MapType } from "mapbox-gl";

const MAP_STYLES = {
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
} as const;

type ResolvedTheme = keyof typeof MAP_STYLES;

function resolveTheme(theme: string): ResolvedTheme {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return (theme as ResolvedTheme) ?? "dark";
}

export const Map = () => {
  const { theme } = useTheme();
  const { weather } = useWeather();
  const [mapReady, setMapReady] = useState(false);

  const mapRef = useRef<MapType | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Stable resolved theme — only recomputes when `theme` token changes
  const resolvedTheme = useMemo(() => resolveTheme(theme), [theme]);

  const center = useMemo<LngLatLike>(
    () =>
      weather
        ? [weather.location.lon, weather.location.lat]
        : MAPBOX.DEFAULTS.CENTER,
    [weather],
  );

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      center,
      zoom: MAPBOX.DEFAULTS.ZOOM,
      style: MAP_STYLES[resolvedTheme],
      attributionControl: false,
    });

    mapRef.current.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-left",
    );

    mapRef.current.on("load", () => setMapReady(true));

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      setMapReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fly to new location without rebuilding the map
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    mapRef.current.flyTo({ center, essential: true });
  }, [center, mapReady]);

  // Swap style on theme change without rebuilding the map
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    mapRef.current.setStyle(MAP_STYLES[resolvedTheme]);
  }, [resolvedTheme, mapReady]);

  return (
    <div
      role="region"
      aria-label="Location map"
      className="bg-card relative h-64 overflow-hidden rounded-xl border shadow-sm sm:h-80 lg:h-full lg:min-h-72"
    >
      {/* Loading skeleton */}
      {!mapReady && (
        <Skeleton className="absolute inset-0 z-10" aria-hidden="true" />
      )}

      {/* Mapbox container */}
      <div
        ref={containerRef}
        className="h-full w-full"
        aria-hidden="true"
      />

      {/* Temperature marker */}
      {mapReady && mapRef.current && (
        <Marker map={mapRef.current} coordinates={center} />
      )}
    </div>
  );
};
