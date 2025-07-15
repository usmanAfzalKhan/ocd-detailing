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

  const openModal = idx => {
    setCurrentIdx(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const prevImage = () =>
    setCurrentIdx(i => (i - 1 + flatImages.length) % flatImages.length);
  const nextImage = () =>
    setCurrentIdx(i => (i + 1) % flatImages.length);

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
      <h1 className={styles.mainTitle}>Gallery</h1>
      <p className={styles.intro}>
        Take a look at our work—before and after detailing! Each photo captures the dramatic transformations we achieve, from deep‑cleaned interiors and crystal‑clear windows to showroom‑shine exteriors and protected finishes. Explore how OCD Detailing brings out the best in every vehicle, restoring beauty and extending its life.
      </p>


      <h2 className={styles.subtitle}>Before &amp; After</h2>
      <div className={styles.aboutGalleryInstruction}>
        <i>Tap any image to enlarge</i>
      </div>

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
