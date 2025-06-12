import Routes from './Routes';
import APIDebugger from './components/dev/APIDebugger';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes />      <ToastContainer 
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