import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [temp, setTemp] = useState("");

  const [isActive, setIsActive] = useState(false);
  const [activeBtn, setActiveBtn] = useState("");

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);

      setWeather(data);
      setQuery("");
    }
  };

  const convertToCelcius = (farenheit) => {
    return Math.round((farenheit - 32) * (5 / 9));
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
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="city__temp">
            {!temp ? Math.round(weather.main.temp) : temp}
            <sup>
              <button
                id="farenheit"
                className={isActive ? "farenheit-btn active" : "farenheit-btn"}
                onClick={() => {
                  setTemp(Math.round(weather.main.temp));
                  setIsActive(true);
                }}
              >
                &deg;F
              </button>
              <span>|</span>
              <button
                id="celcius"
                className={isActive ? "celcius-btn active" : "celcius-btn"}
                onClick={() => {
                  setTemp(convertToCelcius(weather.main.temp));
                  setIsActive(true);
                }}
              >
                &deg;C
              </button>
            </sup>
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
