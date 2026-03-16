import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import logoImg from "../assets/images/logo-hero.webp";
import styles from "./Header.module.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Reviews", to: "/reviews" },
  { label: "FAQ", to: "/faq" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const serviceItems = [
  { label: "Mobile Detailing", to: "/services/mobile-detailing" },
  { label: "Ceramic Coating", to: "/services/ceramic-coating" },
  { label: "Paint Correction", to: "/services/paint-correction" },
  { label: "Shampooing Carpets & Seats", to: "/services/shampoo-carpets-seats" },
  { label: "Clay Bar Treatment", to: "/services/clay-bar" },
];

const galleryItems = [
  { label: "Our Work", to: "/gallery#our-work", hash: "#our-work" },
  { label: "Before & After", to: "/gallery#before-after", hash: "#before-after" },
  { label: "Videos", to: "/gallery#videos", hash: "#videos" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);
  const location = useLocation();

  const servicesActive =
    location.pathname === "/services" || location.pathname.startsWith("/services/");

  const galleryActive = location.pathname === "/gallery";

  function isGalleryHashActive(hash) {
    return galleryActive && location.hash === hash;
  }

  useEffect(() => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileGalleryOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMobileServicesOpen(false);
        setMobileGalleryOpen(false);
      }
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
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                }
              >
                Home
              </NavLink>

              <div className={styles.desktopServices}>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `${styles.navLink} ${
                      isActive || servicesActive ? styles.navLinkActive : ""
                    }`
                  }
                >
                  Services
                  <span className={styles.desktopCaret}>▾</span>
                </NavLink>

                <div className={styles.desktopDropdown}>
                  <Link to="/services" className={styles.dropdownOverview}>
                    All Services
                  </Link>

                  <div className={styles.dropdownList}>
                    {serviceItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `${styles.dropdownLink} ${
                            isActive ? styles.dropdownLinkActive : ""
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.desktopServices}>
                <NavLink
                  to="/gallery"
                  className={() =>
                    `${styles.navLink} ${galleryActive ? styles.navLinkActive : ""}`
                  }
                >
                  Gallery
                  <span className={styles.desktopCaret}>▾</span>
                </NavLink>

                <div className={styles.desktopDropdown}>
                  <Link to="/gallery" className={styles.dropdownOverview}>
                    Full Gallery
                  </Link>

                  <div className={styles.dropdownList}>
                    {galleryItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`${styles.dropdownLink} ${
                          isGalleryHashActive(item.hash) ? styles.dropdownLinkActive : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {navItems.slice(1).map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
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
          onClick={() => {
            setMenuOpen(false);
            setMobileServicesOpen(false);
            setMobileGalleryOpen(false);
          }}
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
              onClick={() => {
                setMenuOpen(false);
                setMobileServicesOpen(false);
                setMobileGalleryOpen(false);
              }}
            >
              ×
            </button>
          </div>

          <nav className={styles.mobileNav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`
              }
            >
              Home
            </NavLink>

            <div className={styles.mobileServicesBlock}>
              <div className={styles.mobileServicesRow}>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `${styles.mobileServicesMainLink} ${
                      isActive || servicesActive ? styles.mobileLinkActive : ""
                    }`
                  }
                >
                  Services
                </NavLink>

                <button
                  type="button"
                  className={`${styles.mobileServicesToggle} ${
                    mobileServicesOpen ? styles.mobileServicesToggleOpen : ""
                  }`}
                  aria-label="Toggle service list"
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                >
                  <span>▾</span>
                </button>
              </div>

              <div
                className={`${styles.mobileServicesDropdown} ${
                  mobileServicesOpen ? styles.mobileServicesDropdownOpen : ""
                }`}
              >
                {serviceItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `${styles.mobileSubLink} ${
                        isActive ? styles.mobileSubLinkActive : ""
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className={styles.mobileServicesBlock}>
              <div className={styles.mobileServicesRow}>
                <NavLink
                  to="/gallery"
                  className={() =>
                    `${styles.mobileServicesMainLink} ${
                      galleryActive ? styles.mobileLinkActive : ""
                    }`
                  }
                >
                  Gallery
                </NavLink>

                <button
                  type="button"
                  className={`${styles.mobileServicesToggle} ${
                    mobileGalleryOpen ? styles.mobileServicesToggleOpen : ""
                  }`}
                  aria-label="Toggle gallery list"
                  aria-expanded={mobileGalleryOpen}
                  onClick={() => setMobileGalleryOpen((prev) => !prev)}
                >
                  <span>▾</span>
                </button>
              </div>

              <div
                className={`${styles.mobileServicesDropdown} ${
                  mobileGalleryOpen ? styles.mobileServicesDropdownOpen : ""
                }`}
              >
                {galleryItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`${styles.mobileSubLink} ${
                      isGalleryHashActive(item.hash) ? styles.mobileSubLinkActive : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {navItems.slice(1).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`
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