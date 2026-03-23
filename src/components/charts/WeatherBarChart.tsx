import { memo } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

import type { ChartConfig } from "@/components/ui/chart";

export interface BarSeriesConfig {
  dataKey: string;
  color: string;
}

interface WeatherBarChartProps {
  data: Record<string, unknown>[] | undefined;
  config: ChartConfig;
  series: BarSeriesConfig[];
  yDataKey?: string;
  yTickFormatter?: (value: number) => string;
  yTickCount?: number;
  xTickCount?: number;
  className?: string;
}

const CHART_HEIGHT = "h-72 sm:h-80 md:h-90";

export const WeatherBarChart = memo(function WeatherBarChart({
  data,
  config,
  series,
  yDataKey,
  yTickFormatter,
  yTickCount = 5,
  xTickCount = 12,
  className,
}: WeatherBarChartProps) {
  if (!data) return <Skeleton className={`${CHART_HEIGHT} w-full`} />;

  return (
    <ChartContainer
      config={config}
      className={`${CHART_HEIGHT} w-full ${className ?? ""}`}
    >
      <BarChart
        accessibilityLayer
        data={data}
        barSize={20}
        barCategoryGap={0}
      >
        <CartesianGrid strokeDasharray={4} />

        <XAxis
          dataKey="hour"
          tickLine={false}
          axisLine={false}
          tickCount={xTickCount}
          tickMargin={16}
          className="text-xs"
        />

        <YAxis
          dataKey={yDataKey ?? series[0]?.dataKey}
          tickLine={false}
          axisLine={false}
          tickCount={yTickCount}
          tickMargin={16}
          tickFormatter={yTickFormatter}
          className="text-xs"
          width={40}
        />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

        {series.map((s) => (
          <Bar
            key={s.dataKey}
            dataKey={s.dataKey}
            fill={s.color}
            stroke={s.color}
            radius={[6, 6, 0, 0]}
          />
        ))}

        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  );
});
