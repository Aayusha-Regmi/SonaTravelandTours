import fs from 'fs';

try {
  const content = fs.readFileSync('./src/pages/BookingPassengerDetails/PassengerDetail.jsx', 'utf8');
  console.log('File content loaded successfully');
  console.log('File length:', content.length);
  
  // Check for basic syntax issues
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;
  const openParens = (content.match(/\(/g) || []).length;
  const closeParens = (content.match(/\)/g) || []).length;
  
  console.log('Open braces:', openBraces);
  console.log('Close braces:', closeBraces);
  console.log('Open parens:', openParens);
  console.log('Close parens:', closeParens);
  
  if (openBraces !== closeBraces) {
    console.log('❌ Unmatched braces');
  } else {
    console.log('✅ Braces match');
  }
  
  if (openParens !== closeParens) {
    console.log('❌ Unmatched parentheses');
  } else {
    console.log('✅ Parentheses match');
  }
  
} catch (error) {
  console.error('Error reading file:', error.message);
}
