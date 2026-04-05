import React from "react";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import { useBookingCart } from "../context/BookingCartContext";
import styles from "./ServicesPage.module.css";

export default function ServicesPage() {
  const { selectedServices, addService } = useBookingCart();

  return (
    <section className={styles.servicesPage}>
      <div className={styles.hero}>
        <span className={styles.kicker}>Services</span>
        <h1 className={styles.title}>
          Detailing built around the finish people notice.
        </h1>
        <p className={styles.intro}>
          OCD Detailing offers professional interior, exterior, correction, and
          protection services designed to make your vehicle feel cleaner,
          sharper, and properly finished.
        </p>

        <div className={styles.heroMeta}>
          <span className={styles.metaPill}>Interior Reset</span>
          <span className={styles.metaPill}>Paint Enhancement</span>
          <span className={styles.metaPill}>Ceramic Protection</span>
        </div>
      </div>

      <div className={styles.servicesGrid}>
        {services.map((service) => {
          const isAdded = selectedServices.includes(service.title);

          return (
            <article key={service.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <img
                  src={service.imgUrl}
                  alt={service.title}
                  className={styles.image}
                />
                <span className={styles.priceBadge}>{service.price}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h2 className={styles.name}>{service.title}</h2>
                  <p className={styles.description}>{service.description}</p>
                </div>

                <div className={styles.cardMeta}>
                  <span className={styles.metaItem}>
                    {service.whatsIncluded?.length || 0} inclusions
                  </span>
                  <span className={styles.metaDivider} />
                  <span className={styles.metaItem}>
                    {service.pros?.length || 0} benefits
                  </span>
                </div>

                <div className={styles.cardActions}>
                  <Link to={`/services/${service.id}`} className={styles.button}>
                    View Details
                  </Link>

                  <button
                    type="button"
                    className={`${styles.addButton} ${
                      isAdded ? styles.addButtonAdded : ""
                    }`}
                    onClick={() => addService(service.title)}
                    disabled={isAdded}
                    aria-disabled={isAdded}
                  >
                    {isAdded ? "Added" : "Add Service"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}