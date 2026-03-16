import React, { useState } from "react";
import { Link } from "react-router-dom";
import { galleryPairs, workImages, videoList } from "../../data/galleryImages";
import SectionReveal from "./SectionReveal";
import BeforeAfterSlider from "../shared/BeforeAfterSlider";
import ClickToPlayVideo from "../shared/ClickToPlayVideo";
import styles from "./HomeSections.module.css";

export default function HomePortfolioPreview() {
  const [activeVideoId, setActiveVideoId] = useState(null);

  const previewPairs = galleryPairs.slice(0, 2);
  const primaryPair = previewPairs[0];
  const secondaryPair = previewPairs[1];
  const collageImages = workImages.slice(0, 5);
  const featuredVideo = videoList[0];

  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionInner}>
        <SectionReveal>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Gallery</span>
            <h2 className={styles.sectionTitle}>Proof beats promises every time.</h2>
            <p className={styles.sectionText}>
              Real work, real finish, real difference. A quick look at the
              transformations, the final presentation, and the clips that show
              the finish properly.
            </p>
          </div>
        </SectionReveal>

        <div className={styles.galleryCollage}>
          {primaryPair && (
            <SectionReveal className={styles.galleryBeforeReveal}>
              <article
                className={`${styles.galleryFeatureCard} ${styles.galleryBeforeAfterCard}`}
              >
                <div className={styles.galleryCardTop}>
                  <div>
                    <span className={styles.galleryCardKicker}>Before &amp; After</span>
                    <h3 className={styles.galleryCardTitle}>
                      The difference should be obvious.
                    </h3>
                  </div>

                  <Link
                    to="/gallery#before-after"
                    className={`${styles.galleryInlineLink} ${styles.galleryInlineLinkDesktop}`}
                  >
                    View More
                  </Link>
                </div>

                <div className={styles.galleryBeforeAfterStack}>
                  <div className={styles.galleryBeforeAfterMedia}>
                    <BeforeAfterSlider
                      beforeSrc={primaryPair.before}
                      afterSrc={primaryPair.after}
                      beforeAlt="Before detailing"
                      afterAlt="After detailing"
                      aspectRatio="16 / 9.8"
                      initial={0.5}
                    />
                  </div>

                  {secondaryPair && (
                    <div className={styles.galleryBeforeAfterSecondary}>
                      <div className={styles.galleryMiniLabel}>More Transformation</div>
                      <BeforeAfterSlider
                        beforeSrc={secondaryPair.before}
                        afterSrc={secondaryPair.after}
                        beforeAlt="Before detailing second preview"
                        afterAlt="After detailing second preview"
                        aspectRatio="16 / 7.4"
                        initial={0.5}
                      />
                    </div>
                  )}
                </div>

                <div className={styles.galleryCardBottom}>
                  <p className={styles.galleryCardText}>
                    Drag the sliders to compare the finish before and after the detail.
                  </p>

                  <Link
                    to="/gallery#before-after"
                    className={`${styles.galleryInlineLink} ${styles.galleryInlineLinkMobile}`}
                  >
                    View More
                  </Link>
                </div>
              </article>
            </SectionReveal>
          )}

          <SectionReveal className={styles.galleryWorkReveal} delay={90}>
            <article className={`${styles.galleryFeatureCard} ${styles.galleryWorkFeature}`}>
              <div className={styles.galleryCardTop}>
                <div>
                  <span className={styles.galleryCardKicker}>Our Work</span>
                  <h3 className={styles.galleryCardTitle}>
                    Finished details from every angle.
                  </h3>
                </div>

                <Link
                  to="/gallery#our-work"
                  className={`${styles.galleryInlineLink} ${styles.galleryInlineLinkDesktop}`}
                >
                  View More
                </Link>
              </div>

              <div className={styles.galleryMosaicGrid}>
                {collageImages.map((image, index) => (
                  <article
                    key={image}
                    className={`${styles.galleryMosaicItem} ${
                      index === 0 ? styles.galleryMosaicItemLarge : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`OCD Detailing work ${index + 1}`}
                      className={styles.galleryMosaicImage}
                      loading="lazy"
                    />
                  </article>
                ))}
              </div>

              <div className={styles.galleryCardBottom}>
                <p className={styles.galleryCardText}>
                  A tighter preview of the gloss, interior finish, and final presentation.
                </p>

                <Link
                  to="/gallery#our-work"
                  className={`${styles.galleryInlineLink} ${styles.galleryInlineLinkMobile}`}
                >
                  View More
                </Link>
              </div>
            </article>
          </SectionReveal>

          <SectionReveal className={styles.galleryVideoReveal} delay={140}>
            <article className={`${styles.galleryFeatureCard} ${styles.galleryVideoFeature}`}>
              <div className={styles.galleryCardTop}>
                <div>
                  <span className={styles.galleryCardKicker}>Video</span>
                  <h3 className={styles.galleryCardTitle}>
                    See the finish in motion.
                  </h3>
                </div>

                <Link
                  to="/gallery#videos"
                  className={`${styles.galleryInlineLink} ${styles.galleryInlineLinkDesktop}`}
                >
                  View More
                </Link>
              </div>

              <div className={styles.galleryVideoFeatureMedia}>
                <div className={styles.galleryVideoPanel}>
                  <div className={styles.galleryVideoFrame}>
                    <ClickToPlayVideo
                      src={featuredVideo}
                      videoId="home-gallery-featured-video"
                      activeVideoId={activeVideoId}
                      setActiveVideoId={setActiveVideoId}
                      ariaLabel="Featured OCD Detailing video"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.galleryCardBottom}>
                <p className={styles.galleryCardText}>
                  Click the clip to play it and see the finish properly in motion.
                </p>

                <Link
                  to="/gallery#videos"
                  className={`${styles.galleryInlineLink} ${styles.galleryInlineLinkMobile}`}
                >
                  View More
                </Link>
              </div>
            </article>
          </SectionReveal>
        </div>

        <SectionReveal delay={220}>
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