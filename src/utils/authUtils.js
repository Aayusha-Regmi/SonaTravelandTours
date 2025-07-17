/**
 * Utility functions for authentication validation
 */

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (10 digits)
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

// Detect if input is email or phone number
export const detectInputType = (input) => {
  if (!input) return null;
  
  // Remove any spaces or special characters except @ and .
  const cleanInput = input.trim();
  
  // Check if it's an email
  if (cleanInput.includes('@')) {
    return isValidEmail(cleanInput) ? 'email' : 'invalid';
  }
  
  // Check if it's a phone number
  const phoneOnly = cleanInput.replace(/\D/g, ''); // Remove non-digits
  if (phoneOnly.length === 10) {
    return 'phone';
  }
  
  return 'invalid';
};

// Format phone number for display
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return phone;
};

// Validate login input
export const validateLoginInput = (emailOrPhone, password) => {
  const errors = {};
  
  if (!emailOrPhone || emailOrPhone.trim() === '') {
    errors.emailOrPhone = 'Email or phone number is required';
  } else {
    const inputType = detectInputType(emailOrPhone);
    if (inputType === 'invalid') {
      errors.emailOrPhone = 'Please enter a valid email address or 10-digit phone number';
    }
  }
  
  if (!password || password.trim() === '') {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate signup input
export const validateSignupInput = (name, emailOrPhone, password, confirmPassword) => {
  const errors = {};
  
  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!emailOrPhone || emailOrPhone.trim() === '') {
    errors.emailOrPhone = 'Email or phone number is required';
  } else {
    const inputType = detectInputType(emailOrPhone);
    if (inputType === 'invalid') {
      errors.emailOrPhone = 'Please enter a valid email address or 10-digit phone number';
    }
  }
  
  if (!password || password.trim() === '') {
    errors.password = 'Password is required';
  }
  
  if (!confirmPassword || confirmPassword.trim() === '') {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Format contact for display in OTP page
export const formatContactForDisplay = (contact, isEmail) => {
  if (isEmail) {
    const parts = contact.split('@');
    if (parts.length === 2) {
      const username = parts[0];
      const domain = parts[1];
      const maskedUsername = username.length > 2 
        ? username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1)
        : username;
      return `${maskedUsername}@${domain}`;
    }
  } else {
    // Mask phone number: show first 3 and last 2 digits
    if (contact.length === 10) {
      return contact.replace(/(\d{3})\d{5}(\d{2})/, '$1*****$2');
    }
  }
  return contact;
};

// Real-time validation for individual fields
export const validateField = (fieldName, value, formData = {}) => {
  switch (fieldName) {
    case 'name':
      if (!value || value.trim().length < 2) {
        return 'Name must be at least 2 characters';
      }
      return '';
      
    case 'emailOrPhone':
      if (!value || value.trim() === '') {
        return 'Email or phone number is required';
      }
      const inputType = detectInputType(value);
      if (inputType === 'invalid') {
        return 'Please enter a valid email address or 10-digit phone number';
      }
      return '';
      
    case 'password':
      if (!value || value.trim() === '') {
        return 'Password is required';
      }
      return '';
      
    case 'confirmPassword':
      if (!value || value.trim() === '') {
        return 'Please confirm your password';
      }
      if (formData.password && value !== formData.password) {
        return 'Passwords do not match';
      }
      return '';
      
    default:
      return '';
  }
};