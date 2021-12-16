import React, { Component } from "react";
import { render } from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import "tailwindcss/tailwind.css";

import Routes from "./routes";

render(
  <HashRouter>
    <Routes />
  </HashRouter>,
  document.getElementById("root")
);
