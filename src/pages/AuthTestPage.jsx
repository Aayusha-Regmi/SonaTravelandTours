// Authentication Test Page
// This is a simple test to verify authentication is working correctly

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AuthTestPage = () => {
  const [authStatus, setAuthStatus] = useState(null);
  const [testResults, setTestResults] = useState([]);
  
  useEffect(() => {
    runAuthTests();
  }, []);
  
  const runAuthTests = async () => {
    const results = [];
    
    // Test 1: Check authentication status
    console.log('🧪 Running authentication tests...');
    const authCheck = api.checkAuthentication();
    setAuthStatus(authCheck);
    
    results.push({
      test: 'Authentication Check',
      status: authCheck.isAuthenticated ? 'PASS' : 'FAIL',
      details: authCheck
    });
    
    if (authCheck.isAuthenticated) {
      // Test 2: Test payment API with authentication
      try {
        console.log('🧪 Testing payment API...');
        const paymentResult = await api.initiatePayment(1000);
        
        results.push({
          test: 'Payment API',
          status: paymentResult.success ? 'PASS' : 'FAIL',
          details: paymentResult
        });
      } catch (error) {
        results.push({
          test: 'Payment API',
          status: 'ERROR',
          details: { error: error.message }
        });
      }
    }
    
    setTestResults(results);
  };
  
  const formatJSON = (obj) => {
    return JSON.stringify(obj, null, 2);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Authentication & Payment API Test
          </h1>
          
          <button
            onClick={runAuthTests}
            className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Run Tests
          </button>
          
          {/* Authentication Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Authentication Status
            </h2>
            <div className={`p-4 rounded-lg border ${
              authStatus?.isAuthenticated 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center mb-2">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  authStatus?.isAuthenticated ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                <span className="font-medium">
                  {authStatus?.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                </span>
              </div>
              
              {authStatus && (
                <div className="bg-gray-100 p-3 rounded mt-3">
                  <pre className="text-xs text-gray-700 overflow-x-auto">
                    {formatJSON(authStatus)}
                  </pre>
                </div>
              )}
            </div>
          </div>
          
          {/* Test Results */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Test Results
            </h2>
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.status === 'PASS' 
                      ? 'bg-green-50 border-green-200'
                      : result.status === 'FAIL'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{result.test}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      result.status === 'PASS'
                        ? 'bg-green-100 text-green-800'
                        : result.status === 'FAIL'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
                      {formatJSON(result.details)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Debug Information */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Debug Information
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                Run the following commands in your browser console:
              </p>
              <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                <div>window.debugAuth()</div>
                <div>window.checkAuth()</div>
                <div>window.testPaymentAuth()</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTestPage;
