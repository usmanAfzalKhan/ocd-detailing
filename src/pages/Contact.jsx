import React from "react";
import styles from "./Contact.module.css";

const Contact = () => (
  <section className={styles.contact}>
    <h2>Contact Us</h2>
    <form className={styles.form}>
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" rows={5} required />
      <button type="submit">Send</button>
    </form>
  </section>
);

export default Contact;
