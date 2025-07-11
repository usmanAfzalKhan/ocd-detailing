import React from "react";
import styles from "./Reviews.module.css";
import reviews from "../data/reviews";

const Reviews = () => (
  <section className={styles.reviews}>
    <h2>Customer Reviews</h2>
    {reviews.map((r, i) => (
      <div className={styles.reviewCard} key={i}>
        <p>“{r.text}”</p>
        <span>- {r.name}</span>
      </div>
    ))}
  </section>
);

export default Reviews;
