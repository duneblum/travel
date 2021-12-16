import React from "react";
import "./styles.scss";

const OrderBox = ({ orderName, orderDescription, orderRating }) => {
  return (
    <div className="orderBox">
      <strong className="orderBox-name">{orderName}</strong>
      <div className="orderBox-description">{orderDescription}</div>
      <div>{orderRating}</div>
    </div>
  );
};

export default OrderBox;
