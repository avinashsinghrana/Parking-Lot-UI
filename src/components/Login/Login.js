import React from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import parkingLot from '../../parkinglot.jpg';
import logo from '../../logo.svg';

const Login = (props) => {
  return (
    <div className="login-outer-container">
      <div className="login-header">
        <div className="header-logo-title">
          <img src={logo} alt="Logo" className="header-logo" />
          <span className="header-title">Parking</span>
        </div>
        <div className="header-buttons">
          <button className="admin-btn">Admin Portal</button>
          <button className="register-btn">Register</button>
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
          <form className="login-form">
            <h2>Login</h2>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input type="text" placeholder="Email ID / Employee ID" required />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className="login-btn">Login</button>
            <a href="/forget/password" className="forgot-password-link">Forgot password?</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
