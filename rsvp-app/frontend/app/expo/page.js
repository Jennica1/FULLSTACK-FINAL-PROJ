'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar

export default function EventPage() {
  const router = useRouter();
  const [attendance, setAttendance] = useState(''); // Stores selected option

  return (
    <div>
      <Navbar /> {/* ✅ Navbar at the top */}

      {/* Banner Image */}
      <div style={styles.banner}>
        <img src="/techconvent.jpg" alt="Event Banner" style={styles.bannerImage} />
      </div>

      <div style={styles.container}>
          {/* Back Button */}
          <button style={styles.backButton} onClick={() => router.push('/')}>⬅ Back to Home</button>
        <h1 style={styles.header}>Vancouver Tech Exposition</h1>

        <p><strong>Date:</strong> April 10th, 2025</p>
        <p><strong>Time:</strong> 10am - 4pm</p>
        <p><strong>Location:</strong> Vancouver Convention Center </p>
        <p style={styles.paragraph}>
        The Vancouver Tech Expo is a leading event that brings together innovators, tech enthusiasts, 
        and industry leaders. Whether you're a student, recent graduate, or seasoned professional, this 
        exposition offers a chance to explore cutting-edge technologies, gain insights from experts, 
        and build meaningful connections within the tech community. Hosted at the Vancouver Convention Centre, 
        it’s the ideal place to stay ahead in the ever-evolving world of technology.
        </p>

        {/* RSVP Section */}
        <h2 style={styles.subHead}>RSVP</h2>
        <div style={styles.formContainer}>
          <form style={styles.form}>
            <div style={styles.inputGroup}>
              <div>
                <label>First Name</label>
                <input style={styles.textBox} type="text" placeholder="John" required />
              </div>
              <div>
                <label>Last Name</label>
                <input style={styles.textBox} type="text" placeholder="Doe" required />
              </div>
            </div>

            <div style={styles.fullWidth}>
              <label>Email Address</label>
              <input style={styles.textBox} type="email" placeholder="johndoe@example.com" required />
            </div>

            <div style={styles.fullWidth}>
            <label>Attending?</label>
              <div style={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={attendance === 'yes'}
                    onChange={() => setAttendance('yes')}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={attendance === 'no'}
                    onChange={() => setAttendance('no')}
                  />
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="attendance"
                    value="maybe"
                    checked={attendance === 'maybe'}
                    onChange={() => setAttendance('maybe')}
                  />
                  Maybe
                </label>
              </div>
            </div>

            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
          </div>

      </div>
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