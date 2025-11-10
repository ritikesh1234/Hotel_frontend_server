import React, { useState, useEffect, useRef } from "react";
import styles from "./HelpCenter.module.css";

/* sample FAQs - replace with API-driven content as needed */
const faqs = [
  {
    q: "How do I book a room on Stayio?",
    a:
      "Search for a city, pick dates, filter by amenities, then click Book. Complete payment and you'll receive an email confirmation with booking details.",
  },
  {
    q: "How can I become a host?",
    a:
      "Go to Become a Host → register → add your hotel details, photos and pricing. We do a quick verification before your listing goes live.",
  },
  {
    q: "What is the cancellation policy?",
    a:
      "Cancellation policies are set by each host and are shown on the listing and during checkout. Check them carefully before confirming booking.",
  },
  {
    q: "How can I contact support?",
    a:
      "Use the contact form below, start a live chat (9am–9pm IST) or email support@stayio.example. For urgent safety issues call the emergency hotline.",
  },
];

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "General",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // autofocus search on mount (nice UX)
    searchRef.current?.focus();
  }, []);

  const filtered = faqs.filter((f) => {
    const t = (f.q + " " + f.a).toLowerCase();
    return !query || t.includes(query.toLowerCase());
  });

  function toggle(i) {
    setActive(active === i ? null : i);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function submitForm(e) {
    e.preventDefault();
    // send to API in production - here we simulate success
    setSent(true);
    setTimeout(() => setSent(false), 4200);
    setForm({ name: "", email: "", topic: "General", message: "" });
  }

  return (
    <main className={styles.helpPage}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Help Center</h1>
          <p className={styles.lead}>
            Quick answers for guests and hosts — and friendly support when you need it.
          </p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" fill="none"/>
            </svg>
            <input
              ref={searchRef}
              className={styles.search}
              placeholder="Search help (e.g. refund, host payout)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search help"
            />
          </div>

          <div className={styles.supportPill}>
          <div className={styles.supportIcon}>🕒</div>
            <div>
                <strong className={styles.supportTitle}>Support Hours </strong>
                <span className={styles.supportTime}>Available 24 × 7</span>
            </div>
           </div>

          <button
            className={styles.chatBtn}
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            aria-label="Open live chat"
          >
            Start Live Chat
          </button>
        </div>
      </header>

      <section className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Help categories">
          <div className={styles.sideCard}>
            <h3>Categories</h3>
            <ul>
              <li>
                <button onClick={() => setQuery("book")}><span>📅</span> Booking</button>
              </li>
              <li>
                <button onClick={() => setQuery("host")}><span>🏨</span> Hosting</button>
              </li>
              <li>
                <button onClick={() => setQuery("payment")}><span>💳</span> Payments</button>
              </li>
              <li>
                <button onClick={() => setQuery("policy")}><span>📜</span> Policies</button>
              </li>
              <li>
                <button onClick={() => setQuery("safety")}><span>🛡️</span> Safety</button>
              </li>
            </ul>
          </div>

          <div className={styles.sideCard}>
            <h4>Quick links</h4>
            <nav className={styles.quickLinks}>
              <a href="/host/dashboard">Host Dashboard</a>
              <a href="/bookings">My Bookings</a>
              <a href="/contact">Contact Support</a>
            </nav>
          </div>

          <div className={styles.sideCard}>
            <h4>Need urgent help?</h4>
            <p className={styles.small}><strong>Hotline:</strong> +91 98765 43210</p>
            <a className={styles.urgentBtn} href="tel:+919876543210">Call Now</a>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Frequently asked</h2>
              <p className={styles.smallMuted}>Popular questions & quick answers</p>
            </div>

            <div className={styles.faqList}>
              {filtered.length === 0 && <p className={styles.noResults}>No results — try a different keyword.</p>}

              {filtered.map((f, i) => (
                <article key={i} className={styles.faqItem}>
                  <button
                    className={`${styles.faqQ} ${active === i ? styles.openQ : ""}`}
                    onClick={() => toggle(i)}
                    aria-expanded={active === i}
                  >
                    <span>{f.q}</span>
                    <svg className={`${styles.chev} ${active === i ? styles.rot : ""}`} viewBox="0 0 24 24" aria-hidden>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </button>

                  <div className={`${styles.faqA} ${active === i ? styles.open : ""}`} aria-hidden={active !== i}>
                    <p>{f.a}</p>
                    <div className={styles.faqMeta}>
                      <button className={styles.inlineBtn} onClick={() => { setQuery("host"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                        Related: host guide →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles.panel} ${styles.contactPanel}`} id="contact">
            <h2>Contact Support</h2>
            <p className={styles.smallMuted}>Fill the form and we'll reply within 24 hours (usually faster).</p>

            <form className={styles.form} onSubmit={submitForm} aria-label="Contact form">
              <div className={styles.row}>
                <label>
                  Name
                  <input name="name" value={form.name} onChange={handleChange} required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </label>
              </div>

              <label>
                Topic
                <select name="topic" value={form.topic} onChange={handleChange}>
                  <option>General</option>
                  <option>Booking</option>
                  <option>Hosting</option>
                  <option>Payments</option>
                </select>
              </label>

              <label>
                Message
                <textarea name="message" rows={5} value={form.message} onChange={handleChange} required />
              </label>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>Send message</button>
                <button type="button" className={styles.clearBtn} onClick={() => setForm({ name: "", email: "", topic: "General", message: "" })}>Clear</button>
              </div>

              {sent && <div className={styles.toast}>Thanks — we'll get back to you shortly.</div>}
            </form>
          </section>
        </main>
      </section>

      {/* floating quick chat */}
      <button
        className={styles.floatChat}
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
        aria-label="Open chat"
      >
        <svg viewBox="0 0 24 24" aria-hidden><path d="M21 15a2 2 0 0 1-2 2H8l-5 5V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="currentColor"/></svg>
        <span>Chat</span>
      </button>
    </main>
  );
}
