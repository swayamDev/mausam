import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";
import { formatHourLabel } from "@/lib/utils";
import { WeatherAreaChart } from "@/components/charts/WeatherAreaChart";
import type { ChartConfig } from "@/components/ui/chart";
import type { HourlyForecast } from "@/types";

const chartConfig = {
  visibility: { label: "Visibility (km)", color: "var(--visibility)" },
} satisfies ChartConfig;

const VisibilityChart = () => {
  const { weather } = useWeather();

  const data = useMemo(
    () =>
      weather?.hourly.map((item: HourlyForecast) => ({
        hour: formatHourLabel(item.dt),
        visibility: Math.round(item.visibility / 1000), // m → km
      })),
    [weather],
  );

  return (
    <WeatherAreaChart
      data={data}
      config={chartConfig}
      yTickCount={3}
      series={[
        {
          dataKey: "visibility",
          gradientStops: [
            { offset: "0%", color: "var(--color-visibility)", opacity: 1 },
            { offset: "100%", color: "var(--color-visibility)", opacity: 0 },
          ],
          fillOpacity: 0.5,
          strokeColor: "transparent",
        },
      ]}
    />
  );
};

export default VisibilityChart;
