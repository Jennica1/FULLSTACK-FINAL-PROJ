'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <Link href="/">
          <img src="/logo.svg" alt="EvenTrack Logo" style={styles.logo} />
        </Link>

        {/* Navigation Links (Can add more later) */}
        <div style={styles.navLinks}>
          <Link href="/" style={styles.link}>Home</Link>
          <Link href="/rsvps" style={styles.link}>RSVPs</Link> 
        </div>
      </div>
    </nav>
  );
}

// CSS Styles
const styles = {
  navbar: {
    backgroundColor: '#D9D5E5',
    padding: '15px 0',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 150px', // 150px margin on the sides
  },
  logo: {
    height: '50px',
    cursor: 'pointer',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};
