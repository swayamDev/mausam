import { useEffect, useCallback } from "react";
import { useWeather } from "@/hooks/useWeather";
import { useGeocoding } from "@/hooks/useGeocoding";

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


export const SearchDialog = () => {
  const { setLocation } = useWeather();
  const { searchDialogOpen, setSearchDialogOpen } = useSearchDialogStore();
  const {
    results,
    isSearching,
    searchError,
    search,
    setSearch,
    clearSearch,
  } = useGeocoding();

  // Global keyboard shortcut Ctrl/Cmd+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchDialogOpen(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [setSearchDialogOpen]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setSearchDialogOpen(open);
      if (!open) clearSearch();
    },
    [setSearchDialogOpen, clearSearch],
  );

  return (
    <Dialog open={searchDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Search for a location (Ctrl+K)"
          className="lg:bg-secondary dark:lg:bg-secondary/50 max-lg:size-9"
        >
          <SearchIcon aria-hidden="true" className="lg:text-muted-foreground" />
          <span className="sr-only lg:not-sr-only flex w-56 items-center justify-between">
            Search weather...
            <KbdGroup aria-hidden="true">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-card gap-0 p-0" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>Search for a location</DialogTitle>
          <DialogDescription>
            Type a city or country name to search for weather data.
          </DialogDescription>
        </DialogHeader>

        <InputGroup className="border-border! rounded-b-none border-x-0! border-t-0! border-b bg-transparent! ring-0!">
          <InputGroupInput
            autoFocus
            placeholder="Search weather..."
            value={search}
            aria-label="Search location"
            aria-autocomplete="list"
            aria-controls="search-results"
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
          <InputGroupAddon>
            <SearchIcon aria-hidden="true" />
          </InputGroupAddon>
        </InputGroup>

        <ItemGroup
          id="search-results"
          role="listbox"
          aria-label="Location search results"
          className="min-h-80 p-2"
        >
          {isSearching && (
            <p
              role="status"
              aria-live="polite"
              className="text-muted-foreground py-4 text-center text-sm"
            >
              Searching…
            </p>
          )}

          {searchError && !isSearching && (
            <p
              role="alert"
              className="text-destructive py-4 text-center text-sm"
            >
              {searchError}
            </p>
          )}

          {!isSearching && !searchError && search.trim() && !results.length && (
            <p
              role="status"
              aria-live="polite"
              className="text-muted-foreground py-4 text-center text-sm"
            >
              No results found for &ldquo;{search.trim()}&rdquo;
            </p>
          )}

          {!isSearching &&
            !searchError &&
            results.map(({ name, lat, lon, state, country }) => {
              const locationLabel = [name, state, country]
                .filter(Boolean)
                .join(", ");
              return (
                <Item
                  key={`${name}-${lat}-${lon}`}
                  role="option"
                  size="sm"
                  className="relative p-2"
                >
                  <ItemContent>
                    <ItemTitle>{name}</ItemTitle>
                    <ItemDescription>
                      {state ? `${state}, ` : ""}
                      {country}
                    </ItemDescription>
                  </ItemContent>

                  <ItemActions>
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`View weather for ${locationLabel}`}
                        className="after:absolute after:inset-0"
                        onClick={() => setLocation(lat, lon)}
                      >
                        <MapPinnedIcon aria-hidden="true" />
                      </Button>
                    </DialogClose>
                  </ItemActions>
                </Item>
              );
            })}
        </ItemGroup>
      </DialogContent>
    </Dialog>
  );
};

// ─── tiny local state slice ───────────────────────────────────────────────────
// Keeps dialog open/close state outside the geocoding hook so it can be
// driven by both the trigger button and the global keyboard shortcut.
import { create } from "zustand";

interface SearchDialogStore {
  searchDialogOpen: boolean;
  setSearchDialogOpen: (open: boolean) => void;
}

const useSearchDialogStore = create<SearchDialogStore>((set) => ({
  searchDialogOpen: false,
  setSearchDialogOpen: (open) => set({ searchDialogOpen: open }),
}));
