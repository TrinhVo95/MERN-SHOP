import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";


// Create a client
const queryClient = new QueryClient();

//Config baseUrl for axios
axios.defaults.baseURL = "http://localhost:4000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
