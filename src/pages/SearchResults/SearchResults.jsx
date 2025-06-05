import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data passed from search form
  const { searchResults = [], searchParams = {} } = location.state || {};
  
  // If no search data, redirect back to home
  React.useEffect(() => {
    if (!searchResults || !searchParams || searchResults.length === 0) {
      console.log('No search data available, showing empty state');
    }
  }, [searchResults, searchParams]);
  
  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any buses matching your search criteria.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-[#0a639d] text-white rounded-lg hover:bg-[#07456e] transition-all"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Search Results</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="bg-gray-100 rounded-lg px-3 py-1 text-sm">
            <span className="font-semibold">From:</span> {searchParams.fromCity || searchParams.from}
          </div>
          <div className="bg-gray-100 rounded-lg px-3 py-1 text-sm">
            <span className="font-semibold">To:</span> {searchParams.toCity || searchParams.to}
          </div>
          <div className="bg-gray-100 rounded-lg px-3 py-1 text-sm">
            <span className="font-semibold">Date:</span> {searchParams.date}
          </div>
          {searchParams.returnDate && (
            <div className="bg-gray-100 rounded-lg px-3 py-1 text-sm">
              <span className="font-semibold">Return:</span> {searchParams.returnDate}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-6">
        {searchResults.map((bus) => (
          <div key={bus.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-[#0a639d]">{bus.busName || 'Sona Express'}</h3>
              <span className="text-lg font-bold text-[#ff8f1f]">{bus.price || 'Rs. 1500'}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-sm text-gray-500">Departure</div>
                <div className="font-semibold">{bus.departureTime || '08:00 AM'}</div>
                <div className="text-sm">{bus.boardingPoint || searchParams.fromCity || 'New Bus Park'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Arrival</div>
                <div className="font-semibold">{bus.arrivalTime || '02:30 PM'}</div>
                <div className="text-sm">{bus.droppingPoint || searchParams.toCity || 'Adarsha Nagar'}</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center">
                <span className="text-sm mr-3">{bus.busType || 'AC Deluxe'}</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {bus.availableSeats || 24} seats available
                </span>
              </div>
              
              <button 
                className="px-4 py-2 bg-[#0a639d] text-white text-sm rounded-lg hover:bg-[#07456e] transition-all"
                onClick={() => navigate(`/select-seats/${bus.id}`, { 
                  state: { bus, searchParams } 
                })}
              >
                Select Seats
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
        >
          Back to Search
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
