// API Debug Component for Sona Travel and Tours
//this functionality is not necessary to be shown on application. its just design for production phase.
import React, { useState } from 'react';
import { testBusSearch, testAPIConnection } from '../../services/api-test';

/**
 * Component for testing API connections during development
 * Only renders in development mode
 */
const APIDebugger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Only show in development mode
  if (import.meta.env.MODE !== 'development') {
    return null;
  }
  
  const runTest = async (testFn, testName) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await testFn();
      setResults({
        testName,
        success: true,
        result
      });
    } catch (err) {
      setError(`Test failed: ${err.message}`);
      setResults({
        testName,
        success: false,
        error: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full shadow-lg"
      >
        {isOpen ? 'Close' : 'API Debugger'}
      </button>
      
      {/* Debug panel */}
      {isOpen && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-4 mt-2 w-96">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">API Debugger</h3>
          
          <div className="space-y-2 mb-4">
            <button 
              onClick={() => runTest(testAPIConnection, 'API Connection')}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
            >
              Test API Connection
            </button>
            
            <button 
              onClick={() => runTest(testBusSearch, 'Bus Search')}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
            >
              Test Bus Search
            </button>
          </div>
          
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2">Running test...</span>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          
          {results && !isLoading && (
            <div className="border rounded p-2 bg-gray-50 max-h-64 overflow-auto">
              <h4 className="font-bold mb-1">{results.testName} Result:</h4>
              <div className={`text-sm ${results.success ? 'text-green-600' : 'text-red-600'}`}>
                {results.success ? 'Success!' : 'Failed'}
              </div>
              <pre className="text-xs mt-2 overflow-x-auto">
                {JSON.stringify(results.result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default APIDebugger;
