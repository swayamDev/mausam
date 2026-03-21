import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type GeolocationRes = {
  lat: number;
  lon: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserLocation = (): Promise<GeolocationRes> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          reject(err.message);
        },
      );
    }
  });
};
