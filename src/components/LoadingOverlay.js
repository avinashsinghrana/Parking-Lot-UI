import React from 'react';
import logoLoading from '../logo-loading.svg';

const LoadingOverlay = ({ show, size = 120 }) => {
  if (!show) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(255,255,255,0.7)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.2s',
    }}>
      <img src={logoLoading} alt="Loading" style={{ width: size, height: size }} />
    </div>
  );
};

export default LoadingOverlay;
