/**
 * HTTP Interceptor Service
 * Centralized HTTP request/response handling with automatic authentication
 */

import { getAuthToken, isAuthenticated, clearAuthToken } from '../utils/authToken';
import { toast } from 'react-toastify';
import userActionTracker, { ACTION_TYPES, createRestorationPayload } from '../utils/userActionTracker';
import apiConfig from './api-config.js';

class HttpInterceptor {
  constructor() {
    this.baseURL = apiConfig.getBaseUrl();
    this.sessionExpiredCallback = null;
    this.setupInterceptors();
  }

  /**
   * Set callback for session expiry handling
   * @param {Function} callback - Function to call when session expires
   */
  setSessionExpiredCallback(callback) {
    this.sessionExpiredCallback = callback;
  }

  /**
   * Setup global fetch interceptor
   */
  setupInterceptors() {
    // Store original fetch
    const originalFetch = window.fetch;
    
    // Override global fetch
    window.fetch = async (url, options = {}) => {
      // Pre-request interceptor
      const interceptedOptions = this.requestInterceptor(url, options);
      
      try {
        // Make the actual request
        const response = await originalFetch(url, interceptedOptions);
        
        // Post-response interceptor
        return this.responseInterceptor(response, url, interceptedOptions);
      } catch (error) {
        // Handle network errors
        console.error('Network error:', error);
        throw error;
      }
    };
  }

  /**
   * Request interceptor - adds authentication headers
   * @param {string} url - Request URL
   * @param {Object} options - Fetch options
   * @returns {Object} Modified options
   */
  requestInterceptor(url, options) {
    const modifiedOptions = { ...options };
    
    // Only intercept API calls (not static assets)
    if (this.isApiCall(url)) {
      // Initialize headers if not present
      if (!modifiedOptions.headers) {
        modifiedOptions.headers = {};
      }
      
      // Add authentication token if available
      const token = getAuthToken();
      if (token) {
        modifiedOptions.headers.Authorization = `Bearer ${token}`;
      }
      
      // Ensure content-type is set for API calls
      if (!modifiedOptions.headers['Content-Type'] && modifiedOptions.body) {
        modifiedOptions.headers['Content-Type'] = 'application/json';
      }
      
      // Add accept header
      if (!modifiedOptions.headers['Accept']) {
        modifiedOptions.headers['Accept'] = 'application/json';
      }
      
      
    
    }
    
    return modifiedOptions;
  }

  /**
   * Response interceptor - handles authentication errors
   * @param {Response} response - Fetch response
   * @param {string} url - Request URL
   * @param {Object} options - Request options
   * @returns {Response} Response or throws error
   */
  async responseInterceptor(response, url, options) {
    // Only intercept API calls
    if (!this.isApiCall(url)) {
      return response;
    }

    
    // Handle authentication errors
    if (this.isAuthenticationError(response)) {
      
      // Clear invalid tokens
      clearAuthToken();
      
      // Handle session expiry
      this.handleSessionExpiry(url, options);
      
      // Clone response to read error details
      const errorResponse = response.clone();
      let errorData = {};
      
      try {
        const text = await errorResponse.text();
        errorData = text ? JSON.parse(text) : {};
      } catch (e) {
        console.warn('Could not parse error response:', e);
      }
      
      // Throw custom authentication error
      const authError = new Error('AUTHENTICATION_REQUIRED');
      authError.status = response.status;
      authError.data = errorData;
      authError.url = url;
      
      throw authError;
    }

    // Handle other HTTP errors
    if (!response.ok) {
      console.warn(' HTTP error detected by interceptor:', {
        status: response.status,
        url,
        statusText: response.statusText
      });
      
      // For non-auth errors, just log and return response
      // Let the calling code handle the error
    }

    return response;
  }

  /**
   * Check if URL is an API call that should be intercepted
   * @param {string} url - Request URL
   * @returns {boolean} True if API call
   */
  isApiCall(url) {
    // Exclude third-party APIs that don't need authentication
    const excludedApis = [
      'maps.googleapis.com',
      'api.open-meteo.com',
      'openweathermap.org',
      'formsubmit.co',
      'gateway.nepalpayment.com'
    ];
    
    // Don't intercept excluded APIs
    if (excludedApis.some(api => url.includes(api))) {
      return false;
    }
    
    // Don't intercept the frontend domain - only intercept our API domains
    if (url.includes('sonatraveltours.com')) {
      console.warn('🚫 Frontend domain detected in API call, skipping interceptor:', url);
      return false;
    }
    
    // Only intercept URLs that match our actual API base URLs
    const apiBaseUrl = apiConfig.getBaseUrl();
    
    return (
      url.includes(apiBaseUrl) ||
      // Only intercept URLs that are actually on our API domains
      url.includes('execute-api.us-east-1.amazonaws.com')
    );
  }

  /**
   * Check if response indicates authentication error
   * @param {Response} response - Fetch response
   * @returns {boolean} True if authentication error
   */
  isAuthenticationError(response) {
    return response.status === 401 || response.status === 403;
  }

  /**
   * Handle session expiry with user action tracking
   * @param {string} url - Request URL that failed
   * @param {Object} options - Request options
   */
  handleSessionExpiry(url, options) {
    console.warn(' Session expired - handling with user action tracking');
    
    // Check if we're in an active login session - don't interfere
    const loginSession = localStorage.getItem('loginSession');
    if (loginSession === 'active') {
     
      return;
    }
    
    // Don't handle session expiry for login/auth endpoints or frontend domain URLs
    if (url.includes('/login') || 
        url.includes('/signup') || 
        url.includes('/otp') ||
        url.includes('sonatraveltours.com')) {
     
      return;
    }
    
    // Track the API call that failed due to authentication
    userActionTracker.trackAction(ACTION_TYPES.API_CALL, {
      url,
      method: options.method || 'GET',
      requiresAuth: true,
      failureReason: 'session_expired'
    });

    // Create restoration payload
    const restorationPayload = createRestorationPayload('Session expired during API call');
    
    // Store restoration data in localStorage for cross-page access
    try {
      localStorage.setItem('authRedirectData', JSON.stringify(restorationPayload));
    } catch (error) {
      console.error('Failed to store restoration data:', error);
    }

    // Show session expired toast
    toast.error('Your session has expired. Please log in to continue.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => {
        // Redirect to login page after toast closes
        this.redirectToLogin(restorationPayload);
      }
    });

    // Call session expired callback if set
    if (this.sessionExpiredCallback) {
      this.sessionExpiredCallback({
        url,
        method: options.method || 'GET',
        timestamp: Date.now(),
        restorationPayload
      });
    } else {
      // If no callback is set, redirect immediately
      setTimeout(() => {
        this.redirectToLogin(restorationPayload);
      }, 1000);
    }
  }

  /**
   * Redirect to login page with restoration context
   * @param {Object} restorationPayload - Restoration context
   */
  redirectToLogin(restorationPayload) {
    // Store the restoration payload for the login page
    if (restorationPayload) {
      try {
        localStorage.setItem('authRedirectData', JSON.stringify(restorationPayload));
      } catch (error) {
        console.error('Failed to store restoration data:', error);
      }
    }

    // Use window.location for reliable redirect
    const loginUrl = '/login';
    
    // Check if we're already on login page to avoid infinite loops
    if (window.location.pathname !== loginUrl) {
     
      window.location.href = loginUrl;
    }
  }

  /**
   * Enhanced fetch with built-in authentication checks
   * @param {string} url - Request URL
   * @param {Object} options - Fetch options
   * @returns {Promise} Fetch promise
   */
  async authenticatedFetch(url, options = {}) {
    // Skip authentication checks for login/auth endpoints
    const isAuthEndpoint = url.includes('/login') || 
                          url.includes('/auth/login') || 
                          url.includes('/signup') || 
                          url.includes('/auth/signup') ||
                          url.includes('/otp') ||
                          url.includes('/forgot-password');
    
    if (isAuthEndpoint) {
     
      return fetch(url, options);
    }

    // Pre-check authentication for critical operations
    if (!isAuthenticated()) {
      
      const authError = new Error('AUTHENTICATION_REQUIRED');
      authError.status = 401;
      authError.preCheck = true;
      throw authError;
    }

    // Use regular fetch (will be intercepted)
    return fetch(url, options);
  }

  /**
   * Retry a request with fresh authentication
   * @param {string} url - Request URL
   * @param {Object} options - Fetch options
   * @param {number} maxRetries - Maximum retry attempts
   * @returns {Promise} Fetch promise
   */
  async retryWithAuth(url, options = {}, maxRetries = 1) {
    let lastError;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.authenticatedFetch(url, options);
      } catch (error) {
        lastError = error;
        
        if (error.message === 'AUTHENTICATION_REQUIRED' && attempt < maxRetries) {
         
          // Wait briefly before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
        
        throw error;
      }
    }
    
    throw lastError;
  }

  /**
   * Make authenticated API call with automatic error handling
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} API response data
   */
  async apiCall(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;
    
    try {
      const response = await this.authenticatedFetch(url, options);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error.message === 'AUTHENTICATION_REQUIRED') {
        // Re-throw authentication errors for higher-level handling
        throw error;
      }
      
      console.error('API call failed:', {
        endpoint,
        error: error.message,
        status: error.status
      });
      
      throw error;
    }
  }

  /**
   * Cleanup interceptors (for testing or reinitialization)
   */
  cleanup() {
    // Note: In a real application, you'd want to store and restore original fetch
    // This is a simplified implementation
   
  }
}

// Create singleton instance
const httpInterceptor = new HttpInterceptor();

// Create explicit helper functions
function authenticatedFetch(url, options) {
  return httpInterceptor.authenticatedFetch(url, options);
}

function apiCall(endpoint, options) {
  return httpInterceptor.apiCall(endpoint, options);
}

function setSessionExpiredCallback(callback) {
  return httpInterceptor.setSessionExpiredCallback(callback);
}

// Export both the instance, the class and helper functions
export default httpInterceptor;
export { 
  HttpInterceptor,
  authenticatedFetch,
  apiCall,
  setSessionExpiredCallback
};
