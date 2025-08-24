"use client";

import { useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useWeather } from "@/features/weather";
import { useTemperatureUnit } from "@/features/search";

export function useForecastPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const city = searchParams.get("city");

  const { forecast, loading, error, fetchForecast, clearError } = useWeather();
  const { unit, toggleUnit } = useTemperatureUnit();

  useEffect(() => {
    if (city) {
      fetchForecast(city);
    }
  }, [city, fetchForecast]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    city,
    forecast,
    loading,
    error,
    clearError,
    unit,
    toggleUnit,
    handleBack,
  };
}
