import { useCallback, useEffect, useRef, useState } from "react";
import { openWeatherApi } from "@/api";
import { WEATHER_API } from "@/config";
import type { Geocoding } from "@/types";

interface UseGeocodingReturn {
  results: Geocoding[];
  isSearching: boolean;
  searchError: string | null;
  search: string;
  setSearch: (value: string) => void;
  clearSearch: () => void;
}

export const useGeocoding = (): UseGeocodingReturn => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Geocoding[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Keep a stable ref to the latest search value for the debounce callback
  const searchRef = useRef(search);
  searchRef.current = search;

  const fetchGeocoding = useCallback(async (query: string): Promise<Geocoding[]> => {
    const response = await openWeatherApi.get("/geo/1.0/direct", {
      params: {
        q: query,
        limit: WEATHER_API.DEFAULTS.SEARCH_RESULT_LIMIT,
      },
    });
    return response.data as Geocoding[];
  }, []);

  const clearSearch = useCallback(() => {
    setSearch("");
    setResults([]);
    setSearchError(null);
  }, []);

  useEffect(() => {
    const trimmed = search.trim();

    if (!trimmed) {
      setResults([]);
      setSearchError(null);
      return;
    }

    const id = setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);
      try {
        const data = await fetchGeocoding(trimmed);
        setResults(data);
      } catch {
        setSearchError("Failed to fetch results. Please try again.");
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(id);
  }, [search, fetchGeocoding]);

  return {
    results,
    isSearching,
    searchError,
    search,
    setSearch,
    clearSearch,
  };
};
