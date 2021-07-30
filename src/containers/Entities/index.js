import React from "react";
import hotels from "../../../dist/hotels.json";
import restaurants from "../../../dist/restaurants.json";
import supermarkets from "../../../dist/supermarkets.json";
import CollapsibleCard from "../../components/CollapsibleCard";
import { useHistory } from "react-router-dom";
import "./styles.scss";

const Entities = ({ type }) => {
  const history = useHistory();

  const getOrderedEntitiesByCity = () => {
    const orderEntitiesByCity = (entityList) => {
      const dictionary = {};
      entityList.forEach((entity) => {
        if (dictionary[entity.city]) {
          if (!dictionary[entity.city].find((entry) => entry.id === entity.id))
            dictionary[entity.city].push(entity);
        } else {
          dictionary[entity.city] = Array.of(entity);
        }
      });
      return dictionary;
    };

    switch (type) {
      case "hotel":
        return orderEntitiesByCity(hotels);
      case "restaurant":
        return orderEntitiesByCity(restaurants);
      case "supermarket":
        return orderEntitiesByCity(supermarkets);
      default:
        return [];
    }
  };

  const renderEntities = (entitiesByCity) => {
    const cities = Object.keys(entitiesByCity);
    return cities.map((city) => (
      <div key="city" className="entity">
        <CollapsibleCard
          header={<div>{city}</div>}
          body={entitiesByCity[city].map((entity) => (
            <div
              key={entity.id}
              className="entity-item"
              onClick={() => history.push(`/${type}/${entity.id}`, entity)}
            >
              {entity.name}
            </div>
          ))}
        />
      </div>
    ));
  };

  return (
    <div className="entities">
      <h1>Cities</h1>
      {renderEntities(getOrderedEntitiesByCity())}
    </div>
  );
};

export default Entities;
