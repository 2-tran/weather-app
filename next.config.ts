import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_OPEN_METEO_BASE_URL:
      process.env.NEXT_PUBLIC_OPEN_METEO_BASE_URL,
    NEXT_PUBLIC_OPEN_METEO_GEOCODING_URL:
      process.env.NEXT_PUBLIC_OPEN_METEO_GEOCODING_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
      },
    ],
  },
};

export default nextConfig;
