import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/ui/InputField';
import Button from '../../../components/ui/Button';
import DatePicker from './UI/DatePickerNew';
import LocationDropdown from './UI/LocationDropdown';
import api from '../../../services/api';

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

    setIsLoading(true);
    setError(null);

    try {
      console.log('Searching with data:', { tripType, ...formData });

      // Use the local api.js service for bus search
      const busResults = await api.searchBuses({
        fromCity: formData.from,
        toCity: formData.to,
        date: formData.date,
        returnDate: formData.returnDate,
        tripType: tripType
      });

      // Defensive: handle if API returns undefined or not an array
      if (!busResults || !Array.isArray(busResults)) {
        setError('No buses found for this route and date. Please try different dates or locations.');
        setIsLoading(false);
        return;
      }

      if (busResults.length === 0) {
        setError('No buses found for this route and date. Please try different dates or locations.');
        setIsLoading(false);
        return;
      }      // Navigate to search results page with the data
      
      // First scroll to top
      window.scrollTo(0, 0);
      
      navigate('/search-results', {
        state: {
          searchResults: busResults,
          searchParams: {
            tripType,
            ...formData,
            fromCity: locationOptions.find(loc => loc.value === formData.from)?.label || formData.from,
            toCity: locationOptions.find(loc => loc.value === formData.to)?.label || formData.to
          },
        }
      });
    } catch (err) {
      console.error('Error searching:', err);
      setError(err.message || 'An error occurred while searching. Please try again.');
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
  }, []);
  return (
    <div ref={searchFormRef} className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-5 md:p-7 shadow-lg border border-white/20 w-full max-w-5xl mx-auto -mt-[100px] sm:-mt-[130px] md:-mt-[180px] relative z-40">
      {/* Trip Type Selector */}
      <div className="flex mb-4 sm:mb-6">
        <div className="bg-white/20 backdrop-blur-xl rounded-xl flex w-[200px] sm:w-[250px] h-[45px] sm:h-[55px] border border-white/30">
          <button            className={`w-1/2 h-full rounded-xl flex items-center justify-center font-medium text-sm transition-all duration-300 ${
              tripType === 'oneWay' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' : 'text-white/80 hover:text-white'
            }`}
            onClick={() => handleTripTypeChange('oneWay')}
          >
            One Way
          </button>          <button            className={`w-1/2 h-full rounded-xl flex items-center justify-center font-medium text-sm transition-all duration-300 ${
              tripType === 'twoWay' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' : 'text-white/80 hover:text-white'
            }`}
            onClick={() => handleTripTypeChange('twoWay')}
          >
            Two Ways
          </button>
        </div>
      </div>
      
      {/* Error message display */}
      {error && (
        <div className="bg-red-500/20 backdrop-blur-xl border border-red-300/50 text-red-100 px-4 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4 lg:gap-x-20">
        {/* From field with relative positioning for parent */}
        <div className="relative">
          <LocationDropdown
            label="From"
            name="from"
            value={formData.from}
            onChange={handleInputChange}
            placeholder="Select your boarding place"
            options={locationOptions}
            required
          />
        </div>

        {/* To field with relative positioning for parent */}
        <div className="relative">
          <LocationDropdown
            label="To"
            name="to"
            value={formData.to}
            onChange={handleInputChange}
            placeholder="Select your destination"
            options={locationOptions.filter(option => option.value !== formData.from)}
            required
          />          {/* Swap Button - Positioned between From and To fields */}          <div className="absolute left-0 md:left-[-8%] top-[30px] md:-translate-x-[50%] transform z-[100]">
            <button 
              onClick={handleSwapLocations}
              className="bg-white/20 backdrop-blur-xl rounded-full mt-[-5px] ml-[-8px] p-1 sm:p-2 shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 active:bg-white/40"
              title="Swap locations"
              aria-label="Swap departure and destination locations"
            >
              <img 
                src="/images/img_hicon_linear_arrow_swap_horizontal.svg" 
                alt="Swap" 
                className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 ease-in-out hover:rotate-180"
              />
            </button>
          </div>
        </div>        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-3 datepicker-container">
          <div className={`${tripType === 'twoWay' ? 'w-full sm:w-1/2' : 'w-full'} transition-all duration-300`}>
            <div className="relative">
              <DatePicker
                label={tripType === 'twoWay' ? "Departure Date" : "Date"}
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder={tripType === 'twoWay' ? "Select departure date" : "Select date"}
                required
                className="h-full"
              />
            </div>
          </div>
          {tripType === 'twoWay' && (
            <div className="w-full sm:w-1/2 transition-all duration-300">
              <div className="relative">
                <DatePicker
                  label="Return Date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  placeholder={!formData.date ? "First select departure date" : "Select return date"}
                  required
                  minDate={formData.date ? (() => {
                    const nextDay = new Date(formData.date.split(' ').join(' '));
                    nextDay.setDate(nextDay.getDate() + 1);
                    return nextDay;
                  })() : new Date()}                  disabled={!formData.date}
                  className="h-full"
                />
              </div>
            </div>
          )}
        </div>
          <div className="flex items-end">
          <Button 
            onClick={handleSearch}            className={`h-[50px] mt-[28px] sm:h-[50px] sm:mb-[15px] w-full rounded-lg flex items-center justify-center ${
              isLoading ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
            } shadow-lg transition-all duration-300 border border-white/20`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span className="text-sm sm:text-base font-medium text-white">Searching...</span>
              </>
            ) : (
              <>
                <img 
                  src="/images/img_hicon_outline_search_1.svg" 
                  alt="Search" 
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2"
                />
                <span className="text-sm sm:text-base font-medium">Search</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
