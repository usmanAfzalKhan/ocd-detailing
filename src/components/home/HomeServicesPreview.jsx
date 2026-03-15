import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { services } from "../../data/services";
import { useBookingCart } from "../../context/BookingCartContext";
import SectionReveal from "./SectionReveal";
import styles from "./HomeSections.module.css";

export default function HomeServicesPreview() {
  const navigate = useNavigate();
  const { selectedServices, addService, addManyServices } = useBookingCart();

  function handleBookAll() {
    addManyServices(services.map((service) => service.title));
    navigate("/contact");
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
        <SectionReveal>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Services</span>
            <h2 className={styles.sectionTitle}>
              Built around the finish people actually notice.
            </h2>
            <p className={styles.sectionText}>
              From deep interior resets to paint correction and long-term
              ceramic protection, these are the services that give the vehicle
              a sharper presence.
            </p>
          </div>
        </SectionReveal>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => {
            const isAdded = selectedServices.includes(service.title);

            return (
              <SectionReveal key={service.id} delay={index * 80}>
                <article className={styles.serviceCard}>
                  <div className={styles.serviceImageWrap}>
                    <img
                      src={service.imgUrl}
                      alt={service.title}
                      className={styles.serviceImage}
                    />
                  </div>

                  <div className={styles.serviceBody}>
                    <div className={styles.serviceTop}>
                      <h3>{service.title}</h3>
                      <span className={styles.servicePrice}>{service.price}</span>
                    </div>

                    <p>{service.description}</p>

                    <div className={styles.cardActions}>
                      <Link
                        to={`/services/${service.id}`}
                        className={styles.cardLink}
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        className={`${styles.cardButton} ${
                          isAdded ? styles.cardButtonDisabled : ""
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
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal delay={220}>
          <div className={`${styles.sectionFooter} ${styles.centeredFooter}`}>
            <Link to="/services" className={styles.primaryLink}>
              Explore All Services
            </Link>

            <button
              type="button"
              className={styles.secondaryLink}
              onClick={handleBookAll}
            >
              Book Now
            </button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}