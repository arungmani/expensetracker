import React from "react";
import ReactDOM from "react-dom/client"; // Import the new API
import App from "./App";

// Get the root element from your HTML
const rootElement = document.getElementById("root");

// Create a root using the new API
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 