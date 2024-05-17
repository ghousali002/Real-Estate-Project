import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../ui/Logo';
import { ToastContainer} from 'react-bootstrap';
import toast from 'react-hot-toast';
function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the admin is already logged in
    if (localStorage.getItem('adminloggedin') === 'true') {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@voyagevista.com' && password === 'admin') {
      localStorage.setItem('adminloggedin', 'true');
      navigate('/admin-dashboard');
    } else {
      toast.error('Invalid login credentials');
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <div style={styles.logo}>
            <ToastContainer/>
          <Logo />
          <h1 style={styles.logoText}>Admin Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>LOGIN</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#122550',
    margin: 0,
  },
  loginBox: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  logo: {
    marginBottom: '1.5rem',
  },
  logoImage: {
    width: '50px', // Adjust as needed
    height: 'auto',
  },
  logoText: {
    margin: 0,
    fontSize: '1.5rem',
    color: 'black',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#5BA600',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  forgotPassword: {
    display: 'block',
    marginTop: '1rem',
    color: '#007BFF',
    textDecoration: 'none',
  },
  forgotPasswordHover: {
    textDecoration: 'underline',
  },
};

export default AdminLogin;
