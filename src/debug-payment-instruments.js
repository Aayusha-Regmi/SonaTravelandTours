// Test Payment Instruments Script
// Run this in browser console to debug payment instruments

console.log('🧪 Testing Payment Instruments...');

// Test the API directly
const testPaymentInstruments = async () => {
  try {
    console.log('1. Testing authentication...');
    const authCheck = window.checkAuth();
    console.log('Auth status:', authCheck);
    
    if (!authCheck.isAuthenticated) {
      console.log('❌ Not authenticated - cannot test payment instruments');
      console.log('💡 Please login first');
      return;
    }
    
    console.log('2. Testing payment instruments API...');
    const response = await fetch('https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/dev/payment/get-all-payment-instruments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authCheck.token}`
      }
    });
    
    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('📥 Raw response:', text);
    
    if (text) {
      try {
        const data = JSON.parse(text);
        console.log('📥 Parsed response:', data);
      } catch (e) {
        console.log('⚠️ Response is not valid JSON');
      }
    }
    
    console.log('3. Testing fallback instruments...');
    const fallback = api.getFallbackPaymentInstruments();
    console.log('🔄 Fallback instruments:', fallback);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Test the full API function
const testAPIFunction = async () => {
  console.log('🧪 Testing api.getPaymentInstruments()...');
  
  try {
    const result = await api.getPaymentInstruments();
    console.log('✅ API function result:', result);
  } catch (error) {
    console.error('❌ API function failed:', error);
  }
};

// Run tests
testPaymentInstruments();
testAPIFunction();

console.log('🎯 Test commands available:');
console.log('- testPaymentInstruments() - Test API directly');
console.log('- testAPIFunction() - Test API wrapper function');
console.log('- api.getFallbackPaymentInstruments() - Get fallback instruments');

// Make functions globally available
window.testPaymentInstruments = testPaymentInstruments;
window.testAPIFunction = testAPIFunction;
