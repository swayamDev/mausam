import { memo } from "react";

import {
  Area,
  AreaChart,
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

export interface AreaSeriesConfig {
  /** Must match a key in chartData objects */
  dataKey: string;
  /** Use gradient fill from these stops — if omitted, no fill */
  gradientStops?: Array<{ offset: string; color: string; opacity: number }>;
  /** Stroke color CSS var or literal */
  strokeColor?: string;
  strokeWidth?: number;
  /** Opacity for the area fill (0 = line only) */
  fillOpacity?: number;
  /** Disable active dot on hover */
  noActiveDot?: boolean;
}

interface WeatherAreaChartProps {
  data: Record<string, unknown>[] | undefined;
  config: ChartConfig;
  series: AreaSeriesConfig[];
  yDataKey?: string;
  yTickFormatter?: (value: number) => string;
  yTickCount?: number;
  xTickCount?: number;
  className?: string;
}

const CHART_HEIGHT = "h-72 sm:h-80 md:h-90";

export const WeatherAreaChart = memo(function WeatherAreaChart({
  data,
  config,
  series,
  yDataKey,
  yTickFormatter,
  yTickCount = 5,
  xTickCount = 12,
  className,
}: WeatherAreaChartProps) {
  if (!data) return <Skeleton className={`${CHART_HEIGHT} w-full`} />;

  return (
    <ChartContainer
      config={config}
      className={`${CHART_HEIGHT} w-full ${className ?? ""}`}
    >
      <AreaChart accessibilityLayer data={data}>
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

        {/* Gradient definitions */}
        <defs>
          {series.map((s) =>
            s.gradientStops ? (
              <linearGradient
                key={`grad-${s.dataKey}`}
                id={`fill-${s.dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                {s.gradientStops.map((stop, i) => (
                  <stop
                    key={i}
                    offset={stop.offset}
                    stopColor={stop.color}
                    stopOpacity={stop.opacity}
                  />
                ))}
              </linearGradient>
            ) : null,
          )}
        </defs>

        {/* Area series */}
        {series.map((s) => (
          <Area
            key={s.dataKey}
            dataKey={s.dataKey}
            type="natural"
            fill={s.gradientStops ? `url(#fill-${s.dataKey})` : s.strokeColor ?? "transparent"}
            fillOpacity={s.fillOpacity ?? (s.gradientStops ? 0.5 : 0)}
            stroke={s.strokeColor ?? "transparent"}
            strokeWidth={s.strokeWidth ?? 2}
            activeDot={s.noActiveDot ? false : undefined}
          />
        ))}

        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
});
