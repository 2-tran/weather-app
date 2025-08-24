"use client";

import React, { Suspense } from "react";
import { ForecastCard } from "@/features/weather";
import { TemperatureToggle } from "@/features/search";
import { ArrowLeft, Cloud } from "lucide-react";
import { Button } from "@/shared/components/button/button";
import styles from "./forecast.module.css";
import { useForecastPage } from "./use-forecast";
import RenderWhen from "@/shared/components/render-when/render-when";

function ForecastContent() {
  const { city, forecast, loading, error, unit, toggleUnit, handleBack } =
    useForecastPage();

  if (!city) {
    return <NoCity handleBack={handleBack} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className={styles.backButton}
            >
              <ArrowLeft className={styles.iconBtn} />
              Back
            </Button>
            <h1 className={styles.title}>{city}</h1>
          </div>

          <TemperatureToggle unit={unit} onToggle={toggleUnit} />
        </div>
        <RenderWhen>
          <RenderWhen.If isTrue={!!error}>
            <div className={styles.errorBox}>
              <span>{error}</span>
            </div>
          </RenderWhen.If>
          <RenderWhen.If isTrue={!!loading}>
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p className={styles.textSecondary}>Loading forecast data...</p>
            </div>
          </RenderWhen.If>
          <RenderWhen.If isTrue={!!forecast && !loading && !error}>
            {forecast && <ForecastCard forecast={forecast} unit={unit} />}
          </RenderWhen.If>
          <RenderWhen.If isTrue={!forecast && !loading && !error}>
            <div className={styles.noData}>
              <Cloud className={styles.iconLarge} />
              <h3 className={styles.noDataTitle}>No forecast data available</h3>
              <p className={styles.noDataText}>
                Unable to load forecast data for {city}
              </p>
            </div>
          </RenderWhen.If>
        </RenderWhen>
      </div>
    </div>
  );
}

function NoCity({ handleBack }: { handleBack: () => void }) {
  return (
    <div className={styles.container}>
      <div className={styles.centerBox}>
        <Cloud className={styles.iconLarge} />
        <h1 className={styles.textPrimary}>No city specified</h1>
        <p className={styles.textSecondary}>
          Please go back and select a city to view the forecast.
        </p>
        <div className={styles.btnBack}>
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      </div>
    </div>
  );
}

export default function ForecastPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <div className={styles.centerBox}>
            <div className={styles.spinner}></div>
            <p className={styles.textSecondary}>Loading forecast...</p>
          </div>
        </div>
      }
    >
      <ForecastContent />
    </Suspense>
  );
}
