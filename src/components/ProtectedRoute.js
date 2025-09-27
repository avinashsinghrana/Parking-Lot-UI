import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CredentialStore } from './Login/Login';

/**
 * A wrapper component for routes that should only be accessible to authenticated users.
 * If the user is not authenticated, they will be redirected to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!CredentialStore.username; // Check if user is authenticated

  useEffect(() => {
    // Re-validate authentication on route change or when component mounts
    CredentialStore.restore();
  }, [location.pathname]);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated, preserving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child components (protected content)
  return children;
};

export default ProtectedRoute;
