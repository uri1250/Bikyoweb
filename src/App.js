// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Analytics } from "@vercel/analytics/react";
// import "./App.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import About from "./pages/About";
// import PartnerPage from "./pages/PartnerPage";
// import FAQPage from "./pages/FAQPage";
// import OffersPage from "./pages/OffersPage";
// import ContactUsScreen from "./pages/ContactPage";
// import useFacebookPixel from "./components/useFacebookPixel";
// import { doc, getDoc, updateDoc, increment } from "firebase/firestore"; // ✅ added updateDoc + increment
// import { db } from "./firebase";

// if (typeof window !== "undefined" && !window.fbq) {
//   window.fbq = function () {
//     console.log("Meta Pixel not initialized yet.");
//   };
// }

// const trackEvent = (eventName, params = {}) => {
//   if (typeof window.fbq === "function") {
//     window.fbq("trackCustom", eventName, params);
//   } else {
//     console.warn("Meta Pixel not loaded yet");
//   }
// };

// function Home() {
//   const [downloadUrl, setDownloadUrl] = useState("");
//   const [downloadCount, setDownloadCount] = useState(0); // ✅ new state for total downloads

//   useFacebookPixel("823437247007309");

//   useEffect(() => {
//     const fetchDownloadLink = async () => {
//       try {
//         const docRef = doc(db, "appLinks", "appDownload");
//         const snapshot = await getDoc(docRef);

//         if (snapshot.exists()) {
//           const data = snapshot.data();
//           setDownloadUrl(data.downloadUrl);
//           setDownloadCount(data.downloadCount || 0); // ✅ get count from DB
//         }
//       } catch (error) {
//         console.error("Error fetching download link:", error);
//       }
//     };

//     fetchDownloadLink();
//   }, []);

//   // ✅ Function to increment the download count
//   const handleDownload = async () => {
//     try {
//       const docRef = doc(db, "appLinks", "appDownload");
//       await updateDoc(docRef, {
//         downloadCount: increment(1), // increment by 1
//       });
//       setDownloadCount((prev) => prev + 1); // update UI instantly
//       trackEvent("DownloadApp", {
//         platform: "Website",
//         source: "HeroSection",
//       });
//     } catch (error) {
//       console.error("Error updating download count:", error);
//     }
//   };

//   return (
//     <div className="App urdu-text">
//       <section className="hero">
//         <h1>بائیکو — آپ کے روزمرہ کے ہر کام کا ساتھی</h1>
//         <p>
//           رائیڈز سے لے کر ڈیلیوری تک، ادائیگیوں سے لے کر شاپنگ تک — بائیکو ایک
//           ہی ایپ میں سب کچھ لاتا ہے۔
//         </p>

//         {downloadUrl && (
//           <>
//             <a
//               href={downloadUrl}
//               download
//               className="cta"
//               onClick={handleDownload} // ✅ use new function
//             >
//               ایپ ڈاؤن لوڈ کریں
//             </a>
//             <p
//               style={{
//                 marginTop: "10px",
//                 fontSize: "40px",
//                 color: "#cccf0bff",
//               }}
//             >
//               DOWNLOAD APP : {downloadCount}
//             </p>
//           </>
//         )}
//       </section>

//       <section className="hero1">
//         <OffersPage />
//       </section>

//       <section id="services" className="services">
//         <h2>ہماری خدمات</h2>
//         <div className="cards">
//           <div className="card">
//             <h3>رائیڈ</h3>
//             <p>پورے شہر میں تیز اور محفوظ سفر۔</p>
//           </div>
//           <div className="card">
//             <h3>ڈیلیوری</h3>
//             <p>پارسل اور دستاویزات فوری پہنچائیں۔</p>
//           </div>
//           <div className="card">
//             <h3>شاپنگ</h3>
//             <p>ضروری اشیاء اپنے دروازے پر حاصل کریں۔</p>
//           </div>
//         </div>
//       </section>

//       <section id="about" className="about">
//         <h2>بائیکو کے بارے میں</h2>
//         <p>
//           بائیکو پاکستان بھر میں لوگوں، کاروباروں اور رائیڈرز کو جوڑتا ہے۔ ہمارا
//           مقصد ہے قابلِ اعتماد اور کم خرچ خدمات ہر روز فراہم کرنا۔
//         </p>
//       </section>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <div dir="ltr" className="ltr-container">
//         <Header />
//         <Analytics />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/PartnerPage" element={<PartnerPage />} />
//           <Route path="/FAQPage" element={<FAQPage />} />
//           <Route path="/ContactPage" element={<ContactUsScreen />} />
//           <Route path="/OffersPage" element={<OffersPage />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

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
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  onSnapshot,
} from "firebase/firestore"; // ✅ added onSnapshot for live update
import { db } from "./firebase";

// Fallback if Pixel isn't loaded yet
if (typeof window !== "undefined" && !window.fbq) {
  window.fbq = function () {
    console.log("Meta Pixel not initialized yet.");
  };
}

// Track Facebook Pixel Events
const trackEvent = (eventName, params = {}) => {
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  } else {
    console.warn("Meta Pixel not loaded yet");
  }
};

function Home() {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadCount, setDownloadCount] = useState(0); // ✅ Track total downloads

  useFacebookPixel("823437247007309");

  useEffect(() => {
    const docRef = doc(db, "appLinks", "appDownload");

    // ✅ Fetch initial data
    const fetchDownloadLink = async () => {
      try {
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setDownloadUrl(data.downloadUrl);
          setDownloadCount(data.downloadCount || 0);
        }
      } catch (error) {
        console.error("Error fetching download link:", error);
      }
    };

    fetchDownloadLink();

    // ✅ Real-time update listener (auto updates count without refresh)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setDownloadCount(snapshot.data().downloadCount || 0);
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  // ✅ Increment download count and update instantly
  const handleDownload = async () => {
    try {
      const docRef = doc(db, "appLinks", "appDownload");
      await updateDoc(docRef, {
        downloadCount: increment(1),
      });
      setDownloadCount((prev) => prev + 1); // instant UI update
      trackEvent("DownloadApp", {
        platform: "Website",
        source: "HeroSection",
      });
    } catch (error) {
      console.error("Error updating download count:", error);
    }
  };

  return (
    <div className="App urdu-text">
      <section className="hero">
        <h1>بائیکو — آپ کے روزمرہ کے ہر کام کا ساتھی</h1>
        <p>
          رائیڈز سے لے کر ڈیلیوری تک، ادائیگیوں سے لے کر شاپنگ تک — بائیکو ایک
          ہی ایپ میں سب کچھ لاتا ہے۔
        </p>

        {downloadUrl && (
          <>
            <a
              href={downloadUrl}
              download
              className="cta"
              onClick={handleDownload}
            >
              ایپ ڈاؤن لوڈ کریں
            </a>

            <p
              style={{
                marginTop: "10px",
                fontSize: "40px",
                color: "#cccf0bff",
              }}
            >
              DOWNLOAD APP : {downloadCount}
            </p>
          </>
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
