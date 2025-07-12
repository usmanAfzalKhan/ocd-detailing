// src/pages/Contact.jsx

import React, { useState } from "react";
import styles from "./Contact.module.css";

// Example services & vehicle types (adjust as needed)
const servicesList = [
  "Exterior Wash",
  "Interior Detailing",
  "Paint Correction",
  "Ceramic Coating",
  "Engine Bay Cleaning",
  "Pet Hair Removal",
  "Other"
];
const vehicleTypes = [
  "Sedan",
  "SUV",
  "Truck",
  "Van",
  "Coupe",
  "Convertible",
  "Wagon",
  "Other"
];

const initialState = {
  name: "",
  phone: "",
  date: "",
  services: [],
  otherService: "",
  vehicle: "",
  otherVehicle: "",
  message: ""
};

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Validation
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
    return err;
  }

  // Phone formatting
  function handlePhoneChange(e) {
    let digits = e.target.value.replace(/\D/g, "");
    if (digits.length > 10) digits = digits.slice(0, 10);
    let formatted = digits;
    if (digits.length > 6)
      formatted = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
    else if (digits.length > 3)
      formatted = `${digits.slice(0,3)}-${digits.slice(3)}`;
    setForm((f) => ({ ...f, phone: formatted }));
  }

  // Handle input change
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "services") {
      setForm((f) =>
        checked
          ? { ...f, services: [...f.services, value] }
          : { ...f, services: f.services.filter((s) => s !== value) }
      );
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }
  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  // Submit handler
  async function handleSubmit(e) {
    e.preventDefault();
    const currentErrors = validate(form);
    setErrors(currentErrors);
    setTouched({
      name: true, phone: true, date: true,
      services: true, otherService: true,
      vehicle: true, otherVehicle: true
    });
    if (Object.keys(currentErrors).length) return;

    setSubmitting(true);
    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) setSubmitted(true);
      else alert("Something went wrong. Please try again later.");
    } catch {
      alert("Could not submit form. Try again later.");
    }
    setSubmitting(false);
  }

  // Today's date for min
  const today = new Date().toISOString().split("T")[0];

  // Show success message
  if (submitted) {
    return (
      <section className={styles.contactSection}>
        <div className={styles.success}>
          <div>Thank you! Your request has been received.</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.contactSection}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.heading}>Contact Us</h2>

        {/* Name */}
        <label className={styles.label} htmlFor="name">Name<span className={styles.req}>*</span></label>
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
        {touched.name && errors.name && <div className={styles.error}>{errors.name}</div>}

        {/* Phone */}
        <label className={styles.label} htmlFor="phone">Phone Number<span className={styles.req}>*</span></label>
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
        {touched.phone && errors.phone && <div className={styles.error}>{errors.phone}</div>}

        {/* Date */}
        <label className={styles.label} htmlFor="date">Preferred Date<span className={styles.req}>*</span></label>
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
        {touched.date && errors.date && <div className={styles.error}>{errors.date}</div>}

        {/* Services */}
        <label className={styles.label}>Services Interested In<span className={styles.req}>*</span>:</label>
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
        {touched.services && errors.services && <div className={styles.error}>{errors.services}</div>}
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

        {/* Vehicle type */}
        <label className={styles.label}>Vehicle Type<span className={styles.req}>*</span>:</label>
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
        {touched.vehicle && errors.vehicle && <div className={styles.error}>{errors.vehicle}</div>}
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

        {/* Message */}
        <label className={styles.label} htmlFor="message">Your Message (optional)</label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          rows={4}
          placeholder="Let us know more details (optional)"
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}
