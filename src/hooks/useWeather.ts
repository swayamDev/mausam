import { WeatherProviderContext } from "@/components/providers/WeatherProvider";
import { useContext } from "react";

export const useWeather = () => {
  const context = useContext(WeatherProviderContext);

  if (!context) {
    throw new Error("useWeather must be used within WeatherProvider");
  }

  return context;
};
