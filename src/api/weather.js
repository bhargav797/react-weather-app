// src/api/weather.js
import axios from "axios";

const BASE = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

/**
 * Fetch current weather by city name
 * @param {string} city
 * @returns {Promise<object>}
 */
export async function fetchWeatherByCity(city) {
  if (!API_KEY) throw new Error("Missing OpenWeather API key (VITE_OPENWEATHER_API_KEY)");
  const url = `${BASE}/weather`;
  const params = {
    q: city,
    units: "metric",
    appid: API_KEY,
  };
  const res = await axios.get(url, { params });
  return res.data;
}

/**
 * Fetch current weather by lat/lon
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<object>}
 */
export async function fetchWeatherByCoords(lat, lon) {
  if (!API_KEY) throw new Error("Missing OpenWeather API key (VITE_OPENWEATHER_API_KEY)");
  const url = `${BASE}/weather`;
  const params = {
    lat,
    lon,
    units: "metric",
    appid: API_KEY,
  };
  const res = await axios.get(url, { params });
  return res.data;
}

// helper for icon url
export function getIconUrl(iconCode) {
  // OpenWeather has icon URLs like: http://openweathermap.org/img/wn/{icon}@2x.png
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
