import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { galleryPairs, workImages, videoList } from "../data/galleryImages";
import BeforeAfterSlider from "../components/shared/BeforeAfterSlider";
import ClickToPlayVideo from "../components/shared/ClickToPlayVideo";
import styles from "./Gallery.module.css";

export default function Gallery() {
  const location = useLocation();
  const [activeVideoId, setActiveVideoId] = useState(null);

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
                  Click any clip to play it.
                </p>
              </div>
            </div>

            <div className={styles.videoGrid}>
              {videoList.map((video, index) => {
                const videoId = `gallery-video-${index}`;

                return (
                  <article key={video} className={styles.videoCard}>
                    <ClickToPlayVideo
                      src={video}
                      videoId={videoId}
                      activeVideoId={activeVideoId}
                      setActiveVideoId={setActiveVideoId}
                      ariaLabel={`OCD Detailing video ${index + 1}`}
                    />
                  </article>
                );
              })}
            </div>

            <div className={styles.footer}>
              <Link to="/contact" className={styles.primaryLink}>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.socialCard}>
            <div className={styles.socialHead}>
              <span className={styles.sectionKicker}>View More</span>
              <h2 className={styles.sectionTitle}>
                Want more clips and fresh work?
              </h2>
              <p className={styles.sectionText}>
                To view more recent details, clips, and updates, follow OCD
                Detailing on Instagram and Facebook.
              </p>
            </div>

            <div className={styles.socialActions}>
              <a
                href="https://www.instagram.com/ocd.detailinggta?igsh=ZmJ5MTFnb242dzdr"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FaInstagram />
                <span>View More on Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/ocd.detailinggta?rdid=JbcjbL3eUCWUoRup&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GJqLKZkhZ%2F#"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FaFacebookF />
                <span>View More on Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}