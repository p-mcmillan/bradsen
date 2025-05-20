import express from "express";

const router = express.Router();
import transporter from "../../utils/mailer.js";

router.post("/contact", async (req, res) => {
  const { fullName, email, message, neighborhood, subject = "" } = req.body;

  console.log("📨 Contact form submitted:", req.body);

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_TO,
      subject: subject || `New message from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\nNeighborhood: ${neighborhood}\n\n${message}`,
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Thanks for contacting Tyler!",
      text: `Hi ${fullName},\n\nThank you for reaching out. I’ve received your message and will get back to you soon.\n\n– Tyler Bradsen`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Email error:", err);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// 🔹 Agent-Specific Contact Form
router.post("/contact-agent", async (req, res) => {
  const { fullName, email, message, agentName, agentEmail } = req.body;

  console.log("📨 Agent contact submitted:", req.body);

  try {
    await transporter.sendMail({
      from: email,
      to: agentEmail || process.env.MAIL_TO,
      subject: `New inquiry for ${agentName}`,
      text: `You've received a message for ${agentName}.\n\nName: ${fullName}\nEmail: ${email}\n\n${message}`,
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Thanks for contacting Tyler!",
      text: `Hi ${fullName},\n\nThank you for reaching out. I’ve received your message and will get back to you soon.\n\n– Tyler Bradsen`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Agent email error:", err);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

export default router;
