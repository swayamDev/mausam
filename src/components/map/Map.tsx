import mapboxgl from "mapbox-gl";
import { MAPBOX } from "@/config";

import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { useWeather } from "@/hooks/useWeather";

import { Marker } from "@/components/map/Marker";
import { Skeleton } from "@/components/ui/skeleton";

import type { LngLatLike, Map as MapType } from "mapbox-gl";

export const Map = () => {
  const { theme } = useTheme();
  const { weather } = useWeather();

  const mapRef = useRef<MapType | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const center = useMemo<LngLatLike>(
    () =>
      weather
        ? [weather.location.lon, weather.location.lat]
        : MAPBOX.DEFAULTS.CENTER,
    [weather],
  );

  // ✅ Initialize map ONCE
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      center,
      zoom: MAPBOX.DEFAULTS.ZOOM,
      style:
        theme === "light"
          ? "mapbox://styles/mapbox/light-v11"
          : "mapbox://styles/mapbox/dark-v11",
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // ✅ Update center WITHOUT re-creating map
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({ center, essential: true });
  }, [center]);

  // ✅ Update theme WITHOUT re-creating map
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setStyle(
      theme === "light"
        ? "mapbox://styles/mapbox/light-v11"
        : "mapbox://styles/mapbox/dark-v11",
    );
  }, [theme]);

  return (
    <div className="bg-card relative h-75 overflow-hidden rounded-xl border shadow-sm sm:h-100 lg:h-full">
      {/* Loading Skeleton */}
      {!mapRef.current && <Skeleton className="absolute inset-0 z-10" />}

      {/* Map Container */}
      <div ref={containerRef} className="h-full w-full" />

      {/* Marker */}
      {mapRef.current && <Marker map={mapRef.current} coordinates={center} />}
    </div>
  );
};
