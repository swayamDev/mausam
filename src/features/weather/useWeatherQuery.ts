import { useQuery } from "@tanstack/react-query";
import { openWeatherApi } from "@/api";

export const useWeatherQuery = (lat: number, lon: number, unit: string) => {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  return useQuery({
    queryKey: ["weather", lat, lon, unit],
    queryFn: async () => {
      try {
        const [currentRes, forecastRes, reverseGeoRes] = await Promise.all([
          openWeatherApi.get("/data/2.5/weather", {
            params: { lat, lon, units: unit, appid: API_KEY },
          }),
          openWeatherApi.get("/data/2.5/forecast", {
            params: { lat, lon, units: unit, appid: API_KEY },
          }),
          openWeatherApi.get("/geo/1.0/reverse", {
            params: { lat, lon, limit: 1, appid: API_KEY },
          }),
        ]);

        return {
          current: currentRes.data,
          hourly: forecastRes.data.list, // 3-hour interval data
          location: reverseGeoRes.data[0],
        };
      } catch (err) {
        console.error("Weather API Error:", err);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
