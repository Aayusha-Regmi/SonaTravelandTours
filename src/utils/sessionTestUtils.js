/**
 * Session Testing Utilities
 * Helper functions for testing session expiry functionality
 */

import { clearAuthToken } from './authToken';

/**
 * Manually expire the session for testing
 * This simulates what happens when a user's session expires
 */
export const expireSessionForTesting = () => {
  // Clear all tokens to simulate expiry
  clearAuthToken();
  
  // Set a past expiry time
  localStorage.setItem('tokenExpiry', '0');
  
  console.log('Session expired for testing purposes');
};

/**
 * Set a short expiry time for testing (1 minute)
 */
export const setShortExpiryForTesting = () => {
  const shortExpiry = Date.now() + (60 * 1000); // 1 minute from now
  localStorage.setItem('tokenExpiry', shortExpiry.toString());
  
  console.log('Token expiry set to 1 minute for testing');
};

/**
 * Check if user would be redirected to login due to session expiry
 */
export const checkSessionStatus = () => {
  const currentPath = window.location.pathname;
  const publicPaths = ['/login', '/signup', '/forgot-password', '/', '/about', '/contact', '/otp-verification'];
  const isPublicPage = publicPaths.includes(currentPath);
  
  const token = localStorage.getItem('authToken');
  const expiry = localStorage.getItem('tokenExpiry');
  const isExpired = expiry && parseInt(expiry) < Date.now();
  
  return {
    currentPath,
    isPublicPage,
    hasToken: !!token,
    isExpired,
    shouldRedirect: !isPublicPage && (!token || isExpired)
  };
};

// Make functions available in console for testing
if (typeof window !== 'undefined') {
  window.expireSession = expireSessionForTesting;
  window.setShortExpiry = setShortExpiryForTesting;
  window.checkSessionStatus = checkSessionStatus;
}

export default {
  expireSessionForTesting,
  setShortExpiryForTesting,
  checkSessionStatus
};
