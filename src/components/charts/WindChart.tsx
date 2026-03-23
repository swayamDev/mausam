import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";
import { formatHourLabel } from "@/lib/utils";
import { WeatherAreaChart } from "@/components/charts/WeatherAreaChart";
import type { ChartConfig } from "@/components/ui/chart";
import type { HourlyForecast } from "@/types";

const chartConfig = {
  wind_speed: { label: "Wind speed", color: "var(--wind-speed)" },
  wind_gust: { label: "Wind gust", color: "var(--wind-gust)" },
} satisfies ChartConfig;

const WindChart = () => {
  const { weather } = useWeather();

  const data = useMemo(
    () =>
      weather?.hourly.map((item: HourlyForecast) => ({
        hour: formatHourLabel(item.dt),
        wind_speed: item.wind.speed,
        wind_gust: item.wind.gust ?? item.wind.speed,
      })),
    [weather],
  );

  return (
    <WeatherAreaChart
      data={data}
      config={chartConfig}
      series={[
        {
          dataKey: "wind_speed",
          gradientStops: [
            { offset: "0%", color: "var(--color-wind_speed)", opacity: 1 },
            { offset: "100%", color: "var(--color-wind_speed)", opacity: 0 },
          ],
          fillOpacity: 0.5,
          strokeColor: "transparent",
        },
        {
          dataKey: "wind_gust",
          strokeColor: "var(--color-wind_gust)",
          strokeWidth: 2,
          fillOpacity: 0,
          noActiveDot: true,
        },
      ]}
    />
  );
};

export default WindChart;
