export const API_CONFIG = {
  OPEN_METEO: {
    BASE_URL: process.env.NEXT_PUBLIC_OPEN_METEO_BASE_URL,
    GEOCODING_URL: process.env.NEXT_PUBLIC_OPEN_METEO_GEOCODING_URL,
  },
} as const;

export const API_ENDPOINTS = {
  WEATHER: {
    FORECAST: "/forecast",
    SEARCH: "/search",
    REVERSE: "/reverse",
  },
} as const;
