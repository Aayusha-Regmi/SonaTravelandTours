import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAuthToken, isTokenExpired, isAuthenticated } from '../utils/authToken';

/**
 * Global Session Monitor Component
 * Handles session expiry across the entire application
 */
const SessionMonitor = () => {
  const navigate = useNavigate();

  const handleSessionExpiry = (message = 'Session expired. Please login again.') => {
    console.warn('Session expired, clearing tokens and redirecting to login');
    
    // Clear all auth tokens
    clearAuthToken();
    
    // Show toast notification
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => {
        // Redirect to login page with session expiry indicator
        navigate('/login', { 
          state: { 
            sessionExpired: true,
            message: message,
            returnUrl: window.location.pathname + window.location.search 
          }
        });
      }
    });
  };

  // Check for session expiry on mount and periodically
  useEffect(() => {
    const checkSession = () => {
      // Only check if user is supposed to be authenticated
      const currentPath = window.location.pathname;
      const publicPaths = ['/login', '/register', '/forgot-password', '/', '/about', '/contact', '/signup', '/otp-verification'];
      
      // Skip session check for public pages
      if (publicPaths.includes(currentPath)) {
        console.log('SessionMonitor: Skipping session check for public page:', currentPath);
        return;
      }
      
      // Skip if user is not authenticated (no token at all)
      if (!isAuthenticated()) {
        console.log('SessionMonitor: User not authenticated, skipping session check');
        return;
      }
      
      // Check if token exists and is expired
      if (isTokenExpired()) {
        console.log('SessionMonitor: Token expired, triggering session expiry');
        handleSessionExpiry('Your session has expired. Please login again.');
      } else {
        console.log('SessionMonitor: Session is valid');
      }
    };

    // Check immediately on mount
    checkSession();

    // Set up periodic check every 5 minutes
    const interval = setInterval(checkSession, 5 * 60 * 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [navigate]);

  // Listen for storage changes (logout in another tab)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'authToken' && event.newValue === null) {
        // Token was removed in another tab
        console.warn('Token removed in another tab, redirecting to login');
        handleSessionExpiry('You have been logged out. Please login again.');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // This component doesn't render anything
  return null;
};

export default SessionMonitor;
