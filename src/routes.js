import React from "react";
import { Route, Switch } from "react-router-dom";
import Entities from "./containers/Entities";
import Hotel from "../src/Containers/Hotel";
import Restaurant from "../src/Containers/Restaurant";

const Routes = () => {
  return (
    <Switch>
      <Route
        path="/restaurants"
        render={() => <Entities type="restaurant" />}
      />
      <Route path="/restaurant/:id" component={Restaurant} />
      <Route
        path="/supermarkets"
        render={() => <Entities type="supermarket" />}
      />
      <Route path="/hotels" render={() => <Entities type="hotel" />} />
      <Route path="/hotel/:id" component={Hotel} />
    </Switch>
  );
};

export default Routes;
