import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";
import { slides } from "../data/slides";
import logoImg from "../assets/images/logo-hero.webp";

const SWIPE_THRESHOLD = 45;

export default function Hero() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) {
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }

    const delta = touchEndX.current - touchStartX.current;

    if (delta > SWIPE_THRESHOLD) prevSlide();
    if (delta < -SWIPE_THRESHOLD) nextSlide();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className={styles.hero}
      aria-label="OCD Detailing hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={styles.sliderTrack}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className={`${styles.slide} ${
              index === current ? styles.activeSlide : ""
            }`}
          >
            <img
              src={slide.imgUrl}
              alt={slide.title}
              className={styles.slideImage}
              draggable={false}
            />

            <img
              src={logoImg}
              alt="OCD Detailing logo"
              className={styles.slideLogo}
              draggable={false}
            />

            <div className={styles.topFade} />
            <div className={styles.leftFade} />
            <div className={styles.bottomFade} />

            <div className={styles.contentShell}>
              <div className={styles.contentBox}>
                <h1 className={styles.title}>{slide.title}</h1>

                <p className={styles.description}>{slide.description}</p>

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => navigate(slide.button.path)}
                  >
                    {slide.button.label}
                  </button>

                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => navigate("/gallery")}
                  >
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.bottomControls}>
        <div className={styles.pagination}>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`${styles.paginationItem} ${
                index === current ? styles.paginationItemActive : ""
              }`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className={styles.paginationLine} />
            </button>
          ))}
        </div>

        <div className={styles.controlsMeta}>
          <div className={styles.arrowCluster}>
            <button
              type="button"
              className={styles.arrowButton}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <span>‹</span>
            </button>

            <button
              type="button"
              className={styles.arrowButton}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <span>›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}