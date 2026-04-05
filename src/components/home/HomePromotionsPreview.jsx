import React from "react";
import SectionReveal from "./SectionReveal";
import { useBookingCart } from "../../context/BookingCartContext";
import sectionStyles from "./HomeSections.module.css";
import styles from "./HomePromotionsPreview.module.css";

import firstTimeOffer from "../../assets/images/offer-first-time.webp";
import referralOffer from "../../assets/images/offer-refer-friend.webp";

const offers = [
  {
    id: "first-time",
    image: firstTimeOffer,
    alt: "First time detail 20 percent off offer",
    title: "First-time detail special",
    note: "20% off your first detailing service.",
    disclaimer: "Offer eligibility is confirmed during booking review.",
    contactState: {
      firstTime: "Yes",
      message: "Interested in the 20% off first-time detail offer.",
    },
  },
  {
    id: "referral",
    image: referralOffer,
    alt: "Refer a friend and save 20 percent offer",
    title: "Referral savings",
    note: "20% off when you were referred to OCD Detailing.",
    disclaimer: "Offer eligibility is confirmed during booking review.",
    contactState: {
      referred: "Yes",
      message: "Interested in the 20% off referral offer.",
    },
  },
];

export default function HomePromotionsPreview() {
  const { applyOffer, selectedOffers } = useBookingCart();

  function handleClaimOffer(offer) {
    applyOffer(offer);
  }

  return (
    <section
      className={`${sectionStyles.section} ${sectionStyles.sectionAlt} ${styles.sectionCompact}`}
    >
      <div className={sectionStyles.sectionInner}>
        <SectionReveal>
          <div className={`${sectionStyles.sectionHead} ${styles.head}`}>
            <span className={sectionStyles.kicker}>Offers</span>
            <h2 className={`${sectionStyles.sectionTitle} ${styles.title}`}>
              Current offers, presented properly.
            </h2>
            <p className={styles.text}>
              Two clean promotions built around the actual artwork, with a
              tighter premium layout and a direct path into the booking flow.
            </p>
          </div>
        </SectionReveal>

        <div className={styles.grid}>
          {offers.map((offer, index) => {
            const isAdded = selectedOffers.some(
              (selectedOffer) => selectedOffer.id === offer.id
            );

            return (
              <SectionReveal key={offer.id} delay={index * 90}>
                <article className={styles.card}>
                  <div className={styles.mediaWrap}>
                    <div className={styles.media}>
                      <img
                        src={offer.image}
                        alt={offer.alt}
                        className={styles.image}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className={styles.content}>
                    <div className={styles.copy}>
                      <span className={styles.eyebrow}>Limited offer</span>
                      <h3 className={styles.cardTitle}>{offer.title}</h3>
                      <p className={styles.note}>{offer.note}</p>
                      <p className={styles.disclaimer}>{offer.disclaimer}</p>
                    </div>

                    <div className={styles.actionWrap}>
                      <button
                        type="button"
                        onClick={() => handleClaimOffer(offer)}
                        className={`${sectionStyles.primaryLink} ${styles.actionLink}`}
                        disabled={isAdded}
                      >
                        {isAdded ? "Offer Added" : "Claim Offer"}
                      </button>
                    </div>
                  </div>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}