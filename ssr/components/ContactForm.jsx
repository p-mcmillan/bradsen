import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactForm = ({ agent }) => {
  const ContactSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Name Too $hort!")
      .max(50, "Name Too Long!")
      .required("Full Name Is Required!"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string()
      .min(6, "Message Too Short!")
      .max(150, "Must be 150 characters or less")
      .required("Message is required"),
  });

  return (
    <div className="bg-white rounded-xl shadow p-3">
      {/* Header block */}
      <div className="flex items-center gap-4 mb-6 bg-gray-50 rounded-2xl p-3">
        <img
          src={agent.agentImage}
          alt={agent.name}
          className="w-14 h-14 rounded-2xl object-[50%_10%]"
        />
        <div>
          <h5 className="text-md font-semibold">Contact {agent.name}</h5>
          <p className="text-sm text-gray-600">{agent.phone}</p>
        </div>
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={{ fullName: "", email: "", message: "" }}
        validationSchema={ContactSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await axios.post("/api/contact-agent", values);

            console.log("📨 API response:", res.data);

            if (res.data && res.data.success) {
              alert("Message sent!");
              resetForm();
            } else {
              alert("Something went wrong.");
            }
          } catch (err) {
            console.error("❌ Axios error:", err);

            // Helpful diagnostics
            if (err.response?.data) {
              console.log("Server responded with:", err.response.data);
            } else if (err.request) {
              console.log("No response received from server.");
            } else {
              console.log("Request setup error:", err.message);
            }

            alert("Failed to send message. Please try again.");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Row of inputs */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Field
                  name="fullName"
                  type="text"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name here."
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email here"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Field
                as="textarea"
                name="message"
                rows="6"
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black min-[834px]:w-[144px] text-white rounded-full py-2 font-semibold hover:bg-gray-800 transition"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;

/// CRM SUBMIT FORM

// NODE MAILER

// import express from "express";
// import nodemailer from "nodemailer";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/api/contact", async (req, res) => {
//   const { fullName, email, message } = req.body;

//   if (!fullName || !email || !message) {
//     return res.status(400).json({ error: "All fields are required." });
//   }

//   const transporter = nodemailer.createTransport({
//     service: "gmail", // or another SMTP provider
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });

//   try {
//     await transporter.sendMail({
//       from: `"${fullName}" <${email}>`,
//       to: process.env.MAIL_USER,
//       subject: "New Contact Form Message",
//       text: message,
//       html: `<p><strong>Name:</strong> ${fullName}</p>
//              <p><strong>Email:</strong> ${email}</p>
//              <p><strong>Message:</strong><br>${message}</p>`,
//     });

//     res.status(200).json({ message: "Message sent successfully." });
//   } catch (error) {
//     console.error("Error sending mail:", error);
//     res.status(500).json({ error: "Failed to send message." });
//   }
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// FRONT END

// onSubmit={async (values, { resetForm }) => {
//   try {
//     const res = await fetch("http://localhost:4000/api/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("Message sent successfully!");
//       resetForm();
//     } else {
//       alert(data.error || "Something went wrong.");
//     }
//   } catch (error) {
//     console.error("Error sending message:", error);
//     alert("An error occurred while sending your message.");
//   }
// }}

//✅ Rate limit or CAPTCHA to prevent spam

// BBC TO CRM

// await transporter.sendMail({
//   from: `"${fullName}" <${email}>`,
//   to: process.env.MAIL_USER,
//   subject: "New Contact Form Message",
//   text: message,
//   bcc: process.env.CRM_BCC, // add this
//   html: `
//     <p><strong>Name:</strong> ${fullName}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Message:</strong><br>${message}</p>
//   `,
// });

//TRACKING

// const trackingId = `CRM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// await transporter.sendMail({
//   subject: `Contact Form Submission (${trackingId})`,
//   html: `
//     <p><strong>Tracking ID:</strong> ${trackingId}</p>
//     ...
//   `
// });

//  free ubSpot

// await fetch("https://api.hubapi.com/engagements/v1/engagements", {
//   method: "POST",
//   headers: {
//     Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}`,
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     engagement: { type: "EMAIL", timestamp: Date.now() },
//     associations: { contactIds: [hubspotContactId] },
//     metadata: {
//       subject: "Contact Form Submission",
//       body: message,
//       fromEmail: email,
//       toEmails: [process.env.MAIL_USER],
//     },
//   }),
// });
