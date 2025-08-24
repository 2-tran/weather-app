import { SearchHistory, TemperatureUnit } from "../types/search";
import { STORAGE_KEYS, WEATHER_CONFIG } from "@/config/constants";

export class StorageService {
  private static isBrowser() {
    return typeof window !== "undefined";
  }

  private static getItem<T>(key: string, fallback: T): T {
    if (!this.isBrowser()) return fallback;
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : fallback;
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return fallback;
    }
  }

  private static setItem(key: string, value: unknown): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving key "${key}" to localStorage:`, error);
    }
  }

  static getSearchHistory(): SearchHistory[] {
    return this.getItem<SearchHistory[]>(STORAGE_KEYS.SEARCH_HISTORY, []);
  }

  static saveSearchHistory(history: SearchHistory[]): void {
    this.setItem(STORAGE_KEYS.SEARCH_HISTORY, history);
  }

  static addToSearchHistory(city: string, country: string): void {
    const history = this.getSearchHistory();
    const newEntry: SearchHistory = {
      city,
      country,
      timestamp: Date.now(),
    };

    const filteredHistory = history.filter(
      (item) => item.city.toLowerCase() !== city.toLowerCase()
    );

    const updatedHistory = [newEntry, ...filteredHistory].slice(
      0,
      WEATHER_CONFIG.MAX_SEARCH_HISTORY
    );
    this.saveSearchHistory(updatedHistory);
  }

  static getTemperatureUnit(): TemperatureUnit {
    return this.getItem<TemperatureUnit>(
      STORAGE_KEYS.TEMPERATURE_UNIT,
      WEATHER_CONFIG.DEFAULT_TEMPERATURE_UNIT
    );
  }

  static saveTemperatureUnit(unit: TemperatureUnit): void {
    this.setItem(STORAGE_KEYS.TEMPERATURE_UNIT, unit);
  }

  static clearSearchHistory(): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    } catch (error) {
      console.error("Error clearing search history from localStorage:", error);
    }
  }
}
