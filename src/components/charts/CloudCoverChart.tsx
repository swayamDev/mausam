import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";
import { formatHourLabel } from "@/lib/utils";
import { WeatherBarChart } from "@/components/charts/WeatherBarChart";
import type { ChartConfig } from "@/components/ui/chart";
import type { HourlyForecast } from "@/types";

const chartConfig = {
  clouds: { label: "Cloud cover (%)", color: "var(--clouds)" },
} satisfies ChartConfig;

const CloudCoverChart = () => {
  const { weather } = useWeather();

  const data = useMemo(
    () =>
      weather?.hourly.map((item: HourlyForecast) => ({
        hour: formatHourLabel(item.dt),
        clouds: item.clouds.all,
      })),
    [weather],
  );

  return (
    <WeatherBarChart
      data={data}
      config={chartConfig}
      yTickFormatter={(v) => `${v}%`}
      yTickCount={3}
      series={[{ dataKey: "clouds", color: "var(--color-clouds)" }]}
    />
  );
};

export default CloudCoverChart;
