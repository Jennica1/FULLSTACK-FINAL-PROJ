const express = require("express");
const pg = require("pg");
const handle = app.getRequestHandler();

// Set up PostgreSQL client
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "rsvp_db",
  password: "1234",
  port: 5432,
});
db.connect();

app.prepare().then(() => {
  const server = express();

  // Middleware to handle body parsing
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());

  // Handle RSVP form submission
  server.post("/api/rsvp", async (req, res) => {
    const { name, email } = req.body;

    try {
      // Check if the email already exists
      const checkResult = await db.query("SELECT * FROM rsvp.attendees WHERE email = $1", [email]);

      if (checkResult.rows.length > 0) {
        res.status(400).send("You have already RSVP'd.");
      } else {
        // Insert the new RSVP entry
        await db.query("INSERT INTO rsvp.attendees (name, email) VALUES ($1, $2)", [name, email]);
        res.status(200).send("Thank you for RSVPing!");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("There was an error with your RSVP.");
    }
  });

  // All other requests are handled by Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
