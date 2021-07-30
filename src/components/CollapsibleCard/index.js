import React, { useState } from "react";
import "./styles.scss";

const CollapsibleCard = ({ className, header, body }) => {
  const [showContentBody, setShowContentBody] = useState(false);

  return (
    <div className={`${className} card`}>
      <div className="card-header">
        <div>{header}</div>
        <div
          className="card-header-button"
          onClick={() => setShowContentBody(!showContentBody)}
        >
          {showContentBody ? "▲" : "▼"}
        </div>
      </div>
      {showContentBody ? <div className="card-body">{body}</div> : null}
    </div>
  );
};

export default CollapsibleCard;
