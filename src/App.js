import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import PartnerPage from "./pages/PartnerPage";
import FAQPage from "./pages/FAQPage";
import OffersPage from "./pages/OffersPage";
import ContactUsScreen from "./pages/ContactPage";
import useFacebookPixel from "./components/useFacebookPixel";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import AdminFAQ from "./pages/AdminFAQ";
if (typeof window !== "undefined" && !window.fbq) {
  window.fbq = function () {
    console.log("Meta Pixel not initialized yet.");
  };
}

const trackEvent = (eventName, params = {}) => {
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  } else {
    console.warn("Meta Pixel not loaded yet");
  }
};

function Home() {
  const [downloadUrl, setDownloadUrl] = useState("");

  useFacebookPixel("823437247007309");

  useEffect(() => {
    const fetchDownloadLink = async () => {
      try {
        const docRef = doc(db, "appLinks", "appDownload");
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
    <div className="App urdu-text">
      <section className="hero">
        <h1>بائیکو — آپ کے روزمرہ کے ہر کام کا ساتھی</h1>
        <p>
          رائیڈز سے لے کر ڈیلیوری تک، ادائیگیوں سے لے کر شاپنگ تک — بائیکو ایک
          ہی ایپ میں سب کچھ لاتا ہے۔
        </p>

        {downloadUrl && (
          <a
            href={downloadUrl}
            download
            className="cta"
            onClick={() =>
              trackEvent("DownloadApp", {
                platform: "Website",
                source: "HeroSection",
              })
            }
          >
            ایپ ڈاؤن لوڈ کریں
          </a>
        )}
      </section>

      <section className="hero1">
        <OffersPage />
      </section>

      <section id="services" className="services">
        <h2>ہماری خدمات</h2>
        <div className="cards">
          <div className="card">
            <h3>رائیڈ</h3>
            <p>پورے شہر میں تیز اور محفوظ سفر۔</p>
          </div>
          <div className="card">
            <h3>ڈیلیوری</h3>
            <p>پارسل اور دستاویزات فوری پہنچائیں۔</p>
          </div>
          <div className="card">
            <h3>شاپنگ</h3>
            <p>ضروری اشیاء اپنے دروازے پر حاصل کریں۔</p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <h2>بائیکو کے بارے میں</h2>
        <p>
          بائیکو پاکستان بھر میں لوگوں، کاروباروں اور رائیڈرز کو جوڑتا ہے۔ ہمارا
          مقصد ہے قابلِ اعتماد اور کم خرچ خدمات ہر روز فراہم کرنا۔
        </p>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div dir="ltr" className="ltr-container">
        <Header />
        <Analytics />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/PartnerPage" element={<PartnerPage />} />
          <Route path="/FAQPage" element={<FAQPage />} />
          <Route path="/ContactPage" element={<ContactUsScreen />} />
          <Route path="/OffersPage" element={<OffersPage />} />
          <Route path="/AdminFAQ" element={<AdminFAQ />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
