import { useQuery } from "@tanstack/react-query";
import { openWeatherApi } from "@/api";
import type { Unit } from "@/store/useUnitStore";
import type { WeatherQueryResult } from "@/types";

export const useWeatherQuery = (lat: number, lon: number, unit: Unit) => {
  return useQuery<WeatherQueryResult>({
    queryKey: ["weather", lat, lon, unit],
    queryFn: async () => {
      const [currentRes, forecastRes, reverseGeoRes] = await Promise.all([
        openWeatherApi.get("/data/2.5/weather", {
          params: { lat, lon, units: unit },
        }),
        openWeatherApi.get("/data/2.5/forecast", {
          params: { lat, lon, units: unit },
        }),
        openWeatherApi.get("/geo/1.0/reverse", {
          params: { lat, lon, limit: 1 },
        }),
      ]);

      return {
        current: currentRes.data,
        hourly: forecastRes.data.list,
        location: reverseGeoRes.data[0],
      } satisfies WeatherQueryResult;
    },
    // Match global QueryClient staleTime — explicit here for clarity
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

