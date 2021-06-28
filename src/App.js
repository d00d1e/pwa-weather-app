import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);

      console.log(data);

      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Enter City or Zip Code..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />

      {weather.main && (
        <div className="city">
          <h2 className="city__name">
            <span>
              {weather.name}, {weather.sys.country}
            </span>
          </h2>
          <div className="city__temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;F</sup>
          </div>
          <div className="info">
            <img
              className="city__icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
