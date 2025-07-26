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
      const currentPath = window.location.pathname;
      
      // Define different security levels for different pages
      const publicPaths = ['/login', '/signup', '/forgot-password', '/', '/about', '/contact', '/otp-verification'];
      const criticalPaths = ['/payment', '/booking', '/passenger-details', '/confirmation'];
      const protectedPaths = ['/profile', '/user-profile', '/my-bookings'];
      
      // Skip session check for public pages
      if (publicPaths.includes(currentPath)) {
        console.log('SessionMonitor: Skipping session check for public page:', currentPath);
        return;
      }
      
      // Check if we're in an active login session (only for first 30 seconds)
      const loginSession = localStorage.getItem('loginSession');
      const loginTime = localStorage.getItem('loginTime');
      const now = Date.now();
      
      if (loginSession === 'active' && loginTime) {
        const timeSinceLogin = now - parseInt(loginTime);
        if (timeSinceLogin < 30000) { // 30 seconds grace period
          console.log('SessionMonitor: Active login session (grace period), skipping expiry check');
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
          console.log('SessionMonitor: No token found on protected page, redirecting to login');
          handleSessionExpiry('Please login to access this page.');
        }
        return;
      }
      
      // For critical payment/booking pages, perform strict validation
      if (criticalPaths.some(path => currentPath.startsWith(path))) {
        console.log('SessionMonitor: Critical page detected, performing strict session validation');
        
        // For payment pages, validate the token by checking if user is authenticated
        if (!isAuthenticated()) {
          console.log('SessionMonitor: Token invalid on critical page');
          handleSessionExpiry('Your session has expired. Please login again to continue with your booking.');
          return;
        }
        
        console.log('SessionMonitor: Session valid for critical operation');
      } else {
        // For regular protected pages, just check token presence
        console.log('SessionMonitor: Token present, session is valid');
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
      console.log('SessionMonitor: Setting up strict monitoring for critical page');
    } else {
      // Less frequent checks for regular pages (every 10 minutes)
      checkInterval = 10 * 60 * 1000;
      initialDelay = 10000; // 10 seconds
      console.log('SessionMonitor: Setting up regular monitoring');
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
          console.log('SessionMonitor: Token removal during login session - ignoring');
          return;
        }
        
        // Check if there was an explicit logout flag set
        const explicitLogout = localStorage.getItem('explicitLogout');
        if (explicitLogout === 'true') {
          console.log('SessionMonitor: Explicit logout detected in another tab');
          localStorage.removeItem('explicitLogout'); // Clean up the flag
          
          const currentPath = window.location.pathname;
          const publicPaths = ['/login', '/signup', '/forgot-password', '/', '/about', '/contact', '/otp-verification'];
          
          // Only trigger logout if we're on a protected page
          if (!publicPaths.includes(currentPath)) {
            console.warn('User logged out in another tab, redirecting to login');
            handleSessionExpiry('You have been logged out in another tab.');
          }
        } else {
          // Token removed but no explicit logout - might be session expiry or login process
          console.log('SessionMonitor: Token removed without explicit logout flag - not taking action');
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
