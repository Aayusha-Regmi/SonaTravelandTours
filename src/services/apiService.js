/**
 * Enhanced API Service with Session Management
 * Provides consistent session handling across all API calls
 */

import { getAuthHeaders, isAuthenticated, clearAuthToken } from '../utils/authToken';
import { toast } from 'react-toastify';

// Global reference to navigation function
let navigate = null;

/**
 * Set the navigation function reference
 * Call this in your App component or root component
 */
export const setNavigationRef = (navigationRef) => {
  navigate = navigationRef;
};

/**
 * Global session expiry handler
 */
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
    draggable: true,      onClose: () => {
        // Redirect to login page with session expiry indicator
        if (navigate) {
          navigate('/login', { 
            state: { 
              sessionExpired: true,
              message: message,
              returnUrl: window.location.pathname + window.location.search 
            }
          });
        } else {
          // Fallback to window.location if navigate is not available
          window.location.href = '/login';
        }
      }
  });
};

/**
 * Enhanced fetch with automatic session management
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options
 * @param {boolean} requireAuth - Whether authentication is required (default: true)
 * @returns {Promise<Response|null>} - Fetch response or null if session expired
 */
export const apiFetch = async (url, options = {}, requireAuth = true) => {
  console.log('API Service: Making request to:', url, 'requireAuth:', requireAuth);
  
  // Check authentication if required
  if (requireAuth && !isAuthenticated()) {
    console.log('API Service: Authentication required but user not authenticated');
    handleSessionExpiry('Please login to continue');
    return null;
  }

  // Prepare headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Add auth headers if authentication is required
  if (requireAuth) {
    const authHeaders = getAuthHeaders();
    Object.assign(headers, authHeaders);
    console.log('API Service: Added auth headers');
  } else {
    console.log('API Service: Skipping auth headers for public endpoint');
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    // Check for 401 Unauthorized
    if (response.status === 401) {
      console.warn('401 Unauthorized response detected');
      handleSessionExpiry('Session expired. Please login again.');
      return null;
    }

    return response;
  } catch (error) {
    console.error('API request error:', error);
    
    // Check if it's a network error that might indicate session issues
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      console.warn('Network error - checking authentication');
      if (requireAuth && !isAuthenticated()) {
        handleSessionExpiry('Session expired. Please login again.');
        return null;
      }
    }
    
    throw error;
  }
};

/**
 * GET request with session management
 */
export const apiGet = async (url, options = {}, requireAuth = true) => {
  return apiFetch(url, { ...options, method: 'GET' }, requireAuth);
};

/**
 * POST request with session management
 */
export const apiPost = async (url, data = null, options = {}, requireAuth = true) => {
  return apiFetch(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined
  }, requireAuth);
};

/**
 * Login-specific POST request (never requires authentication)
 */
export const apiLoginPost = async (url, data = null, options = {}) => {
  console.log('API Service: Making login request to:', url);
  return apiFetch(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined
  }, false); // Never require auth for login
};

/**
 * PUT request with session management
 */
export const apiPut = async (url, data = null, options = {}, requireAuth = true) => {
  return apiFetch(url, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined
  }, requireAuth);
};

/**
 * DELETE request with session management
 */
export const apiDelete = async (url, options = {}, requireAuth = true) => {
  return apiFetch(url, { ...options, method: 'DELETE' }, requireAuth);
};

/**
 * PATCH request with session management
 */
export const apiPatch = async (url, data = null, options = {}, requireAuth = true) => {
  return apiFetch(url, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined
  }, requireAuth);
};

/**
 * Utility to handle API responses with proper error handling
 */
export const handleApiResponse = async (response) => {
  if (!response) {
    throw new Error('No response received');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default {
  setNavigationRef,
  apiFetch,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiPatch,
  handleApiResponse
};
