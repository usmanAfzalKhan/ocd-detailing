import React from "react";
import { Link } from "react-router-dom";
import SectionReveal from "./SectionReveal";
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
    contactState: {
      referred: "Yes",
      message: "Interested in the 20% off referral offer.",
    },
  },
];

export default function HomePromotionsPreview() {
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
              tighter premium layout and a direct path into the booking form.
            </p>
          </div>
        </SectionReveal>

        <div className={styles.grid}>
          {offers.map((offer, index) => (
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
                  </div>

                  <div className={styles.actionWrap}>
                    <Link
                      to="/contact"
                      state={offer.contactState}
                      className={`${sectionStyles.primaryLink} ${styles.actionLink}`}
                    >
                      Claim Offer
                    </Link>
                  </div>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}