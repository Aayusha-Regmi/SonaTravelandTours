import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/ui/Button'; 

const Card = ({ 
  type = 'booking', 
  title,
  subtitle,
  price,
  image,
  destination,
  origin,
  offerType,
  discount,
  promoCode,
  onClick,
  className = ''
}) => {  // Booking Card
  if (type === 'booking') {
    return (
      <div className={`bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 ${className}`}>
        <div className="flex flex-col h-full">          
          <div className="mb-3 sm:mb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#3d3d3d] leading-tight">{origin}</h3>
                <p className="text-xs sm:text-sm font-medium text-[#8f8f8f] mt-1">{subtitle}</p>
              </div>              
              <div className="flex items-center px-1 sm:px-2">
                <svg width="60" height="20" viewBox="0 0 80 30" className="w-12 sm:w-16 md:w-20 h-4 sm:h-5 md:h-6">
                  <path 
                    d="M5,15 L75,15" 
                    stroke="#0a639d" 
                    strokeWidth="2" 
                    fill="none"
                  />
                  <circle cx="5" cy="15" r="3" fill="#0a639d" />
                  <circle cx="75" cy="15" r="3" fill="#ff8f1f" />
                  <path 
                    d="M70,15 L80,15" 
                    stroke="#ff8f1f" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M75,11 L75,19" 
                    stroke="#ff8f1f" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              
              <div className="flex-1 text-right">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#3d3d3d] leading-tight">{destination}</h3>
                <p className="text-xs sm:text-sm font-medium text-[#8f8f8f] mt-1">Bus Park</p>
              </div>
            </div>
          </div>
            <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#3d3d3d]">{price}</p>
            
            <Button 
              className="h-8 sm:h-10 md:h-12 bg-[#0a639d] text-white rounded-lg flex items-center justify-center px-3 sm:px-4 w-full sm:w-auto hover:bg-[#084a7a] transition-colors"
              onClick={onClick}
            >
              <span className="text-xs sm:text-sm md:text-base font-semibold">Book Now</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Route Card
  if (type === 'route') {
    return (
      <div className={`bg-white rounded-2xl shadow-md overflow-hidden ${className}`}>
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-[388px] object-cover"
          />
          <button className="absolute top-4 right-4 bg-white p-1 rounded-full">
            <img 
              src="/images/img_hicon_linear_heart_2.svg" 
              alt="Favorite" 
              className="w-[30px] h-[30px]"
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-[28px] font-bold text-[#3d3d3d]">{title}</h3>
          <p className="text-xl font-semibold text-[#5f5f5f] mb-1">{offerType}</p>
          <p className="text-xl font-semibold text-[#5f5f5f]">
            Start from <span className="text-[28px] font-bold text-[#0a639d]">{price}</span>
          </p>
        </div>
      </div>
    );
  }
  
  // Offer Card
  if (type === 'offer') {
    return (
      <div className={`bg-white rounded-2xl overflow-hidden ${className}`}>
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-[240px] object-cover"
          />
          {discount && (
            <div className="absolute top-4 left-4">
              <img 
                src="/images/img_lettering_discount_up_to_seventy_percent_gift_text.png" 
                alt="Discount" 
                className="w-[38px] h-[36px]"
              />
            </div>
          )}
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-3xl font-bold">{subtitle}</p>
            <p className="text-lg font-bold text-white mt-2">{discount}</p>
            
            {promoCode && (
              <div className="mt-4 bg-[#fff4e9] rounded-xl p-4 flex justify-between items-center">
                <p className="text-xl font-bold text-[#b36416]">
                  Promo Code: <br />
                  {promoCode}
                </p>
                <img 
                  src="/images/img_tablercopy.svg" 
                  alt="Copy" 
                  className="w-6 h-6 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

Card.propTypes = {
  type: PropTypes.oneOf(['booking', 'route', 'offer']),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
  destination: PropTypes.string,
  origin: PropTypes.string,
  offerType: PropTypes.string,
  discount: PropTypes.string,
  promoCode: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Card;