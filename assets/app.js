// ./src/js/app.js

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/app.css";
import Index from "./index";

ReactDOM.render(
  <Router>
    <Index />
  </Router>,
  document.getElementById("root")
);
