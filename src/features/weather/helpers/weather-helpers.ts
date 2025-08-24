import { TemperatureUnit } from "@/features/search";
import { WeatherData } from "../types/weather";

export const toKmh = (ms: number) => Math.round(ms * 3.6);
export const toFahrenheit = (c: number) => Math.round((c * 9) / 5 + 32);

export const formatClock = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export const formatDay = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

export const getTemperatureUnit = (unit: TemperatureUnit) =>
  unit === "celsius" ? "°C" : "°F";

export const convertTemperature = (temp: number, unit: TemperatureUnit) =>
  unit === "fahrenheit" ? Math.round((temp * 9) / 5 + 32) : temp;

export function getTemperature(weather: WeatherData, unit: TemperatureUnit) {
  return unit === "celsius"
    ? weather.temperature.celsius
    : weather.temperature.fahrenheit;
}
