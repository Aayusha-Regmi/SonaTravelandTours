import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';

const SelectSeatsPage = () => {
  const { busId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { bus } = location.state || {};
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [busDetails, setBusDetails] = useState(bus || null);
  const [loading, setLoading] = useState(!bus);
  
  useEffect(() => {
    if (!bus && busId) {
      // If we don't have bus details but have busId, we could fetch them here
      // For now, just redirect back to search results
      navigate('/search-results');
    }
  }, [bus, busId, navigate]);
  
  if (loading || !busDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin inline-block w-10 h-10 border-4 border-[#0a639d] border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-600">Loading bus details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Select Your Seats</h1>
          <button 
            onClick={() => navigate(-1)}
            className="text-sm text-[#0a639d] hover:text-[#07456e] flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Search Results
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#0a639d]">{busDetails.name || busDetails.busName}</h3>
            <span className="text-lg font-bold text-[#ff8f1f]">{busDetails.price}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Departure</div>
              <div className="font-semibold">{busDetails.departureTime}</div>
              <div className="text-sm">{busDetails.departureLocation || busDetails.boardingPoint}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Arrival</div>
              <div className="font-semibold">{busDetails.arrivalTime}</div>
              <div className="text-sm">{busDetails.arrivalLocation || busDetails.droppingPoint}</div>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <span className="text-sm mr-3">{busDetails.type || busDetails.busType}</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {busDetails.availableSeats} available
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">Seat selection feature coming soon!</p>
          <p className="text-gray-600 mb-8">This page is a placeholder for the seat selection feature.</p>
          
          <Button 
            className="px-6 py-3 bg-[#0a639d] text-white rounded-lg hover:bg-[#07456e] transition-all"
            onClick={() => navigate('/')}
          >
            Back to Homepage
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SelectSeatsPage;
