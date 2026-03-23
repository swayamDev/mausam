import { useState } from "react";
import { getUserLocation } from "@/lib/utils";
import { useWeather } from "@/hooks/useWeather";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LocateFixedIcon, LocateOffIcon } from "lucide-react";

export const PageHeader = () => {
  const { weather, setLocation } = useWeather();
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  if (!weather) {
    return (
      <div className="mb-5 flex items-center gap-3" aria-busy="true" aria-label="Loading location">
        <Skeleton className="h-7 w-48 sm:h-8 sm:w-64" />
        <Skeleton className="size-8 shrink-0 rounded-md" />
      </div>
    );
  }

  const { name, state, country } = weather.location;
  const locationLabel = [name, state, country].filter(Boolean).join(", ");

  const handleLocate = () => {
    setLocating(true);
    setGeoError(null);
    getUserLocation()
      .then(({ lat, lon }) => setLocation(lat, lon))
      .catch((err: string) => setGeoError(err))
      .finally(() => setLocating(false));
  };

  return (
    <div className="mb-5">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {locationLabel}
        </h1>

        <Button
          variant="outline"
          size="icon-sm"
          aria-label={locating ? "Detecting your location…" : "Use my current location"}
          title="Use my current location"
          disabled={locating}
          onClick={handleLocate}
        >
          {geoError
            ? <LocateOffIcon className="size-4 text-destructive" />
            : <LocateFixedIcon className={`size-4 ${locating ? "animate-pulse" : ""}`} />
          }
        </Button>
      </div>

      {/* Geolocation error — shown inline, dismisses on next click */}
      {geoError && (
        <p
          role="alert"
          className="text-destructive mt-1.5 text-xs"
        >
          {geoError}
        </p>
      )}
    </div>
  );
};
