'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar

export default function EventPage() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('confirmed');
  const [message, setMessage] = useState(''); // Stores selected option

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, status }),
    });

    const data = await response.json();
    setMessage(data.message);
  };
  
  return (
    <div>
      <Navbar /> {/* ✅ Navbar at the top */}

      {/* Banner Image */}
      <div style={styles.banner}>
        <img src="/event-banner.png" alt="Event Banner" style={styles.bannerImage} />
      </div>

      <div style={styles.container}>
          {/* Back Button */}
          <button style={styles.backButton} onClick={() => router.push('/')}>⬅ Back to Home</button>
        <h1 style={styles.header}>Vancouver Career Fair</h1>

        <p><strong>Date:</strong> March 24th, 2025</p>
        <p><strong>Time:</strong> 5pm - 8pm</p>
        <p><strong>Location:</strong> JW Marriott Parq Hotel</p>
        <p style={styles.paragraph}>
          The Vancouver Career Fair is a premier networking event connecting job seekers 
          with top employers. Whether you’re a student, recent graduate, or professional 
          looking for a career change, this fair provides an opportunity to discover job 
          openings, gain insights, and make valuable connections.
        </p>

        {/* RSVP Section */}
        <h2 style={styles.subHead}>RSVP</h2>
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <div>
                <label>First Name</label>
                <input style={styles.textBox} type="text" placeholder="John" required onChange={(e) => setName(e.target.value)} />
              </div>
        
            </div>

            <div style={styles.fullWidth}>
              <label>Email Address</label>
              <input style={styles.textBox} type="email" placeholder="johndoe@example.com" required   value={email}
          onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div style={styles.fullWidth}>
            <label>Attending?</label>
              <div style={styles.radioGroup}>
              <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="confirmed">Confirm</option>
          <option value="declined">Decline</option>
        </select>
          
              </div>
            </div>

            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
          </div>

      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('confirmed');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, status }),
    });

    const data = await response.json();
    setMessage(data.message);
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
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="confirmed">Confirm</option>
          <option value="declined">Decline</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}


// Styles for Banner and Layout
const styles = {
  banner: {
    width: '100%',
    height: '600px',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
  },
  header:{
    fontSize: '50px',
    fontWeight: 'bold'
  },
  paragraph:{
    marginTop: '1rem'
  },
  formContainer: {
    border: '2px solid #2E1A64', // Purple border
    borderRadius: '12px',
    padding: '20px',
    maxWidth: '500px',
    margin: '0',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  fullWidth: {
    display: 'flex',
    flexDirection: 'column',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  submitButton: {
    backgroundColor: '#2E1A64', // Dark Purple
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '25px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: '0.3s ease',
  },
  textBox: {
border: '1px solid gray',
padding: '5px',
borderRadius: '5px'
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px',
    marginTop: '10px'
  },
subHead: {
    marginTop: '2rem',
    marginBottom: '1rem',
    fontSize: '30px',
    fontWeight: 'bold'

}
};
