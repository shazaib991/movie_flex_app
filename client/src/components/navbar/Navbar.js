import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar">
        <div className="navbar-logo">movie flex</div>
        <ul className="navbar-links">
          <li className="navbar-link">
            <Link to="/">movies</Link>
          </li>
          <li className="navbar-link">
            <Link to="/aboutUs">about us</Link>
          </li>
          <li className="navbar-link">
            <Link to="/contactUs">contact us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
