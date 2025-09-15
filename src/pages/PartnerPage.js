import React from "react";
import "./PartnerPage.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PartnerPage() {
  const benefits = [
    {
      title: "🚀 Earn More",
      desc: "Maximize your income with weekly payouts and performance bonuses.",
    },
    {
      title: "📅 Flexible Hours",
      desc: "Work whenever you want. Choose your own schedule, full-time or part-time.",
    },
    {
      title: "⭐ Be Your Own Boss",
      desc: "No boss, no fixed shifts. You are in control of your earnings and time.",
    },
    {
      title: "🎁 Weekly Bonuses",
      desc: "Hit milestones and unlock exciting weekly rewards with Bikyo.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="partner-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <h1>
            Become a <span>Bikyo Partner</span>
          </h1>
          <p>
            Join thousands of riders and businesses earning with Bikyo. Work
            flexibly, earn more, and be your own boss.
          </p>
          <div className="download-buttons">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
              />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
              /> */}
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Carousel */}
      <section className="benefits">
        <h2>Why Partner with Bikyo?</h2>
        <Slider {...settings}>
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <h3>{benefit.title}</h3>
              <p>{benefit.desc}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* Testimonial */}
      <section className="testimonial">
        <h2>Success Stories</h2>
        <blockquote>
          “Since joining Bikyo, I earn Rs 5,000 weekly in bonuses. The
          flexibility allows me to manage my family and still increase my
          income.”
        </blockquote>
        <cite>— Ali Raza, Rider Partner</cite>
      </section>

      {/* Steps */}
      <section className="steps">
        <h2>How to Get Started</h2>
        <div className="step-cards">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Download App</h3>
            <p>Get the Bikyo Partner app from Play Store or App Store.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Register</h3>
            <p>
              Fill in your details, upload documents, and verify your profile.
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Start Earning</h3>
            <p>
              Accept rides and deliveries, complete them, and get paid weekly.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2>Ready to Partner with Bikyo?</h2>
        <p>
          Join today and take control of your future with flexible earnings.
        </p>
        <Link to="/signup">
          <button className="cta-btn">Download Now</button>
        </Link>
      </section>
    </div>
  );
}

export default PartnerPage;
