import React, { useState } from "react";
import servicesList from "../data/services"; // Array of service objects: [{ name, slug }]
import styles from "./ContactForm.module.css";
import ocdLogo from "../assets/ocd-logo.png"; // Update this path if your logo is elsewhere

const vehicleTypes = [
  "Sedan", "SUV", "Truck", "Van", "Coupe", "Convertible", "Wagon", "Other"
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    services: [],
    otherService: "",
    otherServiceDetail: "",
    vehicle: "",
    otherVehicle: "",
    otherVehicleDetail: "",
    message: "",
    firstTime: "",         // "Yes" or "No"
    referred: "",          // "Yes" or "No"
    whoReferred: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validation
  const errors = {};
  if (!form.name) errors.name = "Name is required.";
  if (!form.phone || form.phone.replace(/\D/g, "").length !== 10)
    errors.phone = "Valid Canadian phone number required.";
  if (!form.date) errors.date = "Please select a preferred date.";
  if (!form.services.length) errors.services = "Please select at least one service.";
  if (form.services.includes("Other") && !form.otherServiceDetail)
    errors.otherServiceDetail = "Please specify the other service.";
  if (!form.vehicle) errors.vehicle = "Please select a vehicle type.";
  if (form.vehicle === "Other" && !form.otherVehicleDetail)
    errors.otherVehicleDetail = "Please specify the vehicle type.";
  if (!form.firstTime) errors.firstTime = "Please select an option.";
  if (!form.referred) errors.referred = "Please select an option.";
  if (form.referred === "Yes" && !form.whoReferred)
    errors.whoReferred = "Please specify who referred you.";

  // Date logic: disable past dates
  const today = new Date().toISOString().split("T")[0];

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "services") {
      setForm((f) =>
        checked
          ? { ...f, services: [...f.services, value] }
          : { ...f, services: f.services.filter((s) => s !== value) }
      );
    } else if (name === "phone") {
      setForm((f) => ({
        ...f,
        phone: value.replace(/\D/g, "").slice(0, 10)
      }));
    } else if (name === "referred") {
      setForm((f) => ({
        ...f,
        referred: value,
        whoReferred: value === "Yes" ? f.whoReferred : ""
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    if (e.target.name === "phone") {
      // format as XXX-XXX-XXXX
      let value = form.phone.replace(/\D/g, "");
      let formatted = value;
      if (value.length > 6) formatted = `${value.slice(0,3)}-${value.slice(3,6)}-${value.slice(6)}`;
      else if (value.length > 3) formatted = `${value.slice(0,3)}-${value.slice(3)}`;
      setForm((f) => ({ ...f, phone: formatted }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      phone: true,
      date: true,
      services: true,
      otherServiceDetail: true,
      vehicle: true,
      otherVehicleDetail: true,
      firstTime: true,
      referred: true,
      whoReferred: true,
    });
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      // submit logic here (API/email)
    }
  };

  if (submitted) {
    return (
      <section className={styles.contactFormSection}>
        <div className={styles.successMsg}>
          <img src={ocdLogo} alt="OCD Logo" style={{ width: 90, marginBottom: 16 }} />
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Thank you!</div>
          <span>Your request has been received.<br />You will be contacted in 2-3 business days.</span>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.contactFormSection}>
      <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name*"
          className={styles.input}
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {touched.name && errors.name && <div className={styles.error}>{errors.name}</div>}

        {/* Phone */}
        <div className={styles.phoneGroup}>
          <span className={styles.plusOne}>+1</span>
          <input
            type="text"
            name="phone"
            placeholder="647-555-1234*"
            className={styles.input}
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            inputMode="numeric"
            maxLength={12}
            autoComplete="tel"
          />
        </div>
        {touched.phone && errors.phone && <div className={styles.error}>{errors.phone}</div>}

        {/* Date */}
        <input
          type="date"
          name="date"
          className={styles.input}
          value={form.date}
          onChange={handleChange}
          onBlur={handleBlur}
          min={today}
          required
        />
        {touched.date && errors.date && <div className={styles.error}>{errors.date}</div>}

        {/* Services */}
        <div className={styles.servicesLabel}>Services Interested In*:</div>
        <div className={styles.servicesGrid}>
          {servicesList.map((s) => (
            <label key={s.slug} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="services"
                value={s.name}
                checked={form.services.includes(s.name)}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {s.name}
            </label>
          ))}
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="services"
              value="Other"
              checked={form.services.includes("Other")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            Other
          </label>
        </div>
        {touched.services && errors.services && <div className={styles.error}>{errors.services}</div>}
        {form.services.includes("Other") && (
          <>
            <textarea
              name="otherServiceDetail"
              className={styles.textarea}
              placeholder="Please specify the other service*"
              value={form.otherServiceDetail}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              rows={2}
            />
            {touched.otherServiceDetail && errors.otherServiceDetail && <div className={styles.error}>{errors.otherServiceDetail}</div>}
          </>
        )}

        {/* Vehicle */}
        <div className={styles.servicesLabel}>Vehicle Type*:</div>
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
                required
              />
              {type}
            </label>
          ))}
        </div>
        {touched.vehicle && errors.vehicle && <div className={styles.error}>{errors.vehicle}</div>}
        {form.vehicle === "Other" && (
          <>
            <textarea
              name="otherVehicleDetail"
              className={styles.textarea}
              placeholder="Please specify the vehicle type*"
              value={form.otherVehicleDetail}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              rows={2}
            />
            {touched.otherVehicleDetail && errors.otherVehicleDetail && <div className={styles.error}>{errors.otherVehicleDetail}</div>}
          </>
        )}

        {/* First time with OCD */}
        <div className={styles.servicesLabel}>Is this your first time with OCD?*</div>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="firstTime"
              value="Yes"
              checked={form.firstTime === "Yes"}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            /> Yes
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="firstTime"
              value="No"
              checked={form.firstTime === "No"}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            /> No
          </label>
        </div>
        {touched.firstTime && errors.firstTime && <div className={styles.error}>{errors.firstTime}</div>}

        {/* Referred */}
        <div className={styles.servicesLabel}>Were you referred to us?*</div>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="referred"
              value="Yes"
              checked={form.referred === "Yes"}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            /> Yes
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="referred"
              value="No"
              checked={form.referred === "No"}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            /> No
          </label>
        </div>
        {touched.referred && errors.referred && <div className={styles.error}>{errors.referred}</div>}
        {form.referred === "Yes" && (
          <>
            <input
              type="text"
              name="whoReferred"
              className={styles.input}
              placeholder="Who referred you?*"
              value={form.whoReferred}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.whoReferred && errors.whoReferred && <div className={styles.error}>{errors.whoReferred}</div>}
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
}
