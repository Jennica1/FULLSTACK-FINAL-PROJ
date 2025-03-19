// server/index.js
import express from "express";
import pg from "pg";

const app = express();
const port = 3001;



const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "rsvps",
  password: '1234',
  port: 5432,
});
db.connect();

app.post('/rsvp', async (req, res) => {
  const { name, email, status } = req.body;

  try {
    // Insert RSVP into the database
    await db.query(
      'INSERT INTO rsvps (name, email, status) VALUES ($1, $2, $3)',
      [name, email, status]
    );

    res.status(200).json({ message: 'RSVP recorded successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing RSVP' });
  }
});


  
  app.get('/', (req, res) => {
    res.send('Server is running! 🚀');
  });
  
  app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });
  
  
  