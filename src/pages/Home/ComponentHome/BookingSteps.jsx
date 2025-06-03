import React from 'react';

const BookingSteps = () => {  return (
    <section className="py-12 sm:py-16 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#3d3d3d] text-center mb-8 sm:mb-12">
          How To Book A Bus Ticket?
        </h2>
        
        <div className="relative">          {/* Enhanced Animated ZigZag Flow Lines */}
          <div className="hidden md:block absolute z-0 h-full w-full">
            {/* Animated Circle Connectors */}
            <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0a639d] animate-pulse"></div>
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0a639d] animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0a639d] animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0a639d] animate-pulse" style={{ animationDelay: '0.9s' }}></div>
            
            {/* ZigZag connecting lines between steps */}
            {/* ZigZag from step 1 to step 2 */}
            <svg className="absolute top-[20%] left-0 w-full h-[20%]" preserveAspectRatio="none">
              <path 
                d="M 50,0 Q 70,50 90,0 Q 110,50 130,0 Q 150,50 170,0 Q 190,50 210,0" 
                stroke="#0a639d" 
                strokeWidth="2" 
                strokeDasharray="5,5" 
                fill="none" 
                strokeLinecap="round"
                transform="scale(0.25, 1)"
              />
            </svg>
            
            {/* ZigZag from step 2 to step 3 */}
            <svg className="absolute top-[40%] left-0 w-full h-[20%]" preserveAspectRatio="none">
              <path 
                d="M 800,0 Q 780,50 760,0 Q 740,50 720,0 Q 700,50 680,0 Q 660,50 640,0" 
                stroke="#0a639d" 
                strokeWidth="2" 
                strokeDasharray="5,5" 
                fill="none" 
                strokeLinecap="round"
                transform="scale(0.25, 1)"
              />
            </svg>
            
            {/* ZigZag from step 3 to step 4 */}
            <svg className="absolute top-[60%] left-0 w-full h-[20%]" preserveAspectRatio="none">
              <path 
                d="M 50,0 Q 70,50 90,0 Q 110,50 130,0 Q 150,50 170,0 Q 190,50 210,0" 
                stroke="#0a639d" 
                strokeWidth="2" 
                strokeDasharray="5,5" 
                fill="none" 
                strokeLinecap="round"
                transform="scale(0.25, 1)"
              />
            </svg>
            
            {/* Animated dots moving along the zigzag path */}
            <div className="absolute top-[20%] left-1/3 w-3 h-3 rounded-full bg-[#ff8f1f] animate-flow-zigzag"></div>
            <div className="absolute top-[40%] right-1/3 w-3 h-3 rounded-full bg-[#ff8f1f] animate-flow-zigzag-reverse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-[60%] left-1/3 w-3 h-3 rounded-full bg-[#ff8f1f] animate-flow-zigzag" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24 relative">
            <div className="bg-[#07456e] rounded-2xl w-[240px] h-[240px] relative mb-8 md:mb-0 z-10">
              <img 
                src="/images/img_manusinghismobilephone5341912193.png" 
                alt="Enter Trip Information" 
                className="absolute -top-16 left-2 w-[204px] h-[306px]"
              />              <div className="absolute -right-4 top-1/2 transform translate-x-full -translate-y-1/2 hidden md:block">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-wiggle">
                  <path d="M24 4L44 24L24 44M44 24H4" stroke="#0a639d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="md:ml-12 bg-white rounded-xl p-4 md:p-8 max-w-md shadow-md z-10">
              <div className="inline-block bg-[#0a639d]/10 px-3 py-1 rounded-lg mb-2">
                <span className="text-sm sm:text-base font-semibold text-[#0a639d]">Step 1</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0a639d] mb-2 sm:mb-3">
                Enter Trip Information
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#5f5f5f] leading-relaxed">
                Select boarding & debaording place, choose departure date and 
                <span className="text-base sm:text-lg font-bold text-[#0a639d]"> Search</span>.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-16 md:mb-24 relative">
            <div className="relative mb-8 md:mb-0">
              <img 
                src="/images/img_indianwomenwearingcasualethnicclothingusinghersmartphone862994120134.png" 
                alt="Choose The Best Match" 
                className="w-[235px] h-[348px]"
              />
              <svg className="absolute -z-10 top-10 left-0" width="240" height="306" viewBox="0 0 240 306" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="240" height="306" rx="16" fill="#07456e"/>
              </svg>
            </div>
            
            <div className="md:mr-12 bg-white rounded-xl p-4 md:p-8 max-w-md">
              <div className="inline-block bg-[#0a639d]/10 px-3 py-1 rounded-lg mb-2">
                <span className="text-sm sm:text-base font-semibold text-[#0a639d]">Step 2</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0a639d] mb-2 sm:mb-3">
                Choose The Best Match
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#5f5f5f] leading-relaxed">
                Add <span className="text-base sm:text-lg font-bold text-[#0a639d]">Filters</span> and 
                <span className="text-base sm:text-lg font-bold text-[#0a639d]"> Sort the results</span> to find the best option according to your plan.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="flex flex-col md:flex-row items-center mb-8 md:mb-0">
              <img 
                src="/images/img_passenger_details_1.png" 
                alt="Passenger Details" 
                className="w-[178px] h-[299px] rounded-lg mr-4"
              />
              <img 
                src="/images/img_payment_details_1.png" 
                alt="Payment Details" 
                className="w-[109px] h-[410px] rounded-lg"
              />
            </div>
            
            <div className="md:ml-12 bg-white rounded-xl p-4 md:p-8 max-w-md">
              <div className="inline-block bg-[#0a639d]/10 px-3 py-1 rounded-lg mb-2">
                <span className="text-sm sm:text-base font-semibold text-[#0a639d]">Step 3</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0a639d] mb-2 sm:mb-3">
                Enter Information
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#5f5f5f] leading-relaxed">
                Choose your seat(s), passenger details, 
                <span className="text-base sm:text-lg font-bold text-[#0a639d]"> Payment Method</span> and 
                <span className="text-base sm:text-lg font-bold text-[#0a639d]"> Complete the Purchase.</span>
              </p>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="relative mb-8 md:mb-0">
              <img 
                src="/images/img_coupletakingselfiewhiletravelingbytrain232149304471.png" 
                alt="Enjoy Your Trip" 
                className="w-[188px] h-[282px] rounded-2xl"
              />
            </div>
            
            <div className="md:mr-12 bg-white rounded-xl p-4 md:p-8 max-w-md">
              <div className="inline-block bg-[#0a639d]/10 px-3 py-1 rounded-lg mb-2">
                <span className="text-sm sm:text-base font-semibold text-[#0a639d]">Step 4</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0a639d] mb-2 sm:mb-3">
                Enjoy Your Trip
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#5f5f5f] mb-3 sm:mb-4">
                Enjoy our buses' top <span className="font-bold text-[#0a639d]">Facilities:</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-center bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors">
                  <img 
                    src="/images/img_hicon_linear_tick_square.svg" 
                    alt="Tick" 
                    className="w-4 h-4 mr-2 text-[#0a639d]"
                  />
                  <span className="text-xs sm:text-sm font-medium text-[#3d3d3d]">
                    Full A/C & Air Suspension
                  </span>
                </div>
                <div className="flex items-center bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors">
                  <img 
                    src="/images/img_hicon_linear_tick_square.svg" 
                    alt="Tick" 
                    className="w-4 h-4 mr-2 text-[#0a639d]"
                  />
                  <span className="text-xs sm:text-sm font-medium text-[#3d3d3d]">
                    Multi-zone A/C
                  </span>
                </div>
                <div className="flex items-center bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors">
                  <img 
                    src="/images/img_hicon_linear_tick_square.svg" 
                    alt="Tick" 
                    className="w-4 h-4 mr-2 text-[#0a639d]"
                  />
                  <span className="text-xs sm:text-sm font-medium text-[#3d3d3d]">
                    Heated front seats
                  </span>
                </div>
              </div>
            </div>
          </div>
            {/* No vertical connecting line needed with zigzag pattern */}
        </div>
      </div>
    </section>
  );
};

export default BookingSteps;