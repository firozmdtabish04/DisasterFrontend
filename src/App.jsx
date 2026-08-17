import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import "./style/index.css";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;