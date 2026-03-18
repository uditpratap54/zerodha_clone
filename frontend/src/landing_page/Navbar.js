import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AUTH_ROUTES = ["/signup", "/signin"];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide navbar on full-screen auth pages
  if (AUTH_ROUTES.includes(location.pathname)) return null;

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      window.location.reload();   // refresh home
    } else {
      navigate("/");              // go to home
    }
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: "#FFF" }}>
      <div className="container p-2">

        {/* LOGO */}
        <a href="/" className="navbar-brand" onClick={handleLogoClick}>
          <img src="media/images/logo.svg" style={{ width: "25%" }} alt="Logo" />
        </a>

        {/* TOGGLE BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Product</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/pricing">Pricing</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/support">Support</Link></li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
