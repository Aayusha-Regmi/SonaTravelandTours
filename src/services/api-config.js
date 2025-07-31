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
      getInstruments: '/payment/get-all-payment-instruments', // Step 1: Fetch payment methods
      initiate: '/payment/initiate-payment',          // Step 2: Initiate payment
      complete: '/payment/complete',  
      servicecharge: '/payment/get-service-charge'       // Step 3: Complete payment verification
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
    const viteApiUrl = import.meta.env.VITE_API_BASE_URL;
    const configUrl = apiConfig.baseUrls[env];
    const fallbackUrl = apiConfig.baseUrls.production; // Use production as fallback instead of development
    
    let finalUrl = viteApiUrl || configUrl || fallbackUrl;
    
    // Safety check: Never use frontend URL - always force production API
    if (!finalUrl || 
        finalUrl.includes('sonatraveltours.com') || 
        finalUrl.includes('localhost') || 
        finalUrl.includes('127.0.0.1') ||
        !finalUrl.includes('amazonaws.com')) {
      finalUrl = 'https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/prod';
    }
    
    return finalUrl;
  },
  
  // Build full URL for an endpoint
  buildUrl: (endpoint) => {
    return `${apiConfig.getBaseUrl()}${endpoint}`;
  }
};

export default apiConfig;
