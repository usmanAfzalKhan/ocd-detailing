import React from "react";
import { Link } from "react-router-dom";
import { galleryPairs, workImages, videoList } from "../../data/galleryImages";
import SectionReveal from "./SectionReveal";
import BeforeAfterSlider from "../shared/BeforeAfterSlider";
import styles from "./HomeSections.module.css";

export default function HomePortfolioPreview() {
  const beforeAfter = galleryPairs[0];
  const workPreview = workImages.slice(0, 4);
  const videoPreview = videoList.slice(0, 4);

  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionInner}>
        <SectionReveal>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Gallery</span>
            <h2 className={styles.sectionTitle}>Proof beats promises every time.</h2>
            <p className={styles.sectionText}>
              Real work, real finish, real difference. Scroll through the work,
              the transformations, and the reels that show the finish properly.
            </p>
          </div>
        </SectionReveal>

        <div className={styles.galleryPreviewStack}>
          {beforeAfter && (
            <SectionReveal>
              <div className={styles.galleryBlock}>
                <div className={styles.galleryBlockTop}>
                  <div className={styles.galleryBlockHead}>
                    <span className={styles.galleryBlockKicker}>Before &amp; After</span>
                    <h3 className={styles.galleryBlockTitle}>
                      The difference should be obvious.
                    </h3>
                    <p className={styles.galleryBlockText}>
                      Drag the slider to compare the finish before and after the
                      detail.
                    </p>
                  </div>

                  <Link
                    to="/gallery#before-after"
                    className={`${styles.primaryLink} ${styles.galleryBlockAction}`}
                  >
                    View More
                  </Link>
                </div>

                <article className={styles.portfolioCard}>
                  <BeforeAfterSlider
                    beforeSrc={beforeAfter.before}
                    afterSrc={beforeAfter.after}
                    beforeAlt="Before detailing"
                    afterAlt="After detailing"
                    aspectRatio="16 / 10"
                    initial={0.5}
                  />

                  <div className={styles.portfolioMeta}>
                    <span>Transformation</span>
                    <h3>Real before-and-after results.</h3>
                  </div>
                </article>
              </div>
            </SectionReveal>
          )}

          <SectionReveal delay={90}>
            <div className={styles.galleryBlock}>
              <div className={styles.galleryBlockTop}>
                <div className={styles.galleryBlockHead}>
                  <span className={styles.galleryBlockKicker}>Our Work</span>
                  <h3 className={styles.galleryBlockTitle}>
                    Finished details that hold up in every angle.
                  </h3>
                  <p className={styles.galleryBlockText}>
                    A quick look at the finish, clarity, and presentation across
                    different vehicles.
                  </p>
                </div>

                <Link
                  to="/gallery#our-work"
                  className={`${styles.primaryLink} ${styles.galleryBlockAction}`}
                >
                  View More
                </Link>
              </div>

              <div className={styles.galleryWorkGrid}>
                {workPreview.map((image, index) => (
                  <article key={image} className={styles.galleryWorkCard}>
                    <img
                      src={image}
                      alt={`OCD Detailing work ${index + 1}`}
                      className={styles.galleryWorkThumb}
                      loading="lazy"
                    />
                  </article>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={180}>
            <div className={styles.galleryBlock}>
              <div className={styles.galleryBlockTop}>
                <div className={styles.galleryBlockHead}>
                  <span className={styles.galleryBlockKicker}>Videos</span>
                  <h3 className={styles.galleryBlockTitle}>
                    Reels that show the finish in motion.
                  </h3>
                  <p className={styles.galleryBlockText}>
                    Short clips that show reflections, cleanliness, and final
                    presentation better than stills alone.
                  </p>
                </div>

                <Link
                  to="/gallery#videos"
                  className={`${styles.primaryLink} ${styles.galleryBlockAction}`}
                >
                  View More
                </Link>
              </div>

              <div className={styles.galleryVideoGrid}>
                {videoPreview.map((video, index) => (
                  <article key={video} className={styles.galleryVideoCard}>
                    <video
                      src={video}
                      className={styles.galleryVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={`OCD Detailing video ${index + 1}`}
                    />
                  </article>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={240}>
          <div className={`${styles.sectionFooter} ${styles.centeredFooter}`}>
            <Link to="/gallery" className={styles.primaryLink}>
              Explore Full Gallery
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}