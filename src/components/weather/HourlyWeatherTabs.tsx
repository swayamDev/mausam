import { useState } from "react";

import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OverviewChart } from "@/components/charts/OverviewChart";
import { PrecipitationChart } from "@/components/charts/PrecipitationChart";
import { WindChart } from "@/components/charts/WindChart";
import { HumidityChart } from "@/components/charts/HumidityChart";
import { CloudCoverChart } from "@/components/charts/CloudCoverChart";
import { PressureChart } from "@/components/charts/PressureChart";
import { UVIndexChart } from "@/components/charts/UVIndexChart";
import { VisibilityChart } from "@/components/charts/VisibilityChart";
import { FeelsLikeChart } from "@/components/charts/FeelsLikeChart";

type Tab =
  | "overview"
  | "precipitation"
  | "wind"
  | "humidity"
  | "cloudCover"
  | "pressure"
  | "uv"
  | "visibility"
  | "feelsLike";

const TABS_LIST = [
  {
    title: "Overview",
    value: "overview",
  },
  {
    title: "Precipitation",
    value: "precipitation",
  },
  {
    title: "Wind",
    value: "wind",
  },
  {
    title: "Humidity",
    value: "humidity",
  },
  {
    title: "Cloud cover",
    value: "cloudCover",
  },
  {
    title: "Pressure",
    value: "pressure",
  },
  {
    title: "UV",
    value: "uv",
  },
  {
    title: "Visibility",
    value: "visibility",
  },
  {
    title: "Feels like",
    value: "feelsLike",
  },
];

export const HourlyWeatherTabs = () => {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as Tab)}
      className="gap-4 py-4"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Hourly</h2>

        <TabsList
          className="bg-background justify-start gap-2 overflow-x-auto overflow-y-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {TABS_LIST.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="bg-secondary data-[state=active]:bg-primary! data-[state=active]:text-background h-9 rounded-full border-none px-4"
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="precipitation">
        <Card>
          <CardHeader>
            <CardTitle>Precipitation</CardTitle>
          </CardHeader>
          <CardContent>
            <PrecipitationChart />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="wind">
        <Card>
          <CardHeader>
            <CardTitle>Wind</CardTitle>
          </CardHeader>
          <CardContent>
            <WindChart />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="humidity">
        <Card>
          <CardHeader>
            <CardTitle>Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <HumidityChart />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="cloudCover">
        <Card>
          <CardHeader>
            <CardTitle>Cloud cover</CardTitle>
          </CardHeader>
          <CardContent>
            <CloudCoverChart />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="pressure">
        <Card>
          <CardHeader>
            <CardTitle>Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <PressureChart />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="uv">
        <Card>
          <CardHeader>
            <CardTitle>UV</CardTitle>
          </CardHeader>
          <CardContent>
            <UVIndexChart />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="visibility">
        <Card>
          <CardHeader>
            <CardTitle>Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <VisibilityChart />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="feelsLike">
        <Card>
          <CardHeader>
            <CardTitle>Feels like</CardTitle>
          </CardHeader>
          <CardContent>
            <FeelsLikeChart />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
