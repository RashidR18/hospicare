import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { Context } from "./main";

import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";

import "./App.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/user/patient/logout`, {
        withCredentials: true
      });
      setIsAuthenticated(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </Link>
      </div>

      <div className={`navLinks ${menuOpen ? "showmenu" : ""}`}>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/appointment">Appointment</Link>
          <Link to="/about">About</Link>
          {!isAuthenticated && <Link to="/login">Login</Link>}
          {!isAuthenticated && <Link to="/register">Register</Link>}
        </div>
        {isAuthenticated && (
          <button className="logoutBtn btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
    </nav>
  );
};

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/patient/me`,
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-center" />
      </div>
    </Router>
  );
};

export default App;
