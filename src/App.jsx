// src/App.jsx
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import { fetchWeatherByCity, fetchWeatherByCoords } from "./api/weather";
import "./styles/index.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchCity(city) {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      if (err?.response?.status === 404) {
        setError("City not found. Try a different name.");
      } else {
        setError("Failed to fetch weather. Check your API key or network.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function useMyLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by this browser.");
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude: lat, longitude: lon } = pos.coords;
        const data = await fetchWeatherByCoords(lat, lon);
        setWeather(data);
      } catch {
        setError("Failed to fetch weather by location.");
      } finally {
        setLoading(false);
      }
    }, () => {
      setLoading(false);
      setError("Unable to access location. Allow location and try again.");
    });
  }

  return (
    <div className="container">
      <header>
        <h1>Weather Check</h1>
        <p>Search by city name or use your current location.</p>
      </header>

      <main>
        <div className="search-section">
          <div className="search-bar">
            <SearchBar onSearch={searchCity} />
          </div>
          <button className="use-location-btn" onClick={useMyLocation}>
            📍 Use My Location
          </button>
        </div>

        {loading && <Loader />}
        {error && <div className="error">{error}</div>}
        {weather && <WeatherCard data={weather} />}
      </main>

      <footer>
        Data provided by OpenWeatherMap. Developed by Bhargav Gol
      </footer>
    </div>
  );
}
