import React from "react";
import hotels from "../../../dist/hotels.json";
import restaurants from "../../../dist/restaurants.json";
import supermarkets from "../../../dist/supermarkets.json";
import { useHistory } from "react-router-dom";
import "./styles.scss";

const Statistics = () => {
  const history = useHistory();

  return (
    <div className="statistics">
      <h3>Top 5 Restaurants</h3>
      <div>
        {restaurants
          .sort((a, b) =>
            (a.overall_rating.length === 6
              ? a.overall_rating.substring(0, 3)
              : a.overall_rating.charAt(0)) >
            (b.overall_rating.length === 6
              ? b.overall_rating.substring(0, 3)
              : b.overall_rating.charAt(0))
              ? -1
              : 1
          )
          .slice(0, 5)
          .map((restaurant) => (
            <div
              className="link"
              onClick={() => history.push(`/restaurant/${restaurant.id}`)}
            >{`${restaurant.name} - ${restaurant.city}`}</div>
          ))}
      </div>

      <h3>Bottom 5 Restaurants</h3>
      <div>
        {restaurants
          .sort((a, b) =>
            (a.overall_rating.length === 6
              ? a.overall_rating.substring(0, 3)
              : a.overall_rating.charAt(0)) >
            (b.overall_rating.length === 6
              ? b.overall_rating.substring(0, 3)
              : b.overall_rating.charAt(0))
              ? 1
              : -1
          )
          .filter((restaurant) => restaurant.overall_rating.length > 1)
          .slice(0, 5)
          .map((restaurant) => (
            <div
              className="link"
              onClick={() => history.push(`/restaurant/${restaurant.id}`)}
            >{`${restaurant.name} - ${restaurant.city}`}</div>
          ))}
      </div>

      <h3>Top 5 Hotels</h3>
      <div>
        {hotels
          .sort((a, b) =>
            (a.overall_rating.length === 5
              ? a.overall_rating.substring(0, 3)
              : a.overall_rating.charAt(0)) >
            (b.overall_rating.length === 5
              ? b.overall_rating.substring(0, 3)
              : b.overall_rating.charAt(0))
              ? -1
              : 1
          )
          .slice(0, 5)
          .map((hotel) => (
            <div
              className="link"
              onClick={() => history.push(`/hotel/${hotel.id}`)}
            >{`${hotel.name} - ${hotel.city}`}</div>
          ))}
      </div>
    </div>
  );
};

export default Statistics;
