import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { formatContactForDisplay } from '../../utils/authUtils';
import { API_URLS } from '../../config/api';

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contact, contactType, action, name } = location.state || {};
  
  // Redirect if no contact info
  useEffect(() => {
    if (!contact || !contactType) {
      navigate('/signup');
    }
  }, [contact, contactType, navigate]);
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const isEmail = contactType === 'email';
  const maskedContact = contact ? formatContactForDisplay(contact, isEmail) : '';

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Verifying OTP:', { contact, contactType, otp: otpString, action });
        // API call to verify OTP
      const response = await fetch(API_URLS.AUTH.VERIFY_OTP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: contact,
          otp: otpString,
          action: action || 'signup'
        })
      });

      const result = await response.json();
      console.log('OTP Verification Response:', result);

      if (response.ok && result.success) {
        // OTP verified successfully
        if (action === 'signup') {
          // Navigate to complete signup page
          navigate('/signup/complete', {
            state: {
              contact,
              contactType,
              verified: true
            }
          });
        } else {
          // For login or other actions, navigate to home
          navigate('/');
        }
      } else {
        // OTP verification failed
        let errorMessage = 'Invalid OTP. Please try again.';
        
        if (result.message) {
          errorMessage = result.message;
        }
        
        setError(errorMessage);
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      
      let errorMessage = 'Network error. Please check your connection and try again.';
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage = 'Unable to connect to server. Please try again later.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };  const handleResendOtp = async () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setError('');
      
      try {
        console.log(`Resending OTP to ${contact} via ${isEmail ? 'email' : 'SMS'}...`);
          // API call to resend OTP
        const response = await fetch(API_URLS.AUTH.RESEND_OTP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            mobileNumber: contact,
            action: action || 'signup'
          })
        });

        const result = await response.json();
        console.log('Resend OTP Response:', result);

        if (!response.ok || !result.success) {
          setError(result.message || 'Failed to resend OTP. Please try again.');
        }
      } catch (err) {
        console.error('Resend OTP error:', err);
        setError('Failed to resend OTP. Please try again.');
      }
    }
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
            <h2 className="text-xl font-semibold text-gray-900">Verify Your Account</h2>
            <p className="text-sm text-gray-600 mt-2">Enter Verification Code</p>
          </div>

          {/* Info Text */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              We have sent you a verification code {isEmail ? 'via email' : 'via SMS'} to
            </p>
            <p className="text-sm font-medium text-gray-900">
              {maskedContact}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* OTP Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            {/* OTP Input */}
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ))}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full bg-[#0a639d] hover:bg-[#085283] text-white py-3 rounded-lg font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Confirm'}
            </Button>
          </form>

          {/* Resend Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              {canResend ? (
                <button
                  onClick={handleResendOtp}
                  className="text-[#0a639d] hover:underline font-medium"
                >
                  Resend
                </button>
              ) : (
                <span className="text-gray-400">
                  Resend in {timer}s
                </span>
              )}
            </p>
          </div>

          {/* Google Sign In Alternative */}
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
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#0a639d] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 mr-24 items-center justify-center ">
        <div className="max-w-2xl">
          <img
            src="/images/login_img.png"
            alt="Travel illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
