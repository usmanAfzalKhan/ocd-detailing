import React from "react";
import Hero from "../components/Hero";
import HomeAboutPreview from "../components/home/HomeAboutPreview";
import HomeContactPreview from "../components/home/HomeContactPreview";
import HomeFaqPreview from "../components/home/HomeFaqPreview";
import HomePortfolioPreview from "../components/home/HomePortfolioPreview";
import HomeReviewsPreview from "../components/home/HomeReviewsPreview";
import HomeServicesPreview from "../components/home/HomeServicesPreview";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.homepage}>
      <Hero />

      <div className={styles.previewStack}>
        <HomeServicesPreview />
        <HomePortfolioPreview />
        <HomeReviewsPreview />
        <HomeFaqPreview />
        <HomeAboutPreview />
        <HomeContactPreview />
      </div>
    </main>
  );
}