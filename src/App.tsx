import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { Map } from "@/components/map/Map";
import { HourlyWeatherTabs } from "@/components/weather/HourlyWeatherTabs";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-background text-foreground flex min-h-screen flex-col">
        {/* Header */}
        <AppHeader />

        {/* Main Content */}
        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Page Header */}
            <PageHeader />

            {/* Top Section */}
            <section className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Weather Card */}
              <div className="lg:col-span-1">
                <CurrentWeatherCard />
              </div>

              {/* Map */}
              <div className="h-75 sm:h-100 lg:col-span-2 lg:h-full">
                <Map />
              </div>
            </section>

            {/* Hourly Forecast */}
            <section className="mt-8">
              <HourlyWeatherTabs />
            </section>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};
