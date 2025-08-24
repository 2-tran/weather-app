"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/card/card";
import { ForecastData } from "../../types/weather";
import { TemperatureUnit } from "../../../search/types/search";
import { Droplets, Wind } from "lucide-react";
import styles from "./forecast-card.module.css";
import { getWeatherIcon } from "@/shared";
import Image from "next/image";
import {
  convertTemperature,
  getTemperatureUnit,
} from "../../helpers/weather-helpers";

interface ForecastCardProps {
  forecast: ForecastData[];
  unit: TemperatureUnit;
}

export function ForecastCard({ forecast, unit }: ForecastCardProps) {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.title}>7-Day Weather Forecast</CardTitle>
      </CardHeader>

      <CardContent>
        <div className={styles.grid}>
          {forecast.map((day, index) => (
            <div key={index} className={styles.dayCard}>
              <div className={styles.date}>{day.date}</div>

              <Image
                src={getWeatherIcon(day.icon)}
                alt={day.description}
                className={styles.icon}
                width={64}
                height={64}
              />

              <div className={styles.description}>{day.description}</div>

              <div className={styles.tempBlock}>
                <div className={styles.tempMax}>
                  {convertTemperature(day.temperature.max, unit)}
                  {getTemperatureUnit(unit)}
                </div>
                <div className={styles.tempMin}>
                  {convertTemperature(day.temperature.min, unit)}
                  {getTemperatureUnit(unit)}
                </div>
              </div>

              <div className={styles.stats}>
                <div className={styles.statRow}>
                  <div className={styles.statLabel}>
                    <Droplets className={styles.humidityIcon} />
                    <span>Humidity</span>
                  </div>
                  <span className={styles.statValue}>{day.humidity}%</span>
                </div>

                <div className={styles.statRow}>
                  <div className={styles.statLabel}>
                    <Wind className={styles.windIcon} />
                    <span>Wind</span>
                  </div>
                  <span className={styles.statValue}>{day.windSpeed} km/h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
