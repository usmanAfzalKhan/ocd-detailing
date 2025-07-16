// src/pages/Contact.jsx

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Contact.module.css";
import { services } from "../data/services";

const servicesList = [...services.map((s) => s.title), "Other"];
const vehicleTypes = [
  "Sedan",
  "SUV",
  "Truck",
  "Van",
  "Coupe",
  "Convertible",
  "Wagon",
  "Other",
];

const initialState = {
  name: "",
  phone: "",
  date: "",
  services: [],
  otherService: "",
  vehicle: "",
  otherVehicle: "",
  firstTime: "",
  referred: "",
  referredBy: "",
  message: "",
};

export default function Contact() {
  const location = useLocation();
  const initialPrefill = { ...initialState, ...(location.state || {}) };
  const [form, setForm] = useState(initialPrefill);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate(f) {
    const err = {};
    if (!f.name.trim()) err.name = "Name is required.";
    if (!f.phone || f.phone.replace(/\D/g, "").length !== 10)
      err.phone = "Valid Canadian phone number required.";
    if (!f.date) err.date = "Preferred date is required.";
    if (!f.services.length) err.services = "Select at least one service.";
    if (f.services.includes("Other") && !f.otherService.trim())
      err.otherService = "Please specify the service.";
    if (!f.vehicle) err.vehicle = "Select a vehicle type.";
    if (f.vehicle === "Other" && !f.otherVehicle.trim())
      err.otherVehicle = "Please specify the vehicle type.";
    if (!f.firstTime)
      err.firstTime = "Please indicate if this is your first time.";
    if (!f.referred) err.referred = "Please indicate if you were referred.";
    if (f.referred === "Yes" && !f.referredBy.trim())
      err.referredBy = "Please specify who referred you.";
    return err;
  }

  function handlePhoneChange(e) {
    let digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length > 6)
      formatted = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(
        6
      )}`;
    else if (digits.length > 3)
      formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    setForm((f) => ({ ...f, phone: formatted }));
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "services") {
      setForm((f) =>
        checked
          ? { ...f, services: [...f.services, value] }
          : { ...f, services: f.services.filter((s) => s !== value) }
      );
    } else if (name === "referred") {
      setForm((f) => ({
        ...f,
        referred: value,
        referredBy: value === "Yes" ? f.referredBy : "",
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const currentErrors = validate(form);
    setErrors(currentErrors);
    setTouched({
      name: true,
      phone: true,
      date: true,
      services: true,
      otherService: true,
      vehicle: true,
      otherVehicle: true,
      firstTime: true,
      referred: true,
      referredBy: true,
    });
    if (Object.keys(currentErrors).length) return;

    setSubmitting(true);
    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else alert("Something went wrong. Please try again later.");
    } catch {
      alert("Could not submit form. Try again later.");
    }
    setSubmitting(false);
  }

  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <section className={styles.contactSection}>
        <div className={styles.success}>
          <img
            src="/images/logo-hero.png"
            alt="OCD Detailing Logo"
            style={{
              width: "84px",
              marginBottom: "1.2rem",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.15rem",
              marginBottom: "0.35em",
              textAlign: "center",
            }}
          >
            Thank you! Your request has been received.
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: "1.04rem",
              textAlign: "center",
            }}
          >
            We’ll contact you back in 2–3 business days.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.contactSection}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.intro} style={{ color: "#ffffff" }}>
          Have a question? Call us at{" "}
          <a
            href="tel:+14167006670"
            style={{
              color: "#ffffff",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            +1&nbsp;416-700-6670
          </a>
          , DM us on{" "}
          <a
            href="https://www.instagram.com/ocd.detailinggta"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#ffffff",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Instagram
          </a>{" "}
          or{" "}
          <a
            href="https://www.facebook.com/ocd.detailinggta"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#ffffff",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Facebook
          </a>
          — we’ll get back to you ASAP!
        </p>

        {/* Name */}
        <label className={styles.label} htmlFor="name">
          Name<span className={styles.req}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input}
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
        {touched.name && errors.name && (
          <div className={styles.error}>{errors.name}</div>
        )}

        {/* Phone */}
        <label className={styles.label} htmlFor="phone">
          Phone Number<span className={styles.req}>*</span>
        </label>
        <div className={styles.phoneRow}>
          <span className={styles.plusOne}>+1</span>
          <input
            type="text"
            id="phone"
            name="phone"
            className={styles.input}
            placeholder="647-555-1234"
            value={form.phone}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            autoComplete="tel"
            inputMode="numeric"
            maxLength={12}
          />
        </div>
        {touched.phone && errors.phone && (
          <div className={styles.error}>{errors.phone}</div>
        )}

        {/* Date */}
        <label className={styles.label} htmlFor="date">
          Preferred Date<span className={styles.req}>*</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className={styles.input}
          value={form.date}
          onChange={handleChange}
          onBlur={handleBlur}
          min={today}
        />
        {touched.date && errors.date && (
          <div className={styles.error}>{errors.date}</div>
        )}

        {/* Services Interested In */}
        <label className={styles.label}>
          Services Interested In<span className={styles.req}>*</span>:
        </label>
        <div className={styles.servicesGrid}>
          {servicesList.map((service) => (
            <label key={service} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="services"
                value={service}
                checked={form.services.includes(service)}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {service}
            </label>
          ))}
        </div>
        {touched.services && errors.services && (
          <div className={styles.error}>{errors.services}</div>
        )}
        {form.services.includes("Other") && (
          <>
            <input
              type="text"
              name="otherService"
              className={styles.input}
              placeholder="Please specify the service"
              value={form.otherService}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.otherService && errors.otherService && (
              <div className={styles.error}>{errors.otherService}</div>
            )}
          </>
        )}

        {/* Vehicle Type */}
        <label className={styles.label}>
          Vehicle Type<span className={styles.req}>*</span>:
        </label>
        <div className={styles.vehicleGrid}>
          {vehicleTypes.map((type) => (
            <label key={type} className={styles.radioLabel}>
              <input
                type="radio"
                name="vehicle"
                value={type}
                checked={form.vehicle === type}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {type}
            </label>
          ))}
        </div>
        {touched.vehicle && errors.vehicle && (
          <div className={styles.error}>{errors.vehicle}</div>
        )}
        {form.vehicle === "Other" && (
          <>
            <input
              type="text"
              name="otherVehicle"
              className={styles.input}
              placeholder="Please specify the vehicle type"
              value={form.otherVehicle}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.otherVehicle && errors.otherVehicle && (
              <div className={styles.error}>{errors.otherVehicle}</div>
            )}
          </>
        )}

        {/* First Time */}
        <label className={styles.label}>
          Is this your first time with OCD?<span className={styles.req}>*</span>
        </label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="firstTime"
              value="Yes"
              checked={form.firstTime === "Yes"}
              onChange={handleChange}
              onBlur={handleBlur}
            />{" "}
            Yes
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="firstTime"
              value="No"
              checked={form.firstTime === "No"}
              onChange={handleChange}
              onBlur={handleBlur}
            />{" "}
            No
          </label>
        </div>
        {touched.firstTime && errors.firstTime && (
          <div className={styles.error}>{errors.firstTime}</div>
        )}

        {/* Referred */}
        <label className={styles.label}>
          Were you referred to us?<span className={styles.req}>*</span>
        </label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="referred"
              value="Yes"
              checked={form.referred === "Yes"}
              onChange={handleChange}
              onBlur={handleBlur}
            />{" "}
            Yes
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="referred"
              value="No"
              checked={form.referred === "No"}
              onChange={handleChange}
              onBlur={handleBlur}
            />{" "}
            No
          </label>
        </div>
        {touched.referred && errors.referred && (
          <div className={styles.error}>{errors.referred}</div>
        )}
        {form.referred === "Yes" && (
          <>
            <input
              type="text"
              name="referredBy"
              className={styles.input}
              placeholder="Who referred you?"
              value={form.referredBy}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.referredBy && errors.referredBy && (
              <div className={styles.error}>{errors.referredBy}</div>
            )}
          </>
        )}

        {/* Message */}
        <label className={styles.label} htmlFor="message">
          Your Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          rows={4}
          placeholder="Let us know more details (optional)"
          value={form.message}
          onChange={handleChange}
        />

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}
