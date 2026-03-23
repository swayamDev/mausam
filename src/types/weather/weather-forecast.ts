// src/types/weather/weather-forecast.ts

import type { WeatherCondition } from "./weather-conditions";

/**
 * Shape of /data/2.5/weather (current weather endpoint)
 */
export interface CurrentWeather {
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: { all: number };
  visibility: number;
  weather: [WeatherCondition];
  name: string;
}

export interface MinutelyForecast {
  dt: number;
  precipitation: number;
}

/**
 * Shape of a single item from /data/2.5/forecast (5-day / 3-hour)
 * NOTE: This is NOT the One Call API — weather data lives under `main`,
 * wind under `wind`, clouds under `clouds`, etc.
 */
export interface HourlyForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: [WeatherCondition];
  clouds: { all: number };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number;
  rain?: { "3h": number };
  snow?: { "3h": number };
  sys: { pod: string };
  dt_txt: string;
}

export interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [WeatherCondition];
}

export interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}


