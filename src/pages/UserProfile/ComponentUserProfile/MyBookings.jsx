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
 const isLiveTicket = (dateString)=>{
  if (!dateString) {
    return false;
  }
  
  // Try multiple date parsing approaches
  let ticketDate;
  
  // Method 1: Direct parsing
  ticketDate = new Date(dateString);
  
  // Method 2: If invalid, try parsing DD/MM/YYYY format
  if (isNaN(ticketDate.getTime()) && typeof dateString === 'string') {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      // Assume DD/MM/YYYY format and convert to MM/DD/YYYY
      ticketDate = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
    }
  }
  
  // Method 3: If still invalid, try parsing YYYY-MM-DD format
  if (isNaN(ticketDate.getTime()) && typeof dateString === 'string') {
    if (dateString.includes('-')) {
      ticketDate = new Date(dateString + 'T00:00:00');
    }
  }
  
  const today= new Date();
  
  // Check if date is valid
  if (isNaN(ticketDate.getTime())) {
    return false;
  }
  
  today.setHours(0,0,0,0);//resetting time to start of the day
  ticketDate.setHours(0,0,0,0);//resetting time to start of the day

  return ticketDate>=today;
 }  


 const formatDateStatus = (dateString)=>{
  const ticketDate = new Date(dateString);
  const today = new Date();
  today.setHours(0,0,0,0);
  ticketDate.setHours(0,0,0,0);


  if(ticketDate.getTime()==today.getTime()){
    return 'Today';

  }else if (ticketDate>today){
    return 'Upcoming';

  }else{
    return 'Past';
  }
 }

// Filter bookings into live and history
const liveTickets= bookings.filter(booking => {
  const dateValue = booking.travelDate || booking.dateOfTravel || booking.date || booking.travel_date || booking.departureDate;
  return isLiveTicket(dateValue);
});

const history = bookings.filter(booking => {
  const dateValue = booking.travelDate || booking.dateOfTravel || booking.date || booking.travel_date || booking.departureDate;
  return !isLiveTicket(dateValue);
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
        <h3 className="text-lg font-semibold text-orange-600 mb-4 flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Live Tickets
        </h3>
        {liveTickets.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-gray-600 mb-3">
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
        <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center">
          <span className="w-3 h-3 bg-gray-600 rounded-full mr-2"></span>
          History
        </h3>
        {history.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-gray-600 mb-3">
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
  // Extract data from booking object according to actual API structure
  const seats = booking.seatNumber || booking.seats || 'N/A';
  const boarding = booking.boarding_place || booking.boardingPlace || booking.source || 'N/A';
  const deboarding = booking.deboarding_place || booking.deboardingPlace || booking.destination || 'N/A';
  
  // Try multiple date field names
  const travelDateValue = booking.travelDate || booking.dateOfTravel || booking.date || booking.travel_date || booking.departureDate;
  const travelDate = travelDateValue ? new Date(travelDateValue) : null;
  const formattedDate = travelDate ? travelDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }) : 'N/A';
  
  // Add formatDateStatus function here
  const formatDateStatus = (dateString) => {
    const ticketDate = new Date(dateString);
    const today = new Date();
    today.setHours(0,0,0,0);
    ticketDate.setHours(0,0,0,0);

    if(ticketDate.getTime() === today.getTime()){
      return 'Today';
    } else if (ticketDate > today){
      return 'Upcoming';
    } else {
      return 'Past';
    }
  };

  const dateStatus = formatDateStatus(travelDateValue);
  const time = booking.time || booking.departureTime || '12:00 PM';

  return (
    <div className={`flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-200 
      ${isLive ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white opacity-75'}`}>
      
      {/* Status Badge */}
      <div className="mb-2 lg:mb-0">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          dateStatus === 'Today' 
            ? 'bg-green-100 text-green-700' 
            : dateStatus === 'Upcoming' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-500'
        }`}>
          {dateStatus}
        </span>
      </div>

      {/* Route Info */}
      <div className="flex-1 ml-14 flex flex-col lg:flex-row lg:items-center gap-7 mb-4 lg:mb-0">
        <div className="flex items-center gap-5 lg:min-w-[200px]">
          <div className="text-center">
            <div className={`font-bold text-lg ${isLive ? 'text-green-600' : 'text-gray-600'}`}>
              {boarding}
            </div>
            <div className="text-xs text-gray-500">Boarding Place</div>
          </div>
          <div className="flex flex-col items-center px-2">
            <svg className={`w-6 h-6 ${isLive ? 'text-green-500' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
          <div className="text-center">
            <div className={`font-bold text-lg ${isLive ? 'text-green-600' : 'text-gray-600'}`}>
              {deboarding}
            </div>
            <div className="text-xs text-gray-500">Deboarding Place</div>
          </div>
        </div>
        
        {/* Booking Details */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-8 flex-1">
          <div className="text-center lg:text-left">
            <div className="font-semibold text-gray-800 text-sm">Date</div>
            <div className={`text-sm ${isLive ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
              {formattedDate}
            </div>
          </div>
         
          <div className="text-center lg:text-left">
            <div className="font-semibold text-gray-800 text-sm">Seats</div>
            <div className={`text-sm ${isLive ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>
              {seats}
            </div>
          </div>
        </div>
      </div>
      
     
    </div>
  );
}

export default MyBookings;
