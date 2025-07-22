import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './UI/HomeCards';

const NowBookingSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  
  const bookings = [
    {
      id: 1,
      origin: 'Kathmandu',
      destination: 'Birgunj',
      price: 'Rs. 1,100.00',
      duration: '4h 30m',
      busType: 'Luxury'
    },
    {
      id: 2,
      origin: 'Birgunj',
      destination: 'Kathmandu',
      price: 'Rs. 1,100.00',
      duration: '4h 45m',
      busType: 'Luxury'
    },
    {
      id: 3,
      origin: 'Kalaiya',
      destination: 'Panauti',
      price: 'Rs. 1,100.00',
      duration: '4h 15m',
      busType: 'Luxury'
    },
    {
      id: 4,
      origin: 'Panauti',
      destination: 'Kalaiya',
      price: 'Rs. 1,100.00',
      duration: '4h 40m',
      busType: 'Luxury'
    }
  ];
  const handleBookNow = (booking) => {
    console.log(`Booking ticket for route:`, booking);
    
    // Prepare search parameters for auto-population
    const searchParams = {
      from: booking.origin,
      to: booking.destination,
      fromCity: booking.origin,
      toCity: booking.destination,
      date: new Date().toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: 'numeric' 
      }),
      tripType: 'oneWay'
    };
    
    // Add smooth transition effect
    const element = document.getElementById(`booking-card-${booking.id}`);
    if (element) {
      element.style.transform = 'scale(0.95)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
        // Navigate to search-results page with auto-populated data
        navigate('/search-results', {
          state: {
            searchParams: searchParams,
            fromAutoSelect: true,
            selectedRoute: {
              origin: booking.origin,
              destination: booking.destination,
              price: booking.price,
              busType: booking.busType
            }
          }
        });
      }, 150);
    } else {
      // Direct navigation if element not found
      navigate('/search-results', {
        state: {
          searchParams: searchParams,
          fromAutoSelect: true,
          selectedRoute: {
            origin: booking.origin,
            destination: booking.destination,
            price: booking.price,
            busType: booking.busType
          }
        }
      });
    }
  };
  return (
    <section className="py-8 sm:py-12 md:py-16 mt-8 sm:mt-12 md:mt-16 lg:mt-20 relative overflow-hidden">

      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full px-6 py-3 mb-6 shadow-sm">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-600 font-semibold text-sm tracking-wide">NOW BOOKING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Premium Routes Available
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Book your perfect journey with our most popular routes. Fast, reliable, and comfortable travel at affordable prices.
          </p>
        </div>
        
        {/* Modern Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {bookings.map((booking, index) => (
            <div
              key={booking.id}
              id={`booking-card-${booking.id}`}
              className="group relative transform transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'slideInUp 0.8s ease-out forwards'
              }}
              onMouseEnter={() => setHoveredCard(booking.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Modern Card Design */}
              <div className="relative bg-white border border-gray-200/60 rounded-3xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Floating Badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                
                {/* Content */}
                <div className="relative z-10 space-y-3">
                  {/* Status & Bus Type */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-600 text-xs font-semibold">AVAILABLE</span>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 rounded-full px-3 py-1">
                      <span className="text-blue-600 text-xs font-bold">{booking.busType}</span>
                    </div>
                  </div>
                  
                  {/* Route Information */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-800 text-lg font-bold">{booking.origin}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-right">
                        <h3 className="text-gray-800 text-lg font-bold">{booking.destination}</h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price & Book Button */}
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                        {booking.price}
                      </div>
                      <div className="text-gray-500 text-xs">per person</div>
                    </div>
                    
                    <button
                      onClick={() => handleBookNow(booking)}
                      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold py-2.5 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>Book Now</span>
                        <span className="text-lg">🚌</span>
                      </span>
                    </button>
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </div>
            </div>
          ))}
        </div>        
        {/* Premium Features Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200/60 rounded-xl p-4 shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { 
                  icon: '🛡️', 
                  title: '24/7 Support', 
                  desc: 'Round-the-clock assistance',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                { 
                  icon: '⚡', 
                  title: 'Instant Confirmation', 
                  desc: 'Immediate validation',
                  gradient: 'from-purple-500 to-pink-500'
                },
                { 
                  icon: '🔒', 
                  title: 'Safe & Secure', 
                  desc: 'Advanced protection',
                  gradient: 'from-emerald-500 to-teal-500'
                }
              ].map((feature, index) => (
                <div key={index} className="group text-center">
                  <div className="relative bg-gradient-to-br from-gray-50 to-blue-50/50 border border-gray-200/50 rounded-lg p-3 hover:shadow-sm transition-all duration-300 hover:scale-105">
                    <div className={`w-8 h-8 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center text-sm text-white mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      {feature.icon}
                    </div>
                    <h4 className="text-gray-800 font-bold text-sm mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-xs leading-tight">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default NowBookingSection;