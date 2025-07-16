import React from "react";
import Hero from "../components/Hero";
import OffersRow from "../components/OffersRow";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Hero />

      <section className={styles.homepageWelcome}>
        <h1>Obsessive Compulsive Detailing</h1>
        <p>
          At OCD Detailing, we’re passionate about perfection—inside and out.
          Whether it’s precision paint correction, advanced ceramic coatings, or
          mobile interior and exterior care, our expert team brings
          showroom-quality results straight to your door.
        </p>
      </section>
      <p
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.2rem",
          margin: "0.4rem 0",
          paddingLeft: "0.8rem",
          paddingRight: "0.8rem", // Add side padding for both desktop and mobile
        }}
      >
        Trust us to obsess over every detail so you can drive with confidence
        and style.
      </p>
      <OffersRow />
    </div>
  );
}
