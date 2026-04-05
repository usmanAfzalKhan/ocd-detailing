import React from "react";
import { Link } from "react-router-dom";
import SectionReveal from "./SectionReveal";
import styles from "./HomeSections.module.css";

export default function HomeAboutPreview() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionInner}>
        <SectionReveal>
          <div className={`${styles.sectionHead} ${styles.aboutHead}`}>
            <span className={styles.kicker}>About</span>
            <h2 className={styles.sectionTitle}>
              Precision-driven detailing with a clean, premium finish.
            </h2>
            <p className={styles.aboutLead}>
              OCD Detailing is built around careful workmanship, premium
              products, and the kind of finish that feels noticeably cleaner,
              sharper, and more complete the second you see it.
            </p>
          </div>
        </SectionReveal>

        <div className={styles.aboutGrid}>
          <SectionReveal delay={70}>
            <article className={styles.aboutCopy}>
              <div className={styles.aboutBadgeRow}>
                <span className={styles.aboutBadge}>Interior Reset</span>
                <span className={styles.aboutBadge}>Exterior Finish</span>
                <span className={styles.aboutBadge}>Long-Term Protection</span>
              </div>

              <div className={styles.aboutCopyBody}>
                <p className={styles.aboutCopyLead}>
                  Every vehicle is approached with the same mindset: take your
                  time, do it properly, and leave nothing looking rushed.
                </p>

                <p>
                  From deep interior cleaning to exterior enhancement and
                  long-term protection, the goal is simple — deliver a result
                  that looks premium right away and still feels worth it after
                  the job is done.
                </p>
              </div>

              <div className={styles.inlineActions}>
                <Link to="/about" className={styles.primaryLink}>
                  More About Us
                </Link>
              </div>
            </article>
          </SectionReveal>

          <SectionReveal delay={140}>
            <aside className={styles.aboutPanel}>
              <div className={styles.aboutPoint}>
                <span>Detail-first mindset</span>
                <p>
                  Tight finishes, clean edges, and a methodical approach that
                  keeps the final result looking intentional.
                </p>
              </div>

              <div className={styles.aboutPoint}>
                <span>Premium-grade products</span>
                <p>
                  Safe, proven products and proper detailing methods that help
                  bring out better gloss, cleanliness, and protection.
                </p>
              </div>

              <div className={styles.aboutPoint}>
                <span>Results you notice immediately</span>
                <p>
                  The aim is not just a cleaner car — it is a sharper, fresher,
                  more refined finish that actually feels different to step into.
                </p>
              </div>
            </aside>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}