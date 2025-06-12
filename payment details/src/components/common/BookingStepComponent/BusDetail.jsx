import React from 'react';
import PropTypes from 'prop-types';

const BusDetail = ({ 
  busName, 
  busType, 
  date, 
  time, 
  boardingPlace, 
  droppingPlace, 
  duration 
}) => {
  return (
    <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-1 font-opensans">
            {busName}
          </h2>
          <p className="text-sm font-medium text-gray-600 font-opensans">
            {busType}
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <p className="text-base font-bold text-gray-800 font-opensans">
            {date}
          </p>
          <p className="text-xl font-bold text-gray-800 font-opensans">
            {time}
          </p>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 font-opensans">
              {boardingPlace}
            </h3>
            <p className="text-sm font-medium text-gray-600 font-opensans">
              Boarding place name
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-24 h-0.5 bg-[#efbdc0]"></div>
            <div className="relative">
              <img 
                src="/images/img_group_red_300.svg" 
                alt="route indicator" 
                className="w-8 h-8"
              />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-500 font-opensans">
                {duration}
              </span>
            </div>
            <div className="w-24 h-0.5 bg-[#efbdc0]"></div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 font-opensans">
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
};

export default BusDetail;
