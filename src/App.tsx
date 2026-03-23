import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { Map } from "@/components/map/Map";
import { HourlyWeatherTabs } from "@/components/weather/HourlyWeatherTabs";
import { AppErrorBoundary } from "@/components/layout/AppErrorBoundary";
import { usePageTitle } from "@/hooks/usePageTitle";

const AppContent = () => {
  // Keep the browser tab title in sync with the current location
  usePageTitle();

  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col">
      {/* Skip-to-content for keyboard / screen-reader users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <AppHeader />

      <main id="main-content" className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <PageHeader />

          {/* Current conditions: weather card + map */}
          <section
            aria-label="Current conditions"
            className="grid gap-4 sm:gap-6 lg:grid-cols-3"
          >
            <div className="lg:col-span-1">
              <AppErrorBoundary>
                <CurrentWeatherCard />
              </AppErrorBoundary>
            </div>

            {/* Map fills remaining 2 columns; height adapts per breakpoint */}
            <div className="lg:col-span-2 lg:min-h-72">
              <AppErrorBoundary>
                <Map />
              </AppErrorBoundary>
            </div>
          </section>

          {/* Hourly chart section */}
          <section aria-label="Hourly forecast" className="mt-6 sm:mt-8">
            <AppErrorBoundary>
              <HourlyWeatherTabs />
            </AppErrorBoundary>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContent />
    </ThemeProvider>
  );
};
