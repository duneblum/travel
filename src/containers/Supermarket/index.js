import React from "react";
import supermarkets from "../../../dist/supermarkets.json";
import PriceScale from "../../components/PriceScale";
import Scorebox from "../../components/ScoreBox";
import SingleLocationMap from "../../components/SingleLocationMap";
import TagsList from "../../components/TagsList";
import isEqual from "lodash/isEqual";

import { useParams } from "react-router-dom";
import "./styles.scss";

const Supermarket = () => {
  const { id } = useParams();
  const supermarket = supermarkets.find((supermarket) =>
    isEqual(supermarket.id, id)
  );
  const formattedAddress = `${supermarket.street_address} ${
    supermarket.city
  }, ${supermarket.state ?? supermarket.country}`;

  return (
    <div className="supermarket">
      <PriceScale priceRating={supermarket.price_scale} optionCount={4} />
      <h1>{supermarket.name}</h1>
      <div className="supermarket-tags">
        <TagsList tags={supermarket.tags.split(",")} />
      </div>
      <h2>{formattedAddress}</h2>
      <div className="supermarket-map">
        <SingleLocationMap
          name={supermarket.name}
          address={formattedAddress}
          coordinates={supermarket.coordinates.split(", ")}
        />
      </div>
      <div className="supermarket-overall">
        <Scorebox rating={supermarket.overall_rating} />
      </div>
      <div className="supermarket-notes">{supermarket.notes}</div>
    </div>
  );
};

export default Supermarket;
