import React from "react";
import "./CustomerBenefitsPage.css";

export default function CustomerBenefitsPage() {
  const benefits = [
    {
      title: "🚗 آرام دہ سواری",
      desc: "بائیکو کے ساتھ ہر سواری محفوظ، آرام دہ اور تیز رفتار ہے۔ چاہے دفتر جانا ہو یا بازار، بس ایک کلک میں سواری حاصل کریں۔",
    },
    {
      title: "💸 کم قیمت میں سفر",
      desc: "بائیکو ایپ پر آپ کو ہمیشہ سب سے کم کرایہ ملتا ہے۔ روزمرہ کے سفر میں زیادہ بچت کریں۔",
    },
    {
      title: "🎁 رعایتیں اور انعامات",
      desc: "ہر رائیڈ پر پوائنٹس حاصل کریں اور شاندار انعامات جیتیں۔ خاص مواقع پر خصوصی رعایتیں بھی حاصل کریں۔",
    },
    {
      title: "⏰ تیز رفتار سروس",
      desc: "قریب ترین رائیڈر سے فوری کنکشن۔ وقت ضائع کیے بغیر اپنی منزل تک پہنچیں۔",
    },

    {
      title: "📞 24/7 کسٹمر سپورٹ",
      desc: "کسی بھی مسئلے کی صورت میں بائیکو کی سپورٹ ٹیم ہر وقت آپ کی مدد کے لیے دستیاب ہے۔",
    },
    {
      title: "🌐 ہر جگہ دستیاب",
      desc: "پاکستان کے ہر بڑے شہر میں بائیکو کی سروس دستیاب ہے۔ جہاں بھی ہوں، سواری حاصل کریں۔",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 urdu-text1 text-right">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          صارفین کے لیے بائیکو کے فائدے
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
            >
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://play.google.com/store/apps/details?id=com.bikyo.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-medium shadow hover:bg-blue-700 transition"
          >
            ایپ انسٹال کریں
          </a>
        </div>
      </div>
    </div>
  );
}
