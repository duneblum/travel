import React from "react";
import trips from "../../../dist/trips.json";
import "./styles.scss";

const Trips = () => {
  return (
    <>
      <div className="header">
        <div>Locations</div>
        <div>Dates</div>
        <div>Duration</div>
      </div>
      {trips.map((trip) => (
        <div className="trip">
          <div>{trip.cities.split(",")}</div>
          <div>{`${trip.start_date}-${trip.end_date}`}</div>
          <div>{trip.cities.split(",")}</div>
        </div>
      ))}
    </>
  );
};

export default Trips;
