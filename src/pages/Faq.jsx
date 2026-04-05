import React, { useState } from "react";
import styles from "./Faq.module.css";
import faqs from "../data/faq";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>FAQ</span>
            <h1 className={styles.title}>Frequently Asked Questions</h1>
            <p className={styles.text}>
              Below are some of the most common car detailing questions,
              answered clearly so you know what to expect before booking.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionTop}>
              <div className={styles.sectionHead}>
                <span className={styles.sectionKicker}>Answers</span>
                <h2 className={styles.sectionTitle}>
                  Everything people usually ask before booking.
                </h2>
                <p className={styles.sectionText}>
                  Tap any question to expand it.
                </p>
              </div>
            </div>

            <div className={styles.faqStack}>
              {faqs.map((item, idx) => (
                <div key={idx} className={styles.item}>
                  <button
                    className={styles.question}
                    onClick={() => toggle(idx)}
                    aria-expanded={openIndex === idx}
                    type="button"
                  >
                    <span className={styles.questionText}>{item.question}</span>
                    <span className={styles.icon}>
                      {openIndex === idx ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`${styles.answer} ${
                      openIndex === idx ? styles.open : ""
                    }`}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}