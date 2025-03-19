const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { Client } = require('pg'); // <-- Change Pool to Client
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const db = new Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'rsvp_db',
  password: process.env.DB_PASSWORD || '1234',
  port: process.env.DB_PORT || 5432,
});


db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
  } else {
    console.log('✅ Connected to PostgreSQL successfully to database:', process.env.DB_NAME || 'rsvp_db');
  }
});



app.post('/rsvp_db', async (req, res) => {
  const { name, email, status } = req.body;
  console.log("Connected to database:", process.env.DB_NAME);

  try {
    // Insert the data into the database
    const result = await db.query(
      'INSERT INTO "public"."rsvps" (name, email, status) VALUES ($1, $2, $3)',
      [name, email, status]
    );
    
    console.log("Query result:", result); // Log the query result

    res.status(200).json({ message: `Thank you, ${name}! Your RSVP has been confirmed.` });
  } catch (err) {
    console.error('Error inserting into database:', err);
    res.status(500).json({ message: 'Error processing RSVP' });
  }
});



app.get('/', (req, res) => {
  res.send('Server is running! 🚀');
});


app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
