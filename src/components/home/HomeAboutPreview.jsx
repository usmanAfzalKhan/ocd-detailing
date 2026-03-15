import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import SectionReveal from "./SectionReveal";
import styles from "./HomeSections.module.css";

const fallbackReviews = [
  {
    name: "Satisfied Client",
    rating: 5,
    text: "The finish looked incredible and the attention to detail stood out immediately.",
  },
  {
    name: "GTA Customer",
    rating: 5,
    text: "Super convenient, super professional, and the vehicle looked way better than expected.",
  },
  {
    name: "Returning Client",
    rating: 5,
    text: "Interior felt fully reset and the exterior gloss looked clean, sharp, and premium.",
  },
];

export default function HomeReviewsPreview() {
  const [reviews, setReviews] = useState(fallbackReviews);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const q = query(
          collection(db, "reviews"),
          where("rating", ">=", 4),
          orderBy("timestamp", "desc"),
          limit(3)
        );
        const snap = await getDocs(q);
        const fetched = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (fetched.length) setReviews(fetched);
      } catch {
        // keep fallback content
      }
    };

    loadReviews();
  }, []);

  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionInner}>
        <SectionReveal>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Reviews</span>
            <h2 className={styles.sectionTitle}>What the finish feels like after the job is done.</h2>
          </div>
        </SectionReveal>

        <div className={styles.reviewsGrid}>
          {reviews.map((review, index) => (
            <SectionReveal
              key={review.id || `${review.name}-${index}`}
              delay={index * 90}
            >
              <article className={styles.reviewCard}>
                <div className={styles.reviewStars}>
                  {"★".repeat(Math.min(review.rating || 5, 5))}
                </div>
                <p className={styles.reviewText}>{review.text}</p>
                <span className={styles.reviewName}>— {review.name}</span>
              </article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={220}>
          <div className={styles.sectionFooter}>
            <Link to="/reviews" className={styles.secondaryLink}>
              View All Reviews
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}