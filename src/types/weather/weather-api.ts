// src/types/weather/weather-api.ts

import type {
  CurrentWeather,
  MinutelyForecast,
  HourlyForecast,
  DailyForecast,
  Alert,
} from "./weather-forecast";

export interface OneCallWeatherRes {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  minutely: MinutelyForecast[];
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts?: Alert[];
}
