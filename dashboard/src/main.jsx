import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

// ✅ Create context
export const Context = createContext({ isAuthenticated: false });

// ✅ Set axios defaults globally
axios.defaults.baseURL = import.meta.env.VITE_API_URL + "/api/v1";
axios.defaults.withCredentials = true; // send cookies with every request

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});

  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
