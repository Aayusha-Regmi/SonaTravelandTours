// Debug script to check authentication and API status
// Run this in browser console to debug the booking fetch issues

console.log('=== AUTHENTICATION DEBUG ===');

// Check if auth utilities are available
const authUtils = window.authUtils || {};
console.log('Auth utils available:', Object.keys(authUtils));

// Check localStorage for tokens
console.log('localStorage tokens:');
console.log('- authToken:', localStorage.getItem('authToken'));
console.log('- token:', localStorage.getItem('token'));

// Check sessionStorage for tokens
console.log('sessionStorage tokens:');
console.log('- authToken:', sessionStorage.getItem('authToken'));
console.log('- token:', sessionStorage.getItem('token'));

// Test authentication functions if available
if (window.getAuthToken) {
  console.log('getAuthToken():', window.getAuthToken());
}

if (window.isAuthenticated) {
  console.log('isAuthenticated():', window.isAuthenticated());
}

if (window.getAuthHeaders) {
  console.log('getAuthHeaders():', window.getAuthHeaders());
}

console.log('=== API ENDPOINTS DEBUG ===');

// Check if API_URLS is available
if (window.API_URLS) {
  console.log('API_URLS.BOOKINGS:', window.API_URLS.BOOKINGS);
  console.log('API_URLS.PROFILE:', window.API_URLS.PROFILE);
} else {
  console.log('API_URLS not available in window object');
}

// Check environment variables
console.log('Environment variables:');
console.log('- VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('- VITE_AUTH_API_BASE_URL:', import.meta.env.VITE_AUTH_API_BASE_URL);

console.log('=== NETWORK TEST ===');

// Test if we can reach the booking endpoint
async function testBookingEndpoint() {
  try {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    const bookingUrl = `${import.meta.env.VITE_API_BASE_URL}/bookings/user`;
    
    console.log('Testing booking endpoint:', bookingUrl);
    console.log('Using token:', token ? `${token.substring(0, 10)}...` : 'No token found');
    
    const response = await fetch(bookingUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    const result = await response.json();
    console.log('Response data:', result);
    
    return result;
  } catch (error) {
    console.error('Booking endpoint test failed:', error);
    return null;
  }
}

// Run the test
testBookingEndpoint();

console.log('=== DEBUG COMPLETE ===');
