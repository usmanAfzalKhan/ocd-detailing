import React from "react";
import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <span>© {new Date().getFullYear()} OCD Detailing</span>
      <span className={styles.socials}>
        <a href="#">Instagram</a> | <a href="#">Facebook</a>
      </span>
      <span>Built with ❤️ in Canada</span>
    </div>
  </footer>
);

export default Footer;
