// API Configuration for Sona Travel and Tours
// This file centralizes API configuration settings

/**
 * API Configuration object
 */
const apiConfig = {
  // Base URLs for different environments
  baseUrls: {
    development: 'https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/prod',
    production: 'https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/prod',
    staging: 'https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/prod',
  },
  
  // API Endpoints
  endpoints: {
    // Auth endpoints
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refreshToken: '/auth/refresh-token', 
    },
    
    // Bus endpoints
    bus: {
      search: '/bus/search', // gets us all buses based on search criteria [is a get request]
      details: '/bus/:id',
      seats: '/bus/:id/seats',
      seat_details: '/seat/details',// gets us booked seats[is a post request]
    },
    
    // Booking endpoints
    booking: {
      create: '/bookings',
      list: '/bookings/user',
      details: '/bookings/:id',
      cancel: '/bookings/:id/cancel',
    },
    coupons:{
      getcoupons:'/coupons',
    },
    
    // Payment endpoints - NPS 3-step payment flow
    payment: {
      getInstruments: '/payment/instruments', // Step 1: Fetch payment methods
      initiate: '/payment/initiate',          // Step 2: Initiate payment
      complete: '/payment/complete',          // Step 3: Complete payment verification
    },
    
    // Route endpoints
    routes: {
      list: '/routes',
      popular: '/routes/popular',
    },
    
    // System endpoints
    system: {
      health: '/health',
    }
  },
  
  // Request timeouts in milliseconds
  timeouts: {
    short: 5000,   // 5 seconds
    standard: 10000, // 10 seconds
    long: 30000,   // 30 seconds
  },
  
  // Get current environment
  getEnvironment: () => {
    return import.meta.env.MODE || 'development';
  },
  
  // Get base URL based on current environment
  getBaseUrl: () => {
    const env = apiConfig.getEnvironment();
    return import.meta.env.VITE_API_BASE_URL || apiConfig.baseUrls[env] || apiConfig.baseUrls.development;
  },
  
  // Build full URL for an endpoint
  buildUrl: (endpoint) => {
    return `${apiConfig.getBaseUrl()}${endpoint}`;
  }
};

export default apiConfig;
