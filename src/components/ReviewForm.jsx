// src/components/ReviewForm.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./ReviewForm.module.css";

const MAX_CHARS = 200;

export default function ReviewForm({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [touched, setTouched] = useState({});
  const [hover, setHover] = useState(0);
  const boxRef = useRef();

  // ESC
  useEffect(() => {
    const onKey = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // click outside
  useEffect(() => {
    const onDown = e => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [onClose]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Please enter your name.";
    if (!rating)     errs.rating = "Please select a star rating.";
    if (!text.trim()) errs.text = "Please write your review.";
    return errs;
  };
  const errors = validate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, rating: true, text: true });
    if (Object.keys(errors).length) return;
    // pass everything to parent
    await onSubmit({
      name: name.trim(),
      rating,
      text: text.trim().slice(0, MAX_CHARS)
    });
    // parent will hide form / show thank you
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.box} ref={boxRef}>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close review form"
        >×</button>

        <h2 className={styles.title}>Add Your Review</h2>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.label}>
            Name<span className={styles.req}>*</span>
            <input
              type="text"
              value={name}
              maxLength={22}
              className={styles.input}
              onChange={e => setName(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, name: true }))}
              placeholder="Enter your name"
            />
            {touched.name && errors.name && (
              <div className={styles.error}>{errors.name}</div>
            )}
          </label>

          <label className={styles.label}>
            Rating<span className={styles.req}>*</span>
            <div className={styles.starsInput}>
              {[1,2,3,4,5].map(i => (
                <span
                  key={i}
                  className={(hover||rating) >= i ? styles.starFilled : styles.starEmpty}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(i)}
                  tabIndex={0}
                  onKeyDown={e => (e.key==="Enter"||e.key===" ") && setRating(i)}
                  role="button"
                  aria-label={`Rate ${i} star${i>1?"s":""}`}
                >★</span>
              ))}
            </div>
            {touched.rating && errors.rating && (
              <div className={styles.error}>{errors.rating}</div>
            )}
          </label>

          <label className={styles.label}>
            Review<span className={styles.req}>*</span>
            <textarea
              value={text}
              className={styles.textarea}
              maxLength={MAX_CHARS}
              rows={4}
              onChange={e => setText(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, text: true }))}
              placeholder="Write your review here"
            />
            <div className={styles.counter}>
              {text.length}/{MAX_CHARS}
            </div>
            {touched.text && errors.text && (
              <div className={styles.error}>{errors.text}</div>
            )}
          </label>

          <button type="submit" className={styles.submitBtn}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
