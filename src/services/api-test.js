// API Test Helper for Sona Travel and Tours
// This file helps test API connections during development

import api from './api';

/**
 * Test the bus search API
 * @returns {Promise<void>}
 */
export const testBusSearch = async () => {
  // Test data for bus search
  const testData = {
    from: 'KTM',
    to: 'BRG',
    date: '06/06/2025',
    tripType: 'oneWay'
  };

  console.log('Testing bus search API with data:', testData);
  
  try {
    const response = await api.searchBusRoutes(testData);
    console.log('API Response:', response);
    
    if (response.success) {
      console.log(`Found ${response.data?.length || 0} buses`);
      console.log('First bus:', response.data?.[0]);
    } else {
      console.error('API returned error:', response.message);
    }
    
    return response;
  } catch (error) {
    console.error('API test failed:', error);
    throw error;
  }
};

/**
 * Test API connection
 * @returns {Promise<void>}
 */
export const testAPIConnection = async () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  
  try {
    console.log(`Testing connection to API at ${API_BASE_URL}`);
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      console.log('API connection successful!');
      return true;
    } else {
      console.error(`API connection failed with status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};

// Export all test functions
export default {
  testBusSearch,
  testAPIConnection
};
