// API Configuration for Sona Travel and Tours
// This file centralizes API configuration settings

/**
 * API Configuration object
 */
const apiConfig = {
  // Base URLs for different environments
  baseUrls: {
    development: 'http://localhost:3000',
    production: 'https://api.sonatraveltours.com', // Replace with actual production URL
    staging: 'https://staging-api.sonatraveltours.com', // Replace with actual staging URL
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
      search: '/bus/search',
      details: '/bus/:id',
      seats: '/bus/:id/seats',
    },
    
    // Booking endpoints
    booking: {
      create: '/bookings',
      list: '/bookings/user',
      details: '/bookings/:id',
      cancel: '/bookings/:id/cancel',
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
