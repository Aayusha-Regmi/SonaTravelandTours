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
    // Session expired, clearing tokens and redirecting to login
    
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
      const currentPath = window.location.pathname;
      
      // Define different security levels for different pages
      const publicPaths = ['/login', '/signup', '/forgot-password', '/', '/about', '/contact', '/otp-verification'];
      const criticalPaths = ['/payment', '/booking', '/passenger-details', '/confirmation'];
      const protectedPaths = ['/profile', '/user-profile', '/my-bookings'];
      
      // Skip session check for public pages
      if (publicPaths.includes(currentPath)) {
       
        return;
      }
      
      // Check if we're in an active login session (only for first 30 seconds)
      const loginSession = localStorage.getItem('loginSession');
      const loginTime = localStorage.getItem('loginTime');
      const now = Date.now();
      
      if (loginSession === 'active' && loginTime) {
        const timeSinceLogin = now - parseInt(loginTime);
        if (timeSinceLogin < 30000) { // 30 seconds grace period
         
          return;
        } else {
          // Clear login session after grace period
          localStorage.removeItem('loginSession');
          localStorage.removeItem('loginTime');
        }
      }
      
      // Check if there's actually a token present
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      if (!token) {
        // Only redirect to login if user is on a protected page
        if (protectedPaths.some(path => currentPath.startsWith(path)) || 
            criticalPaths.some(path => currentPath.startsWith(path))) {
          
          handleSessionExpiry('Please login to access this page.');
        }
        return;
      }
      
      // For critical payment/booking pages, perform strict validation
      if (criticalPaths.some(path => currentPath.startsWith(path))) {
       
        
        // For payment pages, validate the token by checking if user is authenticated
        if (!isAuthenticated()) {
          
          handleSessionExpiry('Your session has expired. Please login again to continue with your booking.');
          return;
        }
        
       
      } else {
        // For regular protected pages, just check token presence
       
      }
    };

    // Different intervals for different security needs
    const currentPath = window.location.pathname;
    const criticalPaths = ['/payment', '/booking', '/passenger-details', '/confirmation'];
    
    let checkInterval, initialDelay;
    
    if (criticalPaths.some(path => currentPath.startsWith(path))) {
      // More frequent checks for payment/booking pages (every 2 minutes)
      checkInterval = 2 * 60 * 1000;
      initialDelay = 5000; // 5 seconds
      
    } else {
      // Less frequent checks for regular pages (every 10 minutes)
      checkInterval = 10 * 60 * 1000;
      initialDelay = 10000; // 10 seconds
      
    }

    const interval = setInterval(checkSession, checkInterval);
    const initialTimer = setTimeout(checkSession, initialDelay);

    // Cleanup
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [navigate]);

  // Listen for storage changes (logout in another tab)
  useEffect(() => {
    const handleStorageChange = (event) => {
      // Smart cross-tab session management
      if (event.key === 'authToken' && event.newValue === null) {
        // Check if this is during an active login session
        const loginSession = localStorage.getItem('loginSession');
        if (loginSession === 'active') {
         
          return;
        }
        
        // Check if there was an explicit logout flag set
        const explicitLogout = localStorage.getItem('explicitLogout');
        if (explicitLogout === 'true') {
         
          localStorage.removeItem('explicitLogout'); // Clean up the flag
          
          const currentPath = window.location.pathname;
          const publicPaths = ['/login', '/signup', '/forgot-password', '/', '/about', '/contact', '/otp-verification'];
          
          // Only trigger logout if we're on a protected page
          if (!publicPaths.includes(currentPath)) {
            // User logged out in another tab, redirecting to login
            handleSessionExpiry('You have been logged out in another tab.');
          }
        } else {
          // Token removed but no explicit logout - might be session expiry or login process
          
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // This component doesn't render anything
  return null;
};

export default SessionMonitor;
