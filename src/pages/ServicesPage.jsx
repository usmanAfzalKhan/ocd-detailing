// src/pages/ServicesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import styles from './ServicesPage.module.css';

export default function ServicesPage() {
  return (
    <div className={styles.servicesPage}>
      <h1 className={styles.title}>Our Services</h1>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
        OCD Detailing offers these professional car care services — from deep cleans to ceramic coatings — to keep your vehicle looking its absolute best.
      </p>
      <div className={styles.servicesGrid}>
        {services.map((s) => (
          <div key={s.id} className={styles.card}>
            <div className={styles.imageWrap}>
              <img src={s.imgUrl} alt={s.title} className={styles.image} />
            </div>
            <h2 className={styles.name}>{s.title}</h2>
            <Link to={`/services/${s.id}`} className={styles.button}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
