/**
 * Authentication Redirect Hook
 * Provides utilities for handling authentication redirects while preserving page state
 */

import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/authToken';
import { redirectToLogin, storeSearchData, storePageState } from '../utils/authGuard';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Check if user is authenticated and redirect to login if not
   * @param {Object} options - Options for the redirect
   * @param {Object} options.searchData - Search form data to preserve
   * @param {Object} options.pageState - Page state to preserve
   * @param {string} options.customReturnPath - Custom return path (defaults to current path)
   * @param {string} options.customMessage - Custom message for login page
   * @returns {boolean} - True if authenticated, false if redirected to login
   */
  const requireAuth = useCallback((options = {}) => {
    if (isAuthenticated()) {
      return true;
    }

    const { searchData, pageState, customReturnPath, customMessage } = options;
    
    // Store current path with query parameters
    const returnPath = customReturnPath || (location.pathname + location.search);
    
    console.log('Authentication required - redirecting to login');
    console.log('Current path:', returnPath);
    console.log('Search data to preserve:', searchData);
    console.log('Page state to preserve:', pageState);

    // Use the redirectToLogin utility to handle storage and path
    redirectToLogin(returnPath, searchData, pageState);

    // Navigate to login with appropriate message
    navigate('/login', {
      state: {
        sessionExpired: true,
        message: customMessage || 'Please login to continue',
        returnUrl: returnPath
      }
    });

    return false;
  }, [navigate, location]);

  /**
   * Handle session expiry with proper state preservation
   * @param {Object} options - Options for handling session expiry
   * @param {string} options.message - Custom expiry message
   * @param {Object} options.searchData - Search form data to preserve
   * @param {Object} options.pageState - Page state to preserve
   */
  const handleSessionExpiry = useCallback((options = {}) => {
    const { message = 'Your session has expired. Please login again.', searchData, pageState } = options;
    
    console.log('Session expired - handling redirect');
    
    requireAuth({
      searchData,
      pageState,
      customMessage: message
    });
  }, [requireAuth]);

  /**
   * Preserve search form data for restoration after login
   * @param {Object} searchFormData - Search form data to preserve
   */
  const preserveSearchData = useCallback((searchFormData) => {
    console.log('Preserving search data:', searchFormData);
    storeSearchData(searchFormData);
  }, []);

  /**
   * Preserve page state for restoration after login
   * @param {Object} state - Page state to preserve
   */
  const preservePageState = useCallback((state) => {
    console.log('Preserving page state:', state);
    storePageState(state);
  }, []);

  return {
    isAuthenticated: isAuthenticated(),
    requireAuth,
    handleSessionExpiry,
    preserveSearchData,
    preservePageState
  };
};

export default useAuthRedirect;
