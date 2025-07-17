import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import { EyeSlashIcon,EyeIcon } from '@heroicons/react/24/outline';
import { validateField } from '../../utils/authUtils';
import { API_URLS } from '../../config/api';

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contact, contactType, verified } = location.state || {};
  
  // Redirect if not coming from OTP verification
  useEffect(() => {
    if (!contact || !contactType || !verified) {
      navigate('/signup');
    }
  }, [contact, contactType, verified, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '', // Optional email field
    password: '',
    confirmPassword: ''
  });  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  
  // Show/Hide password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Toggle functions for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return ''; // Email is optional
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };
  const validatePassword = (password) => {
    return validateField('password', password, formData);
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    return validateField('confirmPassword', confirmPassword, { ...formData, password });
  };const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Real-time validation for touched fields
    if (touchedFields[name]) {
      let fieldError = '';
      
      switch (name) {
        case 'name':
          fieldError = validateName(value);
          break;
        case 'email':
          fieldError = validateEmail(value);
          break;
        case 'password':
          fieldError = validatePassword(value);
          break;
        case 'confirmPassword':
          fieldError = validateConfirmPassword(value, formData.password);
          break;
        default:
          break;
      }
      
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }

    // Special handling for confirm password when password changes
    if (name === 'password' && touchedFields.confirmPassword && formData.confirmPassword) {
      const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, value);
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmPasswordError
      }));
    }
  };
  const handleInputBlur = (fieldName) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));

    const value = formData[fieldName];
    let fieldError = '';
    
    switch (fieldName) {
      case 'name':
        fieldError = validateName(value);
        break;
      case 'email':
        fieldError = validateEmail(value);
        break;
      case 'password':
        fieldError = validatePassword(value);
        break;
      case 'confirmPassword':
        fieldError = validateConfirmPassword(value, formData.password);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: fieldError
    }));
  };  const isFormReadyToSubmit = () => {
    // Only check required fields: name, password, confirmPassword
    // Email is optional, phone is already verified
    const hasContent = formData.name.trim().length > 0 && 
                      formData.password.length > 0 && 
                      formData.confirmPassword.length > 0;
    
    console.log('Form ready check:', {
      hasContent,
      formData: {
        name: formData.name.trim(),
        email: formData.email.trim() || '(optional)',
        password: '***',
        confirmPassword: '***'
      },
      verifiedPhone: contact
    });
    
    return hasContent;
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields using our local validation
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);

    const validationErrors = {};
    if (nameError) validationErrors.name = nameError;
    if (emailError) validationErrors.email = emailError;
    if (passwordError) validationErrors.password = passwordError;
    if (confirmPasswordError) validationErrors.confirmPassword = confirmPasswordError;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Clear any existing errors
    setErrors({});    try {
      // Split the name into firstName and lastName as expected by backend
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || 'User'; // Default lastName if not provided
      
      const signupData = {
        firstName: firstName,
        lastName: lastName,
        address: "Not specified", // Default address since we don't collect it in UI
        contactNumber: contact, // Use the verified phone number
        email: formData.email.trim() || `user${Date.now()}@temp.com`, // Use provided email or generate temp email
        role: "user", // Always set to user for this site
        password: formData.password
      };

      console.log('Complete signup data:', { ...signupData, password: '[HIDDEN]' });
      
      // API call to register endpoint
      const response = await fetch(API_URLS.AUTH.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(signupData)
      });      const result = await response.json();
      console.log('Signup Response:', result);
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);

      if (response.ok && result.success) {
        // Registration successful
        console.log('Registration successful:', result.message);
        
        // Store authentication token if provided
        if (result.data && result.data.token) {
          localStorage.setItem('authToken', result.data.token);
          localStorage.setItem('loginSuccess', 'true');
          localStorage.setItem('userMessage', result.message);
          
          // Navigate to home page
          navigate('/');
        } else {
          // Navigate to login if no token provided
          navigate('/login', {
            state: {
              message: 'Registration successful! Please login with your credentials.'
            }
          });
        }
      } else {
        // Registration failed
        let errorMessage = 'Registration failed. Please try again.';
        
        if (result.message) {
          errorMessage = result.message;
        }
          // Handle specific errors
        if (result.message && result.message.toLowerCase().includes('email already exists')) {
          setErrors({
            email: 'This email is already registered. Please use a different email or login.'
          });
        } else if (result.message && result.message.toLowerCase().includes('phone already exists')) {
          setErrors({
            general: 'This phone number is already registered. Please login instead.'
          });
        } else if (result.message && result.message.toLowerCase().includes('missing required fields')) {
          // Show detailed error about missing fields
          console.error('Missing required fields error:', result);
          setErrors({
            general: `Missing required fields: ${result.message}. Please check the console for details.`
          });
        } else if (result.error && typeof result.error === 'object') {
          // Handle field-specific errors from API
          setErrors(result.error);
        } else {
          setErrors({
            general: errorMessage
          });
        }
        setIsLoading(false);
      }} catch (err) {
      console.error('Signup error:', err);
      
      let errorMessage = 'Network error. Please check your connection and try again.';
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage = 'Unable to connect to server. Please try again later.';
      }
      
      setErrors({ general: errorMessage });
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google Sign Up
    console.log('Google Sign Up clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/images/img_logo_with_name_png_1.png" 
                alt="Sona Travel & Tours Logo" 
                className="h-10 w-auto"
              />
            </div>
          </div>          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Complete your registration</h2>
            <p className="text-sm text-gray-600 mt-2">
              Phone number verified: {contact}
            </p>
          </div>{/* Error Messages */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errors.general}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <InputField
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur('name')}
                placeholder="Enter your full name"
                className="w-full"
                error={errors.name}
              />
            </div>            <div>
              <InputField
                label="Email Address (Optional)"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur('email')}
                placeholder="Enter your email (optional)"
                className="w-full"
                error={errors.email}
              />
            </div>            <div className="relative">
              <InputField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur('password')}
                placeholder="Create a password"
                className="w-full"
                error={errors.password}
              />
              {/* Show/Hide password toggle button */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>

            <div className="relative">
              <InputField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur('confirmPassword')}
                placeholder="Confirm your password"
                className="w-full"
                error={errors.confirmPassword}
              />
              {/* Show/Hide confirm password toggle button */}
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                 <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full bg-[#0a639d] hover:bg-[#085283] text-white py-3 rounded-lg font-medium"
              disabled={isLoading || !isFormReadyToSubmit()}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Google Sign Up */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignUp}
              className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#0a639d] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 mr-24 items-center justify-center">
        <div className="max-w-2xl">
          <img
            src="/images/login_img.png"
            alt="Travel signup illustration"
            className="w-full h-auto"
            onError={(e) => {
              // Fallback to another travel image if the main one doesn't load
              e.target.src = "/images/login_img.png";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
