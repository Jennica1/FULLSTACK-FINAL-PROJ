// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
require('dotenv').config();



const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// Set up PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,          // PostgreSQL username
  host: process.env.DB_HOST,          // Database host (e.g., localhost or IP address)
  database: process.env.DB_NAME,      // Your database name (e.g., rsvp_db)
  password: process.env.DB_PASSWORD,  // Password for the user
  port: process.env.DB_PORT || 5432,  // PostgreSQL port, default is 5432
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/rsvp', async (req, res) => {
    const { name, email, status } = req.body;
  
    try {
      // Insert RSVP into the database
      await pool.query(
        'INSERT INTO rsvps (name, email, status) VALUES ($1, $2, $3)',
        [name, email, status]
      );
  
      // Send a confirmation email if status is 'confirmed'
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
  
  
  