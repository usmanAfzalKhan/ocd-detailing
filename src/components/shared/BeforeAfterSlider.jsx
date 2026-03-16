import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import logoImg from "../../assets/images/logo-hero.webp";
import styles from "./BeforeAfterSlider.module.css";

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  aspectRatio = "16 / 10",
  initial = 0.5,
  min = 0,
  max = 1,
  className = "",
}) {
  const sliderId = useId();
  const wrapRef = useRef(null);
  const draggingRef = useRef(false);

  const clamp = useCallback(
    (value) => Math.max(min, Math.min(max, value)),
    [min, max]
  );

  const [position, setPosition] = useState(clamp(initial));
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setPosition(clamp(initial));
  }, [initial, clamp]);

  const setFromClientX = useCallback(
    (clientX) => {
      const element = wrapRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const raw = (clientX - rect.left) / rect.width;
      setPosition(clamp(raw));
    },
    [clamp]
  );

  const stopDragging = useCallback(() => {
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleWindowPointerUp = () => stopDragging();
    const handleWindowPointerCancel = () => stopDragging();

    window.addEventListener("pointerup", handleWindowPointerUp);
    window.addEventListener("pointercancel", handleWindowPointerCancel);

    return () => {
      window.removeEventListener("pointerup", handleWindowPointerUp);
      window.removeEventListener("pointercancel", handleWindowPointerCancel);
    };
  }, [stopDragging]);

  const onPointerDown = useCallback(
    (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      event.preventDefault();

      draggingRef.current = true;
      setIsDragging(true);
      event.currentTarget.setPointerCapture?.(event.pointerId);
      setFromClientX(event.clientX);
    },
    [setFromClientX]
  );

  const onPointerMove = useCallback(
    (event) => {
      if (!draggingRef.current) return;
      event.preventDefault();
      setFromClientX(event.clientX);
    },
    [setFromClientX]
  );

  const onPointerUp = useCallback(() => {
    stopDragging();
  }, [stopDragging]);

  const onKeyDown = useCallback(
    (event) => {
      const step = event.shiftKey ? 0.05 : 0.02;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setPosition((prev) => clamp(prev - step));
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setPosition((prev) => clamp(prev + step));
      }

      if (event.key === "Home") {
        event.preventDefault();
        setPosition(clamp(min));
      }

      if (event.key === "End") {
        event.preventDefault();
        setPosition(clamp(max));
      }
    },
    [clamp, min, max]
  );

  const clipStyle = useMemo(() => {
    const percent = (position * 100).toFixed(3);

    return {
      clipPath: `inset(0 0 0 ${percent}%)`,
    };
  }, [position]);

  const percentNow = Math.round(position * 100);

  return (
    <section
      className={`${styles.slider} ${className}`.trim()}
      aria-label="Before and after comparison"
    >
      <div
        ref={wrapRef}
        className={`${styles.stage} ${!isDragging ? styles.stageSmooth : ""}`}
        style={{ aspectRatio }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className={styles.layer}>
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className={styles.image}
            draggable={false}
          />
        </div>

        <div
          className={`${styles.layer} ${!isDragging ? styles.layerSmooth : ""}`}
          style={clipStyle}
          aria-hidden="true"
        >
          <img
            src={afterSrc}
            alt={afterAlt}
            className={styles.image}
            draggable={false}
          />
        </div>

        <div
          className={`${styles.line} ${!isDragging ? styles.lineSmooth : ""}`}
          style={{ left: `${position * 100}%` }}
          aria-hidden="true"
        />

        <button
          type="button"
          className={`${styles.handle} ${!isDragging ? styles.handleSmooth : ""}`}
          style={{ left: `${position * 100}%` }}
          role="slider"
          aria-label="Drag to compare before and after"
          aria-controls={sliderId}
          aria-valuemin={Math.round(min * 100)}
          aria-valuemax={Math.round(max * 100)}
          aria-valuenow={percentNow}
          onKeyDown={onKeyDown}
        >
          <span className={styles.chev} aria-hidden="true">
            ‹
          </span>

          <span className={styles.logoWrap} aria-hidden="true">
            <img
              src={logoImg}
              alt=""
              className={styles.logo}
              draggable={false}
            />
          </span>

          <span className={styles.chev} aria-hidden="true">
            ›
          </span>
        </button>

        <div id={sliderId} className={styles.labels} aria-hidden="true">
          <span className={styles.badge}>Before</span>
          <span className={styles.badge}>After</span>
        </div>
      </div>
    </section>
  );
}