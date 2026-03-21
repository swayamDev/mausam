import mapboxgl from "mapbox-gl";

import { MAPBOX } from "@/config";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { useWeather } from "@/hooks/useWeather";

import { Marker } from "@/components/map/Marker";

import type { LngLatLike, Map as MapType } from "mapbox-gl";

export const Map = () => {
  const { theme } = useTheme();
  const { weather } = useWeather();

  const center = useMemo<LngLatLike>(
    () =>
      weather
        ? [weather.location.lon, weather.location.lat]
        : MAPBOX.DEFAULTS.CENTER,
    [weather],
  );

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [map, setMap] = useState<MapType | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !center) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    setMap(
      new mapboxgl.Map({
        container: mapContainerRef.current,
        center,
        zoom: MAPBOX.DEFAULTS.ZOOM,
        config: {
          basemap: {
            lightPreset: theme === "light" ? "day" : "night",
          },
        },
      }),
    );

    return () => map?.remove();
  }, [theme, center]);

  return (
    <div
      ref={mapContainerRef}
      className="bg-card text-card-foreground h-75 overflow-hidden rounded-xl border shadow-sm"
    >
      {map && <Marker map={map} coordinates={center} />}
    </div>
  );
};
