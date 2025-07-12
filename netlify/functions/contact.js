// netlify/functions/contact.js

const nodemailer = require('nodemailer');

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body || '{}');
  // Optional: add backend validation here if you want

  // Transport using Gmail and environment variables
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Build the message
  const mailOptions = {
    from: `"OCD Detailing Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: "New Contact Form Submission",
    text: `
Name: ${data.name}
Phone: ${data.phone}
Preferred Date: ${data.date}
Services: ${(data.services || []).join(", ")}
${data.otherService ? "Other Service: " + data.otherService : ""}
Vehicle: ${data.vehicle}
${data.otherVehicle ? "Other Vehicle: " + data.otherVehicle : ""}
Message: ${data.message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent!" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
