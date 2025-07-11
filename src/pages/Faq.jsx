import React from "react";
import styles from "./Faq.module.css";

const Faq = () => (
  <section className={styles.faq}>
    <h2>Frequently Asked Questions</h2>
    <div className={styles.item}>
      <h4>Q: What services do you offer?</h4>
      <p>A: We offer interior, exterior, and specialty detailing for all vehicle types.</p>
    </div>
    <div className={styles.item}>
      <h4>Q: How do I book an appointment?</h4>
      <p>A: Use our contact form or call us directly!</p>
    </div>
    {/* Add more FAQs here */}
  </section>
);

export default Faq;
