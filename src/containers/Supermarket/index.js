import React from "react";
import supermarkets from "../../../dist/supermarkets.json";
import { useParams } from "react-router-dom";
import "./styles.scss";

const Supermarket = () => {
  const { id } = useParams();
  const supermarket = supermarkets.find((supermarket) => supermarket.id === id);

  return (
    <div>
      <h2>{supermarket.name}</h2>
    </div>
  );
};

export default Supermarket;
