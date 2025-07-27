import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/ui/InputField';
import Button from '../../../components/ui/Button';
import DatePicker from './UI/DatePicker';
import LocationDropdown from './UI/LocationDropdown';
import api from '../../../services/api';
import { isAuthenticated, storeSearchData, redirectToLogin } from '../../../utils/authGuard';
import { useUserActionTracking, useStateRestoration, useFormTracking } from '../../../hooks/useUserActionTracking';

// Mobile scroll lock utility
const useMobileScrollLock = () => {
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  
  useEffect(() => {
    if (window.innerWidth <= 1024 && isScrollLocked) {
      // Lock scroll position on mobile
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        // Unlock scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isScrollLocked]);
  
  return { setIsScrollLocked };
};

const SearchForm = () => {
  const navigate = useNavigate();
  const searchFormRef = useRef(null);
  const { setIsScrollLocked } = useMobileScrollLock();
  
  // Initialize user action tracking
  const { trackSearchForm, trackAction } = useUserActionTracking();
  const { shouldRestoreState, getSearchRestoration } = useStateRestoration();
  
  const [tripType, setTripType] = useState('oneWay');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    returnDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [routeOptions, setRouteOptions] = useState([]);
  const [error, setError] = useState(null);

  // Auto-track form changes
  useFormTracking('search_form', formData, { debounceMs: 2000 });

  // Check for restoration data on component mount
  useEffect(() => {
    if (shouldRestoreState()) {
      const searchRestoration = getSearchRestoration();
      if (searchRestoration) {
        console.log('🔄 Restoring search form data:', searchRestoration);
        setFormData(prev => ({
          ...prev,
          ...searchRestoration
        }));
        
        if (searchRestoration.tripType) {
          setTripType(searchRestoration.tripType);
        }
        
        // Track restoration
        trackAction('SEARCH_FORM_RESTORED', {
          restoredData: searchRestoration
        });
      }
    }
  }, [shouldRestoreState, getSearchRestoration, trackAction]);

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
  
  // Completely disable auto-scroll behavior for mobile devices, enable smart scroll for desktop
  useEffect(() => {
    // Check if device is mobile/tablet
    const isMobile = window.innerWidth <= 1024;
    
    if (isMobile) {
      // On mobile, completely disable any auto-scroll functionality
      // Override any scroll methods that might be called
      const originalScrollTo = window.scrollTo;
      const originalScrollIntoView = Element.prototype.scrollIntoView;
      
      // Disable scrollTo on mobile for this component
      window.scrollTo = function() {
        const args = Array.from(arguments);
        // Only allow manual scrolling, not programmatic
        if (args.length === 0 || (args[0] && typeof args[0] === 'object' && args[0].behavior !== 'smooth')) {
          try {
            return originalScrollTo.apply(window, args);
          } catch (e) {
            // Fallback to direct scroll if apply fails
            if (args[0] && typeof args[0] === 'number') {
              window.pageYOffset = args[1] || 0;
              window.pageXOffset = args[0] || 0;
            }
          }
        }
        // Block smooth scrolling on mobile
        return;
      };
      
      // Disable scrollIntoView on mobile
      Element.prototype.scrollIntoView = function() {
        // Block all scrollIntoView calls on mobile
        return;
      };
      
      // Cleanup function to restore original methods
      return () => {
        window.scrollTo = originalScrollTo;
        Element.prototype.scrollIntoView = originalScrollIntoView;
      };
    }

    // Desktop behavior - smart auto-scroll when form elements are clicked
    const handleFormInteraction = (event) => {
      const target = event.target;
      const isFormElement = target.closest('[data-dropdown-trigger]') || 
                           target.closest('.date-picker') || 
                           target.closest('.location-dropdown');
      
      if (isFormElement) {
        // Add a small delay to ensure the element is ready
        setTimeout(() => {
          ensureFormInViewForDesktop();
        }, 150);
      }
    };

    const formContainer = searchFormRef.current;
    if (formContainer) {
      // Add listeners to form container for better event capture
      formContainer.addEventListener('click', handleFormInteraction);
      formContainer.addEventListener('focus', handleFormInteraction, true);

      return () => {
        formContainer.removeEventListener('click', handleFormInteraction);
        formContainer.removeEventListener('focus', handleFormInteraction, true);
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
  };

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
  };

  const handleSearch = async () => {
    // Track search attempt
    trackSearchForm({
      tripType,
      from: formData.from,
      to: formData.to,
      date: formData.date,
      returnDate: formData.returnDate,
      fromCity: formData.from,
      toCity: formData.to
    });
    
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
      
      // Track authentication requirement
      trackAction('AUTHENTICATION_REQUIRED', {
        reason: 'search_initiation',
        searchData: {
          tripType,
          from: formData.from,
          to: formData.to,
          date: formData.date,
          returnDate: formData.returnDate
        }
      });
      
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
    setError(null);
    
    try {
      console.log('🔍 Searching with data:', { tripType, ...formData });

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
      // First scroll to top (safely handle mobile overrides)
      if (window.scrollTo && typeof window.scrollTo === 'function') {
        try {
          window.scrollTo(0, 0);
        } catch (scrollError) {
          // Fallback if scrollTo fails
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      }
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
      });
    } catch (err) {
      console.error('❌ Search error:', err);
      const errorMessage = err?.message || err?.toString() || 'An unexpected error occurred';
      setError(`Search failed: ${errorMessage}`);
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
  };

  // Helper function to ensure form is visible on desktop with perfect positioning
  const ensureFormInViewForDesktop = () => {
    // Only work on desktop devices
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
      return; // Exit early on mobile devices
    }

    if (searchFormRef.current) {
      const rect = searchFormRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const headerHeight = 80; // Adjust based on your header height
      const buffer = 20; // Additional spacing from top
      
      // Calculate ideal position - form should be visible with some space from header
      const idealTop = headerHeight + buffer;
      
      // Check if form needs repositioning
      const needsScroll = rect.top < idealTop || rect.top > windowHeight * 0.7;
      
      if (needsScroll) {
        const scrollY = window.scrollY || window.pageYOffset;
        // Calculate new scroll position to place form at ideal position
        const newScrollY = scrollY + rect.top - idealTop;
        
        window.scrollTo({
          top: Math.max(0, newScrollY),
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle window resize events - remove auto-scroll completely
  useEffect(() => {
    const handleResize = () => {
      // Remove any auto-scroll behavior on resize to prevent unwanted scrolling
      // Just let the natural responsive behavior handle layout changes
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto -mt-[280px] xs:-mt-[240px] sm:-mt-[200px] md:-mt-[240px] lg:-mt-[270px] xl:-mt-[300px] z-40 px-3 xs:px-4 sm:px-6 lg:px-8">
      {/* Trip Type Selector - positioned above the main form */}
      <div className="flex justify-center sm:justify-start mb-[-8px] sm:mb-[-10px] relative z-10">
        <div className="backdrop-blur-md bg-white/40 rounded-t-xl sm:rounded-t-2xl flex overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/50 w-full sm:w-auto">
          <button
            className={`flex-1 sm:flex-none px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 flex items-center justify-center font-medium text-xs xs:text-sm transition-all duration-300 ${
              tripType === 'oneWay' 
                ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_8px_25px_rgba(251,146,60,0.4)]' 
                : 'bg-white/30 text-gray-800 hover:bg-white/50 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)]'
            }`}
            onClick={() => handleTripTypeChange('oneWay')}
          >
            <svg className="w-3 h-3 xs:w-4 xs:h-4 mr-1.5 xs:mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="whitespace-nowrap">One Way</span>
          </button>
          
          <button
            className={`flex-1 sm:flex-none px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 flex items-center justify-center font-medium text-xs xs:text-sm transition-all duration-300 ${
              tripType === 'twoWay' 
                ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_8px_25px_rgba(251,146,60,0.4)]' 
                : 'bg-white/30 text-gray-800 hover:bg-white/50 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)]'
            }`}
            onClick={() => handleTripTypeChange('twoWay')}
          >
            <svg className="w-3 h-3 xs:w-4 xs:h-4 mr-1.5 xs:mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="whitespace-nowrap">Two Way</span>
          </button>
        </div>
      </div>

      {/* Main Search Form */}
      <div ref={searchFormRef} className="backdrop-blur-xl bg-white/30 rounded-2xl xs:rounded-3xl p-4 xs:p-6 sm:p-8 lg:p-10 shadow-[0_25px_50px_rgba(0,0,0,0.6)] border border-white/40 w-full relative z-0">
        {/* Error message display */}
        {error && (
          <div className="backdrop-blur-md bg-red-500/20 border border-red-300/30 text-red-800 px-3 xs:px-4 py-2 rounded-lg xs:rounded-xl mb-3 xs:mb-4 shadow-[0_10px_25px_rgba(239,68,68,0.4)] text-sm xs:text-base">
            {error}
          </div>
        )}

        {/* Search Form */}
        <div className={`grid gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-8 items-end relative ${
          tripType === 'twoWay' 
            ? 'grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5' 
            : 'grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4'
        }`}>
          {/* Date Field(s) */}
          {tripType === 'twoWay' ? (
            <>
              {/* Departure Date */}
              <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 relative z-[2147483647] w-full">
                <div className="backdrop-blur-lg bg-white/50 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-5 lg:p-5 border border-white/60 h-[60px] xs:h-[70px] sm:h-[75px] md:h-[85px] lg:h-[85px] flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:bg-white/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 w-full">
                  <label className="text-gray-800 text-[10px] xs:text-xs font-bold mb-1 xs:mb-2 uppercase tracking-wider">DATE</label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 relative z-[2147483647]">
                      <DatePicker
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        placeholder="Choose Departure Date"
                        required
                        data-dropdown-trigger="true"
                        className="border-0 bg-transparent text-gray-800 font-medium focus:outline-none flex-1 placeholder-gray-500 text-xs xs:text-sm date-picker"
                        containerClassName="relative z-[2147483647]"
                        popperClassName="z-[2147483647]"
                        wrapperClassName="w-full relative z-[2147483647]"
                        style={{ zIndex: 2147483647 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Date */}
              <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 relative z-[2147483646] w-full">
                <div className="backdrop-blur-lg bg-white/50 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-5 lg:p-5 border border-white/60 h-[60px] xs:h-[70px] sm:h-[75px] md:h-[85px] lg:h-[85px] flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:bg-white/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 w-full">
                  <label className="text-gray-800 text-[10px] xs:text-xs font-bold mb-1 xs:mb-2 uppercase tracking-wider">RETURN</label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 relative z-[2147483646]">
                      <DatePicker
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        placeholder="Choose Return Date"
                        required
                        data-dropdown-trigger="true"
                        minDate={formData.date ? (() => {
                          const nextDay = new Date(formData.date.split(' ').join(' '));
                          nextDay.setDate(nextDay.getDate() + 1);
                          return nextDay;
                        })() : new Date()}
                        disabled={!formData.date}
                        className="border-0 bg-transparent text-gray-800 font-medium focus:outline-none flex-1 placeholder-gray-500 text-xs xs:text-sm date-picker"
                        containerClassName="relative z-[2147483646]"
                        popperClassName="z-[2147483646]"
                        wrapperClassName="w-full relative z-[2147483646]"
                        style={{ zIndex: 2147483646 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Single Date for One Way */
            <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 relative z-[2147483647] w-full">
              <div className="backdrop-blur-lg bg-white/50 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-5 lg:p-5 border border-white/60 h-[60px] xs:h-[70px] sm:h-[75px] md:h-[85px] lg:h-[85px] flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:bg-white/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 w-full">
                <label className="text-gray-800 text-[10px] xs:text-xs font-bold mb-1 xs:mb-2 uppercase tracking-wider">DATE</label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1 relative z-[2147483647]">
                    <DatePicker
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      placeholder="Choose Departure Date"
                      required
                      data-dropdown-trigger="true"
                      className="border-0 bg-transparent text-gray-800 font-medium focus:outline-none flex-1 placeholder-gray-500 text-xs xs:text-sm date-picker"
                      containerClassName="relative z-[2147483647]"
                      popperClassName="z-[2147483647]"
                      wrapperClassName="w-full relative z-[2147483647]"
                      style={{ zIndex: 2147483647 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* From Field */}
          <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 relative z-[999998] w-full">
            <div className="backdrop-blur-lg bg-white/50 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-5 border border-white/60 h-[60px] xs:h-[70px] sm:h-[75px] md:h-[85px] lg:h-[85px] flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:bg-white/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 w-full">
              <label className="text-gray-800 text-[10px] xs:text-xs font-bold mb-1 xs:mb-2 uppercase tracking-wider">FROM</label>
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 relative z-[999998]">
                  <svg className="w-4 h-4 xs:w-5 xs:h-5 text-gray-500 mr-2 xs:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <LocationDropdown
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    placeholder="Choose Departure"
                    options={locationOptions}
                    required
                    data-dropdown-trigger="true"
                    className="border-0 bg-transparent text-gray-800 font-medium focus:outline-none flex-1 placeholder-gray-500 text-xs xs:text-sm location-dropdown"
                    containerClassName="relative z-[999998]"
                    dropdownClassName="location-dropdown-list absolute top-full left-0 right-0 mt-2 bg-white/98 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] z-[999998] max-h-[200px] overflow-y-auto"
                    wrapperClassName="w-full relative z-[999998]"
                    style={{ zIndex: 999998 }}
                    data-dropdown="true"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Swap Button - Visible only on mobile devices, positioned between From and To */}
          <div className="xs:col-span-1 sm:col-span-1 md:hidden lg:hidden xl:hidden order-3 w-full">
            <button
              type="button"
              onClick={handleSwapLocations}
              className="w-full h-[60px] xs:h-[70px] sm:h-[75px] rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:from-orange-500 active:to-orange-400 shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:shadow-[0_12px_35px_rgba(59,130,246,0.5)] active:shadow-[0_15px_40px_rgba(251,146,60,0.4)] transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/50 group"
              disabled={!formData.from && !formData.to}
            >
              <svg 
                className="w-5 h-5 text-white transform group-hover:rotate-180 group-active:rotate-180 transition-transform duration-300 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m0-4l4-4" />
              </svg>
              <span className="text-white font-medium text-sm">Swap Locations</span>
            </button>
          </div>

          {/* To Field */}
          <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 relative z-[999997] order-4 lg:order-3 w-full">
            <div className="backdrop-blur-lg bg-white/50 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-5 border border-white/60 h-[60px] xs:h-[70px] sm:h-[75px] md:h-[85px] lg:h-[85px] flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:bg-white/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 w-full">
              <label className="text-gray-800 text-[10px] xs:text-xs font-bold mb-1 xs:mb-2 uppercase tracking-wider">TO</label>
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 relative z-[999997]">
                  <svg className="w-4 h-4 xs:w-5 xs:h-5 text-gray-500 mr-2 xs:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <LocationDropdown
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    placeholder="Choose Destination"
                    options={locationOptions.filter(option => option.value !== formData.from)}
                    required
                    data-dropdown-trigger="true"
                    className="border-0 bg-transparent text-gray-800 font-medium focus:outline-none flex-1 placeholder-gray-500 text-xs xs:text-sm location-dropdown"
                    containerClassName="relative z-[999997]"
                    dropdownClassName="location-dropdown-list absolute top-full left-0 right-0 mt-2 bg-white/98 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] z-[999997] max-h-[200px] overflow-y-auto"
                    wrapperClassName="w-full relative z-[999997]"
                    style={{ zIndex: 999997 }}
                    data-dropdown="true"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 order-5 lg:order-4 xl:order-4 w-full">
            <Button 
              onClick={handleSearch}
              className={`h-[60px] xs:h-[70px] sm:h-[75px] md:h-[85px] lg:h-[85px] w-full rounded-xl xs:rounded-2xl flex items-center justify-center ${
                isLoading 
                  ? 'bg-gradient-to-r from-orange-600 to-orange-500' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500'
              } shadow-[0_15px_40px_rgba(251,146,60,0.4)] transition-all duration-300 border-0 text-white font-bold text-sm xs:text-base lg:text-lg uppercase tracking-wide backdrop-blur-sm`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">
                    <svg className="w-4 h-4 xs:w-5 xs:h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  <span className="text-xs xs:text-sm lg:text-base">Searching...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 xs:w-5 xs:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-xs xs:text-sm lg:text-base">SEARCH</span>
                </>
              )}
            </Button>
          </div>
          
          {/* Overlay Swap Button - Positioned between FROM and TO fields - Hidden on mobile */}
          <div className={`absolute top-1/2 transform -translate-y-1/2 z-[9999999] hidden md:block lg:block xl:block order-6 lg:order-5 xl:order-5 ${
            tripType === 'twoWay' 
              ? 'left-[60%] -translate-x-1/2' 
              : 'left-[50%] -translate-x-1/2'
          }`}>
            <button
              type="button"
              onClick={handleSwapLocations}
              className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 shadow-[0_8px_25px_rgba(251,146,60,0.4)] hover:shadow-[0_12px_35px_rgba(251,146,60,0.5)] transition-all duration-300 flex items-center justify-center backdrop-blur-sm border-2 xl:border-4 border-white group relative z-[9999999]"
              disabled={!formData.from && !formData.to}
              title="Swap locations"
              style={{ zIndex: 9999999 }}
            >
              <svg 
                className="w-4 h-4 xl:w-5 xl:h-5 text-white transform group-hover:rotate-180 transition-transform duration-300" 
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

      {/* Responsive Dropdown Overlay Styles */}
      <style jsx="true">{`
        /* Global dropdown overlay styles with maximum priority for all devices */
        .date-picker-dropdown,
        .location-dropdown-list,
        .dropdown-menu,
        .react-datepicker-popper,
        .react-datepicker,
        [data-dropdown="true"],
        [role="dialog"],
        [role="listbox"],
        [role="combobox"] + div,
        .dropdown-overlay,
        .react-datepicker__tab-loop {
          z-index: 2147483647 !important;
          position: fixed !important;
        }
        
        /* Universal responsive positioning for all dropdown types */
        .date-picker-dropdown,
        .location-dropdown-list,
        .dropdown-menu,
        .react-datepicker,
        [role="listbox"],
        [data-dropdown="true"] {
          position: fixed !important;
          z-index: 2147483647 !important;
          background: rgba(255, 255, 255, 0.98) !important;
          backdrop-filter: blur(20px) !important;
          border-radius: 12px !important;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8) !important;
          border: 1px solid rgba(255, 255, 255, 0.6) !important;
          max-height: 300px !important;
          overflow-y: auto !important;
          contain: none !important;
          isolation: auto !important;
        }
        
        /* Extra Small devices (320px and up) */
        @media (max-width: 479px) {
          .date-picker-dropdown,
          .location-dropdown-list,
          .dropdown-menu,
          .react-datepicker,
          .react-datepicker-popper,
          [role="listbox"],
          [data-dropdown="true"] {
            position: fixed !important;
            z-index: 2147483647 !important;
            left: 8px !important;
            right: 8px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            max-width: calc(100vw - 16px) !important;
            max-height: 60vh !important;
            background: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(30px) !important;
            border-radius: 16px !important;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8), 0 0 0 9999px rgba(0, 0, 0, 0.5) !important;
            border: 2px solid rgba(255, 255, 255, 0.8) !important;
            padding: 12px !important;
            margin: 0 !important;
            overflow-y: auto !important;
          }
          
          .react-datepicker {
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            max-width: 300px !important;
            max-height: 350px !important;
          }
        }
        
        /* Small devices (480px to 767px) */
        @media (min-width: 480px) and (max-width: 767px) {
          .date-picker-dropdown,
          .location-dropdown-list,
          .dropdown-menu,
          .react-datepicker,
          .react-datepicker-popper,
          [role="listbox"],
          [data-dropdown="true"] {
            position: fixed !important;
            z-index: 2147483647 !important;
            left: 12px !important;
            right: 12px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            max-width: calc(100vw - 24px) !important;
            max-height: 65vh !important;
            background: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(30px) !important;
            border-radius: 18px !important;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8), 0 0 0 9999px rgba(0, 0, 0, 0.5) !important;
            border: 2px solid rgba(255, 255, 255, 0.8) !important;
            padding: 14px !important;
            margin: 0 !important;
            overflow-y: auto !important;
          }
          
          .react-datepicker {
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            max-width: 320px !important;
            max-height: 380px !important;
          }
        }
        
        /* Medium devices (768px to 1024px) - Tablets including iPad */
        @media (min-width: 768px) and (max-width: 1024px) {
          .date-picker-dropdown,
          .location-dropdown-list,
          .dropdown-menu,
          .react-datepicker,
          .react-datepicker-popper,
          [role="listbox"],
          [data-dropdown="true"] {
            position: absolute !important;
            z-index: 2147483647 !important;
            top: 100% !important;
            left: 0 !important;
            right: 0 !important;
            transform: none !important;
            max-width: 100% !important;
            max-height: 250px !important;
            margin-top: 8px !important;
            background: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(20px) !important;
            border-radius: 12px !important;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8) !important;
            border: 1px solid rgba(255, 255, 255, 0.6) !important;
            padding: 8px !important;
            overflow-y: auto !important;
          }
          
          .react-datepicker {
            position: absolute !important;
            z-index: 2147483647 !important;
          }
        }
        
        /* Desktop positioning (1025px and above) */
        @media (min-width: 1025px) {
          .location-dropdown-list,
          .dropdown-menu,
          [role="listbox"] {
            position: absolute !important;
            z-index: 2147483647 !important;
            top: 100% !important;
            left: 0 !important;
            right: 0 !important;
            transform: none !important;
            max-width: 100% !important;
            max-height: 250px !important;
            margin-top: 8px !important;
          }
          
          .react-datepicker,
          .date-picker-dropdown {
            position: absolute !important;
            z-index: 2147483647 !important;
          }
        }
        
        /* Enhanced dropdown container styles */
        .date-picker,
        .location-dropdown {
          position: relative !important;
          z-index: 2147483647 !important;
        }
        
        /* Form field containers with proper stacking context */
        .backdrop-blur-lg {
          position: relative !important;
          z-index: 1 !important;
          isolation: auto !important;
        }
        
        /* Prevent form from interfering with dropdowns */
        .backdrop-blur-xl {
          isolation: auto !important;
          contain: none !important;
        }
        
        /* Mobile scroll lock when dropdown is open - exclude tablets */
        @media (max-width: 767px) {
          body.dropdown-open {
            overflow: hidden !important;
            position: fixed !important;
            width: 100% !important;
          }
        }
        
        /* Enhanced accessibility and touch targets for mobile only */
        @media (max-width: 767px) {
          .date-picker input,
          .location-dropdown input,
          [data-dropdown-trigger="true"] {
            min-height: 44px !important;
            touch-action: manipulation !important;
          }
        }
        
        /* Backdrop overlay for mobile dropdowns only */
        @media (max-width: 767px) {
          .dropdown-backdrop {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background: rgba(0, 0, 0, 0.5) !important;
            z-index: 2147483647 !important;
            backdrop-filter: blur(4px) !important;
          }
        }
        
        /* Enhanced dropdown items for mobile only */
        @media (max-width: 767px) {
          .location-dropdown-list li,
          .dropdown-menu li,
          [role="option"] {
            padding: 10px 12px !important;
            font-size: 14px !important;
            line-height: 1.4 !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
            min-height: 44px !important;
            display: flex !important;
            align-items: center !important;
          }
          
          .location-dropdown-list li:hover,
          .dropdown-menu li:hover,
          [role="option"]:hover {
            background: rgba(251, 146, 60, 0.1) !important;
            color: #ea580c !important;
          }
        }
        
        /* Ensure all dropdown elements break out of stacking context */
        * [role="listbox"],
        * [role="dialog"],
        * .react-datepicker,
        * .location-dropdown-list,
        * .dropdown-menu {
          z-index: 2147483647 !important;
          contain: none !important;
          isolation: auto !important;
        }
      `}</style>

      {/* Mobile responsive utilities */}
      <style jsx="true" global="true">{`
        /* Additional mobile optimizations */
        @media (max-width: 479px) {
          .grid-cols-1 {
            gap: 0.75rem !important;
          }
          
          .backdrop-blur-lg {
            padding: 0.75rem !important;
            height: auto !important;
            min-height: 60px !important;
          }
          
          .text-xs {
            font-size: 0.7rem !important;
          }
          
          .text-sm {
            font-size: 0.8rem !important;
          }
        }
        
        @media (min-width: 480px) and (max-width: 767px) {
          .grid-cols-1 {
            gap: 1rem !important;
          }
          
          .backdrop-blur-lg {
            padding: 0.875rem !important;
            height: auto !important;
            min-height: 65px !important;
          }
          
          .text-xs {
            font-size: 0.75rem !important;
          }
          
          .text-sm {
            font-size: 0.825rem !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1024px) {
          .grid-cols-1 {
            gap: 1.5rem !important;
          }
          
          .backdrop-blur-lg {
            padding: 1.25rem !important;
            height: auto !important;
            min-height: 80px !important;
          }
          
          .text-xs {
            font-size: 0.75rem !important;
          }
          
          .text-sm {
            font-size: 0.875rem !important;
          }
          
          /* Ensure desktop-like behavior on tablets */
          .hidden.md\\:block {
            display: block !important;
          }
        }
        
        /* Prevent zoom on input focus for iOS mobile only */
        @media screen and (max-width: 767px) {
          input[type="text"],
          input[type="date"],
          select,
          .date-picker input,
          .location-dropdown input {
            font-size: 16px !important;
            -webkit-appearance: none !important;
            -webkit-border-radius: 0 !important;
            border-radius: 0 !important;
          }
        }
        
        /* Enhance touch targets for better mobile interaction only */
        @media (max-width: 767px) {
          button,
          .date-picker,
          .location-dropdown,
          [data-dropdown-trigger="true"] {
            min-height: 44px !important;
            touch-action: manipulation !important;
          }
        }
        
        /* Custom breakpoint for extra small devices */
        @media (max-width: 320px) {
          .backdrop-blur-lg {
            padding: 0.5rem !important;
            min-height: 55px !important;
          }
          
          .text-xs {
            font-size: 0.65rem !important;
          }
          
          .text-sm {
            font-size: 0.75rem !important;
          }
          
          button {
            min-height: 40px !important;
          }
        }
        
        /* Large mobile devices (iPhone Plus, etc.) */
        @media (min-width: 414px) and (max-width: 479px) {
          .backdrop-blur-lg {
            padding: 0.875rem !important;
            min-height: 65px !important;
          }
        }
        
        /* Landscape orientation optimizations */
        @media (max-height: 600px) and (orientation: landscape) {
          .backdrop-blur-lg {
            min-height: 50px !important;
            padding: 0.5rem !important;
          }
          
          .date-picker-dropdown,
          .location-dropdown-list,
          .react-datepicker {
            max-height: 50vh !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchForm;
