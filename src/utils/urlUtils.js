/**
 * Utility functions for URL and query parameter handling
 */

/**
 * Get query parameter value from URL
 * @param {string} paramName - Name of the query parameter
 * @param {string} url - URL to extract from (optional, defaults to current window.location)
 * @returns {string|null} - Parameter value or null if not found
 */
export const getQueryParam = (paramName, url = null) => {
  try {
    let searchParams;
    
    if (url) {
      // Extract from provided URL
      const urlObj = new URL(url);
      searchParams = urlObj.searchParams;
    } else if (typeof window !== 'undefined') {
      // Extract from current browser URL
      searchParams = new URLSearchParams(window.location.search);
    } else {
      // Server-side or no window available
      return null;
    }
    
    return searchParams.get(paramName);
  } catch (error) {
    console.error('Error extracting query parameter:', error);
    return null;
  }
};

/**
 * Get all query parameters as an object
 * @param {string} url - URL to extract from (optional, defaults to current window.location)
 * @returns {Object} - Object containing all query parameters
 */
export const getAllQueryParams = (url = null) => {
  try {
    let searchParams;
    
    if (url) {
      const urlObj = new URL(url);
      searchParams = urlObj.searchParams;
    } else if (typeof window !== 'undefined') {
      searchParams = new URLSearchParams(window.location.search);
    } else {
      return {};
    }
    
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    
    return params;
  } catch (error) {
    console.error('Error extracting query parameters:', error);
    return {};
  }
};

/**
 * Extract payment-related query parameters from NPS callback URL
 * @param {string} url - Callback URL (optional, defaults to current window.location)
 * @returns {Object} - Object containing payment-related parameters
 */
export const extractPaymentParams = (url = null) => {
  const merchantTxnId = getQueryParam('merchantTxnId', url);
  const gatewayTxnId = getQueryParam('gatewayTxnId', url);
  const status = getQueryParam('status', url);
  const amount = getQueryParam('amount', url);
  const message = getQueryParam('message', url);
  
  return {
    merchantTxnId,
    gatewayTxnId,
    status,
    amount,
    message,
    isValid: !!(merchantTxnId && gatewayTxnId)
  };
};

/**
 * Add query parameters to a URL
 * @param {string} baseUrl - Base URL
 * @param {Object} params - Parameters to add
 * @returns {string} - URL with added parameters
 */
export const addQueryParams = (baseUrl, params) => {
  try {
    const url = new URL(baseUrl);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, value);
      }
    });
    
    return url.toString();
  } catch (error) {
    console.error('Error adding query parameters:', error);
    return baseUrl;
  }
};

/**
 * Remove query parameters from current URL
 * @param {Array<string>} paramNames - Names of parameters to remove
 */
export const removeQueryParams = (paramNames) => {
  if (typeof window === 'undefined') return;
  
  try {
    const url = new URL(window.location);
    
    paramNames.forEach(paramName => {
      url.searchParams.delete(paramName);
    });
    
    // Update browser URL without reloading
    window.history.replaceState({}, document.title, url.pathname + url.search);
  } catch (error) {
    console.error('Error removing query parameters:', error);
  }
};
