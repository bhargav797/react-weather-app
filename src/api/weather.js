// src/api/weather.js
import axios from "axios";

/**
 * Use environment variable (Vite) if present, otherwise fallback to the hard-coded URL.
 * Make sure VITE_WEATHER_BACKEND_URL is set in your .env.local file (and you've restarted the dev server).
 */
const BACKEND = import.meta.env.VITE_WEATHER_BACKEND_URL || "https://weather-backend-h8by.onrender.com";

/**
 * Fetch weather by city (proxied via your backend)
 * Note: backend expects query param `city`
 */
export async function fetchWeatherByCity(city) {
  try {
    const url = `${BACKEND}/weather?city=${encodeURIComponent(city)}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    // rethrow so callers can handle error
    console.error("fetchWeatherByCity error:", err);
    throw err;
  }
}

/**
 * Fetch weather by coordinates (lat, lon)
 */
export async function fetchWeatherByCoords(lat, lon) {
  try {
    const url = `${BACKEND}/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error("fetchWeatherByCoords error:", err);
    throw err;
  }
}

/**
 * Utility to produce OpenWeather icon URL (WeatherCard uses this)
 */
export function getIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
