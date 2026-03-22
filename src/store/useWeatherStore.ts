import { create } from "zustand";

type WeatherState = {
  lat: number;
  lon: number;
  unit: "metric" | "imperial";
  setLocation: (lat: number, lon: number) => void;
  setUnit: (unit: "metric" | "imperial") => void;
};

export const useWeatherStore = create<WeatherState>((set) => ({
  lat: 20.2961,
  lon: 85.8245,
  unit: "metric",

  setLocation: (lat, lon) => set({ lat, lon }),
  setUnit: (unit) => set({ unit }),
}));
