import React from "react";
import styles from "./Services.module.css";
import services from "../data/services";

const Services = () => (
  <section className={styles.services}>
    <h2>Our Services</h2>
    <div className={styles.grid}>
      {services.map((svc, i) => (
        <div key={i} className={styles.card}>
          <h4>{svc.name}</h4>
          <p>{svc.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Services;
