// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import {
  FaInstagram,
  FaFacebookF,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logoImg from "../assets/images/logo-hero.webp";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.topRow}>
        <Link to="/" className={styles.brand} aria-label="OCD Detailing home">
          <span className={styles.logoFrame}>
            <img
              src={logoImg}
              alt="OCD Detailing logo"
              className={styles.logo}
              draggable={false}
            />
          </span>

          <span className={styles.brandCopy}>
            <span className={styles.brandKicker}>Premium Mobile Detailing</span>
            <span className={styles.brandTitle}>OCD Detailing</span>
            <span className={styles.brandMeta}>Milton &amp; GTA</span>
          </span>
        </Link>

        <div className={styles.actions}>
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/ocd.detailinggta?igsh=ZmJ5MTFnb242dzdr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.iconLink}
            >
              <span className={styles.iconCircle}>
                <FaInstagram className={styles.icon} />
              </span>
            </a>

            <a
              href="https://www.facebook.com/ocd.detailinggta?rdid=JbcjbL3eUCWUoRup&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GJqLKZkhZ%2F#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={styles.iconLink}
            >
              <span className={styles.iconCircle}>
                <FaFacebookF className={styles.icon} />
              </span>
            </a>

            <a
              href="tel:+14167006670"
              aria-label="Phone"
              className={styles.iconLink}
            >
              <span className={styles.iconCircle}>
                <FaPhoneAlt className={styles.icon} />
              </span>
            </a>
          </div>

          <a
            className={styles.locationLink}
            href="https://maps.google.com/?q=Milton,+ON"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Milton, ON on Google Maps"
          >
            <FaMapMarkerAlt className={styles.locationIcon} />
            <span>Milton, ON</span>
          </a>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <p className={styles.tagline}>
          Precision-driven detailing, premium products, and a cleaner finish
          that actually feels different.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;