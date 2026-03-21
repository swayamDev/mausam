import { openWeatherApi } from "@/api";
import { APP, WEATHER_API } from "@/config";

import { useEffect, useCallback, useState } from "react";
import { useWeather } from "@/hooks/useWeather";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
} from "@/components/ui/item";

import { MapPinnedIcon, SearchIcon } from "lucide-react";

import type { Geocoding } from "@/types";

export const SearchDialog = () => {
  const { setWeather } = useWeather();

  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Geocoding[]>([]);
  const [searchDialogOpen, setSearchDialogOpen] = useState<boolean>(false);

  const geocoding = useCallback(async (search: string) => {
    if (!search) return;

    const response = await openWeatherApi.get("/geo/1.0/direct", {
      params: {
        q: search,
        limit: WEATHER_API.DEFAULTS.SEARCH_RESULT_LIMIT,
      },
    });

    return response.data as Geocoding[];
  }, []);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchDialogOpen(true);
      }
    };

    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);

  useEffect(() => {
    if (!search) return;

    (async () => {
      const results = await geocoding(search);
      if (results) setResults(results);
    })();
  }, [search, geocoding]);

  return (
    <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="lg:bg-secondary dark:lg:bg-secondary/50 me-auto max-lg:size-9"
          onClick={() => setSearchDialogOpen((prev) => !prev)}
        >
          <SearchIcon className="lg:text-muted-foreground" />

          <div className="flex w-62.5 justify-between max-lg:hidden">
            Search weather...
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-card gap-0 p-0" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>Search weather</DialogTitle>
          <DialogDescription>
            Search weather by city or country
          </DialogDescription>
        </DialogHeader>

        <InputGroup className="border-border! rounded-b-none border-x-0! border-t-0! border-b bg-transparent! ring-0!">
          <InputGroupInput
            placeholder="Search weather..."
            value={search}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <ItemGroup className="min-h-80 p-2">
          {!results.length && (
            <p className="py-4 text-center text-sm">No results found!</p>
          )}

          {results.map(({ name, lat, lon, state, country }) => (
            <Item key={name + lat + lon} size="sm" className="relative p-2">
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>
                  {state ? state + ", " : ""}
                  {country}
                </ItemDescription>
              </ItemContent>

              <ItemActions>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="after:absolute after:inset-0"
                    onClick={() => {
                      setWeather({ lat, lon });
                      localStorage.setItem(APP.STORE_KEY.LAT, lat.toString());
                      localStorage.setItem(APP.STORE_KEY.LON, lon.toString());
                    }}
                  >
                    <MapPinnedIcon />
                  </Button>
                </DialogClose>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </DialogContent>
    </Dialog>
  );
};
