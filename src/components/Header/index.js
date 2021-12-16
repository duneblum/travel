import React from "react";
import { useHistory } from "react-router-dom";

const HeaderOption = ({ route, name }) => {
  const history = useHistory();

  return (
    <div
      className="text-xl text-text-secondary px-2"
      onClick={() => history.push(route)}
    >
      <div className="cursor-pointer hover:text-text-primary">{name}</div>
    </div>
  );
};

const Header = () => {
  const history = useHistory();
  return (
    <div className="flex flex-row w-full justify-between items-center py-4 pl-8 bg-primary-background">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="text-3xl" onClick={() => history.push("/")}>
          <div className="flex items-center">
            <strong className="text-text-tertiary">bloo</strong>
            <span className="text-text-secondary pl-2">travel</span>
            <img src="src/www/assets/bloo_logo.png" />
          </div>
        </div>
        <div className="flex items-center pr-6">
          <HeaderOption route="/locations" name="Map" />
          <HeaderOption route="/hotels" name="Hotels" />
          <HeaderOption route="/restaurants" name="Restaurants" />
          <HeaderOption route="/supermarkets" name="Supermarkets" />
          <HeaderOption route="/trips" name="Trips" />
          <HeaderOption route="/statistics" name="Statistics" />
        </div>
      </div>
    </div>
  );
};

export default Header;
