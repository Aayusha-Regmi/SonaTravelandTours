import React, { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import { API_URLS } from '../../../config/api';
import { getAuthToken, getAuthHeaders, isAuthenticated } from '../../../utils/authToken';

// API service for bookings
const apiService = {
  async fetchBookings() {
    if (!isAuthenticated()) {
      throw new Error('User not authenticated');
    }
    
    const response = await fetch(API_URLS.BOOKINGS.USER_BOOKINGS, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    if (result.success) {
      return result.data || [];
    }
    
    throw new Error(result.message || 'Failed to fetch bookings');
  }
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const bookingsData = await apiService.fetchBookings();
        setBookings(bookingsData);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.message);
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
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Failed to load bookings</h3>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
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
              <BookingCard key={booking.ticketNumber || idx} booking={booking} isLive={false} />
            ))}
          </div>
        )}
      </div>
    </div>
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
            <div className="text-xs text-gray-500">Boarding Place</div>
          </div>
          <div className="flex flex-col items-center px-2">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-700 text-lg">{deboarding}</div>
            <div className="text-xs text-gray-500">Deboarding Place</div>
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
