import React from "react";
import "./styles.scss";

const ScoreBox = ({ rating }) => {
  return <div className="scorebox">{rating}</div>;
};

export default ScoreBox;
