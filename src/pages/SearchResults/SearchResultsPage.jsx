import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
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
  const [toLocation, setToLocation] = useState(searchParams.toCity || 'Kathmandu');
  const [travelDate, setTravelDate] = useState(searchParams.date || '06/06/2024');
  const [sortBy, setSortBy] = useState('Earliest');
  
  // Initialize bus results state
  const [allBusResults, setAllBusResults] = useState(searchResults.length > 0 ? searchResults : []);
  const [busResults, setBusResults] = useState(searchResults.length > 0 ? searchResults : []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Refs for debouncing and preventing multiple calls
  const searchTimeoutRef = useRef(null);
  const lastSearchParamsRef = useRef(null);
  const isSearchingRef = useRef(false);

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

  // DEBOUNCED SEARCH FUNCTION - NEW APPROACH
  const performSearch = useCallback(async (searchParams, source = 'unknown') => {
    // Prevent multiple simultaneous searches
    if (isSearchingRef.current) {
      console.log('🚫 Search already in progress, skipping...');
      return;
    }

    // Check if search params actually changed
    const searchKey = `${searchParams.fromCity}-${searchParams.toCity}-${searchParams.date}`;
    if (lastSearchParamsRef.current === searchKey) {
      console.log('🚫 Same search parameters, skipping duplicate search');
      return;
    }

    isSearchingRef.current = true;
    lastSearchParamsRef.current = searchKey;

    console.log(`🚀 ========== PERFORMING SEARCH (${source.toUpperCase()}) ==========`);
    console.log('📥 Search Parameters:', searchParams);
    console.log('📥 Source:', source);

    setIsLoading(true);
    setError(null);

    try {
      // Convert date format before API call
      let apiDate = searchParams.date;
      if (searchParams.date) {
        const dateObj = new Date(searchParams.date);
        if (!isNaN(dateObj.getTime())) {
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          apiDate = `${year}-${month}-${day}`;
          
          console.log('🗓️ Date conversion for', source + ':');
          console.log('   Original date:', searchParams.date);
          console.log('   Converted date:', apiDate);
        }
      }

      const apiParams = {
        fromCity: searchParams.fromCity,
        toCity: searchParams.toCity,
        date: apiDate
      };

      console.log('📤 API Request from', source + ':', apiParams);
      const startTime = performance.now();
      
      const busData = await api.searchBuses(apiParams);
      
      const endTime = performance.now();
      console.log(`📥 API Response (${source}) in ${Math.round(endTime - startTime)}ms:`, busData);
      console.log('   Available seats in first bus:', busData[0]?.availableSeats);
      console.log('   Booked seats in first bus:', busData[0]?.bookedSeats);

      if (!busData || !Array.isArray(busData)) {
        throw new Error('Invalid API response format');
      }

      if (busData.length === 0) {
        console.log('📭 No buses found');
        setError('No buses found for this route and date.');
        setBusResults([]);
        setAllBusResults([]);
        return;
      }

      console.log(`✅ ${source} search successful - updating UI with ${busData.length} buses`);
      setAllBusResults(busData);
      setBusResults(busData);
      setError(null);

      // Update URL state
      navigate('/search-results', { 
        state: { 
          searchResults: busData,
          searchParams: { 
            tripType, 
            ...formData,
            fromCity: searchParams.fromCity,
            toCity: searchParams.toCity
          } 
        },
        replace: true
      });

      console.log(`🏁 ========== ${source.toUpperCase()} SEARCH COMPLETED ==========`);

    } catch (error) {
      console.error(`❌ ${source} search error:`, error);
      setError(`Search failed: ${error.message}`);
      setAllBusResults([]);
      setBusResults([]);
    } finally {
      setIsLoading(false);
      isSearchingRef.current = false;
    }
  }, [navigate, tripType, formData]);

  // DEBOUNCED SEARCH TRIGGER
  const triggerSearch = useCallback((searchParams, source = 'auto', delay = 300) => {
    console.log(`🕐 Scheduling ${source} search in ${delay}ms...`);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(searchParams, source);
    }, delay);
  }, [performSearch]);

  // Initial fetch on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      if (searchResults.length > 0) {
        console.log('✅ Using existing search results from navigation');
        return;
      }

      if (fromLogin && searchParams.from && searchParams.to && searchParams.date) {
        console.log('🔄 Auto-searching after login');
        const searchData = {
          fromCity: searchParams.from,
          toCity: searchParams.to,
          date: searchParams.date
        };
        await performSearch(searchData, 'login-redirect');
        return;
      }

      // Initial search with current values
      if (fromLocation && toLocation && travelDate) {
        const initialParams = {
          fromCity: fromLocation,
          toCity: toLocation,
          date: travelDate
        };
        await performSearch(initialParams, 'initial-load');
      }
    };

    fetchInitialData();
  }, []); // Only run once on mount

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
    setTimeout(() => setIsLoading(false), 100);
  }, [sortBy]);

  // UPDATED handleInputChange - IMMEDIATE API CALLS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    console.log(`📝 Input change: ${name} = ${value} (source: ${e.isTrusted ? 'user' : 'programmatic'})`);
    
    // Update form data immediately
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle specific input types
    if (name === 'from') {
      const selectedLocation = locationOptions.find(loc => loc.value === value);
      setFromLocation(selectedLocation?.label || value);
      
      // Trigger search immediately for location change
      if (value && formData.to && (formData.date || travelDate)) {
        const searchParams = {
          fromCity: value,
          toCity: formData.to,
          date: formData.date || travelDate
        };
        triggerSearch(searchParams, 'from-location-change', 100);
      }
      
    } else if (name === 'to') {
      const selectedLocation = locationOptions.find(loc => loc.value === value);
      setToLocation(selectedLocation?.label || value);
      
      // Trigger search immediately for location change
      if (formData.from && value && (formData.date || travelDate)) {
        const searchParams = {
          fromCity: formData.from,
          toCity: value,
          date: formData.date || travelDate
        };
        triggerSearch(searchParams, 'to-location-change', 100);
      }
      
    } else if (name === 'date') {
      setTravelDate(value);
      
      console.log('🗓️ Date change detected:');
      console.log('   New date:', value);
      console.log('   Is user interaction:', e.isTrusted);
      
      // Trigger search immediately for date change if we have locations
      if ((formData.from || fromLocation) && (formData.to || toLocation) && value) {
        const searchParams = {
          fromCity: formData.from || fromLocation,
          toCity: formData.to || toLocation,
          date: value
        };
        triggerSearch(searchParams, 'date-change', 100);
      }
    }
  };
  
  const handleSwapLocations = () => {
    const newFrom = formData.to;
    const newTo = formData.from;
    
    console.log('🔄 Swapping locations:', newFrom, '↔', newTo);
    
    setFormData(prevData => ({
      ...prevData,
      from: newFrom,
      to: newTo
    }));
    
    // Update display values
    setFromLocation(locationOptions.find(loc => loc.value === newFrom)?.label || newFrom);
    setToLocation(locationOptions.find(loc => loc.value === newTo)?.label || newTo);
    
    // Trigger search immediately after swap
    if (newFrom && newTo && (formData.date || travelDate)) {
      const searchParams = {
        fromCity: newFrom,
        toCity: newTo,
        date: formData.date || travelDate
      };
      triggerSearch(searchParams, 'location-swap', 100);
    }
  };

  // SIMPLIFIED handleSearchAgain - IMMEDIATE API CALL
  const handleSearchAgain = async () => {
    console.log('🔄 ========== MANUAL SEARCH AGAIN CLICKED ==========');
    console.log('📥 Current form data:', formData);
    
    // Validation
    if (!formData.from || !formData.to || !formData.date) {
      console.log('❌ Validation failed: Missing required fields');
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.from === formData.to) {
      console.log('❌ Validation failed: Same departure and destination');
      setError('Departure and destination cannot be the same');
      return;
    }
    
    console.log('✅ Validation passed - triggering immediate search');
    
    const searchParams = {
      fromCity: formData.from,
      toCity: formData.to,
      date: formData.date
    };
    
    // Immediate search with no delay for manual button click
    await performSearch(searchParams, 'manual-search-again');
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('resultsSection')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
  };

  const handleSortChange = (option) => {
    setSortBy(option);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
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
        )}

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-8">
          <div className="flex flex-wrap items-end gap-4 lg:gap-3">
            {/* Trip Type Selector */}
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
            </div>

            {/* From Location */}
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
            </div>

            {/* Swap Button */}
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
            </div>

            {/* Date Pickers with more compact layout */}
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
            </div>

            {/* Search Button */}
            <div className="order-6 ml-auto">
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
          </div>
        </div>

        {/* Date Selector - UPDATED TO USE NEW APPROACH */}
        <DateSelector 
          initialDate={formData.date || travelDate}
          onDateChange={(dateString, dateObj) => {
            console.log('📅 DateSelector change:', dateString);
            
            // Update states immediately
            setTravelDate(dateString);
            setFormData(prev => ({ ...prev, date: dateString }));
            
            // Trigger immediate search
            if ((formData.from || fromLocation) && (formData.to || toLocation)) {
              const searchParams = {
                fromCity: formData.from || fromLocation,
                toCity: formData.to || toLocation,
                date: dateString
              };
              triggerSearch(searchParams, 'date-selector', 100);
            }
          }}
        />

        {/* Results Header */}
        <div className="bg-white rounded-lg p-5 mb-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-base font-semibold text-green-700">
              {busResults.length} Bus{busResults.length !== 1 ? 'es' : ''} found
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

            <div className="flex space-x-4 overflow-x-auto no-scrollbar">
              {sortOptions.map((option, index) => (
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
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Bus Listings */}
          <div className="flex-grow" id="resultsSection">
            <BusListings 
              buses={busResults} 
              isLoading={isLoading} 
              totalBuses={allBusResults.length}
              travelDate={travelDate}
              onSearchAgain={handleSearchAgain}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;