import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type GeolocationRes = {
  lat: number;
  lon: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Promisified wrapper around the Geolocation API.
 * Rejects with a human-readable string on failure.
 */
export const getUserLocation = (): Promise<GeolocationRes> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        // Map GeolocationPositionError codes to friendly messages
        const messages: Record<number, string> = {
          1: "Location access was denied. Please allow location permission and try again.",
          2: "Your location could not be determined. Please try again.",
          3: "Location request timed out. Please try again.",
        };
        reject(messages[err.code] ?? err.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 10_000,
        maximumAge: 60_000, // Accept a cached position up to 1 min old
      },
    );
  });
};

/**
 * Format a Unix timestamp (seconds) to a short time string.
 * e.g. 1715000000 → "3:33 PM"
 */
export const formatUnixTime = (unixSeconds: number): string =>
  new Date(unixSeconds * 1000).toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

/**
 * Format a Unix timestamp (seconds) to a short hour label.
 * e.g. 1715000000 → "3 PM"
 */
export const formatHourLabel = (unixSeconds: number): string =>
  new Date(unixSeconds * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });

