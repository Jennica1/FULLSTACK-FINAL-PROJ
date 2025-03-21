'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('confirmed');
  const [message, setMessage] = useState('');
  const [rsvps, setRsvps] = useState({ confirmed: [], declined: [] });

  // Fetch RSVPs on page load
  useEffect(() => {
    fetchRsvps();
  }, []);

  const fetchRsvps = async () => {
    try {
      const response = await fetch('http://localhost:3001/rsvp_db');
      const data = await response.json();
      setRsvps(data); // Set confirmed & declined RSVPs
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/rsvp_db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, status }),
      });

      const data = await response.json();
      console.log('Response:', data);
      setMessage(data.message);

      // Refresh RSVPs after adding new data
      fetchRsvps();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <h1>RSVP for the Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="confirmed">Confirm</option>
          <option value="declined">Decline</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}

      <hr />

      {/* Display RSVP results */}
      <h2>Confirmed Guests ✅</h2>
      {rsvps.confirmed.length > 0 ? (
        <ul>
          {rsvps.confirmed.map((guest) => (
            <li key={guest.id}>
              {guest.name} - {guest.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No confirmed guests yet.</p>
      )}

      <h2>Declined Guests ❌</h2>
      {rsvps.declined.length > 0 ? (
        <ul>
          {rsvps.declined.map((guest) => (
            <li key={guest.id}>
              {guest.name} - {guest.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No declined guests yet.</p>
      )}
      <div style={{
  maxWidth: '300px',
  margin: '20px auto',
  border: '1px solid #ccc',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white'
}}>
  {/* Card Image */}
  <img src="card-placeholder.jpg" alt="Event" style={{
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  }} />
  
  {/* Card Content */}
  <div style={{
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  }}>
    <h3 style={{
      margin: '0 0 10px',
      fontSize: '1.5em',
      color: '#333'
    }}>Career Fair</h3>
    <p style={{
      margin: '5px 0',
      color: '#777'
    }}>March 24th</p>
    <p style={{
      margin: '5px 0',
      color: '#777'
    }}>5pm-8pm</p>
    <p style={{
      margin: '5px 0',
      color: '#777'
    }}>JW Marriott Parq Hotel</p>
  </div>
</div>

    </div>
  );
}
