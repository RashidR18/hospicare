import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email,
          password,
          confirmPassword,
          role: "Patient",
        },
        {
          withCredentials: true, // 🔥 REQUIRED
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);

      // 🔥 CRITICAL FOR MOBILE
      setIsAuthenticated(true);
      setUser(res.data.user);

      // Clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigateTo("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    }
  };

  // 🔐 Prevent accessing login page if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Register Now
          </Link>
        </div>

        <div style={{ textAlign: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
