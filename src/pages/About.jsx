import React, { useState, useEffect, useCallback } from "react";
import styles from "./About.module.css";
import { tabishImage } from "../data/founder";

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);

  // lock background scroll
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  // close on Escape
  const onKeyDown = useCallback(e => {
    if (!modalOpen) return;
    if (e.key === "Escape") setModalOpen(false);
  }, [modalOpen]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <section className={styles.about}>
      <h2 className={styles.heading}>About OCD Detailing</h2>
      <p className={styles.text}>
        At OCD Detailing, we transform every vehicle into a showroom masterpiece. Our
        skilled team uses industry‑leading products and meticulous techniques to restore,
        protect, and enhance your car’s appearance—inside and out. Whether you seek a
        thorough interior deep‑clean, a gleaming exterior polish, or advanced ceramic
        coating, we deliver unparalleled precision and care. Experience the confidence
        of driving a vehicle that looks—and feels—absolutely flawless.
      </p>

      <h2 className={styles.heading}>Meet Tabish</h2>
      <div className={styles.profileWrapper}>
        <img
          src={tabishImage}
          alt="Tabish, Founder & Lead Detailer"
          className={styles.profileImage}
          onClick={() => setModalOpen(true)}
        />
        <img
          src="/images/logo-hero.png"
          alt="OCD logo watermark"
          className={styles.logoOverlay}
        />
        <p className={styles.text}>
          Tabish, our founder and lead detailer, brings over a decade of experience
          transforming vehicles into showroom masterpieces—fueled by passion and
          precision.
        </p>
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={tabishImage}
              alt="Tabish, enlarged"
              className={styles.modalImage}
            />
            <img
              src="/images/logo-hero.png"
              alt="OCD logo watermark"
              className={styles.logoOverlayLarge}
            />
          </div>
        </div>
      )}
    </section>
  );
}
