// Debug script for testing Loconav API integration
import loconavService from './src/services/loconavService.js';

async function testLoconavIntegration() {
  console.log('🚀 Testing Loconav API Integration...');
  console.log('=' .repeat(50));
  
  try {
    console.log('📡 Fetching vehicle data...');
    const vehicleData = await loconavService.getVehicleData();
    console.log('✅ Vehicle Data:', JSON.stringify(vehicleData, null, 2));
    
    console.log('\n📊 Fetching vehicle stats...');
    const stats = await loconavService.getVehicleStats();
    console.log('✅ Vehicle Stats:', JSON.stringify(stats, null, 2));
    
    console.log('\n🔔 Fetching vehicle alerts...');
    const alerts = await loconavService.getVehicleAlerts();
    console.log('✅ Vehicle Alerts:', JSON.stringify(alerts, null, 2));
    
    console.log('\n📍 Testing authentication...');
    const authResult = await loconavService.authenticate();
    console.log('✅ Authentication Result:', authResult);
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Vehicle credentials for reference
console.log('🔑 Vehicle Credentials:');
console.log('Email: Prajapatiraju2078@gmail.com');
console.log('Password: Sona@1234');
console.log('Vehicle: SONA TRAVEL AND TOURS PVT. LTD.(BP01006KHA5524/ MAT476135P5R06268)');
console.log('Device Serial: 0350424062318504');
console.log('API URL: https://loconav-nepal.com/fms/vehicles');
console.log('=' .repeat(50));

// Run the test
testLoconavIntegration();
