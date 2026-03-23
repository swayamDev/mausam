import { useWeatherStore } from "@/store/useWeatherStore";
import { useUnitStore } from "@/store/useUnitStore";
import { useWeatherQuery } from "@/features/weather/useWeatherQuery";

export const useWeather = () => {
  const { lat, lon, setLocation } = useWeatherStore();
  const { unit } = useUnitStore();

  const query = useWeatherQuery(lat, lon, unit);

  return {
    weather: query.data,
    isLoading: query.isLoading,
    error: query.error,
    setLocation,
  };
};
