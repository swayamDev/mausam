// src/types/weather/weather-query.ts
// Represents the shape returned by useWeatherQuery,
// which combines /data/2.5/weather + /data/2.5/forecast + /geo/1.0/reverse

import type { CurrentWeather, HourlyForecast } from "./weather-forecast";
import type { Geocoding } from "../common/geo";

export interface WeatherQueryResult {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  location: Geocoding;
}
