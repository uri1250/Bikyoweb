import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import PartnerPage from "./pages/PartnerPage";
import FAQPage from "./pages/FAQPage";
// import AdminFAQ from "./pages/AdminFAQ";
// import ContactPage from "./pages/ContactPage";
import OffersPage from "./pages/OffersPage";
import ContactUsScreen from "./pages/ContactPage";

function Home() {
  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero">
        <h1>Bikyo is your everyday, everything platform</h1>
        <p>
          From rides to delivery, from payments to shopping — Bikyo brings it
          all in one app.
        </p>
        {/* <button className="cta">Download App</button> */}
        <a
          href="https://github.com/uri1250/file/raw/6d582ab6bb7a96139b7944c97bc2aee79538e3eb/Zero,%20Single,%202%20Teachers%20Schools%20Punjab(zia.anjum).xlsx"
          download
          className="cta"
        >
          Download App
        </a>
      </section>
      <section className="hero1">
        <OffersPage />
      </section>
      {/* Services */}
      <section id="services" className="services">
        <h2>Our Services</h2>
        <div className="cards">
          <div className="card">
            <h3>Ride</h3>
            <p>Fast, safe rides across the city.</p>
          </div>
          <div className="card">
            <h3>Delivery</h3>
            <p>Send parcels and documents quickly.</p>
          </div>
          <div className="card">
            <h3>Shop</h3>
            <p>Order essentials delivered to your doorstep.</p>
          </div>
        </div>
      </section>

      {/* About Section (short) */}
      <section id="about" className="about">
        <h2>About Bikyo</h2>
        <p>
          Bikyo connects people, businesses, and riders across Pakistan. Our
          mission is to provide reliable and affordable services every day.
        </p>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/PartnerPage" element={<PartnerPage />} />
        <Route path="/FAQPage" element={<FAQPage />} />
        {/* <Route path="/AdminFAQ" element={<AdminFAQ />} /> */}
        <Route path="/ContactPage" element={<ContactUsScreen />} />
        <Route path="/OffersPage" element={<OffersPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
