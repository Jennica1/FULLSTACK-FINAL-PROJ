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
        <Form eventName="Vancouver Career Fair" />
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
  }
};
