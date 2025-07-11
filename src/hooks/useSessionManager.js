import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAuthToken, isTokenExpired, isAuthenticated } from '../utils/authToken';

/**
 * Global session management hook
 * Monitors token expiry and provides session handling utilities
 */
export const useSessionManager = () => {
  const navigate = useNavigate();

  const handleSessionExpiry = useCallback((message = 'Session expired. Please login again.') => {
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
  }, [navigate]);

  const checkSession = useCallback(() => {
    if (!isAuthenticated()) {
      console.warn('Session check failed - user not authenticated');
      handleSessionExpiry('Please login to continue');
      return false;
    }
    return true;
  }, [handleSessionExpiry]);

  const checkTokenExpiry = useCallback(() => {
    if (isTokenExpired()) {
      handleSessionExpiry('Your session has expired. Please login again.');
      return false;
    }
    return true;
  }, [handleSessionExpiry]);

  // Check token expiry periodically (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiry();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkTokenExpiry]);

  // Check session when component mounts
  useEffect(() => {
    checkTokenExpiry();
  }, [checkTokenExpiry]);

  return {
    handleSessionExpiry,
    checkSession,
    checkTokenExpiry,
    isAuthenticated: isAuthenticated()
  };
};

/**
 * Enhanced fetch wrapper with automatic session handling
 */
export const fetchWithSession = async (url, options = {}) => {
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

  // Check authentication before making request
  if (!isAuthenticated()) {
    handleSessionExpiry('Please login to continue');
    return null;
  }

  try {
    const response = await fetch(url, options);
    
    // Check for 401 Unauthorized
    if (response.status === 401) {
      console.warn('401 Unauthorized response detected');
      handleSessionExpiry('Session expired. Please login again.');
      return null;
    }
    
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    
    // Check if it's a network error that might indicate session issues
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      console.warn('Network error - checking authentication');
      if (!isAuthenticated()) {
        handleSessionExpiry('Session expired. Please login again.');
        return null;
      }
    }
    
    throw error;
  }
};

export default useSessionManager;
