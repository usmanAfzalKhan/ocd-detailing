import React from "react";
import styles from "./Gallery.module.css";
import galleryImages from "../data/galleryImages";

const Gallery = () => (
  <section className={styles.gallery}>
    <h2>Gallery</h2>
    <div className={styles.grid}>
      {galleryImages.map((img, i) => (
        <div key={i} className={styles.placeholder}>
          <span>{img.title}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Gallery;
