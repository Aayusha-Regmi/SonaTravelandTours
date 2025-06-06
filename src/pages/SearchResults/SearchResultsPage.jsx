import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import FilterSection from './ComponentSearch/FilterSection';
import BusListings from './ComponentSearch/BusListings';
import DateSelector from './ComponentSearch/DateSelector';
import Button from '../../components/ui/Button';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get search results and params from location state
  const { searchResults = [], searchParams = {} } = location.state || {};
  
  // Set default values or values from search params
  const [fromLocation, setFromLocation] = useState(searchParams.fromCity || 'Birgunj');
  const [toLocation, setToLocation] = useState(searchParams.toCity || 'Kathmandu');
  const [travelDate, setTravelDate] = useState(searchParams.date || '06/06/2024');
  const [sortBy, setSortBy] = useState('Earliest');
  const [busResults, setBusResults] = useState(searchResults || []);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSearchAgain = () => {
    navigate('/');
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

        {/* Search Section */}
        <div className="bg-white rounded-[16px] p-[16px] mb-[55px] h-[174px]">
          <div className="flex items-center justify-between">
            {/* From Location */}
            <div className="flex flex-col w-[333px]">
              <label className="text-[20px] font-semibold leading-[28px] text-[#8f8f8f] font-opensans mb-[5px]">
                From
              </label>
              <div className="bg-[#f5f5f5] rounded-[12px] p-[16px] h-[80px] flex flex-col justify-center relative">
                <div className="text-[18px] font-bold leading-[25px] text-[#3d3d3d] font-opensans">
                  {fromLocation}
                </div>
                <div className="text-[18px] font-semibold leading-[25px] text-[#8f8f8f] font-opensans">
                  Boarding place name
                </div>
                <img 
                  src="/images/img_hicon_linear_down_2_gray_500.svg" 
                  alt="dropdown" 
                  className="absolute right-[16px] top-[28px] w-[24px] h-[24px]"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="mx-[8px] mt-[35px]">
              <img 
                src="/images/img_hicon_linear_arrow_swap_horizontal.svg" 
                alt="swap" 
                className="w-[48px] h-[48px] cursor-pointer"
              />
            </div>

            {/* To Location */}
            <div className="flex flex-col w-[333px]">
              <label className="text-[20px] font-semibold leading-[28px] text-[#8f8f8f] font-opensans mb-[5px]">
                From
              </label>
              <div className="bg-[#f5f5f5] rounded-[12px] p-[16px] h-[80px] flex flex-col justify-center relative">
                <div className="text-[20px] font-bold leading-[28px] text-[#3d3d3d] font-opensans">
                  {toLocation}
                </div>
                <div className="text-[18px] font-semibold leading-[25px] text-[#8f8f8f] font-opensans">
                  Dropping place name
                </div>
                <img 
                  src="/images/img_hicon_linear_down_2_gray_500.svg" 
                  alt="dropdown" 
                  className="absolute right-[16px] top-[28px] w-[24px] h-[24px]"
                />
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col w-[185px]">
              <label className="text-[20px] font-semibold leading-[28px] text-[#8f8f8f] font-opensans mb-[5px]">
                Date
              </label>
              <div className="bg-[#f5f5f5] rounded-[12px] p-[16px] h-[80px] flex items-center">
                <div className="text-[18px] font-bold leading-[25px] text-[#3d3d3d] font-opensans">
                  {travelDate}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-[37px]">
              <Button 
                variant="primary"
                onClick={handleSearchAgain}
                className="bg-[#0a639d] text-white rounded-[12px] px-[51px] py-[26px] h-[80px] w-[293px] flex items-center"
              >
                <img 
                  src="/images/img_hicon_outline_search_1.svg" 
                  alt="search" 
                  className="w-[28px] h-[28px] mr-[8px]"
                />
                <span className="text-[24px] font-bold leading-[33px] font-opensans">Search Again</span>
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