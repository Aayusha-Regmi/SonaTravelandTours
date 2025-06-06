import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Chip from './Chip';

const BusListings = ({ buses = [], isLoading = false }) => {
  const navigate = useNavigate();
  const [expandedFacilities, setExpandedFacilities] = useState({});
  
  // If no buses passed, use default data
  const busData = buses.length > 0 ? buses.map(bus => {
    // Ensure we have an ID for navigation
    const busId = bus.id || bus._id || `bus-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: busId,
      rating: bus.rating || '4.8',
      name: bus.busName || bus.name || 'Sona Express',
      type: bus.busType || bus.type || 'Tourist A/c, Delux',
      departureTime: bus.departureTime || bus.departure_time || '16:00',
      departureLocation: bus.boardingPoint || bus.boarding_point || bus.source || 'Bus Park',
      arrivalTime: bus.arrivalTime || bus.arrival_time || '20:50',
      arrivalLocation: bus.droppingPoint || bus.dropping_point || bus.destination || 'Bus Park',
      duration: bus.duration || '9h',
      price: bus.price || (bus.fare ? `Rs. ${bus.fare}` : 'Rs. 1200'),
      priceUnit: '/ Seat',
      availableSeats: `${bus.availableSeats || bus.available_seats || 12} Seats Available`,
      facilities: bus.facilities || ['Heated front seats', 'Full A/C & Air Suspension'],
      
      // Store original data for passing to booking
      originalData: bus
    };
  }) : [];

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
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[16px] w-[920px]">
        <div className="animate-spin mb-4">
          <svg className="w-12 h-12 text-[#0a639d]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-lg font-semibold text-[#5f5f5f]">Searching for buses...</p>
      </div>
    );
  }

  // Show empty state when no results
  if (busData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[16px] w-[920px]">
        <img 
          src="/images/img_illustrationbus9517789629.png" 
          alt="No buses found" 
          className="w-56 h-56 mb-6 opacity-60"
        />
        <h3 className="text-2xl font-bold text-[#3d3d3d] mb-2">No Buses Found</h3>
        <p className="text-[#5f5f5f] text-center max-w-md mb-6">
          We couldn't find any buses for this route on the selected date. Try different dates or locations.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/')}
          className="bg-[#0a639d] text-white rounded-[12px] px-8 py-3"
        >
          Search Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-[16px]">
      {busData.map((bus, index) => (
        <div key={index} className="bg-white rounded-[16px] p-[28px] w-[920px] h-[236px]">
          {/* Header with Rating and New Badge */}
          <div className="flex items-center space-x-[4px] mb-[5px]">
            <Chip variant="rating" size="medium" className="h-[27px] rounded-[13px]">
              <img 
                src="/images/img_hicon_outline_tick.svg" 
                alt="star" 
                className="w-[12px] h-[12px] mr-[4px] bg-white rounded-full"
              />
              {bus.rating}
            </Chip>
            <Chip variant="new" size="medium" className="h-[27px] rounded-[13px]">
              New
            </Chip>
          </div>

          {/* Bus Name and Type */}
          <div className="mb-[25px]">
            <h3 className="text-[20px] font-bold leading-[28px] text-[#3d3d3d] font-opensans mb-[1px]">
              {bus.name}
            </h3>
            <p className="text-[14px] font-semibold leading-[20px] text-[#8f8f8f] font-opensans">
              {bus.type}
            </p>
          </div>

          {/* Journey Details */}
          <div className="flex items-center justify-between mb-[40px]">
            {/* Departure */}
            <div className="text-center">
              <div className="text-[20px] font-bold leading-[28px] text-[#3d3d3d] font-opensans">
                {bus.departureTime}
              </div>
              <div className="text-[12px] font-semibold leading-[17px] text-[#8f8f8f] font-opensans">
                {bus.departureLocation}
              </div>
            </div>

            {/* Journey Line */}
            <div className="flex items-center flex-1 mx-[15px]">
              <div className="w-[70px] h-[1px] bg-[#efbdc0]"></div>
              <div className="mx-[5px]">
                <img 
                  src="/images/img_group_red_300.svg" 
                  alt="bus" 
                  className="w-[32px] h-[32px]"
                />
                <div className="text-[12px] font-bold leading-[17px] text-[#8f8f8f] font-opensans text-center mt-[-18px]">
                  {bus.duration}
                </div>
              </div>
              <div className="w-[70px] h-[1px] bg-[#efbdc0]"></div>
            </div>

            {/* Arrival */}
            <div className="text-center">
              <div className="text-[20px] font-bold leading-[28px] text-[#3d3d3d] font-opensans">
                {bus.arrivalTime}
              </div>
              <div className="text-[12px] font-semibold leading-[17px] text-[#8f8f8f] font-opensans">
                {bus.arrivalLocation}
              </div>
            </div>

            {/* Price */}
            <div className="text-right ml-[98px]">
              <span className="text-[20px] font-bold leading-[28px] text-[#3d3d3d] font-opensans">
                {bus.price}
              </span>
              <span className="text-[16px] font-bold leading-[21px] text-[#8f8f8f] font-opensans">
                {bus.priceUnit}
              </span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#ececec] mb-[40px]"></div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between">
            {/* Facilities */}
            <div className="flex items-center space-x-[14px]">
              {bus.facilities.map((facility, facilityIndex) => (
                <span 
                  key={facilityIndex}
                  className="text-[12px] font-semibold leading-[17px] text-[#5f5f5f] font-opensans"
                >
                  {facility}
                </span>
              ))}
              
              <button
                onClick={() => toggleFacilities(index)}
                className="bg-[#d85f66] text-white rounded-[12px] px-[7px] py-[6px] h-[31px] flex items-center text-[12px] font-semibold leading-[17px] font-opensans"
              >
                More Facilities
                <img 
                  src="/images/img_hicon_bold_down_2.svg" 
                  alt="expand" 
                  className="w-[14px] h-[14px] ml-[4px]"
                />
              </button>
            </div>

            {/* Available Seats and Book Button */}
            <div className="flex items-center space-x-[13px]">
              <span className="text-[14px] font-bold leading-[20px] text-[#388b68] font-opensans">
                {bus.availableSeats}
              </span>
              
              <Button 
                variant="primary"
                onClick={() => handleBookNow(bus)}
                className="bg-[#0a639d] text-white rounded-[12px] px-[16px] py-[18px] h-[60px] w-[166px] flex items-center"
              >
                <img 
                  src="/images/img_hicon_outline_bookmark_3.svg" 
                  alt="book" 
                  className="w-[24px] h-[24px] mr-[8px]"
                />
                <span className="text-[20px] font-bold leading-[28px] font-opensans">Book Now</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusListings;