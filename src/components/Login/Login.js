import React from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import parkingLot from '../../parkinglot.jpg';
import logo from '../../logo.svg';
import { useNavigate } from 'react-router-dom';

// Mock employee credentials
const EMPLOYEE_CREDENTIALS = [
  { username: 'user', password: 'pwd', employeeId: 'EMP001', name: 'John Doe', parkingLot: 'GNIOT' },
  { username: 'user1', password: 'pwd', employeeId: 'EMP002', name: 'Jane Smith', parkingLot: 'Mall Of India' },
  { username: 'laxmi', password: 'laxmi', employeeId: 'LX08686', name: 'Laxmi Singh', parkingLot: 'Candor Parking' },
  // Add more employees as needed
];

// Store logged-in employee details
export class CredentialStore {
  static username = '';
  static password = '';
  static employeeId = '';
  static parkingLot = '';
  static name = '';

  static setCredentials(username, password, employeeId = '', name = '', parkingLot = '') {
    CredentialStore.username = username;
    CredentialStore.password = password;
    CredentialStore.employeeId = employeeId;
    CredentialStore.parkingLot = parkingLot;
    CredentialStore.name = name;
    // Persist to localStorage so state survives refresh
    try {
      localStorage.setItem('employeeCredentials', JSON.stringify({
        username,
        password,
        employeeId,
        name,
        parkingLot
      }));
    } catch (e) {
      // ignore storage errors
    }
  }

  static restore() {
    try {
      const data = localStorage.getItem('employeeCredentials');
      if (data) {
        const { username, password, employeeId, name, parkingLot } = JSON.parse(data);
        CredentialStore.username = username || '';
        CredentialStore.password = password || '';
        CredentialStore.employeeId = employeeId || '';
        CredentialStore.name = name || '';
        CredentialStore.parkingLot = parkingLot || '';
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  static clear() {
    CredentialStore.username = '';
    CredentialStore.password = '';
    CredentialStore.employeeId = '';
    CredentialStore.name = '';
    CredentialStore.parkingLot = '';
    try {
      localStorage.removeItem('employeeCredentials');
    } catch (e) {
      // ignore
    }
  }
}

// Restore credentials on module load
CredentialStore.restore();

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  return (
    <div className="login-outer-container">
      <div className="login-header">
        <div className="header-logo-title">
          <img src={logo} alt="Logo" className="header-logo" />
          <span className="header-title">Parking</span>
        </div>
        <div className="header-buttons">
          <button className="admin-btn" onClick={() => navigate('/admin-login')}>Admin Portal</button>
          <button className="register-btn" onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
      <div className="login-container">
        <div className="login-image-section">
          <div className="benefits-overlay">
            <h3>Why Choose Our Parking Lot?</h3>
            <ul>
              <li>Secure and monitored parking</li>
              <li>Easy online booking</li>
              <li>24/7 access</li>
              <li>Convenient locations</li>
              <li>Affordable rates</li>
            </ul>
          </div>
          <img src={parkingLot} alt="Parking Lot" className="login-image" />
        </div>
        <div className="login-form-section">
          <form className="login-form" onSubmit={e => {
            e.preventDefault();
            const username = e.target.elements.username.value;
            const password = e.target.elements.password.value;
            const found = EMPLOYEE_CREDENTIALS.find(emp => emp.username === username && emp.password === password);
            if (found) {
              // Clear previous credentials first to refresh the cache
              CredentialStore.clear();

              // Then set the new credentials
              CredentialStore.setCredentials(
                username,
                password,
                found.employeeId,
                found.name,
                found.parkingLot
              );
              setError('');
              navigate('/employee-dashboard'); // Redirect to employee dashboard
            } else {
              setError('Invalid credentials');
            }
          }}>
            <h2>Login</h2>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input type="text" name="username" placeholder="Email ID / Employee ID" required />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input type="password" name="password" placeholder="Password" required />
            </div>
            {error && <div style={{ color: 'red', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{error}</div>}
            <button type="submit" className="login-btn">Login</button>
            <a href="/forget-password" className="forgot-password-link">Forgot password?</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
