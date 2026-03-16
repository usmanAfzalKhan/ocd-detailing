import React, { useEffect, useRef } from "react";
import styles from "./ClickToPlayVideo.module.css";

export default function ClickToPlayVideo({
  src,
  videoId,
  activeVideoId,
  setActiveVideoId,
  className = "",
  ariaLabel = "Video clip",
}) {
  const videoRef = useRef(null);
  const isPlaying = activeVideoId === videoId;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {
        setActiveVideoId(null);
      });
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isPlaying, setActiveVideoId]);

  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (!video) return;
      video.pause();
    };
  }, []);

  function handleToggle() {
    setActiveVideoId((current) => (current === videoId ? null : videoId));
  }

  function handleEnded() {
    setActiveVideoId((current) => (current === videoId ? null : current));
  }

  return (
    <button
      type="button"
      className={`${styles.videoCard} ${className}`.trim()}
      onClick={handleToggle}
      aria-label={isPlaying ? `Pause ${ariaLabel}` : `Play ${ariaLabel}`}
    >
      <video
        ref={videoRef}
        src={src}
        className={styles.video}
        muted
        loop
        playsInline
        preload="metadata"
        onEnded={handleEnded}
      />

      <span
        className={`${styles.overlay} ${isPlaying ? styles.overlayHidden : ""}`}
        aria-hidden="true"
      >
        <span className={styles.playButton}>
          <span className={styles.playTriangle} />
        </span>
      </span>
    </button>
  );
}