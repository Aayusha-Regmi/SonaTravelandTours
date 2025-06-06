import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Chip from './Chip';

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

const BusListings = ({ buses = [], isLoading = false, totalBuses = 0 }) => {
  const navigate = useNavigate();
  const [expandedFacilities, setExpandedFacilities] = useState({});
  
  // If no buses passed, use default data
  const busData = useMemo(() => {
    if (buses.length === 0) return [];
    
    return buses.map(bus => {
      // Ensure we have an ID for navigation
      const busId = bus.id || bus._id || `bus-${Math.random().toString(36).substr(2, 9)}`;
      
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
      
      return {
        id: busId,
        rating: bus.rating || '4.8',
        name: bus.busName || bus.name || 'Sona Express',
        type: bus.busType || bus.type || 'Tourist A/c, Delux',
        departureTime: depTime,
        departureTimeFormatted: formattedDepartureTime,
        departureLocation: bus.boardingPoint || bus.boarding_point || bus.source || 'Bus Park',
        arrivalTime: arrTime,
        arrivalTimeFormatted: formattedArrivalTime,
        arrivalLocation: bus.droppingPoint || bus.dropping_point || bus.destination || 'Bus Park',
        duration: duration,
        price: bus.price || (bus.fare ? `Rs. ${bus.fare}` : 'Rs. 1200'),
        priceUnit: '/ Seat',
        availableSeats: `${bus.availableSeats || bus.available_seats || 12} Seats Available`,
        facilities: bus.facilities || ['Heated front seats', 'Full A/C & Air Suspension'],
        isNightJourney,
        isEarlyMorning,
        
        // Store original data for passing to booking
        originalData: bus
      };
    });
  }, [buses]);

  const toggleFacilities = (index) => {
    setExpandedFacilities(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const handleBookNow = (bus) => {
    navigate(`/select-seats/${bus.id}`, { 
      state: { bus: bus.originalData || bus }
    });
  };
  // Show loading state
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
  }

  // Show empty state when no results
  if (busData.length === 0) {
    return (
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
          onClick={() => navigate('/')}
          className="bg-[#0a639d] text-white rounded-lg px-6 py-2.5 hover:bg-blue-700 transition-colors"
        >
          Search Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {busData.map((bus, index) => (
        <div key={index} className="bg-white rounded-lg p-4 md:p-6 w-full shadow-sm border border-gray-100">
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
              </div>

              {/* Bus Name and Type */}
              <h3 className="text-lg font-bold text-gray-800 mb-0.5">
                {bus.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {bus.type}
              </p>              {/* Journey Details */}
              <div className="flex items-center mb-6">
                {/* Departure */}
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-800">
                    {bus.departureTimeFormatted}
                  </div>
                  <div className="text-xs text-gray-500">
                    {bus.departureLocation}
                  </div>
                  {bus.isEarlyMorning && (
                    <span className="inline-block mt-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                      Early Morning
                    </span>
                  )}
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
                </div>

                {/* Arrival */}
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-800">
                    {bus.arrivalTimeFormatted}
                  </div>
                  <div className="text-xs text-gray-500">
                    {bus.arrivalLocation}
                  </div>
                  {bus.isNightJourney && (
                    <span className="inline-block mt-1 bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                      Night Journey
                    </span>
                  )}
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
              {bus.facilities.map((facility, facilityIndex) => (
                <span 
                  key={facilityIndex}
                  className="text-xs mr-4 text-gray-600 flex items-center"
                >
                  • {facility}
                </span>
              ))}
              
              <button
                onClick={() => toggleFacilities(index)}
                className="bg-red-400 text-white rounded-lg px-3 py-1.5 text-xs font-medium flex items-center"
              >
                More Facilities
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Available Seats and Book Button */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-green-600">
                {bus.availableSeats}
              </span>
              
              <Button 
                variant="primary"                
                onClick={() => handleBookNow(bus)}
                className="bg-[#0a639d] text-white rounded-lg px-4 py-2 md:px-6 md:py-3 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
                <span className="text-sm md:text-lg font-medium">Book Now</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusListings;