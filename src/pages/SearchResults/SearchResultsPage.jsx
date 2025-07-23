import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import BusListingHeader from '../../components/common/BusListingHeader';
import BusListings from './ComponentSearch/BusListings';
import DateSelector from './ComponentSearch/DateSelector';
import Button from '../../components/ui/Button';
import LocationDropdown from '../Home/ComponentHome/UI/LocationDropdown';
import DatePicker from '../Home/ComponentHome/UI/DatePicker';
import FloatingActionBar from '../../components/common/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';
import api from '../../services/api';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isVisible, socialActions } = useSocialActions();
  
  // Get search results and params from location state
  const { searchResults = [], searchParams = {}, fromLogin = false } = location.state || {};
  
  console.log('🔍 SearchResults initialized with:', {
    searchResults: searchResults.length,
    searchParams,
    fromLogin,
    tripTypeFromParams: searchParams.tripType
  });
  
  const [tripType, setTripType] = useState(searchParams.tripType || 'oneWay');
  const [activeTab, setActiveTab] = useState('departure'); // New state for two-way tab navigation
  const [formData, setFormData] = useState({
    from: searchParams.from || '',
    to: searchParams.to || '',
    date: searchParams.date || '',
    returnDate: searchParams.returnDate || '' // Use return date from search params
  });
  
  // Set default values or values from search params
  const [fromLocation, setFromLocation] = useState(searchParams.fromCity || 'Birgunj');
  const [toLocation, setToLocation] = useState(searchParams.toCity || 'Kathmandu');
  const [travelDate, setTravelDate] = useState(searchParams.date || '06/06/2024');
  const [sortBy, setSortBy] = useState('Earliest');
  
  // Seat selection state for two-way trips
  const [departureSeats, setDepartureSeats] = useState([]);
  const [returnSeats, setReturnSeats] = useState([]);
  const [departureBusData, setDepartureBusData] = useState(null);
  const [returnBusData, setReturnBusData] = useState(null);
  
  // Initialize bus results state - separate for departure and return
  const [allBusResults, setAllBusResults] = useState(searchResults.length > 0 ? searchResults : []);
  const [departureBusResults, setDepartureBusResults] = useState(searchResults.length > 0 ? searchResults : []);
  const [returnBusResults, setReturnBusResults] = useState([]);
  const [busResults, setBusResults] = useState(searchResults.length > 0 ? searchResults : []);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReturn, setIsLoadingReturn] = useState(false);
  const [error, setError] = useState(null);

  // Get current active results based on tab
  const currentBusResults = tripType === 'twoWay' 
    ? (activeTab === 'departure' ? departureBusResults : returnBusResults)
    : busResults;

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

  // ENHANCED SEARCH FUNCTION FOR TWO-WAY BOOKING
  const performSearch = useCallback(async (searchParams, source = 'unknown') => {
    // Prevent multiple simultaneous searches
    if (isSearchingRef.current) {
      console.log(' Search already in progress, skipping...');
      return;
    }

    // Check if search params actually changed
    const searchKey = `${searchParams.fromCity}-${searchParams.toCity}-${searchParams.date}`;
    if (lastSearchParamsRef.current === searchKey && tripType === 'oneWay') {
      console.log(' Same search parameters, skipping duplicate search');
      return;
    }

    isSearchingRef.current = true;
    lastSearchParamsRef.current = searchKey;

    console.log(` ========== PERFORMING SEARCH (${source.toUpperCase()}) ==========`);
    console.log(' Search Parameters:', searchParams);
    console.log(' Trip Type:', tripType);
    console.log(' Source:', source);
    console.log(' Form Data returnDate:', formData.returnDate);
    console.log(' SearchParams returnDate:', searchParams.returnDate);

    setIsLoading(true);
    setError(null);

    try {
      // Helper function to convert date format
      const convertDate = (dateString) => {
        if (!dateString) return null;
        const dateObj = new Date(dateString);
        if (!isNaN(dateObj.getTime())) {
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }
        return null;
      };

      // Convert departure date
      const departureApiDate = convertDate(searchParams.date);
      if (!departureApiDate) {
        throw new Error('Invalid departure date');
      }

      // Departure journey API call
      const departureApiParams = {
        fromCity: searchParams.fromCity,
        toCity: searchParams.toCity,
        date: departureApiDate
      };

      console.log(' Departure API Request:', departureApiParams);
      const startTime = performance.now();
      
      const departureBusData = await api.searchBuses(departureApiParams);
      
      const endTime = performance.now();
      console.log(` Departure API Response in ${Math.round(endTime - startTime)}ms:`, departureBusData);

      if (!departureBusData || !Array.isArray(departureBusData)) {
        throw new Error('Invalid departure API response format');
      }

      // Update departure results
      setDepartureBusResults(departureBusData);
      setAllBusResults(departureBusData);
      setBusResults(departureBusData);

      // For two-way trips, also search for return journey
      if (tripType === 'twoWay' && (formData.returnDate || searchParams.returnDate)) {
        console.log(' Searching for return journey...');
        console.log(' Return date from formData:', formData.returnDate);
        console.log(' Return date from searchParams:', searchParams.returnDate);
        setIsLoadingReturn(true);

        const returnDateToUse = formData.returnDate || searchParams.returnDate;
        const returnApiDate = convertDate(returnDateToUse);
        if (!returnApiDate) {
          console.warn('Invalid return date, skipping return search');
          setIsLoadingReturn(false);
        } else {
          // Return journey API call (swap from/to)
          const returnApiParams = {
            fromCity: searchParams.toCity,    // Swap destinations
            toCity: searchParams.fromCity,    // Swap destinations
            date: returnApiDate
          };

          console.log('📤 Return API Request:', returnApiParams);
          const returnStartTime = performance.now();
          
          const returnBusData = await api.searchBuses(returnApiParams);
          
          const returnEndTime = performance.now();
          console.log(`📥 Return API Response in ${Math.round(returnEndTime - returnStartTime)}ms:`, returnBusData);

          if (!returnBusData || !Array.isArray(returnBusData)) {
            console.warn('Invalid return API response, setting empty array');
            setReturnBusResults([]);
          } else {
            setReturnBusResults(returnBusData);
          }
          
          setIsLoadingReturn(false);
        }
      } else {
        // Clear return results for one-way trips
        setReturnBusResults([]);
      }

      if (departureBusData.length === 0) {
        console.log('📭 No departure buses found');
        setError('No buses found for this route and date.');
        return;
      }

      console.log(`✅ ${source} search successful - updating UI with ${departureBusData.length} departure buses`);
      setError(null);

      // Update URL state
      navigate('/search-results', { 
        state: { 
          searchResults: departureBusData,
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
      setDepartureBusResults([]);
      setReturnBusResults([]);
    } finally {
      setIsLoading(false);
      setIsLoadingReturn(false);
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
      console.log('🏁 fetchInitialData called with:', {
        searchResultsLength: searchResults.length,
        fromLogin,
        searchParams,
        tripType,
        formData
      });
      
      if (searchResults.length > 0) {
        console.log('✅ Using existing search results from navigation');
        // For two-way trips, still need to search for return if we have return date
        if (tripType === 'twoWay' && (searchParams.returnDate || formData.returnDate)) {
          console.log('🔄 Existing results but need return search for two-way');
          const searchData = {
            fromCity: searchParams.fromCity || formData.from,
            toCity: searchParams.toCity || formData.to,
            date: searchParams.date || formData.date,
            returnDate: searchParams.returnDate || formData.returnDate
          };
          await performSearch(searchData, 'two-way-return-search');
        }
        return;
      }

      if (fromLogin && searchParams.from && searchParams.to && searchParams.date) {
        console.log('🔄 Auto-searching after login');
        const searchData = {
          fromCity: searchParams.from,
          toCity: searchParams.to,
          date: searchParams.date,
          returnDate: searchParams.returnDate // Include return date for login scenarios
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
    if (currentBusResults.length === 0) return;
    
    setIsLoading(true);
    
    const sortedResults = [...currentBusResults].sort((a, b) => {
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
    
    // Update the appropriate bus results based on active tab
    if (tripType === 'twoWay') {
      if (activeTab === 'departure') {
        setDepartureBusResults(sortedResults);
        setBusResults(sortedResults);
      } else {
        setReturnBusResults(sortedResults);
      }
    } else {
      setBusResults(sortedResults);
    }
    
    setTimeout(() => setIsLoading(false), 100);
  }, [sortBy, activeTab, tripType]);

  // UPDATED handleInputChange - IMMEDIATE API CALLS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`📝 Input change: ${name} = ${value} (source: ${e.isTrusted ? 'user' : 'programmatic'})`);

    // Special logic for departure date in two-way trip
    if (name === 'date' && tripType === 'twoWay' && formData.returnDate) {
      // Compare new departure date and current return date
      const newDeparture = new Date(value.split(' ').join(' '));
      const currentReturn = new Date(formData.returnDate.split(' ').join(' '));
      if (newDeparture >= currentReturn) {
        // Reset return date if new departure is after or same as return
        setFormData(prev => ({
          ...prev,
          date: value,
          returnDate: ''
        }));
        setTravelDate(value);
        setError(null);
        // Optionally, show a toast
        toast.info('Return date has been reset. Please select a new return date after the new departure date.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // No search triggered until new return date is selected
        return;
      }
    }

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
    } else if (name === 'returnDate') {
      // Handle return date changes for two-way trips
      if (tripType === 'twoWay') {
        if (value) {
          setError(null);
          // Trigger search for both journeys if we have all required data
          if (formData.from && formData.to && formData.date) {
            const searchParams = {
              fromCity: formData.from,
              toCity: formData.to,
              date: formData.date
            };
            triggerSearch(searchParams, 'return-date-change', 100);
          }
        } else {
          const errorMessage = 'Enter Return date';
          setError(errorMessage);
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
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
    
    if (tripType === 'twoWay' && !formData.returnDate) {
      console.log('❌ Validation failed: Missing return date for two-way trip');
      const errorMessage = 'Enter Return date';
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
    
    // Reset tab to departure when switching trip types
    setActiveTab('departure');
    
    // If switching to two way, validate return date requirement and show toast notification
    if (type === 'twoWay') {
      if (!formData.returnDate) {
        const errorMessage = 'Enter Return date';
        setError(errorMessage);
        // Show toast notification
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return; // Don't trigger search without return date
      } else {
        setError(null);
        // Only trigger search if we have all required data
        if (formData.from && formData.to && formData.date) {
          const searchParams = {
            fromCity: formData.from,
            toCity: formData.to,
            date: formData.date
          };
          triggerSearch(searchParams, 'trip-type-change', 100);
        }
      }
    } else {
      setError(null);
      // Clear return results when switching to one-way
      setReturnBusResults([]);
      setIsLoadingReturn(false);
    }
  };

  // New function to handle tab changes for two-way trips
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null); // Clear any errors when switching tabs
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12 max-w-7xl mt-12 sm:mt-6 lg:mt-0">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm font-medium text-gray-400">Home</span>
          <div className="w-1 h-3 sm:h-4 bg-gray-300 transform rotate-12"></div>
          <span className="text-xs sm:text-sm font-semibold text-gray-700">Search Results</span>
        </div>

        {/* Error message display */}
        {error && (
          <div className="backdrop-blur-md bg-red-50/80 border border-red-200/50 text-red-600 px-4 py-3 rounded-xl mb-4 shadow-lg">
            {error}
          </div>
        )}

        {/* Search Section - Glass Morphism */}
        <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 lg:p-6 mb-6 sm:mb-8 transform hover:scale-[1.01] transition-all duration-300 relative z-10"
             style={{
               boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)'
             }}>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-end gap-3 sm:gap-4 lg:gap-3">
            {/* Trip Type Selector */}
            <div className="flex flex-col order-1 w-full sm:w-[130px] lg:w-[150px]">
              <label htmlFor="tripType" className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Trip Type</label>
              <div className="relative">
                <select 
                  id="tripType"
                  value={tripType}
                  onChange={(e) => handleTripTypeChange(e.target.value)}
                  className="w-full appearance-none backdrop-blur-sm bg-white/50 border border-white/30 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-lg h-[38px] sm:h-[42px] transition-all duration-300"
                  aria-label="Select trip type"
                >
                  <option value="oneWay">One Way</option>
                  <option value="twoWay">Two Ways</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* From Location */}
            <div className="w-full sm:w-[160px] lg:w-[200px] order-2">
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

            {/* To Location */}
            <div className="w-full sm:w-[160px] lg:w-[200px] order-4 sm:order-3">
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

            {/* Mobile Swap Button */}
            <div className="flex justify-center order-3 sm:hidden w-full">
              <button 
                onClick={handleSwapLocations}
                className="backdrop-blur-sm bg-white/50 border border-white/30 rounded-full p-2 shadow-lg hover:bg-white/70 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300/50 active:scale-95 transform"
                title="Swap locations"
                aria-label="Swap departure and destination locations"
              >
                <img 
                  src="/images/img_hicon_linear_arrow_swap_horizontal.svg" 
                  alt="Swap" 
                  className="w-5 h-5 transition-transform duration-300 ease-in-out hover:rotate-180"
                />
              </button>
            </div>

            {/* Desktop Swap Button */}
            <div className="hidden sm:flex self-center order-4 lg:order-3 mt-3">
              <button 
                onClick={handleSwapLocations}
                className="backdrop-blur-sm bg-white/50 border border-white/30 rounded-full p-3 mt-3 shadow-lg hover:bg-white/70 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300/50 active:scale-95 transform"
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

            {/* Date Pickers with more compact layout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end space-y-3 sm:space-y-0 sm:space-x-3 flex-nowrap order-5 w-full sm:w-auto">
              {/* Departure Date */}
              <div className={tripType === 'twoWay' ? 'w-full sm:w-[140px] lg:w-[170px]' : 'w-full sm:w-[160px] lg:w-[200px]'}>
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
                <div className="w-full sm:w-[140px] lg:w-[170px]">
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
            <div className="order-6 w-full sm:w-auto sm:ml-auto">
              <Button
                variant="primary"
                onClick={handleSearchAgain}
                className="w-full sm:w-[140px] backdrop-blur-sm bg-gradient-to-r from-blue-600/90 to-purple-600/90 border border-white/20 text-white rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 h-[38px] sm:h-[44px] hover:from-blue-700/90 hover:to-purple-700/90 shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 cursor-pointer flex items-center justify-center transform hover:scale-105 active:scale-95"
                style={{ opacity: isLoading ? 0.8 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full">
                    <span className="animate-spin mr-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Searching...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Search Again</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Date Selector - UPDATED TO USE NEW APPROACH */}
        <DateSelector 
          initialDate={formData.date || travelDate}
          departureDate={formData.date}
          returnDate={formData.returnDate}
          onDateChange={(dateString, dateObj, action) => {
            console.log('📅 DateSelector change:', dateString, 'Action:', action);
            
            // Handle different types of date selection
            if (action === 'returnDate') {
              // Update return date only
              setFormData(prev => ({ 
                ...prev, 
                returnDate: dateString
              }));
            } else if (action === 'resetReturn') {
              // Update departure and reset return date
              setTravelDate(dateString);
              setFormData(prev => ({ 
                ...prev, 
                date: dateString,
                returnDate: null
              }));
            } else {
              // Update departure date (default behavior)
              setTravelDate(dateString);
              setFormData(prev => ({ 
                ...prev, 
                date: dateString
              }));
            }
            
            // Trigger immediate search
            if ((formData.from || fromLocation) && (formData.to || toLocation)) {
              const searchParams = {
                fromCity: formData.from || fromLocation,
                toCity: formData.to || toLocation,
                date: action === 'returnDate' ? (formData.date || travelDate) : dateString
              };
              triggerSearch(searchParams, 'date-selector', 100);
            }
          }}
        />

        {/* Results Header - Glass Morphism */}
        <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-xl transform hover:scale-[1.01] transition-all duration-300"
             style={{
               boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)'
             }}>
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center mr-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-sm sm:text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {currentBusResults.length} Bus{currentBusResults.length !== 1 ? 'es' : ''} found
              </span>
              {tripType === 'twoWay' && (
                <span className="text-xs sm:text-sm font-normal text-gray-600 sm:ml-2">
                  ({activeTab === 'departure' ? 'Departure' : 'Return'} Journey)
                </span>
              )}
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-4"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto overflow-x-auto no-scrollbar">
            <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1 sm:py-2 flex items-center mb-3 sm:mb-0 sm:mr-4">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                Sort By:
              </span>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:space-x-4 overflow-x-auto no-scrollbar w-full sm:w-auto">
              {sortOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSortChange(option)}
                  aria-pressed={sortBy === option}
                  tabIndex="0"
                  role="radio"
                  aria-label={`Sort by ${option}`}
                  className={`text-xs sm:text-sm transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 rounded-lg px-2 sm:px-3 py-1 sm:py-2 transform hover:scale-105 ${
                    sortBy === option 
                      ? 'font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent backdrop-blur-sm bg-white/30 border border-white/30 shadow-lg' 
                      : 'font-medium text-gray-600 hover:text-blue-600 hover:bg-white/20'
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
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Bus Listings */}
          <div className="flex-grow" id="resultsSection">
            {/* Two-Way Tab Navigation - Enhanced Glass Morphism with Gradient */}
            {tripType === 'twoWay' && (
              <div className="backdrop-blur-md bg-gradient-to-r from-green-100/30 to-teal-100/30 border border-green-200/40 rounded-xl sm:rounded-2xl p-3 sm:p-6 mb-4 sm:mb-6 shadow-lg">
                <div className="flex backdrop-blur-sm bg-gradient-to-r from-green-50/20 to-teal-50/20 border border-green-200/30 rounded-lg sm:rounded-xl p-1 shadow-inner">
                  <button
                    onClick={() => handleTabChange('departure')}
                    className={`flex-1 py-2 sm:py-4 px-3 sm:px-6 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      activeTab === 'departure'
                        ? 'bg-gradient-to-r from-green-400/90 to-teal-500/90 text-white shadow-lg backdrop-blur-md border border-green-300/50'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-green-200/30 hover:to-teal-200/30 hover:text-green-800'
                    }`}
                  >
                    For Departure
                  </button>
                  
                  <button
                    onClick={() => handleTabChange('return')}
                    disabled={!formData.returnDate}
                    className={`flex-1 py-2 sm:py-4 px-3 sm:px-6 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      activeTab === 'return'
                        ? 'bg-gradient-to-r from-green-400/90 to-teal-500/90 text-white shadow-lg backdrop-blur-md border border-green-300/50'
                        : formData.returnDate 
                          ? 'text-gray-700 hover:bg-gradient-to-r hover:from-green-200/30 hover:to-teal-200/30 hover:text-green-800'
                          : 'text-gray-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    For Return
                  </button>
                </div>
              </div>
            )}
            
            {/* Bus Listing Header */}
            <BusListingHeader 
              title="Available Buses"
              subtitle="Multiple Types"
              departureDate={formData.date || travelDate}
              returnDate={formData.returnDate}
              fromCity={fromLocation}
              toCity={toLocation}
              duration="6h 15m"
              tripType={tripType}
              showDates={true}
            />
            
            <BusListings 
              buses={currentBusResults} 
              isLoading={tripType === 'twoWay' ? (activeTab === 'departure' ? isLoading : isLoadingReturn) : isLoading}
              totalBuses={currentBusResults.length}
              travelDate={activeTab === 'departure' ? travelDate : formData.returnDate}
              onSearchAgain={handleSearchAgain}
              searchParams={searchParams}
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
              onTabChange={handleTabChange}
            />
          </div>
        </div>
      </main>

      <Footer />
      <FloatingActionBar
        isVisible={isVisible}
        socialActions={socialActions}
      />
    </div>
  );
};

export default SearchResultsPage;