import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { neighborhoods } from "../constants";

const ContactSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  neighborhood: Yup.string().required("Please select a neighborhood"),
  message: Yup.string().required("Message is required"),
  subject: Yup.string(), // Optional
});

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
      onSubmit={async (values, { resetForm }) => {
        try {
          const res = await axios.post("/api/contact", values);

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
