import React, { useState, useEffect } from "react";
import CollapsibleCard from "../../components/CollapsibleCard";
import Scorebox from "../../components/Scorebox";
import restaurants from "../../../dist/restaurants.json";
import PriceScale from "../../components/PriceScale";
import SingleLocationMap from "../../components/SingleLocationMap";
import { useParams } from "react-router-dom";

import "./styles.scss";

const Restaurant = () => {
  const { id } = useParams();
  const restaurantVisits = restaurants.filter(
    (restaurant) => restaurant.id === id
  );
  const restaurant = restaurantVisits[0];
  console.log(restaurant);
  const ordersByVisit = restaurantVisits.map((visit) => ({
    date_time: visit.date_time,
    orders: visit.orders.split(";").map((order) => {
      console.log(order);
      const noteStartPosition = order.indexOf("(");
      console.log(noteStartPosition);
      const noteEndPosition = order.indexOf(")");
      const ratingStartPosition = order.indexOf("[");
      const ratingEndPosition = order.indexOf("]");
      return {
        item:
          noteStartPosition !== -1
            ? order.substring(0, noteStartPosition)
            : order.substring(0, ratingStartPosition),
        notes:
          noteStartPosition !== -1
            ? order.substring(noteStartPosition + 1, noteEndPosition)
            : null,
        review: order.substring(ratingStartPosition + 1, ratingEndPosition),
      };
    }),
  }));

  return (
    <div className="restaurant">
      <PriceScale priceRating={restaurant.price_scale} optionCount={4} />
      <h1 className="restaurant-name">{restaurant.name}</h1>
      <h2>{`${restaurant.street_address} ${restaurant.city}, ${
        restaurant.state ?? restaurant.country
      }`}</h2>
      <div className="restaurant-map">
        <SingleLocationMap
          name={restaurant.name}
          address={`${restaurant.street_address}, ${restaurant.city}, ${
            restaurant.state ?? restaurant.country
          }`}
        />
      </div>
      <h3>Overall</h3>
      <div className="restaurant-overall">
        <Scorebox rating={restaurant.overall_rating} />{" "}
        <div className="restaurant-notes">{restaurant.overall_notes}</div>
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
                <div>{`Item: ${order?.item.replace(")", "")}`}</div>
                {order?.notes ? (
                  <div>{`Notes: ${order?.notes.replace(")", "")}`} </div>
                ) : null}
                <div>{`Review: ${order?.review.replace(")", "")}`}</div>
              </div>
            ))}
          />
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
