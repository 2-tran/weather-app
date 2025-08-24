import axios from "axios";
import { WeatherData, ForecastData } from "../types/weather";
import { API_CONFIG, API_ENDPOINTS } from "@/config/api";
import {
  WEATHER_CODE_MAP,
  FORECAST_DAYS,
} from "../constants/weather-constants";
import {
  toKmh,
  toFahrenheit,
  formatClock,
  formatDay,
} from "../helpers/weather-helpers";
import { handleAxiosError } from "@/shared/utils";

const weatherApi = axios.create({ baseURL: API_CONFIG.OPEN_METEO.BASE_URL });

interface OpenMeteoWeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    surface_pressure: number;
    visibility: number;
    weather_code: number;
  };
  daily: {
    sunrise: string[];
    sunset: string[];
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    surface_pressure: string;
    visibility: string;
  };
}

interface OpenMeteoForecastResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    relative_humidity_2m_max: number[];
    wind_speed_10m_max: number[];
    sunrise: string[];
    sunset: string[];
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
    relative_humidity_2m_max: string;
    wind_speed_10m_max: string;
  };
}

interface GeocodingResponse {
  results?: Array<{
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  }>;
}

interface ReverseGeocodingResponse {
  results?: Array<{
    name?: string;
    country?: string;
  }>;
}

export class WeatherService {
  private static get currentParams() {
    return {
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "wind_speed_10m",
        "surface_pressure",
        "visibility",
        "weather_code",
      ],
      daily: ["sunrise", "sunset"],
      timezone: "auto",
    } as const;
  }

  private static get dailyParams() {
    return {
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "weather_code",
        "relative_humidity_2m_max",
        "wind_speed_10m_max",
        "sunrise",
        "sunset",
      ],
      timezone: "auto",
    } as const;
  }

  private static async getCoordinates(city: string): Promise<{
    lat: number;
    lon: number;
    name: string;
    country: string;
  }> {
    try {
      const { data } = await axios.get<GeocodingResponse>(
        `${API_CONFIG.OPEN_METEO.GEOCODING_URL}${API_ENDPOINTS.WEATHER.SEARCH}`,
        {
          params: {
            name: city,
            count: 1,
            language: "en",
            format: "json",
          },
        }
      );

      const hit = data.results?.[0];
      if (!hit) {
        throw new Error(
          "City not found. Please check the city name and try again."
        );
      }

      return {
        lat: hit.latitude,
        lon: hit.longitude,
        name: hit.name,
        country: hit.country,
      };
    } catch (error) {
      handleAxiosError(error, "Failed to get city coordinates.");
    }
  }

  private static async reverseGeocode(
    lat: number,
    lon: number
  ): Promise<{ name: string; country: string }> {
    try {
      const { data } = await axios.get<ReverseGeocodingResponse>(
        `${API_CONFIG.OPEN_METEO.GEOCODING_URL}${API_ENDPOINTS.WEATHER.REVERSE}`,
        {
          params: {
            latitude: lat,
            longitude: lon,
            language: "en",
            format: "json",
          },
        }
      );
      const hit = data.results?.[0];
      return {
        name: hit?.name || "Unknown Location",
        country: hit?.country || "Unknown",
      };
    } catch (error) {
      console.error(error);
      return { name: "Unknown Location", country: "Unknown" };
    }
  }

  private static mapWeather(
    data: OpenMeteoWeatherResponse,
    loc: { name: string; country: string }
  ): WeatherData {
    const weatherInfo = WEATHER_CODE_MAP[data.current.weather_code] || {
      description: "Unknown",
      icon: "01d",
    };

    return {
      city: loc.name,
      country: loc.country,
      temperature: {
        celsius: Math.round(data.current.temperature_2m),
        fahrenheit: toFahrenheit(data.current.temperature_2m),
      },
      description: weatherInfo.description,
      icon: weatherInfo.icon,
      humidity: data.current.relative_humidity_2m,
      windSpeed: toKmh(data.current.wind_speed_10m),
      pressure: Math.round(data.current.surface_pressure),
      visibility: Math.round(data.current.visibility / 1000),
      sunrise: formatClock(data.daily.sunrise[0]),
      sunset: formatClock(data.daily.sunset[0]),
    };
  }

  static async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      const coords = await this.getCoordinates(city);
      const { data } = await weatherApi.get<OpenMeteoWeatherResponse>(
        API_ENDPOINTS.WEATHER.FORECAST,
        {
          params: {
            latitude: coords.lat,
            longitude: coords.lon,
            ...this.currentParams,
          },
        }
      );
      return this.mapWeather(data, {
        name: coords.name,
        country: coords.country,
      });
    } catch (error) {
      handleAxiosError(
        error,
        "Failed to fetch weather data. Please try again later."
      );
    }
  }

  static async getForecast(city: string): Promise<ForecastData[]> {
    try {
      const coords = await this.getCoordinates(city);
      const { data } = await weatherApi.get<OpenMeteoForecastResponse>(
        API_ENDPOINTS.WEATHER.FORECAST,
        {
          params: {
            latitude: coords.lat,
            longitude: coords.lon,
            ...this.dailyParams,
          },
        }
      );

      return data.daily.time.slice(0, FORECAST_DAYS).map((date, i) => {
        const info = WEATHER_CODE_MAP[data.daily.weather_code[i]] || {
          description: "Unknown",
          icon: "01d",
        };
        return {
          date: formatDay(date),
          temperature: {
            min: Math.round(data.daily.temperature_2m_min[i]),
            max: Math.round(data.daily.temperature_2m_max[i]),
          },
          description: info.description,
          icon: info.icon,
          humidity: data.daily.relative_humidity_2m_max[i],
          windSpeed: toKmh(data.daily.wind_speed_10m_max[i]),
        };
      });
    } catch (error) {
      handleAxiosError(
        error,
        "Failed to fetch forecast data. Please try again later."
      );
    }
  }

  static async getWeatherByCoords(
    lat: number,
    lon: number
  ): Promise<WeatherData> {
    try {
      const [{ data }, place] = await Promise.all([
        weatherApi.get<OpenMeteoWeatherResponse>(
          API_ENDPOINTS.WEATHER.FORECAST,
          {
            params: { latitude: lat, longitude: lon, ...this.currentParams },
          }
        ),
        this.reverseGeocode(lat, lon),
      ]);

      return this.mapWeather(data, place);
    } catch (error) {
      handleAxiosError(
        error,
        "Failed to fetch weather data for your location."
      );
    }
  }
}
