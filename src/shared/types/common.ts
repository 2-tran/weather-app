export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Location {
  name: string;
  country: string;
  coordinates: Coordinates;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: unknown;
}
