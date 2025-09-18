import React from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import parkingLot from './parkinglot.jpg';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-image-section">
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
        </form>
      </div>
    </div>
  );
};

export default Login;

