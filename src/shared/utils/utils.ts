import { type ClassValue, clsx } from "clsx";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getWeatherIcon(iconCode: string) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function handleAxiosError(
  error: unknown,
  defaultMessage: string
): never {
  if (axios.isAxiosError(error)) {
    const apiMessage =
      (error.response?.data as { message: string })?.message ||
      error.response?.statusText;

    throw new Error(apiMessage || defaultMessage);
  }
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error(defaultMessage);
}

export async function executeAsync<T>(
  action: () => Promise<T>,
  onSuccess: (data: T) => void,
  onError: (message: string) => void,
  fallbackError: string
) {
  try {
    const data = await action();
    onSuccess(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : fallbackError;
    onError(message);
  }
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  retryTimes = 3,
  retryDelay = 500
): Promise<T> {
  let lastError;
  for (let attempt = 0; attempt < retryTimes; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status && status >= 400 && status < 500) {
          throw error;
        }
      }

      if (attempt < retryTimes - 1) {
        await new Promise((res) => setTimeout(res, retryDelay * 2 ** attempt));
      }
    }
  }
  throw lastError;
}
