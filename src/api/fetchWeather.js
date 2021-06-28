import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (query) => {
  const { data } = await axios.get(
    `${URL}?q=${query}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
  );

  return data;
};
