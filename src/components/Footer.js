import React from "react";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
// import AtaraxisLogo from "./AtaraxisLogo"; // Assuming you have an SVG logo component

import "./Footer.css";

function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer-wrapper">
      <footer className="footer-main">
        {/* Left Section: Logo, Description, Social Links, and Back to Top */}
        <div className="footer-left">
          <div className="footer-logo-container">
            {/* Use your logo component here */}
            <span className="footer-logo-text">BIKYO</span>
          </div>
          <p className="footer-description">
            From rides to delivery, from payments to shopping — Bikyo brings it
            all in one app
          </p>

          <div className="footer-social-links">
            <a href="https://twitter.com" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </div>

          <div className="footer-back-to-top">
            <button onClick={handleScrollToTop}>
              <FaChevronUp /> BACK TO TOP
            </button>
          </div>
        </div>

        {/* Right Section: Site Map and Legal Links */}
        <div className="footer-right">
          <div className="footer-column">
            <h3>Site Map</h3>
            <ul className="footer-links-list">
              <li>
                <a href="/">Homepage</a>
              </li>

              {/* <li>
                <a href="/resources">Resources & news</a>
              </li> */}
              {/* <li>
                <a href="/careers">Careers</a>
              </li> */}
              <li>
                <a href="/ContactPage">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Legal</h3>
            <ul className="footer-links-list">
              <li>
                <a href="https://sites.google.com/view/bikyo/privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://sites.google.com/view/bikyo/terms">
                  Terms of Services
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Bottom Copyright Section */}
      <div className="footer-bottom">
        <p>
          Copyright © {new Date().getFullYear()}, BIKYO, All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
