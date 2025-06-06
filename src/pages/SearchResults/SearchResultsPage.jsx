import React, { useState, useEffect } from 'react';
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
  const [busResults, setBusResults] = useState(searchResults || []);
  const [isLoading, setIsLoading] = useState(false);
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
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
      <main className="px-[75px] py-[75px]">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-[16px] mb-[57px]">
          <span className="text-[18px] font-bold leading-[25px] text-[#b0b0b0] font-opensans">Home</span>
          <div className="w-[8px] h-[18px] bg-[#b0b0b0] transform rotate-12"></div>
          <span className="text-[18px] font-bold leading-[25px] text-[#5f5f5f] font-opensans">Search</span>
        </div>

        {/* Error message display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Search Section */}
        <div className="bg-white rounded-[16px] p-[24px] mb-[55px]">
          {/* Trip Type Selector */}
          <div className="flex mb-4">
            <div className="bg-[#ececec] rounded-xl flex w-[200px] h-[45px] mb-4">
              <button
                className={`w-1/2 h-full rounded-xl flex items-center justify-center font-medium text-sm ${
                  tripType === 'oneWay' ? 'bg-[#0a639d] text-white' : 'text-[#5f5f5f]'
                }`}
                onClick={() => handleTripTypeChange('oneWay')}
              >
                One Way
              </button>
              <button
                className={`w-1/2 h-full rounded-xl flex items-center justify-center font-medium text-sm ${
                  tripType === 'twoWay' ? 'bg-[#0a639d] text-white' : 'text-[#5f5f5f]'
                }`}
                onClick={() => handleTripTypeChange('twoWay')}
              >
                Two Ways
              </button>
            </div>
          </div>
            <div className="flex flex-wrap items-end gap-4 justify-between">
            {/* From Location */}
            <div className="w-[250px]">
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

            {/* Swap Button */}
            <div className="mt-[10px] mb-[10px] mx-2">
              <button 
                onClick={handleSwapLocations}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
                title="Swap locations"
              >
                <img 
                  src="/images/img_hicon_linear_arrow_swap_horizontal.svg" 
                  alt="swap" 
                  className="w-[32px] h-[32px]"
                />
              </button>
            </div>

            {/* To Location */}
            <div className="w-[250px]">
              <LocationDropdown
                label="To"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                placeholder="Select your destination"
                options={locationOptions.filter(option => option.value !== formData.from)}
                required
              />
            </div>            {/* Date Pickers - Wrapped in a flex container for better layout */}            <div className={`flex datepicker-container ${tripType === 'twoWay' ? 'space-x-3' : ''}`}>              {/* Departure Date */}
              <div className={`${tripType === 'twoWay' ? 'w-[220px]' : 'w-[240px]'}`}>
                <DatePicker
                  label={tripType === 'twoWay' ? "Departure Date" : "Date"}
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="Select date"
                  required
                  className="h-full"
                />
              </div>

              {/* Return Date (for two-way trips) */}              {tripType === 'twoWay' && (
                <div className="w-[220px]">
                  <DatePicker
                    label="Return Date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    placeholder={!formData.date ? "First select departure" : "Select return"}
                    required
                    minDate={formData.date ? (() => {
                      const nextDay = new Date(formData.date.split(' ').join(' '));
                      nextDay.setDate(nextDay.getDate() + 1);
                      return nextDay;
                    })() : new Date()}                    disabled={!formData.date}
                    className="h-full"
                  />
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="ml-auto">
              <Button 
                variant="primary"
                onClick={handleSearchAgain}
                className={`bg-[#0a639d] text-white rounded-[12px] px-[16px] py-[14px] h-[60px] flex items-center ${
                  isLoading ? 'opacity-80' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">
                      <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                    <span className="text-[18px] font-bold">Searching...</span>
                  </>
                ) : (
                  <>
                    <img 
                      src="/images/img_hicon_outline_search_1.svg" 
                      alt="search" 
                      className="w-[24px] h-[24px] mr-[8px]"
                    />
                    <span className="text-[18px] font-bold leading-[33px] font-opensans">Search Again</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <DateSelector />

        {/* Results Header */}
        <div className="bg-white rounded-[12px] p-[24px] mb-[16px] h-[68px] flex items-center justify-between">
          <div className="flex items-center space-x-[8px]">
            <img 
              src="/images/img_group_green_600.svg" 
              alt="available" 
              className="w-[32px] h-[32px]"
            />
            <span className="text-[18px] font-bold leading-[25px] text-[#388b68] font-opensans">
              {busResults.length} Bus{busResults.length !== 1 ? 'es' : ''} found
            </span>
          </div>

          <div className="w-[1px] h-[44px] bg-[#b0b0b0]"></div>

          <div className="flex items-center space-x-[24px]">
            <div className="bg-[#ececec] rounded-[12px] px-[16px] py-[9px] h-[36px] flex items-center">
              <img 
                src="/images/img_hicon_outline_filter_5.svg" 
                alt="filter" 
                className="w-[17px] h-[17px] mr-[4px]"
              />
              <span className="text-[18px] font-bold leading-[25px] text-[#3d3d3d] font-opensans">
                Sort By:
              </span>
            </div>

            {sortOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSortChange(option)}
                className={`text-[20px] font-opensans leading-[28px] transition-colors ${
                  sortBy === option 
                    ? 'font-bold text-[#0a639d]' 
                    : 'font-semibold text-[#5f5f5f] hover:text-[#0a639d]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex space-x-[16px]">
          {/* Filters Sidebar */}
          <FilterSection />

          {/* Bus Listings */}
          <BusListings buses={busResults} isLoading={isLoading} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;