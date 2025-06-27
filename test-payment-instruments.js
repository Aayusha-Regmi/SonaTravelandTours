// Test the updated payment instruments mapping
console.log('Testing Updated Payment Instruments Mapping');

// Mock API response based on your provided data
const mockAPIResponse = {
  "statusCode": 200,
  "success": true,
  "message": "Successfully Retrieved..",
  "data": {
    "paymentInstruments": [
      {
        "InstitutionName": "Hamro Pay",
        "InstrumentName": "Hamro Pay",
        "InstrumentCode": "HAMROPAYG",
        "InstrumentValue": null,
        "LogoUrl": "https://apisandbox.nepalpayment.com/UploadedImages/PaymentInstitution/LogoUrl-202404091008S85.png",
        "BankUrl": "CheckoutGateway",
        "BankType": "CheckoutGateway"
      },
      {
        "InstitutionName": "Ime Pay",
        "InstrumentName": "Ime Pay",
        "InstrumentCode": "IMEPAYG",
        "InstrumentValue": null,
        "LogoUrl": "https://apisandbox.nepalpayment.com/UploadedImages/PaymentInstitution/LogoUrl-202208031614S35.jpg",
        "BankUrl": "CheckoutGateway",
        "BankType": "CheckoutGateway"
      },
      {
        "InstitutionName": "MyPay",
        "InstrumentName": "MyPay",
        "InstrumentCode": "MYPAYG",
        "InstrumentValue": null,
        "LogoUrl": "https://apisandbox.nepalpayment.com/UploadedImages/PaymentInstitution/LogoUrl-202405071017S3.png",
        "BankUrl": "CheckoutGateway",
        "BankType": "CheckoutGateway"
      }
    ]
  }
};

// Test the mapping function
const testMapping = (rawInstruments) => {
  console.log('Testing instrument mapping...');
  console.log('Raw instruments:', rawInstruments);
  
  const mapped = rawInstruments.map((instrument, index) => ({
    instrumentCode: instrument.InstrumentCode || `UNKNOWN_${index}`,
    name: instrument.InstrumentName || instrument.InstitutionName || 'Unknown Payment Method',
    logoUrl: instrument.LogoUrl && instrument.LogoUrl.trim() !== '' 
      ? instrument.LogoUrl 
      : null,
    bankUrl: instrument.BankUrl,
    bankType: instrument.BankType,
    institutionName: instrument.InstitutionName,
    description: `Pay with ${instrument.InstrumentName || instrument.InstitutionName}`
  }));
  
  console.log('Mapped instruments:', mapped);
  return mapped;
};

// Test with mock data
const testResults = testMapping(mockAPIResponse.data.paymentInstruments);

console.log('Test Results:');
testResults.forEach((instrument, index) => {
  console.log(`${index + 1}. ${instrument.name} (${instrument.instrumentCode})`);
  if (instrument.logoUrl) {
    console.log(`   Logo: ${instrument.logoUrl}`);
  }
  console.log(`   Type: ${instrument.bankType}`);
});

// Test the API function
const testAPIFunction = async () => {
  console.log('\nTesting api.getPaymentInstruments()...');
  
  try {
    const result = await api.getPaymentInstruments();
    console.log('API Result:', result);
    
    if (result.success && result.data) {
      console.log('Payment instruments count:', result.data.length);
      console.log('First few instruments:');
      result.data.slice(0, 5).forEach((instrument, index) => {
        console.log(`${index + 1}. ${instrument.name} (${instrument.instrumentCode})`);
      });
    }
  } catch (error) {
    console.error('API test failed:', error);
  }
};

// Run the test
testAPIFunction();

console.log('Now try opening the payment modal to see if instruments display correctly!');
