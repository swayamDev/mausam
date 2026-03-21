import type { LngLatLike } from "mapbox-gl";
import { WEATHER_API } from "./weather";

export const MAPBOX = {
  DEFAULTS: {
    CENTER: [WEATHER_API.DEFAULTS.LON, WEATHER_API.DEFAULTS.LAT] as LngLatLike,
    ZOOM: 12.5,
  },
} as const;
