import React from "react";
import { useParams } from "react-router-dom";
import flights from "../../../dist/flights.json";
import "./styles.scss";

const Flight = () => {
  const { id } = useParams();
  const flight = flights.find((flight) => flight.id === id);

  return (
    <div className="flight">
      <h1>{`${flight.carrier} Flight ${flight.flight_number}`}</h1>
      <div className="flightCard">
        <div className="flightCard-body">
          <h3>Origin</h3>
          <div>{flight.origin_city}</div>
        </div>
        <div className="flightCard-body">
          <h3>Destination</h3>
          <div>{flight.destination_city}</div>
        </div>
      </div>
    </div>
  );
};

export default Flight;
