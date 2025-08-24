"use client";

import { useState, useCallback } from "react";
import { WeatherData, ForecastData } from "../types/weather";
import { WeatherService } from "../services/weather-api";
import { executeAsync } from "@/shared/utils/utils";

interface UseWeatherReturn {
  weather: WeatherData | null;
  forecast: ForecastData[] | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
  fetchForecast: (city: string) => Promise<void>;
  clearError: () => void;
}

export function useWeather(): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);

    await executeAsync(
      () => WeatherService.getCurrentWeather(city),
      setWeather,
      setError,
      "Failed to fetch weather data"
    );

    setLoading(false);
  }, []);

  const fetchForecast = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);

    await executeAsync(
      () => WeatherService.getForecast(city),
      setForecast,
      setError,
      "Failed to fetch forecast data"
    );

    setLoading(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    fetchWeather,
    fetchForecast,
    clearError,
  };
}
