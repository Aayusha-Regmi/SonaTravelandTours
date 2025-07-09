import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import { API_URLS } from '../../config/api';

const PhoneSignupPage = () => {
  const navigate = useNavigate();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const validatePhoneNumber = (phone) => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's a valid 10-digit phone number
    if (cleaned.length !== 10) {
      return 'Please enter a valid 10-digit phone number';
    }
    
    // Check if it starts with valid digits (not starting with 0 or 1)
    if (cleaned[0] === '0' || cleaned[0] === '1') {
      return 'Phone number cannot start with 0 or 1';
    }
    
    return '';
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    
    // Clear error when user starts typing correctly
    try {
      const error = validatePhoneNumber(value);
      if (!error) {
        setError('');
      }
    } catch (err) {
      console.error('Error in phone validation:', err);
    }
  };
  const handleSendCode = async (e) => {
    e.preventDefault();
    
    console.log('=== SEND OTP DEBUG START ===');
    console.log('Phone number input:', phoneNumber);
    
    // Validate phone number
    const phoneError = validatePhoneNumber(phoneNumber);
    console.log('Validation result:', phoneError);
    
    if (phoneError) {
      setError(phoneError);
      console.log('Validation failed, stopping');
      return;
    }

    setIsLoading(true);
    setError('');

    try {      // Clean phone number (remove any formatting)
      const cleanedPhone = phoneNumber.replace(/\D/g, '');
      
      console.log('Cleaned phone:', cleanedPhone);
      console.log('API URL:', API_URLS.AUTH.SEND_OTP);
      console.log('Request payload:', {
        mobileNumber: cleanedPhone,
        action: 'signup'
      });
        // API call to send OTP
      const response = await fetch(API_URLS.AUTH.SEND_OTP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: cleanedPhone,
          action: 'signup'
        })
      });const result = await response.json();
      console.log('Send OTP Response:', result);
      console.log('Response Status:', response.status);
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok && result.success) {
        // Navigate to OTP verification page
        navigate('/otp-verification', {
          state: {
            contact: cleanedPhone,
            contactType: 'phone',
            action: 'signup'
          }
        });
      } else {
        // Handle API errors
        let errorMessage = 'Failed to send verification code. Please try again.';
        
        if (result.message) {
          errorMessage = result.message;
        }
        
        // Handle specific errors
        if (result.message && result.message.toLowerCase().includes('already exists')) {
          errorMessage = 'This phone is already registered. Please login instead.';
          // Optionally add a link to login
          setError(
            <span>
              {errorMessage}{' '}
              <Link to="/login" className="text-[#0a639d] underline">
                Go to Login
              </Link>
            </span>
          );
          setIsLoading(false);
          return;
        }
        
        setError(errorMessage);
      }    } catch (err) {
      console.error('=== SEND OTP ERROR ===');
      console.error('Error object:', err);
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      console.error('=== END ERROR DEBUG ===');
      
      let errorMessage = 'Network error. Please check your connection and try again.';
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage = 'Unable to connect to server. Please try again later.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      console.log('=== SEND OTP DEBUG END ===');
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign In
    console.log('Google Sign In clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/images/img_logo_with_name_png_1.png" 
                alt="Sona Travel & Tours Logo" 
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create your account</h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Phone Number Form */}
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">+977</span>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter your 10-digit phone number"
                  className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#0a639d] focus:border-[#0a639d] placeholder-gray-400"
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full bg-[#0a639d] hover:bg-[#085283] text-white py-3 rounded-lg font-medium"
              disabled={isLoading || !phoneNumber.trim()}
            >
              {isLoading ? 'Sending Code...' : 'Send Code'}
            </Button>
          </form>

          {/* Google Sign In */}
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
              onClick={handleGoogleSignIn}
              className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
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

export default PhoneSignupPage;
