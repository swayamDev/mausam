import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";
import { formatHourLabel } from "@/lib/utils";
import { WeatherAreaChart } from "@/components/charts/WeatherAreaChart";
import type { ChartConfig } from "@/components/ui/chart";
import type { HourlyForecast } from "@/types";

// NOTE: The free /data/2.5/forecast endpoint does not include dew_point.
// Only relative humidity is shown — which is the accurate available metric.
const chartConfig = {
  humidity: { label: "Humidity (%)", color: "var(--humidity)" },
} satisfies ChartConfig;

const HumidityChart = () => {
  const { weather } = useWeather();

  const data = useMemo(
    () =>
      weather?.hourly.map((item: HourlyForecast) => ({
        hour: formatHourLabel(item.dt),
        humidity: item.main.humidity,
      })),
    [weather],
  );

  return (
    <WeatherAreaChart
      data={data}
      config={chartConfig}
      yTickFormatter={(v) => `${v}%`}
      yTickCount={4}
      series={[
        {
          dataKey: "humidity",
          gradientStops: [
            { offset: "0%", color: "var(--color-humidity)", opacity: 1 },
            { offset: "100%", color: "var(--color-humidity)", opacity: 0 },
          ],
          fillOpacity: 0.5,
          strokeColor: "transparent",
        },
      ]}
    />
  );
};

export default HumidityChart;
