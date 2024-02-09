import { parse } from "csv-parse/sync";

function getJSONFromCSV(csv, options = {}) {
  return parse(csv, {
    columns: true,
    delimiter: ",",
    trim: true,
    ...options,
  });
}

export {
  getJSONFromCSV,
};
