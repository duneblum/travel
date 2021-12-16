import React, { useState } from "react";
import hotels from "../../../dist/hotels.json";
import restaurants from "../../../dist/restaurants.json";
import supermarkets from "../../../dist/supermarkets.json";
import flights from "../../../dist/flights.json";
import FilterPanel from "../../components/FilterPanel";
import TagsList from "../../components/TagsList";
import { useHistory } from "react-router-dom";
import "./styles.scss";

const Entities = ({ type }) => {
  const history = useHistory();

  const getEntityList = () => {
    switch (type) {
      case "hotel":
        return hotels;
      case "restaurant":
        return restaurants;
      case "supermarket":
        return supermarkets;
      case "flight":
        return flights;
      default:
        return [];
    }
  };

  const formatEntityString = () => {
    switch (type) {
      case "hotel":
        return "Hotels";
      case "restaurant":
        return "Restaurants";
      case "supermarket":
        return "Supermarkets";
      case "flight":
        return "Flights";
      default:
        return [];
    }
  };

  const [filteredEntities, setFitleredEntities] = useState(getEntityList());

  const listWithoutDuplicates = () => {
    const duplicateFreeList = [];
    filteredEntities.forEach((entity) => {
      if (!duplicateFreeList.find((entry) => entry.id === entity.id))
        duplicateFreeList.push(entity);
    });
    return duplicateFreeList;
  };

  return (
    <div className="entities">
      <FilterPanel
        selectedEntity={type}
        entityList={getEntityList()}
        setFilteredEntityList={setFitleredEntities}
      />
      <div className="entities-body">
        <h2>{formatEntityString()}</h2>
        <strong className="entities-selected">{`${
          listWithoutDuplicates().length
        } selected`}</strong>
        <div className="entities-list">
          {listWithoutDuplicates()
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((entity) => (
              <div className="entity-wrapper">
                <div
                  key={entity.id}
                  className="entity-item"
                  onClick={() => history.push(`/${type}/${entity.id}`, entity)}
                >
                  {entity.carrier
                    ? `${entity.carrier} ${entity.flight_number}`
                    : entity.name}
                </div>
                {entity.tags?.length > 1 ? (
                  <TagsList tags={entity.tags.split(",")} />
                ) : null}
                {entity.carrier ? (
                  <TagsList
                    tags={[
                      `Origin: ${entity.origin_city}`,
                      `Destination: ${entity.destination_city}`,
                    ]}
                  />
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Entities;
