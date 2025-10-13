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
        <h1>ہمارے بارے میں</h1>
        <p>
          بائیکو آپ کی زندگی کو آسان بنانے کے لیے تیار کیا گیا ہے — چاہے وہ
          رائیڈ ہو، ڈیلیوری، شاپنگ یا پیمنٹس۔ سب کچھ ایک ہی ایپ میں دستیاب ہے۔
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="mission-card">
          <h2>ہمارا مشن</h2>
          <p>
            ہمارا مقصد رائیڈرز کو بااختیار بنانا، کاروباروں کی مدد کرنا، اور
            پاکستان بھر میں لاکھوں صارفین کی روزمرہ زندگی کو آسان بنانا ہے۔ ہم
            سب کے لیے ایک قابلِ اعتماد اور آسان پلیٹ فارم بننے کی کوشش کر رہے
            ہیں۔
          </p>
        </div>
        <div className="vision-card">
          <h2>ہمارا وژن</h2>
          <p>
            پاکستان کا بہترین آل اِن ون پلیٹ فارم بننا — جو کمیونٹیز کو جوڑے،
            شہری نقل و حرکت اور ای-کامرس کو جدت، اعتماد اور کمیونٹی فرسٹ سوچ کے
            ذریعے بدل دے۔
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <h2>بائیکو کیوں منتخب کریں؟</h2>
        <div className="feature-cards-grid">
          <div className="feature-card">
            <FaMotorcycle className="feature-icon" />
            <h3>تیز رائیڈز</h3>
            <p>
              تیز، قابلِ اعتماد، اور سستی رائیڈز جو 24/7 بڑی شہروں میں دستیاب
              ہیں۔
            </p>
          </div>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>کمیونٹی فرسٹ</h3>
            <p>
              ہم اپنے رائیڈرز کو بااختیار بناتے ہیں اور ترقی کے پائیدار مواقع
              فراہم کرتے ہیں۔
            </p>
          </div>
          <div className="feature-card">
            <FaMobileAlt className="feature-icon" />
            <h3>ایک ایپ، کئی سہولیات</h3>
            <p>
              ڈیلیوری سے لے کر پیمنٹس تک، ہر ضرورت کو ایک ہی ایپ کے ذریعے مینیج
              کریں۔
            </p>
          </div>
          <div className="feature-card">
            <FaHandshake className="feature-icon" />
            <h3>کاروباروں کا اعتماد</h3>
            <p>
              ہم کاروباروں کو زیادہ صارفین تک پہنچنے اور روزانہ اپنی مارکیٹ
              بڑھانے میں مدد دیتے ہیں۔
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
