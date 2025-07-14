import fs from 'fs';

try {
  const content = fs.readFileSync('./src/pages/BookingPassengerDetails/PassengerDetail.jsx', 'utf8');
  
  // Split by lines and check each line
  const lines = content.split('\n');
  let openBraces = 0;
  let closeBraces = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const openCount = (line.match(/\{/g) || []).length;
    const closeCount = (line.match(/\}/g) || []).length;
    
    openBraces += openCount;
    closeBraces += closeCount;
    
    if (openCount > 0 || closeCount > 0) {
      console.log(`Line ${i + 1}: "${line.trim()}" - Open: ${openCount}, Close: ${closeCount}, Total: ${openBraces - closeBraces}`);
    }
    
    // If we have too many close braces, stop
    if (closeBraces > openBraces) {
      console.log(`❌ Extra closing brace found at line ${i + 1}`);
      break;
    }
  }
  
  console.log(`\nFinal count - Open: ${openBraces}, Close: ${closeBraces}`);
  
} catch (error) {
  console.error('Error reading file:', error.message);
}
