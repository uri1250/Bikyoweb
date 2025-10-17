import React from "react";
import "./RiderBenefitsPage.css";

export default function RiderBenefitsPage() {
  const riderBenefits = [
    {
      title: "🚀 زیادہ کمائی کے مواقع",
      desc: "ہر رائیڈ پر بہترین کمیشن کے ساتھ زیادہ کمائیں اور ہفتہ وار بونس حاصل کریں۔",
    },
    {
      title: "🕒 اپنی مرضی کے اوقات",
      desc: "کام کا وقت خود طے کریں۔ فل ٹائم یا پارٹ ٹائم — جیسے آپ چاہیں۔",
    },
    {
      title: "🛵 آسان رجسٹریشن",
      desc: "چند منٹ میں رجسٹر کریں اور فوری طور پر رائیڈز شروع کریں۔",
    },
    {
      title: "📲 اسمارٹ ایپ کنٹرول",
      desc: "تمام رائیڈز، کمائی اور ڈیلیوری ایک ہی ایپ سے منظم کریں۔",
    },
    {
      title: "⭐ بہترین سپورٹ ٹیم",
      desc: "کسی بھی مسئلے میں ہماری ٹیم ہمیشہ مدد کے لیے تیار ہے۔",
    },
    {
      title: "🎁 خصوصی انعامات",
      desc: "اعلیٰ کارکردگی والے رائیڈرز کے لیے بونس اور گفٹس۔",
    },
  ];

  return (
    <div className="urdu-text rider-page">
      <h1>بائیکو رائیڈرز کے فائدے</h1>

      <div className="grid">
        {riderBenefits.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
