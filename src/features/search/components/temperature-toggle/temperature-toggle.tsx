"use client";

import React from "react";
import { Thermometer } from "lucide-react";
import { TemperatureUnit } from "../../types/search";
import styles from "./temperature-toggle.module.css";
import { cn } from "@/shared/utils";

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

export function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <div className={styles.container}>
      <button
        onClick={() => onToggle("celsius")}
        className={cn(
          styles.button,
          unit === "celsius" ? styles.active : styles.inactive
        )}
      >
        <Thermometer className={styles.icon} />
        °C
      </button>
      <button
        onClick={() => onToggle("fahrenheit")}
        className={cn(
          styles.button,
          unit === "fahrenheit" ? styles.active : styles.inactive
        )}
      >
        <Thermometer className={styles.icon} />
        °F
      </button>
    </div>
  );
}
