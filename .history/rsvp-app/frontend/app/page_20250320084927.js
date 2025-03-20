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
    </div>
  );
}
