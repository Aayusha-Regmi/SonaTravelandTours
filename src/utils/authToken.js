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
  if (!token) {
    console.error('Attempted to set empty token');
    return;
  }
  
  localStorage.setItem('authToken', token);
  localStorage.setItem('token', token); // Also set in 'token' for compatibility
  
  // Set login session flags for session monitoring
  localStorage.setItem('loginSession', 'active');
  localStorage.setItem('loginTime', Date.now().toString());
  localStorage.setItem('recentLogin', 'true');
  
  console.log('✅ Token set successfully:', {
    tokenPreview: token.substring(0, 20) + '...',
    sessionStatus: 'active',
    loginTime: new Date().toISOString()
  });
};

/**
 * Clears all authentication tokens from storage
 */
export const clearAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('recentLogin');
  localStorage.removeItem('loginSession');
  localStorage.removeItem('loginTime');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('tokenExpiry');
};

/**
 * Checks if the authentication token is expired
 * For production, we'll rely on server-side validation instead of client timestamps
 * @returns {boolean} True if token should be considered expired
 */
export const isTokenExpired = () => {
  // Don't rely on client-side timestamp validation in production
  // Let the server handle token expiry validation
  const token = getAuthToken();
  if (!token) {
    console.log('⚠️ No token found, treating as expired');
    return true;
  }
  
  // For now, assume token is valid if it exists
  // Server will return 401 if token is actually expired
  console.log('� Token exists, assuming valid (server will validate)');
  return false;
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
  
  if (!token) {
    console.log('❌ No token found, user not authenticated');
    return false;
  }
  
  // Check if we're in an active login session
  const loginSession = localStorage.getItem('loginSession');
  const recentLogin = localStorage.getItem('recentLogin');
  
  if (loginSession === 'active' && recentLogin === 'true') {
    console.log('✅ User is authenticated (active session)');
    return true;
  }
  
  // Token exists, assume valid (let server validate)
  console.log('✅ User is authenticated with token');
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
