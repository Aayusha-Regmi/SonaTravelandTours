import React, { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import MyAccount from './MyAccount';
import { API_URLS } from '../../../config/api';

const TABS = [
  { label: 'My Account', key: 'account' },
  { label: 'My Bookings', key: 'bookings' },
  { label: 'Cancellations', key: 'cancellations' },
  { label: 'My Reviews', key: 'reviews' },
  { label: 'My Favorites', key: 'favorites' },
  { label: 'Discounts', key: 'discounts' },
];

// API service for profile and bookings
const apiService = {
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

const MyBookings = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('bookings');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch profile and bookings concurrently
        const [profileData, bookingsData] = await Promise.all([
          apiService.fetchProfile(),
          apiService.fetchBookings()
        ]);
        
        setProfile(profileData);
        setBookings(bookingsData);
      } catch (err) {
        setError(err.message);
        console.error('Data fetch error:', err);
        // No fallback data - just show error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Split bookings into live and history based on travel date
  const now = new Date();
  const liveTickets = bookings.filter(booking => {
    const travelDate = new Date(booking.travelDate);
    return travelDate >= now;
  });
  const history = bookings.filter(booking => {
    const travelDate = new Date(booking.travelDate);
    return travelDate < now;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="animate-pulse">
          <div className="flex flex-col items-center py-8 border-b border-gray-100">
            <div className="w-28 h-28 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="mt-8">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Failed to load data</h3>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Profile Header - Above everything */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-[#d25555] p-0.5">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={`${profile?.firstName || 'User'} ${profile?.lastName || ''}`}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              
              {!profile?.avatarUrl && (
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
                onClick={() => console.log('Edit profile image')}
              >
                <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-2">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 font-opensans">
              {profile?.firstName && profile?.lastName 
                ? `${profile.firstName} ${profile.lastName}` 
                : 'Name not available'}
            </h1>
            <p className="text-sm text-gray-600 font-opensans">
              {profile?.email || 'Email not available'}
            </p>

            {/* Stats Pills */}
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              {profile?.createdOn && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H5a1 1 0 00-1 1v8a1 1 0 001 1h14a1 1 0 001-1V8a1 1 0 00-1-1h-3M8 7h8" />
                  </svg>
                  Joined {new Date(profile.createdOn).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short' 
                  })}
                </div>
              )}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {bookings.length} Bookings
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="bg-white rounded-xl border border-gray-100 p-0 md:p-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-6 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`px-6 py-3 text-sm font-medium focus:outline-none transition border-b-2 whitespace-nowrap ${
                tab === t.key 
                  ? 'border-blue-600 text-blue-700 bg-white' 
                  : 'border-transparent text-gray-500 hover:text-blue-600'
              }`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading...</div>
        ) : tab === 'bookings' ? (
          <div>
            {/* Live Tickets */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Tickets</h3>
              {liveTickets.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <div className="text-gray-400 mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1v-3a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No upcoming bookings</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {liveTickets.map((booking, idx) => (
                    <BookingCard key={booking.ticketNumber || idx} booking={booking} isLive />
                  ))}
                </div>
              )}
            </div>
            
            {/* History */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">History</h3>
              {history.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <div className="text-gray-400 mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No booking history</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((booking, idx) => (
                    <BookingCard key={booking.ticketNumber || idx} booking={booking} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : tab === 'account' ? (
          <MyAccount />
        ) : (
          <div className="py-16 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Coming Soon</h3>
            <p className="text-gray-500">This section is under development</p>
          </div>
        )}
      </div>
    </>
  );
};

function BookingCard({ booking, isLive = false }) {
  // Extract data from booking object according to API structure
  const seats = booking.passengers?.map(p => p.seatNumber).join(', ') || 'N/A';
  const boarding = booking.passengers?.[0]?.boardingPlace || 'N/A';
  const deboarding = booking.passengers?.[0]?.deboardingPlace || 'N/A';
  const travelDate = booking.travelDate ? new Date(booking.travelDate) : null;
  const formattedDate = travelDate ? travelDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }) : 'N/A';
  
  // Default time - you can add this to your API if needed
  const time = '12:00 PM';

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 bg-white">
      {/* Route Info */}
      <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-4 mb-4 lg:mb-0">
        <div className="flex items-center gap-3 lg:min-w-[200px]">
          <div className="text-center">
            <div className="font-bold text-blue-700 text-lg">{boarding}</div>
            <div className="text-xs text-gray-500">Boarding Place Name</div>
          </div>
          <div className="flex flex-col items-center px-2">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-700 text-lg">{deboarding}</div>
            <div className="text-xs text-gray-500">Deboarding Place Name</div>
          </div>
        </div>
        
        {/* Booking Details */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 flex-1">
          <div className="text-center lg:text-left">
            <div className="font-semibold text-gray-800 text-sm">Date</div>
            <div className="text-gray-600 text-sm">{formattedDate}</div>
          </div>
          <div className="text-center lg:text-left">
            <div className="font-semibold text-gray-800 text-sm">Time</div>
            <div className="text-gray-600 text-sm">{time}</div>
          </div>
          <div className="text-center lg:text-left">
            <div className="font-semibold text-gray-800 text-sm">Seats</div>
            <div className="text-gray-600 text-sm">{seats}</div>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="flex justify-center lg:justify-end">
        <button 
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            isLive 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md' 
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
          onClick={() => {
            // Handle view more details
            console.log('Viewing booking details:', booking);
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View More Details
        </button>
      </div>
    </div>
  );
}

export default MyBookings;
