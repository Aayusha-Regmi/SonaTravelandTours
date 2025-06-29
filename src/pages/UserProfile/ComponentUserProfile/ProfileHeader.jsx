import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import { API_URLS } from '../../../config/api';

// API service for profile operations
const profileApiService = {
  async fetchProfile() {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token') || 
                    localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please log in to continue.');
      }
      
      const response = await fetch(API_URLS.PROFILE.GET, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
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

  async fetchBookings() {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token') || 
                    localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please log in to continue.');
      }
      
      const response = await fetch(API_URLS.BOOKINGS.USER_BOOKINGS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        return result.data || [];
      }
      throw new Error(result.message || 'Failed to fetch bookings');
    } catch (error) {
      console.error('Bookings fetch error:', error);
      throw error;
    }
  }
};

const ProfileHeader = ({ 
  onProfileImageEdit
}) => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [profileData, bookingsData] = await Promise.all([
        profileApiService.fetchProfile(),
        profileApiService.fetchBookings()
      ]);
      
      setProfile(profileData);
      setBookings(bookingsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format join date from API data
  const formatJoinDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    } catch (error) {
      return null;
    }
  };

  // Calculate booking count
  const bookingCount = bookings ? bookings.length : 0;

  // Prepare display data - no fallback values
  const displayData = {
    profileImage: profile?.avatarUrl || null,
    name: profile?.firstName && profile?.lastName 
      ? `${profile.firstName} ${profile.lastName}` 
      : null,
    email: profile?.email || null,
    joinDate: formatJoinDate(profile?.createdOn),
    bookingCount: bookingCount
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col items-center justify-center text-center gap-4 animate-pulse">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="text-red-500">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Failed to load profile</h3>
            <p className="text-gray-500 text-sm mb-4">{error}</p>
            <button 
              onClick={fetchProfileData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col items-center justify-center text-center gap-4">
        {/* Profile Picture */}
        <div className="relative">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-[#d25555] p-0.5">
            {displayData.profileImage ? (
              <img
                src={displayData.profileImage}
                alt={displayData.name || 'Profile'}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            
            {!displayData.profileImage && (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            
            {/* Hidden fallback div for image error */}
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            <div 
              className="absolute -bottom-1 -right-1 w-6 h-6 lg:w-7 lg:h-7 bg-[#d25555] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#b94545] transition-all duration-200 shadow-md"
              onClick={onProfileImageEdit}
            >
              <img
                src="/images/img_edit.svg"
                alt="edit profile"
                className="w-3 h-3 lg:w-3.5 lg:h-3.5"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-2">
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 font-opensans">
            {displayData.name || 'Name not available'}
          </h1>
          <p className="text-sm text-gray-600 font-opensans">
            {displayData.email || 'Email not available'}
          </p>

          {/* Stats Pills */}
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {displayData.joinDate && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                <img src="/images/img_hicon_outline_profile_accepted_2.svg" alt="joined" className="w-3.5 h-3.5" />
                Joined {displayData.joinDate}
              </div>
            )}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
              <img src="/images/img_hicon_outline_bookmark_3.svg" alt="bookings" className="w-3.5 h-3.5" />
              {displayData.bookingCount} Bookings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
