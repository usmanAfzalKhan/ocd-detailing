import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import styles from './ServicesPage.module.css';

export default function ServicesPage() {
  return (
    <section className={styles.servicesPage}>
      <h1 className={styles.title}>Our Services</h1>
      <div className={styles.grid}>
        {services.map(s => (
          <div key={s.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={s.imgUrl} alt={s.title} className={styles.image} />
            </div>
            <h2 className={styles.name}>{s.title}</h2>
            <Link to={`/services/${s.id}`} className={styles.button}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
