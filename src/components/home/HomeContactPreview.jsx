import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import SectionReveal from "./SectionReveal";
import styles from "./HomeSections.module.css";

export default function HomeContactPreview() {
  return (
    <section className={`${styles.section} ${styles.contactSection}`}>
      <div className={styles.sectionInner}>
        <SectionReveal>
          <div className={styles.contactBox}>
            <span className={styles.kicker}>Contact</span>
            <h2 className={styles.contactTitle}>
              Ready to book, ask a question, or figure out the right service?
            </h2>
            <p className={styles.contactText}>
              Reach out for a booking request, service recommendation, or a more
              tailored detailing conversation.
            </p>

            <div className={styles.contactActions}>
              <Link to="/contact" className={styles.primaryLink}>
                Book an Appointment
              </Link>
              <Link to="/services" className={styles.secondaryLink}>
                Compare Services
              </Link>
            </div>

            <div className={styles.contactLinks}>
              <a
                href="tel:+14167006670"
                className={styles.iconLink}
                aria-label="Call OCD Detailing"
              >
                <FaPhoneAlt />
              </a>
              <a
                href="https://www.instagram.com/ocd.detailinggta?igsh=ZmJ5MTFnb242dzdr"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/ocd.detailinggta?rdid=JbcjbL3eUCWUoRup&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GJqLKZkhZ%2F#"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}