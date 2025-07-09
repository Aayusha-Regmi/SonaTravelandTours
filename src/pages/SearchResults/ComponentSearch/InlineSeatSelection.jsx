import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';
import { API_URLS } from '../../../config/api';
import { getAuthToken, getAuthHeaders, isAuthenticated } from '../../../utils/authToken';

// Add the missing Card component import
const Card = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);


const InlineSeatSelection = ({ busData, busId, searchParams = {}, travelDate }) => {
  const navigate = useNavigate();
  
  // Two-way booking state management
  const [activeTab, setActiveTab] = useState('departure');
  const [departureSeats, setDepartureSeats] = useState([]);
  const [returnSeats, setReturnSeats] = useState([]);
  const [departureBookedSeats, setDepartureBookedSeats] = useState([]);
  const [returnBookedSeats, setReturnBookedSeats] = useState([]);
  const [seatConfig, setSeatConfig] = useState({});
  const [isLoadingSeats, setIsLoadingSeats] = useState(false);
  
  // Check if this is a round trip booking
  const isRoundTrip = searchParams?.tripType === 'round-trip' || searchParams?.returnDate;
  
  // Get current active seat selections and booked seats
  const selectedSeats = activeTab === 'departure' ? departureSeats : returnSeats;
  const bookedSeats = activeTab === 'departure' ? departureBookedSeats : returnBookedSeats;
  const setSelectedSeats = activeTab === 'departure' ? setDepartureSeats : setReturnSeats;
  const setBookedSeats = activeTab === 'departure' ? setDepartureBookedSeats : setReturnBookedSeats;
  
  // Calculate available seats count
  const totalSeats = 39;
  const availableSeatsCount = totalSeats - bookedSeats.length;
  
  // Get dynamic seat price from bus data, fallback to 2000
  const seatPrice = parseInt(busData?.fair || busData?.fare || busData?.price || 2000);
  
  // Calculate total price based on active tab and round trip
  const currentTabPrice = selectedSeats.length * seatPrice;
  const departurePrice = departureSeats.length * seatPrice;
  const returnPrice = returnSeats.length * seatPrice;
  const totalPrice = isRoundTrip ? (departurePrice + returnPrice) : currentTabPrice;
  
  // This useEffect will refresh booked seats whenever:
  // - busData changes (different bus selected)
  // - searchParams change (date, route, or other search criteria changed)
  // - travelDate changes (date picker updated)
  // - activeTab changes (departure/return switch)
  useEffect(() => {
    const fetchBookedSeats = async () => {
      setIsLoadingSeats(true);
      try {
        // Determine current travel date based on active tab
        let currentTravelDate;
        if (activeTab === 'departure') {
          currentTravelDate = travelDate || busData.departureDate || busData.date;
        } else {
          // For return journey, use return date from search params
          currentTravelDate = searchParams?.returnDate || travelDate || busData.departureDate || busData.date;
        }
        
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
        
        console.log('Current travel date for', activeTab, ':', currentTravelDate);
        
        // Determine destination based on active tab (swap for return journey)
        let destination;
        if (activeTab === 'departure') {
          destination = searchParams.toCity || searchParams.to || busData.route?.to || busData.destination || busData.arrivalLocation || 'kathmandu';
        } else {
          // For return journey, swap the destination (from becomes to)
          destination = searchParams.fromCity || searchParams.from || busData.route?.from || busData.departureLocation || 'birgunj';
        }
        destination = destination.toLowerCase().trim();
        
        const apiUrl = API_URLS.BUS.DETAILS;
        
        // Only make API request if user is authenticated
        if (!isAuthenticated()) {
          console.warn('User not authenticated, cannot fetch seat details');
          setBookedSeats([]);
          return;
        }
        
        const requestBody = {
          travelDate: currentTravelDate,
          destination: destination
        };
        
        console.log('SEAT API REQUEST for', activeTab, ':', {
          url: apiUrl,
          method: 'POST',
          requestData: requestBody
        });
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(requestBody)
        });

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
        
        console.log('SEAT API RESPONSE for', activeTab, ':', {
          status: response.status,
          success: data.success,
          bookedSeats: bookedSeatNumbers,
          message: data.message
        });
        
        console.log('SETTING BOOKED SEATS for', activeTab, ':', bookedSeatNumbers);
        setBookedSeats(bookedSeatNumbers);
        
      } catch (error) {
        console.error('❌ SEAT API ERROR for', activeTab, ':', error.message);
        console.log('Error loading seat data - showing all seats as available');
        
        // On error, show all seats as available instead of mock data
        setBookedSeats([]);
        
        // Show error message to user
        toast.error(`Failed to load seat availability for ${activeTab}. Please try again.`);
      } finally {
        setIsLoadingSeats(false);
      }
    };
    
    fetchBookedSeats();
  }, [busData, searchParams, travelDate, activeTab]); // Add activeTab as dependency
  
  // Generate seat configuration based on bus data
  useEffect(() => {
    console.log('UPDATING SEAT CONFIGURATION for', activeTab);
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
        { id: 'B18', type: bookedSeats.includes('B18') ? 'booked' : 'available', position: { x: 740 + centerOffset, y: 10 } },
      ],
      
      // Row 2 - Upper deck back row - Aligned with front row
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
        { id: 'B17', type: bookedSeats.includes('B17') ? 'booked' : 'available', position: { x: 740 + centerOffset, y: 80 } },
      ],

      // Row 3 - Middle section (aisle space) - Centered vertically
      row3: [
        { id: 'S2', type: bookedSeats.includes('S2') ? 'booked' : 'available', position: { x: 50 + centerOffset, y: 160 } },
        { id: 'A17', type: bookedSeats.includes('A19') ? 'booked' : 'available', position: { x: 740 + centerOffset, y: 160 } },
      ],

      // Row 4 - Lower deck front row - Aligned with upper deck
      row4: [
        { id: 'S1', type: bookedSeats.includes('S1') ? 'booked' : 'available', position: { x: 50 + centerOffset, y: 240 } },
        { id: 'A2', type: bookedSeats.includes('A2') ? 'booked' : 'available', position: { x: 240 + centerOffset, y: 230 } },
        { id: 'A4', type: bookedSeats.includes('A4') ? 'booked' : 'available', position: { x: 320 + centerOffset, y: 230 } },
        { id: 'A6', type: bookedSeats.includes('A6') ? 'booked' : 'available', position: { x: 380 + centerOffset, y: 230 } },
        { id: 'A8', type: bookedSeats.includes('A8') ? 'booked' : 'available', position: { x: 460 + centerOffset, y: 230 } },
        { id: 'A10', type: bookedSeats.includes('A10') ? 'booked' : 'available', position: { x: 520 + centerOffset, y: 230 } },
        { id: 'A12', type: bookedSeats.includes('A12') ? 'booked' : 'available', position: { x: 600 + centerOffset, y: 230 } },
        { id: 'A14', type: bookedSeats.includes('A14') ? 'booked' : 'available', position: { x: 660 + centerOffset, y: 230 } },
        { id: 'A16', type: bookedSeats.includes('A16') ? 'booked' : 'available', position: { x: 740 + centerOffset, y: 230 } },
      ],

      // Row 5 - Lower deck back row - Aligned with front row
      row5: [
        { id: 'A1', type: bookedSeats.includes('A1') ? 'booked' : 'available', position: { x: 240 + centerOffset, y: 300 } },
        { id: 'A3', type: bookedSeats.includes('A3') ? 'booked' : 'available', position: { x: 320 + centerOffset, y: 300 } },
        { id: 'A5', type: bookedSeats.includes('A5') ? 'booked' : 'available', position: { x: 380 + centerOffset, y: 300 } },
        { id: 'A7', type: bookedSeats.includes('A7') ? 'booked' : 'available', position: { x: 460 + centerOffset, y: 300 } },
        { id: 'A9', type: bookedSeats.includes('A9') ? 'booked' : 'available', position: { x: 520 + centerOffset, y: 300 } },
        { id: 'A11', type: bookedSeats.includes('A11') ? 'booked' : 'available', position: { x: 600 + centerOffset, y: 300 } },
        { id: 'A13', type: bookedSeats.includes('A13') ? 'booked' : 'available', position: { x: 660 + centerOffset, y: 300 } },
        { id: 'A15', type: bookedSeats.includes('A15') ? 'booked' : 'available', position: { x: 740 + centerOffset, y: 300 } },
      ],
    };


    
    setSeatConfig(config);
    
    console.log('Generated seat config for A5:', config.row5.find(seat => seat.id === 'A5'));
    console.log('Generated seat config for A7:', config.row5.find(seat => seat.id === 'A7'));
    console.log('SEAT CONFIGURATION COMPLETED for', activeTab);
  }, [busId, busData, bookedSeats, activeTab]);

  // Remove the separate price calculation useEffect since we calculate totalPrice directly

  useEffect(() => {
    console.log('Bus data is missing or incomplete:', busData);
  }, [busData, bookedSeats]); // Add bookedSeats as dependency

  const handleSeatClick = (seatId, seatType) => {
    if (seatType === 'booked') return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatIcon = (seatType, isSelected) => {
    if (seatType === 'booked') return '/images/img_mdicarseat_red_300_01.svg';
    if (isSelected) return '/images/img_mdicarseat_blue_gray_500.svg';
    return '/images/img_mdicarseat_gray_400.svg';
  };

  const handleProceedToPassengerDetails = async () => {
    // Validation for round trip booking
    if (isRoundTrip) {
      if (departureSeats.length === 0) {
        toast.error('Please select seats for departure journey.');
        setActiveTab('departure');
        return;
      }
      if (returnSeats.length === 0) {
        toast.error('Please select seats for return journey.');
        setActiveTab('return');
        return;
      }
    } else {
      // One-way validation
      if (selectedSeats.length === 0) {
        toast.error('Please select at least one seat to continue.');
        return;
      }
    }

    console.log('🎯 Proceeding to passenger details with data:', {
      isRoundTrip,
      departureSeats,
      returnSeats,
      selectedSeats: isRoundTrip ? { departure: departureSeats, return: returnSeats } : selectedSeats,
      busData,
      searchParams,
      travelDate,
      totalPrice
    });

    // Navigate with round-trip or one-way data structure
    const navigationState = {
      isRoundTrip,
      busData: busData,
      searchParams: searchParams,
      travelDate: travelDate,
      totalPrice: totalPrice,
      seatPrice: seatPrice,
    };

    if (isRoundTrip) {
      // Round-trip booking data
      navigationState.departure = {
        selectedSeats: departureSeats,
        totalPrice: departurePrice,
        bookingDetails: {
          busId: busData?.originalData?.busId || busData?.id || busId,
          busName: busData?.busName || busData?.name,
          route: `${searchParams?.fromCity || busData?.departureLocation} → ${searchParams?.toCity || busData?.arrivalLocation}`,
          departureTime: busData?.departureTime,
          arrivalTime: busData?.arrivalTime,
          totalSeats: departureSeats.length,
          farePerSeat: seatPrice,
          totalFare: departurePrice,
          origin: searchParams?.fromCity || busData?.departureLocation || 'Kathmandu',
          destination: searchParams?.toCity || busData?.arrivalLocation || 'Birgunj'
        }
      };
      
      navigationState.return = {
        selectedSeats: returnSeats,
        totalPrice: returnPrice,
        bookingDetails: {
          busId: busData?.originalData?.busId || busData?.id || busId,
          busName: busData?.busName || busData?.name,
          route: `${searchParams?.toCity || busData?.arrivalLocation} → ${searchParams?.fromCity || busData?.departureLocation}`,
          departureTime: busData?.arrivalTime, // Swapped for return
          arrivalTime: busData?.departureTime, // Swapped for return
          totalSeats: returnSeats.length,
          farePerSeat: seatPrice,
          totalFare: returnPrice,
          origin: searchParams?.toCity || busData?.arrivalLocation || 'Birgunj',
          destination: searchParams?.fromCity || busData?.departureLocation || 'Kathmandu'
        }
      };
    } else {
      // One-way booking data (existing structure)
      navigationState.selectedSeats = selectedSeats;
      navigationState.bookingDetails = {
        busId: busData?.originalData?.busId || busData?.id || busId,
        busName: busData?.busName || busData?.name,
        route: `${searchParams?.fromCity || busData?.departureLocation} → ${searchParams?.toCity || busData?.arrivalLocation}`,
        departureTime: busData?.departureTime,
        arrivalTime: busData?.arrivalTime,
        totalSeats: selectedSeats.length,
        farePerSeat: seatPrice,
        totalFare: totalPrice,
        origin: searchParams?.fromCity || busData?.departureLocation || 'Kathmandu',
        destination: searchParams?.toCity || busData?.arrivalLocation || 'Birgunj'
      };
    }

    navigate('/passenger-detail', { state: navigationState });

    // Show success message
    const successMessage = isRoundTrip 
      ? `Round-trip seats selected: Departure ${departureSeats.join(', ')} | Return ${returnSeats.join(', ')}`
      : `Seats ${selectedSeats.join(', ')} selected successfully!`;
    toast.success(successMessage);
  };

  const bookSeats = async (selectedSeats) => {
    try {
      // Simulate API call with dummy data
      console.log('Booking seats:', selectedSeats, 'for bus:', busId);
      
      // Simulate a successful response - replace with real API call
      const response = {
        success: true,
        bookedSeats: selectedSeats,
        busId: busId,
        totalPrice: selectedSeats.length * seatPrice,
        bookingId: `BK${Date.now()}`
      };
      
      console.log('Booking successful:', response);
      return response;
    } catch (error) {
      console.error('Error booking seats:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Round Trip Navigation Tabs - Only show if round trip */}
      {isRoundTrip && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab('departure')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 ${
                activeTab === 'departure'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>For Departure</span>
                {departureSeats.length > 0 && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {departureSeats.length}
                  </span>
                )}
              </div>
              <div className="text-sm mt-1 opacity-80">
                {searchParams?.fromCity || 'Kathmandu'} → {searchParams?.toCity || 'Birgunj'}
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('return')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-200 ${
                activeTab === 'return'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>For Return</span>
                {returnSeats.length > 0 && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {returnSeats.length}
                  </span>
                )}
              </div>
              <div className="text-sm mt-1 opacity-80">
                {searchParams?.toCity || 'Birgunj'} → {searchParams?.fromCity || 'Kathmandu'}
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Seat Selection Card - increased height for larger centered seats */}
      <Card className="mb-6 min-h-[550px] w-full relative shadow-lg border border-gray-200 rounded-xl bg-white overflow-hidden">
        {/* Current Journey Header - Only show for round trip */}
        {isRoundTrip && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${activeTab === 'departure' ? 'bg-blue-600' : 'bg-green-600'}`}></div>
                <h4 className="text-lg font-semibold text-gray-800 capitalize">
                  {activeTab} Journey - Select Your Seats
                </h4>
              </div>
              <div className="text-sm text-gray-600">
                {activeTab === 'departure' 
                  ? `${searchParams?.fromCity || 'Kathmandu'} → ${searchParams?.toCity || 'Birgunj'}`
                  : `${searchParams?.toCity || 'Birgunj'} → ${searchParams?.fromCity || 'Kathmandu'}`
                }
              </div>
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
            <img 
              src="/images/img_mdicarseat.svg" 
              alt="Seat icon" 
              className="w-10 h-10"
            />
            <span className="text-lg font-bold text-green-600">
              {availableSeatsCount} Seats left
            </span>
          </div>
        </div>

        {/* Seat Map - Centered seat group with larger seats */}
        <div className="relative ml-18 px-6 pb-8 min-h-[410px] bg-gradient-to-b from-gray-50 to-white rounded-lg">
          {/* Bus outline for visual context - optimized dimensions */}
          <div className="absolute  inset-x-6 top-4 bottom-4 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/30"></div>
          
          {/* Driver section indicator - positioned within bus outline */}
          <div className="absolute top-8 left-12 bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Driver
          </div>
          {/* Render all seats */}
          {Object.keys(seatConfig).length > 0 && Object.values(seatConfig).flat().map((seat) => {
            const isSelected = selectedSeats.includes(seat.id);
            const currentType = isSelected ? 'selected' : seat.type;
            
            return (
              <div
              
                key={seat.id}
                className={`absolute transition-all duration-200 ease-in-out cursor-pointer  group ${
                  currentType === 'booked' 
                    ? 'cursor-not-allowed opacity-80' 
                    : 'hover:scale-110 hover:z-10 hover:shadow-lg'
                }`}
                style={{
                  left: `${seat.position.x + 25 + 70}px`,
                  top: `${seat.position.y + 17}px`,
                }}
                onClick={() => handleSeatClick(seat.id, seat.type)}
                title={`Seat ${seat.id} - ${currentType.charAt(0).toUpperCase() + currentType.slice(1)}`}
              >
                <div className="relative flex flex-col items-center">
                  {/* Seat container with improved styling - increased size by 3px */}
                  <div className={`
                    relative w-[48px] h-[48px] rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm
                    ${currentType === 'booked' 
                      ? 'opacity-70' 
                      : currentType === 'selected'
                      ? 'ring-2 ring-blue-400 ring-offset-1 shadow-blue-200 shadow-md scale-105'
                      : 'hover:shadow-md'
                    }
                  `}>
                    <img
                      src={getSeatIcon(seat.type, isSelected)}
                      alt={`Seat ${seat.id}`}
                      className="w-[40px] h-[40px]"
                    />
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Seat label */}
                  <span className={`
                    mt-1 text-[10px] font-semibold transition-all duration-200
                    ${currentType === 'selected' ? 'text-blue-700' : 'text-gray-600'}
                  `}>
                    {seat.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Selected Seats and Proceed Card */}
      <Card className="h-auto w-full shadow-lg border border-gray-200 rounded-xl bg-white">
        <div className="flex items-center justify-between h-full px-6 py-6">
          <div className="flex-1">
            {isRoundTrip ? (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Round Trip Selection
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-600 w-20">Departure:</span>
                    <p className="text-lg font-bold text-green-600">
                      {departureSeats.length > 0 ? departureSeats.join(', ') : 'None selected'}
                    </p>
                    {departureSeats.length > 0 && (
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {departureSeats.length} seat{departureSeats.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-600 w-20">Return:</span>
                    <p className="text-lg font-bold text-green-600">
                      {returnSeats.length > 0 ? returnSeats.join(', ') : 'None selected'}
                    </p>
                    {returnSeats.length > 0 && (
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {returnSeats.length} seat{returnSeats.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Selected Seat(s)
                </h3>
                <div className="flex items-center space-x-4">
                  <p className="text-xl font-bold text-green-600">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
                  </p>
                  {selectedSeats.length > 0 && (
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 mb-1">
                {isRoundTrip ? 'Total Amount (Round Trip)' : 'Total Amount'}
              </p>
              <span className="text-2xl font-bold text-gray-800">
                Rs. {totalPrice.toLocaleString()}
              </span>
              {isRoundTrip && (
                <div className="text-xs text-gray-500 mt-1">
                  Departure: Rs. {departurePrice.toLocaleString()} | Return: Rs. {returnPrice.toLocaleString()}
                </div>
              )}
            </div>
            
            <Button
              onClick={handleProceedToPassengerDetails}
              className={`
                px-8 py-3 text-base font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2
                ${(isRoundTrip ? (departureSeats.length === 0 || returnSeats.length === 0) : selectedSeats.length === 0)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                }
              `}
              disabled={isRoundTrip ? (departureSeats.length === 0 || returnSeats.length === 0) : selectedSeats.length === 0}
            >
              <span>Go to passenger details</span>
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InlineSeatSelection;
