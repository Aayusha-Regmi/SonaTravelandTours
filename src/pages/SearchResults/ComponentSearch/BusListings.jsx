import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Chip from './Chip';
import api from '../../../services/api';
import InlineSeatSelection from './InlineSeatSelection';

// Utility function to convert time string to minutes for comparison
const timeToMinutes = (timeString) => {
  if (!timeString) return 0;
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

// Utility function to format time for display
const formatTimeForDisplay = (timeString) => {
  if (!timeString) return '';
  
  // Check if time is already in proper format
  if (timeString.includes(':')) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  
  return timeString; // Return as is if not in expected format
};

// Utility function to calculate duration between departure and arrival
const calculateDuration = (departureTime, arrivalTime) => {
  if (!departureTime || !arrivalTime) return '';
  
  const departureMinutes = timeToMinutes(departureTime);
  let arrivalMinutes = timeToMinutes(arrivalTime);
  
  // Handle overnight journeys
  if (arrivalMinutes < departureMinutes) {
    arrivalMinutes += 24 * 60; // Add 24 hours
  }
  
  const durationMinutes = arrivalMinutes - departureMinutes;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`.trim();
};

const BusListings = ({ 
  buses = [], 
  isLoading = false, 
  totalBuses = 0, 
  travelDate = '', 
  onSearchAgain,
  // Search parameters for seat refresh
  searchParams = {},
  // Two-way trip props
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
  onTabChange = () => {}, // Add tab change handler
  // Add filter props
  selectedBoardingPlaces = [],
  selectedDroppingPlaces = [],
  selectedBusTypes = [],
  selectedFacilities = [],
  selectedRatings = [],
  selectedDepartureTime = '',
  priceRange = [0, 5000],
  // State setters from parent
  setSelectedBoardingPlaces,
  setSelectedDroppingPlaces,
  setSelectedBusTypes,
  setSelectedFacilities,
  setSelectedRatings,
  setSelectedDepartureTime,
  setPriceRange,
  // Add function to clear filters
  onClearFilters = () => {}
}) => {
  const navigate = useNavigate();
  const [expandedFacilities, setExpandedFacilities] = useState({});
  const [hoveredFacilities, setHoveredFacilities] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  
  // State for inline seat selection
  const [selectedBusForSeats, setSelectedBusForSeats] = useState(null);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
    // Calculate if filters are applied
  const hasFilters = useMemo(() => {
    return selectedBoardingPlaces.length > 0 || 
           selectedDroppingPlaces.length > 0 || 
           selectedBusTypes.length > 0 || 
           selectedFacilities.length > 0 || 
           selectedRatings.length > 0 ||
           selectedDepartureTime !== '' ||
           priceRange[0] > 500 || 
           priceRange[1] < 2000; // Assuming default range is [500, 2000]
  }, [selectedBoardingPlaces, selectedDroppingPlaces, selectedBusTypes, selectedFacilities, selectedRatings, selectedDepartureTime, priceRange]);

  // Format the travel date for display
  const formattedDate = useMemo(() => {
    if (!travelDate) return '';
    try {
      const date = new Date(travelDate);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return travelDate;
    }
  }, [travelDate]);  // Process and normalize bus data from API response
  // Expected API response format from /bus/search:
  // {
  //   "statusCode": 200,
  //   "success": true,
  //   "message": "Data Retrieved successfully",
  //   "data": [
  //     {
  //       "busId": 102,
  //       "busNumber": "BA-PRA01-006-5529",
  //       "busName": "Sona Travel A/C",
  //       "baseOrigin": "birgunj",
  //       "baseDestination": "kathmandu",
  //       "baseDate": "2023-02-22T00:00:00.000Z",
  //       "secondaryBusNumber": "ST 5529",
  //       "fair": 1100,
  //       "status": true,
  //       "routes": "Kalaiya,Birgunj,Simara,Hetauda,Chitwan,Thankot,Kalanki,Balaju,Chabahil,Koteshwor,Sallaghari,Banepa",
  //       "facilities": "Front Rear protection sensors,IR camera,Orthopaedic Seats,GPS Location,Airbag seats,BS IV engine,Automatic air suspension",
  //       "description": "This bus is a normal bus",
  //       "bookedSeats": 9,
  //       "availableSeats": 34
  //     }
  //   ]
  // }
  const busData = useMemo(() => {
    if (buses.length === 0) return [];
      return buses.map(bus => {      // Use busId from API response (primary identifier)
      const busId = bus.busId || bus.id || bus._id ;
      
      // Use API field names: busName, secondaryBusNumber
      const busName = bus.busName || bus.name || bus.operatorName || null;
      const busNumber = bus.secondaryBusNumber || bus.busNumber || bus.vehicleNumber || null;

      // Extract and normalize times
      const depTime = bus.departureTime || bus.departure_time || '16:00';
      const arrTime = bus.arrivalTime || bus.arrival_time || '20:50';
      
      // Calculate duration if not provided
      const duration = bus.duration || calculateDuration(depTime, arrTime);
      
      // Format display times with AM/PM
      const formattedDepartureTime = formatTimeForDisplay(depTime);
      const formattedArrivalTime = formatTimeForDisplay(arrTime);
      
      // Determine if it's a night journey (departure after 6 PM)
      const departureMinutes = timeToMinutes(depTime);
      const isNightJourney = departureMinutes >= timeToMinutes('18:00');
      
      // Determine if it's an early morning journey (departure before 8 AM)
      const isEarlyMorning = departureMinutes < timeToMinutes('08:00');
      
      // Use available seats from API response (NOT generated) - this is the key change
      const availableSeats = bus.availableSeats || 0;
      
      // Parse facilities from comma-separated string or use array
      const facilities = typeof bus.facilities === 'string' 
        ? bus.facilities.split(',').map(f => f.trim())
        : bus.facilities || ['WiFi', 'AC', 'Charging Point'];
      
      // Return the processed bus object
      return {
        id: busId,
        name: busName,
        busNumber: busNumber,
        type: bus.busType || bus.type || 'AC Sleeper',
        departureTime: depTime,
        arrivalTime: arrTime,
        departureTimeFormatted: formattedDepartureTime,
        arrivalTimeFormatted: formattedArrivalTime,
        duration: duration,
        price: `Rs. ${bus.fair || bus.fare || bus.price || 1100}`, // Use 'fair' from API
        priceUnit: '/seat',
        rating: bus.rating || 4.2,
        availableSeats: availableSeats, // From API response - critical for accurate seat count
        bookedSeats: bus.bookedSeats || 0, // Also from API
        facilities: facilities,
        routes: bus.routes || '', // Routes as comma-separated string from API
        departureLocation: bus.baseOrigin || bus.origin || 'Departure Point',
        arrivalLocation: bus.baseDestination || bus.destination || 'Arrival Point',
        boardingPoints: bus.boardingPoints || bus.boarding_points || [],
        droppingPoints: bus.droppingPoints || bus.dropping_points || [],
        isNightJourney,
        isEarlyMorning,
        // Include all original bus data for seat selection and other components
        ...bus
      };
    });
  }, [buses]);

  // Component helper functions
  const toggleFacilities = (index) => {
    setExpandedFacilities(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleBookNow = (bus) => {
    console.log('Navigating to seat selection for bus:', bus);
    if (!bus || !bus.id) {
      console.error('Bus data or ID is missing:', bus);
      return;
    }
    navigate(`/select-seats/${bus.id}`, { 
      state: { bus: bus }
    });
  };
  
  // Handle seat selection - show inline seat selection
  const handleSelectSeats = (bus) => {
    console.log('Select Seats clicked for bus:', bus);
    
    // If same bus is clicked, toggle off
    if (selectedBusForSeats && selectedBusForSeats.id === bus.id) {
      setSelectedBusForSeats(null);
      setShowSeatSelection(false);
      return;
    }
    
    // Set new bus and show seat selection
    setSelectedBusForSeats(bus);
    setShowSeatSelection(true);
    
    // Smooth scroll to seat selection after state update
    setTimeout(() => {
      const seatCard = document.getElementById(`seat-selection-${bus.id}`);
      if (seatCard) {
        seatCard.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
      }
    }, 100);
  };// Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-sm w-full border border-gray-100">
        <div className="animate-spin mb-4">
          <svg className="w-10 h-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-base font-medium text-gray-600">Searching for buses...</p>
      </div>
    );
  }  // Handler for search button click
  const handleSearchClick = () => {
    setIsSearching(true);
    if (onSearchAgain) {
      Promise.resolve(onSearchAgain())
        .finally(() => {
          setIsSearching(false);
        });
    } else {
      navigate('/');
      setIsSearching(false);
    }
  };
console.log('🚌 BusListings received props:', { 
  buses, 
  busesLength: buses.length,
  firstBusAvailableSeats: buses[0]?.availableSeats,
  firstBusBookedSeats: buses[0]?.bookedSeats 
});
  return (
    <div className="space-y-4">
      {/* Filter summary display with removable filters */}
      {hasFilters && (
        <div className="bg-blue-50 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex-1 mb-2 md:mb-0">
            <span className="text-sm text-blue-800 font-medium">
              Filtered By:
            </span>            <div className="flex flex-wrap gap-2 mt-1">
              {selectedDepartureTime && (
                <span 
                  className="bg-white text-blue-800 text-xs font-medium rounded-full px-3 py-1 border border-blue-200 flex items-center"
                >
                  <span>Departure: {selectedDepartureTime}</span>
                  <button 
                    onClick={() => {
                      if (typeof setSelectedDepartureTime === 'function') {
                        setSelectedDepartureTime('');
                        if (onSearchAgain) {
                          setTimeout(() => onSearchAgain(), 300);
                        }
                      }
                    }}
                    className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label={`Remove ${selectedDepartureTime} filter`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              {selectedBoardingPlaces.map((place, index) => (
                <span 
                  key={`boarding-${index}`}
                  className="bg-white text-blue-800 text-xs font-medium rounded-full px-3 py-1 border border-blue-200 flex items-center"
                >
                  <span>Boarding: {place}</span>                  <button 
                    onClick={() => {
                      const newPlaces = selectedBoardingPlaces.filter(p => p !== place);
                      if (typeof setSelectedBoardingPlaces === 'function') {
                        setSelectedBoardingPlaces(newPlaces);
                        if (onSearchAgain) {
                          onSearchAgain();
                        }
                      }
                    }}
                    className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label={`Remove ${place} filter`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
              
              {selectedDroppingPlaces.map((place, index) => (
                <span 
                  key={`dropping-${index}`}
                  className="bg-white text-blue-800 text-xs font-medium rounded-full px-3 py-1 border border-blue-200 flex items-center"
                >
                  <span>Dropping: {place}</span>                  <button 
                    onClick={() => {
                      const newPlaces = selectedDroppingPlaces.filter(p => p !== place);
                      if (typeof setSelectedDroppingPlaces === 'function') {
                        setSelectedDroppingPlaces(newPlaces);
                        if (onSearchAgain) {
                          onSearchAgain();
                        }
                      }
                    }}
                    className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label={`Remove ${place} filter`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
              
              {selectedBusTypes.map((type, index) => (
                <span 
                  key={`type-${index}`}
                  className="bg-white text-blue-800 text-xs font-medium rounded-full px-3 py-1 border border-blue-200 flex items-center"
                >
                  <span>Type: {type}</span>                  <button 
                    onClick={() => {
                      const newTypes = selectedBusTypes.filter(t => t !== type);
                      if (typeof setSelectedBusTypes === 'function') {
                        setSelectedBusTypes(newTypes);
                        if (onSearchAgain) {
                          setTimeout(() => onSearchAgain(), 100);
                        }
                      }
                    }}
                    className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label={`Remove ${type} filter`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
              
              {selectedFacilities.map((facility, index) => (
                <span 
                  key={`facility-${index}`}
                  className="bg-white text-blue-800 text-xs font-medium rounded-full px-3 py-1 border border-blue-200 flex items-center"
                >
                  <span>Facility: {facility}</span>                  <button 
                    onClick={() => {
                      const newFacilities = selectedFacilities.filter(f => f !== facility);
                      if (typeof setSelectedFacilities === 'function') {
                        setSelectedFacilities(newFacilities);
                        if (onSearchAgain) {
                          setTimeout(() => onSearchAgain(), 200);
                        }
                      }
                    }}
                    className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label={`Remove ${facility} filter`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
              
              {selectedRatings.map((rating, index) => (
                <span 
                  key={`rating-${index}`}
                  className="bg-white text-blue-800 text-xs font-medium rounded-full px-3 py-1 border border-blue-200 flex items-center"
                >
                  <span>Rating: {rating}</span>                  <button 
                    onClick={() => {
                      const newRatings = selectedRatings.filter(r => r !== rating);
                      if (typeof setSelectedRatings === 'function') {
                        setSelectedRatings(newRatings);
                        if (onSearchAgain) {
                          setTimeout(() => onSearchAgain(), 300);
                        }
                      }
                    }}
                    className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label={`Remove ${rating} filter`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
                {(priceRange[0] > 500 || priceRange[1] < 2000) && (
                <span 
                  className="bg-white text-blue-800 text-xs font-medium rounded-full px-3 py-1 border border-blue-200 flex items-center"
                >
                  <span>Price: Rs. {priceRange[0]} - Rs. {priceRange[1]}</span>
                  <button 
                    onClick={() => {
                      if (typeof setPriceRange === 'function') {
                        setPriceRange([500, 2000]); // Reset to default price range
                        if (onSearchAgain) {
                          setTimeout(() => onSearchAgain(), 300);
                        }
                      }
                    }}
                    className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label="Reset price filter"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 font-medium cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}
      
      {busData.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-sm w-full border border-gray-100">
          <img 
            src="/images/img_illustrationbus9517789629.png" 
            alt="No buses found" 
            className="w-48 h-48 mb-5 opacity-60"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Matching Buses Found</h3>
          <p className="text-gray-600 text-center max-w-md mb-6">
            {totalBuses > 0 
              ? `We found ${totalBuses} buses for this route, but none match your current filters. Try adjusting your filter criteria.` 
              : "We couldn't find any buses for this route on the selected date. Try different dates or locations."}
          </p>
          <Button
            variant="primary"
            onClick={handleSearchClick}
            disabled={isSearching}
            className={`bg-[#0a639d] text-white rounded-lg px-6 py-2.5 hover:bg-blue-700 transition-colors cursor-pointer ${isSearching ? 'opacity-80' : ''}`}
          >
            {isSearching ? 'Searching...' : 'Search Again'}          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {busData.map((bus, index) => (
            <div key={index}>
              <div className="bg-white rounded-lg p-4 md:p-6 w-full shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="flex-1">
                {/* Left column */}
                <div className="flex items-center space-x-2 mb-1">
                  <Chip variant="rating" size="small" className="h-6 rounded-full px-2 py-1">
                    <svg className="w-3 h-3 mr-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    {bus.rating}
                  </Chip>
                  <Chip variant="new" size="small" className="h-6 rounded-full px-2 py-1">
                    New
                  </Chip>
                </div>                {/* Bus Name and Type */}
                <h3 className="text-lg font-bold text-gray-800 mb-0.5">
                  {bus.name}
                  <span className="text-sm font-medium text-gray-600 ml-2">({bus.busNumber})</span>
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {bus.type}
                </p>              {/* Journey Details */}
                <div className="flex items-center mb-6">                {/* Departure */}
                  <div className="text-left min-h-[80px] flex flex-col">
                    <div className="text-xl font-bold text-gray-800">
                      {bus.departureTimeFormatted}
                    </div>
                    <div className="text-xs text-gray-500">
                      {bus.departureLocation}
                    </div>
                    <div className="mt-auto">
                      {bus.isEarlyMorning && (
                        <span className="inline-block mt-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                          Early Morning
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Journey Line with duration */}
                  <div className="flex items-center mx-4 flex-1">
                    <div className="h-[1px] bg-red-200 flex-1"></div>
                    <div className="relative mx-2">
                      <img 
                        src="/images/img_group_red_300.svg" 
                        alt="bus" 
                        className="w-8 h-8"
                      />
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500">
                        {bus.duration}
                      </div>
                    </div>
                    <div className="h-[1px] bg-red-200 flex-1"></div>
                  </div>                {/* Arrival */}
                  <div className="text-right min-h-[80px] flex flex-col">
                    <div className="text-xl font-bold text-gray-800">
                      {bus.arrivalTimeFormatted}
                    </div>
                    <div className="text-xs text-gray-500">
                      {bus.arrivalLocation}
                    </div>
                    <div className="mt-auto">
                      {bus.isNightJourney && (
                        <span className="inline-block mt-1 bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                          Night Journey
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Price */}
              <div className="flex flex-col items-end justify-between ml-8">
                <div className="text-right">
                  <span className="text-xl font-bold text-gray-800">
                    {bus.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {bus.priceUnit}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Section with divider */}
            <div className="border-t border-gray-100 mt-4 pt-4 flex flex-wrap items-center justify-between">
              {/* Facilities */}
              <div className="flex flex-wrap items-center mb-3 lg:mb-0">
                {bus.facilities.slice(0, 2).map((facility, facilityIndex) => (
                  <span 
                    key={facilityIndex}
                    className="text-xs mr-4 text-gray-600 flex items-center"
                  >
                    • {facility}
                  </span>
                ))}
                
                {bus.facilities.length > 2 && (
                  <div 
                    className="relative"
                    onMouseEnter={() => setHoveredFacilities(prev => ({ ...prev, [index]: true }))}
                    onMouseLeave={() => setHoveredFacilities(prev => ({ ...prev, [index]: false }))}
                  >
                    <button
                      onClick={() => toggleFacilities(index)}
                      className="bg-red-400 text-white rounded-lg px-3 py-1.5 text-xs font-medium flex items-center"
                    >
                      More Facilities
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>                  {hoveredFacilities[index] && (
                      <div className="absolute z-20 top-full left-0 mt-2 w-60 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                        <div className="p-3 text-xs text-gray-600">
                          {bus.facilities.slice(2).map((facility, idx) => (
                            <div key={idx} className="flex items-center py-1.5 border-b last:border-0 border-gray-50">
                              <span className="text-red-400 mr-2 text-base">•</span>
                              <span className="leading-tight">{facility}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>              {/* Available Seats and Select Seats Button */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-green-600">
                  {bus.availableSeats > 0 
                    ? `${bus.availableSeats} seat${bus.availableSeats === 1 ? '' : 's'} available`
                    : 'No seats available'
                  }
                </span><Button 
                  variant="primary"                
                  onClick={() => {
                    console.log('Select Seats clicked for bus:', bus);
                    handleSelectSeats(bus);
                  }}
                  className={`${
                    selectedBusForSeats && selectedBusForSeats.id === bus.id 
                      ? 'bg-blue-700' 
                      : 'bg-[#0a639d]'
                  } text-white rounded-lg px-4 py-2 md:px-6 md:py-3 flex items-center justify-center hover:bg-blue-700 transition-colors`}
                >
                  <span className="text-sm md:text-lg font-medium">
                    {selectedBusForSeats && selectedBusForSeats.id === bus.id ? 'Hide Seats' : 'Select Seats'}
                  </span>
                  <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                    selectedBusForSeats && selectedBusForSeats.id === bus.id ? 'rotate-180' : ''
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Inline Seat Selection - Show only for selected bus */}
          {selectedBusForSeats && selectedBusForSeats.id === bus.id && showSeatSelection && (
            <div 
              id={`seat-selection-${bus.id}`}
              className="mt-4 animate-fadeInSlideDown"
            >              <InlineSeatSelection 
                busData={bus} 
                busId={bus.id}
                searchParams={searchParams}
                travelDate={travelDate}
                tripType={tripType}
                activeTab={activeTab}
                departureSeats={departureSeats}
                returnSeats={returnSeats}
                departureBusData={departureBusData}
                returnBusData={returnBusData}
                setDepartureSeats={setDepartureSeats}
                setReturnSeats={setReturnSeats}
                setDepartureBusData={setDepartureBusData}
                setReturnBusData={setReturnBusData}
                formData={formData}
                onTabChange={onTabChange}
              /></div>
          )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
      }

export default BusListings;