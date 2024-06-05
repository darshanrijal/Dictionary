import React from "react";
import ReactDOM from "react-dom/client";
import Dictionary from "./Dictionary";
import "./index.css";
import Footer from "./Footer";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Dictionary />
    <Footer />
  </React.StrictMode>
);
