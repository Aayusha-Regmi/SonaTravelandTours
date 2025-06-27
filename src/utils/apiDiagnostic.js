/**
 * API Diagnostic Tool
 * Helps diagnose network and CORS issues
 */

import { API_URLS } from '../config/api';

export const runAPIDiagnostic = async () => {
  console.log('Starting API Diagnostic...');
  
  // Check environment variables
  console.log('Environment Variables Check:');
  console.log('- VITE_AUTH_API_BASE_URL:', import.meta.env.VITE_AUTH_API_BASE_URL);
  console.log('- VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('- VITE_BUS_SEARCH_ENDPOINT:', import.meta.env.VITE_BUS_SEARCH_ENDPOINT);
  
  // Check constructed URLs
  console.log('Constructed URLs:');
  console.log('- Bus Search URL:', API_URLS.BUS.SEARCH);
  console.log('- Auth Login URL:', API_URLS.AUTH.LOGIN);
  
  // Test 1: Simple GET request to check if server is reachable
  console.log('Test 1: Testing server reachability...');
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log('Trying to reach base URL:', baseUrl);
    
    const response = await fetch(baseUrl, {
      method: 'GET',
      mode: 'cors',
    });
    console.log('Server is reachable. Status:', response.status);
  } catch (error) {
    console.log('Server not reachable:', error.message);
  }
  
  // Test 2: Check CORS with OPTIONS request
  console.log('Test 2: Testing CORS with OPTIONS request...');
  try {
    const response = await fetch(API_URLS.BUS.SEARCH, {
      method: 'OPTIONS',
      mode: 'cors',
    });
    console.log('CORS preflight successful. Status:', response.status);
    console.log('CORS Headers:', Object.fromEntries(response.headers.entries()));
  } catch (error) {
    console.log(' CORS preflight failed:', error.message);
  }
  
  // Test 3: Test with different request configurations
  console.log('Test 3: Testing different request configurations...');
  
  const testConfigs = [
    { name: 'Basic POST', mode: 'cors' },
    { name: 'No-CORS mode', mode: 'no-cors' },
    { name: 'Same-origin mode', mode: 'same-origin' },
  ];
  
  for (const config of testConfigs) {
    try {
      console.log(`Testing ${config.name}...`);
      const response = await fetch(API_URLS.BUS.SEARCH, {
        method: 'POST',
        mode: config.mode,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: 'Kathmandu',
          origin: 'Birgunj',
          date: '2024-08-23'
        }),
      });
      console.log(` ${config.name} successful. Status:`, response.status);
    } catch (error) {
      console.log(` ${config.name} failed:`, error.message);
    }
  }
  
  // Test 4: Check if it's a DNS/network issue
  console.log('Test 4: Testing external API connectivity...');
  try {
    const response = await fetch('https://httpbin.org/get', {
      method: 'GET',
      mode: 'cors',
    });
    console.log(' External API (httpbin.org) reachable. Status:', response.status);
    console.log('Your internet connection is working fine.');
  } catch (error) {
    console.log(' External API failed:', error.message);
    console.log('This might indicate a network connectivity issue.');
  }
  
  console.log('Diagnostic complete. Check results above.');
};

export const quickCORSTest = async (url) => {
  console.log(' Quick CORS test for:', url);
  
  try {
    // Try a simple GET first
    const getResponse = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    });
    console.log(' GET request successful:', getResponse.status);
    
    // Try POST with minimal data
    const postResponse = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test: true }),
    });
    console.log('POST request successful:', postResponse.status);
    
  } catch (error) {
    console.log(' CORS test failed:', error.message);
    
    // Provide specific guidance based on error
    if (error.message.includes('Failed to fetch')) {
      console.log('💡 This is typically a CORS issue. Your API server needs to:');
      console.log('1. Set Access-Control-Allow-Origin header');
      console.log('2. Set Access-Control-Allow-Methods header');
      console.log('3. Set Access-Control-Allow-Headers header');
      console.log('4. Handle OPTIONS preflight requests');
    }
  }
};
