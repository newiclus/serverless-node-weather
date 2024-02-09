import http from "http";
import express from "express";

import { PORT } from "./common/constants.mjs";
import { getCities } from "./modules/geo_cities.mjs";
import { getWeatherForCities } from "./modules/weather.mjs";
import { normalizePort, onError } from "./common/utils.mjs";


const app = express();
const port = normalizePort(PORT);

async function saveCities() {
  const cities = await getCities();
  app.set("cities", cities);

  return cities;
}

app.get("/", async (req, res) => {
  const cities = req.app.get("cities") || (await saveCities());
  const weather = await getWeatherForCities(cities);

  res.status(200);
  res.json(weather);
});

app.set('port', port);

const server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.debug('Listening on ' + bind);
}
