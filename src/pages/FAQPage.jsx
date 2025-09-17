import React, { useMemo, useState, useEffect, useRef } from "react";
import "./FAQPage.css";
import { db } from "../firebase"; // <-- your firebase config file
import { collection, getDocs } from "firebase/firestore";

function useHashOpen(setActiveId) {
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      setActiveId(hash);
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [setActiveId]);
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]); // dynamic from Firebase
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("customers");
  const [openId, setOpenId] = useState("");
  const [expandedAll, setExpandedAll] = useState(false);
  const searchRef = useRef(null);

  useHashOpen(setOpenId);

  // Fetch from Firebase
  useEffect(() => {
    async function fetchFAQs() {
      try {
        const colRef = collection(db, "faqs");
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: d.id || doc.id, // fallback to doc.id if "id" field missing
            label: d.label || "Unnamed",
            faqs: Array.isArray(d.faqs) ? d.faqs : [], // ensure always an array
          };
        });

        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    }
    fetchFAQs();
  }, []);

  const { categories, visibleFaqs, count } = useMemo(() => {
    if (faqs.length === 0) return { categories: [], visibleFaqs: [], count: 0 };

    const cats = faqs.map((c) => ({
      id: c.id,
      label: c.label,
      total: Array.isArray(c.faqs) ? c.faqs.length : 0,
    }));

    const active = faqs.find((c) => c.id === category) || faqs[0];
    const q = query.trim().toLowerCase();

    const filtered = (active?.faqs || []).filter((item) => {
      if (!q) return true;
      return (
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
      );
    });

    return { categories: cats, visibleFaqs: filtered, count: filtered.length };
  }, [faqs, category, query]);

  useEffect(() => {
    setOpenId("");
  }, [category, query]);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  const copyLink = (id) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById(`copy-${id}`);
      if (btn) {
        btn.classList.add("copied");
        setTimeout(() => btn.classList.remove("copied"), 1200);
      }
    });
  };

  const handleExpandAll = () => {
    setExpandedAll((v) => !v);
    if (!expandedAll && visibleFaqs[0]) setOpenId(visibleFaqs[0].id + "-all");
  };

  return (
    <div className="faq-page">
      {/* Hero/CTA */}
      <header className="faq-hero">
        <div className="faq-hero-inner">
          <h1>We’re here to help</h1>
          <p>
            Find quick answers or reach our 24/7 support team. Search, browse by
            category, or contact us directly.
          </p>
          <div className="faq-cta-cards">
            {/* <a className="cta-card" href="tel:+922138654444">
              <span className="cta-badge">Call 24/7</span>
              <h3>021-3865-4444</h3>
              <p>Immediate assistance</p>
            </a> */}
            <a className="cta-card" href="mailto:support@bikyo.com">
              <span className="cta-badge alt">Email</span>
              <h3>bikyoride@gmail.com</h3>
              <p>Replies within hours</p>
            </a>
            <a className="cta-card" href="/ContactPage">
              <span className="cta-badge">Help Center</span>
              <h3>Contact Form</h3>
            </a>
          </div>
        </div>
        <div className="faq-hero-blobs" aria-hidden="true" />
      </header>

      {/* Toolbar */}
      <section className="faq-toolbar">
        <div className="faq-search">
          <input
            ref={searchRef}
            type="search"
            placeholder="Search questions (e.g., payments, insurance, franchise)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search FAQs"
          />
          <button
            type="button"
            className="clear-btn"
            onClick={() => {
              setQuery("");
              searchRef.current?.focus();
            }}
            aria-label="Clear search"
            hidden={!query}
          >
            ✕
          </button>
        </div>

        <div className="faq-filters" role="tablist" aria-label="FAQ categories">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={category === c.id}
              className={`pill ${category === c.id ? "active" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
              <span className="count">{c.total}</span>
            </button>
          ))}
        </div>

        <div className="faq-utils">
          <span className="result">
            {count} result{count !== 1 ? "s" : ""}
          </span>
          <button className="ghost" onClick={handleExpandAll}>
            {expandedAll ? "Collapse all" : "Expand all"}
          </button>
        </div>
      </section>

      {/* FAQ List */}
      <main className="faq-list" aria-live="polite">
        {visibleFaqs.map((item) => {
          const isOpen = expandedAll || openId === item.id;
          return (
            <article
              key={item.id}
              id={item.id}
              className={`faq-item ${isOpen ? "open" : ""}`}
            >
              <h3>
                <button
                  className="faq-toggle"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${item.id}`}
                  onClick={() => toggle(item.id)}
                >
                  <span className="q">{item.q}</span>
                  <span className="icons" aria-hidden="true">
                    <svg className="chev" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </h3>

              <div
                id={`panel-${item.id}`}
                className="faq-panel"
                role="region"
                aria-labelledby={item.id}
              >
                <p className="answer">{item.a}</p>
                <div className="answer-tools">
                  <button
                    id={`copy-${item.id}`}
                    className="mini"
                    onClick={() => copyLink(item.id)}
                  >
                    Copy link
                  </button>
                  <div className="mini-group">
                    <span>Was this helpful?</span>
                    <button className="mini">Yes</button>
                    <button className="mini">No</button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {count === 0 && (
          <div className="empty">
            <h4>No results found</h4>
            <p>Try a different keyword or choose another category.</p>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <section className="faq-bottom-cta">
        <div className="cta-inner">
          <h2>Still need help?</h2>
          <p>Our support team is available round the clock to assist you.</p>
          <div className="cta-actions">
            <a className="btn primary" href="tel:+922138654444">
              Call Support
            </a>
            <a className="btn" href="/contact">
              Open a Ticket
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
