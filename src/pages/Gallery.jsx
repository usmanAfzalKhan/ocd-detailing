// src/pages/Gallery.jsx

import React, { useState, useEffect, useCallback } from "react";
import styles from "./Gallery.module.css";
import { galleryPairs, workImages, videoList } from "../data/galleryImages";

export default function Gallery() {
  const flatImages = galleryPairs.flatMap(pair => [pair.before, pair.after]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const totalItems = flatImages.length + workImages.length;

  // prevent background scroll
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const openModal = idx => {
    setCurrentIdx(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const prevImage = () => {
    setCurrentIdx(i => (i - 1 + totalItems) % totalItems);
  };
  const nextImage = () => {
    setCurrentIdx(i => (i + 1) % totalItems);
  };

  // keyboard nav
  const onKeyDown = useCallback(e => {
    if (!modalOpen) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  }, [modalOpen]);
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <section className={styles.gallery}>
      {/* Page Heading */}
      <h1 className={styles.title}>Gallery</h1>
      <p className={styles.intro}>
        Explore the{" "}
        <a href="#before-after" className={styles.highlight} style={{ color: "#fff" }}>
          Before & After
        </a>{" "}
        section to see dramatic results, then head over to{" "}
        <a href="#our-work" className={styles.highlight} style={{ color: "#fff" }}>
          Our Work
        </a>{" "}
        for a showcase of our full portfolio, and finally check out{" "}
        <a href="#videos" className={styles.highlight} style={{ color: "#fff" }}>
          Videos
        </a>.
      </p>

      {/* Before & After */}
      <h2 id="before-after" className={styles.subtitle}>Before & After</h2>
      <p className={styles.instruction}><i>Tap any image to enlarge</i></p>
      <div className={styles.grid}>
        {flatImages.map((src, idx) => (
          <div key={idx} className={styles.imageWrapper} onClick={() => openModal(idx)}>
            <img src={src} alt="" className={styles.gridImage} />
            <img src="/images/logo-hero.png" alt="logo watermark" className={styles.logoOverlay} />
          </div>
        ))}
      </div>

      {/* Our Work */}
      <h2 id="our-work" className={styles.subtitle}>Our Work</h2>
      <p className={styles.instruction}><i>Tap any image to enlarge</i></p>
      <div className={styles.grid}>
        {workImages.map((src, idx) => (
          <div key={idx} className={styles.imageWrapper} onClick={() => openModal(flatImages.length + idx)}>
            <img src={src} alt="" className={styles.gridImage} />
            <img src="/images/logo-hero.png" alt="logo watermark" className={styles.logoOverlay} />
          </div>
        ))}
      </div>

      {/* Videos */}
      <h2 id="videos" className={styles.subtitle}>Videos</h2>
      <p className={styles.instruction}><i>Tap any video to play</i></p>
      <div className={styles.grid}>
        {videoList.map((src, idx) => (
          <video
            key={idx}
            src={src}
            className={styles.gridImage}
            controls
            onPlay={e => {
              document.querySelectorAll("video").forEach(v => {
                if (v !== e.target) v.pause();
              });
            }}
          />
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal} aria-label="Close">×</button>
            <img
              src={flatImages[currentIdx] || workImages[currentIdx - flatImages.length]}
              alt=""
              className={styles.modalImage}
            />
            <img src="/images/logo-hero.png" alt="logo watermark" className={styles.logoOverlayLarge} />
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevImage} aria-label="Previous">‹</button>
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextImage} aria-label="Next">›</button>
          </div>
        </div>
      )}
    </section>
  );
}
