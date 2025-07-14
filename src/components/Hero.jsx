import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';
import logo from '../assets/images/logo-hero.png';
import { slides } from '../data/slides';

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const len = slides.length;

  let touchStartX = null, touchEndX = null;
  const minSwipe = 35;
  const onTouchStart = e => { touchStartX = e.touches[0].clientX; };
  const onTouchMove  = e => { touchEndX   = e.touches[0].clientX; };
  const onTouchEnd   = () => {
    if (touchStartX != null && touchEndX != null) {
      const dx = touchEndX - touchStartX;
      if (dx > minSwipe) prev();
      else if (dx < -minSwipe) next();
    }
    touchStartX = touchEndX = null;
  };

  const next = () => setCurrent(i => (i === len - 1 ? 0 : i + 1));
  const prev = () => setCurrent(i => (i === 0      ? len - 1 : i - 1));

  return (
    <section
      className={styles.hero}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <img src={logo} alt="OCD Logo" className={styles.logoCorner} />

      <button
        className={`${styles.arrow} ${styles.left}`}
        onClick={prev}
        aria-label="Previous slide"
      >‹</button>

      <div
        className={styles.slider}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map(slide => (
          <div className={styles.slide} key={slide.id}>
            <img
              src={slide.imgUrl}
              alt={slide.title}
              className={styles.image}
              draggable={false}
            />

            <div className={styles.overlayContent}>
              <h2 className={styles.heading}>{slide.title}</h2>
              <p className={styles.subtitle}>{slide.description}</p>
              <button
                className={styles.button}
                onClick={() => navigate(slide.button.path)}
              >
                {slide.button.label}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={next}
        aria-label="Next slide"
      >›</button>

      <div className={styles.indicators}>
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${current === idx ? styles.active : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
}
