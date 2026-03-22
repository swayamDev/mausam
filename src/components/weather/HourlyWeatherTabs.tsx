import { useState, lazy, Suspense } from "react";

import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// 🔥 Lazy load charts (performance boost)
const OverviewChart = lazy(() => import("@/components/charts/OverviewChart"));
const PrecipitationChart = lazy(
  () => import("@/components/charts/PrecipitationChart"),
);
const WindChart = lazy(() => import("@/components/charts/WindChart"));
const HumidityChart = lazy(() => import("@/components/charts/HumidityChart"));
const CloudCoverChart = lazy(
  () => import("@/components/charts/CloudCoverChart"),
);
const PressureChart = lazy(() => import("@/components/charts/PressureChart"));
const UVIndexChart = lazy(() => import("@/components/charts/UVIndexChart"));
const VisibilityChart = lazy(
  () => import("@/components/charts/VisibilityChart"),
);
const FeelsLikeChart = lazy(() => import("@/components/charts/FeelsLikeChart"));

type Tab = keyof typeof TAB_CONFIG;

// 🔥 Config-driven (scalable)
const TAB_CONFIG = {
  overview: { title: "Overview", component: OverviewChart },
  precipitation: { title: "Precipitation", component: PrecipitationChart },
  wind: { title: "Wind", component: WindChart },
  humidity: { title: "Humidity", component: HumidityChart },
  cloudCover: { title: "Cloud Cover", component: CloudCoverChart },
  pressure: { title: "Pressure", component: PressureChart },
  uv: { title: "UV Index", component: UVIndexChart },
  visibility: { title: "Visibility", component: VisibilityChart },
  feelsLike: { title: "Feels Like", component: FeelsLikeChart },
} as const;

export const HourlyWeatherTabs = () => {
  const [tab, setTab] = useState<Tab>("overview");

  const ActiveChart = TAB_CONFIG[tab].component;

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as Tab)}
      className="space-y-4 py-4"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">Hourly Forecast</h2>

        {/* Scrollable Tabs */}
        <div className="relative">
          <TabsList className="scrollbar-none flex w-full gap-2 overflow-x-auto bg-transparent px-1 py-1">
            {Object.entries(TAB_CONFIG).map(([key, item]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="bg-secondary/60 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1.5 text-sm whitespace-nowrap backdrop-blur"
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Gradient fade (UX improvement) */}
          <div className="from-background pointer-events-none absolute top-0 right-0 h-full w-8 bg-linear-to-l to-transparent" />
        </div>
      </div>

      {/* Active Tab Content */}
      <TabsContent value={tab}>
        <Card>
          <CardHeader>
            <CardTitle>{TAB_CONFIG[tab].title}</CardTitle>
          </CardHeader>

          <CardContent>
            <Suspense
              fallback={
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-62.5 w-full" />
                </div>
              }
            >
              <ActiveChart />
            </Suspense>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
