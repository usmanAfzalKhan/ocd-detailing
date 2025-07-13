import React from "react";
import styles from "./Footer.module.css";
import { FaInstagram, FaFacebook, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <span className={styles.brand}>OCD Detailing</span>
      <span className={styles.socials}>
        <a
          href="https://www.instagram.com/ocd.detailinggta?igsh=ZmJ5MTFnb242dzdr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={styles.iconLink}
        >
          <span className={styles.iconCircle}><FaInstagram className={styles.icon} /></span>
        </a>
        <a
          href="https://www.facebook.com/ocd.detailinggta?rdid=JbcjbL3eUCWUoRup&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GJqLKZkhZ%2F#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className={styles.iconLink}
        >
          <span className={styles.iconCircle}><FaFacebook className={styles.icon} /></span>
        </a>
        <a
          href="tel:+14167006670"
          aria-label="Phone"
          className={styles.iconLink}
        >
          <span className={styles.iconCircle}><FaPhoneAlt className={styles.icon} /></span>
        </a>
        <a
          className={styles.iconLink}
          href="https://maps.google.com/?q=Milton,+ON"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Milton, ON on Google Maps"
        >
          <span className={styles.iconCircle}><FaMapMarkerAlt className={styles.icon} /></span>
          <span className={styles.locationText}>Milton, ON</span>
        </a>
      </span>
      <span className={styles.tagline}>
        Premium Mobile Detailing · Milton &amp; GTA
      </span>
    </div>
  </footer>
);

export default Footer;
