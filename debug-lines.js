import fs from 'fs';

try {
  const content = fs.readFileSync('./src/pages/BookingPassengerDetails/PassengerDetail.jsx', 'utf8');
  const lines = content.split('\n');
  
  for (let i = 770; i < 775; i++) {
    console.log(`Line ${i + 1}: "${lines[i]}"`);
  }
  
} catch (error) {
  console.error('Error reading file:', error.message);
}
