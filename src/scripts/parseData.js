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
];

mkdirp("../../dist", (error) => error && console.log(error));

settings.forEach((setting) =>
  csvParser()
    .fromFile(setting.inFile)
    .then((json) => {
      json.forEach(
        (json) =>
          (json.id = `${json.name}-${json.city}`
            .replace(/\s+/g, "-")
            .toLowerCase())
      );
      fs.writeFile(
        setting.outFile,
        JSON.stringify(json),
        (error) => error && console.log(error)
      );
    })
);
