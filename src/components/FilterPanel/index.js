import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./styles.scss";

const restaurantTagFilters = [
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

const supermarketTagFilters = ["Japanese", "Korean"];

const hotelTagFilters = ["Resort", "Ocean", "City"];

const hotelBrandFilters = ["Hilton", "Hyatt", "Marriott", "Other"];

const getTagFilters = (selectedEntity) => {
  switch (selectedEntity) {
    case "restaurant":
      return restaurantTagFilters;
    case "hotel":
      return hotelTagFilters;
    case "supermarket":
      return supermarketTagFilters;
    default:
      return [];
  }
};

const filterByTags = (entityList, selectedTagFilters) => {
  if (selectedTagFilters.length === 0) {
    return entityList;
  }
  return entityList.filter((entity) =>
    selectedTagFilters.find((selectedTag) =>
      entity.tags.split(", ").includes(selectedTag)
    )
  );
};

const filterByCities = (entityList, selectedCityFilters) => {
  if (selectedCityFilters.length === 0) {
    return entityList;
  }
  return entityList.filter((entity) =>
    selectedCityFilters.find((selectedCity) => entity.city === selectedCity)
  );
};

const filterByOriginCities = (entityList, selectedOriginCityFilters) => {
  if (selectedOriginCityFilters.length === 0) {
    return entityList;
  }
  return entityList.filter((entity) =>
    selectedOriginCityFilters.find(
      (selectedCity) => entity.origin_city === selectedCity
    )
  );
};

const filterByDestinationCities = (
  entityList,
  selectedDestinationCityFilters
) => {
  if (selectedDestinationCityFilters.length === 0) {
    return entityList;
  }
  return entityList.filter((entity) =>
    selectedDestinationCityFilters.find(
      (selectedCity) => entity.destination_city === selectedCity
    )
  );
};

const filterByBrands = (entityList, selectedBrandFilters) => {
  if (selectedBrandFilters.length === 0) {
    return entityList;
  }
  return entityList.filter((entity) =>
    selectedBrandFilters.find((selectedBrand) => entity.brand === selectedBrand)
  );
};

const filterByCarriers = (entityList, selectedCarrierFilters) => {
  if (selectedCarrierFilters.length === 0) {
    return entityList;
  }
  return entityList.filter((entity) =>
    selectedCarrierFilters.find(
      (selectedCarrier) => entity.carrier === selectedCarrier
    )
  );
};

const getFilteredFlightList = (
  selectedOriginCityFilters,
  selectedDestinationCityFilters,
  selectedCarrierFilters,
  entityList
) => {
  return filterByCarriers(
    filterByOriginCities(
      filterByDestinationCities(entityList, selectedOriginCityFilters),
      selectedDestinationCityFilters
    ),
    selectedCarrierFilters
  );
};

const getFilteredList = (
  selectedTagFilters,
  selectedCityFilters,
  selectedBrandFilters,
  entityList
) => {
  return filterByBrands(
    filterByCities(
      filterByTags(entityList, selectedTagFilters),
      selectedCityFilters
    ),
    selectedBrandFilters
  );
};

const FilterPanel = ({ selectedEntity, entityList, setFilteredEntityList }) => {
  const [selectedTagFilters, setSelectedTagFilters] = useState([]);
  const [selectedCityFilters, setSelectedCityFilters] = useState([]);
  const [selectedBrandFilters, setSelectedBrandFilters] = useState([]);
  const [selectedCarrierFilters, setSelectedCarrierFilters] = useState([]);
  const [selectedOriginCityFilters, setSelectedOriginCityFilters] = useState(
    []
  );
  const [selectedDestinationCityFilters, setSelectedDestinationCityFilters] =
    useState([]);

  useEffect(() => {
    if (
      selectedEntity === "flight" &&
      (selectedCarrierFilters !== 0 ||
        selectedOriginCityFilters !== 0 ||
        selectedDestinationCityFilters !== 0)
    ) {
      setFilteredEntityList(
        getFilteredFlightList(
          selectedOriginCityFilters,
          selectedDestinationCityFilters,
          selectedCarrierFilters,
          entityList
        )
      );
    } else if (
      selectedTagFilters.length !== 0 ||
      selectedCityFilters.length !== 0 ||
      selectedBrandFilters.length !== 0
    ) {
      setFilteredEntityList(
        getFilteredList(
          selectedTagFilters,
          selectedCityFilters,
          selectedBrandFilters,
          entityList
        )
      );
    } else {
      setFilteredEntityList(entityList);
    }
  }, [
    selectedCityFilters,
    selectedTagFilters,
    selectedBrandFilters,
    selectedCarrierFilters,
    selectedOriginCityFilters,
    selectedDestinationCityFilters,
    selectedEntity,
    entityList,
  ]);

  return (
    <div className="filterPanel">
      <h2>Filters</h2>
      {selectedEntity && selectedEntity === "flight" && (
        <>
          <h3>Airlines</h3>
          {[...new Set(entityList.map((entity) => entity.carrier))].map(
            (carrier) => (
              <div
                className={classNames("filterPanel-item", {
                  selected: selectedCarrierFilters.includes(carrier),
                })}
                onClick={() => {
                  if (selectedCarrierFilters.includes(carrier)) {
                    setSelectedCarrierFilters(
                      selectedCarrierFilters.filter(
                        (selectedFilter) => selectedFilter !== carrier
                      )
                    );
                  } else {
                    setSelectedCarrierFilters([
                      ...selectedCarrierFilters,
                      carrier,
                    ]);
                  }
                }}
              >
                {carrier}
              </div>
            )
          )}
          <h3>Origin Cities</h3>
          {[...new Set(entityList.map((entity) => entity.origin_city))].map(
            (city) => (
              <div
                className={classNames("filterPanel-item", {
                  selected: selectedOriginCityFilters.includes(city),
                })}
                onClick={() => {
                  if (selectedOriginCityFilters.includes(city)) {
                    setSelectedOriginCityFilters(
                      selectedOriginCityFilters.filter(
                        (selectedFilter) => selectedFilter !== city
                      )
                    );
                  } else {
                    setSelectedOriginCityFilters([
                      ...selectedOriginCityFilters,
                      city,
                    ]);
                  }
                }}
              >
                {city}
              </div>
            )
          )}
          <h3>Destination Cities</h3>
          {[
            ...new Set(entityList.map((entity) => entity.destination_city)),
          ].map((city) => (
            <div
              className={classNames("filterPanel-item", {
                selected: selectedDestinationCityFilters.includes(city),
              })}
              onClick={() => {
                if (selectedDestinationCityFilters.includes(city)) {
                  setSelectedDestinationCityFilters(
                    selectedDestinationCityFilters.filter(
                      (selectedFilter) => selectedFilter !== city
                    )
                  );
                } else {
                  setSelectedDestinationCityFilters([
                    ...selectedDestinationCityFilters,
                    city,
                  ]);
                }
              }}
            >
              {city}
            </div>
          ))}
        </>
      )}
      {selectedEntity && selectedEntity !== "flight" && (
        <>
          <h3>Cities</h3>
          {[...new Set(entityList.map((entity) => entity.city))].map((city) => (
            <div
              className={classNames("filterPanel-item", {
                selected: selectedCityFilters.includes(city),
              })}
              onClick={() => {
                if (selectedCityFilters.includes(city)) {
                  setSelectedCityFilters(
                    selectedCityFilters.filter(
                      (selectedFilter) => selectedFilter !== city
                    )
                  );
                } else {
                  setSelectedCityFilters([...selectedCityFilters, city]);
                }
              }}
            >
              {city}
            </div>
          ))}
          <h3>Tags</h3>
          {getTagFilters(selectedEntity)
            .sort()
            .map((tag) => (
              <div
                className={classNames("filterPanel-item", {
                  selected: selectedTagFilters.includes(tag),
                })}
                onClick={() => {
                  if (selectedTagFilters.includes(tag)) {
                    setSelectedTagFilters(
                      selectedTagFilters.filter(
                        (selectedFilter) => selectedFilter !== tag
                      )
                    );
                  } else {
                    setSelectedTagFilters([...selectedTagFilters, tag]);
                  }
                }}
              >
                {tag}
              </div>
            ))}
          {selectedEntity === "hotel" ? (
            <>
              <h3>Brands</h3>
              {hotelBrandFilters.sort().map((brand) => (
                <div
                  className={classNames("filterPanel-item", {
                    selected: selectedBrandFilters.includes(brand),
                  })}
                  onClick={() => {
                    if (selectedBrandFilters.includes(brand)) {
                      setSelectedBrandFilters(
                        selectedBrandFilters.filter(
                          (selectedFilter) => selectedFilter !== brand
                        )
                      );
                    } else {
                      setSelectedBrandFilters([...selectedBrandFilters, brand]);
                    }
                  }}
                >
                  {brand}
                </div>
              ))}
            </>
          ) : null}
        </>
      )}
      {!selectedEntity && <h3>None</h3>}
    </div>
  );
};

export default FilterPanel;
