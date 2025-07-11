import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
// import logoImg from '../assets/images/logo.png';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const location = useLocation();

  // Close menu when clicking outside OR on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header} ref={wrapperRef}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.headerBrand} onClick={() => setMenuOpen(false)}>
          {/* If you want to use an image logo, uncomment below */}
          {/* <img src={logoImg} alt="OCD Detailing logo" className={styles.headerLogo} draggable={false} /> */}
          <div className={styles.headerLogo}>
            OCD
          </div>
          <div className={styles.headerBrandText}>
            <span className={styles.headerBrandMain}>OCD</span>
            <span className={styles.headerBrandDot}> Detailing</span>
          </div>
        </Link>
        <button
          className={`${styles.headerBurger}${menuOpen ? ' ' + styles.isOpen : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle navigation"
        >
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
        </button>
        <nav className={`${styles.headerNav}${menuOpen ? ' ' + styles.isOpen : ''}`}>
          <NavLink to="/"         className={({isActive}) => `${styles.headerLink}${isActive ? ' ' + styles.active : ''}`} onClick={() => setMenuOpen(false)} end>Home</NavLink>
          <NavLink to="/services" className={({isActive}) => `${styles.headerLink}${isActive ? ' ' + styles.active : ''}`} onClick={() => setMenuOpen(false)}>Services</NavLink>
          <NavLink to="/gallery"  className={({isActive}) => `${styles.headerLink}${isActive ? ' ' + styles.active : ''}`} onClick={() => setMenuOpen(false)}>Gallery</NavLink>
          <NavLink to="/reviews"  className={({isActive}) => `${styles.headerLink}${isActive ? ' ' + styles.active : ''}`} onClick={() => setMenuOpen(false)}>Reviews</NavLink>
          <NavLink to="/faq"      className={({isActive}) => `${styles.headerLink}${isActive ? ' ' + styles.active : ''}`} onClick={() => setMenuOpen(false)}>FAQ</NavLink>
          <NavLink to="/about"    className={({isActive}) => `${styles.headerLink}${isActive ? ' ' + styles.active : ''}`} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact"  className={({isActive}) => `${styles.headerLink}${isActive ? ' ' + styles.active : ''}`} onClick={() => setMenuOpen(false)}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
