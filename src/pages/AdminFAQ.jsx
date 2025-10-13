import React, { useEffect, useMemo, useState } from "react";
import { db } from "../firebase"; // adjust path if needed
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

/** Small helpers */
const uid = () => Math.random().toString(36).slice(2, 10).toUpperCase();
const clean = (s = "") => s.trim();

export default function AdminFAQ() {
  const [categories, setCategories] = useState([]);
  const [activeCatId, setActiveCatId] = useState("");
  const [loading, setLoading] = useState(true);

  // category form
  const [newCatId, setNewCatId] = useState("");
  const [newCatLabel, setNewCatLabel] = useState("");

  // faq form
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [editingFaqId, setEditingFaqId] = useState("");

  // Offers state
  const [offers, setOffers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [discount, setDiscount] = useState("");
  const [validTill, setValidTill] = useState("");
  const [isActive, setIsActive] = useState(true);

  // subscribe to categories
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "faqs"), (snap) => {
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => a.label.localeCompare(b.label));
      setCategories(list);
      if (!activeCatId && list[0]) setActiveCatId(list[0].id);
      setLoading(false);
    });
    return () => unsub();
  }, [activeCatId]);

  // subscribe to offers
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "offers"), (snap) => {
      setOffers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const activeCat = useMemo(
    () => categories.find((c) => c.id === activeCatId),
    [categories, activeCatId]
  );

  /** CATEGORY ops */
  const createCategory = async (e) => {
    e.preventDefault();
    const id = clean(
      newCatId || newCatLabel.toLowerCase().replace(/\s+/g, "-")
    );
    const label = clean(newCatLabel);
    if (!id || !label) return alert("Category id & label are required.");

    const ref = doc(db, "faqs", id);
    const exists = await getDoc(ref);
    if (exists.exists())
      return alert("A category with this id already exists.");

    await setDoc(ref, { id, label, faqs: [] });
    setNewCatId("");
    setNewCatLabel("");
    setActiveCatId(id);
  };

  const renameCategory = async () => {
    if (!activeCat) return;
    const label = prompt("Rename category label:", activeCat.label);
    if (!label) return;
    await updateDoc(doc(db, "faqs", activeCat.id), { label: clean(label) });
  };

  const deleteCategory = async () => {
    if (!activeCat) return;
    if (
      !window.confirm(`Delete category "${activeCat.label}" and all its FAQs?`)
    )
      return;
    await deleteDoc(doc(db, "faqs", activeCat.id));
    setActiveCatId("");
  };

  /** FAQ ops */
  const saveFaqs = async (nextFaqs) => {
    if (!activeCat) return;
    await updateDoc(doc(db, "faqs", activeCat.id), { faqs: nextFaqs });
  };

  const addFaq = async (e) => {
    e.preventDefault();
    if (!activeCat) return alert("Pick a category first.");
    const qv = clean(q);
    const av = clean(a);
    if (!qv || !av) return alert("Question & Answer are required.");
    const next = [...(activeCat.faqs || []), { id: uid(), q: qv, a: av }];
    await saveFaqs(next);
    setQ("");
    setA("");
  };

  const startEditFaq = (f) => {
    setEditingFaqId(f.id);
    setQ(f.q);
    setA(f.a);
  };

  const cancelEdit = () => {
    setEditingFaqId("");
    setQ("");
    setA("");
  };

  const updateFaq = async (e) => {
    e.preventDefault();
    if (!activeCat) return;
    const qv = clean(q);
    const av = clean(a);
    if (!qv || !av) return alert("Question & Answer are required.");
    const next = (activeCat.faqs || []).map((f) =>
      f.id === editingFaqId ? { ...f, q: qv, a: av } : f
    );
    await saveFaqs(next);
    cancelEdit();
  };

  const removeFaq = async (id) => {
    if (!activeCat) return;
    if (!window.confirm("Delete this FAQ?")) return;
    const next = (activeCat.faqs || []).filter((f) => f.id !== id);
    await saveFaqs(next);
  };

  /** OFFER ops */
  const addOffer = async (e) => {
    e.preventDefault();
    if (!title || !description || !imageUrl)
      return alert("All fields required");
    const id = uid();
    await setDoc(doc(db, "offers", id), {
      id,
      title: clean(title),
      description: clean(description),
      imageUrl: clean(imageUrl),
      discount: clean(discount),
      validTill: validTill || null,
      isActive,
    });
    setTitle("");
    setDescription("");
    setImageUrl("");
    setDiscount("");
    setValidTill("");
    setIsActive(true);
  };

  const removeOffer = async (id) => {
    if (!window.confirm("Delete this offer?")) return;
    await deleteDoc(doc(db, "offers", id));
  };

  return (
    <div className="admin-wrap" style={styles.wrap}>
      {/* FAQ SECTION */}
      <header style={styles.header}>
        <h1 style={styles.title}>FAQ Admin</h1>
        <p style={styles.sub}>
          Manage categories & FAQs stored in <code>faqs</code> collection.
        </p>
      </header>

      <section style={styles.grid}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.card}>
            <h3 style={styles.h3}>Categories</h3>
            {loading ? (
              <p>Loading…</p>
            ) : categories.length === 0 ? (
              <p>No categories yet.</p>
            ) : (
              <ul style={styles.catList}>
                {categories.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => setActiveCatId(c.id)}
                      style={{
                        ...styles.catBtn,
                        ...(activeCatId === c.id ? styles.catBtnActive : {}),
                      }}
                    >
                      {c.label}
                      <span style={styles.badge}>{c.faqs?.length || 0}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div style={{ height: 16 }} />
            <button
              onClick={renameCategory}
              disabled={!activeCat}
              style={styles.ghostBtn}
            >
              Rename
            </button>
            <button
              onClick={deleteCategory}
              disabled={!activeCat}
              style={{
                ...styles.ghostBtn,
                color: "#b91c1c",
                borderColor: "#fecaca",
              }}
            >
              Delete
            </button>
          </div>

          <div style={styles.card}>
            <h3 style={styles.h3}>Add Category</h3>
            <form onSubmit={createCategory} style={styles.form}>
              <label style={styles.label}>ID (optional)</label>
              <input
                value={newCatId}
                onChange={(e) => setNewCatId(e.target.value)}
                placeholder="e.g. customers"
                style={styles.input}
              />
              <label style={styles.label}>Label *</label>
              <input
                value={newCatLabel}
                onChange={(e) => setNewCatLabel(e.target.value)}
                placeholder="e.g. Customers"
                style={styles.input}
                required
              />
              <button type="submit" style={styles.primaryBtn}>
                Create
              </button>
            </form>
          </div>
        </aside>

        {/* Main FAQ */}
        <main style={styles.main}>
          <div style={styles.card}>
            <div style={styles.flexBetween}>
              <h3 style={styles.h3}>
                {activeCat ? `FAQs — ${activeCat.label}` : "Select a category"}
              </h3>
            </div>

            {activeCat && (
              <>
                <form
                  onSubmit={editingFaqId ? updateFaq : addFaq}
                  style={styles.formRow}
                >
                  <div style={styles.formCol}>
                    <label style={styles.label}>Question *</label>
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      style={styles.input}
                      required
                    />
                  </div>
                  <div style={styles.formCol}>
                    <label style={styles.label}>Answer *</label>
                    <textarea
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      style={styles.textarea}
                      rows={3}
                      required
                    />
                  </div>
                  <div style={styles.actionsRow}>
                    {editingFaqId ? (
                      <>
                        <button type="submit" style={styles.primaryBtn}>
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          style={styles.ghostBtn}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button type="submit" style={styles.primaryBtn}>
                        Add FAQ
                      </button>
                    )}
                  </div>
                </form>

                <ul style={styles.faqList}>
                  {(activeCat.faqs || []).map((f) => (
                    <li key={f.id} style={styles.faqItem}>
                      <div>
                        <div style={styles.faqQ}>{f.q}</div>
                        <div style={styles.faqA}>{f.a}</div>
                      </div>
                      <div style={styles.rowGap}>
                        <button
                          onClick={() => startEditFaq(f)}
                          style={styles.smallBtn}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeFaq(f.id)}
                          style={{
                            ...styles.smallBtn,
                            color: "#b91c1c",
                            borderColor: "#fecaca",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                  {(activeCat.faqs || []).length === 0 && (
                    <li style={styles.empty}>No FAQs in this category yet.</li>
                  )}
                </ul>
              </>
            )}
          </div>
        </main>
      </section>

      {/* OFFERS SECTION */}
      <header style={{ ...styles.header, marginTop: 40 }}>
        <h1 style={styles.title}>Offers Admin</h1>
        <p style={styles.sub}>
          Manage ride offers stored in <code>offers</code> collection.
        </p>
      </header>
      <section style={styles.grid}>
        <main style={styles.main}>
          <div style={styles.card}>
            <h3 style={styles.h3}>Add New Offer</h3>
            <form onSubmit={addOffer} style={styles.form}>
              <label style={styles.label}>Title *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
                required
              />
              <label style={styles.label}>Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
                rows={2}
                required
              />
              <label style={styles.label}>Image URL *</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={styles.input}
                required
              />
              <label style={styles.label}>Discount</label>
              <input
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                style={styles.input}
              />
              <label style={styles.label}>Valid Till</label>
              <input
                type="date"
                value={validTill}
                onChange={(e) => setValidTill(e.target.value)}
                style={styles.input}
              />
              <label style={styles.label}>Active?</label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />

              <button type="submit" style={styles.primaryBtn}>
                Add Offer
              </button>
            </form>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3 style={styles.h3}>Existing Offers</h3>
            <ul style={styles.faqList}>
              {offers.map((offer) => (
                <li key={offer.id} style={styles.faqItem}>
                  <div>
                    <div style={styles.faqQ}>{offer.title}</div>
                    <div style={styles.faqA}>{offer.description}</div>
                    <small>
                      {offer.discount} | {offer.validTill} |{" "}
                      {offer.isActive ? "Active" : "Inactive"}
                    </small>
                  </div>
                  <button
                    onClick={() => removeOffer(offer.id)}
                    style={{
                      ...styles.smallBtn,
                      color: "#b91c1c",
                      borderColor: "#fecaca",
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
              {offers.length === 0 && (
                <li style={styles.empty}>No offers yet.</li>
              )}
            </ul>
          </div>
        </main>
      </section>
    </div>
  );
}

/** Minimal, clean inline styles (no external CSS required) */
const styles = {
  wrap: {
    padding: "32px",
    background: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    color: "#0f172a",
  },
  header: { maxWidth: 1200, margin: "0 auto 24px" },
  title: { fontSize: 28, margin: 0, fontWeight: 700 },
  sub: { marginTop: 6, color: "#475569" },
  grid: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: 24,
  },
  sidebar: {},
  main: {},
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 8px 24px rgba(2,6,23,0.06)",
    border: "1px solid #e2e8f0",
  },
  h3: { margin: "4px 0 12px", fontSize: 16, fontWeight: 700 },
  catList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "grid",
    gap: 8,
  },
  catBtn: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: "10px 12px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    transition: "all .2s",
  },
  catBtnActive: {
    borderColor: "#0ea5e9",
    boxShadow: "0 0 0 3px rgba(14,165,233,.15)",
  },
  badge: {
    background: "#f1f5f9",
    borderRadius: 999,
    padding: "2px 8px",
    fontSize: 12,
    color: "#334155",
  },
  ghostBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid #e5e7eb",
    padding: "8px 12px",
    borderRadius: 10,
    background: "#fff",
    cursor: "pointer",
    marginRight: 8,
  },
  primaryBtn: {
    background: "linear-gradient(135deg, #0ea5e9, #0d9488)",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(13,148,136,0.25)",
  },
  form: { display: "grid", gap: 8 },
  label: { fontSize: 12, color: "#475569" },
  input: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "10px 12px",
    outline: "none",
  },
  textarea: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "10px 12px",
    outline: "none",
    resize: "vertical",
  },
  formRow: { display: "grid", gap: 12 },
  formCol: { display: "grid", gap: 6 },
  actionsRow: { display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" },
  flexBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  faqList: {
    listStyle: "none",
    padding: 0,
    marginTop: 12,
    display: "grid",
    gap: 10,
  },
  faqItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: 12,
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "#fff",
  },
  faqQ: { fontWeight: 600, marginBottom: 6 },
  faqA: { color: "#334155", whiteSpace: "pre-wrap" },
  rowGap: { display: "flex", gap: 8, alignItems: "center" },
  smallBtn: {
    border: "1px solid #e5e7eb",
    padding: "6px 10px",
    borderRadius: 10,
    background: "#fff",
    cursor: "pointer",
  },
  empty: {
    padding: 16,
    textAlign: "center",
    color: "#64748b",
    border: "1px dashed #e2e8f0",
    borderRadius: 12,
    background: "#f8fafc",
  },
};

/* Responsive tweak */
const media = window.matchMedia?.("(max-width: 960px)");
if (media && media.matches) {
  styles.grid.gridTemplateColumns = "1fr";
}
