import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookingCart } from "../context/BookingCartContext";
import styles from "./BookingCart.module.css";

export default function BookingCart() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedServices,
    cartOpen,
    openCart,
    closeCart,
    removeService,
    clearServices,
  } = useBookingCart();

  const [cartBump, setCartBump] = useState(false);
  const previousCount = useRef(selectedServices.length);

  useEffect(() => {
    closeCart();
  }, [location.pathname, closeCart]);

  useEffect(() => {
    if (previousCount.current !== selectedServices.length) {
      setCartBump(true);
      const timeout = setTimeout(() => setCartBump(false), 420);
      previousCount.current = selectedServices.length;
      return () => clearTimeout(timeout);
    }
  }, [selectedServices.length]);

  if (!selectedServices.length) return null;

  function handleGoToBooking() {
    closeCart();
    navigate("/contact");
  }

  return (
    <>
      <aside
        className={`${styles.cartPanel} ${
          cartOpen ? styles.cartPanelOpen : ""
        }`}
        aria-label="Booking cart"
      >
        <div className={styles.cartHead}>
          <div>
            <p className={styles.kicker}>Selected Services</p>
            <h3 className={styles.title}>Your Booking Cart</h3>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeCart}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className={styles.cartBody}>
          {selectedServices.map((service, index) => (
            <div
              key={service}
              className={`${styles.cartItem} ${
                cartOpen ? styles.cartItemOpen : ""
              }`}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <span className={styles.cartItemText}>{service}</span>

              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeService(service)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className={styles.cartActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={clearServices}
          >
            Clear
          </button>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleGoToBooking}
          >
            Book Selected
          </button>
        </div>
      </aside>

      <button
        type="button"
        className={`${styles.cartToggle} ${
          cartOpen ? styles.cartToggleActive : ""
        } ${cartBump ? styles.cartToggleBump : ""}`}
        onClick={cartOpen ? closeCart : openCart}
        aria-label="Toggle booking cart"
        aria-expanded={cartOpen}
      >
        <span className={styles.cartToggleLabel}>Booking Cart</span>
        <span className={styles.cartToggleCount}>{selectedServices.length}</span>
      </button>
    </>
  );
}