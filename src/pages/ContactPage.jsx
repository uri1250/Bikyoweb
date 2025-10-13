import React, { useState } from "react";
import { db } from "../firebase"; // <-- make sure your firebase.js is setup
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./ContactPage.css"; // <-- Import the CSS file

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setFormData({ name: "", email: "", message: "" });
      setSuccess("✅ آپ کا پیغام کامیابی سے بھیج دیا گیا ہے!");
    } catch (error) {
      console.error("Error sending message: ", error);
      setSuccess("❌ پیغام بھیجنے میں ناکامی۔ دوبارہ کوشش کریں۔");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-container">
      <div className="contact-page-wrapper">
        {/* Left Section */}
        <div className="contact-info-section">
          <h1 className="text-4xl font-bold text-blue-800">
            ہم سے <span className="text-blue-600">رابطہ کریں</span>
          </h1>
          <p>
            کوئی سوال، رائے یا مدد درکار ہے؟ فارم پُر کریں یا ہم سے براہِ راست
            رابطہ کریں۔ ہم آپ کی مدد کے لیے ہمیشہ موجود ہیں!
          </p>
          <div className="contact-details">
            <p className="contact-detail-item">
              <span className="icon">📞</span>
              <span className="text">+92 300 1234567</span>
            </p>
            <p className="contact-detail-item">
              <span className="icon">📧</span>
              <span className="text">support@bikyoweb.com</span>
            </p>
            <p className="contact-detail-item">
              <span className="icon">📍</span>
              <span className="text">کراچی، پاکستان</span>
            </p>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="contact-form-section">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            ہمیں پیغام بھیجیں
          </h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="block text-gray-600">آپ کا نام</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="اپنا نام درج کریں"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-600">ای میل</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="اپنا ای میل درج کریں"
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-600">پیغام</label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="اپنا پیغام یہاں لکھیں..."
              ></textarea>
            </div>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "بھیجا جا رہا ہے..." : "پیغام بھیجیں"}
            </button>
          </form>
          {success && <p className="message-display success">{success}</p>}
        </div>
      </div>
    </div>
  );
}
