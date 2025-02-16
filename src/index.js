import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Get the root element from your HTML (usually in public/index.html)
const container = document.getElementById("root");

// Create a root.
const root = ReactDOM.createRoot(container);

// Render your app wrapped in BrowserRouter.
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
