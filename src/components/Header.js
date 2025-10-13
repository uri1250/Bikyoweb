import React, { useState } from "react";
import "./Header.css";
// import { Link } from "react-router-dom"; // If using React Router

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Logo */}
      <a href="/" className="logo">
        BIKYO
      </a>
      {/* <Link to="/" className="logo">BIKYO</Link> */}

      {/* Hamburger Menu (mobile only) */}
      <div
        className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation */}
      <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
        <a href="/about">About Us</a>

        {/* Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {/* <a href="#services" className="dropdown-toggle">
            Our Services ▾
          </a> */}
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="/ride">Ride</a>
              <a href="/delivery">Delivery</a>
              <a href="/food">Food</a>
            </div>
          )}
        </div>

        <a href="/PartnerPage">Partner</a>
        {/* <a href="#franchises">Franchises</a> */}
        <a href="/FAQPage">Help Center</a>
        {/* <a href="OffersPage">Offerpage</a> */}
        {/* { <a href="/AdminFAQ">Add Question</a> } */}

        <button className="contact-btn">
          {" "}
          <a href="/ContactPage">Contact Us</a>
        </button>
      </nav>
    </header>
  );
}

export default Header;
