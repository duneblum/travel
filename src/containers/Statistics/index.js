import React, { useState } from "react";
import hotels from "../../../dist/hotels.json";
import restaurants from "../../../dist/restaurants.json";
import supermarkets from "../../../dist/supermarkets.json";
import FilterPanel from "../../components/FilterPanel";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import "./styles.scss";

const tagFilters = [
  "Chinese",
  "Dim Sum",
  "Cafe",
  "Hawaiian",
  "Bakery",
  "Japanese",
  "Hot Pot",
  "Chai",
  "Brunch",
  "American",
  "Sushi",
  "Juice",
  "Ramen",
  "Vegan",
  "Udon",
  "Seafood",
  "Vietnamese",
  "Portuguese",
  "Dessert",
  "Taiwanese",
  "Tea",
  "Pizza",
  "French",
  "German",
  "Tacos",
  "Mexican",
  "Greek",
  "Italian",
  "Burgers",
];

const entityMapping = {
  Hotels: hotels,
  Restaurants: restaurants,
  Supermarkets: supermarkets,
  Flights: {},
};

const sortFunction = (a, b) =>
  parseFloat(a.overall_rating.split("/")[0]) >
  parseFloat(b.overall_rating.split("/")[0])
    ? -1
    : 1;

const Statistics = () => {
  const [selectedEntity, setSelectedEntity] = useState("");
  const [filteredEntities, setFilteredEntities] = useState(null);
  const history = useHistory();

  // allow user to choose entity at start
  return (
    <div className="statistics">
      <FilterPanel
        selectedEntity={selectedEntity
          .toLowerCase()
          .substring(0, selectedEntity.length - 1)}
        entityList={entityMapping[selectedEntity]}
        setFilteredEntityList={setFilteredEntities}
      />
      <div className="statistics-body">
        <div className="entitySelection">
          {Object.keys(entityMapping).map((entity) => (
            <div
              onClick={() => {
                setSelectedEntity(entity);
                setFilteredEntities(entityMapping[entity]);
              }}
              className={classNames("entitySelection-item", {
                selected: selectedEntity === entity,
              })}
            >
              {entity}
            </div>
          ))}
        </div>
        {selectedEntity ? (
          <div>
            {selectedEntity === "Restaurants" && (
              <div>
                <h3>Top 5 Restaurants</h3>
                <div>
                  {filteredEntities
                    .sort(sortFunction)
                    .slice(0, 5)
                    .map((restaurant) => (
                      <div
                        className="link"
                        onClick={() =>
                          history.push(`/restaurant/${restaurant.id}`)
                        }
                      >{`${restaurant.name} - ${restaurant.city}`}</div>
                    ))}
                </div>
              </div>
            )}

            {selectedEntity === "Restaurants" && (
              <div>
                <h3>Bottom 5 Restaurants</h3>
                <div>
                  {filteredEntities
                    .sort(sortFunction)
                    .filter(
                      (restaurant) => restaurant.overall_rating.length > 1
                    )
                    .reverse()
                    .slice(0, 5)
                    .map((restaurant) => (
                      <div
                        className="link"
                        onClick={() =>
                          history.push(`/restaurant/${restaurant.id}`)
                        }
                      >{`${restaurant.name} - ${restaurant.city}`}</div>
                    ))}
                </div>
              </div>
            )}
            {selectedEntity === "Hotels" && (
              <div>
                <h3>Top 5 Hotels</h3>
                <div>
                  {filteredEntities
                    .sort(sortFunction)
                    .slice(0, 5)
                    .map((hotel) => (
                      <div
                        className="link"
                        onClick={() => history.push(`/hotel/${hotel.id}`)}
                      >{`${hotel.name} - ${hotel.city}`}</div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <h2>Select a category.</h2>
        )}
      </div>
    </div>
  );
};

export default Statistics;
