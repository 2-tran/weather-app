"use client";

import { useState, useEffect, useCallback } from "react";
import { TemperatureUnit } from "../types/search";
import { StorageService } from "../services/storage";

export function useTemperatureUnit() {
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");

  useEffect(() => {
    const savedUnit = StorageService.getTemperatureUnit();
    setUnit(savedUnit);
  }, []);

  const toggleUnit = useCallback((newUnit: TemperatureUnit) => {
    setUnit(newUnit);
    StorageService.saveTemperatureUnit(newUnit);
  }, []);

  return {
    unit,
    toggleUnit,
  };
}
