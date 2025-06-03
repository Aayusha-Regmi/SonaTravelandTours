import React, { useState } from 'react';
import InputField from '../../components/ui/InputField';
import Checkbox from '../../components/ui/Checkbox';
import Chip from '../../components/ui/Chip';

const FilterSection = () => {
  const [priceRange, setPriceRange] = useState([20, 120]);
  const [liveTracking, setLiveTracking] = useState(true);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState('Early Morning');
  const [boardingPlaces, setBoardingPlaces] = useState({
    'Boarding Place Name': true,
    'Boarding Place Name 2': false,
    'Boarding Place Name 3': false,
    'Boarding Place Name 4': false,
    'Boarding Place Name 5': false,
  });
  const [droppingPlaces, setDroppingPlaces] = useState({
    'Dropping Place Name': true,
    'Dropping Place Name 2': false,
    'Dropping Place Name 3': false,
    'Dropping Place Name 4': false,
    'Dropping Place Name 5': false,
  });
  const [selectedStars, setSelectedStars] = useState(['1-2 Stars', '3 Stars', '4 Stars', '5 Stars']);

  const departureTimeOptions = [
    { label: 'Early Morning', time: 'Before 9 AM' },
    { label: 'Morning', time: '9 - 11:59 AM' },
    { label: 'Afternoon', time: '12 - 6 PM' },
    { label: 'Evening', time: 'After 6 PM' },
  ];

  const busFacilities = [
    'OLED OnePlus 42" TV',
    'Navigation system',
    'Full A/C & Air Suspension',
    'Multi-zone A/C',
    'Heated front seats',
    'CCTV Surveillance',
    'Sony Dolby Digital system',
  ];

  const handleBoardingPlaceChange = (place, checked) => {
    setBoardingPlaces(prev => ({
      ...prev,
      [place]: checked
    }));
  };

  const handleDroppingPlaceChange = (place, checked) => {
    setDroppingPlaces(prev => ({
      ...prev,
      [place]: checked
    }));
  };

  const toggleStar = (star) => {
    setSelectedStars(prev => 
      prev.includes(star) 
        ? prev.filter(s => s !== star)
        : [...prev, star]
    );
  };

  return (
    <div className="bg-white rounded-[16px] w-[354px] h-[2000px] p-[24px]">
      {/* Header */}
      <h2 className="text-[20px] font-bold leading-[28px] text-[#3d3d3d] font-opensans mb-[21px]">
        Filters
      </h2>
      
      <div className="w-full h-[1px] bg-[#ececec] mb-[51px]"></div>

      {/* Price Filter */}
      <div className="mb-[24px]">
        <h3 className="text-[16px] font-bold leading-[22px] text-[#5f5f5f] font-opensans mb-[38px]">
          Price
        </h3>
        
        {/* Price Range Slider */}
        <div className="relative mb-[11px]">
          <div className="w-full h-[4px] bg-[#ececec] rounded-full relative">
            <div className="absolute h-full bg-[#0a639d] rounded-full left-[25%] right-[25%]"></div>
            <div className="absolute w-[16px] h-[16px] bg-[#0a639d] rounded-full top-[-6px] left-[25%] transform -translate-x-1/2 cursor-pointer"></div>
            <div className="absolute w-[16px] h-[16px] bg-[#0a639d] rounded-full top-[-6px] right-[25%] transform translate-x-1/2 cursor-pointer"></div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <span className="text-[14px] font-bold leading-[20px] text-[#8f8f8f] font-opensans">$20</span>
          <span className="text-[14px] font-bold leading-[20px] text-[#8f8f8f] font-opensans">$120</span>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#ececec] mb-[24px]"></div>

      {/* Live Tracking */}
      <div className="mb-[24px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold leading-[22px] text-[#5f5f5f] font-opensans">
            Live Tracking
          </h3>
          <div className="relative">
            <div className={`w-[52px] h-[28px] rounded-[14px] transition-colors ${liveTracking ? 'bg-[#0a639d]' : 'bg-[#ececec]'}`}>
              <div 
                className={`w-[20px] h-[20px] bg-white rounded-full absolute top-[4px] transition-transform ${liveTracking ? 'translate-x-[28px]' : 'translate-x-[4px]'}`}
                onClick={() => setLiveTracking(!liveTracking)}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#ececec] mb-[24px]"></div>

      {/* Departure Time */}
      <div className="mb-[24px]">
        <h3 className="text-[16px] font-bold leading-[22px] text-[#5f5f5f] font-opensans mb-[38px]">
          Departure Time
        </h3>
        
        <div className="grid grid-cols-2 gap-[8px]">
          {departureTimeOptions.map((option, index) => (
            <div 
              key={index}
              className={`bg-[#f5f5f5] rounded-[8px] p-[12px] cursor-pointer transition-colors ${
                selectedDepartureTime === option.label ? 'ring-2 ring-[#0a639d]' : ''
              }`}
              onClick={() => setSelectedDepartureTime(option.label)}
            >
              <div className="text-[14px] font-bold leading-[20px] text-[#5f5f5f] font-opensans mb-[15px]">
                {option.label}
              </div>
              <div className="flex items-center">
                <img 
                  src="/images/img_hicon_linear_time_circle_1.svg" 
                  alt="time" 
                  className="w-[16px] h-[16px] mr-[4px]"
                />
                <span className="text-[12px] font-semibold leading-[17px] text-[#8f8f8f] font-opensans">
                  {option.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#ececec] mb-[24px]"></div>

      {/* Boarding Place */}
      <div className="mb-[24px]">
        <h3 className="text-[16px] font-bold leading-[22px] text-[#5f5f5f] font-opensans mb-[34px]">
          Boarding Place
        </h3>
        
        <div className="mb-[16px]">
          <InputField 
            placeholder="Search boarding place"
            className="bg-[#f5f5f5] rounded-[12px] h-[60px]"
          />
        </div>

        <div className="space-y-[35px]">
          {Object.entries(boardingPlaces).map(([place, checked]) => (
            <Checkbox
              key={place}
              label={place}
              checked={checked}
              onChange={(newChecked) => handleBoardingPlaceChange(place, newChecked)}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#ececec] mb-[24px]"></div>

      {/* Dropping Place */}
      <div className="mb-[24px]">
        <h3 className="text-[16px] font-bold leading-[22px] text-[#5f5f5f] font-opensans mb-[34px]">
          Dropping Place
        </h3>
        
        <div className="mb-[16px]">
          <InputField 
            placeholder="Search dropping place"
            className="bg-[#f5f5f5] rounded-[12px] h-[60px]"
          />
        </div>

        <div className="space-y-[35px]">
          {Object.entries(droppingPlaces).map(([place, checked]) => (
            <Checkbox
              key={place}
              label={place}
              checked={checked}
              onChange={(newChecked) => handleDroppingPlaceChange(place, newChecked)}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#ececec] mb-[24px]"></div>

      {/* Bus Facilities */}
      <div className="mb-[24px]">
        <h3 className="text-[16px] font-bold leading-[22px] text-[#5f5f5f] font-opensans mb-[34px]">
          Bus Facilities
        </h3>
        
        <div className="flex flex-wrap gap-[8px]">
          {busFacilities.map((facility, index) => (
            <Chip
              key={index}
              variant="facility"
              size="small"
              className="bg-[#f5f5f5] text-[#3d3d3d] rounded-[8px] px-[12px] py-[12px] h-[40px] flex items-center"
            >
              <img 
                src="/images/img_phbus.svg" 
                alt="facility" 
                className="w-[16px] h-[16px] mr-[4px]"
              />
              {facility}
            </Chip>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#ececec] mb-[24px]"></div>

      {/* Star Rating */}
      <div className="mb-[24px]">
        <h3 className="text-[16px] font-bold leading-[22px] text-[#5f5f5f] font-opensans mb-[39px]">
          Star
        </h3>
        
        <div className="flex flex-wrap gap-[4px]">
          {['1-2 Stars', '3 Stars', '4 Stars', '5 Stars'].map((star, index) => (
            <Chip
              key={index}
              variant="rating"
              size="medium"
              selected={selectedStars.includes(star)}
              onClick={() => toggleStar(star)}
              className="mb-[8px] h-[27px] rounded-[13px]"
            >
              <img 
                src="/images/img_hicon_outline_tick.svg" 
                alt="star" 
                className="w-[12px] h-[12px] mr-[4px] bg-white rounded-full"
              />
              {star}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;