import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { App } from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      // Cache weather data for 5 minutes — a good balance between freshness and
      // avoiding hammering the free-tier API rate limit.
      staleTime: 1000 * 60 * 5,
      // Don't refetch on window focus — weather doesn't change that fast.
      refetchOnWindowFocus: false,
    },
  },
});

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found in DOM");

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
