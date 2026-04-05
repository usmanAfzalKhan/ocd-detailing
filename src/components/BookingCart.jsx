import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookingCart } from "../context/BookingCartContext";
import styles from "./BookingCart.module.css";

export default function BookingCart() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedServices,
    selectedOffers,
    cartOpen,
    openCart,
    closeCart,
    removeService,
    removeOffer,
    clearServices,
  } = useBookingCart();

  const itemCount = selectedServices.length + selectedOffers.length;

  const [countPulse, setCountPulse] = useState(false);
  const previousCount = useRef(itemCount);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    closeCart();
  }, [location.pathname, closeCart]);

  useEffect(() => {
    if (previousCount.current !== itemCount) {
      setCountPulse(true);
      const timeout = setTimeout(() => setCountPulse(false), 420);
      previousCount.current = itemCount;
      return () => clearTimeout(timeout);
    }
  }, [itemCount]);

  useEffect(() => {
    if (!cartOpen) return;

    function handlePointerDown(event) {
      const target = event.target;

      if (panelRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;

      closeCart();
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeCart();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cartOpen, closeCart]);

  if (!itemCount) return null;

  function handleGoToBooking() {
    const mergedOfferState = selectedOffers.reduce(
      (acc, offer) => {
        const state = offer?.contactState || {};

        if (state.firstTime === "Yes") {
          acc.firstTime = "Yes";
        }

        if (state.referred === "Yes") {
          acc.referred = "Yes";
        }

        if (typeof state.message === "string" && state.message.trim()) {
          acc.messages.push(state.message.trim());
        }

        return acc;
      },
      { firstTime: "", referred: "", messages: [] }
    );

    closeCart();

    navigate("/contact", {
      state: {
        services: selectedServices,
        ...(mergedOfferState.firstTime
          ? { firstTime: mergedOfferState.firstTime }
          : {}),
        ...(mergedOfferState.referred
          ? { referred: mergedOfferState.referred }
          : {}),
        ...(mergedOfferState.messages.length
          ? {
              message: [...new Set(mergedOfferState.messages)].join(" "),
            }
          : {}),
      },
    });
  }

  return (
    <>
      <aside
        ref={panelRef}
        className={`${styles.cartPanel} ${cartOpen ? styles.cartPanelOpen : ""}`}
        aria-label="Booking cart"
      >
        <div className={styles.cartHead}>
          <div>
            <p className={styles.kicker}>Selected Items</p>
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
          {selectedOffers.map((offer, index) => (
            <div
              key={offer.id}
              className={`${styles.offerCard} ${
                cartOpen ? styles.cartItemOpen : ""
              }`}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className={styles.offerMeta}>
                <span className={styles.offerBadge}>Offer Applied</span>
                <span className={styles.offerTitle}>{offer.title}</span>
                {offer.note ? <p className={styles.offerText}>{offer.note}</p> : null}
                {offer.disclaimer ? (
                  <p className={styles.offerDisclaimer}>{offer.disclaimer}</p>
                ) : null}
              </div>

              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeOffer(offer.id)}
              >
                Remove
              </button>
            </div>
          ))}

          {selectedServices.map((service, index) => (
            <div
              key={service}
              className={`${styles.cartItem} ${
                cartOpen ? styles.cartItemOpen : ""
              }`}
              style={{
                animationDelay: `${(selectedOffers.length + index) * 60}ms`,
              }}
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
        ref={toggleRef}
        type="button"
        className={`${styles.cartToggle} ${
          cartOpen ? styles.cartToggleActive : ""
        }`}
        onClick={cartOpen ? closeCart : openCart}
        aria-label="Toggle booking cart"
        aria-expanded={cartOpen}
      >
        <span className={styles.cartToggleLabel}>Booking Cart</span>
        <span
          className={`${styles.cartToggleCount} ${
            countPulse ? styles.cartToggleCountPulse : ""
          }`}
        >
          {itemCount}
        </span>
      </button>
    </>
  );
}