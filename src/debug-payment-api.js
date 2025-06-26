// API Test Script
// Run this in browser console to test payment APIs

import api from './src/services/api.js';

// Direct API test function
const testDirectAPI = async () => {
  console.log('🧪 Direct API Test...');
  
  const url = 'https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/dev/payment/initiate-payment';
  
  try {
    console.log('🌐 Testing URL:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 2600 })
    });
    
    console.log('📊 Response status:', response.status, response.statusText);
    console.log('� Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('📥 Raw response:', responseText);
    
    if (responseText) {
      try {
        const jsonResponse = JSON.parse(responseText);
        console.log('📥 Parsed JSON:', jsonResponse);
      } catch (e) {
        console.log('❌ Response is not valid JSON');
      }
    }
    
    // Test with different payloads
    console.log('\n🔄 Testing with minimal payload...');
    const minimalResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    console.log('📊 Minimal test status:', minimalResponse.status);
    
  } catch (error) {
    console.error('❌ Direct API test failed:', error);
  }
};

// Test payment API endpoints
const testPaymentAPIs = async () => {
  console.log('🧪 Starting Payment API Tests...');
  
  // Test 0: Direct API test
  console.log('\n🔍 Direct API Test...');
  await testDirectAPI();
  
  // Test 1: API Endpoint Diagnostics
  console.log('\n� Testing API endpoints...');
  await api.testAPIEndpoints();
  
  // Test 2: Payment Initiation
  console.log('\n💰 Testing payment initiation...');
  try {
    const paymentResult = await api.initiatePayment(2600);
    console.log('Payment initiation result:', paymentResult);
  } catch (error) {
    console.error('Payment initiation failed:', error);
  }
  
  console.log('\n✅ API Tests Completed!');
};

// Run the tests
testPaymentAPIs();

// Manual test commands you can run in console:
console.log(`
🔧 Manual Test Commands:
------------------------

// Test payment initiation:
api.initiatePayment(2600).then(console.log);

// Test payment instruments:
api.getPaymentInstruments().then(console.log);

// Test service charge:
api.getServiceCharge(2600, 'IMEPAYG').then(console.log);

// Test FonePay QR generation:
api.generateFonePayQR(2600, '2025-07-10', 'A15,B2', 'prn-test-123').then(console.log);

// Test API endpoints:
api.testAPIEndpoints();

// Check environment variables:
console.log('Environment Variables:');
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('VITE_API_BASE_URL_PAYMENT_DEV:', import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV);
`);
