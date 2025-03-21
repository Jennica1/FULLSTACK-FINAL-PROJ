'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Explore Events</h1>
      
      {/* Event Card */}
      <Link href="/event" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{
          maxWidth: '300px',
          margin: '20px auto',
          border: '1px solid #ccc',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}>
          {/* Card Image */}
          <img src="card-placeholder.jpg" alt="Event" style={{
            width: '100%', height: '200px', objectFit: 'cover'
          }} />
          
          {/* Card Content */}
          <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '1.5em', color: '#333' }}>Career Fair</h3>
            <p style={{ margin: '5px 0', color: '#777' }}>March 24th</p>
            <p style={{ margin: '5px 0', color: '#777' }}>5pm-8pm</p>
            <p style={{ margin: '5px 0', color: '#777' }}>JW Marriott Parq Hotel</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
