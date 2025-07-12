// src/pages/ReviewsPage.jsx
import React, { useState, useEffect } from "react";
import styles from "./ReviewsPage.module.css";
import ReviewForm from "../components/ReviewForm";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  getDocs,
  deleteDoc,
  where
} from "firebase/firestore";

const MAX_REVIEWS = 12;

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [reviewed, setReviewed] = useState(false);

  // load 4–5★ reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(
        collection(db, "reviews"),
        where("rating", ">=", 4),
        orderBy("timestamp", "desc"),
        limit(MAX_REVIEWS)
      );
      const snap = await getDocs(q);
      setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetchReviews();
  }, []);

  // handle both low-star & high-star & profanity
  const handleAddReview = async (review) => {
    setError("");
    setShowForm(false);

    // low stars (<4): just thank & hide button
    if (review.rating < 4) {
      setReviewed(true);
      return;
    }

    // high stars (>=4): try to save
    const payload = { ...review, rating: Number(review.rating), timestamp: Date.now() };
    try {
      await addDoc(collection(db, "reviews"), payload);
      // cleanup oldest if > MAX_REVIEWS
      const allQ = query(
        collection(db, "reviews"),
        where("rating", ">=", 4),
        orderBy("timestamp", "desc")
      );
      const allSnap = await getDocs(allQ);
      if (allSnap.size > MAX_REVIEWS) {
        const oldest = allSnap.docs
          .sort((a, b) => a.data().timestamp - b.data().timestamp)[0];
        await deleteDoc(oldest.ref);
      }
      // reload
      const freshQ = query(
        collection(db, "reviews"),
        where("rating", ">=", 4),
        orderBy("timestamp", "desc"),
        limit(MAX_REVIEWS)
      );
      const freshSnap = await getDocs(freshQ);
      setReviews(freshSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setReviewed(true);
    } catch (err) {
      // profanity or other error
      if (
        err.code === "permission-denied" ||
        (err.message && err.message.includes("insufficient permissions"))
      ) {
        setError("Sorry, your review could not be posted (contains disallowed words).");
      } else {
        setError("An error occurred. Please try again.");
      }
      // show button again
      setShowForm(false);
    }
  };

  return (
    <div className={styles.reviewsPage}>
      <div className={styles.title}>Customer Reviews</div>

      {error && <div className={styles.errorMsg}>{error}</div>}

      <div className={styles.gridWrap}>
        <div className={styles.reviewsGrid}>
          {reviews.map((r, i) => (
            <div className={styles.card} key={r.id || i}>
              <div className={styles.stars}>
                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
              </div>
              <div className={styles.text}>{r.text}</div>
              <div className={styles.author}>— {r.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* show “add” only if no thank-you and no form open */}
      {!showForm && !reviewed && !error && (
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>
          Add a Review
        </button>
      )}

      {showForm && (
        <ReviewForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddReview}
        />
      )}

      {/* thank-you message */}
      {reviewed && !showForm && !error && (
        <div style={{ textAlign: "center", margin: "2rem 0", fontSize: "1.15rem" }}>
          <span role="img" aria-label="thanks">🙏</span><br/>
          Thanks for your review!
        </div>
      )}

      {/* if error, let them try again */}
      {error && !showForm && (
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>
          Add a Review
        </button>
      )}
    </div>
  );
}
