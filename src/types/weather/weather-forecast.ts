// src/types/weather/weather-forecast.ts

import type { WeatherCondition } from "@/types";

export interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [WeatherCondition];
}

export interface MinutelyForecast {
  dt: number;
  precipitation: number;
}

export interface HourlyForecast extends Omit<
  CurrentWeather,
  "sunrise" | "sunset"
> {
  pop: number;
  rain?: { "1h": number };
  snow?: { "1h": number };
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
