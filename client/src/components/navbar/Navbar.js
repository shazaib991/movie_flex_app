import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar">
        <div className="navbar-logo">movie flex</div>
        <ul className="navbar-links">
          <li className="navbar-link">
            <a href="/">movies</a>
          </li>
          <li className="navbar-link">
            <a href="/">about us</a>
          </li>
          <li className="navbar-link">
            <a href="/">contact us</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
