import fs from 'fs';

try {
  const content = fs.readFileSync('./src/pages/BookingPassengerDetails/PassengerDetail.jsx', 'utf8');
  const lines = content.split('\n');
  
  let openBraces = 0;
  let closeBraces = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const openCount = (line.match(/\{/g) || []).length;
    const closeCount = (line.match(/\}/g) || []).length;
    
    openBraces += openCount;
    closeBraces += closeCount;
    
    // Check for the problematic line
    if (closeBraces > openBraces) {
      console.log(`❌ Extra closing brace found at line ${i + 1}: "${line}"`);
      
      // Show surrounding context
      console.log('Context:');
      for (let j = Math.max(0, i - 3); j <= Math.min(lines.length - 1, i + 3); j++) {
        const marker = j === i ? '>>> ' : '    ';
        console.log(`${marker}Line ${j + 1}: "${lines[j]}"`);
      }
      break;
    }
  }
  
} catch (error) {
  console.error('Error reading file:', error.message);
}
