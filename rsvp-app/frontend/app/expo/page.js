'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Form from '../components/Form';

export default function EventPage() {
  const router = useRouter();

  return (
    <div>
      <Navbar />

      {/* Banner */}
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

        <Form eventName="Vancouver Tech Exposition" />

      </div>
    </div>
  );
}

// Styles 
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
  header: {
    fontSize: '50px',
    fontWeight: 'bold'
  },
  paragraph: {
    marginTop: '1rem'
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