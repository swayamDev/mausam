# 🌤 Mausam — Real-Time Weather App

A production-grade weather application built with React 19, TypeScript, Tailwind CSS v4, ShadCN UI, Recharts, and Mapbox GL.

## ✨ Features

- **Real-time weather** via OpenWeatherMap `/data/2.5/weather` + `/data/2.5/forecast`
- **Interactive map** via Mapbox GL with theme-aware light/dark styles
- **9 hourly charts** (temperature, precipitation, wind, humidity, cloud cover, pressure, UV, visibility, feels like)
- **Unit toggle** — metric (°C, m/s) ↔ imperial (°F, mph)
- **Dark / light / system theme** with persistent preference
- **Location search** with geocoding and keyboard shortcut (`⌘K` / `Ctrl+K`)
- **Geolocation** — one-click current location button
- **Fully responsive** — mobile, tablet, desktop
- **Accessible** — ARIA labels, roles, skip-to-content, keyboard navigation, reduced-motion support

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set environment variables

Create a `.env.local` file at the project root:
```env
# OpenWeatherMap — Free tier works (uses /data/2.5 endpoints)
# https://home.openweathermap.org/api_keys
VITE_OPENWEATHER_API_KEY=your_openweathermap_key_here

# Mapbox — Free tier works (generous monthly limit)
# https://account.mapbox.com/access-tokens/
VITE_MAPBOX_TOKEN=your_mapbox_public_token_here
```

### 3. Run dev server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## 🗂 Project Structure

```
src/
├── api/               # Axios client (OpenWeatherMap)
├── components/
│   ├── charts/        # 9 chart components + WeatherAreaChart/WeatherBarChart generics
│   ├── dialogs/       # SearchDialog
│   ├── dropdowns/     # ThemeToggle, UnitToggle
│   ├── layout/        # AppHeader, Footer, PageHeader, AppErrorBoundary
│   ├── map/           # Map, Marker
│   ├── providers/     # ThemeProvider
│   ├── ui/            # ShadCN base components
│   └── weather/       # CurrentWeatherCard, HourlyWeatherTabs
├── config/            # App, weather API, Mapbox constants
├── features/weather/  # useWeatherQuery (TanStack Query)
├── hooks/             # useWeather, useGeocoding, usePageTitle
├── lib/               # cn(), getUserLocation()
├── store/             # Zustand stores (location, unit)
└── types/             # TypeScript interfaces
```

## ⚠️ API Notes

- **UV Index**: `/data/2.5/forecast` does not include `uvi` on the free tier. UV data requires One Call API 3.0. Chart shows 0 until upgraded.
- **Dew point**: Not available in `/data/2.5/forecast`. Humidity chart shows relative humidity only.
- **Forecast window**: 40 data points (5 days × 8 three-hour intervals).

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 |
| Components | ShadCN UI (Radix primitives) |
| Charts | Recharts |
| Map | Mapbox GL JS v3 |
| State | Zustand v5 |
| Data fetching | TanStack Query v5 |
| HTTP client | Axios |
| Build | Vite 8 |
