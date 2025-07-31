/**
 * Utility functions for debugging payment gateway issues
 */

// Constants for different payment gateway endpoints
const GATEWAY_ENDPOINTS = {
  NPS_DIRECT: 'https://gateway.nepalpayment.com/payment/index',
  NPS_REDIRECT: 'https://gateway.nepalpayment.com/payment/redirect',
  ESEWA: 'https://esewa.com.np/epay/main',
  KHALTI: 'https://khalti.com/api/payment/',
};

/**
 * Tests connection to payment gateways
 * @param {string} gatewayUrl - The payment gateway URL to test
 * @param {string} authToken - Optional authentication token
 * @returns {Promise<{success: boolean, timeMs: number, status?: number, error?: string}>}
 */
export const testGatewayConnection = async (gatewayUrl = GATEWAY_ENDPOINTS.NPS_DIRECT, authToken = null) => {
 
  const startTime = performance.now();
  
  try {
    // Try to get an auth token if one wasn't provided
    let token = authToken;
    if (!token && typeof window !== 'undefined') {
      // Try to get token from localStorage or sessionStorage
      token = localStorage.getItem('authToken') || 
              sessionStorage.getItem('authToken') || 
              localStorage.getItem('token') || 
              sessionStorage.getItem('token');
    }
    
    // Use fetch with a short timeout to test the connection
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
  
    }
    
    const response = await fetch(gatewayUrl, {
      method: 'HEAD',
      signal: controller.signal,
      mode: 'no-cors', // This is necessary as we're just testing connection
      headers: headers
    });
    
    clearTimeout(timeoutId);
    const endTime = performance.now();
    
    return {
      success: true,
      timeMs: Math.round(endTime - startTime),
      status: response.status,
    };
  } catch (error) {
    const endTime = performance.now();
    
    
    return {
      success: false,
      timeMs: Math.round(endTime - startTime),
      error: error.message,
    };
  }
};

/**
 * Validates payment data before submission
 * @param {Object} paymentData - The payment data to validate
 * @returns {Object} Validation result with errors if any
 */
export const validatePaymentData = (paymentData) => {
  // Only check for fields that NPS actually supports and requires
  const requiredFields = [
    'MerchantId', 'MerchantTxnId', 'Amount', 'ProcessId'
    // ReturnUrl and CancelUrl are NOT required by NPS
    // AuthToken is NOT supported by NPS
  ];
  
  const errors = {};
  let isValid = true;
  
  // Check required fields
  requiredFields.forEach(field => {
    // First check the capitalized version (preferred)
    if (!paymentData[field]) {
      // Then check lowercase version as fallback (our internal format)
      const lowercaseField = field.charAt(0).toLowerCase() + field.slice(1);
      if (field === 'MerchantTxnId' && paymentData['merchantTransactionId']) {
        // Handle special case for merchantTransactionId
        // Convert to expected format
        paymentData[field] = paymentData['merchantTransactionId'];
      } else if (paymentData[lowercaseField]) {
        // Convert to expected format
        paymentData[field] = paymentData[lowercaseField];
      } else {
        errors[field] = `Missing required field: ${field}`;
        isValid = false;
      }
    }
  });
  
  // Validate amount format
  if (paymentData.amount && (isNaN(parseFloat(paymentData.amount)) || parseFloat(paymentData.amount) <= 0)) {
    errors.amount = 'Amount must be a positive number';
    isValid = false;
  }
  
  return { isValid, errors };
};

/**
 * Logs detailed information about a payment attempt for debugging
 * @param {Object} paymentData - The payment data being submitted
 * @param {string} gatewayUrl - The payment gateway URL
 */
export const logPaymentDebugInfo = (paymentData, gatewayUrl) => {
  // Validate payment data
  const validation = validatePaymentData(paymentData);
  
  return validation;
};

export default {
  testGatewayConnection,
  validatePaymentData,
  logPaymentDebugInfo,
  GATEWAY_ENDPOINTS,
};
