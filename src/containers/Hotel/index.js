import React from "react";
import hotels from "../../../dist/hotels.json";
import CollapsibleCard from "../../components/CollapsibleCard";
import { useParams } from "react-router-dom";
import SingleLocationMap from "../../components/SingleLocationMap";
import TagsList from "../../components/TagsList";
import "./styles.scss";

const Hotel = () => {
  const { id } = useParams();
  const hotel = hotels.find((hotel) => hotel.id === id);
  const stays = hotels.filter((hotel) => hotel.id === id);

  const formattedAddress = `${hotel.city}, ${hotel.state ?? hotel.country}`;

  const renderPrice = () => {
    const nightsStayed = Math.abs(
      (new Date(hotel.start_date).getTime() -
        new Date(hotel.end_date).getTime()) /
        (1000 * 3600 * 24)
    );
    if (hotel.total_price_dollars) {
      return (
        <div>
          <div>
            <strong>Total Price:</strong> {hotel.total_price_dollars}
          </div>
          <div>
            <strong>Price Per Night:</strong>{" "}
            {`$${Math.abs(
              Number(hotel.total_price_dollars.replace(/[^0-9.-]+/g, "")) /
                nightsStayed
            ).toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
          </div>
        </div>
      );
    } else if (hotel.total_price_points) {
      return (
        <div>
          <div>
            <strong>Total Price:</strong> {hotel.total_price_points} points
          </div>
          <div>
            <strong>Points Per Night:</strong>{" "}
            {Number(
              hotel.total_price_points.replace(/[^0-9.-]+/g, "") / nightsStayed
            ).toLocaleString("en-US")}{" "}
            points
          </div>
        </div>
      );
    }
    return <strong>Free Night Certificate</strong>;
  };

  return (
    <div className="restaurant">
      <div className="restaurant-header">
        <h1>{hotel.name}</h1>
        <div className="tags">
          <TagsList tags={hotel.tags.split(",")} />
        </div>
      </div>
      <div className="restaurant-details">
        <div className="orderSection">
          <div className="orderSection-rating">
            <div style={{ fontSize: "20px", paddingBottom: "0.25rem" }}>
              {hotel.overall_rating}
            </div>
            <div style={{ fontSize: "20px" }}>{formattedAddress}</div>
          </div>
          <h3>Visits</h3>
          {stays.map((stay) => (
            <CollapsibleCard
              header={<div>{`${stay.start_date} - ${stay.end_date}`}</div>}
              body={
                <div>
                  {renderPrice()}
                  <div>
                    <strong>{`${stay.room_type}${
                      stay.upgrade ? " (Upgrade)" : null
                    }`}</strong>
                  </div>
                  <div>{stay.notes}</div>
                  <h3>Ratings</h3>
                  <div className="hotel-rating-grid">
                    <div className="hotel-rating-grid-section">
                      <div>{`Room: ${stay.room}`}</div>
                      <div>{`Vibe: ${stay.vibe}`}</div>
                      <div>{`View: ${stay.view}`}</div>
                      <div>{`Service: ${stay.service}`}</div>
                    </div>
                    <div className="hotel-rating-grid-section">
                      <div>{`Gym: ${stay.gym}`}</div>
                      <div>{`Location: ${stay.location}`}</div>
                      <div>{`Food: ${stay.food}`}</div>
                    </div>
                  </div>
                </div>
              }
            />
          ))}
        </div>
        <div className="detailsSection">
          <div className="detailsSection-section">
            <h3>Brand</h3>
            <>{hotel.brand}</>
          </div>
          {hotel.category ? (
            <div className="detailsSection-section">
              <h3>Category</h3>
              <>{hotel.category}</>
            </div>
          ) : null}
          <div style={{ paddingBottom: "300px" }}>
            <h3>Map</h3>
            <SingleLocationMap
              name={hotel.name}
              address={`${hotel.street_address}, ${hotel.city}, ${
                hotel.state ?? hotel.country
              }`}
              coordinates={hotel.coordinates.split(", ")}
            />
          </div>
        </div>
      </div>
    </div>

    /*<div className="hotel">
      <h1 className="hotel-name">{hotel.name}</h1>
      <h3>{`${hotel.brand}${
        hotel.category && ` - Category ${hotel.category}`
      }`}</h3>
      <div className="hotel-tags">
        <TagsList tags={hotel.tags.split(",")} />
      </div>
      <h2>{formattedAddress}</h2>
      <div className="hotel-map">
        <SingleLocationMap
          name={hotel.name}
          address={formattedAddress}
          coordinates={hotel.coordinates.split(", ")}
        />
      </div>
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
      <h3>Stays</h3>
      <CollapsibleCard
        className="hotel-stays"
        header={<div>{`${hotel.start_date} - ${hotel.end_date}`}</div>}
        body={
          <div>
            {renderPrice()}
            <div>
              <strong>{`${hotel.room_type}${
                hotel.upgrade ? " (Upgrade)" : null
              }`}</strong>
            </div>
            <div>{hotel.notes}</div>
          </div>
        }
      />
    </div>*/
  );
};

export default Hotel;
