import fetch from 'node-fetch';

import { CSV_LOCATIONS_URL } from "../common/constants.mjs";
import { getJSONFromCSV } from "../common/csv_to_json.mjs";

async function getCities() {
  const csvLocations = await fetch(CSV_LOCATIONS_URL).then((res) => res.text());
  return getJSONFromCSV(csvLocations).map((city) => city.Location);
}

export {
  getCities,
};
