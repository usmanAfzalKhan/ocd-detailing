import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import logoImg from "../assets/images/logo-hero.png";
import styles from "./Header.module.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "FAQ", to: "/faq" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link
            to="/"
            className={styles.brand}
            onClick={() => setMenuOpen(false)}
            aria-label="OCD Detailing home"
          >
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
              <span className={styles.brandMeta}>GTA</span>
            </span>
          </Link>

          <div className={styles.desktopSide}>
            <nav className={styles.desktopNav} aria-label="Primary">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Link to="/contact" className={styles.desktopCta}>
              Book Now
            </Link>
          </div>

          <button
            type="button"
            className={`${styles.menuToggle} ${
              menuOpen ? styles.menuToggleOpen : ""
            }`}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </button>
        </div>
      </header>

      <div
        className={`${styles.mobileLayer} ${
          menuOpen ? styles.mobileLayerOpen : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />

        <aside
          id="mobile-navigation"
          className={styles.mobilePanel}
          aria-label="Mobile navigation"
        >
          <div className={styles.mobileTop}>
            <div className={styles.mobileBrand}>
              <span className={styles.mobileBrandTitle}>OCD Detailing</span>
              <span className={styles.mobileBrandMeta}>
                Premium Mobile Detailing
              </span>
            </div>

            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
          </div>

          <nav className={styles.mobileNav}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${
                    isActive ? styles.mobileLinkActive : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.mobileBottom}>
            <div className={styles.mobileSocials}>
              <a
                href="tel:+14167006670"
                className={styles.mobileIconLink}
                aria-label="Call OCD Detailing"
              >
                <FaPhoneAlt />
              </a>

              <a
                href="https://www.instagram.com/ocd.detailinggta?igsh=ZmJ5MTFnb242dzdr"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileIconLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/ocd.detailinggta?rdid=JbcjbL3eUCWUoRup&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GJqLKZkhZ%2F#"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileIconLink}
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </div>

            <Link to="/contact" className={styles.mobileCta}>
              Book an Appointment
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}