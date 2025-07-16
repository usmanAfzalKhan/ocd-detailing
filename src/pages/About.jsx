// src/pages/About.jsx
import React from "react";
import styles from "./About.module.css";

export default function About() {
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

      <h2 className={styles.heading}>Why Choose Us</h2>
      <div className={styles.profileWrapper}>
        <p className={styles.text}>
          Discover the OCD Detailing difference: precision‑driven service, premium‑grade products,
          and a passion for perfection that ensures every surface gleams brighter and stays
          protected longer. Our expert technicians combine cutting‑edge techniques with
          unrivaled attention to detail—treating your vehicle as their own to deliver lasting
          shine, ultimate protection, and peace of mind. Choose the gold standard in automotive
          care and drive with confidence.
        </p>
      </div>

      {/* Website logo at bottom with pop-in animation */}
      <img
        src="/images/logo-hero.png"
        alt="OCD Detailing logo"
        style={{
          display: "block",
          margin: "-3rem auto 0",
          width: "200px",
        }}
      />
    </section>
  );
}
