"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/card/card";
import { WeatherData } from "@/features/weather/types/weather";
import { TemperatureUnit } from "@/features/search/types/search";
import {
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Calendar,
} from "lucide-react";
import styles from "./weather-card.module.css";
import Image from "next/image";
import { getWeatherIcon } from "@/shared";
import {
  getTemperature,
  getTemperatureUnit,
} from "../../helpers/weather-helpers";

interface WeatherCardProps {
  weather: WeatherData;
  unit: TemperatureUnit;
  onViewForecast?: () => void;
}

interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function WeatherDetail({ icon, label, value }: WeatherDetailProps) {
  return (
    <div className={styles.detailBox}>
      {icon}
      <div>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
  );
}

export function WeatherCard({
  weather,
  unit,
  onViewForecast,
}: WeatherCardProps) {
  const details: WeatherDetailProps[] = [
    {
      icon: (
        <Droplets
          className={styles.icon}
          style={{ color: "var(--color-blue-500)" }}
        />
      ),
      label: "Humidity",
      value: `${weather.humidity}%`,
    },
    {
      icon: (
        <Wind
          className={styles.icon}
          style={{ color: "var(--color-green-500)" }}
        />
      ),
      label: "Wind Speed",
      value: `${weather.windSpeed} km/h`,
    },
    {
      icon: (
        <Gauge
          className={styles.icon}
          style={{ color: "var(--color-purple-500)" }}
        />
      ),
      label: "Pressure",
      value: `${weather.pressure} hPa`,
    },
    {
      icon: (
        <Eye
          className={styles.icon}
          style={{ color: "var(--color-indigo-500)" }}
        />
      ),
      label: "Visibility",
      value: `${weather.visibility} km`,
    },
    {
      icon: (
        <Sunrise
          className={styles.icon}
          style={{ color: "var(--color-orange-500)" }}
        />
      ),
      label: "Sunrise",
      value: weather.sunrise,
    },
    {
      icon: (
        <Sunset
          className={styles.icon}
          style={{ color: "var(--color-red-500)" }}
        />
      ),
      label: "Sunset",
      value: weather.sunset,
    },
  ];

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <CardTitle className={styles.title}>
          {weather.city}, {weather.country}
        </CardTitle>
        <div className={styles.headerRow}>
          <Image
            src={getWeatherIcon(weather.icon)}
            alt={weather.description}
            width={64}
            height={64}
            className={styles.descIcon}
          />
          <div className={styles.description}>{weather.description}</div>
        </div>
      </CardHeader>

      <CardContent className={styles.content}>
        <div className={styles.temperatureWrapper}>
          <div className={styles.temperature}>
            {getTemperature(weather, unit)}
            {getTemperatureUnit(unit)}
          </div>
        </div>

        <div className={styles.grid}>
          {details.map((detail, idx) => (
            <WeatherDetail key={idx} {...detail} />
          ))}
        </div>

        {onViewForecast && (
          <div className={styles.buttonWrapper}>
            <button onClick={onViewForecast} className={styles.button}>
              <Calendar className={styles.buttonIcon} />
              View 7-Day Forecast
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
