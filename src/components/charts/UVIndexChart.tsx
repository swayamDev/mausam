import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";
import { formatHourLabel } from "@/lib/utils";
import { WeatherBarChart } from "@/components/charts/WeatherBarChart";
import type { ChartConfig } from "@/components/ui/chart";
import type { HourlyForecast } from "@/types";

// NOTE: uvi is not available in the free /data/2.5/forecast endpoint.
// UV data requires One Call API 3.0 (paid). Chart shows 0 until upgraded.
const chartConfig = {
  uv: { label: "UV Index", color: "var(--uv)" },
} satisfies ChartConfig;

const UVIndexChart = () => {
  const { weather } = useWeather();

  const data = useMemo(
    () =>
      weather?.hourly.map((item: HourlyForecast) => ({
        hour: formatHourLabel(item.dt),
        uv: (item as HourlyForecast & { uvi?: number }).uvi ?? 0,
      })),
    [weather],
  );

  return (
    <WeatherBarChart
      data={data}
      config={chartConfig}
      yTickCount={3}
      series={[{ dataKey: "uv", color: "var(--color-uv)" }]}
    />
  );
};

export default UVIndexChart;
