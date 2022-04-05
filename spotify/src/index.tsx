import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProdiver } from "./services/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProdiver>
      <App />
    </ThemeProdiver>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
