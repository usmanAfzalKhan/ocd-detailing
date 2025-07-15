import React, { useState, useEffect, useCallback } from "react";
import styles from "./Gallery.module.css";
import galleryPairs from "../data/galleryImages";  // array of { before, after } pairs

export default function Gallery() {
  // flatten into a single list
  const flatImages = galleryPairs.flatMap(pair => [pair.before, pair.after]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  // prevent background scroll
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const openModal = idx => setModalOpen(true) || setCurrentIdx(idx);
  const closeModal = () => setModalOpen(false);
  const prevImage = () => setCurrentIdx(i => (i - 1 + flatImages.length) % flatImages.length);
  const nextImage = () => setCurrentIdx(i => (i + 1) % flatImages.length);

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
      <h1 className={styles.title}>Before &amp; After</h1>

      <div className={styles.grid}>
        {flatImages.map((src, idx) => (
          <div
            key={idx}
            className={styles.imageWrapper}
            onClick={() => openModal(idx)}
          >
            <img src={src} alt="" className={styles.gridImage} />
            <img
              src="/images/logo-hero.png"
              alt="logo watermark"
              className={styles.logoOverlay}
            />
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>

            <div className={styles.modalImageWrapper}>
              <img
                src={flatImages[currentIdx]}
                alt=""
                className={styles.modalImage}
              />
              <img
                src="/images/logo-hero.png"
                alt="logo watermark"
                className={styles.logoOverlayLarge}
              />
            </div>

            <button
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={prevImage}
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={nextImage}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
