import React from "react";
import { Route, Switch } from "react-router-dom";
import Entities from "./containers/Entities";
import Hotel from "../src/Containers/Hotel";
import Locations from "./containers/Locations";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Home from "../src/containers/Home";
import Restaurant from "../src/Containers/Restaurant";
import Supermarket from "../src/Containers/Supermarket";
import Flight from "../src/Containers/Flight";
import Statistics from "../src/Containers/Statistics";
import Trips from "../src/Containers/Trips";

import "./styles.scss";

const Page = (props) => {
  return (
    <div className="pageWrapper">
      <Header />
      <div className="pageWrapper-route">
        <Route {...props} />
      </div>
      <Footer />
    </div>
  );
};

const Routes = () => {
  return (
    <Switch>
      <Page path="/" exact render={() => <Home />} />
      <Page path="/restaurants" render={() => <Entities type="restaurant" />} />
      <Page path="/restaurant/:id" component={Restaurant} />
      <Page
        path="/supermarkets"
        render={() => <Entities type="supermarket" />}
      />
      <Page path="/supermarket/:id" component={Supermarket} />
      <Page path="/hotels" render={() => <Entities type="hotel" />} />
      <Page path="/hotel/:id" component={Hotel} />
      <Page path="/statistics" component={Statistics} />
      <Page path="/locations" component={Locations} />
      <Page path="/flights" render={() => <Entities type="flight" />} />
      <Page path="/flight/:id" component={Flight} />
      <Page path="/trips" component={Trips} />
      <Page path="/trip/:id" component={Flight} />
    </Switch>
  );
};

export default Routes;
