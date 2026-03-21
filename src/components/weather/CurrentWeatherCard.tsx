import { APP, WEATHER_API } from "@/config";

import { useWeather } from "@/hooks/useWeather";

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

import type { WeatherUnitType } from "@/components/providers/WeatherProvider";

export const CurrentWeatherCard = () => {
  const { weather } = useWeather();

  if (!weather) return <Skeleton className="min-h-75 rounded-xl" />;

  const currentWeather = {
    dt: new Date(weather.current.dt * 1000).toLocaleTimeString("en-US", {
      timeStyle: "short",
    }),
    iconCode: weather.current.weather[0].icon,
    temp: weather.current.temp.toFixed(),
    description: weather.current.weather[0].description,
    feelsLike: weather.current.feels_like.toFixed(),
    windSpeed: weather.current.wind_speed.toFixed(),
    windDeg: weather.current.wind_deg,
    humidity: weather.current.humidity,
    visibility: (weather.current.visibility / 1000).toFixed(),
    pressure: weather.current.pressure,
    dewPoint: weather.current.dew_point.toFixed(),
  };

  const weatherUnit =
    (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) ||
    WEATHER_API.DEFAULTS.UNIT;

  return (
    <Card className="@container min-h-75">
      <CardHeader>
        <CardTitle>Current weather</CardTitle>
        <CardDescription>{currentWeather.dt}</CardDescription>
      </CardHeader>

      <CardContent className="grow">
        <div className="flex flex-wrap items-center gap-x-6">
          <figure>
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.iconCode}@4x.png`}
              alt={currentWeather.description}
              width={70}
              height={70}
              className="object-contain"
            />
          </figure>

          <p className="flex items-start text-5xl font-medium sm:text-7xl">
            {currentWeather.temp}
            <span className="text-3xl">{APP.UNIT.TEMP[weatherUnit]}</span>
          </p>

          <div>
            <p className="font-medium capitalize sm:text-lg">
              {currentWeather.description}
            </p>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Feels like</span>
              <span>{currentWeather.feelsLike}°</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-wrap gap-x-8 gap-y-2 @lg:justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Wind</p>
          <div className="flex items-center gap-1">
            <p>
              {currentWeather.windSpeed} {APP.UNIT.WIND[weatherUnit]}
            </p>
            <Navigation2Icon
              size={14}
              fill="currentColor"
              style={{
                rotate: `${currentWeather.windDeg}deg`,
              }}
            />
          </div>
        </div>

        <div>
          <p className="text-muted-foreground text-sm">Humidity</p>
          <div className="flex items-center gap-1">
            <p>{currentWeather.humidity}%</p>
          </div>
        </div>

        <div>
          <p className="text-muted-foreground text-sm">Visibility</p>
          <div className="flex items-center gap-1">
            <p>{currentWeather.visibility} km</p>
          </div>
        </div>

        <div>
          <p className="text-muted-foreground text-sm">Pressure</p>
          <div className="flex items-center gap-1">
            <p>{currentWeather.pressure} hPa</p>
          </div>
        </div>

        <div>
          <p className="text-muted-foreground text-sm">Dew point</p>
          <div className="flex items-center gap-1">
            <p>{currentWeather.dewPoint}°</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
