/**
 * Authentication Guard Utilities
 */

import { getAuthToken, isAuthenticated as checkAuth } from './authToken';

// Check if user is authenticated - using centralized auth logic
export const isAuthenticated = () => {
  return checkAuth();
};

// Get current user info
export const getCurrentUser = () => {
  if (!isAuthenticated()) return null;
  
  try {
    const token = getAuthToken();
    const userRole = localStorage.getItem('userRole');
    const userMessage = localStorage.getItem('userMessage');
    
    return {
      token,
      role: userRole || 'user',
      message: userMessage
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Store search data for later use
export const storeSearchData = (searchData) => {
  try {
    localStorage.setItem('pendingSearchData', JSON.stringify(searchData));
    console.log('Search data stored:', searchData);
  } catch (error) {
    console.error('Error storing search data:', error);
  }
};

// Store page state for restoration after login
export const storePageState = (pageState) => {
  try {
    localStorage.setItem('pendingPageState', JSON.stringify(pageState));
    console.log('Page state stored:', pageState);
  } catch (error) {
    console.error('Error storing page state:', error);
  }
};

// Retrieve and clear stored search data
export const getAndClearSearchData = () => {
  try {
    const data = localStorage.getItem('pendingSearchData');
    if (data) {
      localStorage.removeItem('pendingSearchData');
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving search data:', error);
    return null;
  }
};

// Retrieve and clear stored page state
export const getAndClearPageState = () => {
  try {
    const data = localStorage.getItem('pendingPageState');
    if (data) {
      localStorage.removeItem('pendingPageState');
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving page state:', error);
    return null;
  }
};

// Clear authentication data
export const clearAuthData = () => {
  // Clear all possible token storage locations
  localStorage.removeItem('token');
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('authToken');
  localStorage.removeItem('loginSuccess');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userMessage');
};

// Redirect to login with return path
export const redirectToLogin = (returnPath = null, searchData = null, pageState = null) => {
  if (searchData) {
    storeSearchData(searchData);
  }
  
  if (pageState) {
    storePageState(pageState);
  }
  
  const loginUrl = '/login';
  
  // Determine the return path
  let pathToStore = returnPath;
  if (!pathToStore) {
    // If no returnPath provided, capture current location
    pathToStore = window.location.pathname + window.location.search;
  } else if (!pathToStore.includes('?') && window.location.search) {
    // If returnPath doesn't include query params but current location has them
    pathToStore = pathToStore + window.location.search;
  }
  
  // Store the complete path
  localStorage.setItem('returnPath', pathToStore);
  console.log('Return path stored:', pathToStore);
  
  return loginUrl;
};

// Get and clear return path
export const getAndClearReturnPath = () => {
  const returnPath = localStorage.getItem('returnPath');
  if (returnPath) {
    localStorage.removeItem('returnPath');
    console.log('Return path retrieved and cleared:', returnPath);
    return returnPath;
  }
  console.log('No return path found');
  return null; // Return null instead of '/' to distinguish between no path and home path
};
