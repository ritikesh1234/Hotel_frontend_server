import React, { useState, useRef, useEffect } from "react";
import styles from "./AboutUs.module.css";

// Assets (place these in src/assets/)
import imgWebp from "../../assets/delhi-9576167_1280.jpg";
import imgJpg from "../../assets/delhi.jpg";
// if you later add founder.mp4 you can uncomment and import it
// import founderVideo from "../../assets/founder.mp4";

export default function AboutUs() {
  const [heroMode, setHeroMode] = useState("image"); // "image" or "map"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("text"); // "text" or "video"
  const openButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);

  // close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && isModalOpen) {
        e.preventDefault();
        closeModal();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  // focus management when modal opens
  useEffect(() => {
    if (isModalOpen) {
      lastFocusedRef.current = document.activeElement;
      setTimeout(() => closeButtonRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus?.();
    }
  }, [isModalOpen]);

  function openModal(type = "text") {
    setModalType(type);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <main className={styles.aboutPage} aria-labelledby="about-heading">
      {/* COLORFUL BLUR BLOBS */}
      <div className={styles.blob} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      {/* HERO */}
      <section className={`${styles.hero} ${styles.fadeInUp}`}>
        <div className={styles.heroLeft}>
          <div className={styles.heroTopRow}>
            <p className={styles.pretitle}>Welcome to</p>

            <div className={styles.heroToggles}>
              <button
                className={`${styles.smallBtn} ${heroMode === "image" ? styles.smallBtnActive : ""}`}
                onClick={() => setHeroMode("image")}
                aria-pressed={heroMode === "image"}
                aria-label="Show hero image"
              >
                Image
              </button>
              <button
                className={`${styles.smallBtn} ${heroMode === "map" ? styles.smallBtnActive : ""}`}
                onClick={() => setHeroMode("map")}
                aria-pressed={heroMode === "map"}
                aria-label="Show map"
              >
                Map
              </button>
            </div>
          </div>

          <h1 id="about-heading" className={styles.title}>
            <span className={styles.gradientText}>Stayio</span>
          </h1>

          <p className={styles.tagline}>Book great stays. Host with ease.</p>

          <p className={styles.heroText}>
            Stayio is a secure, fast and user-friendly platform connecting travellers with
            trusted hotels while empowering hotel owners to manage listings, bookings and
            guest relationships — all from one beautiful dashboard.
          </p>

          <div className={styles.heroCtas}>
            <a href="/search" className={styles.btnPrimary}>Find Stays</a>
            <a href="/host/signup" className={styles.btnOutline}>Become a Host</a>

            <button
              ref={openButtonRef}
              className={styles.ghostBtn}
              onClick={() => openModal("text")}
              aria-haspopup="dialog"
            >
              Learn more
            </button>

            <button
              className={styles.ghostBtn}
              onClick={() => openModal("video")}
              aria-haspopup="dialog"
            >
              Watch founder
            </button>
          </div>

          <ul className={styles.quickStats}>
            <li>
              <strong>5k+</strong>
              <span>Bookings / mo</span>
            </li>
            <li>
              <strong>1k+</strong>
              <span>Active hosts</span>
            </li>
            <li>
              <strong>100+</strong>
              <span>Cities</span>
            </li>
          </ul>
        </div>

        <div className={styles.heroRight}>
          {/* A/B hero: picture or map */}
          {heroMode === "image" ? (
            <div className={styles.heroImageWrap}>
              <picture>
                <source srcSet={imgWebp} type="image/webp" />
                <img src={imgJpg} alt="Hotel interior - Stayio" className={styles.heroImage} />
              </picture>

              <div className={styles.overlayContent}>
                <div className={styles.badge}>Top-rated</div>
                <div className={styles.priceTag}>₹1,999 / night</div>
              </div>

              <div className={styles.imageOverlay} aria-hidden="true" />
            </div>
          ) : (
            <div className={styles.mapWrap} aria-hidden={heroMode !== "map"}>
              <iframe
                title="Delhi map - Stayio"
                src="https://maps.google.com/maps?q=Delhi&t=&z=12&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                className={styles.mapIframe}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </section>

      {/* MISSION & FEATURES */}
      <section className={`${styles.mission} ${styles.fadeInUpDelay}`}>
        <div className={styles.missionInner}>
          <div className={styles.missionText}>
            <h2>Our Mission</h2>
            <p>
              Make travel joyful and running small hotels rewarding — through trust, transparency and
              delightful product design.
            </p>
          </div>

          <div className={styles.features}>
            <article className={`${styles.valueCard} ${styles.cardAccent1}`}>
              <div className={styles.cardIcon}>🔒</div>
              <h3>Secure & Verified</h3>
              <p>Verification, encrypted payments and 24/7 support.</p>
            </article>

            <article className={`${styles.valueCard} ${styles.cardAccent2}`}>
              <div className={styles.cardIcon}>💸</div>
              <h3>Transparent Pricing</h3>
              <p>Clear fees, flexible cancellation and instant payouts for hosts.</p>
            </article>

            <article className={`${styles.valueCard} ${styles.cardAccent3}`}>
              <div className={styles.cardIcon}>⚡</div>
              <h3>Fast & Reliable</h3>
              <p>Lightning-fast search and simple management tools for hosts.</p>
            </article>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className={`${styles.team} ${styles.fadeInUpDelay2}`}>
        <h2>Meet the team</h2>
        <div className={styles.teamGrid}>
          <figure className={styles.person}>
            <div className={`${styles.avatar} ${styles.avatar1}`}>RY</div>
            <figcaption>
              <strong>Ritikesh Yadav</strong>
              <span>Founder & CEO</span>
            </figcaption>
          </figure>

          <figure className={styles.person}>
            <div className={`${styles.avatar} ${styles.avatar2}`}>AS</div>
            <figcaption>
              <strong>Asha Sharma</strong>
              <span>Head of Product</span>
            </figcaption>
          </figure>

          <figure className={styles.person}>
            <div className={`${styles.avatar} ${styles.avatar3}`}>MK</div>
            <figcaption>
              <strong>Manish Kumar</strong>
              <span>Lead Engineer</span>
            </figcaption>
          </figure>

          <figure className={styles.person}>
            <div className={`${styles.avatar} ${styles.avatar4}`}>LP</div>
            <figcaption>
              <strong>Lina Patel</strong>
              <span>Head of Partnerships</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaStrip}>
        <div>
          <h3>Have a hotel to list?</h3>
          <p>Join Stayio and start accepting bookings in minutes.</p>
        </div>
        <a href="/host/signup" className={styles.btnPrimary}>Get Started</a>
      </section>


      {/* ACCESSIBLE MODAL */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          role="presentation"
          onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-heading"
            aria-describedby="modal-desc"
          >
            <button
              ref={closeButtonRef}
              className={styles.modalClose}
              onClick={closeModal}
              aria-label="Close dialog"
            >
              &times;
            </button>

            {modalType === "video" ? (
              // stylish placeholder when no founder.mp4 exists; replace with <video> if you add it
              <div className={styles.modalMedia}>
                <div className={styles.playPlaceholder}>
                  <div className={styles.playCircle}>▶</div>
                </div>
                <h3 id="modal-heading">A quick message from our founder</h3>
                <p id="modal-desc">
                  (No video file found) — This placeholder demonstrates where a short founder
                  message would play. Add <code>src/assets/founder.mp4</code> and swap the placeholder
                  with a native &lt;video&gt; element to play it here.
                </p>
              </div>
            ) : (
              <div className={styles.modalContent}>
                <h3 id="modal-heading">About Stayio</h3>
                <p id="modal-desc">
                  Stayio began as a simple idea: booking should be personal, fast and trustworthy.
                  Today we help thousands of travellers and host partners with smart tools and
                  local support.
                </p>
                <p>
                  We focus on delightful product design, transparent pricing and real human support.
                  Join our journey.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
