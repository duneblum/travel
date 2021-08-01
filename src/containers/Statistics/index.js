import React, { useState } from "react";
import hotels from "../../../dist/hotels.json";
import restaurants from "../../../dist/restaurants.json";
import supermarkets from "../../../dist/supermarkets.json";
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
  (a.overall_rating.length === 6
    ? a.overall_rating.substring(0, 3)
    : a.overall_rating.charAt(0)) >
  (b.overall_rating.length === 6
    ? b.overall_rating.substring(0, 3)
    : b.overall_rating.charAt(0))
    ? -1
    : 1;

const Statistics = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState("");
  const history = useHistory();

  // allow user to choose entity at start
  return (
    <div className="statistics">
      <div className="filterPanel">
        <h2>Filters</h2>
        {selectedEntity ? (
          <>
            <h3>Cities</h3>
            {[
              ...new Set(
                entityMapping[selectedEntity].map(
                  (restaurant) => restaurant.city
                )
              ),
            ].map((city) => (
              <div
                className={classNames("filterPanel-item", {
                  selected: selectedFilter === city,
                })}
                onClick={() => {
                  if (selectedFilter === city) {
                    setSelectedFilter(null);
                    setFilteredRestaurants(restaurants);
                    setFilteredHotels(hotels);
                  } else {
                    setFilteredRestaurants(
                      restaurants.filter(
                        (restaurant) => restaurant.city === city
                      )
                    );
                    setFilteredHotels(
                      hotels.filter((hotel) => hotel.city === city)
                    );
                    setSelectedFilter(city);
                  }
                }}
              >
                {city}
              </div>
            ))}
            {selectedEntity === "Restaurants" && (
              <>
                <h3>Tags</h3>
                {tagFilters.sort().map((tag) => (
                  <div
                    className={classNames("filterPanel-item", {
                      selected: selectedFilter === tag,
                    })}
                    onClick={() => {
                      if (selectedFilter === tag) {
                        setSelectedFilter(null);
                        setFilteredRestaurants(restaurants);
                      } else {
                        setFilteredRestaurants(
                          restaurants.filter((restaurant) =>
                            restaurant.tags.includes(tag)
                          )
                        );
                        setSelectedFilter(tag);
                      }
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <h3>None</h3>
        )}
      </div>
      <div className="statistics-body">
        <div className="entitySelection">
          {Object.keys(entityMapping).map((entity) => (
            <div
              onClick={() => setSelectedEntity(entity)}
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
                  {filteredRestaurants
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
                  {filteredRestaurants
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
                  {filteredHotels
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
