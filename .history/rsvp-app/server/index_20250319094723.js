const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg"); // <-- Change Pool to Client
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const db = new Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "rsvp_db", // ⚠️ Fix this here!
  password: process.env.DB_PASSWORD || "1234",
  port: process.env.DB_PORT || 5432,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to PostgreSQL:", err.message);
  } else {
    console.log(
      "✅ Connected to PostgreSQL successfully to database:",
      process.env.DB_NAME || "rsvp_db"
    );
  }
});

app.post("/rsvp_db", async (req, res) => {
  const { name, email, status } = req.body;

  try {
    const columnCheck = await db.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'rsvps'`
    );
    console.log("Columns:", columnCheck.rows);

    // Insert into database
    const result = await db.query(
      'INSERT INTO "public"."rsvps" ("name", "email", "status") VALUES ($1, $2, $3)',
      [name, email, status]
    );

    console.log("Result:", result.rows);
    db.query('SELECT current_database()', (err, result) => {
      if (err) {
        console.error('❌ Error checking database:', err);
      } else {
        console.log('📚 Connected to database:', result.rows[0].current_database);
      }

      
    });
    

    db.query('SELECT current_database()', (err, result) => {
      if (err) {
        console.error('❌ Error checking database:', err);
      } else {
        console.log('📚 Connected to database:', result.rows[0].current_database);
      }
});

app.get("/", (req, res) => {
  res.send("Server is running! 🚀");
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
