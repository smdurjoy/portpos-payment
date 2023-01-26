import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Order from "./components/Order";
import OrderCreate from "./components/OrderCreate";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/orders",
    element: <Order />,
  },
  {
    path: "/create-order",
    element: <OrderCreate />,
  },
]);

// const token = localStorage.getItem("access_token");

// axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.headers.common = { Authorization: `bearer ${token}` };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
