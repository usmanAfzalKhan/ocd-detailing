import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import styles from './ServiceDetailPage.module.css';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === id);

  if (!service) {
    return <p style={{ textAlign: 'center' }}>Service not found.</p>;
  }

  return (
    <article className={styles.detail}>
      <h1 className={styles.title}>{service.title}</h1>
      <p className={styles.description}>{service.description}</p>

      <h2>What’s Included</h2>
      <ul className={styles.list}>
        {service.whatsIncluded.map((item,i) => <li key={i}>{item}</li>)}
      </ul>

      <h2>Pricing</h2>
      <p className={styles.price}>{service.price}</p>

      <h2>Benefits</h2>
      <ul className={styles.list}>
        {service.pros.map((item,i) => <li key={i}>{item}</li>)}
      </ul>

      <button className={styles.back} onClick={() => navigate('/services')}>
        ← Back to Services
      </button>
    </article>
  );
}
