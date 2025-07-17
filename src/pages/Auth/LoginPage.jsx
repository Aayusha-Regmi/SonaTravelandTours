import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import FloatingActionBar from '../../components/common/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';
import { validateLoginInput, validateField, detectInputType } from '../../utils/authUtils';
import { getAndClearReturnPath, getAndClearSearchData, getAndClearPageState } from '../../utils/authGuard';
import { useUserActionRestoration } from '../../utils/userActionRestorer';
import { API_URLS } from '../../config/api';
import { logSessionStatus } from '../../utils/sessionDebug';
import { setAuthToken, clearAuthToken } from '../../utils/authToken';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSocialClick } = useSocialActions();
  const { restoreUserActions } = useUserActionRestoration();
  
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  //Show/Hide password functions
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [roleMessage, setRoleMessage] = useState(''); // Add role message state
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state
  const [sessionMessage, setSessionMessage] = useState(''); // Add session expiry message state
  const [restorationMessage, setRestorationMessage] = useState(''); // Add restoration message state

  // Check for messages from navigation state
  useEffect(() => {
    // Log session status when login page loads
    logSessionStatus('LoginPage Load');
    
    // Check for restoration data from HTTP interceptor
    const checkRestorationData = () => {
      try {
        const authRedirectData = localStorage.getItem('authRedirectData');
        if (authRedirectData) {
          const restorationPayload = JSON.parse(authRedirectData);
          console.log('📋 Found restoration data:', restorationPayload);
          
          // Set restoration message
          if (restorationPayload.reason) {
            setRestorationMessage(restorationPayload.reason);
          }
          
          // Set session expiry message if it was due to session expiry
          if (restorationPayload.reason.includes('session') || restorationPayload.reason.includes('expired')) {
            setSessionMessage('Your session expired. Please log in to continue where you left off.');
          }
        }
      } catch (error) {
        console.error('Error parsing restoration data:', error);
      }
    };
    
    checkRestorationData();
    
    if (location.state) {
      console.log('LoginPage: Navigation state received:', location.state);
      
      // Handle regular success messages
      if (location.state.message) {
        setSuccessMessage(location.state.message);
      }
      
      // Handle session expiry messages specifically
      if (location.state.sessionExpired || 
          (location.state.message && location.state.message.toLowerCase().includes('session'))) {
        setSessionMessage(location.state.message || 'Your session has expired. Please login again.');
        setSuccessMessage(''); // Clear success message if it's a session expiry
        console.log('LoginPage: Session expiry message set:', location.state.message);
      }
      
      // Handle redirect messages from payment or other protected pages
      if (location.state.redirectMessage) {
        setSessionMessage(location.state.redirectMessage);
        console.log('LoginPage: Redirect message set:', location.state.redirectMessage);
      }
    } else {
      console.log('LoginPage: No navigation state received');
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }    // Clear role message when user starts typing
    if (roleMessage) {
      setRoleMessage('');
    }
    
    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage('');
    }
    
    // Clear session message when user starts typing
    if (sessionMessage) {
      setSessionMessage('');
    }

    // Real-time validation for touched fields
    if (touchedFields[name]) {
      const fieldError = validateField(name, value, formData);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };
  const handleInputBlur = (fieldName) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));

    const value = formData[fieldName];
    const fieldError = validateField(fieldName, value, formData);
    setErrors(prev => ({
      ...prev,
      [fieldName]: fieldError
    }));
  };  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Clear any existing session messages when user attempts login
    setSessionMessage('');
    setSuccessMessage('');
    
    // Log session status before login attempt
    logSessionStatus('Before Login Attempt');

    // Validate all fields
    const validation = validateLoginInput(formData.emailOrPhone, formData.password);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }    // Clear any existing errors and role messages
    setErrors({});
    setRoleMessage('');    try {
      const inputType = detectInputType(formData.emailOrPhone);
      
      console.log('=== INPUT DETECTION DEBUG ===');
      console.log('Original input:', formData.emailOrPhone);
      console.log('Input type detected:', inputType);
      console.log('Is email?', inputType === 'email');
      console.log('Cleaned phone digits:', formData.emailOrPhone.replace(/\D/g, ''));
      
      const emailValue = inputType === 'email' 
        ? formData.emailOrPhone  // Keep email as string
        : parseInt(formData.emailOrPhone.replace(/\D/g, ''), 10);  // Convert phone to integer
      
      console.log('Email field value:', emailValue);
      console.log('Email field type:', typeof emailValue);
      console.log('==============================');

      const loginData = {
        password: formData.password,
        email: emailValue
      };console.log('=== LOGIN DEBUG INFO ===');
      console.log('Environment Variables:');
      console.log('  VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
      console.log('  VITE_AUTH_LOGIN_ENDPOINT:', import.meta.env.VITE_AUTH_LOGIN_ENDPOINT);
      console.log('API URL:', API_URLS.AUTH.LOGIN);
      console.log('Login Data:', { ...loginData, password: '[HIDDEN]' });
      console.log('========================');      // API call to login endpoint
      console.log('Making request to:', API_URLS.AUTH.LOGIN);
      
      //sending login request to the server
      const response = await fetch(API_URLS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(loginData)
      });      console.log('Response Status:', response.status);
      console.log('Response OK:', response.ok);
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

      let result;
      try {
        result = await response.json();
        console.log('=== API RESPONSE DEBUG ===');
        console.log('Response Body:', result);
        console.log('Success:', result.success);
        console.log('Status Code:', result.statusCode);
        console.log('Message:', result.message);
        console.log('Data:', result.data);
        console.log('========================');
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        setErrors({ 
          general: 'Server returned invalid response. Please try again later.' 
        });
        setIsLoading(false);
        return;
      }if (response.ok) {
        // Check if we have a successful response based on your API structure
        if (result.success && result.statusCode === 200) {
          // Login successful
          console.log('Login successful:', result.message);
          
          // Store authentication token using enhanced token management
          if (result.data && result.data.token) {
            // Clear any existing tokens first
            clearAuthToken();
            
            // Set the new token with proper expiry
            setAuthToken(result.data.token);
            console.log('Token stored successfully with expiry');
            
            // Decode JWT token to check user role
            try {
              const token = result.data.token;
              const payload = JSON.parse(atob(token.split('.')[1]));
              console.log('Token payload:', payload);
              
              const userRole = payload.role || payload.user_type || 'user';
              console.log('User role:', userRole);
                // Check role-based access
              if (userRole === 'user' || userRole === 'customer') {
                // Allow user/customer to proceed
                localStorage.setItem('loginSuccess', 'true');
                localStorage.setItem('userMessage', result.message);
                localStorage.setItem('userRole', userRole);
                
                // Handle return path and search data after successful login
                const returnPath = getAndClearReturnPath();
                const searchData = getAndClearSearchData();
                const pageState = getAndClearPageState();
                
                console.log('Post-login navigation - Return path:', returnPath);
                console.log('Post-login navigation - Search data:', searchData);
                console.log('Post-login navigation - Page state:', pageState);
                
                setIsLoading(false);
                
                // First priority: Try to restore user actions
                try {
                  console.log('🔄 Attempting user action restoration...');
                  const restorationSuccess = await restoreUserActions();
                  
                  if (restorationSuccess) {
                    console.log('✅ User actions restored successfully');
                    // Clear the restoration data after successful restoration
                    localStorage.removeItem('authRedirectData');
                    return; // Exit early if restoration was successful
                  }
                } catch (restorationError) {
                  console.error('❌ User action restoration failed:', restorationError);
                  // Continue with legacy restoration methods
                }
                
                // Fallback to legacy restoration methods
                console.log('🔄 Falling back to legacy restoration methods...');
                
                // Priority 2: If user was on a specific page (not home), return them there with all state
                if (returnPath && returnPath !== '/' && returnPath !== '/login') {
                  console.log('Redirecting to return path:', returnPath);
                  
                  // Special handling for search results page
                  if (returnPath.includes('/search-results')) {
                    // User was on search results page, restore their search state
                    navigate(returnPath, {
                      state: {
                        searchResults: pageState?.searchResults || [], 
                        searchParams: searchData || pageState?.searchParams || {},
                        fromLogin: true,
                        preserveSearch: true // Flag to indicate we should preserve search state
                      }
                    });
                  } else {
                    // User was on any other protected page, restore with all state
                    navigate(returnPath, {
                      state: {
                        fromLogin: true,
                        ...pageState, // Restore any page state
                        ...(searchData && { searchParams: searchData, restoreSearch: true })
                      }
                    });
                  }
                } else if (searchData && (returnPath === '/' || !returnPath)) {
                  // Priority 3: If user was on home page with search data, or has search data but no return path
                  // This means user was in middle of searching on home page
                  console.log('Redirecting to home with search data:', searchData);
                  navigate('/', {
                    state: {
                      fromLogin: true,
                      searchParams: searchData,
                      restoreSearch: true // Flag to restore search form
                    }
                  });
                } else {
                  // Priority 4: Normal login or return to home page without search data
                  console.log('Normal login, redirecting to home');
                  navigate('/', {
                    state: {
                      fromLogin: true
                    }
                  });
                }
              } else if (userRole === 'admin') {
                // Admin role - show message and redirect link
                setRoleMessage('You have admin privileges. Please use the admin portal to access your dashboard.');
                localStorage.removeItem('authToken'); // Don't store token for wrong portal
                setIsLoading(false);
              } else if (userRole === 'counter') {
                // Counter role - show message and redirect link
                setRoleMessage('You have counter privileges. Please use the counter portal to access your dashboard.');
                localStorage.removeItem('authToken'); // Don't store token for wrong portal
                setIsLoading(false);
              } else {
                // Unknown role
                setErrors({ 
                  general: 'Your account role is not recognized. Please contact support.' 
                });
                localStorage.removeItem('authToken');
                setIsLoading(false);
              }
            } catch (tokenError) {
              console.error('Error decoding token:', tokenError);
              setErrors({ 
                general: 'Authentication token is invalid. Please try logging in again.' 
              });
              localStorage.removeItem('authToken');
              setIsLoading(false);
            }
          } else {
            setErrors({ 
              general: 'Login response missing authentication token.' 
            });
            setIsLoading(false);
          }
        } else {
          // API returned 200 but success is false
          console.log('Login failed:', result.message);
          setErrors({ 
            general: result.message || 'Login failed. Please check your credentials.' 
          });
          setIsLoading(false);
        }
      } else {
        // Login failed - show API error
        console.log('Login failed with status:', response.status);
        
        let errorMessage = 'Login failed. Please check your credentials.';
        
        if (result.message) {
          errorMessage = result.message;
        } else if (result.error) {
          errorMessage = result.error;
        }
        
        // Handle specific status codes
        switch (response.status) {
          case 401:
            errorMessage = 'Invalid email/phone or password. Please try again.';
            break;
          case 404:
            errorMessage = 'User not found. Please check your credentials or sign up.';
            break;
          case 422:
            errorMessage = 'Invalid input. Please check your email/phone format.';
            break;
          default:
            errorMessage = result.message || `Login failed (${response.status})`;
        }
        
        setErrors({ general: errorMessage });
        setIsLoading(false);
      }    } catch (err) {
      console.error('Login error details:', err);
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      
      let errorMessage = 'Network error. Please check your connection and try again.';
      
      // Handle different types of network errors
      if (err.name === 'TypeError') {
        if (err.message.includes('fetch')) {
          errorMessage = 'CORS or Network error: Unable to connect to server. This usually means the API is not configured to accept requests from this domain.';
        } else if (err.message.includes('NetworkError')) {
          errorMessage = 'Network connection failed. Please check your internet and try again.';
        } else if (err.message.includes('CORS')) {
          errorMessage = 'CORS error: Server is not allowing requests from this domain.';
        }
      } else if (err.name === 'AbortError') {
        errorMessage = 'Request timeout. Please try again.';
      } else if (err.message.includes('SSL') || err.message.includes('certificate')) {
        errorMessage = 'Secure connection failed. Please try again.';
      }
      
      setErrors({ general: errorMessage });
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
          </div>          {/* Success Messages */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {successMessage}
            </div>
          )}

          {/* Restoration Message */}
          {restorationMessage && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-blue-800 text-sm font-medium">
                    {restorationMessage}
                  </div>
                  <div className="text-blue-700 text-xs mt-1">
                    Your progress will be restored after login
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Session Expiry Messages */}
          {sessionMessage && (
            <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-orange-800 text-sm font-medium">
                    {sessionMessage}
                  </div>
                  <div className="text-orange-700 text-xs mt-1">
                    Please enter your credentials to continue
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Messages */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errors.general}
            </div>
          )}

          {/* Role-based Messages */}
          {roleMessage && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-blue-800 text-sm font-medium mb-2">
                {roleMessage}
              </div>
              {roleMessage.includes('admin') && (
                <div className="text-blue-600 text-sm">
                  <a 
                    href="/admin" 
                    className="underline hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to Admin Portal →
                  </a>
                </div>
              )}
              {roleMessage.includes('counter') && (
                <div className="text-blue-600 text-sm">
                  <a 
                    href="/counter" 
                    className="underline hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to Counter Portal →
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">            <div>
              <InputField
                label="Email address or phone number"
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur('emailOrPhone')}
                placeholder="Enter your email or 10-digit phone number"
                className="w-full"
                error={errors.emailOrPhone}
              />
            </div>            <div className="relative">
              <InputField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur('password')}
                placeholder="Enter your password"
                className="w-full"
                error={errors.password}
              />
              {/* Show/Hide password toggle button */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-5 top-9 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
              >
                {showPassword ? (
                   <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
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
      <FloatingActionBar
        isVisible={isVisible}
        socialActions={socialActions}
      />
    </div>
  );
};

export default LoginPage;
