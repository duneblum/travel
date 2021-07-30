import React from "react";
import classNames from "classnames";
import "./styles.scss";

const PriceScale = ({ priceRating, optionCount }) => {
  return (
    <div className="priceScale">
      {[...Array(optionCount)].map((option, index) => (
        <div
          className={classNames("priceScale-option", {
            selected: priceRating >= index + 1,
          })}
        >
          {[...Array(index + 1)].map(() => "$").join("")}
        </div>
      ))}
    </div>
  );
};

export default PriceScale;
