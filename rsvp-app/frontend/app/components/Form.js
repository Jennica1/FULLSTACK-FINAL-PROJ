import { useState } from 'react';

export default function Form({ eventName }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [attendance, setAttendance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = `${firstName} ${lastName}`;

    const statusMap = {
      yes: 'confirmed',
      no: 'declined'
    };

    if (!attendance) {
      alert("Please select if you're attending.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/rsvp_db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          status: statusMap[attendance],
          event: eventName
        })
      });

      const data = await res.json();
      alert(data.message || 'Submitted!');
    } catch (err) {
      console.error('Submission error', err);
    }
  };

  return (
    <>
      <h2 style={styles.subHead}>RSVP</h2>
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <div>
              <label>First Name</label>
              <input
                style={styles.textBox}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                style={styles.textBox}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={styles.fullWidth}>
            <label>Email Address</label>
            <input
              style={styles.textBox}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.fullWidth}>
            <label>Attending?</label>
            <div style={styles.radioGroup}>
              <label style={styles.radioOption}>
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={attendance === 'yes'}
                  onChange={() => setAttendance('yes')}
                />
                Yes
              </label>
              <label style={styles.radioOption}>
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={attendance === 'no'}
                  onChange={() => setAttendance('no')}
                />
                No
              </label>
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
      </div>
    </>
  );
}

const styles = {
  formContainer: {
    border: '2px solid #2E1A64',
    borderRadius: '12px',
    padding: '20px',
    maxWidth: '500px',
    margin: '0',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
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
    backgroundColor: '#2E1A64',
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
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9'
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
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
