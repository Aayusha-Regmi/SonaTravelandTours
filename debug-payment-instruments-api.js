// Payment Instruments API Debug
// Run this to see exactly what the API returns

const debugPaymentInstrumentsAPI = async () => {
  console.log('🔍 Debugging Payment Instruments API...');
  
  // Check authentication first
  const authCheck = window.checkAuth();
  console.log('1. Authentication status:', authCheck);
  
  if (!authCheck.isAuthenticated) {
    console.log('❌ Not authenticated. Please login first.');
    return;
  }
  
  try {
    console.log('2. Making API request...');
    const url = 'https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/dev/payment/get-all-payment-instruments';
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authCheck.token}`
      }
    });
    
    console.log('3. Response details:');
    console.log('   Status:', response.status, response.statusText);
    console.log('   Headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('4. Raw response text:', responseText);
    
    if (responseText) {
      try {
        const data = JSON.parse(responseText);
        console.log('5. Parsed JSON:', data);
        
        // Analyze the structure
        console.log('6. Data analysis:');
        console.log('   Type:', typeof data);
        console.log('   Is Array:', Array.isArray(data));
        
        if (data.success !== undefined) {
          console.log('   Has success field:', data.success);
        }
        
        if (data.data) {
          console.log('   Has data field:', typeof data.data);
          console.log('   Data is array:', Array.isArray(data.data));
          if (Array.isArray(data.data)) {
            console.log('   Data length:', data.data.length);
            console.log('   First item:', data.data[0]);
          }
        }
        
        if (Array.isArray(data)) {
          console.log('   Root is array, length:', data.length);
          console.log('   First item:', data[0]);
        }
        
      } catch (parseError) {
        console.log('5. JSON Parse Error:', parseError.message);
      }
    } else {
      console.log('5. Empty response');
    }
    
  } catch (error) {
    console.error('❌ API Request failed:', error);
  }
};

// Make function globally available
window.debugPaymentInstrumentsAPI = debugPaymentInstrumentsAPI;

// Run immediately
debugPaymentInstrumentsAPI();

console.log('💡 Function available as: window.debugPaymentInstrumentsAPI()');
