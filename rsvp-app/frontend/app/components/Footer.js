export default function Footer() {
    return (
      <footer style={{
        backgroundColor: '#2D146D',
        color: 'white',
        textAlign: 'center',
        display: 'flex', // Enables flexbox for centering
        justifyContent: 'center', // Centers content horizontally
        alignItems: 'center', // Centers content vertically
        height: '100px', // Adjust the height to make the footer taller
        position: 'relative',
        bottom: '0',
        width: '100%',
      }}>
        EvenTrack Inc © 2025
      </footer>
    );
  }  