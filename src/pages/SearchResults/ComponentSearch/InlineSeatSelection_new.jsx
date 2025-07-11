import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';
import { API_URLS } from '../../../config/api';
import { getAuthToken, getAuthHeaders, isAuthenticated, clearAuthToken, handleAuthResponse } from '../../../utils/authToken';

// Add the missing Card component import
const Card = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

// Debounce utility function to prevent rapid API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const InlineSeatSelection = ({ busData, busId, searchParams = {}, travelDate }) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableSeatsCount, setAvailableSeatsCount] = useState(0);
  const [seatConfig, setSeatConfig] = useState({});
  const [isLoadingSeats, setIsLoadingSeats] = useState(false);
  const [lastFetchParams, setLastFetchParams] = useState(null);
  
  // Get dynamic seat price from bus data, fallback to 2000
  const seatPrice = parseInt(busData?.fair || busData?.fare || busData?.price || 2000);
  
  // Session expiry handler
  const handleSessionExpiry = useCallback((message = 'Session expired. Please login again.') => {
    console.warn('Session expired, clearing tokens and redirecting to login');
    
    // Clear all auth tokens
    clearAuthToken();
    
    // Show toast notification
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => {
        // Redirect to login page with return URL
        navigate('/login', { 
          state: { 
            message: message,
            returnUrl: window.location.pathname + window.location.search 
          }
        });
      }
    });
  }, [navigate]);
  
  // Memoize current fetch parameters to prevent unnecessary API calls
  const currentFetchParams = useMemo(() => {
    let currentTravelDate = travelDate || busData.departureDate || busData.date;
    if (currentTravelDate) {
      const dateObj = new Date(currentTravelDate);
      if (!isNaN(dateObj.getTime())) {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        currentTravelDate = `${year}-${month}-${day}`;
      }
    } else {
      currentTravelDate = new Date().toISOString().split('T')[0];
    }
    
    let destination = searchParams.toCity || searchParams.to || busData.route?.to || busData.destination || busData.arrivalLocation || 'kathmandu';
    destination = destination.toLowerCase().trim();
    
    return {
      travelDate: currentTravelDate,
      destination: destination,
      busId: busId || busData.id
    };
  }, [travelDate, busData, searchParams, busId]);
  
  // Optimized seat loading function
  const fetchBookedSeats = useCallback(async (params) => {
    // Skip if already loading or params haven't changed
    if (isLoadingSeats || JSON.stringify(params) === JSON.stringify(lastFetchParams)) {
      return;
    }
    
    setIsLoadingSeats(true);
    setLastFetchParams(params);
    
    try {
      const apiUrl = API_URLS.BUS.DETAILS;
      
      // Check authentication first
      if (!isAuthenticated()) {
        console.warn('User not authenticated, redirecting to login');
        handleSessionExpiry('Please login to view seat availability');
        return;
      }
      
      const requestBody = {
        travelDate: params.travelDate,
        destination: params.destination
      };
      
      console.log('SEAT API REQUEST:', {
        url: apiUrl,
        method: 'POST',
        requestData: requestBody
      });
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(requestBody)
      });

      // Handle 401 Unauthorized - Session Expired
      if (response.status === 401) {
        console.warn('Session expired, handling authentication error');
        handleSessionExpiry('Session expired. Please login again.');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract seat numbers from real API response
      let bookedSeatNumbers = [];
      if (data.success && data.data && Array.isArray(data.data)) {
        bookedSeatNumbers = data.data
          .map(booking => booking.seatNumber)
          .filter(seat => seat && /^[A-Z]\d+$/.test(seat));
      }
      
      console.log('SEAT API RESPONSE:', {
        status: response.status,
        success: data.success,
        bookedSeats: bookedSeatNumbers,
        message: data.message
      });
      
      setBookedSeats(bookedSeatNumbers);
      
    } catch (error) {
      console.error('❌ SEAT API ERROR:', error.message);
      
      // Check if it's a network error that might indicate session issues
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.warn('Network error - checking authentication');
        if (!isAuthenticated()) {
          handleSessionExpiry('Session expired. Please login again.');
          return;
        }
      }
      
      // On error, show all seats as available
      setBookedSeats([]);
      
      // Show user-friendly error message
      toast.error('Unable to load current seat availability. Please refresh the page.');
    } finally {
      setIsLoadingSeats(false);
    }
  }, [isLoadingSeats, lastFetchParams, handleSessionExpiry]);
  
  // Debounced version of fetchBookedSeats to prevent rapid API calls
  const debouncedFetchSeats = useCallback(
    debounce(fetchBookedSeats, 500), // 500ms debounce delay
    [fetchBookedSeats]
  );
  
  // This useEffect will refresh booked seats with optimization
  useEffect(() => {
    debouncedFetchSeats(currentFetchParams);
  }, [currentFetchParams, debouncedFetchSeats]);
  
  // Generate seat configuration based on bus data
  useEffect(() => {
    console.log('UPDATING SEAT CONFIGURATION');
    console.log('Bus data received:', busData);
    console.log('Bus ID from params:', busId);
    console.log('Booked seats from API:', bookedSeats);
    console.log('Checking specific seats:');
    console.log('   A5 booked?', bookedSeats.includes('A5'));
    console.log('   A7 booked?', bookedSeats.includes('A7'));
    console.log('   S1 booked?', bookedSeats.includes('S1'));

    // Professional seat layout - Better centered with increased x-gaps to cover full card width
    // Card width: ~900px, seat group width: ~750px, center offset: (900-750)/2 = ~75px
    const centerOffset = 40;
    
    const config = {
      // Row 1 - Upper deck front row - No top margin, increased x-gaps for full width coverage
      row1: [
        { id: 'S4', type: bookedSeats.includes('S4') ? 'booked' : 'available', position: { x: 50 + centerOffset, y: 10 } },
        { id: 'B2', type: bookedSeats.includes('B2') ? 'booked' : 'available', position: { x: 180 + centerOffset, y: 10 } },
        { id: 'B4', type: bookedSeats.includes('B4') ? 'booked' : 'available', position: { x: 240 + centerOffset, y: 10 } },
        { id: 'B6', type: bookedSeats.includes('B6') ? 'booked' : 'available', position: { x: 320 + centerOffset, y: 10 } },
        { id: 'B8', type: bookedSeats.includes('B8') ? 'booked' : 'available', position: { x: 380 + centerOffset, y: 10 } },
        { id: 'B10', type: bookedSeats.includes('B10') ? 'booked' : 'available', position: { x: 460 + centerOffset, y: 10 } },
        { id: 'B12', type: bookedSeats.includes('B12') ? 'booked' : 'available', position: { x: 520 + centerOffset, y: 10 } },
        { id: 'B14', type: bookedSeats.includes('B14') ? 'booked' : 'available', position: { x: 600 + centerOffset, y: 10 } },
        { id: 'B16', type: bookedSeats.includes('B16') ? 'booked' : 'available', position: { x: 660 + centerOffset, y: 10 } },
        { id: 'B18', type: bookedSeats.includes('B18') ? 'booked' : 'available', position: { x: 720 + centerOffset, y: 10 } },
      ],
      
      // Row 2 - Upper deck second row - Increased vertical spacing to 80px
      row2: [
        { id: 'S3', type: bookedSeats.includes('S3') ? 'booked' : 'available', position: { x: 50 + centerOffset, y: 80 } },
        { id: 'B1', type: bookedSeats.includes('B1') ? 'booked' : 'available', position: { x: 180 + centerOffset, y: 80 } },
        { id: 'B3', type: bookedSeats.includes('B3') ? 'booked' : 'available', position: { x: 240 + centerOffset, y: 80 } },
        { id: 'B5', type: bookedSeats.includes('B5') ? 'booked' : 'available', position: { x: 320 + centerOffset, y: 80 } },
        { id: 'B7', type: bookedSeats.includes('B7') ? 'booked' : 'available', position: { x: 380 + centerOffset, y: 80 } },
        { id: 'B9', type: bookedSeats.includes('B9') ? 'booked' : 'available', position: { x: 460 + centerOffset, y: 80 } },
        { id: 'B11', type: bookedSeats.includes('B11') ? 'booked' : 'available', position: { x: 520 + centerOffset, y: 80 } },
        { id: 'B13', type: bookedSeats.includes('B13') ? 'booked' : 'available', position: { x: 600 + centerOffset, y: 80 } },
        { id: 'B15', type: bookedSeats.includes('B15') ? 'booked' : 'available', position: { x: 660 + centerOffset, y: 80 } },
        { id: 'B17', type: bookedSeats.includes('B17') ? 'booked' : 'available', position: { x: 720 + centerOffset, y: 80 } },
      ],
      
      // Gap between upper and lower decks - increased to 200px
      
      // Row 3 - Lower deck left side - Increased vertical spacing to 200px
      row3: [
        { id: 'S2', type: bookedSeats.includes('S2') ? 'booked' : 'available', position: { x: 50 + centerOffset, y: 200 } },
        { id: 'A2', type: bookedSeats.includes('A2') ? 'booked' : 'available', position: { x: 180 + centerOffset, y: 200 } },
        { id: 'A4', type: bookedSeats.includes('A4') ? 'booked' : 'available', position: { x: 240 + centerOffset, y: 200 } },
        { id: 'A6', type: bookedSeats.includes('A6') ? 'booked' : 'available', position: { x: 320 + centerOffset, y: 200 } },
        { id: 'A8', type: bookedSeats.includes('A8') ? 'booked' : 'available', position: { x: 380 + centerOffset, y: 200 } },
        { id: 'A10', type: bookedSeats.includes('A10') ? 'booked' : 'available', position: { x: 460 + centerOffset, y: 200 } },
        { id: 'A12', type: bookedSeats.includes('A12') ? 'booked' : 'available', position: { x: 520 + centerOffset, y: 200 } },
        { id: 'A14', type: bookedSeats.includes('A14') ? 'booked' : 'available', position: { x: 600 + centerOffset, y: 200 } },
        { id: 'A16', type: bookedSeats.includes('A16') ? 'booked' : 'available', position: { x: 660 + centerOffset, y: 200 } },
        { id: 'A18', type: bookedSeats.includes('A18') ? 'booked' : 'available', position: { x: 720 + centerOffset, y: 200 } },
      ],
      
      // Row 4 - Lower deck right side - Increased vertical spacing to 270px
      row4: [
        { id: 'S1', type: bookedSeats.includes('S1') ? 'booked' : 'available', position: { x: 50 + centerOffset, y: 270 } },
        { id: 'A1', type: bookedSeats.includes('A1') ? 'booked' : 'available', position: { x: 180 + centerOffset, y: 270 } },
        { id: 'A3', type: bookedSeats.includes('A3') ? 'booked' : 'available', position: { x: 240 + centerOffset, y: 270 } },
        { id: 'A5', type: bookedSeats.includes('A5') ? 'booked' : 'available', position: { x: 320 + centerOffset, y: 270 } },
        { id: 'A7', type: bookedSeats.includes('A7') ? 'booked' : 'available', position: { x: 380 + centerOffset, y: 270 } },
        { id: 'A9', type: bookedSeats.includes('A9') ? 'booked' : 'available', position: { x: 460 + centerOffset, y: 270 } },
        { id: 'A11', type: bookedSeats.includes('A11') ? 'booked' : 'available', position: { x: 520 + centerOffset, y: 270 } },
        { id: 'A13', type: bookedSeats.includes('A13') ? 'booked' : 'available', position: { x: 600 + centerOffset, y: 270 } },
        { id: 'A15', type: bookedSeats.includes('A15') ? 'booked' : 'available', position: { x: 660 + centerOffset, y: 270 } },
        { id: 'A17', type: bookedSeats.includes('A17') ? 'booked' : 'available', position: { x: 720 + centerOffset, y: 270 } },
      ],
      
      // Row 5 - Back row - Increased vertical spacing to 340px
      row5: [
        { id: 'A19', type: bookedSeats.includes('A19') ? 'booked' : 'available', position: { x: 180 + centerOffset, y: 340 } },
        { id: 'A20', type: bookedSeats.includes('A20') ? 'booked' : 'available', position: { x: 240 + centerOffset, y: 340 } },
        { id: 'A21', type: bookedSeats.includes('A21') ? 'booked' : 'available', position: { x: 320 + centerOffset, y: 340 } },
        { id: 'A22', type: bookedSeats.includes('A22') ? 'booked' : 'available', position: { x: 380 + centerOffset, y: 340 } },
        { id: 'A23', type: bookedSeats.includes('A23') ? 'booked' : 'available', position: { x: 460 + centerOffset, y: 340 } },
        { id: 'A24', type: bookedSeats.includes('A24') ? 'booked' : 'available', position: { x: 520 + centerOffset, y: 340 } },
        { id: 'A25', type: bookedSeats.includes('A25') ? 'booked' : 'available', position: { x: 600 + centerOffset, y: 340 } },
        { id: 'A26', type: bookedSeats.includes('A26') ? 'booked' : 'available', position: { x: 660 + centerOffset, y: 340 } },
        { id: 'A27', type: bookedSeats.includes('A27') ? 'booked' : 'available', position: { x: 720 + centerOffset, y: 340 } },
      ],
    };
    
    setSeatConfig(config);
    
    // Count available seats
    const totalSeats = Object.values(config).reduce((acc, row) => acc + row.length, 0);
    const booked = Object.values(config).reduce((acc, row) => acc + row.filter(s => s.type === 'booked').length, 0);
    const available = totalSeats - booked;
    
    console.log('Total seats:', totalSeats);
    console.log('Booked seats:', booked);
    console.log('Available seats:', available);
    
    setAvailableSeatsCount(available);
  }, [busData, busId, bookedSeats]);
  
  // Booking button handler
  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    
    // Check authentication before booking
    if (!isAuthenticated()) {
      handleSessionExpiry('Please login to book seats');
      return;
    }
    
    // Create booking data
    const bookingData = {
      busId,
      busData,
      selectedSeats,
      totalPrice,
      seatPrice,
      searchParams,
      travelDate
    };
    
    console.log('BOOKING DATA:', bookingData);
    
    // Navigate to booking page
    navigate('/book-seat', { 
      state: { 
        bookingData,
        from: 'inline-seat-selection'
      } 
    });
  };
  
  // Handle seat selection/deselection
  const handleSeatClick = (seatId) => {
    console.log('Seat clicked:', seatId);
    
    // Check if seat is booked
    const isBooked = bookedSeats.includes(seatId);
    if (isBooked) {
      toast.error('This seat is already booked');
      return;
    }
    
    // Toggle seat selection
    setSelectedSeats(prev => {
      const isSelected = prev.includes(seatId);
      const newSelection = isSelected 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId];
      
      console.log('Selected seats:', newSelection);
      
      // Update total price
      const newTotal = newSelection.length * seatPrice;
      setTotalPrice(newTotal);
      
      return newSelection;
    });
  };
  
  // Render seat button
  const renderSeat = (seat) => {
    const isSelected = selectedSeats.includes(seat.id);
    const isBooked = seat.type === 'booked' || bookedSeats.includes(seat.id);
    
    let seatClass = 'w-8 h-8 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center text-xs font-bold shadow-md';
    
    if (isBooked) {
      seatClass += ' bg-red-400 border-red-500 text-white cursor-not-allowed';
    } else if (isSelected) {
      seatClass += ' bg-blue-500 border-blue-600 text-white';
    } else {
      seatClass += ' bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300';
    }
    
    return (
      <div
        key={seat.id}
        className={seatClass}
        style={{
          position: 'absolute',
          left: seat.position.x,
          top: seat.position.y,
        }}
        onClick={() => handleSeatClick(seat.id)}
      >
        {seat.id}
      </div>
    );
  };
  
  return (
    <div className="space-y-6 mt-6">
      {/* Seat Selection Card - increased height for larger centered seats */}
      <Card className="mb-6 min-h-[550px] w-full relative shadow-lg border border-gray-200 rounded-xl bg-white overflow-hidden">
        {/* Loading Overlay */}
        {isLoadingSeats && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-sm font-medium text-gray-600">Loading seat availability...</p>
            </div>
          </div>
        )}
        
        {/* Legend */}
        <div className="flex items-center justify-between mb-6 px-6 pt-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
              <span className="text-sm font-semibold text-gray-700">Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
              <span className="text-sm font-semibold text-gray-700">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full shadow-sm"></div>
              <span className="text-sm font-semibold text-gray-700">Available</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-green-50 px-4 py-4 rounded-full border border-green-200">
            <span className="text-sm font-semibold text-green-700">Available Seats:</span>
            <span className="text-lg font-bold text-green-800">{availableSeatsCount}</span>
          </div>
        </div>
        
        {/* Seat Layout */}
        <div className="relative flex-1" style={{ height: '400px' }}>
          {/* Render all seat rows */}
          {Object.values(seatConfig).map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map(seat => renderSeat(seat))}
            </div>
          ))}
        </div>
      </Card>
      
      {/* Booking Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-lg rounded-xl">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Selected Seats:</span>
              <span className="font-semibold text-blue-600">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Price per seat:</span>
              <span className="font-semibold text-gray-800">Rs. {seatPrice}</span>
            </div>
            
            <div className="flex justify-between items-center border-t pt-3">
              <span className="text-lg font-bold text-gray-800">Total Price:</span>
              <span className="text-xl font-bold text-blue-600">Rs. {totalPrice}</span>
            </div>
          </div>
          
          <Button 
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200"
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
          >
            {selectedSeats.length > 0 
              ? `Book ${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''} - Rs. ${totalPrice}`
              : 'Select Seats to Book'
            }
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InlineSeatSelection;
