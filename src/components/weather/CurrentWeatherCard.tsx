import { memo } from "react";
import { APP } from "@/config";
import { useWeather } from "@/hooks/useWeather";
import { useUnitStore } from "@/store/useUnitStore";
import { formatUnixTime } from "@/lib/utils";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Navigation2Icon } from "lucide-react";

export const CurrentWeatherCard = () => {
  const { weather, isLoading, error } = useWeather();
  const { unit } = useUnitStore();

  if (isLoading) {
    return (
      <Card className="min-h-64 space-y-4 p-4" aria-busy="true" aria-label="Loading current weather">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card
        role="alert"
        className="text-muted-foreground flex min-h-64 items-center justify-center p-6 text-sm"
      >
        <p>Failed to load weather data. Please check your connection.</p>
      </Card>
    );
  }

  const current = weather.current;

  const temp = Math.round(current.main.temp);
  const feelsLike = Math.round(current.main.feels_like);
  const windSpeed = Math.round(current.wind.speed);
  const windDeg = current.wind.deg;
  const humidity = current.main.humidity;
  const pressure = current.main.pressure;
  const cloudCover = current.clouds.all;

  const time = formatUnixTime(current.dt);
  const weatherDesc = current.weather[0].description;

  const visibilityDisplay =
    unit === "metric"
      ? `${Math.round(current.visibility / 1000)} km`
      : `${Math.round(current.visibility / 1609)} mi`;

  return (
    <Card className="h-full" aria-label="Current weather conditions">
      <CardHeader>
        <CardTitle>Current Weather</CardTitle>
        <CardDescription>
          <time dateTime={new Date(current.dt * 1000).toISOString()}>
            {time}
          </time>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
            alt={`Weather condition: ${weatherDesc}`}
            className="h-16 w-16 object-contain"
            width={64}
            height={64}
            loading="lazy"
            decoding="async"
          />

          <div className="flex items-start gap-1" aria-label={`Temperature: ${temp} ${APP.UNIT.TEMP[unit]}`}>
            <span className="text-5xl font-semibold tabular-nums sm:text-6xl">
              {temp}
            </span>
            <span className="text-muted-foreground mt-2 text-xl" aria-hidden="true">
              {APP.UNIT.TEMP[unit]}
            </span>
          </div>

          <div>
            <p className="font-medium capitalize">{weatherDesc}</p>
            <p className="text-muted-foreground text-sm">
              Feels like {feelsLike}{APP.UNIT.TEMP[unit]}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        <Metric label="Wind">
          <span className="flex items-center gap-1">
            <span>{windSpeed} {APP.UNIT.WIND[unit]}</span>
            <Navigation2Icon
              aria-label={`Wind direction: ${windDeg}°`}
              size={14}
              style={{ rotate: `${windDeg}deg` }}
            />
          </span>
        </Metric>
        <Metric label="Humidity">{humidity}%</Metric>
        <Metric label="Visibility">{visibilityDisplay}</Metric>
        <Metric label="Pressure">{pressure} hPa</Metric>
        <Metric label="Cloud Cover">{cloudCover}%</Metric>
      </CardFooter>
    </Card>
  );
};

// ─── Metric sub-component — memoized to avoid re-renders ─────────────────────
interface MetricProps {
  label: string;
  children: React.ReactNode;
}

const Metric = memo(function Metric({ label, children }: MetricProps) {
  return (
    <div>
      <p className="text-muted-foreground text-xs">{label}</p>
      {/* div, not p — Wind passes a <span> with a nested icon */}
      <div className="text-sm font-medium">{children}</div>
    </div>
  );
});
