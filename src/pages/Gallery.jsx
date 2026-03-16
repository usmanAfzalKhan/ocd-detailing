import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { galleryPairs, workImages, videoList } from "../data/galleryImages";
import BeforeAfterSlider from "../components/shared/BeforeAfterSlider";
import styles from "./Gallery.module.css";

export default function Gallery() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = location.hash.replace("#", "");
    const target = document.getElementById(targetId);

    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.hash]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Gallery</span>
            <h1 className={styles.title}>Proof you can scroll through properly.</h1>
            <p className={styles.text}>
              Browse our work, side-by-side transformations, and video reels
              that show the finish in motion.
            </p>
          </div>
        </div>
      </section>

      <section id="our-work" className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionTop}>
              <div className={styles.sectionHead}>
                <span className={styles.sectionKicker}>Our Work</span>
                <h2 className={styles.sectionTitle}>Finished details from every angle.</h2>
                <p className={styles.sectionText}>
                  A full look through the vehicles, finishes, and presentation
                  standards behind the work.
                </p>
              </div>
            </div>

            <div className={styles.workGrid}>
              {workImages.map((image, index) => (
                <article key={image} className={styles.workCard}>
                  <img
                    src={image}
                    alt={`OCD Detailing work ${index + 1}`}
                    className={styles.workImage}
                    loading="lazy"
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="before-after" className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionTop}>
              <div className={styles.sectionHead}>
                <span className={styles.sectionKicker}>Before &amp; After</span>
                <h2 className={styles.sectionTitle}>The difference should speak for itself.</h2>
                <p className={styles.sectionText}>
                  Drag each slider to compare the transformation properly.
                </p>
              </div>
            </div>

            <div className={styles.pairsGrid}>
              {galleryPairs.map((pair, index) => (
                <article
                  key={`${pair.before}-${pair.after}`}
                  className={styles.pairCard}
                >
                  <BeforeAfterSlider
                    beforeSrc={pair.before}
                    afterSrc={pair.after}
                    beforeAlt={`Before detailing ${index + 1}`}
                    afterAlt={`After detailing ${index + 1}`}
                    aspectRatio="16 / 11"
                    initial={0.5}
                  />

                  <div className={styles.pairMeta}>
                    <span>Before &amp; After</span>
                    <h3>Detailing transformation {index + 1}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="videos" className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionTop}>
              <div className={styles.sectionHead}>
                <span className={styles.sectionKicker}>Videos</span>
                <h2 className={styles.sectionTitle}>Reels that show the finish in motion.</h2>
                <p className={styles.sectionText}>
                  Clips that show reflections, cleanliness, gloss, and final
                  presentation better than stills alone.
                </p>
              </div>
            </div>

            <div className={styles.videoGrid}>
              {videoList.map((video, index) => (
                <article key={video} className={styles.videoCard}>
                  <video
                    src={video}
                    className={styles.video}
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

            <div className={styles.footer}>
              <Link to="/contact" className={styles.primaryLink}>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}