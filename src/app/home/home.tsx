"use client";

import React from "react";
import {
  ErrorMessage,
  SearchBar,
  SearchHistoryComponent,
  TemperatureToggle,
} from "@/features/search";
import { WeatherCard } from "@/features/weather";
import { Cloud } from "lucide-react";
import styles from "./home.module.css";
import { WeatherCardSkeleton } from "@/features/weather/components/weather-card/weather-card-skeleton";
import { useHome } from "./use-home";
import RenderWhen from "@/shared/components/render-when/render-when";

export default function HomeContent() {
  const {
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
  } = useHome();

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Cloud className={styles.headerIcon} />
            <h1 className={styles.title}>Weather Dashboard</h1>
          </div>
          <p className={styles.subtitle}>
            Get current weather conditions for any city
          </p>
        </div>

        <div className={styles.toggleWrapper}>
          <TemperatureToggle unit={unit} onToggle={toggleUnit} />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.searchBox}>
            <SearchBar onSearch={handleSearch} loading={loading} />
            {error && <ErrorMessage error={error} />}
            <div className={styles.weatherBox}>
              <RenderWhen>
                <RenderWhen.If isTrue={!!weather && !loading && !error}>
                  {weather && (
                    <WeatherCard
                      weather={weather}
                      unit={unit}
                      onViewForecast={handleViewForecast}
                    />
                  )}
                </RenderWhen.If>
                <RenderWhen.If isTrue={loading}>
                  <WeatherCardSkeleton />
                </RenderWhen.If>
                <RenderWhen.If isTrue={!weather && !loading && !error}>
                  <div className={styles.noData}>
                    <Cloud className={styles.noDataIcon} />
                    <h3 className={styles.noDataTitle}>No weather data</h3>
                    <p className={styles.noDataText}>
                      Search for a city to see the current weather conditions
                    </p>
                  </div>
                </RenderWhen.If>
              </RenderWhen>
            </div>
          </div>
          <div className={styles.historyBox}>
            <SearchHistoryComponent
              history={history}
              onSelectCity={handleHistorySelect}
              onClearHistory={clearHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
