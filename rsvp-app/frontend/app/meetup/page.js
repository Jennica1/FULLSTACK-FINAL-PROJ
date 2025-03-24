'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar'; // Import the Navbar
import Form from '../components/Form';

export default function EventPage() {
  const router = useRouter();


  return (
    <div>
      <Navbar /> 

      {/* Banner Image */}
      <div style={styles.banner}>
        <img src="/startup.jpg" alt="Event Banner" style={styles.bannerImage} />
      </div>

      <div style={styles.container}>
          {/* Back Button */}
          <button style={styles.backButton} onClick={() => router.push('/')}>⬅ Back to Home</button>
        <h1 style={styles.header}>Vancouver Tech Startup Meeting</h1>

        <p><strong>Date:</strong> May 5th, 2025</p>
        <p><strong>Time:</strong> 6pm - 9pm</p>
        <p><strong>Location:</strong> SFU Downtown Campus </p>
        <p style={styles.paragraph}>
        The SFU Tech Startup Meetup is an exciting gathering for entrepreneurs, innovators, 
        and tech enthusiasts looking to connect and collaborate. Hosted at the SFU Downtown 
        Campus, this event provides a unique platform to share ideas, explore emerging startup 
        trends, and network with like-minded individuals. Whether you’re launching your first 
        venture or growing an existing one, this meetup offers valuable insights and opportunities 
        to build meaningful connections within the tech startup community.
        </p>

        <Form eventName="Vancouver Tech Startup Meeting" />

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