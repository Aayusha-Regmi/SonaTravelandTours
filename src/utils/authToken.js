/**
 * Auth Token Utility
 * Centralizes token management to prevent 401 errors
 */

/**
 * Gets the authentication token from storage
 * Checks multiple locations for backward compatibility
 * @returns {string|null} Authentication token or null if not found
 */
export const getAuthToken = () => {
  const token = 
    localStorage.getItem('token') || 
    sessionStorage.getItem('token') ||
    localStorage.getItem('authToken') || 
    sessionStorage.getItem('authToken');
  
  return token;
};

/**
 * Stores authentication token in localStorage
 * @param {string} token - The authentication token
 */
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
  // Also set expiry timestamp (24 hours from now)
  const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
  localStorage.setItem('tokenExpiry', expiryTime.toString());
};

/**
 * Clears all authentication tokens from storage
 */
export const clearAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenExpiry');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('tokenExpiry');
};

/**
 * Checks if the authentication token is expired
 * @returns {boolean} True if token is expired
 */
export const isTokenExpired = () => {
  const expiryTime = localStorage.getItem('tokenExpiry');
  if (!expiryTime) return true;
  
  const expiry = parseInt(expiryTime);
  const now = Date.now();
  
  return now > expiry;
};

/**
 * Creates authorization headers with the token
 * @returns {Object} Headers object with Authorization if token exists
 */
export const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Checks if the user is authenticated by token presence and validity
 * @returns {boolean} True if authenticated and token is valid
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  
  if (!token) return false;
  
  if (isTokenExpired()) {
    clearAuthToken();
    return false;
  }
  
  return true;
};

/**
 * Handles API response and checks for authentication errors
 * @param {Response} response - Fetch API response object
 * @returns {boolean} True if authentication is valid, false if expired
 */
export const handleAuthResponse = (response) => {
  if (response.status === 401) {
    clearAuthToken();
    return false;
  }
  return true;
};

export default {
  getAuthToken,
  setAuthToken,
  clearAuthToken,
  isTokenExpired,
  getAuthHeaders,
  isAuthenticated,
  handleAuthResponse
};
