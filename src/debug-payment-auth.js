// Payment Authentication Debug Script
// Run this in the browser console to debug payment authentication issues

console.log('🔍 Starting Payment Authentication Debug');

// Check current authentication state
console.log('=== AUTHENTICATION STATE ===');
const authState = window.debugAuth();

// Check if we have the expected tokens
console.log('=== TOKEN VERIFICATION ===');
if (!authState.isAuthenticated) {
  console.log('❌ User is not authenticated');
  console.log('💡 Need to login first before testing payment');
  console.log('🔗 Go to login page and sign in');
} else {
  console.log('✅ User is authenticated');
  console.log('🎯 Testing payment API calls...');
  
  // Test payment initiation API directly
  console.log('=== PAYMENT API TEST ===');
  
  async function testPaymentAPI() {
    try {
      const response = await fetch('https://api.sonatravelandtours.com/payment/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authState.token}`
        },
        body: JSON.stringify({ amount: 1000 })
      });
      
      console.log('📊 Payment API Response Status:', response.status);
      console.log('📊 Payment API Response Headers:', Object.fromEntries(response.headers.entries()));
      
      const text = await response.text();
      console.log('📥 Payment API Raw Response:', text);
      
      try {
        const data = JSON.parse(text);
        console.log('📥 Payment API Parsed Response:', data);
        
        if (response.status === 401) {
          console.log('❌ 401 Unauthorized - Token may be invalid or expired');
          console.log('🔄 Try logging out and logging back in');
        } else if (response.ok) {
          console.log('✅ Payment API call successful');
        } else {
          console.log('⚠️ Payment API call failed with status:', response.status);
        }
      } catch (e) {
        console.log('⚠️ Response is not valid JSON');
      }
    } catch (error) {
      console.error('❌ Payment API test failed:', error);
    }
  }
  
  testPaymentAPI();
}

// Add helper function to check authentication status
window.testPaymentAuth = () => {
  console.log('🔍 Payment Authentication Test');
  const auth = window.checkAuth();
  console.log('Authentication Status:', auth);
  
  if (!auth.isAuthenticated) {
    console.log('❌ Please login first');
    return false;
  }
  
  // Test if we can make payment API calls
  console.log('🧪 Testing payment API with current token...');
  return testPaymentAPI();
};

console.log('🎯 Debug script loaded. Available functions:');
console.log('- window.debugAuth() - Check authentication state');
console.log('- window.checkAuth() - Check authentication status');
console.log('- window.testPaymentAuth() - Test payment API authentication');
console.log('- window.migrateTokens() - Migrate auth tokens');
