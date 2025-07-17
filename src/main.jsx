/**
 * Sona Travel and Tours - Application Entry Point
 * 
 * Developed by: Rohit Jha and Aayusha Regmi
 * LinkedIn: https://www.linkedin.com/in/jrohitofficial/
 * LinkedIn: https://www.linkedin.com/in/aayusha-regmi/
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/index.css';

// Initialize HTTP interceptor
import httpInterceptor, { setSessionExpiredCallback } from './services/httpInterceptor';

// Set up global session expiry handler
setSessionExpiredCallback((errorDetails) => {
  console.log('Global session expired handler called:', errorDetails);
  
  // Force redirect to login if no specific handler is set
  if (!window.sessionExpiredHandlerOverride) {
    window.location.href = '/login';
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
