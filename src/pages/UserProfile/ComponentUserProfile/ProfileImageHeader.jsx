import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { API_URLS } from '../../../config/api';
import { getAuthToken, getAuthHeaders, isAuthenticated } from '../../../utils/authToken';

// API service for profile operations
const profileApiService = {
  async fetchProfile() {
    if (!isAuthenticated()) {
      throw new Error('User not authenticated');
    }
    
    const response = await fetch(API_URLS.PROFILE.GET, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    
    throw new Error(result.message || 'Failed to fetch profile');
  },

  async uploadProfileImage(imageFile) {
    if (!isAuthenticated()) {
      throw new Error('User not authenticated');
    }
    
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const headers = {
      'Authorization': `Bearer ${getAuthToken()}`
    };
    
    const response = await fetch(API_URLS.PROFILE.UPLOAD_AVATAR, {
      method: 'POST',
      headers: headers,
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    throw new Error(result.message || 'Failed to upload image');
  }
};

const ProfileImageHeader = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const profileData = await profileApiService.fetchProfile();
      setProfile(profileData);
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploadingImage(true);
      const result = await profileApiService.uploadProfileImage(file);
      
      // Update profile with new image URL
      setProfile(prev => ({
        ...prev,
        avatarUrl: result.imageUrl || result.url
      }));
      
      toast.success('Profile image updated successfully!');
    } catch (err) {
      toast.error('Failed to upload image: ' + err.message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="animate-pulse">
            <div className="w-32 h-32 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-40 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-56"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    // Don't show error, just show minimal profile
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <button 
              onClick={triggerImageUpload}
              disabled={isUploadingImage}
              className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition disabled:bg-gray-400" 
              title="Upload new photo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">Profile</h3>
          <p className="text-gray-500 text-sm mb-4">Loading...</p>
          <p className="text-xs text-gray-400">Click the camera icon to update your photo</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 mb-6">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          {profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={`${profile?.firstName || ''} ${profile?.lastName || ''}`}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-gray-100"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          
          {!profile?.avatarUrl && (
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          
          {/* Hidden fallback div for image error */}
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          {isUploadingImage && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
          <button 
            onClick={triggerImageUpload}
            disabled={isUploadingImage}
            className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition disabled:bg-gray-400" 
            title="Upload new photo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {profile?.firstName && profile?.lastName 
            ? `${profile.firstName} ${profile.lastName}` 
            : 'Name not available'
          }
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          {profile?.email || 'Email not available'}
        </p>
        <p className="text-xs text-gray-400">Click the camera icon to update your photo</p>
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageHeader;
