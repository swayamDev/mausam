import { createPortal } from "react-dom";
import mapboxgl from "mapbox-gl";

import { APP } from "@/config";

import { useEffect, useMemo, useRef, memo } from "react";
import { useWeather } from "@/hooks/useWeather";
import { useUnitStore } from "@/store/useUnitStore";

import { ThermometerSunIcon } from "lucide-react";

import type { Map, LngLatLike, Marker as MarkerType } from "mapbox-gl";

interface Props {
  map: Map;
  coordinates: LngLatLike;
}

export const Marker = memo(function Marker({ map, coordinates }: Props) {
  const { weather } = useWeather();
  const { unit } = useUnitStore();

  const markerRef = useRef<MarkerType | null>(null);
  // Stable DOM element for the Mapbox marker host
  const markerElement = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    markerRef.current = new mapboxgl.Marker({ element: markerElement })
      .setLngLat(coordinates)
      .addTo(map);

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
    };
  }, [map, coordinates, markerElement]);

  if (!weather) return null;

  // /data/2.5/weather nests temp under `main`
  const temp = Math.round(weather.current.main.temp);
  const tempLabel = `${temp}${APP.UNIT.TEMP[unit]}`;

  return (
    <>
      {createPortal(
        <div
          role="tooltip"
          aria-label={`Current temperature: ${tempLabel}`}
          className="bg-foreground text-background relative isolate flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold drop-shadow-lg"
        >
          <ThermometerSunIcon size={14} fill="currentColor" aria-hidden="true" />
          <span>{tempLabel}</span>
          {/* Caret pointer */}
          <div
            aria-hidden="true"
            className="bg-foreground absolute -bottom-1.5 left-1/2 -z-10 size-3 -translate-x-1/2 rotate-45 rounded-[2px]"
          />
        </div>,
        markerElement,
      )}
    </>
  );
});

