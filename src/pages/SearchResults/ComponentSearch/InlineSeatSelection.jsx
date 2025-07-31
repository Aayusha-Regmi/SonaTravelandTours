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
  const busseatPrice = parseInt(busData?.fair || busData?.fare || busData?.price || 2000);
  const seatPrice = busseatPrice - 0.13*busseatPrice;
  const vatAmount = busseatPrice*0.13;
  // Update seat selection when seats change
  useEffect(() => {
    if (tripType === 'twoWay') {
      if (activeTab === 'departure') {
        setSelectedSeats(departureSeats);
        setTotalPrice(departureSeats.length * (seatPrice + vatAmount));
      } else {
        setSelectedSeats(returnSeats);
        setTotalPrice(returnSeats.length * (seatPrice + vatAmount));
      }
    }
  }, [departureSeats, returnSeats, activeTab, tripType, seatPrice, vatAmount]);
  
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
      
        let destination = searchParams.toCity || searchParams.to || busData.route?.to || busData.destination || busData.arrivalLocation || 'kathmandu';
        destination = destination.toLowerCase().trim();
        
        const apiUrl = API_URLS.BUS.DETAILS;
        
        // Only make API request if user is authenticated
        if (!isAuthenticated()) {
          // User not authenticated, cannot fetch seat details
          setBookedSeats([]);
          return;
        }
        
        const requestBody = {
          travelDate: currentTravelDate,
          destination: destination
        };
        
       
        
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
        
        
        
        
        setBookedSeats(bookedSeatNumbers);
        
        // Complete the loading progress
        setSeatLoadingProgress(100);
        
        // Show seat reveal animation after a brief delay
        setTimeout(() => {
          setShowSeatReveal(true);
        }, 200);
        
      } catch (error) {
        console.error('SEAT API ERROR:', error.message);
        
        
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
    
    // Calculate available seats count to match the bus listing format
    const totalSeats = 39; // Total seats in the bus layout
    const bookedSeatsCount = bookedSeats.length;
    const availableCount = totalSeats - bookedSeatsCount;
    
    setAvailableSeatsCount(availableCount);
    
   
  }, [busId, busData, bookedSeats]);

  // Calculate available seats and update price when selectedSeats change
  useEffect(() => {
    if (Object.keys(seatConfig).length > 0) {
      // Update total price based on selected seats (including VAT)
      setTotalPrice(selectedSeats.length *seatPrice + selectedSeats.length*vatAmount);
    }
  }, [selectedSeats, seatConfig, seatPrice, vatAmount]);

  useEffect(() => {
   
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

   

   

   
    
    // FORCE the departure date to always be from searchParams.date for two-way trips
    const finalTravelDate = tripType === 'twoWay' 
      ? (searchParams.date || searchParams.fromDate || formData.date || travelDate)
      : travelDate;
    const finalReturnDate = tripType === 'twoWay' 
      ? (searchParams.returnDate || formData.returnDate || searchParams.to_date || searchParams.toDate) 
      : null;
    
   

  
    // 🔥 FIX: Navigate with complete data structure
    navigate('/passenger-detail', {
      state: {
        selectedSeats: tripType === 'twoWay' ? departureSeats : selectedSeats,        // ["A5", "B7"] - actual selected seats
        busData: tripType === 'twoWay' ? departureBusData : busData,                    // Complete bus information
        returnSeats: tripType === 'twoWay' ? returnSeats : null,        // Return seats for two-way trips
        returnBusData: tripType === 'twoWay' ? returnBusData : null,    // Return bus data for two-way trips
        returnTravelDate: finalReturnDate, // Use calculated return date
        searchParams: searchParams,          // Search parameters (from/to cities, etc.)
        travelDate: finalTravelDate,         // Use calculated departure date
        totalPrice: tripType === 'twoWay' ? (departureSeats.length *seatPrice + departureSeats.length *vatAmount) + (returnSeats.length *seatPrice + returnSeats.length *vatAmount) : selectedSeats.length *seatPrice + selectedSeats.length *vatAmount,              // Total calculated price including VAT
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
          totalFare: tripType === 'twoWay' ? (departureSeats.length *seatPrice + departureSeats.length *vatAmount) + (returnSeats.length *seatPrice + returnSeats.length *vatAmount) : selectedSeats.length *seatPrice + selectedSeats.length *vatAmount,
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

      
      // Simulate a successful response - replace with real API call
      const response = {
        success: true,
        bookedSeats: selectedSeats,
        busId: busId,
        totalPrice: (selectedSeats.length * seatPrice)+((0.13*seatPrice)*selectedSeats.length),
        bookingId: `BK${Date.now()}`
      };
      
    
      return response;
    } catch (error) {
      console.error('Error booking seats:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
      {/* Seat Selection Card - responsive height and design */}
      <Card className="mb-4 sm:mb-6 min-h-[600px] sm:min-h-[650px] md:min-h-[550px] lg:min-h-[550px] w-full relative shadow-lg border border-gray-200 rounded-xl bg-white overflow-hidden">
        {/* Legend - Enhanced responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 md:mb-6 px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6 space-y-2 sm:space-y-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-6 justify-center sm:justify-start">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full shadow-sm"></div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">Booked</span>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full shadow-sm"></div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">Selected</span>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-300 rounded-full shadow-sm"></div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">Available</span>
            </div>
          </div>
          
          <div className={`flex items-center space-x-1.5 sm:space-x-2 bg-green-50 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-4 rounded-full border border-green-200 transition-all duration-300 mx-auto sm:mx-0 ${
            isLoadingSeats ? 'opacity-50 animate-pulse' : 'opacity-100'
          }`}>
            <img 
              src="/images/img_mdicarseat.svg" 
              alt="Seat icon" 
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            />
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-green-600">
              {isLoadingSeats ? 'Loading...' : `${availableSeatsCount} Seats left`}
            </span>
          </div>
        </div>

        {/* Responsive Seat Map - Enhanced mobile and tablet support */}
        <div className="relative px-2 sm:px-4 md:px-6 pb-4 sm:pb-6 md:pb-8 bg-gradient-to-b from-gray-50 to-white rounded-lg">
          
          {/* Enhanced Loading overlay for mobile/tablet */}
          {isLoadingSeats && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 px-4">
                {/* Responsive animated loading spinner */}
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-3 sm:border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 border-3 sm:border-4 border-transparent border-r-blue-400 rounded-full animate-ping"></div>
                  {/* Responsive seat icon in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 18v3h3v-3h10v3h3v-3h1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H2c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h2zm16-8v6H4V10h16z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Responsive loading text with progress */}
                <div className="text-center max-w-xs sm:max-w-sm">
                  <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                    Loading seat availability...
                  </p>
                  <div className="w-40 sm:w-48 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
                      style={{ width: `${seatLoadingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {seatLoadingProgress}% complete
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile & Tablet Layout - Responsive design */}
          <div className="block lg:hidden">
            {/* Bus outline for mobile/tablet - responsive sizing */}
            <div className="relative border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/30 p-3 sm:p-6 mx-auto max-w-sm sm:max-w-md md:max-w-lg min-h-[700px] sm:min-h-[800px] md:min-h-[650px] overflow-x-auto">
              
              {/* Driver section indicator - responsive positioning */}
              <div className="absolute top-3 sm:top-4 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full shadow-md">
                Driver
              </div>

              {/* Render all seats with responsive positioning */}
              {Object.keys(seatConfig).length > 0 && !isLoadingSeats && Object.values(seatConfig).flat().map((seat, index) => {
                const isSelected = selectedSeats.includes(seat.id);
                const currentType = isSelected ? 'selected' : seat.type;
                
                // Responsive coordinate transformation for mobile/tablet
                let mobileX, mobileY;
                
                // Calculate responsive scaling factors with fallback
                const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 640;
                const isMobile = screenWidth < 640; // sm breakpoint
                const isTablet = screenWidth >= 640 && screenWidth < 1024; // lg breakpoint
                
                // Enhanced scaling factors for better mobile/tablet experience
                const scaleX = isMobile ? 1 : isTablet ? 1.15 : 1;
                const scaleY = isMobile ? 1 : isTablet ? 0.85 : 1;
                const offsetX = isMobile ? 0 : isTablet ? 15 : 0;
                const offsetY = isMobile ? 0 : isTablet ? -15 : 0;
                
                // S series seats - horizontal row at top with responsive positioning
                if (seat.id.startsWith('S')) {
                  const seatNumber = parseInt(seat.id.replace('S', ''));
                  const baseX = 55 + (seatNumber - 1) * 65;
                  mobileX = (baseX * scaleX) + offsetX;
                  mobileY = (60 * scaleY) + offsetY;
                }
                // B series seats - right column with responsive scaling
                else if (seat.id.startsWith('B')) {
                  const seatNumber = parseInt(seat.id.replace('B', ''));
                  if ([1, 2].includes(seatNumber)) {
                    const baseX = seatNumber === 1 ? 205 : 265;
                    mobileX = (baseX * scaleX) + offsetX;
                    mobileY = (160 * scaleY) + offsetY;
                  } else if ([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].includes(seatNumber)) {
                    const pairIndex = Math.floor((seatNumber - 3) / 2);
                    const isLeft = (seatNumber - 3) % 2 === 0;
                    const baseX = isLeft ? 205 : 265;
                    const baseY = 220 + (pairIndex * 60);
                    mobileX = (baseX * scaleX) + offsetX;
                    mobileY = (baseY * scaleY) + offsetY;
                  }
                }
                // A series seats - left column with responsive scaling
                else if (seat.id.startsWith('A')) {
                  const seatNumber = parseInt(seat.id.replace('A', ''));
                  if ([1, 2].includes(seatNumber)) {
                    const baseX = seatNumber === 1 ? 55 : 115;
                    mobileX = (baseX * scaleX) + offsetX;
                    mobileY = (220 * scaleY) + offsetY;
                  } else if (seatNumber === 17) {
                    const baseX = 160;
                    const baseY = 640;
                    mobileX = (baseX * scaleX) + offsetX;
                    mobileY = (baseY * scaleY) + offsetY;
                  } else if ([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19].includes(seatNumber)) {
                    const adjustedNumber = seatNumber > 17 ? seatNumber - 1 : seatNumber;
                    const pairIndex = Math.floor((adjustedNumber - 3) / 2);
                    const isLeft = (adjustedNumber - 3) % 2 === 0;
                    const baseX = isLeft ? 55 : 115;
                    const baseY = 280 + (pairIndex * 60);
                    mobileX = (baseX * scaleX) + offsetX;
                    mobileY = (baseY * scaleY) + offsetY;
                  }
                }
                // Fallback with responsive scaling
                else {
                  mobileX = (seat.position.y * 0.8 + 55) * scaleX + offsetX;
                  mobileY = (seat.position.x * 0.9 + 5) * scaleY + offsetY;
                }
                
                return (
                  <div
                    key={seat.id}
                    className={`absolute transition-all duration-300 ease-in-out cursor-pointer group touch-manipulation select-none ${
                      currentType === 'booked' 
                        ? 'cursor-not-allowed opacity-80' 
                        : 'hover:scale-110 hover:z-10 hover:shadow-lg active:scale-95 touch:active:scale-90'
                    } ${
                      showSeatReveal 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-2'
                    }`}
                    style={{
                      left: `${mobileX}px`,
                      top: `${mobileY}px`,
                      transitionDelay: `${index * 0.02}s`,
                    }}
                    onClick={() => handleSeatClick(seat.id, seat.type)}
                    onTouchStart={(e) => {
                      // Prevent scroll during seat selection on mobile
                      if (currentType !== 'booked') {
                        e.currentTarget.style.transform = 'scale(0.95)';
                      }
                    }}
                    onTouchEnd={(e) => {
                      if (currentType !== 'booked') {
                        e.currentTarget.style.transform = '';
                      }
                    }}
                    title={`Seat ${seat.id} - ${currentType.charAt(0).toUpperCase() + currentType.slice(1)}`}
                    role="button"
                    tabIndex={currentType === 'booked' ? -1 : 0}
                    aria-label={`Seat ${seat.id}, ${currentType}${isSelected ? ', selected' : ''}`}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && currentType !== 'booked') {
                        e.preventDefault();
                        handleSeatClick(seat.id, seat.type);
                      }
                    }}
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Responsive seat size */}
                      <div className={`
                        relative rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm
                        w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] md:w-[44px] md:h-[44px]
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
                          className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] md:w-[36px] md:h-[36px]"
                        />
                        
                        {isSelected && (
                          <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                            <svg className="w-1 h-1 sm:w-1.5 sm:h-1.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Responsive text */}
                      <span className={`
                        mt-0.5 sm:mt-1 text-[8px] sm:text-[9px] md:text-[10px] font-semibold transition-all duration-200
                        ${currentType === 'selected' ? 'text-blue-700' : 'text-gray-600'}
                      `}>
                        {seat.id}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Layout - Original horizontal arrangement */}
          <div className="hidden lg:block">
            {/* Bus outline for visual context */}
            <div className="relative border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/30 p-6 mx-auto max-w-5xl min-h-[410px]">
              
              {/* Driver section indicator */}
              <div className="absolute top-8 left-12 bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                Driver
              </div>

              {/* Render all seats with reveal animation - Desktop */}
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
                      transitionDelay: `${index * 0.03}s`,
                    }}
                    onClick={() => handleSeatClick(seat.id, seat.type)}
                    title={`Seat ${seat.id} - ${currentType.charAt(0).toUpperCase() + currentType.slice(1)}`}
                  >
                    <div className="relative flex flex-col items-center">
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
                        
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                            <svg className="w-2 h-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
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
          </div>
        </div>
      </Card>

      {/* Selected Seats and Proceed Card - Responsive layout */}
      <Card className="h-auto w-full shadow-lg border border-gray-200 rounded-xl bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-full px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-0">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Selected Seat(s)
              {tripType === 'twoWay' && (
                <span className="text-sm font-medium text-gray-600 ml-2">
                  ({activeTab === 'departure' ? 'Departure' : 'Return'})
                </span>
              )}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-lg sm:text-xl font-bold text-green-600">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
              </p>
              {selectedSeats.length > 0 && (
                <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                  {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            {/* Two-Way Progress Indicator */}
            {tripType === 'twoWay' && (
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${departureSeats.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-xs sm:text-sm text-gray-600">
                    Departure: {departureSeats.length > 0 ? departureSeats.join(', ') : 'Not selected'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${returnSeats.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-xs sm:text-sm text-gray-600">
                    Return: {returnSeats.length > 0 ? returnSeats.join(', ') : 'Not selected'}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
            <div className="text-center sm:text-right">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Total Amount <span className='italic text-gray-400'>(Including 13% Vat)</span>
                {tripType === 'twoWay' && (
                  <span className="text-xs text-gray-500 block">
                    (Both journeys)
                  </span>
                )}
              </p>
            
              <span className="text-xl sm:text-2xl font-bold text-gray-800">
                Rs. {(tripType === 'twoWay' 
                  ? (departureSeats.length *seatPrice + departureSeats.length*vatAmount) + (returnSeats.length *seatPrice + returnSeats.length* vatAmount)
                  : selectedSeats.length *seatPrice + selectedSeats.length*vatAmount
                ).toLocaleString()}
              </span>
              {tripType === 'twoWay' && (
                <div className="text-xs text-gray-500 mt-1">
                  <div>Departure: Rs. {(departureSeats.length *seatPrice + departureSeats.length *vatAmount).toLocaleString()}</div>
                  <div>Return: Rs. {(returnSeats.length *seatPrice + returnSeats.length *vatAmount).toLocaleString()}</div>
                </div>
              )}
            </div>
            
            {/* Smart Button - Show different buttons based on trip type and tab */}
            {tripType === 'twoWay' && activeTab === 'departure' && selectedSeats.length > 0 ? (
              // Show "For Return" button when departure seats are selected
              <Button
                onClick={() => onTabChange('return')}
                className="px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
              >
                <span>For Return</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            ) : (
              // Show "Go to passenger details" button for all other cases
              <Button
                onClick={handleProceedToPassengerDetails}
                className={`
                  px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-200 
                  flex items-center justify-center space-x-2 w-full sm:w-auto
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
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
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
