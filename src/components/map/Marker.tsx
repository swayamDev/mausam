import { createPortal } from "react-dom";
import mapboxgl from "mapbox-gl";

import { APP, WEATHER_API } from "@/config";

import { useEffect, useMemo, useRef } from "react";
import { useWeather } from "@/hooks/useWeather";

import { ThermometerSunIcon } from "lucide-react";

import type { Map, LngLatLike, Marker as MarkerType } from "mapbox-gl";
import type { WeatherUnitType } from "@/components/providers/WeatherProvider";

type Props = {
  map: Map;
  coordinates: LngLatLike;
};

export const Marker = ({ map, coordinates }: Props) => {
  const { weather } = useWeather();

  const markerRef = useRef<MarkerType | null>(null);

  const markerElement = useMemo(() => document.createElement("div"), []);
  const weatherUnit =
    (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) ||
    WEATHER_API.DEFAULTS.UNIT;

  useEffect(() => {
    markerRef.current = new mapboxgl.Marker({
      element: markerElement,
    })
      .setLngLat(coordinates)
      .addTo(map);
  }, [map, coordinates, markerElement]);

  if (!weather) return;

  return (
    <>
      {createPortal(
        <div className="bg-foreground text-background relative isolate flex w-fit items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-balance drop-shadow-lg">
          <ThermometerSunIcon size={16} fill="currentColor" />
          <span>
            {weather.current.temp.toFixed()}
            {APP.UNIT.TEMP[weatherUnit]}
          </span>
          <div className="bg-foreground absolute -bottom-1 left-1/2 -z-10 size-3 -translate-x-1/2 rotate-45 rounded-[3px]"></div>
        </div>,
        markerElement,
      )}
    </>
  );
};
