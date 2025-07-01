import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/ui/Button';
import { toast } from 'react-toastify';
import { isValidEmail, isValidPhoneNumber, validateField } from '../../../utils/authUtils';
import { API_URLS } from '../../../config/api';
import { getAuthToken, getAuthHeaders, isAuthenticated } from '../../../utils/authToken';

// API service for profile operations
const profileApiService = {
  async fetchProfile() {
    try {
      if (!isAuthenticated()) {
        throw new Error('No authentication token found. Please log in to continue.');
      }
      
      const response = await fetch(API_URLS.PROFILE.GET, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message || 'Failed to fetch profile');
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  },

  async updateProfile(profileData) {
    try {
      if (!isAuthenticated()) {
        throw new Error('No authentication token found. Please log in to continue.');
      }
      
      const response = await fetch(API_URLS.PROFILE.UPDATE, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message || 'Failed to update profile');
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  async updatePassword(passwordData) {
    try {
      if (!isAuthenticated()) {
        throw new Error('No authentication token found. Please log in to continue.');
      }
      
      const response = await fetch(API_URLS.PROFILE.UPDATE_PASSWORD, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          newPassword: passwordData.newPassword,
          currentPassword: passwordData.currentPassword
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.message || 'Failed to update password');
    } catch (error) {
      console.error('Password update error:', error);
      throw error;
    }
  },

  async checkEmailExists(email) {
    try {
      const response = await fetch(API_URLS.PROFILE.CHECK_EMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.exists || false;
    } catch (error) {
      console.error('Email check error:', error);
      // If API fails, assume email doesn't exist to avoid blocking user
      return false;
    }
  }
};

const MyAccount = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const profileData = await profileApiService.fetchProfile();
      setProfile(profileData);
      setProfileForm({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        email: profileData.email || '',
        address: profileData.address || '',
        contactNumber: profileData.contactNumber || ''
      });
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // Validation functions
  const validateProfileField = (fieldName, value) => {
    switch (fieldName) {
      case 'firstName':
        if (!value || value.trim().length < 2) {
          return 'First name must be at least 2 characters';
        }
        return '';
      case 'lastName':
        if (!value || value.trim().length < 2) {
          return 'Last name must be at least 2 characters';
        }
        return '';
      case 'email':
        if (!value || value.trim() === '') {
          return 'Email is required';
        }
        if (!isValidEmail(value)) {
          return 'Please enter a valid email address';
        }
        // Skip uniqueness check if email hasn't changed
        if (value === profile?.email) {
          return '';
        }
        return '';
      case 'contactNumber':
        if (!value || value.trim() === '') {
          return 'Phone number is required';
        }
        const phoneOnly = value.replace(/\D/g, '');
        if (!isValidPhoneNumber(phoneOnly)) {
          return 'Please enter a valid 10-digit phone number';
        }
        return '';
      case 'address':
        if (!value || value.trim().length < 5) {
          return 'Address must be at least 5 characters';
        }
        return '';
      default:
        return '';
    }
  };

  const validatePasswordField = (fieldName, value) => {
    switch (fieldName) {
      case 'currentPassword':
        if (!value || value.trim() === '') {
          return 'Current password is required';
        }
        return '';
      case 'newPassword':
        return validateField('password', value);
      case 'confirmPassword':
        if (!value || value.trim() === '') {
          return 'Please confirm your password';
        }
        if (passwordForm.newPassword && value !== passwordForm.newPassword) {
          return 'Passwords do not match';
        }
        return '';
      default:
        return '';
    }
  };

  const validateAllProfileFields = () => {
    const errors = {};
    Object.keys(profileForm).forEach(field => {
      const error = validateProfileField(field, profileForm[field]);
      if (error) errors[field] = error;
    });
    return errors;
  };

  const validateAllPasswordFields = () => {
    const errors = {};
    Object.keys(passwordForm).forEach(field => {
      const error = validatePasswordField(field, passwordForm[field]);
      if (error) errors[field] = error;
    });
    return errors;
  };

  const handleProfileEdit = async () => {
    if (isEditingProfile) {
      // Validate all fields before saving
      const errors = validateAllProfileFields();
      if (Object.keys(errors).length > 0) {
        setProfileErrors(errors);
        toast.error('Please fix the validation errors before saving');
        return;
      }

      // Check email uniqueness if email has changed
      if (profileForm.email !== profile?.email) {
        try {
          setLoading(true);
          const emailExists = await profileApiService.checkEmailExists(profileForm.email);
          if (emailExists) {
            setProfileErrors({ email: 'This email is already registered with another account' });
            toast.error('Email already exists. Please use a different email.');
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Email uniqueness check failed:', err);
          // Continue with profile update if check fails
        }
      }

      // Save profile changes
      try {
        setLoading(true);
        await profileApiService.updateProfile(profileForm);
        
        // Update local profile state
        setProfile(prev => ({
          ...prev,
          ...profileForm
        }));
        
        toast.success('Profile updated successfully!');
        setIsEditingProfile(false);
        setProfileErrors({});
        setTouchedFields({});
      } catch (err) {
        toast.error('Failed to update profile: ' + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setIsEditingProfile(true);
    }
  };

  const handleSecurityEdit = async () => {
    if (isEditingSecurity) {
      // Validate all password fields
      const errors = validateAllPasswordFields();
      if (Object.keys(errors).length > 0) {
        setPasswordErrors(errors);
        toast.error('Please fix the validation errors before saving');
        return;
      }
      
      try {
        setLoading(true);
        await profileApiService.updatePassword({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        });
        
        toast.success('Password updated successfully!');
        setIsEditingSecurity(false);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordErrors({});
        setTouchedFields({});
      } catch (err) {
        toast.error('Failed to update password: ' + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setIsEditingSecurity(true);
    }
  };

  const handleProfileCancel = () => {
    // Reset form data to original profile data
    setProfileForm({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      email: profile.email || '',
      address: profile.address || '',
      contactNumber: profile.contactNumber || ''
    });
    setProfileErrors({});
    setTouchedFields({});
    setIsEditingProfile(false);
  };

  const handlePasswordCancel = () => {
    // Reset password form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors({});
    setTouchedFields({});
    setIsEditingSecurity(false);
  };

  const handleInputChange = (field, value) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (profileErrors[field]) {
      setProfileErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Real-time validation for touched fields
    if (touchedFields[field]) {
      const fieldError = validateProfileField(field, value);
      setProfileErrors(prev => ({
        ...prev,
        [field]: fieldError
      }));
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Real-time validation for touched fields
    if (touchedFields[field]) {
      const fieldError = validatePasswordField(field, value);
      setPasswordErrors(prev => ({
        ...prev,
        [field]: fieldError
      }));
    }

    // Special case for confirm password - validate when new password changes
    if (field === 'newPassword' && touchedFields.confirmPassword) {
      const confirmError = validatePasswordField('confirmPassword', passwordForm.confirmPassword);
      setPasswordErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }
  };

  const handleFieldBlur = (fieldName, isPassword = false) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));

    if (isPassword) {
      const value = passwordForm[fieldName];
      const fieldError = validatePasswordField(fieldName, value);
      setPasswordErrors(prev => ({
        ...prev,
        [fieldName]: fieldError
      }));
    } else {
      const value = profileForm[fieldName];
      const fieldError = validateProfileField(fieldName, value);
      setProfileErrors(prev => ({
        ...prev,
        [fieldName]: fieldError
      }));
    }
  };

  if (loading && !profile) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="bg-white rounded-lg border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-5">
              <div className="h-6 bg-gray-200 rounded w-48"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    // Don't show error, just show loading state
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-100 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }  return (
    <div className="space-y-6">
      {/* Account Information Section */}
      <div className="bg-white rounded-lg border border-gray-100 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <h2 className="text-lg font-semibold text-gray-900 font-opensans">
            Account Information
          </h2>
          <div className="flex gap-2">
            {isEditingProfile && (
              <Button
                variant="outline"
                onClick={handleProfileCancel}
                disabled={loading}
                className="text-sm h-8 px-4"
              >
                Cancel
              </Button>
            )}
            <Button
              variant={isEditingProfile ? "primary" : "outline"}
              onClick={handleProfileEdit}
              disabled={loading}
              className="text-sm h-8 px-4"
            >
              {loading ? 'Saving...' : (isEditingProfile ? 'Save Changes' : 'Edit Profile')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-gray-700 font-opensans">
              First Name
            </label>
            <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
              !isEditingProfile 
                ? 'border-transparent bg-gray-50' 
                : profileErrors.firstName
                ? 'border-red-300 hover:border-red-400 focus-within:border-red-500 focus-within:bg-white focus-within:shadow-sm'
                : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
            }`}>
              <input
                type="text"
                value={profileForm.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                onBlur={() => handleFieldBlur('firstName')}
                disabled={!isEditingProfile}
                placeholder="Enter your first name"
                className={`flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans ${
                  !isEditingProfile ? 'text-gray-600 cursor-not-allowed' : 'text-gray-900 cursor-text'
                }`}
              />
            </div>
            {profileErrors.firstName && (
              <p className="text-xs text-red-500 font-opensans">{profileErrors.firstName}</p>
            )}
          </div>
          
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-gray-700 font-opensans">
              Last Name
            </label>
            <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
              !isEditingProfile 
                ? 'border-transparent bg-gray-50' 
                : profileErrors.lastName
                ? 'border-red-300 hover:border-red-400 focus-within:border-red-500 focus-within:bg-white focus-within:shadow-sm'
                : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
            }`}>
              <input
                type="text"
                value={profileForm.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                onBlur={() => handleFieldBlur('lastName')}
                disabled={!isEditingProfile}
                placeholder="Enter your last name"
                className={`flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans ${
                  !isEditingProfile ? 'text-gray-600 cursor-not-allowed' : 'text-gray-900 cursor-text'
                }`}
              />
            </div>
            {profileErrors.lastName && (
              <p className="text-xs text-red-500 font-opensans">{profileErrors.lastName}</p>
            )}
          </div>

          {/* Phone Number Field - Hidden when editing */}
          {!isEditingProfile && (
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-gray-700 font-opensans">
                Phone Number
              </label>
              <div className="bg-gray-50 rounded-lg h-10 flex items-center px-3 border border-transparent">
                <input
                  type="text"
                  value={profileForm.contactNumber || ''}
                  disabled={true}
                  placeholder="Phone number"
                  className="flex-1 bg-transparent text-sm font-medium text-gray-600 cursor-not-allowed focus:outline-none font-opensans"
                />
              </div>
              <p className="text-xs text-gray-500 font-opensans">Phone number cannot be edited for security reasons</p>
            </div>
          )}

          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-gray-700 font-opensans">
              Email Address
            </label>
            <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
              !isEditingProfile 
                ? 'border-transparent bg-gray-50' 
                : profileErrors.email
                ? 'border-red-300 hover:border-red-400 focus-within:border-red-500 focus-within:bg-white focus-within:shadow-sm'
                : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
            }`}>
              <input
                type="email"
                value={profileForm.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                disabled={!isEditingProfile}
                placeholder="Enter your email address"
                className={`flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans ${
                  !isEditingProfile ? 'text-gray-600 cursor-not-allowed' : 'text-gray-900 cursor-text'
                }`}
              />
            </div>
            {profileErrors.email && (
              <p className="text-xs text-red-500 font-opensans">{profileErrors.email}</p>
            )}
          </div>

          <div className="flex flex-col space-y-1.5 lg:col-span-2">
            <label className="text-sm font-medium text-gray-700 font-opensans">
              Address
            </label>
            <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
              !isEditingProfile 
                ? 'border-transparent bg-gray-50' 
                : profileErrors.address
                ? 'border-red-300 hover:border-red-400 focus-within:border-red-500 focus-within:bg-white focus-within:shadow-sm'
                : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
            }`}>
              <input
                type="text"
                value={profileForm.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                onBlur={() => handleFieldBlur('address')}
                disabled={!isEditingProfile}
                placeholder="Enter your address"
                className={`flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans ${
                  !isEditingProfile ? 'text-gray-600 cursor-not-allowed' : 'text-gray-900 cursor-text'
                }`}
              />
            </div>
            {profileErrors.address && (
              <p className="text-xs text-red-500 font-opensans">{profileErrors.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg border border-gray-100 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <h2 className="text-lg font-semibold text-gray-900 font-opensans">
            Security & Privacy
          </h2>
          <div className="flex gap-2">
            {isEditingSecurity && (
              <Button
                variant="outline"
                onClick={handlePasswordCancel}
                disabled={loading}
                className="text-sm h-8 px-4"
              >
                Cancel
              </Button>
            )}
            <Button
              variant={isEditingSecurity ? "primary" : "outline"}
              onClick={handleSecurityEdit}
              disabled={loading}
              className="text-sm h-8 px-4"
            >
              {loading ? 'Saving...' : (isEditingSecurity ? 'Save Password' : 'Change Password')}
            </Button>
          </div>
        </div>

        {isEditingSecurity ? (
          <div className="grid grid-cols-1 gap-4 max-w-md">
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-gray-700 font-opensans">
                Current Password
              </label>
              <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
                passwordErrors.currentPassword
                  ? 'border-red-300 hover:border-red-400 focus-within:border-red-500 focus-within:bg-white focus-within:shadow-sm'
                  : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
              }`}>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  onBlur={() => handleFieldBlur('currentPassword', true)}
                  placeholder="Enter current password"
                  className="flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showCurrentPassword ? (
                    <EyeSlashIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-xs text-red-500 font-opensans">{passwordErrors.currentPassword}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-gray-700 font-opensans">
                New Password
              </label>
              <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
                passwordErrors.newPassword
                  ? 'border-red-300 hover:border-red-400 focus-within:border-red-500 focus-within:bg-white focus-within:shadow-sm'
                  : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
              }`}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  onBlur={() => handleFieldBlur('newPassword', true)}
                  placeholder="Enter new password"
                  className="flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showNewPassword ? (
                    <EyeSlashIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="text-xs text-red-500 font-opensans">{passwordErrors.newPassword}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-gray-700 font-opensans">
                Confirm New Password
              </label>
              <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
                passwordErrors.confirmPassword
                  ? 'border-red-300 hover:border-red-400 focus-within:border-red-500 focus-within:bg-white focus-within:shadow-sm'
                  : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
              }`}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  onBlur={() => handleFieldBlur('confirmPassword', true)}
                  placeholder="Confirm new password"
                  className="flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="text-xs text-red-500 font-opensans">{passwordErrors.confirmPassword}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Password Protection</h4>
                <p className="text-xs text-gray-500">Your account is secured with a strong password</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {profile?.lastPasswordChange 
                ? `Last password change: ${profile.lastPasswordChange}` 
                : 'Password change history not available'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
