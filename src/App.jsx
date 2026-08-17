import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes/routes";
import Loader from "./components/ui/Loader";

import "./style/index.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
};

export default App;