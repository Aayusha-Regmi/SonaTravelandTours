import React, { useState } from 'react';
import api from '../services/api';
import { runAPIDiagnostic, quickCORSTest } from '../utils/apiDiagnostic';

const ApiTestComponent = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);

  const testBusSearch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🧪 Testing Bus Search API...');
      const searchParams = {
        fromCity: 'Birgunj',
        toCity: 'Kathmandu',
        date: '2024-08-23'
      };

      console.log('📤 Request:', searchParams);
      const response = await api.searchBuses(searchParams);
      console.log('📥 Response:', response);
      
      setResult(response);
    } catch (err) {
      console.error('❌ API Test Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const runDiagnostic = async () => {
    setDiagnosticRunning(true);
    console.clear(); // Clear console for clean diagnostic output
    await runAPIDiagnostic();
    setDiagnosticRunning(false);
  };

  const testCORS = async () => {
    console.clear();
    const busApiUrl = 'https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/prod/bus/search';
    await quickCORSTest(busApiUrl);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🧪 API Connection Test</h2>
        
        <div className="mb-4">
          <button
            onClick={testBusSearch}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mr-4"
          >
            {loading ? (
              <>
                <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Testing Connection...
              </>
            ) : (
              '🚌 Test Bus Search API'
            )}
          </button>
          
          <button
            onClick={runDiagnostic}
            disabled={diagnosticRunning}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mr-4"
          >
            {diagnosticRunning ? (
              <>
                <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Running Diagnostic...
              </>
            ) : (
              '🔍 Run Full Diagnostic'
            )}
          </button>
          
          <button
            onClick={testCORS}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center"
          >
            🌐 Test CORS
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Test Parameters:</h3>
            <pre className="text-sm text-gray-600">
{`{
  "destination": "Kathmandu",
  "origin": "Birgunj", 
  "date": "2024-08-23"
}`}
            </pre>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">❌ Error:</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✅ API Response:</h3>
              <div className="text-sm">
                <p className="mb-2"><strong>Total Buses Found:</strong> {Array.isArray(result) ? result.length : 'N/A'}</p>
                
                {Array.isArray(result) && result.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Sample Bus Data:</h4>
                    <pre className="bg-white p-3 rounded border text-xs overflow-auto max-h-96">
                      {JSON.stringify(result[0], null, 2)}
                    </pre>
                  </div>
                )}
                
                <details className="mt-4">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                    View Full Response
                  </summary>
                  <pre className="bg-white p-3 rounded border text-xs overflow-auto max-h-96 mt-2">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          )}
        </div>        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">ℹ️ API Integration Status:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li><strong>Endpoint:</strong> {import.meta.env.VITE_API_BASE_URL}/prod/bus/search</li>
            <li><strong>Method:</strong> POST</li>
            <li><strong>Expected Response:</strong> success=true, data=array</li>
            <li><strong>No Fallback:</strong> Only real API data is shown</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">🔍 How to Check if it's Working:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>1. Open Browser Developer Tools (F12)</li>
            <li>2. Go to Console tab</li>
            <li>3. Click the test button above</li>
            <li>4. Look for API request/response logs</li>
            <li>5. Check Network tab for HTTP requests to your API</li>
            <li>6. <strong>No sample data will be shown on errors</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApiTestComponent;
