import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logoBox}>
        <div className={styles.logoPlaceholder}>OCD</div>
        <span className={styles.brand}>OCD Detailing</span>
      </div>
      <nav className={`${styles.nav} ${navOpen ? styles.open : ""}`}>
        <Link to="/" onClick={() => setNavOpen(false)}>Home</Link>
        <Link to="/services" onClick={() => setNavOpen(false)}>Services</Link>
        <Link to="/gallery" onClick={() => setNavOpen(false)}>Gallery</Link>
        <Link to="/reviews" onClick={() => setNavOpen(false)}>Reviews</Link>
        <Link to="/faq" onClick={() => setNavOpen(false)}>FAQ</Link>
        <Link to="/about" onClick={() => setNavOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setNavOpen(false)}>Contact</Link>
      </nav>
      <button
        className={styles.hamburger}
        onClick={() => setNavOpen((o) => !o)}
        aria-label="Toggle navigation"
      >
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </button>
    </header>
  );
};

export default Header;
