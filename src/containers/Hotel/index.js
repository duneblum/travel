import React from "react";
import hotels from "../../../dist/hotels.json";
import { useParams } from "react-router-dom";
import SingleLocationMap from "../../components/SingleLocationMap";
import "./styles.scss";

const Hotel = () => {
  const { id } = useParams();
  const hotel = hotels.find((hotel) => hotel.id === id);
  const formattedAddress = `${hotel.street_address}, ${hotel.city}, ${
    hotel.state ?? hotel.country
  }`;

  return (
    <div className="hotel">
      <h1 className="hotel-name">{hotel.name}</h1>
      <h2>{formattedAddress}</h2>
      <div className="hotel-map">
        <SingleLocationMap name={hotel.name} address={formattedAddress} />
      </div>
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
