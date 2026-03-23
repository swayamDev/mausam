import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WEATHER_API } from "@/config";

type WeatherState = {
  lat: number;
  lon: number;
  setLocation: (lat: number, lon: number) => void;
};

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      lat: WEATHER_API.DEFAULTS.LAT,
      lon: WEATHER_API.DEFAULTS.LON,

      setLocation: (lat, lon) => set({ lat, lon }),
    }),
    {
      name: "mausam-location",
    },
  ),
);
