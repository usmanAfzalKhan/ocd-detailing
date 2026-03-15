import React from "react";
import { Link } from "react-router-dom";
import { galleryPairs, workImages } from "../../data/galleryImages";
import SectionReveal from "./SectionReveal";
import styles from "./HomeSections.module.css";

export default function HomePortfolioPreview() {
  const beforeAfter = galleryPairs[0];
  const showcase = workImages.slice(0, 3);

  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionInner}>
        <SectionReveal>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Portfolio</span>
            <h2 className={styles.sectionTitle}>Proof beats promises every time.</h2>
            <p className={styles.sectionText}>
              Real work, real finish, real difference. The goal is not to say
              the vehicle looks better. The goal is to make it obvious.
            </p>
          </div>
        </SectionReveal>

        <div className={styles.portfolioGrid}>
          {beforeAfter && (
            <SectionReveal className={styles.portfolioFeature}>
              <article className={styles.portfolioCard}>
                <div className={styles.portfolioSplit}>
                  <img
                    src={beforeAfter.before}
                    alt="Before detailing"
                    className={styles.portfolioImage}
                  />
                  <img
                    src={beforeAfter.after}
                    alt="After detailing"
                    className={styles.portfolioImage}
                  />
                </div>

                <div className={styles.portfolioMeta}>
                  <span>Before / After</span>
                  <h3>Transformation-focused detailing.</h3>
                </div>
              </article>
            </SectionReveal>
          )}

          <div className={styles.portfolioSideGrid}>
            {showcase.map((image, index) => (
              <SectionReveal key={image} delay={index * 90}>
                <article className={styles.portfolioThumbCard}>
                  <img
                    src={image}
                    alt={`OCD Detailing portfolio ${index + 1}`}
                    className={styles.portfolioThumb}
                  />
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>

        <SectionReveal delay={220}>
          <div className={styles.sectionFooter}>
            <Link to="/gallery" className={styles.primaryLink}>
              View Full Portfolio
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}