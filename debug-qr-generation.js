// QR Generation Debug Script
// Run this in browser console to test QR generation

console.log('🧪 Testing QR Generation API...');

const testQRGeneration = async () => {
  // Check authentication first
  const authCheck = window.checkAuth();
  console.log('1. Authentication status:', authCheck);
  
  if (!authCheck.isAuthenticated) {
    console.log('❌ Not authenticated - cannot test QR generation');
    console.log('💡 Please login first');
    return;
  }
  
  // Test QR generation API directly
  console.log('2. Testing QR generation API...');
  
  const testPayload = {
    amount: 1000,
    remarks1: '2025-07-10', // travel date
    remarks2: 'A1,A2' // seat numbers
  };
  
  console.log('📡 Request payload:', testPayload);
  
  try {
    const response = await fetch('https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/dev/payment/qr/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authCheck.token}`
      },
      body: JSON.stringify(testPayload)
    });
    
    console.log('📊 Response status:', response.status, response.statusText);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('📥 Raw response:', text);
    
    if (text) {
      try {
        const data = JSON.parse(text);
        console.log('📥 Parsed response:', data);
        
        if (response.status === 500) {
          console.log('❌ 500 Server Error - API has internal issues');
          console.log('💡 This is a server-side problem, not a client issue');
          
          if (data.message && data.message.includes('statusCode')) {
            console.log('🔍 The error suggests missing/undefined data in the API server');
            console.log('🔍 This could be related to missing payment transaction data');
          }
        } else if (response.ok) {
          console.log('✅ QR generation API working correctly');
          
          if (data.qrMessage || data.qrCode) {
            console.log('✅ QR code data found');
          } else {
            console.log('⚠️ QR code data missing from response');
          }
        }
      } catch (e) {
        console.log('⚠️ Response is not valid JSON');
      }
    } else {
      console.log('⚠️ Empty response from server');
    }
    
  } catch (error) {
    console.error('❌ Request failed:', error);
  }
};

// Test the API wrapper function
const testAPIWrapper = async () => {
  console.log('3. Testing api.generateQRCode()...');
  
  try {
    const result = await api.generateQRCode(1000, '2025-07-10', 'A1,A2');
    console.log('✅ API wrapper result:', result);
  } catch (error) {
    console.error('❌ API wrapper failed:', error);
  }
};

// Run tests
testQRGeneration().then(() => {
  testAPIWrapper();
});

console.log('🎯 Available functions:');
console.log('- testQRGeneration() - Test QR API directly');
console.log('- testAPIWrapper() - Test API wrapper function');

// Make functions globally available
window.testQRGeneration = testQRGeneration;
window.testAPIWrapper = testAPIWrapper;

// Additional debugging info
console.log('🔍 Possible causes of 500 error:');
console.log('1. Missing payment transaction ID in server state');
console.log('2. Invalid/expired authentication token');
console.log('3. Missing required parameters in request');
console.log('4. Server-side database/configuration issues');
console.log('');
console.log('💡 Suggestion: Make sure payment initiation was successful first');
console.log('💡 The QR generation might depend on the payment transaction from step 1');
