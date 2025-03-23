'use client';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  const events = [
    { id: 1, title: 'Career Fair', date: 'March 24th', time: '5pm-8pm', location: 'JW Marriott Parq Hotel', image: 'card-placeholder.jpg', link: '/event' },
    { id: 2, title: 'Tech Expo', date: 'April 10th', time: '10am-4pm', location: 'Vancouver Convention Centre', image: '/techconvent.jpg', link: '/expo' },
    { id: 3, title: 'Startup Meetup', date: 'May 5th', time: '6pm-9pm', location: 'SFU Downtown Campus', image: '/startup.jpg', link: '/meetup' }
  ];  

  return (
    <div>
      <Navbar />
      
      {/* Logo */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '50vh',
        paddingTop: '200px',
        backgroundColor: 'white'
      }}>
        <Link href="/">
          <img src="/logo.svg" alt="EvenTrack Logo" style={{ width: '300px', height: 'auto' }} />
        </Link>
      </div>
      
      {/* Header */}
      <h1 style={{
        fontSize: '25px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '10px'
      }}>
        Explore Events
      </h1>

      {/* Event Cards */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        margin: '20px',
        marginBottom: '250px' // Added margin below the content
      }}>
        {events.map((event) => (
  <Link key={event.id} href={event.link} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div style={{
      maxWidth: '300px',
      border: '1px solid #ccc',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      cursor: 'pointer'
    }}>
      {/* Card Image */}
      <img src={event.image} alt={event.title} style={{
        width: '100%', height: '200px', objectFit: 'cover'
      }} />
      
      {/* Card Content */}
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h3 style={{ margin: '0 0 10px', fontSize: '1.5em', color: '#333' }}>{event.title}</h3>
        <p style={{ margin: '5px 0', color: '#777' }}>{event.date}</p>
        <p style={{ margin: '5px 0', color: '#777' }}>{event.time}</p>
        <p style={{ margin: '5px 0', color: '#777' }}>{event.location}</p>
      </div>
    </div>
  </Link>
))}

      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}