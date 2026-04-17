# Mausam — Weather Dashboard

**Live → [weather.swayam.io](https://weather.swayam.io)**

> A fast, accessible weather dashboard built with React 19, Vite 8, and Tailwind CSS v4 — powered by OpenWeatherMap and Mapbox GL.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Data Sources & APIs](#data-sources--apis)
- [Performance](#performance)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

Mausam (Hindi: *मौसम*, meaning "weather") is a clean, production-grade weather application that shows current conditions and an hourly forecast for any location on Earth. Users can search for any city using the geocoding search dialog, switch between metric and imperial units, and view weather data across nine interactive chart types — all rendered alongside an interactive Mapbox map that adapts to the active light/dark theme.

---

## Features

### Weather Data

- **Current Conditions** — Temperature, feels-like, wind speed and direction, humidity, pressure, visibility, and cloud cover displayed in a structured card with live OpenWeatherMap weather icons
- **Hourly Forecast** — 5-day / 3-hour forecast from the OpenWeatherMap Forecast API, visualized across nine tabbed chart types:
  - Overview (temperature range)
  - Precipitation
  - Wind speed
  - Humidity
  - Cloud cover
  - Pressure
  - UV Index
  - Visibility
  - Feels Like

### Location & Map

- **City Search** — Debounced geocoding search (400 ms) with up to 5 results via OpenWeatherMap's Geocoding API, triggered by clicking the search button or pressing `Ctrl/Cmd + K`
- **Mapbox GL Map** — Interactive map centered on the selected location with a custom marker; map style automatically switches between `light-v11` and `dark-v11` based on the active theme
- **Persistent Location** — Last selected coordinates are persisted to `localStorage` via Zustand so the user's location is remembered across sessions

### UX & Accessibility

- **Dark / Light / System Theme** — Three-way theme toggle with preference persisted to `localStorage`
- **Metric / Imperial Toggle** — Switch between °C / m/s and °F / mph at any time; unit preference is also persisted
- **Dynamic Page Title** — Browser tab title updates to reflect the current location and temperature
- **Skip-to-Content Link** — Hidden accessible link for keyboard and screen-reader navigation
- **ARIA Labels** — All interactive elements, loading states, and data regions carry descriptive `aria-*` attributes
- **Skeleton Loading UI** — Cards and charts display skeleton placeholders while data is in flight
- **Error Boundaries** — Per-section `AppErrorBoundary` components prevent a single component failure from crashing the entire page

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4, shadcn/ui, Radix UI |
| Data Fetching | TanStack Query v5 (React Query) |
| HTTP Client | Axios |
| State Management | Zustand v5 (with `persist` middleware) |
| Charts | Recharts v3 |
| Map | Mapbox GL JS v3 |
| Icons | Lucide React |
| Typography | Geist Variable Font (`@fontsource-variable/geist`) |
| Linting | ESLint 9, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` |
| Formatting | Prettier with `prettier-plugin-tailwindcss` |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        React App (Vite)                       │
│                                                              │
│  ┌───────────────┐   ┌────────────────┐   ┌──────────────┐  │
│  │  AppHeader    │   │ CurrentWeather │   │  HourlyTabs  │  │
│  │  (Search,     │   │    Card        │   │  (9 charts,  │  │
│  │   Unit, Theme)│   │                │   │  lazy-loaded)│  │
│  └───────────────┘   └────────────────┘   └──────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐   │
│  │                 Map (Mapbox GL JS)                    │   │
│  │           theme-aware  ·  marker  ·  pan on select   │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐     │
│  │               Zustand Stores (persisted)            │     │
│  │   useWeatherStore (lat/lon)  ·  useUnitStore (unit) │     │
│  └──────────────────────────┬──────────────────────────┘     │
│                             │                                │
│  ┌──────────────────────────▼──────────────────────────┐     │
│  │          TanStack Query  ·  useWeatherQuery          │     │
│  │   queryKey: ["weather", lat, lon, unit]              │     │
│  │   staleTime: 5 min  ·  retry: 1                      │     │
│  └──────────────────────────┬──────────────────────────┘     │
└─────────────────────────────┼────────────────────────────────┘
                              │ axios (interceptors)
              ┌───────────────┴───────────────┐
              │        OpenWeatherMap API      │
              │  /data/2.5/weather             │
              │  /data/2.5/forecast            │
              │  /geo/1.0/reverse              │
              │  /geo/1.0/direct  (search)     │
              └───────────────────────────────┘
```

**Data flow:** Zustand stores hold the selected `lat/lon` and `unit`. `useWeatherQuery` constructs a TanStack Query keyed on those three values, firing three OpenWeatherMap requests in parallel (`Promise.all`). Components subscribe to the shared `useWeather` hook which composes the store and query together. All nine chart components are lazy-loaded via `React.lazy` and `Suspense` to keep the initial bundle small.

---

## Project Structure

```
.
├── public/                        # Static assets (icons, manifest, OG image)
├── src/
│   ├── api/
│   │   └── index.ts               # Axios instance + response interceptors
│   ├── assets/
│   │   └── Logo.tsx               # SVG logo component
│   ├── components/
│   │   ├── charts/                # Nine Recharts chart components (lazy-loaded)
│   │   │   ├── OverviewChart.tsx
│   │   │   ├── PrecipitationChart.tsx
│   │   │   ├── WindChart.tsx
│   │   │   ├── HumidityChart.tsx
│   │   │   ├── CloudCoverChart.tsx
│   │   │   ├── PressureChart.tsx
│   │   │   ├── UVIndexChart.tsx
│   │   │   ├── VisibilityChart.tsx
│   │   │   └── FeelsLikeChart.tsx
│   │   ├── dialogs/
│   │   │   └── SearchDialog.tsx   # City search with geocoding + Ctrl+K shortcut
│   │   ├── dropdowns/
│   │   │   ├── UnitToggle.tsx     # Metric / Imperial switcher
│   │   │   └── theme-toggle.tsx   # Dark / Light / System theme toggle
│   │   ├── layout/
│   │   │   ├── AppHeader.tsx      # Top navigation bar
│   │   │   ├── AppErrorBoundary.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageHeader.tsx     # Location name + sunrise/sunset display
│   │   ├── map/
│   │   │   ├── Map.tsx            # Mapbox GL map, theme-aware style switching
│   │   │   └── Marker.tsx         # Custom map marker
│   │   ├── providers/
│   │   │   └── theme-provider.tsx # Context-based theme provider
│   │   ├── ui/                    # shadcn/ui primitives (button, card, dialog…)
│   │   └── weather/
│   │       ├── CurrentWeatherCard.tsx   # Current conditions display
│   │       └── HourlyWeatherTabs.tsx    # Tabbed chart panel
│   ├── config/
│   │   ├── app.ts                 # Unit symbols + localStorage keys
│   │   ├── weather.ts             # API defaults (lat, lon, unit, search limit)
│   │   ├── mapbox.ts              # Mapbox defaults (center, zoom)
│   │   └── index.ts               # Re-exports
│   ├── features/
│   │   └── weather/
│   │       └── useWeatherQuery.ts # TanStack Query data-fetching hook
│   ├── hooks/
│   │   ├── useGeocoding.ts        # Debounced city search hook
│   │   ├── usePageTitle.ts        # Dynamic browser tab title
│   │   └── useWeather.ts          # Composed hook (store + query)
│   ├── lib/
│   │   └── utils.ts               # cn(), formatUnixTime(), helpers
│   ├── store/
│   │   ├── useUnitStore.ts        # Persisted metric/imperial preference
│   │   └── useWeatherStore.ts     # Persisted lat/lon selection
│   ├── index.css                  # Tailwind base + CSS custom properties
│   ├── types/
│   │   ├── common/                # Geo and timezone types
│   │   └── weather/               # Fully typed OWM API response shapes
│   ├── App.tsx                    # Root layout and section composition
│   └── main.tsx                   # React root + QueryClient setup
├── vite.config.ts                 # Vite config with manual chunk splitting
├── tsconfig.app.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- An [OpenWeatherMap](https://openweathermap.org/api) API key (free tier sufficient)
- A [Mapbox](https://account.mapbox.com/) access token (free tier sufficient)

### Installation

```bash
git clone https://github.com/your-username/mausam.git
cd mausam
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# OpenWeatherMap — https://openweathermap.org/api
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key

# Mapbox — https://account.mapbox.com/
VITE_MAPBOX_TOKEN=your_mapbox_access_token
```

> All `VITE_` prefixed variables are inlined at build time by Vite and are visible in the browser bundle. Do not store server-side secrets here.

The Axios instance in `src/api/index.ts` automatically attaches `VITE_OPENWEATHER_API_KEY` as the `appid` query parameter on every request. A `401` response logs a clear setup message in the browser console pointing to the API key setup page.

---

## Data Sources & APIs

### OpenWeatherMap

Three endpoints are called in parallel on every location change:

| Endpoint | Purpose |
|---|---|
| `GET /data/2.5/weather` | Current weather conditions |
| `GET /data/2.5/forecast` | 5-day / 3-hour hourly forecast |
| `GET /geo/1.0/reverse` | Reverse geocode coordinates → location name |
| `GET /geo/1.0/direct` | Forward geocode search query → coordinates (search only) |

Data is cached by TanStack Query with a 5-minute `staleTime`. One retry is attempted on failure before surfacing an error state.

### Mapbox GL JS

Used exclusively for the interactive map. The map style switches between `mapbox://styles/mapbox/light-v11` and `mapbox://styles/mapbox/dark-v11` based on the active theme, and smoothly re-centers on location changes.

---

## Performance

The Vite build applies several optimizations to keep load times fast:

- **Manual chunk splitting** — Four dedicated vendor chunks are emitted so browsers can cache them independently of app code: `vendor-react`, `vendor-mapbox`, `vendor-charts`, `vendor-query`. Mapbox GL (~800 KB) and Recharts are never bundled with the app entry point.
- **Lazy-loaded charts** — All nine chart components use `React.lazy` + `Suspense`. Chart code is only downloaded when the Hourly Forecast section is rendered, reducing the initial JS payload significantly.
- **`es2020` build target** — Modern syntax is preserved without unnecessary transpilation for supported browsers.
- **Hidden source maps** — Production source maps are emitted but not referenced in the bundle, enabling error reporting without exposing source to end users.

---

## Deployment

The app is live at **[weather.swayam.io](https://weather.swayam.io)**.

For self-hosted deployments, `npm run build` produces a fully static `dist/` folder that can be served from any static host (Vercel, Netlify, Cloudflare Pages, NGINX, etc.). No server-side runtime is required.

Ensure both `VITE_OPENWEATHER_API_KEY` and `VITE_MAPBOX_TOKEN` are set as build-time environment variables on your hosting platform before running the build step.

---

## Contributing

1. Fork the repository and create a feature branch (`git checkout -b feat/my-feature`).
2. Run `npm run lint` and `npm run build` before opening a pull request.
3. Follow the existing code style — Prettier is configured with `prettier-plugin-tailwindcss` and should be run on save.

Bug reports and feature requests are welcome via GitHub Issues.

---

## License

This project is private. All rights reserved.
