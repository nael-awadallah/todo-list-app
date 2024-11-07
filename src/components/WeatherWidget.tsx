/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { Cloud, Sun, Moon, CloudRain, Wind, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WeatherData {
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  name: string;
}

const API_KEY = 'Replace with your actual API key'; 
const CITY = 'Amman'; // You can make this dynamic if needed

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data: WeatherData = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return <Sun className="h-16 w-16 text-yellow-400" />;
      case 'clouds':
        return <Cloud className="h-16 w-16 text-gray-400" />;
      case 'rain':
        return <CloudRain className="h-16 w-16 text-blue-400" />;
      default:
        return <Wind className="h-16 w-16 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <Card className="bg-[#6C5DD3]/20 p-4 rounded-lg">
        <CardContent className="flex items-center justify-center p-2">
          <Loader2 className="h-6 w-6 text-white animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-[#6C5DD3]/20 p-4 rounded-lg">
        <CardContent className="text-white text-center p-2">
          {error}
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <Card className="bg-[#6C5DD3]/20 p-4 rounded-lg">
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weatherData.weather[0].main)}
            <div className="text-white">
              <div>{weatherData.weather[0].main}</div>
              <div className="text-sm text-gray-400">{weatherData.name}</div>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {Math.round(weatherData.main.temp)}°C
            </div>
            <div className="text-sm text-gray-400 text-right">
              {Math.round((weatherData.main.temp * 9) / 5 + 32)}°F
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
