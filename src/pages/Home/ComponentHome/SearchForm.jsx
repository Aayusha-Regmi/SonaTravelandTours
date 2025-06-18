import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/ui/InputField';
import Button from '../../../components/ui/Button';
import DatePicker from './UI/DatePickerNew';
import LocationDropdown from './UI/LocationDropdown';
import api from '../../../services/api';
import { isAuthenticated, storeSearchData, redirectToLogin } from '../../../utils/authGuard';

const SearchForm = () => {
  const navigate = useNavigate();
  const searchFormRef = useRef(null);
  const [tripType, setTripType] = useState('oneWay');  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    returnDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [routeOptions, setRouteOptions] = useState([]);
  const [error, setError] = useState(null);
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
  // Fetch available routes when component mounts
  useEffect(() => {
    fetchRoutes();
  }, []);
  
  // Add effect to handle form visibility when user interacts with form inputs
  useEffect(() => {
    // Attach click handlers to form elements that might open dropdowns
    const handleFormElementFocus = () => {
      ensureFormInView();
    };

    const formContainer = searchFormRef.current;
    if (formContainer) {
      // Add listeners to all interactive elements in the form
      const interactiveElements = formContainer.querySelectorAll('button, input, select');
      interactiveElements.forEach(element => {
        element.addEventListener('click', handleFormElementFocus);
        element.addEventListener('focus', handleFormElementFocus);
      });

      return () => {
        // Clean up listeners
        interactiveElements.forEach(element => {
          element.removeEventListener('click', handleFormElementFocus);
          element.removeEventListener('focus', handleFormElementFocus);
        });
      };
    }
  }, []);
  
  const fetchRoutes = async () => {
    try {
      const data = await api.getRoutes();
      
      setRouteOptions(data);
    } catch (err) {
      console.error('Error fetching route data:', err);
      setError('Failed to load route options');
    }
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
  };  const handleInputChange = (e) => {
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
  };  const handleSearch = async () => {
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

    // Check if user is authenticated before proceeding
    if (!isAuthenticated()) {
      console.log('User not authenticated, storing search data and redirecting to login');
        // Store search data for after login
      const searchData = {
        tripType,
        from: formData.from,
        to: formData.to,
        date: formData.date,
        returnDate: formData.returnDate,
        fromCity: formData.from,
        toCity: formData.to
      };
      
      storeSearchData(searchData);
      
      // Redirect to login with return path
      const loginUrl = redirectToLogin('/search-results', searchData);
      navigate(loginUrl);
      return;
    }

    setIsLoading(true);
    setError(null);    try {      console.log('🔍 Searching with data:', { tripType, ...formData });

      // Use the local api.js service for bus search
      const busResults = await api.searchBuses({
        fromCity: formData.from,
        toCity: formData.to,
        date: formData.date,
        returnDate: formData.returnDate,
        tripType: tripType
      });

      console.log('🎯 Search Results Received:', busResults);
      console.log('📊 Number of buses found:', busResults ? busResults.length : 0);

      // Handle empty results
      if (!busResults || !Array.isArray(busResults) || busResults.length === 0) {
        setError('No buses found for this route and date. Please try different dates or locations.');
        setIsLoading(false);
        return;
      }

      // Navigate to search results page with the data
      // First scroll to top
      window.scrollTo(0, 0);
        navigate('/search-results', {
        state: {
          searchResults: busResults,
          searchParams: {
            tripType,
            ...formData,
            fromCity: formData.from,
            toCity: formData.to
          },
        }
      });    } catch (err) {
      console.error('❌ Search error:', err);
      setError(`Search failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLocations = () => {
    setFormData(prevData => ({
      ...prevData,
      from: prevData.to,
      to: prevData.from
    }));
  };  // Helper function to ensure form is visible when dropdown opens
  const ensureFormInView = () => {
    if (searchFormRef.current) {
      const rect = searchFormRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only scroll if the top of the form is out of view
      if (rect.top < 20) { // 20px buffer from top
        const scrollY = window.scrollY || window.pageYOffset;
        const newScrollY = scrollY + rect.top - 20; // Position with small buffer from top
        
        window.scrollTo({
          top: Math.max(0, newScrollY),
          behavior: 'smooth'
        });
      }
      // Don't scroll for cases where the form extends below viewport
      // Let the individual dropdowns handle that with their specific positioning
    }
  };
  
  // Handle window resize events
  useEffect(() => {
    const handleResize = () => {
      // Ensure form is in view after resize completes
      if (searchFormRef.current) {
        setTimeout(ensureFormInView, 100);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);  return (
    <div className="relative w-full max-w-7xl mx-auto -mt-[100px] sm:-mt-[130px] md:-mt-[180px] z-40">
      {/* Trip Type Selector - positioned above the main form */}
      <div className="flex justify-start mb-[-10px] relative z-10">
        <div className="backdrop-blur-md bg-white/40 rounded-t-2xl flex overflow-hidden shadow-lg border border-white/50">
          <button            className={`px-6 py-3 flex items-center justify-center font-medium text-sm transition-all duration-300 ${
              tripType === 'oneWay' 
                ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md' 
                : 'bg-white/30 text-gray-800 hover:bg-white/50'
            }`}
            onClick={() => handleTripTypeChange('oneWay')}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            One Way
          </button>
          <button             className={`px-6 py-3 flex items-center justify-center font-medium text-sm transition-all duration-300 ${
              tripType === 'twoWay' 
                ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md' 
                : 'bg-white/30 text-gray-800 hover:bg-white/50'
            }`}
            onClick={() => handleTripTypeChange('twoWay')}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Two Way
          </button>
        </div>
      </div>      
      {/* Main Search Form */}
      <div ref={searchFormRef} className="backdrop-blur-xl bg-white/30 rounded-3xl p-10 shadow-2xl border border-white/40 w-full relative z-0">
      
      {/* Error message display */}
      {error && (
        <div className="backdrop-blur-md bg-red-500/20 border border-red-300/30 text-red-800 px-4 py-2 rounded-xl mb-4 shadow-lg">
          {error}
        </div>
      )}{/* Search Form */}
      <div className={`grid gap-8 items-end relative ${
        tripType === 'twoWay' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      }`}>
        {/* Date Field(s) */}
        {tripType === 'twoWay' ? (
          <>            
          {/* Departure Date */}
            <div className="lg:col-span-1">
              <div className="backdrop-blur-lg bg-white/50 rounded-2xl p-5 border border-white/60 h-[85px] flex flex-col justify-center shadow-xl hover:bg-white/60 transition-all duration-300">
                <label className="text-gray-800 text-xs font-bold mb-2 uppercase tracking-wider">DATE</label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <DatePicker
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      placeholder="Choose Departure Date"
                      required
                      className="border-0 bg-transparent text-gray-800 font-medium focus:outline-none flex-1 placeholder-gray-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>            {/* Return Date */}
            <div className="lg:col-span-1">
              <div className="backdrop-blur-lg bg-white/50 rounded-2xl p-5 border border-white/60 h-[85px] flex flex-col justify-center shadow-xl hover:bg-white/60 transition-all duration-300">
                <label className="text-gray-800 text-xs font-bold mb-2 uppercase tracking-wider">RETURN</label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <DatePicker
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      placeholder="Choose Return Date"
                      required
                      minDate={formData.date ? (() => {
                        const nextDay = new Date(formData.date.split(' ').join(' '));
                        nextDay.setDate(nextDay.getDate() + 1);
                        return nextDay;
                      })() : new Date()}
                      disabled={!formData.date}
                      className="border-0 bg-transparent text-gray-800 font-medium focus:outline-none flex-1 placeholder-gray-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (          
          /* Single Date for One Way */
          <div className="lg:col-span-1">
            <div className="backdrop-blur-lg bg-white/50 rounded-2xl p-5 border border-white/60 h-[85px] flex flex-col justify-center shadow-xl hover:bg-white/60 transition-all duration-300">
              <label className="text-gray-800 text-xs font-bold mb-2 uppercase tracking-wider">DATE</label>
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <DatePicker
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="Choose Departure Date"
                    required
                    className="border-0 bg-transparent text-gray-800 font-medium focus:outline-none flex-1 placeholder-gray-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}        {/* From Field */}        
        <div className="lg:col-span-1 relative">
          <div className="backdrop-blur-lg bg-white/50 rounded-2xl p-5 border-2 border-orange-400/60 h-[85px] flex flex-col justify-center shadow-xl hover:bg-white/60 transition-all duration-300">
            <label className="text-orange-600 text-xs font-bold mb-2 uppercase tracking-wider">FROM</label>
            <div className="flex items-center justify-between">              <div className="flex items-center flex-1">
                <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <LocationDropdown
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  placeholder="Choose Departure Place"
                  options={locationOptions}
                  required
                  className="border-0 bg-transparent text-gray-800 font-medium focus:outline-none flex-1 placeholder-gray-500 text-sm"
                />
              </div>
            </div>
          </div>        
          </div>

        {/* To Field */}        
        <div className="lg:col-span-1 relative">
          <div className="backdrop-blur-lg bg-white/50 rounded-2xl p-5 border border-white/60 h-[85px] flex flex-col justify-center shadow-xl hover:bg-white/60 transition-all duration-300">
            <label className="text-gray-800 text-xs font-bold mb-2 uppercase tracking-wider">TO</label>
            <div className="flex items-center justify-between">              <div className="flex items-center flex-1">
                <svg className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <LocationDropdown
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="Choose Destination Place"
                  options={locationOptions.filter(option => option.value !== formData.from)}
                  required
                  className="border-0 bg-transparent text-gray-800 font-medium focus:outline-none flex-1 placeholder-gray-500 text-sm"
                />
              </div>
            </div>
          </div>        </div>

        {/* Search Button */}
        <div className="lg:col-span-1">
          <Button 
            onClick={handleSearch}
            className={`h-[85px] w-full rounded-2xl flex items-center justify-center ${
              isLoading 
                ? 'bg-gradient-to-r from-orange-600 to-orange-500' 
                : 'bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500'
            } shadow-2xl transition-all duration-300 border-0 text-white font-bold text-lg uppercase tracking-wide backdrop-blur-sm`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>                
              <span className="animate-spin mr-2">
                  <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span>Searching...</span>
              </>            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>SEARCH</span>
              </>            )}
          </Button>
        </div>          
        {/* Overlay Swap Button - Positioned between FROM and TO fields */}
        <div className={`absolute top-1/2 transform -translate-y-1/2 z-20 hidden lg:block ${
          tripType === 'twoWay' 
            ? 'left-[60%] -translate-x-1/2' 
            : 'left-[50%] -translate-x-1/2'
        }`}>
          <button
            type="button"
            onClick={handleSwapLocations}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm border-4 border-white group"
            disabled={!formData.from && !formData.to}
            title="Swap locations"
          >
            <svg 
              className="w-5 h-5 text-white transform group-hover:rotate-180 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m0-4l4-4" />
            </svg>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SearchForm;
