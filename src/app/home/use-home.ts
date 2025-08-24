"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWeather } from "@/features/weather";
import { useSearchHistory, useTemperatureUnit } from "@/features/search";

export function useHome() {
  const { weather, loading, error, fetchWeather } = useWeather();
  const { history, addToHistory, clearHistory } = useSearchHistory();
  const { unit, toggleUnit } = useTemperatureUnit();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasInitializedFromUrl = useRef(false);

  const handleSearch = async (city: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("city", city);
    router.replace(`?${params.toString()}`, { scroll: false });
    await fetchWeather(city);
  };

  const handleHistorySelect = (city: string) => handleSearch(city);

  const handleViewForecast = () => {
    if (weather?.city) {
      router.push(`/forecast?city=${encodeURIComponent(weather.city)}`);
    }
  };

  useEffect(() => {
    if (weather) addToHistory(weather.city, weather.country);
  }, [weather, addToHistory]);

  useEffect(() => {
    const cityFromUrl = searchParams.get("city");
    if (cityFromUrl && !hasInitializedFromUrl.current) {
      hasInitializedFromUrl.current = true;
      const params = new URLSearchParams(searchParams.toString());
      params.set("city", cityFromUrl);
      router.replace(`?${params.toString()}`);
      fetchWeather(cityFromUrl);
    }
  }, [searchParams, router, fetchWeather]);

  return {
    weather,
    loading,
    error,
    history,
    unit,
    handleSearch,
    handleHistorySelect,
    handleViewForecast,
    clearHistory,
    toggleUnit,
  };
}
