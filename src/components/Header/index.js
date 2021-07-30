import React from "react";
import "./styles.scss";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  return (
    <div className="header">
      <div className="header-item" onClick={() => history.push("/")}>
        Home
      </div>
      <div className="header-item" onClick={() => history.push("/locations")}>
        Locations
      </div>
      <div className="header-item" onClick={() => history.push("/hotels")}>
        Hotels
      </div>
      <div className="header-item" onClick={() => history.push("/restaurants")}>
        Restaurants
      </div>
      <div
        className="header-item"
        onClick={() => history.push("/supermarkets")}
      >
        Supermarkets
      </div>
      <label className="header-label">Search</label>
      <input className="header-searchbox"></input>
    </div>
  );
};

export default Header;
