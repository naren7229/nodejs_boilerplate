const nodemailer = require("nodemailer");
const config = require("config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: config.get("MAIL.USERNAME"),
    // pass: config.get("MAIL.PASSWORD")
  }
});

// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
    throw new Error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports = { transporter };
