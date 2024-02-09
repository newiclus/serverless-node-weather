import "dotenv/config";

const PORT = process.env.PORT || 3000;
const CSV_LOCATIONS_URL = process.env.CSV_LOCATIONS_URL || "";
const API_KEY = process.env.WEATHER_API_KEY || "";
const API_GEO_LOCATION = "https://api.openweathermap.org/geo/1.0/direct";
const API_WEATHER = "https://api.openweathermap.org/data/2.5/forecast/daily";
const LIMIT_DAYS = 5;
const UNITS = "metric";

export {
  API_KEY,
  API_GEO_LOCATION,
  API_WEATHER,
  CSV_LOCATIONS_URL,
  LIMIT_DAYS,
  UNITS,
  PORT,
};
