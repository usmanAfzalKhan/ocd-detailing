// src/pages/Faq.jsx
import React, { useState } from "react";
import styles from "./Faq.module.css";
import faqs from "../data/faq";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = idx => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className={styles.faq}>
      <h2>Frequently Asked Questions</h2>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
        Below are some of the most common car detailing questions, answered by our detailing expert.
      </p>
      {faqs.map((item, idx) => (
        <div key={idx} className={styles.item}>
          <button
            className={styles.question}
            onClick={() => toggle(idx)}
            aria-expanded={openIndex === idx}
          >
            {item.question}
            <span className={styles.icon}>
              {openIndex === idx ? "−" : "+"}
            </span>
          </button>
          <div
            className={`${styles.answer} ${openIndex === idx ? styles.open : ""}`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
