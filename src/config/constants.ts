export const APP_CONFIG = {
  NAME: "Weather Dashboard",
  DESCRIPTION: "Get current weather conditions for any city",
} as const;

export const STORAGE_KEYS = {
  SEARCH_HISTORY: "weather_search_history",
  TEMPERATURE_UNIT: "weather_temperature_unit",
} as const;

export const WEATHER_CONFIG = {
  MAX_SEARCH_HISTORY: 5,
  DEFAULT_TEMPERATURE_UNIT: "celsius" as const,
  GEOLOCATION_TIMEOUT: 10000,
} as const;

export const TIME_CONFIG = {
  MS_PER_HOUR: 1000 * 60 * 60,
  HOURS_PER_DAY: 24,
} as const;
