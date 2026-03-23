import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";
import { formatHourLabel } from "@/lib/utils";
import { WeatherBarChart } from "@/components/charts/WeatherBarChart";
import type { ChartConfig } from "@/components/ui/chart";
import type { HourlyForecast } from "@/types";

const chartConfig = {
  rain: { label: "Rain (mm)", color: "var(--rain)" },
  snow: { label: "Snow (mm)", color: "var(--snow)" },
} satisfies ChartConfig;

const PrecipitationChart = () => {
  const { weather } = useWeather();

  const data = useMemo(
    () =>
      weather?.hourly.map((item: HourlyForecast) => ({
        hour: formatHourLabel(item.dt),
        rain: item.rain?.["3h"] ?? 0,
        snow: item.snow?.["3h"] ?? 0,
      })),
    [weather],
  );

  return (
    <WeatherBarChart
      data={data}
      config={chartConfig}
      yTickCount={3}
      series={[
        { dataKey: "rain", color: "var(--color-rain)" },
        { dataKey: "snow", color: "var(--color-snow)" },
      ]}
    />
  );
};

export default PrecipitationChart;
