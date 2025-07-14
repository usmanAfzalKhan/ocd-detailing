// src/pages/ServiceDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import logo from '../assets/images/logo-hero.png';
import styles from './ServiceDetailPage.module.css';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return <p className={styles.notFound}>Service not found.</p>;
  }

  return (
    <article className={styles.detail}>
      <h1 className={styles.title}>{service.title}</h1>
      <p className={styles.description}>{service.description}</p>

      <div className={styles.row}>
        <div className={styles.included}>
          <h2 className={styles.subtitle}>What’s Included</h2>
          <ul className={styles.list}>
            {service.whatsIncluded.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.pricingBox}>
          <h2 className={styles.subtitle}>Pricing</h2>
          <div className={styles.priceLine}>
            <span className={styles.priceLabel}>Starting from</span>
            <span className={styles.priceAmount}>{service.price}</span>
          </div>
          <button
            className={styles.button}
            onClick={() =>
              navigate('/contact', { state: { service: service.title } })
            }
          >
            Book Now
          </button>
        </div>
      </div>

      <div className={styles.row2}>
        <div className={styles.benefitsSection}>
          <h2 className={styles.subtitle}>Benefits</h2>
          <ul className={styles.list}>
            {service.pros.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.whySection}>
          <h2 className={styles.subtitle}>Why Choose This</h2>
          <ul className={styles.whyList}>
            {service.why.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <img
          src={service.imgUrl}
          alt={service.title}
          className={styles.bottomImage}
        />
        <img
          src={logo}
          alt="OCD Detailing logo"
          className={styles.logoOverlay}
        />
      </div>

      <button
        className={styles.backBtn}
        onClick={() => navigate('/services')}
      >
        ← Back to Services
      </button>
    </article>
  );
}
