import React from "react";
import {
  FaMotorcycle,
  FaUsers,
  FaMobileAlt,
  FaHandshake,
} from "react-icons/fa";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>
          Bikyo is built to simplify life — whether it’s rides, deliveries,
          shopping, or payments. Everything is accessible in one app.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="mission-card">
          <h2>Our Mission</h2>
          <p>
            We are committed to empowering riders, supporting businesses, and
            making daily life easier for millions of users across Pakistan. We
            strive to be a reliable and accessible platform for everyone.
          </p>
        </div>
        <div className="vision-card">
          <h2>Our Vision</h2>
          <p>
            To become the leading all-in-one platform in Pakistan, connecting
            communities and transforming urban mobility and e-commerce through
            innovation, trust, and a community-first approach.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <h2>Why Choose Bikyo?</h2>
        <div className="feature-cards-grid">
          <div className="feature-card">
            <FaMotorcycle className="feature-icon" />
            <h3>Fast Rides</h3>
            <p>
              Quick, reliable, and affordable rides available 24/7 in major
              cities.
            </p>
          </div>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Community First</h3>
            <p>
              We empower our riders and create sustainable opportunities for
              growth.
            </p>
          </div>
          <div className="feature-card">
            <FaMobileAlt className="feature-icon" />
            <h3>One App, Many Services</h3>
            <p>
              From deliveries to payments, manage everything you need in a
              single app.
            </p>
          </div>
          <div className="feature-card">
            <FaHandshake className="feature-icon" />
            <h3>Trusted by Businesses</h3>
            <p>
              Helping businesses reach more customers and expand their market
              daily.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
