import React, { useState } from "react";
import { Link } from "react-router-dom";
import faqs from "../../data/faq";
import SectionReveal from "./SectionReveal";
import styles from "./HomeSections.module.css";

export default function HomeFaqPreview() {
  const featuredFaqs = faqs.slice(0, 4);
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.faqLayout}>
          <SectionReveal className={styles.faqIntroReveal}>
            <div className={styles.faqIntro}>
              <div className={`${styles.sectionHead} ${styles.faqHead}`}>
                <span className={styles.kicker}>FAQ</span>
                <h2 className={styles.sectionTitle}>
                  The questions people usually ask before booking.
                </h2>
                <p className={styles.faqIntroText}>
                  Straight answers on booking, maintenance, coatings, and what
                  kind of result to expect before you lock anything in.
                </p>
              </div>

              <div className={styles.faqFeatureRow}>
                <span className={styles.faqFeatureBadge}>Booking</span>
                <span className={styles.faqFeatureBadge}>Maintenance</span>
                <span className={styles.faqFeatureBadge}>Protection</span>
              </div>

              <div className={styles.faqIntroPanel}>
                <span className={styles.faqIntroPanelLabel}>
                  Quick clarity before you book
                </span>
                <p>
                  These are the things clients usually want answered first, so
                  you can choose the right service faster and with more
                  confidence.
                </p>
              </div>

              <div className={styles.faqIntroActions}>
                <Link to="/faq" className={styles.primaryLink}>
                  See All FAQs
                </Link>
              </div>
            </div>
          </SectionReveal>

          <div className={styles.faqStack}>
            {featuredFaqs.map((item, index) => (
              <SectionReveal key={item.question} delay={index * 80}>
                <article className={styles.faqCard}>
                  <button
                    type="button"
                    className={styles.faqPreviewQuestion}
                    onClick={() => toggle(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className={styles.faqPreviewQuestionText}>
                      {item.question}
                    </span>
                    <span className={styles.faqPreviewIcon}>
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`${styles.faqPreviewAnswer} ${
                      openIndex === index ? styles.faqPreviewAnswerOpen : ""
                    }`}
                  >
                    <p>{item.answer}</p>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}