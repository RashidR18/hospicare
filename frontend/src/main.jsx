import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({ isAuthenticated: false, token: "" });

const AppWrapper = () => {
  
  const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const [token, setToken] = useState(storedToken);
const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken);

  

  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, token, setToken }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppWrapper />
);
