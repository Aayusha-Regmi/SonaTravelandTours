/**
 * Sona Travel and Tours - Main Application Component
 * 
 * Developed by: Rohit Jha and Aayusha Regmi
 * LinkedIn: https://www.linkedin.com/in/jrohitofficial/
 * LinkedIn: https://www.linkedin.com/in/aayusha-regmi/
 */

import Routes from './Routes';
import APIDebugger from './components/dev/APIDebugger';
import SessionMonitor from './components/SessionMonitor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './ScrollToTop';
import './utils/sessionDebug'; // Load session debugging utilities
import { useEffect } from 'react';
import { initScrollFixes } from './utils/scrollUtils';

// Import session test utilities for debugging
import './utils/sessionTestUtils';

function App() {
  // Initialize scroll fixes when app loads
  useEffect(() => {
    const cleanup = initScrollFixes();
    
    return cleanup;
  }, []);

  return (
    <>
      <SessionMonitor />
      <ScrollToTop />
      <Routes />      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ 
          top: '100px', // Position below the navbar
          zIndex: 9999 
        }}
        toastStyle={{
          marginTop: '0px'
        }}
      />
    </>
  );
}

export default App;