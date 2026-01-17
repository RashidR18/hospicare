import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({
  isAuthenticated: false,
  admin: {},
  token: null,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Restore admin info on page load if token exists
  useEffect(() => {
    const fetchAdmin = async () => {
      if (!token) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/user/admin/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch admin");

        const data = await res.json();
        setAdmin(data.user);
        setIsAuthenticated(true);
      } catch (err) {
        console.log("Token invalid or expired", err);
        setIsAuthenticated(false);
        setAdmin({});
        setToken(null);
        localStorage.removeItem("token");
      }
    };

    fetchAdmin();
  }, [token]);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        admin,
        setAdmin,
        token,
        setToken,
      }}
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
