import { getUserLocation } from "@/lib/utils";
import { APP } from "@/config";

import { useWeather } from "@/hooks/useWeather";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { LocateFixedIcon } from "lucide-react";

export const PageHeader = () => {
  const { weather, setWeather } = useWeather();

  if (!weather) return <Skeleton className="mt-2 mb-6 h-4 w-40" />;

  return (
    <div className="mb-4 flex items-center gap-4">
      <h2>
        {weather.location.name},{" "}
        {weather.location.state ? weather.location.state + ", " : ""}
        {weather.location.country}
      </h2>

      <Button
        variant="outline"
        size="icon-sm"
        onClick={async () => {
          getUserLocation()
            .then(({ lat, lon }) => {
              setWeather({ lat, lon });

              localStorage.setItem(APP.STORE_KEY.LAT, lat.toString());
              localStorage.setItem(APP.STORE_KEY.LON, lon.toString());
            })
            .catch((err) => {
              alert(err);
            });
        }}
      >
        <LocateFixedIcon />
      </Button>
    </div>
  );
};
