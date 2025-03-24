'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function RSVPList() {
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/rsvp_db')
      .then(res => res.json())
      .then(data => {
        const all = [...data.confirmed, ...data.declined];

        const groupedByEvent = all.reduce((acc, rsvp) => {
          const event = rsvp.event || 'Unknown Event';
          if (!acc[event]) acc[event] = { confirmed: [], declined: [] };
          acc[event][rsvp.status].push(rsvp);
          return acc;
        }, {});

        setGrouped(groupedByEvent);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div style={styles.container}>
         <Navbar /> 
        
      <h1 style={styles.heading}>RSVPs by Event</h1>

      {Object.entries(grouped).map(([eventName, rsvps]) => (
        <div key={eventName} style={styles.eventBlock}>
          <h2>{eventName}</h2>
          <p>
            ✅ {rsvps.confirmed.length} confirmed &nbsp; | &nbsp;
            ❌ {rsvps.declined.length} declined
          </p>

          {rsvps.confirmed.length > 0 && (
            <>
              <h3>✅ Confirmed:</h3>
              <ul>
                {rsvps.confirmed.map(r => (
                  <li key={r.id}>{r.name} ({r.email})</li>
                ))}
              </ul>
            </>
          )}

          {rsvps.declined.length > 0 && (
            <>
              <h3>❌ Declined:</h3>
              <ul>
                {rsvps.declined.map(r => (
                  <li key={r.id}>{r.name} ({r.email})</li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'sans-serif',
    maxWidth: '800px',
    margin: '1rem auto',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '4rem 0 1rem 0',
  },
  eventBlock: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '1.5rem',
    marginBottom: '2rem',
  },
};
