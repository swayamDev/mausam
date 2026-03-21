export const APP = {
  STORE_KEY: {
    LAT: "mausam-lat",
    LON: "mausam-lon",
    UNIT: "mausam-unit",
  },
  UNIT: {
    TEMP: {
      metric: "°C",
      imperial: "°F",
    },
    WIND: {
      metric: "m/s",
      imperial: "mph",
    },
  },
} as const;
