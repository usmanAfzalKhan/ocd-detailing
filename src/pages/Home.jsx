// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Hero />
      <section className={styles.homepageWelcome}>
        <h1>Obsessive Compulsion Detailing</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />
          <strong>Premium Detailing, Perfection Obsessed.</strong>
        </p>
      </section>
    </div>
  );
}
