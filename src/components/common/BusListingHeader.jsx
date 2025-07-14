import React from 'react';

const BusListingHeader = ({ 
  title = "Available Buses",
  subtitle = "Multiple Types",
  departureDate = null,
  returnDate = null,
  fromCity = "Kathmandu",
  toCity = "Birgunj",
  duration = "6h 15m",
  tripType = "oneWay",
  showDates = true
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Left side - Title and subtitle */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
            {title}
          </h2>
          <p className="text-sm text-gray-600">
            {subtitle}
          </p>
        </div>

        {/* Right side - Date and journey information */}
        {showDates && (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Departure Date */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-blue-600">Departure</span>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-800">
                  {formatDate(departureDate) || 'Mon, Jul 14, 2025'}
                </div>
                <div className="text-xs text-blue-600">
                  19:30
                </div>
              </div>
            </div>

            {/* Return Date (for two-way trips) */}
            {tripType === 'twoWay' && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-green-600">Return</span>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-800">
                    {formatDate(returnDate) || 'Tue, Jul 15, 2025'}
                  </div>
                  <div className="text-xs text-green-600">
                    19:30
                  </div>
                </div>
              </div>
            )}

            {/* Journey route with duration */}
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-gray-700">
                {fromCity}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <img 
                    src="/images/img_group_red_300.svg" 
                    alt="bus" 
                    className="w-6 h-6"
                  />
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="text-sm font-medium text-gray-700">
                {toCity}
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                {duration}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusListingHeader;
