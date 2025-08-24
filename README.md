# Weather Dashboard

A modern, responsive weather dashboard built with Next.js. This application allows users to search for current weather conditions in different cities and view detailed weather information.

## Features

- **City Search**: Search for weather by city name with validation
- **Current Weather Display**: Shows temperature, humidity, wind speed, pressure, visibility, sunrise, and sunset
- **Search History**: Displays last 5 searched cities with localStorage persistence
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit with persistence
- **Loading Indicators**: Visual feedback during API requests
- **Error Handling**: Graceful error handling for invalid cities and API failures
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **7-Day Weather Forecast**: Detailed forecast page with daily weather predictions

## Technology Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: CSS Module
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Storage**: LocalStorage for persistence
- **API**: Open-Meteo API

## Getting Started

- Node.js 18+
- npm or yarn

1. **Clone the repository**

   ```bash
   git clone https://github.com/2-tran/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   ```

   The application uses Open-Meteo API which is free and doesn't require authentication.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
