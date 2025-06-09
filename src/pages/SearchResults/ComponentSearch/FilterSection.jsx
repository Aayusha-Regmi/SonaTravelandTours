import React, { useState, useEffect } from 'react';
import InputField from '../../../components/ui/InputField';
import Checkbox from '../../../components/ui/Checkbox';
import Chip from './Chip';
import api from '../../../services/api';

const FilterSection = ({
  priceRange = [500, 2000],
  setPriceRange = () => {},
  selectedBoardingPlaces = [],
  setSelectedBoardingPlaces = () => {},
  selectedDroppingPlaces = [],
  setSelectedDroppingPlaces = () => {},
  selectedBusTypes = [],
  setSelectedBusTypes = () => {},
  selectedFacilities = [],
  setSelectedFacilities = () => {},  selectedRatings = [],
  setSelectedRatings = () => {},
  selectedDepartureTime = '',
  setSelectedDepartureTime = () => {}
}) => {
  // Use props for price range
  const [liveTracking, setLiveTracking] = useState(true);
  const [searchBoardingPlace, setSearchBoardingPlace] = useState('');
  const [searchDroppingPlace, setSearchDroppingPlace] = useState('');
  const [localBusTypes, setLocalBusTypes] = useState(selectedBusTypes.length > 0 ? selectedBusTypes : []);
  // No longer needed as we're removing the expand/collapse button
// const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  // Initialize boarding places state
  const [boardingPlaceOptions, setBoardingPlaceOptions] = useState({});
  const [boardingPlaces, setBoardingPlaces] = useState({});
  
  // Fetch boarding places on component mount
  useEffect(() => {
    const fetchBoardingPlaces = () => {
      const apiBoardingPlaces = api.getBoardingPoints();
      const options = {};
      
      // Initialize all places as false
      apiBoardingPlaces.forEach(place => {
        options[place] = false;
      });
      
      // Mark selected boarding places as true
      selectedBoardingPlaces.forEach(place => {
        if (options.hasOwnProperty(place)) {
          options[place] = true;
        }
      });
      
      // If none selected, default to New Bus Park
      if (selectedBoardingPlaces.length === 0 && options['New Bus Park, Kathmandu']) {
        options['New Bus Park, Kathmandu'] = true;
      }
      
      setBoardingPlaceOptions(options);
      setBoardingPlaces(options);
    };
    
    fetchBoardingPlaces();
  }, [selectedBoardingPlaces]);
    // Initialize dropping places state
  const [droppingPlaceOptions, setDroppingPlaceOptions] = useState({});
  
  // Fetch dropping places on component mount
  useEffect(() => {
    const fetchDroppingPlaces = () => {
      const apiDroppingPlaces = api.getDroppingPoints();
      const options = {};
      
      // Initialize all places as false
      apiDroppingPlaces.forEach(place => {
        options[place] = false;
      });
      
      // Mark selected dropping places as true
      selectedDroppingPlaces.forEach(place => {
        if (options.hasOwnProperty(place)) {
          options[place] = true;
        }
      });
      
      // If none selected, default to Adarsha Nagar
      if (selectedDroppingPlaces.length === 0 && options['Adarsha Nagar, Birgunj']) {
        options['Adarsha Nagar, Birgunj'] = true;
      }
      
      setDroppingPlaceOptions(options);
    };
    
    fetchDroppingPlaces();
  }, [selectedDroppingPlaces]);
  
  const [droppingPlaces, setDroppingPlaces] = useState(droppingPlaceOptions);
    // Note: Filters are now applied automatically by the parent component
    const [localStars, setLocalStars] = useState(selectedRatings.length > 0 ? selectedRatings : []);
  const [localFacilities, setLocalFacilities] = useState(selectedFacilities.length > 0 ? selectedFacilities : []);
  
  // Sync local state with props when they change externally (like when filters are removed via tags)
  useEffect(() => {
    setLocalBusTypes(selectedBusTypes);
  }, [selectedBusTypes]);
  
  useEffect(() => {
    setLocalStars(selectedRatings);
  }, [selectedRatings]);
  
  useEffect(() => {
    setLocalFacilities(selectedFacilities);
  }, [selectedFacilities]);
    useEffect(() => {
    // Update boarding places checkboxes when selectedBoardingPlaces changes externally
    const newBoardingPlaces = {};
    Object.keys(boardingPlaces).forEach(place => {
      newBoardingPlaces[place] = selectedBoardingPlaces.includes(place);
    });
    setBoardingPlaces(newBoardingPlaces);
  }, [selectedBoardingPlaces]);
  
  useEffect(() => {
    // Update dropping places checkboxes when selectedDroppingPlaces changes externally
    const newDroppingPlaces = {};
    Object.keys(droppingPlaces).forEach(place => {
      newDroppingPlaces[place] = selectedDroppingPlaces.includes(place);
    });
    setDroppingPlaces(newDroppingPlaces);
  }, [selectedDroppingPlaces]);

  // Add effect to sync with external changes to selectedDepartureTime
  useEffect(() => {
    // This will ensure the FilterSection stays in sync when departure time filter is cleared via tags
  }, [selectedDepartureTime]);

  const departureTimeOptions = [
    { label: 'Early Morning', time: 'Before 6 AM' },
    { label: 'Morning', time: '6 - 11:59 AM' },
    { label: 'Afternoon', time: '12 - 5 PM' },
    { label: 'Evening', time: 'After 5 PM' },
  ];  // Get bus facilities from API
  const [busFacilities, setBusFacilities] = useState([]);
  
  // Fetch bus facilities on component mount
  useEffect(() => {
    setBusFacilities(api.getBusFacilities());
  }, []);
    // Get bus types from API
  const [busTypes, setBusTypes] = useState([]);
  
  // Fetch bus types on component mount
  useEffect(() => {
    setBusTypes(api.getBusTypes());
  }, []);const handleBoardingPlaceChange = (place, checked) => {
    const updatedPlaces = {
      ...boardingPlaces,
      [place]: checked
    };
    setBoardingPlaces(updatedPlaces);
    
    // Update parent component with selected places
    const selectedPlaces = Object.entries(updatedPlaces)
      .filter(([_, isSelected]) => isSelected)
      .map(([placeName]) => placeName);
    
    setSelectedBoardingPlaces(selectedPlaces);
  };
  const handleDroppingPlaceChange = (place, checked) => {
    const updatedPlaces = {
      ...droppingPlaces,
      [place]: checked
    };
    setDroppingPlaces(updatedPlaces);
    
    // Update parent component with selected places
    const selectedPlaces = Object.entries(updatedPlaces)
      .filter(([_, isSelected]) => isSelected)
      .map(([placeName]) => placeName);
    
    setSelectedDroppingPlaces(selectedPlaces);
  };
  const toggleStar = (star) => {
    const newStars = localStars.includes(star)
      ? localStars.filter(s => s !== star)
      : [...localStars, star];
    
    setLocalStars(newStars);
    setSelectedRatings(newStars);
  };
    const toggleBusType = (type) => {
    const newBusTypes = localBusTypes.includes(type)
      ? localBusTypes.filter(t => t !== type)
      : [...localBusTypes, type];
    
    setLocalBusTypes(newBusTypes);
    setSelectedBusTypes(newBusTypes);
  };
    const toggleFacility = (facility) => {
    const newFacilities = localFacilities.includes(facility)
      ? localFacilities.filter(f => f !== facility)
      : [...localFacilities, facility];
    
    setLocalFacilities(newFacilities);
    setSelectedFacilities(newFacilities);
  };
    const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
  };
  
  // Filter boarding places based on search input
  const filteredBoardingPlaces = Object.entries(boardingPlaceOptions).filter(
    ([place]) => place.toLowerCase().includes(searchBoardingPlace.toLowerCase())
  ).map(([place]) => [place, boardingPlaces[place] || false]);

  // Filter dropping places based on search input
  const filteredDroppingPlaces = Object.entries(droppingPlaceOptions).filter(
    ([place]) => place.toLowerCase().includes(searchDroppingPlace.toLowerCase())
  ).map(([place]) => [place, droppingPlaces[place] || false]);  return (    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Filters
        </h2>
      </div>
      
      <div className="w-full h-px bg-gray-200 mb-5"></div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Price Range (NPR)
        </h3>
        
        {/* Price Range Slider */}
        <div className="relative mb-2 px-2">
          <div className="w-full h-1 bg-gray-200 rounded-full relative">
            <div 
              className="absolute h-full bg-blue-600 rounded-full" 
              style={{
                left: `${((priceRange[0] - 500) / (2000 - 500)) * 100}%`,
                right: `${100 - ((priceRange[1] - 500) / (2000 - 500)) * 100}%`
              }}
            ></div>
            <input
              type="range"
              min="500"
              max="2000"
              step="100"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(parseInt(e.target.value), priceRange[1])}
              className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
            />
            <input
              type="range"
              min="500"
              max="2000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
              className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
            />
            <div 
              className="absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full top-[-6px] z-20"
              style={{ left: `${((priceRange[0] - 500) / (2000 - 500)) * 100}%`, transform: 'translateX(-50%)' }}
            ></div>
            <div 
              className="absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full top-[-6px] z-20"
              style={{ left: `${((priceRange[1] - 500) / (2000 - 500)) * 100}%`, transform: 'translateX(-50%)' }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm mt-3">
          <span className="font-medium text-gray-600">Rs. {priceRange[0]}</span>
          <span className="font-medium text-gray-600">Rs. {priceRange[1]}</span>
        </div>
      </div>      <div className="w-full h-px bg-gray-200 mb-5"></div>

      {/* Live Tracking */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">
            Live Tracking
          </h3>
          <button 
            className="relative inline-flex items-center cursor-pointer"
            onClick={() => setLiveTracking(!liveTracking)}
          >
            <div className={`w-10 h-5 rounded-full transition-colors ${liveTracking ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <div 
                className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-transform ${liveTracking ? 'translate-x-5' : 'translate-x-0.5'} shadow-md`}
              ></div>
            </div>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {liveTracking ? 'Track your bus in real-time' : 'Real-time tracking disabled'}
        </p>
      </div>

      {/* <div className="w-full h-px bg-gray-200 mb-5">

      Bus Type
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Bus Type
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {busTypes.map((type, index) => (
            <button
              key={index}              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                localBusTypes.includes(type)
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => toggleBusType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div> */}

      <div className="w-full h-px bg-gray-200 mb-5"></div>

      {/* Departure Time */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Departure Time
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {departureTimeOptions.map((option, index) => (
            <div 
              key={index}
              className={`bg-gray-50 rounded-lg p-3 cursor-pointer transition-colors ${
                selectedDepartureTime === option.label 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedDepartureTime(option.label)}
            >
              <div className="text-xs font-medium text-gray-700 mb-1">
                {option.label}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {option.time}
              </div>
            </div>
          ))}
        </div>
      </div>      <div className="w-full h-px bg-gray-200 mb-5"></div>

      {/* Boarding Place */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Boarding Place
        </h3>
        
        <div className="mb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search boarding place"
              value={searchBoardingPlace}
              onChange={(e) => setSearchBoardingPlace(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <svg className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
          {filteredBoardingPlaces.length > 0 ? (
            filteredBoardingPlaces.map(([place, checked]) => (
              <div key={place} className="flex items-center">
                <input
                  type="checkbox"
                  id={`boarding-${place}`}
                  checked={checked}
                  onChange={(e) => handleBoardingPlaceChange(place, e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={`boarding-${place}`} className="ml-2 text-xs text-gray-700">
                  {place}
                </label>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 italic">No matching boarding places found</p>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-5"></div>

      {/* Dropping Place */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Dropping Place
        </h3>
        
        <div className="mb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search dropping place"
              value={searchDroppingPlace}
              onChange={(e) => setSearchDroppingPlace(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <svg className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
          {filteredDroppingPlaces.length > 0 ? (
            filteredDroppingPlaces.map(([place, checked]) => (
              <div key={place} className="flex items-center">
                <input
                  type="checkbox"
                  id={`dropping-${place}`}
                  checked={checked}
                  onChange={(e) => handleDroppingPlaceChange(place, e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={`dropping-${place}`} className="ml-2 text-xs text-gray-700">
                  {place}
                </label>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 italic">No matching dropping places found</p>
          )}
        </div>
      </div>      <div className="w-full h-px bg-gray-200 mb-5"></div>

      {/* Bus Facilities */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Bus Facilities
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {busFacilities.map((facility, index) => (
            <button
              key={index}
              onClick={() => toggleFacility(facility)}              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs ${
                localFacilities.includes(facility)
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {localFacilities.includes(facility) ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                )}
              </svg>
              {facility}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-5"></div>

      {/* Star Rating */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Star Rating
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {['1-2 Stars', '3 Stars', '4 Stars', '5 Stars'].map((star, index) => (
            <button
              key={index}
              onClick={() => toggleStar(star)}              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs transition-colors ${
                localStars.includes(star)
                  ? 'bg-yellow-100 text-yellow-700 font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {localStars.includes(star) && (
                <svg className="w-3 h-3 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              )}
              {star}
            </button>
          ))}
        </div>
      </div>
        {/* Filters applied automatically */}
      <div className="pt-3 mt-2 border-t border-gray-200">
        <p className="text-xs text-center text-gray-500">Filters are applied automatically</p>
      </div>
    </div>
  );
};

export default FilterSection;