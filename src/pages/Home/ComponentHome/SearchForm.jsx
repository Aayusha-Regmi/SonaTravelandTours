import React, { useState, useEffect } from 'react';
import InputField from '../../../components/ui/InputField';
import Button from '../../../components/ui/Button';
import DatePicker from './UI/DatePicker';
import LocationDropdown from './UI/LocationDropdown';
import apiService from '../../../services/api';

const SearchForm = () => {
  const [tripType, setTripType] = useState('oneWay');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: ''
  });
  const [isLoading, setIsLoading] = useState(false);  const [routeOptions, setRouteOptions] = useState([]);
  const [error, setError] = useState(null);
  
  // Location options
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
    },
    {
      value: 'PKR',
      label: 'Pokhara',
      description: 'Stops: Tourist Bus Park, Lakeside, Prithvi Chowk, Harichowk, Seti Bridge'
    },
    {
      value: 'BTG',
      label: 'Biratnagar',
      description: 'Stops: Main Bus Terminal, Bargachhi, Traffic Chowk, Rani Mills, Kanchanbari'
    },
    {
      value: 'DRN',
      label: 'Dharan',
      description: 'Stops: Dharan Bus Park, Bhanuchowk, Putali Line, Chatarachowk, Bhanu Path'
    }
  ];

  // Fetch available routes when component mounts
  useEffect(() => {
    fetchRoutes();
  }, []);
  
  const fetchRoutes = async () => {
    try {
      const data = await apiService.getRoutes();
      
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
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSearch = async () => {
    // Validate form data
    if (!formData.from || !formData.to || !formData.date) {
      setError('Please fill in all fields');
      return;
    }
    
    // Make sure from and to are not the same
    if (formData.from === formData.to) {
      setError('Departure and destination cannot be the same');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Searching with data:', { tripType, ...formData });
      
      // Call the API service for searching
      const data = await apiService.searchBusRoutes({ tripType, ...formData });
      
      console.log('Search results:', data);
      // Here you would handle the results, perhaps by setting state or redirecting
      alert(`Found ${data.results.length} buses for your journey!`);
      
    } catch (err) {
      console.error('Error searching:', err);
      setError('An error occurred while searching. Please try again.');
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

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md w-full max-w-6xl mx-auto -mt-40 relative z-20">
      {/* Trip Type Selector */}
      <div className="flex mb-8">
        <div className="bg-[#ececec] rounded-2xl flex w-[300px] h-[68px]">
          <button
            className={`w-1/2 h-full rounded-2xl flex items-center justify-center font-bold text-lg ${
              tripType === 'oneWay' ?'bg-[#0a639d] text-white' :'text-[#5f5f5f]'
            }`}
            onClick={() => handleTripTypeChange('oneWay')}
          >
            One Way
          </button>
          <button
            className={`w-1/2 h-full rounded-2xl flex items-center justify-center font-bold text-lg ${
              tripType === 'twoWay' ?'bg-[#0a639d] text-white' :'text-[#5f5f5f]'
            }`}
            onClick={() => handleTripTypeChange('twoWay')}
          >
            Two Ways
          </button>
        </div>
      </div>
      
      {/* Error message display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-20">        {/* From field with relative positioning for parent */}
        <div className="relative text-lg">
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
            options={locationOptions}
            required
          />
            {/* Swap Button - Positioned between From and To fields */}
          <div className="absolute left-[-8%] top-[30px] -translate-x-[50%] transform z-20">
            <button 
              onClick={handleSwapLocations}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-gray-100"
              title="Swap locations"
              aria-label="Swap departure and destination locations"
            >
              <img 
                src="/images/img_hicon_linear_arrow_swap_horizontal.svg" 
                alt="Swap" 
                className="w-10 h-10 transition-transform duration-300 ease-in-out hover:rotate-180"
              />
            </button>
          </div>
        </div>        <div>
          <DatePicker
            label="Date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            placeholder="Select departure date"
            required
          />
        </div>

        <div className="flex items-end">
          <Button 
            onClick={handleSearch}
            className={`h-[55px] mb-[15px] w-full rounded-xl flex items-center justify-center ${
              isLoading ? 'bg-[#2b7ab5]' : 'bg-[#0a639d]'
            }`}
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
                <span className="text-xl font-bold">Searching...</span>
              </>
            ) : (
              <>
                <img 
                  src="/images/img_hicon_outline_search_1.svg" 
                  alt="Search" 
                  className="w-7 h-7 mr-2"
                />
                <span className="text-xl font-bold">Search</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
