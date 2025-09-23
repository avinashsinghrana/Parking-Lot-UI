import React from 'react';
import '../Login/Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import parkingLot from '../../parkinglot.jpg';
import logo from '../../logo.svg';
import { useNavigate } from 'react-router-dom';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'lxadmin',
  employeeId: 'LX0000'
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setError('');
      // Store admin user info in localStorage for later use
      localStorage.setItem('user', JSON.stringify({
        name: 'Admin',
        employeeId: ADMIN_CREDENTIALS.employeeId
      }));
      navigate('/admin-dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="login-outer-container">
      <div className="login-header">
        <div className="header-logo-title">
          <img src={logo} alt="Logo" className="header-logo" />
          <span className="header-title">Parking</span>
        </div>
        <div className="header-buttons">
          <button className="admin-btn" onClick={() => navigate('/login')}>Employee Login</button>
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
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input type="text" name="username" placeholder="Admin Email / ID" required />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input type="password" name="password" placeholder="Password" required />
            </div>
            {error && <div className="error-msg">{error}</div>}
            <button type="submit" className="login-btn" onClick={() => navigate('/admin-dashboard')}>Login</button>
            {/* No forgot password for admin by default, add if needed */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
