const csvParser = require("csvtojson");
const fs = require("fs");
const mkdirp = require("mkdirp");

const settings = [
  {
    inFile: "./www/restaurants.csv",
    outFile: "../../dist/restaurants.json",
  },
  {
    inFile: "./www/hotels.csv",
    outFile: "../../dist/hotels.json",
  },
  {
    inFile: "./www/supermarkets.csv",
    outFile: "../../dist/supermarkets.json",
  },
  {
    inFile: "./www/flights.csv",
    outFile: "../../dist/flights.json",
  },
  {
    inFile: "./www/trips.csv",
    outFile: "../../dist/trips.json",
  },
];

mkdirp("../../dist", (error) => error && console.log(error));

settings.forEach((setting) =>
  csvParser()
    .fromFile(setting.inFile)
    .then((json) => {
      json.forEach((json) =>
        (
          json.trip_number ||
          (json.id = json.carrier
            ? `${json.carrier}-${json.flight_number}`
            : `${json.name}-${json.city}`)
        )
          .replace(/\s+/g, "-")
          .toLowerCase()
      );
      fs.writeFile(
        setting.outFile,
        JSON.stringify(json),
        (error) => error && console.log(error)
      );
    })
);
