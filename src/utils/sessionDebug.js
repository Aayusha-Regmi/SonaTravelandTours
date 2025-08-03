/**
 * Session Debugging Utilities
 * Helps track down session expiry issues
 */

import { getAuthToken, isAuthenticated, isTokenExpired } from '../utils/authToken';

/**
 * Get current session status for debugging
 */
export const getSessionStatus = () => {
  const token = getAuthToken();
  const authenticated = isAuthenticated();
  const expired = isTokenExpired();
  
  return {
    hasToken: !!token,
    isAuthenticated: authenticated,
    isExpired: expired,
    token: token ? token.substring(0, 20) + '...' : null, // Show first 20 chars only
    currentPath: window.location.pathname,
    currentUrl: window.location.href,
    timestamp: new Date().toISOString()
  };
};

/**
 * Log session status for debugging
 */
export const logSessionStatus = (context = 'Unknown') => {
  const status = getSessionStatus();

  return status;
};

/**
 * Check if current page should require authentication
 */
export const shouldRequireAuth = (path = window.location.pathname) => {
  const publicPaths = ['/login', '/signup', '/forgot-password', '/', '/about', '/contact', '/otp-verification'];
  return !publicPaths.includes(path);
};

/**
 * Check if we're on a login-related page
 */
export const isLoginPage = (path = window.location.pathname) => {
  const loginPaths = ['/login', '/signup', '/forgot-password', '/otp-verification'];
  return loginPaths.includes(path);
};

/**
 * Trigger session expiry manually for testing
 */
export const triggerSessionExpiry = () => {
  // Set token expiry to past time
  localStorage.setItem('tokenExpiry', '0');
 
  
  // Reload page to trigger session check
  window.location.reload();
};

/**
 * Reset session for testing
 */
export const resetSession = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiry');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('tokenExpiry');

};

/**
 * Create a mock valid session for testing
 */
export const createMockSession = () => {
  const mockToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  localStorage.setItem('authToken', mockToken);
  
  // Set expiry to 24 hours from now
  const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
  localStorage.setItem('tokenExpiry', expiryTime.toString());
  
  
  return mockToken;
};

// Make functions available globally for debugging
if (typeof window !== 'undefined') {
  window.sessionDebug = {
    getStatus: getSessionStatus,
    logStatus: logSessionStatus,
    shouldRequireAuth,
    isLoginPage,
    triggerExpiry: triggerSessionExpiry,
    resetSession,
    createMockSession
  };
  

}

export default {
  getSessionStatus,
  logSessionStatus,
  shouldRequireAuth,
  isLoginPage,
  triggerSessionExpiry,
  resetSession,
  createMockSession
};
