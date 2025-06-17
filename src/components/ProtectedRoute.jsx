import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, redirectToLogin } from '../utils/authGuard';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Store the current path as return path
    localStorage.setItem('returnPath', location.pathname + location.search);
    
    // Redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
