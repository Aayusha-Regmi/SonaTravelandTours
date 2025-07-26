/**
 * Simple API Configuration Test for Production Deployment
 * This file helps debug API URL construction issues
 */

import API_URLS from '../config/api.js';

export const testApiConfig = () => {
  console.log('🔍 API Configuration Test:');
  console.log('Environment Variables:');
  console.log('- VITE_AUTH_API_BASE_URL:', import.meta.env.VITE_AUTH_API_BASE_URL);
  console.log('- VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('- VITE_GET_ALL_COUPONS:', import.meta.env.VITE_GET_ALL_COUPONS);
  
  console.log('\nConstructed API URLs:');
  console.log('- Login:', API_URLS.AUTH.LOGIN);
  console.log('- Bus Search:', API_URLS.BUS.SEARCH);
  console.log('- Apply Coupon:', API_URLS.COUPONS.APPLY_DISCOUNT);
  
  // Check for undefined values
  const hasUndefined = Object.values(API_URLS).some(section => 
    Object.values(section).some(url => url.includes('undefined'))
  );
  
  if (hasUndefined) {
    console.error('❌ Found undefined values in API URLs');
  } else {
    console.log('✅ All API URLs properly constructed');
  }
  
  return !hasUndefined;
};

// Auto-run in development
if (import.meta.env.DEV) {
  testApiConfig();
}

export default testApiConfig;
