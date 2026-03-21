import { APP, WEATHER_API } from "@/config";

import { useEffect, useState } from "react";
import { useWeather } from "@/hooks/useWeather";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

import type { WeatherUnitType } from "@/components/providers/WeatherProvider";

export const UnitDropdown = () => {
  const { setWeather } = useWeather();

  const [unit, setUnit] = useState<WeatherUnitType>(
    (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) ||
      WEATHER_API.DEFAULTS.UNIT,
  );

  useEffect(() => {
    setWeather({ unit });
    localStorage.setItem(APP.STORE_KEY.UNIT, unit);
  }, [unit]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          °{unit === "metric" ? "C" : "F"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-50">
        <DropdownMenuLabel className="text-muted-foreground">
          Weather settings
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={unit}
          onValueChange={(value) => setUnit(value as WeatherUnitType)}
        >
          <DropdownMenuRadioItem value="metric">
            Metric (°C)
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="imperial">
            Imperial (°F)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
