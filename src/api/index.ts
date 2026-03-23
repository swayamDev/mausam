import axios from "axios";

export const openWeatherApi = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
  },
});

// Translate HTTP error codes into developer-friendly messages
openWeatherApi.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        console.error(
          "[Mausam] OpenWeatherMap API key is missing or invalid.\n" +
          "Set VITE_OPENWEATHER_API_KEY in your .env.local file.\n" +
          "Get a free key at: https://home.openweathermap.org/api_keys"
        );
      } else if (status === 429) {
        console.warn("[Mausam] OpenWeatherMap rate limit reached. Requests will retry after backoff.");
      } else if (status && status >= 500) {
        console.error(`[Mausam] OpenWeatherMap server error (${status}). Try again later.`);
      }
    }
    return Promise.reject(error);
  }
);

