import { useWeatherStore } from "@/store/useWeatherStore";
import { useWeatherQuery } from "@/features/weather/useWeatherQuery";

export const useWeather = () => {
  const { lat, lon, unit } = useWeatherStore();

  const query = useWeatherQuery(lat, lon, unit);

  return {
    weather: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
