import React from "react";
import "./styles.scss";

const Hotel = ({ location }) => {
  const paths = window.location.hash.split("/");
  const id = paths[paths.length - 1];
  const hotel = location.state;

  return (
    <div className="hotel">
      <h1 className="hotel-name">{hotel.name}</h1>
      <h2>{`${hotel.street_address} ${hotel.city}, ${
        hotel.state ?? hotel.country
      }`}</h2>
      <h3>Stays:</h3>
      <div>{`${hotel.start_date} - ${hotel.end_date}`}</div>
      <div>{hotel.notes}</div>
      <div className="hotel-rating">
        <h3>Ratings</h3>
        <div className="hotel-rating-grid">
          <div className="hotel-rating-grid-section">
            <div>{`Room: ${hotel.room}`}</div>
            <div>{`Vibe: ${hotel.vibe}`}</div>
            <div>{`View: ${hotel.view}`}</div>
            <div>{`Service: ${hotel.service}`}</div>
          </div>
          <div className="hotel-rating-grid-section">
            <div>{`Gym: ${hotel.gym}`}</div>
            <div>{`Location: ${hotel.location}`}</div>
            <div>{`Food: ${hotel.food}`}</div>
          </div>
        </div>
        <h4>{`Overall Rating: ${hotel.overall_rating}`}</h4>
      </div>
    </div>
  );
};

export default Hotel;
