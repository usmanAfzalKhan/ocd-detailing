// netlify/functions/contact.js

const nodemailer = require('nodemailer');

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body || '{}');

  // Transport using Gmail and environment variables
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Fallback: plain text for email clients that don't support HTML
  const textBody = `
NEW APPOINTMENT BOOKING

Name: ${data.name}
Phone: ${data.phone}
Preferred Date: ${data.date}
Services: ${(data.services || []).map(s =>
  s === "Other" && data.otherService ? `Other: ${data.otherService}` : s
).join(", ")}
Vehicle: ${data.vehicle === "Other" && data.otherVehicle ? `Other: ${data.otherVehicle}` : data.vehicle}
First Time: ${typeof data.firstTime !== "undefined" ? data.firstTime : "–"}
Referred: ${typeof data.referred !== "undefined" ? data.referred : "–"}
${data.referred === "Yes" && data.referredBy ? `Referred By: ${data.referredBy}` : ""}
Message: ${data.message ? data.message : "– none –"}

Sent from ocdautocare.netlify.app
  `.trim();

  // Pretty HTML body
  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:480px;background:#fafbfc;border-radius:10px;border:1px solid #ddd;padding:18px 26px 22px 26px;color:#232323">
      <h2 style="margin-top:0;font-size:1.4rem;color:#6366f1;">🚗 New Appointment Booking</h2>
      <table style="width:100%;font-size:1.06rem;margin-top:12px">
        <tr>
          <td style="font-weight:bold;padding:4px 0;width:130px">Name:</td>
          <td style="padding:4px 0;">${data.name}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;padding:4px 0;">Phone:</td>
          <td style="padding:4px 0;">${data.phone}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;padding:4px 0;">Preferred Date (YYYY/MM/DD):</td>
          <td style="padding:4px 0;">${data.date}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;padding:4px 0;vertical-align:top;">Services:</td>
          <td style="padding:4px 0;">
            <ul style="margin:0;padding-left:18px;">
              ${(data.services || []).map(s =>
                `<li>${s === "Other" && data.otherService ? `Other: ${data.otherService}` : s}</li>`
              ).join("")}
            </ul>
          </td>
        </tr>
        <tr>
          <td style="font-weight:bold;padding:4px 0;vertical-align:top;">Vehicle:</td>
          <td style="padding:4px 0;">
            ${data.vehicle === "Other" && data.otherVehicle
              ? `Other: ${data.otherVehicle}`
              : data.vehicle}
          </td>
        </tr>
        <tr>
          <td style="font-weight:bold;padding:4px 0;">First Time:</td>
          <td style="padding:4px 0;">${typeof data.firstTime !== "undefined" ? data.firstTime : "<span style='color:#aaa;'>–</span>"}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;padding:4px 0;">Referred:</td>
          <td style="padding:4px 0;">
            ${typeof data.referred !== "undefined" ? data.referred : "<span style='color:#aaa;'>–</span>"}
            ${data.referred === "Yes" && data.referredBy
              ? `<div style="color:#666;margin-top:2px;">Referred By: <b>${data.referredBy}</b></div>`
              : ""}
          </td>
        </tr>
        <tr>
          <td style="font-weight:bold;padding:4px 0;vertical-align:top;">Message:</td>
          <td style="padding:4px 0;">${data.message ? data.message : "<span style='color:#aaa;'>– none –</span>"}</td>
        </tr>
      </table>
      <div style="margin-top:18px;color:#888;font-size:0.96rem;">
        <em>Sent from ocdautocare.netlify.app</em>
      </div>
    </div>
  `;

  // Build the message
  const mailOptions = {
    from: `"OCD Detailing Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: "🚗 New Appointment Booking - OCD Detailing",
    text: textBody,
    html: htmlBody
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
