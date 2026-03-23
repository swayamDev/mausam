import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";
import { formatHourLabel } from "@/lib/utils";
import { WeatherAreaChart } from "@/components/charts/WeatherAreaChart";
import type { ChartConfig } from "@/components/ui/chart";
import type { HourlyForecast } from "@/types";

const chartConfig = {
  temp: { label: "Temperature", color: "var(--chart-1)" },
  feels: { label: "Feels like", color: "var(--muted-foreground)" },
} satisfies ChartConfig;

const OverviewChart = () => {
  const { weather } = useWeather();

  const data = useMemo(
    () =>
      weather?.hourly.map((item: HourlyForecast) => ({
        hour: formatHourLabel(item.dt),
        temp: Math.round(item.main.temp),
        feels: Math.round(item.main.feels_like),
      })),
    [weather],
  );

  return (
    <WeatherAreaChart
      data={data}
      config={chartConfig}
      yTickFormatter={(v) => `${v}°`}
      series={[
        {
          dataKey: "temp",
          gradientStops: [
            { offset: "0%", color: "var(--temp-high)", opacity: 1 },
            { offset: "50%", color: "var(--temp-mid)", opacity: 0.5 },
            { offset: "100%", color: "var(--temp-low)", opacity: 0 },
          ],
          fillOpacity: 0.5,
          strokeColor: "transparent",
        },
        {
          dataKey: "feels",
          strokeColor: "var(--color-feels)",
          strokeWidth: 2,
          fillOpacity: 0,
          noActiveDot: true,
        },
      ]}
    />
  );
};

export default OverviewChart;
