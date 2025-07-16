import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

/**
 * PUBLIC_INTERFACE
 * Navbar for the Physics Learning Hub app.
 * @param {object} props
 * @param {string} props.theme - Current theme ("light"|"dark").
 * @param {() => void} props.onToggleTheme
 * @param {object|null} props.authUser
 * @param {() => void} props.onLogout
 */
function Navbar({ theme, onToggleTheme, authUser, onLogout }) {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo">
          <span className="brand-accent">⚛️</span>
          <span>PhysicsHub</span>
        </Link>
      </div>
      <ul className="navbar__links">
        {authUser ? (
          <>
            <li>
              <Link to="/dashboard" className={location.pathname.startsWith("/dashboard") ? "active" : ""}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/courses" className={location.pathname.startsWith("/courses") ? "active" : ""}>
                Courses
              </Link>
            </li>
            <li>
              <Link to="/doubts" className={location.pathname.startsWith("/doubts") ? "active" : ""}>
                Doubt Clearance
              </Link>
            </li>
            <li>
              <button className="navbar__logout" onClick={onLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className={location.pathname === "/register" ? "active" : ""}>
                Register
              </Link>
            </li>
          </>
        )}
        <li>
          <button className="theme-toggle-btn" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
