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
      setSuccess("✅ Your message has been sent successfully!");
    } catch (error) {
      console.error("Error sending message: ", error);
      setSuccess("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-container">
      {" "}
      {/* Replaced: min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 */}
      <div className="contact-page-wrapper">
        {" "}
        {/* Replaced: max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-8 */}
        {/* Left Section */}
        <div className="contact-info-section">
          {" "}
          {/* Replaced: space-y-6 */}
          <h1 className="text-4xl font-bold text-blue-800">
            {" "}
            {/* This part is tricky, if you want to keep font styles separate, you'd move them. For now, keeping some text styles inline */}
            CONTACT <span className="text-blue-600">US</span>
          </h1>
          <p>
            {" "}
            {/* Replaced: text-gray-600 leading-relaxed */}
            Have questions, feedback, or need support? Fill out the form or
            reach us directly. We’re here to help you!
          </p>
          <div className="contact-details">
            {" "}
            {/* Replaced: space-y-4 */}
            <p className="contact-detail-item">
              {" "}
              {/* Replaced: flex items-center gap-3 */}
              <span className="icon">📞</span> {/* Replaced: text-2xl */}
              <span className="text">+92 300 1234567</span>{" "}
              {/* Replaced: text-gray-700 */}
            </p>
            <p className="contact-detail-item">
              {" "}
              {/* Replaced: flex items-center gap-3 */}
              <span className="icon">📧</span> {/* Replaced: text-2xl */}
              <span className="text">support@bikyoweb.com</span>{" "}
              {/* Replaced: text-gray-700 */}
            </p>
            <p className="contact-detail-item">
              {" "}
              {/* Replaced: flex items-center gap-3 */}
              <span className="icon">📍</span> {/* Replaced: text-2xl */}
              <span className="text">Karachi, Pakistan</span>{" "}
              {/* Replaced: text-gray-700 */}
            </p>
          </div>
        </div>
        {/* Right Section - Contact Form */}
        <div className="contact-form-section">
          {" "}
          {/* Replaced: bg-white rounded-2xl shadow-lg p-6 space-y-4 */}
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            {" "}
            {/* Keeping some text styles inline for simplicity */}
            Send us a Message
          </h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            {" "}
            {/* Replaced: space-y-4 */}
            <div className="form-group">
              {" "}
              {/* Replaced: div */}
              <label className="block text-gray-600">
                {" "}
                {/* Keeping label styles inline for simplicity */}
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" /* This input styling is complex. You'd ideally move these to form-group input/textarea or create specific input classes */
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              {" "}
              {/* Replaced: div */}
              <label className="block text-gray-600">
                {" "}
                {/* Keeping label styles inline for simplicity */}
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" /* Same as above */
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              {" "}
              {/* Replaced: div */}
              <label className="block text-gray-600">
                {" "}
                {/* Keeping label styles inline for simplicity */}
                Message
              </label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" /* Same as above */
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="submit-button" /* Replaced: w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition */
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
          {success && (
            <p className="message-display success">
              {" "}
              {/* Replaced: text-center mt-3 text-sm font-medium text-green-600 */}
              {success}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
