import React, { useState, useEffect } from "react";
import CollapsibleCard from "../../components/CollapsibleCard";
import Scorebox from "../../components/Scorebox";
import restaurants from "../../../dist/restaurants.json";
import PriceScale from "../../components/PriceScale";
import SingleLocationMap from "../../components/SingleLocationMap";
import { useParams } from "react-router-dom";
import TagsList from "../../components/TagsList";

import "./styles.scss";

const Restaurant = () => {
  const { id } = useParams();
  const restaurantVisits = restaurants.filter(
    (restaurant) => restaurant.id === id
  );
  const restaurant = restaurantVisits[0];
  const ordersByVisit = restaurantVisits.map((visit) => ({
    date_time: visit.date_time,
    orders: visit.orders.split(";").map((order) => {
      const noteStartPosition = order.indexOf("(");
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
      <PriceScale
        priceRating={Number(restaurant.price_scale.charAt(0))}
        optionCount={Number(restaurant.price_scale.charAt(2))}
      />
      <h1 className="restaurant-name">{restaurant.name}</h1>
      <div className="restaurant-tags">
        <TagsList tags={restaurant.tags.split(",")} />
      </div>
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
            body={
              <div>
                <h3>Order</h3>
                {visit.orders.map((order) => (
                  <div className="order">
                    <div>{`Item: ${order?.item}`}</div>
                    {order?.notes ? (
                      <div>{`Notes: ${order?.notes}`} </div>
                    ) : null}
                    <div>{`Rating: ${
                      order?.review === "/10"
                        ? ordersByVisit.map((visit) =>
                            visit.orders.find(
                              (searchOrder) => searchOrder.item === order.item
                            )
                          )[0]?.review
                        : order.review
                    }`}</div>
                  </div>
                ))}
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
