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


const InlineSeatSelection = ({ 
  busData, 
  busId, 
  searchParams = {}, 
  travelDate,
  tripType = 'oneWay',
  activeTab = 'departure',
  departureSeats = [],
  returnSeats = [],
  departureBusData = null,
  returnBusData = null,
  setDepartureSeats = () => {},
  setReturnSeats = () => {},
  setDepartureBusData = () => {},
  setReturnBusData = () => {},
  formData = {},
  onTabChange = () => {} // Add function to handle tab change
}) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableSeatsCount, setAvailableSeatsCount] = useState(0);
  const [seatConfig, setSeatConfig] = useState({});
  const [isLoadingSeats, setIsLoadingSeats] = useState(true); // Start with loading true
  const [seatLoadingProgress, setSeatLoadingProgress] = useState(0);
  const [showSeatReveal, setShowSeatReveal] = useState(false);
  
  // Get dynamic seat price from bus data, fallback to 2000
  const seatPrice = parseInt(busData?.fair || busData?.fare || busData?.price || 2000);
  
  // Update seat selection when seats change
  useEffect(() => {
    if (tripType === 'twoWay') {
      if (activeTab === 'departure') {
        setSelectedSeats(departureSeats);
        setTotalPrice(departureSeats.length * seatPrice);
      } else {
        setSelectedSeats(returnSeats);
        setTotalPrice(returnSeats.length * seatPrice);
      }
    }
  }, [departureSeats, returnSeats, activeTab, tripType, seatPrice]);
  
  // This useEffect will refresh booked seats whenever:
  // - busData changes (different bus selected)
  // - searchParams change (date, route, or other search criteria changed)
  // - travelDate changes (date picker updated)  // This ensures seat availability is always current
  useEffect(() => {
    const fetchBookedSeats = async () => {
      setIsLoadingSeats(true);
      setSeatLoadingProgress(0);
      setShowSeatReveal(false);
      
      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setSeatLoadingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);
      
      try {
        // Format date and destination
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
        console.log('Current travel date:', currentTravelDate);
        let destination = searchParams.toCity || searchParams.to || busData.route?.to || busData.destination || busData.arrivalLocation || 'kathmandu';
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
        
        console.log('SETTING BOOKED SEATS:', bookedSeatNumbers);
        setBookedSeats(bookedSeatNumbers);
        
        // Complete the loading progress
        setSeatLoadingProgress(100);
        
        // Show seat reveal animation after a brief delay
        setTimeout(() => {
          setShowSeatReveal(true);
        }, 200);
        
      } catch (error) {
        console.error('❌ SEAT API ERROR:', error.message);
        console.log('Error loading seat data - showing all seats as available');
        
        // On error, show all seats as available instead of mock data
        setBookedSeats([]);
        setSeatLoadingProgress(100);
        setTimeout(() => {
          setShowSeatReveal(true);
        }, 200);
        
        // Show error message to user
        toast.error('Failed to load seat availability. Please try again.');
      } finally {
        // Complete loading after seat reveal animation
        setTimeout(() => {
          setIsLoadingSeats(false);
        }, 400);
      }
    };
    
    fetchBookedSeats();
  }, [busData, searchParams, travelDate]); // Add searchParams and travelDate as dependencies
  
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


    
    console.log('Generated seat config for A5:', config.row5.find(seat => seat.id === 'A5'));
    console.log('Generated seat config for A7:', config.row5.find(seat => seat.id === 'A7'));
    
    setSeatConfig(config);
    
    // Calculate available seats count to match the bus listing format
    const totalSeats = 39; // Total seats in the bus layout
    const bookedSeatsCount = bookedSeats.length;
    const availableCount = totalSeats - bookedSeatsCount;
    
    setAvailableSeatsCount(availableCount);
    
    console.log('Seat Statistics:');
    console.log('   Total seats:', totalSeats);
    console.log('   Booked seats count:', bookedSeatsCount);
    console.log('   Available seats count:', availableCount);
    console.log('   Bus data available seats:', busData.availableSeats);
    console.log('SEAT CONFIGURATION COMPLETED');
  }, [busId, busData, bookedSeats]);

  // Calculate available seats and update price when selectedSeats change
  useEffect(() => {
    if (Object.keys(seatConfig).length > 0) {
      // Update total price based on selected seats
      setTotalPrice(selectedSeats.length * seatPrice);
    }
  }, [selectedSeats, seatConfig]);

  useEffect(() => {
    console.log('Bus data is missing or incomplete:', busData);
  }, [busData, bookedSeats]); // Add bookedSeats as dependency

  const handleSeatClick = (seatId, seatType) => {
    if (seatType === 'booked') return;
    
    let newSelectedSeats;
    if (selectedSeats.includes(seatId)) {
      newSelectedSeats = selectedSeats.filter(seat => seat !== seatId);
    } else {
      newSelectedSeats = [...selectedSeats, seatId];
    }
    
    setSelectedSeats(newSelectedSeats);
    
    // Update the appropriate state based on trip type and active tab
    if (tripType === 'twoWay') {
      if (activeTab === 'departure') {
        setDepartureSeats(newSelectedSeats);
        if (newSelectedSeats.length > 0) {
          setDepartureBusData(busData);
        }
      } else {
        setReturnSeats(newSelectedSeats);
        if (newSelectedSeats.length > 0) {
          setReturnBusData(busData);
        }
      }
    }
  };

  const getSeatIcon = (seatType, isSelected) => {
    if (seatType === 'booked') return '/images/img_mdicarseat_red_300_01.svg';
    if (isSelected) return '/images/img_mdicarseat_blue_gray_500.svg';
    return '/images/img_mdicarseat_gray_400.svg';
  };

  const handleProceedToPassengerDetails = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat to continue.');
      return;
    }

    // For two-way trips, validate both departure and return seats
    if (tripType === 'twoWay') {
      if (departureSeats.length === 0) {
        toast.error('Please select seats for departure journey first.');
        return;
      }
      if (returnSeats.length === 0) {
        toast.error('Please select seats for return journey to continue.');
        return;
      }
      if (!departureBusData || !returnBusData) {
        toast.error('Please complete seat selection for both journeys.');
        return;
      }
    }

    console.log('🎯 Proceeding to passenger details with data:', {
      selectedSeats: tripType === 'twoWay' ? departureSeats : selectedSeats,
      busData: tripType === 'twoWay' ? departureBusData : busData,
      returnSeats: tripType === 'twoWay' ? returnSeats : null,
      returnBusData: tripType === 'twoWay' ? returnBusData : null,
      searchParams,
      travelDate,
      totalPrice: tripType === 'twoWay' ? (departureSeats.length * seatPrice) + (returnSeats.length * seatPrice) : totalPrice
    });

    // 🔥 FIX: Navigate with complete data structure
    navigate('/passenger-detail', {
      state: {
        selectedSeats: tripType === 'twoWay' ? departureSeats : selectedSeats,        // ["A5", "B7"] - actual selected seats
        busData: tripType === 'twoWay' ? departureBusData : busData,                    // Complete bus information
        returnSeats: tripType === 'twoWay' ? returnSeats : null,        // Return seats for two-way trips
        returnBusData: tripType === 'twoWay' ? returnBusData : null,    // Return bus data for two-way trips
        returnTravelDate: tripType === 'twoWay' ? formData.returnDate : null, // Return travel date
        searchParams: searchParams,          // Search parameters (from/to cities, etc.)
        travelDate: travelDate,              // Travel date
        totalPrice: tripType === 'twoWay' ? (departureSeats.length * seatPrice) + (returnSeats.length * seatPrice) : totalPrice,              // Total calculated price
        seatPrice: seatPrice,                // Price per seat (2000)
        tripType: tripType,                  // Trip type (oneWay/twoWay)
        bookingDetails: {
          busId: busData?.originalData?.busId || busData?.id || busId,
          busName: busData?.busName || busData?.name,
          route: `${searchParams?.fromCity || busData?.departureLocation} → ${searchParams?.toCity || busData?.arrivalLocation}`,
          departureTime: busData?.departureTime,
          arrivalTime: busData?.arrivalTime,
          totalSeats: tripType === 'twoWay' ? departureSeats.length : selectedSeats.length,
          farePerSeat: seatPrice,
          totalFare: tripType === 'twoWay' ? (departureSeats.length * seatPrice) + (returnSeats.length * seatPrice) : totalPrice,
          origin: searchParams?.fromCity || busData?.departureLocation || 'Kathmandu',
          destination: searchParams?.toCity || busData?.arrivalLocation || 'Birgunj'
        }
      }
    });

    // Show success message
    const seatsMessage = tripType === 'twoWay' 
      ? `Departure seats ${departureSeats.join(', ')} and return seats ${returnSeats.join(', ')} selected successfully!`
      : `Seats ${selectedSeats.join(', ')} selected successfully!`;
    toast.success(seatsMessage);
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
      {/* Seat Selection Card - increased height for larger centered seats */}
      <Card className="mb-6 min-h-[550px] w-full relative shadow-lg border border-gray-200 rounded-xl bg-white overflow-hidden">
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
          
          <div className={`flex items-center space-x-2 bg-green-50 px-4 py-4 rounded-full border border-green-200 transition-all duration-300 ${
            isLoadingSeats ? 'opacity-50 animate-pulse' : 'opacity-100'
          }`}>
            <img 
              src="/images/img_mdicarseat.svg" 
              alt="Seat icon" 
              className="w-10 h-10"
            />
            <span className="text-lg font-bold text-green-600">
              {isLoadingSeats ? 'Loading...' : `${availableSeatsCount} Seats left`}
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

          {/* Loading overlay */}
          {isLoadingSeats && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
              <div className="flex flex-col items-center space-y-4">
                {/* Animated loading spinner */}
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-blue-400 rounded-full animate-ping"></div>
                  {/* Seat icon in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 18v3h3v-3h10v3h3v-3h1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H2c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h2zm16-8v6H4V10h16z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Loading text with progress */}
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Loading seat availability...
                  </p>
                  <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
                      style={{ width: `${seatLoadingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {seatLoadingProgress}% complete
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Seat skeleton loader */}
          {isLoadingSeats && (
            <div className="absolute inset-6 top-20">
              {/* Skeleton seats arranged in typical bus layout */}
              <div className="grid grid-cols-10 gap-4 opacity-30">
                {Array.from({ length: 40 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationDuration: '1.5s'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Render all seats with reveal animation */}
          {Object.keys(seatConfig).length > 0 && !isLoadingSeats && Object.values(seatConfig).flat().map((seat, index) => {
            const isSelected = selectedSeats.includes(seat.id);
            const currentType = isSelected ? 'selected' : seat.type;
            
            return (
              <div
                key={seat.id}
                className={`absolute transition-all duration-300 ease-in-out cursor-pointer group ${
                  currentType === 'booked' 
                    ? 'cursor-not-allowed opacity-80' 
                    : 'hover:scale-110 hover:z-10 hover:shadow-lg'
                } ${
                  showSeatReveal 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-2'
                }`}
                style={{
                  left: `${seat.position.x + 25 + 70}px`,
                  top: `${seat.position.y + 17}px`,
                  transitionDelay: `${index * 0.03}s`, // Staggered reveal animation
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
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
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

      {/* Selected Seats and Proceed Card - Exact copy from SeatSelection.jsx */}
      <Card className="h-auto w-full shadow-lg border border-gray-200 rounded-xl bg-white">
        <div className="flex items-center justify-between h-full px-6 py-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Selected Seat(s)
              {tripType === 'twoWay' && (
                <span className="text-sm font-medium text-gray-600 ml-2">
                  ({activeTab === 'departure' ? 'Departure' : 'Return'})
                </span>
              )}
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
            
            {/* Two-Way Progress Indicator */}
            {tripType === 'twoWay' && (
              <div className="mt-3 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${departureSeats.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">
                    Departure: {departureSeats.length > 0 ? departureSeats.join(', ') : 'Not selected'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${returnSeats.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">
                    Return: {returnSeats.length > 0 ? returnSeats.join(', ') : 'Not selected'}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Amount
                {tripType === 'twoWay' && (
                  <span className="text-xs text-gray-500 block">
                    (Both journeys)
                  </span>
                )}
              </p>
              <span className="text-2xl font-bold text-gray-800">
                Rs. {(tripType === 'twoWay' 
                  ? (departureSeats.length * seatPrice) + (returnSeats.length * seatPrice)
                  : totalPrice
                ).toLocaleString()}
              </span>
              {tripType === 'twoWay' && (
                <div className="text-xs text-gray-500 mt-1">
                  <div>Departure: Rs. {(departureSeats.length * seatPrice).toLocaleString()}</div>
                  <div>Return: Rs. {(returnSeats.length * seatPrice).toLocaleString()}</div>
                </div>
              )}
            </div>
            
            {/* Smart Button - Show different buttons based on trip type and tab */}
            {tripType === 'twoWay' && activeTab === 'departure' && selectedSeats.length > 0 ? (
              // Show "For Return" button when departure seats are selected
              <Button
                onClick={() => onTabChange('return')}
                className="px-8 py-3 text-base font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>For Return</span>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            ) : (
              // Show "Go to passenger details" button for all other cases
              <Button
                onClick={handleProceedToPassengerDetails}
                className={`
                  px-8 py-3 text-base font-semibold rounded-lg transition-all duration-200 flex items-center space-x-2
                  ${(selectedSeats.length === 0 || isLoadingSeats || 
                    (tripType === 'twoWay' && (departureSeats.length === 0 || returnSeats.length === 0)))
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }
                `}
                disabled={selectedSeats.length === 0 || isLoadingSeats || 
                         (tripType === 'twoWay' && (departureSeats.length === 0 || returnSeats.length === 0))}
              >
                <span>
                  {tripType === 'twoWay' && (departureSeats.length === 0 || returnSeats.length === 0)
                    ? 'Select seats for both journeys'
                    : 'Go to passenger details'
                  }
                </span>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            )}          </div>
        </div>
      </Card>
    </div>
  );
};

export default InlineSeatSelection;
