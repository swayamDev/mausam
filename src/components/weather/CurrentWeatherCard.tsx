import { APP } from "@/config";
import { useWeather } from "@/hooks/useWeather";
import { useUnitStore } from "@/store/useUnitStore";

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

  // 🔥 Loading State (Better UX)
  if (isLoading) {
    return (
      <Card className="min-h-65 space-y-4 p-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-20 w-full" />
      </Card>
    );
  }

  // ❌ Error State
  if (error || !weather) {
    return (
      <Card className="text-muted-foreground flex min-h-65 items-center justify-center text-sm">
        Failed to load weather data
      </Card>
    );
  }

  const current = weather.current;

  const data = {
    time: new Date(current.dt * 1000).toLocaleTimeString("en-US", {
      timeStyle: "short",
    }),
    temp: Math.round(current.temp),
    feelsLike: Math.round(current.feels_like),
    windSpeed: Math.round(current.wind_speed),
    visibility: Math.round(current.visibility / 1000),
    dewPoint: Math.round(current.dew_point),
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Current Weather</CardTitle>
        <CardDescription>{data.time}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Icon */}
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
            alt={`Weather: ${current.weather[0].description}`}
            className="h-16 w-16 object-contain"
          />

          {/* Temperature */}
          <div className="flex items-start gap-1">
            <span className="text-4xl font-semibold sm:text-6xl">
              {data.temp}
            </span>
            <span className="text-muted-foreground text-xl">
              {APP.UNIT.TEMP[unit]}
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="font-medium capitalize">
              {current.weather[0].description}
            </p>
            <p className="text-muted-foreground text-sm">
              Feels like {data.feelsLike}°
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <Metric label="Wind">
          <div className="flex items-center gap-1">
            {data.windSpeed} {APP.UNIT.WIND[unit]}
            <Navigation2Icon
              size={14}
              style={{ rotate: `${current.wind_deg}deg` }}
            />
          </div>
        </Metric>

        <Metric label="Humidity">{current.humidity}%</Metric>
        <Metric label="Visibility">{data.visibility} km</Metric>
        <Metric label="Pressure">{current.pressure} hPa</Metric>
        <Metric label="Dew Point">{data.dewPoint}°</Metric>
      </CardFooter>
    </Card>
  );
};

// 🔥 Reusable Metric Component
const Metric = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <p className="text-muted-foreground text-xs">{label}</p>
    <p className="text-sm font-medium">{children}</p>
  </div>
);
