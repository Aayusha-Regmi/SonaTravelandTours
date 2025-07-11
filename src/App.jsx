import Routes from './Routes';
import APIDebugger from './components/dev/APIDebugger';
import SessionMonitor from './components/SessionMonitor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './ScrollToTop';
import './utils/sessionDebug'; // Load session debugging utilities

// Import session test utilities for debugging
import './utils/sessionTestUtils';

function App() {
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