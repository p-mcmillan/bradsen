import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  neighborhood: Yup.string().required("Please select a neighborhood"),
  message: Yup.string().required("Message is required"),
  subject: Yup.string(), // Optional
});

const neighborhoods = {
  Vancouver: [
    "Downtown",
    "Yaletown",
    "Gastown",
    "Coal Harbour",
    "West End",
    "Kitsilano",
    "Fairview",
    "Mount Pleasant",
    "Main Street",
    "Fraser",
    "Cambie Village",
    "Shaughnessy",
    "Marpole",
    "Oakridge",
    "Kerrisdale",
    "Dunbar",
    "Point Grey",
    "Hastings-Sunrise",
    "Renfrew-Collingwood",
    "Strathcona",
    "South Vancouver",
  ],
  "North Vancouver": [
    "Lonsdale",
    "Lower Lonsdale",
    "Upper Lonsdale",
    "Edgemont",
    "Lynn Valley",
    "Blueridge",
    "Deep Cove",
    "Canyon Heights",
    "Delbrook",
    "Capilano",
    "Seymour",
    "Queensbury",
    "Westlynn",
    "Grousewoods",
    "Indian River",
  ],
  Burnaby: [
    "Metrotown",
    "Brentwood",
    "Edmonds",
    "Burnaby Heights",
    "Capitol Hill",
    "Forest Glen",
    "South Slope",
    "Big Bend",
    "Deer Lake",
    "Central Park",
    "Willingdon Heights",
    "Montecito",
    "Lochdale",
    "Government Road",
    "Simon Fraser Hills",
    "Sperling-Duthie",
  ],
};

const ContactUsForm = () => {
  const allOptions = Object.entries(neighborhoods).flatMap(([city, hoods]) =>
    hoods.map((hood) => ({ value: hood, label: `${hood} (${city})` }))
  );

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        subject: "",
        message: "",
        neighborhood: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Submitted:", values);
        alert("Message sent successfully!");
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 min-[1440px]:w-[648px]">
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
                placeholder="Enter your full name here"
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
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          {/* Neighborhood Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Neighborhood
            </label>
            <Field
              as="select"
              name="neighborhood"
              className="w-full border rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your neighborhood</option>
              {allOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="neighborhood"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Subject (optional) */}
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <Field
              name="subject"
              type="text"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Subject (optional)"
            />
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactUsForm;

// yarn add nodemailer

// // server/email.js
// import nodemailer from "nodemailer";
// import express from "express";

// const router = express.Router();

// router.post("/api/contact", async (req, res) => {
//   const { fullName, email, message, neighborhood } = req.body;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // Or use a custom SMTP host
//       auth: {
//         user: process.env.MAIL_USER,     // e.g. yourgmail@gmail.com
//         pass: process.env.MAIL_PASS,     // App password or real password
//       },
//     });

//     const mailOptions = {
//       from: email,
//       to: process.env.MAIL_TO, // Your destination email
//       subject: `New message from ${fullName}`,
//       text: `
//         Name: ${fullName}
//         Email: ${email}
//         Neighborhood: ${neighborhood}
//         Message: ${message}
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: "Email sent!" });
//   } catch (error) {
//     console.error("Email failed:", error);
//     res.status(500).json({ success: false, error: "Failed to send email." });
//   }
// });

// export default router;

// import express from "express";
// import emailRoutes from "./server/email.js"; // adjust path as needed
// import bodyParser from "body-parser";

// const app = express();
// app.use(bodyParser.json());

// app.use(emailRoutes);

// // Existing SSR handler...

// onSubmit={async (values, { resetForm }) => {
//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });

//       const data = await res.json();
//       if (data.success) {
//         alert("Message sent!");
//         resetForm();
//       } else {
//         alert("Something went wrong.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error sending message.");
//     }
//   }}

//   // server/email.js
// import express from "express";
// import nodemailer from "nodemailer";

// const router = express.Router();

// // 🔹 First contact form (general inquiries)
// router.post("/api/contact", async (req, res) => {
//   const { fullName, email, message, neighborhood } = req.body;
//   await sendMail({
//     subject: `Contact from ${fullName}`,
//     text: `Neighborhood: ${neighborhood}\n\n${message}`,
//     from: email,
//   }, res);
// });

// // 🔹 Second contact form (e.g., job application)
// router.post("/api/job-apply", async (req, res) => {
//   const { name, email, coverLetter } = req.body;
//   await sendMail({
//     subject: `Job Application from ${name}`,
//     text: `Email: ${email}\n\nCover Letter:\n${coverLetter}`,
//     from: email,
//   }, res);
// });

// // ✅ Reusable mail sender
// async function sendMail({ from, subject, text }, res) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from,
//       to: process.env.MAIL_TO,
//       subject,
//       text,
//     });

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("Mailer error:", err);
//     res.status(500).json({ success: false, message: "Failed to send email." });
//   }
// }

// export default router;

// https://chatgpt.com/share/681d124e-49c8-800f-8b84-713eb3933d2a
