import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';

const BusListings = () => {
  const [expandedFacilities, setExpandedFacilities] = useState({});

  const busData = Array(8).fill({
    rating: '4.9',
    name: 'Name or No of the bus',
    type: 'Tourist A/c, Delux',
    departureTime: '16:00',
    departureLocation: 'Swayambhu',
    arrivalTime: '20:50',
    arrivalLocation: 'Bus Park',
    duration: '9h',
    price: 'Rs. 1200',
    priceUnit: '/ Seat',
    availableSeats: '12 Seats Available',
    facilities: ['Heated front seats', 'Full A/C & Air Suspension'],
  });

  const toggleFacilities = (index) => {
    setExpandedFacilities(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleBookNow = (busIndex) => {
    alert(`Booking bus ${busIndex + 1}`);
  };

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
                onClick={() => handleBookNow(index)}
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