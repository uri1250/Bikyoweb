import React, { useEffect, useState } from "react";
import "./PartnerPage.css";
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

  return (
    <div className="partner-page" dir="rtl">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <h1>
            بَنیں <span>بائیکو پارٹنر</span>
          </h1>
          <p>
            ابھی بائیکو کے ساتھ اپنا سفر شروع کریں — جہاں ہر رائیڈ ہے کمائی کا
            نیا موقع۔
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
      {/* <section className="benefits">
        <h2>بائیکو کے ساتھ پارٹنر کیوں بنیں؟</h2>
        <Slider {...settings}>
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <h3>{benefit.title}</h3>
              <p>{benefit.desc}</p>
            </div>
          ))}
        </Slider>
      </section> */}

      {/* Testimonial */}
      <section className="testimonial">
        <h2>اعتماد اور کمائی</h2>
        <blockquote>
          "بائیکو کے ساتھ میرا تجربہ شاندار رہا۔ ایپ استعمال میں آسان ہے اور
          کسٹمرز بھی ہمیشہ مطمئن رہتے ہیں۔ اب میں اپنے خواب پورے کر رہا ہوں۔"
        </blockquote>
        <cite>— سمیع اللہ، رائیڈر پارٹنر</cite>
      </section>

      {/* Steps */}
      <section className="steps">
        <h2>شروع کیسے کریں</h2>
        <div className="step-cards">
          <div className="step">
            <div className="step-number">1</div>
            <h3>ایپ ڈاؤن لوڈ کریں</h3>
            <p>
              ویب سائٹ سے <strong>بائیکو پارٹنر ایپ</strong> حاصل کریں۔
            </p>
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
              رائیڈز اور ڈیلیوریز قبول کریں، مکمل کریں، اورفوری ادائیگی حاصل
              کریں۔
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
