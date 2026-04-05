import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { services } from "../data/services";
import { useBookingCart } from "../context/BookingCartContext";
import logo from "../assets/images/logo-hero.webp";
import styles from "./ServiceDetailPage.module.css";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedServices, addService } = useBookingCart();

  const service = services.find((s) => s.id === id);

  if (!service) {
    return <p className={styles.notFound}>Service not found.</p>;
  }

  const isAdded = selectedServices.includes(service.title);

  function handleBookNow() {
    addService(service.title);
    navigate("/contact");
  }

  function handleAddService() {
    addService(service.title);
  }

  return (
    <article className={styles.detail}>
      <button className={styles.backBtn} onClick={() => navigate("/services")}>
        ← Back to Services
      </button>

      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>Service Detail</span>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.description}>{service.description}</p>

          <div className={styles.heroPills}>
            <span className={styles.heroPill}>Premium Finish</span>
            <span className={styles.heroPill}>Detail-Focused</span>
            <span className={styles.heroPill}>Professional Care</span>
          </div>
        </div>

        <div className={styles.heroMedia}>
          <img
            src={service.imgUrl}
            alt={service.title}
            className={styles.heroImage}
          />
          <img
            src={logo}
            alt="OCD Detailing logo"
            className={styles.logoOverlay}
          />
        </div>
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.contentColumn}>
          <div className={styles.card}>
            <h2 className={styles.subtitle}>What’s Included</h2>
            <ul className={styles.list}>
              {service.whatsIncluded.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h2 className={styles.subtitle}>Benefits</h2>
              <ul className={styles.list}>
                {service.pros.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.card}>
              <h2 className={styles.subtitle}>Why Choose This</h2>
              <ul className={styles.list}>
                {service.why.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={`${styles.card} ${styles.pricingBox}`}>
            <span className={styles.priceLabel}>Starting from</span>
            <div className={styles.priceAmount}>{service.price}</div>
            <p className={styles.priceText}>
              Final pricing can vary based on vehicle size, condition, and any
              add-ons requested.
            </p>

            <button className={styles.primaryButton} onClick={handleBookNow}>
              Book Now
            </button>

            <button
              className={`${styles.addServiceButton} ${
                isAdded ? styles.addServiceButtonAdded : ""
              }`}
              onClick={handleAddService}
              disabled={isAdded}
              aria-disabled={isAdded}
            >
              {isAdded ? "Added" : "Add Service"}
            </button>

            <button
              className={styles.secondaryButton}
              onClick={() => navigate("/contact")}
            >
              Ask a Question
            </button>

            <div className={styles.sideNote}>
              Service selections can be adjusted later during booking.
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}