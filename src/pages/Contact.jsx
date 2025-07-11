import React, { useState } from "react";
import styles from "./Contact.module.css";

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
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
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
  };

  const handlePhoneChange = (e) => {
    let digits = e.target.value.replace(/\D/g, "");
    if (digits.length > 10) digits = digits.slice(0, 10);
    let formatted = digits;
    if (digits.length > 6) formatted = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
    else if (digits.length > 3) formatted = `${digits.slice(0,3)}-${digits.slice(3)}`;
    setForm((f) => ({ ...f, phone: formatted }));
  };

  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  // Validation
  const errors = {};
  if (!form.name) errors.name = "Name is required.";
  if (!form.phone || form.phone.replace(/\D/g, "").length !== 10) errors.phone = "Valid Canadian phone number required.";
  if (!form.date) errors.date = "Preferred date is required.";
  if (!form.services.length) errors.services = "Please select at least one service.";
  if (form.services.includes("Other") && !form.otherService) errors.otherService = "Please specify the other service.";
  if (!form.vehicle) errors.vehicle = "Please select a vehicle type.";
  if (form.vehicle === "Other" && !form.otherVehicle) errors.otherVehicle = "Please specify the vehicle type.";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      phone: true,
      date: true,
      services: true,
      otherService: true,
      vehicle: true,
      otherVehicle: true
    });
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      // submit logic here
    }
  };

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
        <label className={styles.inputLabel} htmlFor="name">
          Name<span className={styles.req}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          className={styles.input}
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="off"
        />
        {touched.name && errors.name && (
          <div className={styles.error}>{errors.name}</div>
        )}

        {/* Phone */}
        <label className={styles.inputLabel} htmlFor="phone">
          Phone Number<span className={styles.req}>*</span>
        </label>
        <div className={styles.phoneRow}>
          <span className={styles.plusOne}>+1</span>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="647-555-1234"
            className={styles.input}
            value={form.phone}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            required
            autoComplete="tel"
            inputMode="numeric"
            maxLength={12}
            style={{ borderRadius: "0 6px 6px 0", borderLeft: "none" }}
          />
        </div>
        {touched.phone && errors.phone && (
          <div className={styles.error}>{errors.phone}</div>
        )}

        {/* Preferred Date */}
        <label className={styles.inputLabel} htmlFor="date">
          Preferred Date<span className={styles.req}>*</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className={styles.input}
          value={form.date}
          min={today}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touched.date && errors.date && (
          <div className={styles.error}>{errors.date}</div>
        )}

        {/* Services */}
        <label className={styles.label}>Services Interested In*:</label>
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
            <textarea
              name="otherService"
              className={styles.textarea}
              placeholder="Please specify the other service*"
              value={form.otherService}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              rows={2}
            />
            {touched.otherService && errors.otherService && <div className={styles.error}>{errors.otherService}</div>}
          </>
        )}

        {/* Vehicle type */}
        <label className={styles.label}>Vehicle Type*:</label>
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
            <textarea
              name="otherVehicle"
              className={styles.textarea}
              placeholder="Please specify the vehicle type*"
              value={form.otherVehicle}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              rows={2}
            />
            {touched.otherVehicle && errors.otherVehicle && <div className={styles.error}>{errors.otherVehicle}</div>}
          </>
        )}

        {/* Message (optional) */}
        <textarea
          name="message"
          placeholder="Your Message (optional)"
          className={styles.textarea}
          rows={4}
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit" className={styles.submitBtn}>
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
