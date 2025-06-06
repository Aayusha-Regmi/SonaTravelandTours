import Routes from './Routes';
import APIDebugger from './components/dev/APIDebugger';

function App() {
  return (
    <>
      <Routes />
      {/* API Debugger will only render in development mode */}
      <APIDebugger />
    </>
  );
}

export default App;