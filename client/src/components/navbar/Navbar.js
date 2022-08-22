import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navbarRef = useRef(null);

  const handleBurgerNavbar = () => {
    navbarRef.current.classList.toggle("active");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar" ref={navbarRef}>
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
        <div className="burger-nav" onClick={handleBurgerNavbar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
