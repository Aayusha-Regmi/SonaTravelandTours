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
  console.log(`=== SESSION STATUS [${context}] ===`);
  console.log('Has Token:', status.hasToken);
  console.log('Is Authenticated:', status.isAuthenticated);
  console.log('Is Expired:', status.isExpired);
  console.log('Token Preview:', status.token);
  console.log('Current Path:', status.currentPath);
  console.log('Timestamp:', status.timestamp);
  console.log('================================');
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
  console.log('Session expiry triggered for testing');
  
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
  console.log('Session reset for testing');
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
  
  console.log('Mock session created for testing');
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
  
  console.log('Session debugging utilities available at window.sessionDebug');
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
