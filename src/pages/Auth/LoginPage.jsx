import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import { validateLoginInput, validateField, detectInputType } from '../../utils/authUtils';

const LoginPage = () => {
  const navigate = useNavigate();  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const handleInputChange = (e) => {
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
      const fieldError = validateField(name === 'email' ? 'emailOrPhone' : name, value, formData);
      setErrors(prev => ({
        ...prev,
        [name === 'email' ? 'emailOrPhone' : name]: fieldError
      }));
    }
  };

  const handleInputBlur = (fieldName) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));

    const value = fieldName === 'email' ? formData.emailOrPhone : formData[fieldName];
    const fieldError = validateField(fieldName === 'email' ? 'emailOrPhone' : fieldName, value, formData);
    setErrors(prev => ({
      ...prev,
      [fieldName === 'email' ? 'emailOrPhone' : fieldName]: fieldError
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields
    const validation = validateLoginInput(formData.emailOrPhone, formData.password);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    // Clear any existing errors
    setErrors({});

    try {
      const inputType = detectInputType(formData.emailOrPhone);
      const loginData = {
        password: formData.password,
        ...(inputType === 'email' 
          ? { email: formData.emailOrPhone }
          : { phone: formData.emailOrPhone }
        )
      };

      console.log('Login data:', loginData);
      
      // TODO: Implement actual login logic with API call
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1000);
    } catch (err) {
      setErrors({ general: 'Login failed. Please try again.' });
      setIsLoading(false);
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
            <h2 className="text-xl font-semibold text-gray-900">Sign in to your account</h2>
          </div>

          {/* Error Messages */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errors.general}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <InputField
                label="Email address or phone number"
                type="text"
                name="email"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur('email')}
                placeholder="Enter your email or 10-digit phone number"
                className="w-full"
                error={errors.emailOrPhone}
              />
            </div>

            <div>
              <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur('password')}
                placeholder="Enter your password"
                className="w-full"
                error={errors.password}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full bg-[#0a639d] hover:bg-[#085283] text-white py-3 rounded-lg font-medium"
              disabled={isLoading || Object.keys(errors).some(key => errors[key] && key !== 'general')}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
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

export default LoginPage;
