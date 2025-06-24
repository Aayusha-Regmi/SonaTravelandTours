import React, { useState } from 'react';
import Card from './UI/HomeCards';

const NowBookingSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const bookings = [
    {
      id: 1,
      origin: 'Kathmandu',
      subtitle: 'Swayambhu',
      destination: 'Birgunj',
      price: 'Rs. 2,000.00',
      duration: '4h 30m',
      busType: 'AC Deluxe'
    },
    {
      id: 2,
      origin: 'Kathmandu',
      subtitle: 'New Bus Park',
      destination: 'Birgunj',
      price: 'Rs. 1,800.00',
      duration: '4h 45m',
      busType: 'Tourist'
    },
    {
      id: 3,
      origin: 'Kathmandu',
      subtitle: 'Kalanki',
      destination: 'Birgunj',
      price: 'Rs. 2,200.00',
      duration: '4h 15m',
      busType: 'Luxury'
    },
    {
      id: 4,
      origin: 'Kathmandu',
      subtitle: 'Balkhu',
      destination: 'Birgunj',
      price: 'Rs. 1,950.00',
      duration: '4h 40m',
      busType: 'AC'
    }
  ];
  const handleBookNow = (booking) => {
    console.log(`Booking ticket for route:`, booking);
    // Add smooth transition effect
    const element = document.getElementById(`booking-card-${booking.id}`);
    if (element) {
      element.style.transform = 'scale(0.95)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 150);
    }
    // Implement booking functionality here
  };
  return (
    <section className="py-8 sm:py-12 md:py-16 mt-8 sm:mt-12 md:mt-16 lg:mt-20 relative overflow-hidden">

      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            Now Booking
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Book your perfect journey with our most popular routes. Fast, reliable, and comfortable travel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {bookings.map((booking, index) => (
            <div
              key={booking.id}
              id={`booking-card-${booking.id}`}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <Card
                type="booking"
                origin={booking.origin}
                subtitle={booking.subtitle}
                destination={booking.destination}
                price={booking.price}
                busType={booking.busType}
                duration={booking.duration}
                onClick={() => handleBookNow(booking)}
                className="h-auto min-h-[140px] sm:min-h-[160px] md:min-h-[178px] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200"
              />
            </div>
          ))}
        </div>        {/* Call to action */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="flex flex-wrap justify-center gap-2 text-xs text-white">
            <span className="bg-[#ff8f1f] px-3 py-1 rounded-full">24/7 Support</span>
            <span className="bg-[#ff8f1f] px-3 py-1 rounded-full">Instant Confirmation</span>
            <span className="bg-[#ff8f1f] px-3 py-1 rounded-full">Safe & Secure</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default NowBookingSection;