export interface WeatherData {
  city: string;
  country: string;
  temperature: {
    celsius: number;
    fahrenheit: number;
  };
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  sunrise: string;
  sunset: string;
}

export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface WeatherError {
  message: string;
  code?: string;
}
