import fetch from 'node-fetch';

import { getDateFromSeconds } from "../common/utils.mjs";
import {
  API_KEY,
  API_WEATHER,
  LIMIT_DAYS,
  UNITS,
} from "../common/constants.mjs";

function parseOpenWeatherObject(openWeatherObject) {
  const { city, list } = openWeatherObject;
  return {
    [city.name]: list.map((day) => ({
      date: getDateFromSeconds(day.dt),
      temperature: day.temp.day,
      description: day.weather[0].description,
    })),
  };
}

function formatWeatherArray(weatherForCities) {
  return weatherForCities.reduce((acc, weather) => {
    const [city] = Object.keys(weather);
    const weatherForCity = weather[city];

    return {
      ...acc,
      [city]: weatherForCity,
    };
  }, {});
}

async function getWeatherForCity(city) {
  if (!city) {
    console.error("City is required");
    return null;
  }

  // Docs: https://openweathermap.org/forecast16#limit (5 days)
  const url = `${API_WEATHER}?q=${city}&cnt=${LIMIT_DAYS}&units=${UNITS}&appid=${API_KEY}`;
  const response = await fetch(url);
  const weatherObject = await response.json();

  return parseOpenWeatherObject(weatherObject);
}

async function getWeatherForCities(cities) {
  const weatherForCities = await Promise.all(
    cities.map((city) => {
      return getWeatherForCity(city);
    })
  );

  return formatWeatherArray(weatherForCities);
}

export {
  getWeatherForCity,
  getWeatherForCities,
};
