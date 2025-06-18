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
import api from '../../services/api';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
    // Get search results and params from location state
  const { searchResults = [], searchParams = {}, fromLogin = false } = location.state || {};
  
  const [tripType, setTripType] = useState(searchParams.tripType || 'oneWay');
  const [formData, setFormData] = useState({
    from: searchParams.from || '',
    to: searchParams.to || '',
    date: searchParams.date || '',
    returnDate: searchParams.returnDate || ''
  });
    // Set default values or values from search params
  const [fromLocation, setFromLocation] = useState(searchParams.fromCity || 'Birgunj');
  const [toLocation, setToLocation] = useState(searchParams.toCity || 'Kathmandu');  const [travelDate, setTravelDate] = useState(searchParams.date || '06/06/2024');
  const [sortBy, setSortBy] = useState('Earliest');
  const [selectedDepartureTime, setSelectedDepartureTime] = useState('');
    // Bus data will be fetched from API service
    // Filter states
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [selectedBoardingPlaces, setSelectedBoardingPlaces] = useState(['New Bus Park, Kathmandu',
    'Kalanki, Kathmandu',
    'Balkhu, Kathmandu',
    'Koteshwor, Kathmandu',
    'Chabahil, Kathmandu']);
  const [selectedDroppingPlaces, setSelectedDroppingPlaces] = useState(['Adarsha Nagar, Birgunj',
    'Ghantaghar, Birgunj',
    'Birta, Birgunj',
    'Powerhouse, Birgunj',
    'Rangeli, Birgunj'
   ]);
  //const [selectedBusTypes, setSelectedBusTypes] = useState(['Deluxe A/C', 'Super Deluxe']);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);  // Initialize bus results state
  const [allBusResults, setAllBusResults] = useState(searchResults.length > 0 ? searchResults : []);
  const [busResults, setBusResults] = useState(searchResults.length > 0 ? searchResults : []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
    // Fetch bus data from API when component mounts
  useEffect(() => {
    const fetchBusData = async () => {
      setIsLoading(true);
      try {
        // If we have results already, use them
        if (searchResults.length > 0) {
          console.log('Using existing search results');
          return;
        }        // If coming from login with search params, perform the search automatically
        if (fromLogin && searchParams.from && searchParams.to && searchParams.date) {
          console.log('Auto-searching after login with stored search data:', searchParams);
          const searchData = {
            fromCity: searchParams.from,
            toCity: searchParams.to,
            date: searchParams.date,
            returnDate: searchParams.returnDate || '',
            tripType: searchParams.tripType || 'oneWay'
          };
          const data = await api.searchBuses(searchData);
          console.log(' Auto-search results:', data);
          setAllBusResults(data);
          setBusResults(data);
          setError(null); // Clear any previous errors
          return;
        }

        // Otherwise fetch with current form values if we don't have results already
        if (searchResults.length === 0) {
          console.log('🔍 Searching with current form values:', {
            fromCity: fromLocation,
            toCity: toLocation,
            date: travelDate
          });
          const searchData = {
            fromCity: fromLocation,
            toCity: toLocation,
            date: travelDate
          };
          const data = await api.searchBuses(searchData);
          console.log(' Search results received:', data);
          setAllBusResults(data);
          setBusResults(data);
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        console.error(' Bus search error:', err);
        setError(`API Error: ${err.message}`);
        setAllBusResults([]); // Clear any existing results
        setBusResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBusData();
  }, [fromLocation, toLocation, travelDate, searchResults, fromLogin, searchParams]);
    // Effect to update filter section when filters are removed through filter tags
  useEffect(() => {
    // This will ensure the filter sidebar stays in sync with the selected filters
    applyFilters();
  }, [selectedBoardingPlaces, selectedDroppingPlaces, selectedFacilities, selectedRatings, priceRange, selectedDepartureTime]);
  
  // Apply filters to bus results
  const applyFilters = useCallback(() => {
    let filteredResults = [...allBusResults];
      // Filter by price range
    filteredResults = filteredResults.filter(bus => 
      (bus.fare || bus.fair || parseInt((bus.price || '').replace(/[^0-9]/g, ''))) >= priceRange[0] && 
      (bus.fare || bus.fair || parseInt((bus.price || '').replace(/[^0-9]/g, ''))) <= priceRange[1]
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
    
    // // Filter by bus types if any selected
    // if (selectedBusTypes.length > 0) {
    //   filteredResults = filteredResults.filter(bus => 
    //     selectedBusTypes.some(type => 
    //       (bus.busType || bus.type || '').includes(type)
    //     )
    //   );
    // }
    
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
    
    // Filter by departure time if selected
    if (selectedDepartureTime) {
      filteredResults = filteredResults.filter(bus => {
        const departureTime = bus.departureTime || '';
        const [hours, minutes] = departureTime.split(':').map(Number);
        const timeInMinutes = hours * 60 + (minutes || 0);
        
        switch(selectedDepartureTime) {
          case 'Early Morning':
            // Before 6 AM (0:00 - 5:59)
            return timeInMinutes < 360;
          case 'Morning':
            // 6 AM - 11:59 AM
            return timeInMinutes >= 360 && timeInMinutes < 720;
          case 'Afternoon':
            // 12 PM - 5 PM
            return timeInMinutes >= 720 && timeInMinutes < 1020;
          case 'Evening':
            // After 5 PM
            return timeInMinutes >= 1020;
          default:
            return true;
        }
      });
    }
    
    setBusResults(filteredResults);
  }, [allBusResults, priceRange, selectedBoardingPlaces, selectedDroppingPlaces,selectedFacilities, selectedRatings, selectedDepartureTime]);
    // Apply filters when any filter changes or when bus results change
  useEffect(() => {
    if (allBusResults.length > 0) {
      applyFilters();
    }
  }, [applyFilters, allBusResults]);
    // Location options - limited to Kathmandu and Birgunj only
  const locationOptions = [
    { 
      value: 'Kathmandu', 
      label: 'Kathmandu',
      description: 'Stops: New Bus Park, Kalanki, Balkhu, Koteshwor, Chabahil'
    },
    {
      value: 'Birgunj',
      label: 'Birgunj',
      description: 'Stops: Adarsha Nagar, Ghantaghar, Birta, Powerhouse, Rangeli'
    }
  ];

  const sortOptions = ['Earliest', 'Latest', 'Lowest price', 'Highest price','Top rating'];  
  
  // Fetch bus data from API when component mounts or search params change  
  useEffect(() => {
    const fetchBusData = async () => {
      setIsLoading(true);
      try {
        // Create search params object
        const searchParams = {
          fromCity: fromLocation,
          toCity: toLocation,
          date: travelDate
        };
        
        // Update form data when travelDate changes to keep forms in sync
        if (travelDate !== formData.date) {
          // This ensures both the DatePicker and DateSelector show the same date
          setFormData(prev => ({
            ...prev,
            date: travelDate
          }));
        }
          // Fetch bus data from API
        console.log('🔍 Fetching bus data with params:', searchParams);
        const busData = await api.searchBuses(searchParams);
        console.log('📊 Bus data received:', busData);
        setAllBusResults(busData);
        setBusResults(busData);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('❌ Bus fetch error:', error);
        setError(`API Error: ${error.message}`);
        setAllBusResults([]); // Clear any existing results
        setBusResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Only fetch if we don't already have search results from navigation state
    if (searchResults.length === 0) {
      fetchBusData();
    }
  }, [fromLocation, toLocation, travelDate]);
    // Redirect to home if no search data
  useEffect(() => {
    if (!location.state && (!searchResults || searchResults.length === 0)) {
      console.log('No search data available');
    }
  }, [location.state, searchResults]);
  
  // Ensure date format consistency on page load/refresh
  useEffect(() => {
    if (travelDate) {
      // Convert travelDate to standard format if needed
      try {
        const dateObj = new Date(travelDate);
        if (!isNaN(dateObj.getTime())) {
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
          
          // Only update if format is different to avoid loops
          if (formattedDate !== travelDate) {
            setTravelDate(formattedDate);
            setFormData(prev => ({
              ...prev,
              date: formattedDate
            }));
          }
        }
      } catch (e) {
        console.error('Date parsing error:', e);
      }
    }
  }, []);

  // Effect to sort bus results when sortBy changes
  useEffect(() => {
    if (busResults.length === 0) return;
    
    setIsLoading(true);
    
    const sortedResults = [...busResults].sort((a, b) => {
      switch(sortBy) {
        case 'Earliest':
          return (a.departureTime || a.departure_time || '').localeCompare(b.departureTime || b.departure_time || '');
        case 'Latest':
          return (b.departureTime || b.departure_time || '').localeCompare(a.departureTime || a.departure_time || '');        case 'Lowest price':
          const priceA = a.fare || a.fair || parseInt((a.price || '').replace(/[^0-9]/g, '')) || 0;
          const priceB = b.fare || b.fair || parseInt((b.price || '').replace(/[^0-9]/g, '')) || 0;
          return priceA - priceB;
        case 'Highest price':
          const priceC = a.fare || a.fair || parseInt((a.price || '').replace(/[^0-9]/g, '')) || 0;
          const priceD = b.fare || b.fair || parseInt((b.price || '').replace(/[^0-9]/g, '')) || 0;
          return priceD - priceC;
        case 'Top rating':
          return (parseFloat(b.rating || '0') || 0) - (parseFloat(a.rating || '0') || 0);
        default:
          return 0;
      }
    });
    
    setBusResults(sortedResults);
    setTimeout(() => setIsLoading(false), 100); // Small delay for UI feedback
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
        
        // Always sync travelDate with form data
        if (name === 'date') {
          setTravelDate(value);
        }
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
      setToLocation(selectedLocation?.label || value);} else if (name === 'date') {
      // Ensure travelDate and formData.date are always in sync
      setTravelDate(value);
      
      // Special handling for date reset
      if (e.isReset) {
        // When date is reset, set today's date for a consistent reset behavior
        const today = new Date();
        const formattedToday = today.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        
        setTravelDate(formattedToday);
        setFormData(prev => ({
          ...prev,
          date: formattedToday
        }));
        
        // Wait a bit then refresh results
        setTimeout(() => handleSearchAgain(), 300);
        return;
      }
      
      // If this is a date change from the DatePicker, we might want to refresh results
      // But only if it's a direct user interaction (not a programmatic update)
      if (e.isTrusted) {
        // When DatePicker changes, update both travelDate and formData.date
        // and trigger a search to refresh results
        setTimeout(() => handleSearchAgain(), 100);
      }
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
    if (formData.from === formData.to) {
      setError('Departure and destination cannot be the same');
      return;
    }
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
      // Make API call
      const filteredBuses = await api.searchBuses({
        fromCity: formData?.from,
        toCity: formData?.to,
        date: formData?.date,
      });
      if (!filteredBuses || !Array.isArray(filteredBuses)) {
        throw new Error('Unexpected response format');
      }
      if (filteredBuses.length === 0) {
        setError('No buses found for this route and date. Please try different dates or locations.');
        setBusResults([]);
        setAllBusResults([]);
        setIsLoading(false);
        return;
      }
      setBusResults(filteredBuses);
      setAllBusResults(filteredBuses);
      handleUpdateSearchState(filteredBuses);
      document.getElementById('resultsSection')?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      // On error, show error and fallback to default data instantly
      setError('Failed to fetch bus data. Showing default results.');
      const defaultData = await api.getDefaultBuses ? await api.getDefaultBuses() : [
        {
          id: 'default1',
          busName: 'Sona Express',
          busType: 'Deluxe A/C',
          departureTime: '16:00',
          arrivalTime: '20:50',
          boardingPoint: 'New Bus Park, Kathmandu',
          droppingPoint: 'Adarsha Nagar, Birgunj',
          price: 'Rs. 1200',
          availableSeats: 12,
          facilities: ['AC', 'WiFi'],
          rating: '4.8',
        }
      ];
      setBusResults(defaultData);
      setAllBusResults(defaultData);
      handleUpdateSearchState(defaultData);
    } finally {
      setIsLoading(false);
    }
  };

  // Update URL state for browser history after successful search
  const handleUpdateSearchState = (results) => {
    navigate('/search-results', { 
      state: { 
        searchResults: results,
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
            <div className="self-center order-3 mt-3">
              <button 
                onClick={handleSwapLocations}
                className="bg-white rounded-full p-2 mt-3 shadow-md hover:bg-gray-50 transition-colors duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-gray-100"
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
                  value={formData.date || travelDate}
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
            </div>            {/* Search Button */}            <div className="order-6 ml-auto">
              <Button
                variant="primary"
                onClick={handleSearchAgain}
                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 h-[44px] hover:bg-blue-700 shadow-sm transition-all focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer flex items-center justify-center"
                style={{ opacity: isLoading ? 0.8 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}
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
              },
              isTrusted: true // Mark as user interaction
            });
            
            // Update travelDate state to keep both components in sync
            setTravelDate(dateString);
            
            // Automatically trigger search after a short delay
            setTimeout(() => {
              handleSearchAgain();
            }, 100);
          }}
        />{/* Results Header */}
        <div className="bg-white rounded-lg p-5 mb-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
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
              // selectedBusTypes={selectedBusTypes}
              // setSelectedBusTypes={setSelectedBusTypes}
              selectedFacilities={selectedFacilities}
              setSelectedFacilities={setSelectedFacilities}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
              selectedDepartureTime={selectedDepartureTime}
              setSelectedDepartureTime={setSelectedDepartureTime}
            />
          </div>          {/* Bus Listings */}
          <div className="flex-grow" id="resultsSection">            <BusListings 
              buses={busResults} 
              isLoading={isLoading} 
              totalBuses={allBusResults.length}
              travelDate={travelDate}
              onSearchAgain={handleSearchAgain}
              selectedBoardingPlaces={selectedBoardingPlaces}
              selectedDroppingPlaces={selectedDroppingPlaces}
              // selectedBusTypes={selectedBusTypes}
              selectedFacilities={selectedFacilities}
              selectedRatings={selectedRatings}
              priceRange={priceRange}
              // Pass state setters for filter removal functionality
              setSelectedBoardingPlaces={setSelectedBoardingPlaces}
              setSelectedDroppingPlaces={setSelectedDroppingPlaces}
              // setSelectedBusTypes={setSelectedBusTypes}
              setSelectedFacilities={setSelectedFacilities}
              setSelectedRatings={setSelectedRatings}
              setPriceRange={setPriceRange}              selectedDepartureTime={selectedDepartureTime}
              setSelectedDepartureTime={setSelectedDepartureTime}
              onClearFilters={() => {
                // Reset all filters to default values
                setPriceRange([500, 2000]);
                setSelectedBoardingPlaces([]);
                setSelectedDroppingPlaces([]);
                setSelectedBusTypes([]);
                setSelectedFacilities([]);
                setSelectedRatings([]);
                setSelectedDepartureTime(''); // Clear departure time filter
                
                // Trigger a search with the cleared filters
                setTimeout(() => handleSearchAgain(), 100);
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;