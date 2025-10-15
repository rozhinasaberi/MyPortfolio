/*Import Dependencies*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Main App 
import "./App.css";  //Main Css
// Get the root element from index.html (with id="root")
// Create a React root and run the App inside it
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
