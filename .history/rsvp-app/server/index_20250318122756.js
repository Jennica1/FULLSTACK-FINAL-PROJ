// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
import pg from "pg";
require('dotenv').config();



const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

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
  
  
  