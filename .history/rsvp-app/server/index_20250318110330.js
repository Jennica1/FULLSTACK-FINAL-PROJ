const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/rsvp", async (req, res) => {
  const { name, email, status } = req.body;

  try {
    await pool.query(
      "INSERT INTO rsvps (name, email, status) VALUES ($1, $2, $3)",
      [name, email, status]
    );

    if (status === "confirmed") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "RSVP Confirmation",
        text: `Hi ${name},\n\nThank you for confirming your attendance! See you soon!`,
      });
    }

    res.status(200).json({ message: "RSVP recorded successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing RSVP" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
