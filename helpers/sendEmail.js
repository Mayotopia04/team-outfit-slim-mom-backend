const nodemailer = require("nodemailer");
require("dotenv/config");

const { GMAIL_EMAIL, GMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: GMAIL_EMAIL };
  try {
    await transport.sendMail(email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

module.exports = sendEmail;

