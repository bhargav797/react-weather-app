// src/components/WeatherCard.jsx
import React from "react";
import { getIconUrl } from "../api/weather";
import { capitalize } from "../utils/format";

export default function WeatherCard({ data }) {
  if (!data) return null;

  const {
    name,
    sys,
    main: { temp, humidity, feels_like },
    weather,
    wind: { speed },
  } = data;

  const w = weather && weather[0];

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div>
          <h2>{name}{sys && sys.country ? `, ${sys.country}` : ""}</h2>
          <div style={{ color: "#666", marginTop: 4 }}>
            {w ? capitalize(w.description) : ""}
          </div>
        </div>

        <div className="weather-info">
          {w && <img src={getIconUrl(w.icon)} alt={w.main} width={60} height={60} />}
          <div>
            <div className="weather-temp">{Math.round(temp)}°C</div>
            <div style={{ fontSize: 12, color: "#666" }}>Feels like {Math.round(feels_like)}°C</div>
          </div>
        </div>
      </div>

      <hr style={{ margin: "12px 0" }} />

      <div className="weather-details">
        <div>
          <div style={{ fontSize: 12, color: "#666" }}>Humidity</div>
          <div>{humidity}%</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#666" }}>Wind</div>
          <div>{speed} m/s</div>
        </div>
      </div>
    </div>
  );
}
