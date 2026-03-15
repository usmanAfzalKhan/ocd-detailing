import React from "react";
import { Link } from "react-router-dom";
import faqs from "../../data/faq";
import SectionReveal from "./SectionReveal";
import styles from "./HomeSections.module.css";

export default function HomeFaqPreview() {
  const featuredFaqs = faqs.slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <SectionReveal>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>FAQ</span>
            <h2 className={styles.sectionTitle}>The questions people usually ask before booking.</h2>
          </div>
        </SectionReveal>

        <div className={styles.faqGrid}>
          {featuredFaqs.map((item, index) => (
            <SectionReveal key={item.question} delay={index * 80}>
              <article className={styles.faqCard}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={220}>
          <div className={styles.sectionFooter}>
            <Link to="/faq" className={styles.secondaryLink}>
              See All FAQs
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}