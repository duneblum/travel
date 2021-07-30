import React from "react";
import CollapsibleCard from "../../components/CollapsibleCard";
import restaurants from "../../../dist/restaurants.json";
import { useParams } from "react-router-dom";

import "./styles.scss";

const Restaurant = () => {
  const { id } = useParams();
  const restaurantVisits = restaurants.filter(
    (restaurant) => restaurant.id === id
  );
  const restaurant = restaurantVisits[0];
  const ordersByVisit = restaurantVisits.map((visit) => ({
    date_time: visit.date_time,
    orders: visit.orders.split(",").map((order) => order.split("(")),
  }));

  return (
    <div className="restaurant">
      <h1 className="restaurant-name">{restaurant.name}</h1>
      <h2>{`${restaurant.street_address} ${restaurant.city}, ${
        restaurant.state ?? restaurant.country
      }`}</h2>
      <h3>Overall</h3>
      <div className="restaurant-overall">
        <div>{restaurant.overall_notes}</div>
        <strong>Rating: {restaurant.overall_rating}</strong>
      </div>
      <h3>Visits</h3>
      <div className="restaurant-visits">
        {ordersByVisit.map((visit) => (
          <CollapsibleCard
            className={"restaurant-visits-visit"}
            header={new Date(visit.date_time).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
            body={visit.orders.map((order) => (
              <div>
                <div>{`Item: ${order[0]?.replace(")", "")}`}</div>
                {order.length > 2 ? (
                  <div>{`Notes: ${order[1]?.replace(")", "")}`}</div>
                ) : (
                  <div>{`Rating: ${order[1]?.replace(")", "")}`}</div>
                )}
                {order.length > 2 ? (
                  <div>{`Rating: ${order[2]?.replace(")", "")}`}</div>
                ) : null}
              </div>
            ))}
          />
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
