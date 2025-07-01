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
 * Checks if the user is authenticated by token presence
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

export default {
  getAuthToken,
  getAuthHeaders,
  isAuthenticated
};
