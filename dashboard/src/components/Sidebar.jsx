import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import "./Sidebar.css"; // assuming you have some CSS for sidebar

const Sidebar = () => {
  const { isAuthenticated, admin, setIsAuthenticated, setAdmin, setToken } =
    useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAdmin({});
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/logo.png" alt="Hospicare Logo" className="sidebar-logo" />
        <h2>Hospicare Admin</h2>
      </div>

      {isAuthenticated ? (
        <>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/doctor/addnew">Add New Doctor</Link>
              </li>
              <li>
                <Link to="/admin/addnew">Add New Admin</Link>
              </li>
              <li>
                <Link to="/doctors">Doctors</Link>
              </li>
              <li>
                <Link to="/messages">Messages</Link>
              </li>
            </ul>
          </nav>

          <div className="sidebar-footer">
            <p>Logged in as: {admin?.name || "Admin"}</p>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="sidebar-login">
          <p>Please <Link to="/login">login</Link> to access the dashboard</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
