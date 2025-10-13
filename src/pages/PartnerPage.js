import React, { useEffect, useState } from "react";
import "./PartnerPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Firebase imports
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // adjust path to your firebase.js

function PartnerPage() {
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    const fetchDownloadLink = async () => {
      try {
        const docRef = doc(db, "appLinks", "appDownload"); // Firestore collection + document
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setDownloadUrl(snapshot.data().downloadUrl);
        }
      } catch (error) {
        console.error("Error fetching download link:", error);
      }
    };

    fetchDownloadLink();
  }, []);

  const benefits = [
    {
      title: "🚀 زیادہ کمائیں",
      desc: "ہفتہ وار ادائیگیوں اور کارکردگی بونس کے ساتھ اپنی آمدنی کو زیادہ سے زیادہ کریں۔",
    },
    {
      title: "📅 لچکدار اوقات",
      desc: "جب چاہیں کام کریں۔ اپنی مرضی کا شیڈول بنائیں، فل ٹائم یا پارٹ ٹائم۔",
    },
    {
      title: "⭐ اپنے خود کے باس بنیں",
      desc: "نہ کوئی باس، نہ مقررہ شفٹ۔ آپ اپنی آمدنی اور وقت کے خود مالک ہیں۔",
    },
    {
      title: "🎁 ہفتہ وار بونس",
      desc: "اہداف حاصل کریں اور بائیکو کے ساتھ دلچسپ ہفتہ وار انعامات حاصل کریں۔",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3, // default for desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // below 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // below 768px (mobile)
        settings: {
          slidesToShow: 1, // show only 1 card
        },
      },
      {
        breakpoint: 412, // below 768px (mobile)
        settings: {
          slidesToShow: 1, // show only 1 card
        },
      },
    ],
  };

  return (
    <div className="partner-page" dir="rtl">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <h1>
            بَنیں <span>بائیکو پارٹنر</span>
          </h1>
          <p>
            ہزاروں رائیڈرز اور بزنسز کے ساتھ جُڑیں جو بائیکو سے کمائی کر رہے
            ہیں۔ لچکدار کام، زیادہ کمائی، اور خود مختار بنیں۔
          </p>
          <div className="download-buttons">
            {downloadUrl && (
              <a href={downloadUrl} download className="cta">
                ایپ ڈاؤن لوڈ کریں
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Carousel */}
      <section className="benefits">
        <h2>بائیکو کے ساتھ پارٹنر کیوں بنیں؟</h2>
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
        <h2>کامیابی کی کہانیاں</h2>
        <blockquote>
          "بائیکو کے ساتھ جڑنے کے بعد، میں ہر ہفتے 5000 روپے بونس میں کماتا ہوں۔
          لچکدار اوقات کی وجہ سے میں اپنے خاندان کا خیال بھی رکھتا ہوں اور آمدنی
          بھی بڑھاتا ہوں۔"
        </blockquote>
        <cite>— علی رضا، رائیڈر پارٹنر</cite>
      </section>

      {/* Steps */}
      <section className="steps">
        <h2>شروع کیسے کریں</h2>
        <div className="step-cards">
          <div className="step">
            <div className="step-number">1</div>
            <h3>ایپ ڈاؤن لوڈ کریں</h3>
            <p>پلے اسٹور یا ایپ اسٹور سے بائیکو پارٹنر ایپ حاصل کریں۔</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>رجسٹر کریں</h3>
            <p>
              اپنی معلومات درج کریں، دستاویزات اپ لوڈ کریں، اور پروفائل کی تصدیق
              کریں۔
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>کمائی شروع کریں</h3>
            <p>
              رائیڈز اور ڈیلیوریز قبول کریں، مکمل کریں، اور ہفتہ وار ادائیگی
              حاصل کریں۔
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2>کیا آپ بائیکو کے ساتھ پارٹنر بننے کے لیے تیار ہیں؟</h2>
        <p>
          آج ہی شامل ہوں اور لچکدار آمدنی کے ساتھ اپنے مستقبل پر کنٹرول حاصل
          کریں۔
        </p>
        <div className="download-buttons">
          {downloadUrl && (
            <a href={downloadUrl} download className="cta">
              ایپ ڈاؤن لوڈ کریں
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

export default PartnerPage;
