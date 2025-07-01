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
export const redirectToLogin = (returnPath = null, searchData = null) => {
  if (searchData) {
    storeSearchData(searchData);
  }
  
  const loginUrl = '/login';
  if (returnPath) {
    localStorage.setItem('returnPath', returnPath);
  }
  
  return loginUrl;
};

// Get and clear return path
export const getAndClearReturnPath = () => {
  const returnPath = localStorage.getItem('returnPath');
  if (returnPath) {
    localStorage.removeItem('returnPath');
    return returnPath;
  }
  return '/';
};
