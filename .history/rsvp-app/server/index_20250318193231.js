import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "rsvp_db",
  password: '1234',
  port: 5432,
});
db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Render the home page with the RSVP form
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// Handle RSVP form submission
app.post("/rsvp", async (req, res) => {
  const { name, email } = req.body;

  try {
    // Check if the email is already registered
    const checkResult = await db.query("SELECT * FROM rsvp.attendees WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      res.send("You have already RSVP'd.");
    } else {
      // Insert the new RSVP entry into the database
      const result = await db.query(
        "INSERT INTO rsvp.attendees (name, email) VALUES ($1, $2)",
        [name, email]
      );
      console.log(result);
      res.send("Thank you for RSVPing!");
    }
  } catch (err) {
    console.log(err);
    res.send("There was an error with your RSVP.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
