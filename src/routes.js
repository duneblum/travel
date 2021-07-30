import React from "react";
import { Route, Switch } from "react-router-dom";
import Entities from "./containers/Entities";
import Hotel from "../src/Containers/Hotel";
import Header from "../src/components/Header";
import Restaurant from "../src/Containers/Restaurant";

const Page = (props) => {
  return (
    <div>
      <Header />
      <Route {...props} />
    </div>
  );
};

const Routes = () => {
  return (
    <Switch>
      <Page path="/restaurants" render={() => <Entities type="restaurant" />} />
      <Page path="/restaurant/:id" component={Restaurant} />
      <Page
        path="/supermarkets"
        render={() => <Entities type="supermarket" />}
      />
      <Page path="/hotels" render={() => <Entities type="hotel" />} />
      <Page path="/hotel/:id" component={Hotel} />
    </Switch>
  );
};

export default Routes;
