import React from 'react';

const BookingSteps = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            BOOKING GUIDE
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How to Book Your
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Perfect Journey
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Follow our simple 4-step process to book your bus ticket and enjoy a comfortable journey
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-300 to-purple-200 transform -translate-x-1/2"></div>
          
          {/* Step 1 */}
          <div className="relative mb-24">
            <div className="flex flex-col lg:flex-row items-center">              {/* Content */}
              <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 h-96 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                        01
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        STEP 1
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Enter Trip Details
                    </h3>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      Start by selecting your departure and destination cities, along with your preferred travel date and time.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        📍
                      </div>
                      <span className="text-gray-700 font-medium">Smart location search</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        📅
                      </div>
                      <span className="text-gray-700 font-medium">Flexible date picker</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="lg:w-1/2 lg:pl-16">
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/img_manusinghismobilephone5341912193.png" 
                      alt="Enter Trip Information" 
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
            
            {/* Step Indicator */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 w-6 h-6 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg"></div>
          </div>

          {/* Step 2 */}
          <div className="relative mb-24">
            <div className="flex flex-col lg:flex-row-reverse items-center">              {/* Content */}
              <div className="lg:w-1/2 lg:pl-16 mb-12 lg:mb-0">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 h-96 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                        02
                      </div>
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                        STEP 2
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Choose Your Bus
                    </h3>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      Browse available buses, compare prices, amenities, and select the one that best fits your preferences.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                        🚌
                      </div>
                      <span className="text-gray-700 font-medium">Multiple bus options</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                        ⭐
                      </div>
                      <span className="text-gray-700 font-medium">Ratings & reviews</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="lg:w-1/2 lg:pr-16">
                <div className="relative">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/img_indianwomenwearingcasualethnicclothingusinghersmartphone862994120134.png" 
                      alt="Choose Your Bus" 
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Step Indicator */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 w-6 h-6 bg-indigo-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg"></div>
          </div>

          {/* Step 3 */}
          <div className="relative mb-24">
            <div className="flex flex-col lg:flex-row items-center">              {/* Content */}
              <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 h-96 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                        03
                      </div>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                        STEP 3
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Select Seats & Pay
                    </h3>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      Choose your preferred seats, enter passenger details, and complete payment through our secure gateway.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        💺
                      </div>
                      <span className="text-gray-700 font-medium">Interactive seat map</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        🔒
                      </div>
                      <span className="text-gray-700 font-medium">Secure payment</span>
                    </div>
                  </div>
                </div>
              </div>
                {/* Image */}
              <div className="lg:w-1/2 lg:pl-16">
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/img_passenger_details_1.png" 
                      alt="Select Seats & Pay" 
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
            
            {/* Step Indicator */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 w-6 h-6 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg"></div>
          </div>

          {/* Step 4 */}
          <div className="relative mb-16">
            <div className="flex flex-col lg:flex-row-reverse items-center">              {/* Content */}
              <div className="lg:w-1/2 lg:pl-16 mb-12 lg:mb-0">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 h-96 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                        04
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        STEP 4
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Enjoy Your Journey
                    </h3>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      Get your mobile ticket, board the bus, and enjoy a comfortable journey with premium amenities.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        📱
                      </div>
                      <span className="text-gray-700 font-medium">Mobile ticket</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        ✨
                      </div>
                      <span className="text-gray-700 font-medium">Premium comfort</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className="lg:w-1/2 lg:pr-16">
                <div className="relative">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/img_coupletakingselfiewhiletravelingbytrain232149304471.png" 
                      alt="Enjoy Your Journey" 
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -right-4 text-2xl">🎉</div>
                </div>
              </div>
            </div>
            
            {/* Step Indicator */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 w-6 h-6 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg"></div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/20 max-w-2xl mx-auto">
            <h4 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Book Your Journey?
            </h4>
            <p className="text-gray-600 text-lg mb-8">
              Join thousands of happy travelers who choose our comfortable bus service
            </p>
            
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              Book Your Ticket Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSteps;