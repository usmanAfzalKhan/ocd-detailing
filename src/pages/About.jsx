// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.aboutPage}>
      <div className={styles.hero}>
        <span className={styles.kicker}>About</span>
        <h1 className={styles.title}>
          Precision-driven detailing with a clean, premium finish.
        </h1>
        <p className={styles.intro}>
          OCD Detailing is built around careful workmanship, premium products,
          and the kind of result that feels noticeably cleaner, sharper, and
          more complete the second you see it.
        </p>

        <div className={styles.heroPills}>
          <span className={styles.heroPill}>Interior Reset</span>
          <span className={styles.heroPill}>Exterior Finish</span>
          <span className={styles.heroPill}>Long-Term Protection</span>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <article className={styles.storyCard}>
          <span className={styles.cardEyebrow}>Our Standard</span>
          <h2 className={styles.cardTitle}>About OCD Detailing</h2>

          <div className={styles.copyStack}>
            <p>
              At OCD Detailing, every vehicle is approached with the same
              mindset: take your time, do it properly, and leave nothing looking
              rushed.
            </p>

            <p>
              From deep interior cleaning to exterior enhancement and advanced
              protection, the goal is simple — deliver a result that looks
              premium immediately and still feels worth it after the job is
              done.
            </p>

            <p>
              Whether you are booking a reset for a daily driver or a higher-end
              finish for a vehicle you take pride in, the focus stays the same:
              cleaner presentation, tighter detail work, and a finish people
              actually notice.
            </p>
          </div>

          <div className={styles.inlineActions}>
            <Link to="/services" className={styles.primaryLink}>
              Explore Services
            </Link>
            <Link to="/contact" className={styles.secondaryLink}>
              Book Now
            </Link>
          </div>
        </article>

        <aside className={styles.mediaCard}>
          <div className={styles.logoShell}>
            <img
              src="/images/logo_white.webp"
              alt="OCD Detailing logo"
              className={styles.logo}
            />
          </div>

          <div className={styles.mediaCopy}>
            <span className={styles.mediaLabel}>Premium Mobile Detailing</span>
            <p>
              Clean presentation, sharp finishes, and attention to the details
              that separate a quick clean from a properly finished job.
            </p>
          </div>
        </aside>
      </div>

      <div className={styles.valuesGrid}>
        <article className={styles.valueCard}>
          <span className={styles.cardEyebrow}>Why Choose Us</span>
          <h2 className={styles.valueTitle}>Detail-first mindset</h2>
          <p>
            Tight finishes, clean edges, and a methodical approach that keeps
            the final result looking intentional and premium.
          </p>
        </article>

        <article className={styles.valueCard}>
          <span className={styles.cardEyebrow}>Products & Process</span>
          <h2 className={styles.valueTitle}>Premium-grade care</h2>
          <p>
            Safe, proven products and proper detailing methods that help bring
            out better gloss, cleanliness, and long-term protection.
          </p>
        </article>

        <article className={styles.valueCard}>
          <span className={styles.cardEyebrow}>The Result</span>
          <h2 className={styles.valueTitle}>Something you notice right away</h2>
          <p>
            The aim is not just a cleaner car — it is a sharper, fresher, more
            refined finish that actually feels different to step into.
          </p>
        </article>
      </div>
    </section>
  );
}