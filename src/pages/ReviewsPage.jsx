import React, { useState, useEffect, useRef } from "react";
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
  where,
} from "firebase/firestore";

const MAX_REVIEWS = 12;

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [reviewed, setReviewed] = useState(false);

  const addBtnRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(
        collection(db, "reviews"),
        where("rating", ">=", 4),
        orderBy("timestamp", "desc"),
        limit(MAX_REVIEWS)
      );
      const snap = await getDocs(q);
      setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };

    fetchReviews();
  }, []);

  const handleAddReview = async (review) => {
    setError("");
    setShowForm(false);

    if (review.rating < 4) {
      setReviewed(true);
      return;
    }

    const payload = {
      ...review,
      rating: Number(review.rating),
      timestamp: Date.now(),
    };

    try {
      await addDoc(collection(db, "reviews"), payload);

      const allQ = query(
        collection(db, "reviews"),
        where("rating", ">=", 4),
        orderBy("timestamp", "desc")
      );
      const allSnap = await getDocs(allQ);

      if (allSnap.size > MAX_REVIEWS) {
        const oldest = allSnap.docs.sort(
          (a, b) => a.data().timestamp - b.data().timestamp
        )[0];
        await deleteDoc(oldest.ref);
      }

      const freshQ = query(
        collection(db, "reviews"),
        where("rating", ">=", 4),
        orderBy("timestamp", "desc"),
        limit(MAX_REVIEWS)
      );
      const freshSnap = await getDocs(freshQ);
      setReviews(freshSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setReviewed(true);
    } catch (err) {
      if (
        err.code === "permission-denied" ||
        (err.message && err.message.includes("insufficient permissions"))
      ) {
        setError(
          "Sorry, your review could not be posted (contains disallowed words)."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
      setShowForm(false);
    }
  };

  const scrollToAddBtn = () => {
    if (addBtnRef.current) {
      addBtnRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <main className={styles.reviewsPage}>
      <div className={styles.headerBlock}>
        <span className={styles.kicker}>Reviews</span>
        <h1 className={styles.title}>Customer Reviews</h1>
        <p className={styles.intro}>
          Here are the latest testimonials from our satisfied clients. To share
          your own experience, simply click{" "}
          <button
            type="button"
            onClick={scrollToAddBtn}
            className={styles.inlineButton}
          >
            Add a Review
          </button>
          .
        </p>
      </div>

      {error && <div className={styles.errorMsg}>{error}</div>}

      <div className={styles.gridWrap}>
        <div className={styles.reviewsGrid}>
          {reviews.map((r, i) => (
            <article className={styles.card} key={r.id || i}>
              <div className={styles.stars}>
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </div>
              <div className={styles.text}>“{r.text}”</div>
              <div className={styles.author}>— {r.name}</div>
            </article>
          ))}
        </div>
      </div>

      {!showForm && !reviewed && !error && (
        <div className={styles.actionRow}>
          <button
            ref={addBtnRef}
            type="button"
            className={styles.addBtn}
            onClick={() => setShowForm(true)}
          >
            Add a Review
          </button>
        </div>
      )}

      {showForm && (
        <ReviewForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddReview}
        />
      )}

      {reviewed && !showForm && !error && (
        <div className={styles.thankYou}>
          <span role="img" aria-label="thanks">
            🙏
          </span>
          <br />
          Thanks for your review!
        </div>
      )}

      {error && !showForm && (
        <div className={styles.actionRow}>
          <button
            ref={addBtnRef}
            type="button"
            className={styles.addBtn}
            onClick={() => setShowForm(true)}
          >
            Add a Review
          </button>
        </div>
      )}
    </main>
  );
}