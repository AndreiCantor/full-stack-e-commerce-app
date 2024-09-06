import asyncHandler from "express-async-handler";

import nodemailer from "nodemailer";

//@desc send an email
//@route POST /api/contact/send
//@access Public

const sendEmail = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_PERSONAL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: email,
    to: "cantorandrei18@gmail.com",
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error sending email" });
  }
});

export { sendEmail };
