import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
