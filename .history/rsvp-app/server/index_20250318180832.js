const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { Client } = require('pg'); // <-- Change Pool to Client
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// ✅ Switch to pg.Client (which worked in your other example)
const db = new Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'rsvp_db',
  password: process.env.DB_PASSWORD || '1234',
  port: process.env.DB_PORT || 5432,
});

// ✅ Connect to the database
db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
  } else {
    console.log('✅ Connected to PostgreSQL successfully!');
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Update the /rsvp_db endpoint
app.post('/rsvp_db', async (req, res) => {
  const { name, email, status } = req.body;

  try {
    // ✅ Use db.query instead of pool.query
    // Force the schema to "public"
    console.log('Inserting into table:', 'INSERT INTO public.rsvps (name, email, status) VALUES ($1, $2, $3)', [name, email, status]);
    
    // Execute the query to insert data into the database
    const result = await db.query(
      'INSERT INTO public.rsvps (name, email, status) VALUES ($1, $2, $3)',
      [name, email, status]
    );

    // ✅ Send a confirmation email if status is 'confirmed'
    if (status === 'confirmed') {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'RSVP Confirmation',
        text: `Hi ${name},\n\nThank you for confirming your attendance!`,
      });
    }

    res.status(200).json({ message: 'RSVP recorded successfully!' });
  } catch (err) {
    console.error('❌ Error inserting into database:', err);
    res.status(500).json({ message: 'Error processing RSVP' });
  }
});

// ✅ Add a basic GET route for sanity check
app.get('/', (req, res) => {
  res.send('Server is running! 🚀');
});

// ✅ Start the server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
