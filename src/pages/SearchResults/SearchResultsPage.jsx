import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import FilterSection from './ComponentSearch/FilterSection';
import BusListings from './ComponentSearch/BusListings';
import DateSelector from './ComponentSearch/DateSelector';
import Button from '../../components/ui/Button';
import LocationDropdown from '../Home/ComponentHome/UI/LocationDropdown';
import DatePicker from '../Home/ComponentHome/UI/DatePickerNew';
import apiService from '../../services/clientapi';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get search results and params from location state
  const { searchResults = [], searchParams = {} } = location.state || {};
  
  const [tripType, setTripType] = useState(searchParams.tripType || 'oneWay');
  const [formData, setFormData] = useState({
    from: searchParams.from || '',
    to: searchParams.to || '',
    date: searchParams.date || '',
    returnDate: searchParams.returnDate || ''
  });
    // Set default values or values from search params
  const [fromLocation, setFromLocation] = useState(searchParams.fromCity || 'Birgunj');
  const [toLocation, setToLocation] = useState(searchParams.toCity || 'Kathmandu');
  const [travelDate, setTravelDate] = useState(searchParams.date || '06/06/2024');
  const [sortBy, setSortBy] = useState('Earliest');
  
  // Sample bus data for testing filters - at least 8 buses with different values
  const sampleBusData = [
    {
      id: 'bus-001',
      busName: 'Sona Express Deluxe',
      busType: 'Deluxe A/C',
      departureTime: '06:30',
      arrivalTime: '12:45',
      boardingPoint: 'New Bus Park, Kathmandu',
      droppingPoint: 'Adarsha Nagar, Birgunj',
      duration: '6h 15m',
      fare: 1250,
      rating: '4.8',
      availableSeats: 22,
      facilities: ['Full A/C & Air Suspension', 'Reclining seats', 'WiFi onboard', 'Water bottle'],
    },
    {
      id: 'bus-002',
      busName: 'Nepal Yatayat Super',
      busType: 'Super Deluxe',
      departureTime: '08:00',
      arrivalTime: '14:30',
      boardingPoint: 'Kalanki, Kathmandu',
      droppingPoint: 'Ghantaghar, Birgunj',
      duration: '6h 30m',
      fare: 1450,
      rating: '4.5',
      availableSeats: 15,
      facilities: ['Full A/C & Air Suspension', 'Reclining seats', 'Phone charging', 'CCTV camera', 'First aid kit'],
    },
    {
      id: 'bus-003',
      busName: 'Kathmandu Birgunj Tourist',
      busType: 'Tourist',
      departureTime: '10:15',
      arrivalTime: '16:30',
      boardingPoint: 'Balkhu, Kathmandu',
      droppingPoint: 'Birta, Birgunj',
      duration: '6h 15m',
      fare: 950,
      rating: '3.7',
      availableSeats: 8,
      facilities: ['Reclining seats', 'Reading light'],
    },
    {
      id: 'bus-004',
      busName: 'Makalu Express',
      busType: 'AC',
      departureTime: '12:30',
      arrivalTime: '19:00',
      boardingPoint: 'Koteshwor, Kathmandu',
      droppingPoint: 'Powerhouse, Birgunj',
      duration: '6h 30m',
      fare: 1100,
      rating: '4.2',
      availableSeats: 19,
      facilities: ['Full A/C & Air Suspension', 'Phone charging', 'Water bottle'],
    },
    {
      id: 'bus-005',
      busName: 'Sagarmatha Luxury',
      busType: 'Luxury',
      departureTime: '15:45',
      arrivalTime: '21:45',
      boardingPoint: 'New Bus Park, Kathmandu',
      droppingPoint: 'Rangeli, Birgunj',
      duration: '6h',
      fare: 1850,
      rating: '4.9',
      availableSeats: 12,
      facilities: ['Full A/C & Air Suspension', 'Reclining seats', 'WiFi onboard', 'Phone charging', 'Water bottle', 'CCTV camera', 'First aid kit', 'Reading light', 'Blankets'],
    },
    {
      id: 'bus-006',
      busName: 'Buddha Express',
      busType: 'Deluxe A/C',
      departureTime: '17:30',
      arrivalTime: '23:45',
      boardingPoint: 'Chabahil, Kathmandu',
      droppingPoint: 'Adarsha Nagar, Birgunj',
      duration: '6h 15m',
      fare: 1250,
      rating: '4.3',
      availableSeats: 16,
      facilities: ['Full A/C & Air Suspension', 'Reclining seats', 'Water bottle', 'First aid kit'],
    },
    {
      id: 'bus-007',
      busName: 'Green City Travels',
      busType: 'Super Deluxe',
      departureTime: '19:00',
      arrivalTime: '01:15',
      boardingPoint: 'New Bus Park, Kathmandu',
      droppingPoint: 'Ghantaghar, Birgunj',
      duration: '6h 15m',
      fare: 1350,
      rating: '4.6',
      availableSeats: 14,
      facilities: ['Full A/C & Air Suspension', 'Heated front seats', 'Phone charging', 'First aid kit', 'Blankets'],
    },
    {
      id: 'bus-008',
      busName: 'Highway Express',
      busType: 'Tourist',
      departureTime: '22:30',
      arrivalTime: '04:45',
      boardingPoint: 'Kalanki, Kathmandu',
      droppingPoint: 'Birta, Birgunj',
      duration: '6h 15m',
      fare: 950,
      rating: '3.8',
      availableSeats: 22,
      facilities: ['Reclining seats', 'Blankets'],
    }
  ];
    // Filter states
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [selectedBoardingPlaces, setSelectedBoardingPlaces] = useState(['New Bus Park, Kathmandu']);
  const [selectedDroppingPlaces, setSelectedDroppingPlaces] = useState(['Adarsha Nagar, Birgunj']);
  const [selectedBusTypes, setSelectedBusTypes] = useState(['Deluxe A/C', 'Super Deluxe']);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  
  // Initialize with sample data or API results
  const [allBusResults, setAllBusResults] = useState(searchResults.length > 0 ? searchResults : sampleBusData);
  const [busResults, setBusResults] = useState(searchResults.length > 0 ? searchResults : sampleBusData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Apply filters to bus results
  const applyFilters = useCallback(() => {
    let filteredResults = [...allBusResults];
    
    // Filter by price range
    filteredResults = filteredResults.filter(bus => 
      (bus.fare || parseInt((bus.price || '').replace(/[^0-9]/g, ''))) >= priceRange[0] && 
      (bus.fare || parseInt((bus.price || '').replace(/[^0-9]/g, ''))) <= priceRange[1]
    );
    
    // Filter by boarding places if any selected
    if (selectedBoardingPlaces.length > 0) {
      filteredResults = filteredResults.filter(bus => 
        selectedBoardingPlaces.some(place => 
          (bus.boardingPoint || bus.boarding_point || '').includes(place)
        )
      );
    }
    
    // Filter by dropping places if any selected
    if (selectedDroppingPlaces.length > 0) {
      filteredResults = filteredResults.filter(bus => 
        selectedDroppingPlaces.some(place => 
          (bus.droppingPoint || bus.dropping_point || '').includes(place)
        )
      );
    }
    
    // Filter by bus types if any selected
    if (selectedBusTypes.length > 0) {
      filteredResults = filteredResults.filter(bus => 
        selectedBusTypes.some(type => 
          (bus.busType || bus.type || '').includes(type)
        )
      );
    }
    
    // Filter by facilities if any selected
    if (selectedFacilities.length > 0) {
      filteredResults = filteredResults.filter(bus => 
        bus.facilities && selectedFacilities.every(facility => 
          bus.facilities.includes(facility)
        )
      );
    }
    
    // Filter by rating if any selected
    if (selectedRatings.length > 0) {
      filteredResults = filteredResults.filter(bus => {
        const rating = parseFloat(bus.rating || '0');
        
        // For "4 Stars" filter: rating >= 4 and < 5
        return selectedRatings.some(ratingFilter => {
          if (ratingFilter === '5 Stars') return rating >= 5;
          if (ratingFilter === '4 Stars') return rating >= 4 && rating < 5;
          if (ratingFilter === '3 Stars') return rating >= 3 && rating < 4;
          if (ratingFilter === '1-2 Stars') return rating >= 1 && rating < 3;
          return true;
        });
      });
    }
    
    setBusResults(filteredResults);
  }, [allBusResults, priceRange, selectedBoardingPlaces, selectedDroppingPlaces, selectedBusTypes, selectedFacilities, selectedRatings]);
  
  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);
  
  // Location options - limited to Kathmandu and Birgunj only
  const locationOptions = [
    { 
      value: 'KTM', 
      label: 'Kathmandu',
      description: 'Stops: New Bus Park, Kalanki, Balkhu, Koteshwor, Chabahil'
    },
    {
      value: 'BRG',
      label: 'Birgunj',
      description: 'Stops: Adarsha Nagar, Ghantaghar, Birta, Powerhouse, Rangeli'
    }
  ];

  const sortOptions = ['Earliest', 'Latest', 'Lowest price', 'Highest price', 'Newest', 'Top rating'];

  // Redirect to home if no search data
  useEffect(() => {
    if (!location.state && (!searchResults || searchResults.length === 0)) {
      console.log('No search data available');
    }
  }, [location.state, searchResults]);

  // Effect to sort bus results when sortBy changes
  useEffect(() => {
    if (busResults.length === 0) return;
    
    setIsLoading(true);
    
    const sortedResults = [...busResults].sort((a, b) => {
      switch(sortBy) {
        case 'Earliest':
          return (a.departureTime || a.departure_time || '').localeCompare(b.departureTime || b.departure_time || '');
        case 'Latest':
          return (b.departureTime || b.departure_time || '').localeCompare(a.departureTime || a.departure_time || '');
        case 'Lowest price':
          const priceA = a.fare || parseInt((a.price || '').replace(/[^0-9]/g, '')) || 0;
          const priceB = b.fare || parseInt((b.price || '').replace(/[^0-9]/g, '')) || 0;
          return priceA - priceB;
        case 'Highest price':
          const priceC = a.fare || parseInt((a.price || '').replace(/[^0-9]/g, '')) || 0;
          const priceD = b.fare || parseInt((b.price || '').replace(/[^0-9]/g, '')) || 0;
          return priceD - priceC;
        case 'Top rating':
          return (parseFloat(b.rating || '0') || 0) - (parseFloat(a.rating || '0') || 0);
        default:
          return 0;
      }
    });
    
    setBusResults(sortedResults);
    setTimeout(() => setIsLoading(false), 300); // Small delay for UI feedback
  }, [sortBy]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If changing the travel date and we have a return date set
    if (name === 'date' && tripType === 'twoWay' && formData.returnDate) {
      const newTravelDate = value ? new Date(value.split(' ').join(' ')) : null;
      const existingReturnDate = new Date(formData.returnDate.split(' ').join(' '));
      
      // If the new travel date is after the existing return date or if travel date is cleared
      if (!newTravelDate || newTravelDate > existingReturnDate) {
        // Reset return date when travel date changes to after it
        setFormData({
          ...formData,
          [name]: value,
          returnDate: '' // Clear the return date
        });
        return;
      }
    }
    
    // If user is selecting a 'from' location and it's the same as the 'to' location, clear the 'to' field
    if (name === 'from' && value === formData.to) {
      setFormData({
        ...formData,
        [name]: value,
        to: '' // Clear the destination if it's the same as departure
      });
      return;
    }
    
    // If user is selecting a 'to' location and it's the same as the 'from' location, clear the 'from' field
    if (name === 'to' && value === formData.from) {
      setFormData({
        ...formData,
        [name]: value,
        from: '' // Clear the departure if it's the same as destination
      });
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Update display values for immediate UI feedback
    if (name === 'from') {
      const selectedLocation = locationOptions.find(loc => loc.value === value);
      setFromLocation(selectedLocation?.label || value);
    } else if (name === 'to') {
      const selectedLocation = locationOptions.find(loc => loc.value === value);
      setToLocation(selectedLocation?.label || value);
    } else if (name === 'date') {
      setTravelDate(value);
    }
  };
  
  const handleSwapLocations = () => {
    const newFrom = formData.to;
    const newTo = formData.from;
    
    setFormData(prevData => ({
      ...prevData,
      from: newFrom,
      to: newTo
    }));
    
    // Update display values
    setFromLocation(locationOptions.find(loc => loc.value === newFrom)?.label || newFrom);
    setToLocation(locationOptions.find(loc => loc.value === newTo)?.label || newTo);
  };

  const handleSearchAgain = async () => {
    // Validate form data
    if (!formData.from || !formData.to || !formData.date || (tripType === 'twoWay' && !formData.returnDate)) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Make sure from and to are not the same
    if (formData.from === formData.to) {
      setError('Departure and destination cannot be the same');
      return;
    }
    
    // Validate return date is after departure date for two-way trips
    if (tripType === 'twoWay' && formData.date && formData.returnDate) {
      const departDate = new Date(formData.date.split(' ').join(' '));
      const returnDate = new Date(formData.returnDate.split(' ').join(' '));
      if (returnDate < departDate) {
        setError('Return date must be after departure date');
        return;
      }
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Searching with data:', { tripType, ...formData });
      
      // Call the API service for searching with proper parameters
      const data = await apiService.searchBusRoutes({ tripType, ...formData });
      
      console.log('Search results:', data);
      
      if (!data || !data.success) {
        throw new Error(data?.message || 'Failed to find buses for this route');
      }
      
      // Handle the API response format according to documentation
      const newBusResults = data.data || [];
      
      if (newBusResults.length === 0) {
        setError('No buses found for this route and date. Please try different dates or locations.');
        setIsLoading(false);
        return;
      }
      
      // Update current state
      setBusResults(newBusResults);
      
      // Update URL state for browser history
      navigate('/search-results', { 
        state: { 
          searchResults: newBusResults,
          searchParams: { 
            tripType, 
            ...formData,
            // Include city names from location codes
            fromCity: locationOptions.find(loc => loc.value === formData.from)?.label || formData.from,
            toCity: locationOptions.find(loc => loc.value === formData.to)?.label || formData.to
          } 
        },
        replace: true // Replace current history entry to avoid back button issues
      });
      
    } catch (err) {
      console.error('Error searching:', err);
      setError(err.message || 'An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
  };

  const handleSortChange = (option) => {
    setSortBy(option);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">      <Header />
        <main className="container mx-auto px-4 sm:px-8 py-6 md:py-8 lg:py-12 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-sm font-medium text-gray-400">Home</span>
          <div className="w-1 h-4 bg-gray-300 transform rotate-12"></div>
          <span className="text-sm font-semibold text-gray-700">Search Results</span>
        </div>

        {/* Error message display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}{/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-8">
          <div className="flex flex-wrap items-end gap-4 lg:gap-3">            {/* Trip Type Selector */}
            <div className="flex flex-col order-1 w-[150px]">
              <label htmlFor="tripType" className="text-sm font-medium text-gray-700 mb-1">Trip Type</label>
              <div className="relative">
                <select 
                  id="tripType"
                  value={tripType}
                  onChange={(e) => handleTripTypeChange(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm h-[42px]"
                  aria-label="Select trip type"
                >
                  <option value="oneWay">One Way</option>
                  <option value="twoWay">Two Ways</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>{/* From Location */}
            <div className="w-[200px] order-2">
              <LocationDropdown
                label="From"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                placeholder="Select boarding place"
                options={locationOptions}
                required
              />
            </div>            {/* Swap Button */}
            <div className="self-center order-3">
              <button 
                onClick={handleSwapLocations}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-gray-100"
                title="Swap locations"
                aria-label="Swap departure and destination locations"
              >
                <img 
                  src="/images/img_hicon_linear_arrow_swap_horizontal.svg" 
                  alt="Swap" 
                  className="w-6 h-6 transition-transform duration-300 ease-in-out hover:rotate-180"
                />
              </button>
            </div>

            {/* To Location */}
            <div className="w-[200px] order-4">
              <LocationDropdown
                label="To"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                placeholder="Select destination"
                options={locationOptions.filter(option => option.value !== formData.from)}
                required
              />
            </div>            {/* Date Pickers with more compact layout */}
            <div className="flex items-end space-x-3 flex-nowrap order-5">
              {/* Departure Date */}
              <div className={tripType === 'twoWay' ? 'w-[170px]' : 'w-[200px]'}>
                <DatePicker
                  label={tripType === 'twoWay' ? "Departure" : "Date"}
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="Select date"
                  required
                  className="h-full"
                />
              </div>

              {/* Return Date (for two-way trips) */}
              {tripType === 'twoWay' && (
                <div className="w-[170px]">
                  <DatePicker
                    label="Return"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    placeholder={!formData.date ? "Select departure first" : "Select return"}
                    required
                    minDate={formData.date ? (() => {
                      const nextDay = new Date(formData.date.split(' ').join(' '));
                      nextDay.setDate(nextDay.getDate() + 1);
                      return nextDay;
                    })() : new Date()}
                    disabled={!formData.date}
                    className="h-full"
                  />
                </div>
              )}
            </div>            {/* Search Button */}
            <div className="order-6 ml-auto">
              <Button 
                variant="primary"
                onClick={handleSearchAgain}
                className={`bg-blue-600 text-white rounded-lg px-4 py-2 h-[44px] flex items-center hover:bg-blue-700 shadow-sm transition-all focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                  isLoading ? 'opacity-80' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                    <span className="text-sm font-medium">Searching...</span>
                  </>
                ) : (
                  <>
                    <svg 
                      className="w-4 h-4 mr-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span className="text-sm font-medium">Search Again</span>
                  </>
                )}
              </Button>
            </div>
          </div>        </div>        {/* Date Selector */}
        <DateSelector 
          initialDate={formData.date || travelDate}
          onDateChange={(dateString, dateObj) => {
            // Update form data with the new date
            handleInputChange({
              target: {
                name: 'date',
                value: dateString
              }
            });
            
            // Automatically trigger search after a short delay
            setTimeout(() => {
              handleSearchAgain();
            }, 300);
          }}
        />{/* Results Header */}
        <div className="bg-white rounded-lg p-5 mb-4 flex items-center justify-between shadow-sm">          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-base font-semibold text-green-700">
              {busResults.length} Bus{busResults.length !== 1 ? 'es' : ''} found
              {allBusResults.length !== busResults.length && (
                <span className="text-sm font-normal text-gray-500 ml-1">
                  (filtered from {allBusResults.length})
                </span>
              )}
            </span>
          </div>

          <div className="h-8 w-px bg-gray-300 mx-4"></div>

          <div className="flex items-center overflow-x-auto no-scrollbar">
            <div className="bg-gray-100 rounded-lg px-3 py-1.5 flex items-center mr-4">
              <svg className="w-4 h-4 text-gray-700 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Sort By:
              </span>
            </div>

            <div className="flex space-x-4 overflow-x-auto no-scrollbar">              {sortOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSortChange(option)}
                  aria-pressed={sortBy === option}
                  tabIndex="0"
                  role="radio"
                  aria-label={`Sort by ${option}`}
                  className={`text-sm transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded px-2 py-1 ${
                    sortBy === option 
                      ? 'font-semibold text-blue-600 border-b-2 border-blue-600 pb-0.5' 
                      : 'font-medium text-gray-600 hover:text-blue-600'
                  }`}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSortChange(option);
                    }
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="md:w-[300px] flex-shrink-0 sticky top-4 self-start">
            <FilterSection 
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedBoardingPlaces={selectedBoardingPlaces}
              setSelectedBoardingPlaces={setSelectedBoardingPlaces}
              selectedDroppingPlaces={selectedDroppingPlaces}
              setSelectedDroppingPlaces={setSelectedDroppingPlaces}
              selectedBusTypes={selectedBusTypes}
              setSelectedBusTypes={setSelectedBusTypes}
              selectedFacilities={selectedFacilities}
              setSelectedFacilities={setSelectedFacilities}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
            />
          </div>

          {/* Bus Listings */}
          <div className="flex-grow">
            <BusListings 
              buses={busResults} 
              isLoading={isLoading} 
              totalBuses={allBusResults.length}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;