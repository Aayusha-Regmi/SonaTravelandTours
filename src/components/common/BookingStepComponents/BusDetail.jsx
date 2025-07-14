import React from 'react';
import PropTypes from 'prop-types';

const BusDetail = ({ 
  busName, 
  busType, 
  date, 
  time, 
  boardingPlace, 
  droppingPlace, 
  duration,
  // Two-way trip props
  tripType = 'oneWay',
  returnDate,
  returnTime,
  returnBusName,
  returnBusType
}) => {
  // Debug log for dates
  console.log('🐛 DEBUG - BusDetail received props:', {
    date,
    returnDate,
    tripType,
    time,
    returnTime
  });
  
  // Format dates properly
  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    
    // If it's already a formatted date string, return as is
    if (dateString.includes('/') || dateString.includes('-')) {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        });
      } catch (error) {
        return dateString;
      }
    }
    
    return dateString;
  };

  return (
    <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col min-w-0 flex-1">
          <h2 className="text-lg font-bold text-gray-800 mb-1 font-opensans">
            {busName}
          </h2>
          <p className="text-sm font-medium text-gray-600 font-opensans">
            {busType}
          </p>
        </div>
        
        <div className="flex flex-col items-center min-w-0 flex-1">
          {tripType === 'twoWay' ? (
            // Two-way trip: Show both departure and return dates
            <div className="text-center w-full">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">🚌 Departure</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>🚌</span> Return
                </span>
              </div>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-800 font-opensans mb-1">
                    {formatDate(date)}
                  </p>
                  <p className="text-lg font-bold text-blue-600 font-opensans">
                    {time}
                  </p>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-800 font-opensans mb-1">
                    {formatDate(returnDate)}
                  </p>
                  <p className="text-lg font-bold text-green-600 font-opensans">
                    {returnTime || 'TBD'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // One-way trip: Show single date and time
            <div className="text-center">
              <p className="text-base font-bold text-gray-800 font-opensans mb-1">
                {formatDate(date)}
              </p>
              <p className="text-xl font-bold text-gray-800 font-opensans">
                {time}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-6 flex-1">
          <div className="flex flex-col text-right min-w-[120px] flex-1">
            <h3 className="text-lg font-bold text-gray-800 font-opensans whitespace-nowrap">
              {boardingPlace}
            </h3>
            <p className="text-sm font-medium text-gray-600 font-opensans">
              Boarding place name
            </p>
          </div>
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-16 h-0.5 bg-[#efbdc0]"></div>
            <div className="relative">
              <img 
                src="/images/img_group_red_300.svg" 
                alt="route indicator" 
                className="w-8 h-8"
              />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-500 font-opensans whitespace-nowrap">
                {duration}
              </span>
            </div>
            <div className="w-16 h-0.5 bg-[#efbdc0]"></div>
          </div>
          
          <div className="flex flex-col text-left min-w-[120px] flex-1">
            <h3 className="text-lg font-bold text-gray-800 font-opensans whitespace-nowrap">
              {droppingPlace}
            </h3>
            <p className="text-sm font-medium text-gray-600 font-opensans">
              Dropping place name
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

BusDetail.propTypes = {
  busName: PropTypes.string.isRequired,
  busType: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  boardingPlace: PropTypes.string.isRequired,
  droppingPlace: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  // Two-way trip props
  tripType: PropTypes.string,
  returnDate: PropTypes.string,
  returnTime: PropTypes.string,
  returnBusName: PropTypes.string,
  returnBusType: PropTypes.string,
};

export default BusDetail;