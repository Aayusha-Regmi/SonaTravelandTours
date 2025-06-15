import React from 'react';

const ServiceHighlights = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 min-h-screen">
      {/* Animated Background Elements - Same as PaymentMethods */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-72 h-72 bg-gradient-to-r from-emerald-400/25 to-teal-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-cyan-500/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-16 right-1/3 w-56 h-56 bg-gradient-to-r from-orange-400/25 to-amber-500/25 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
      </div>


      {/* Service Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-6xl">🏆</div>
        <div className="absolute top-40 right-40 text-4xl">💎</div>
        <div className="absolute bottom-40 left-40 text-5xl">🎯</div>
        <div className="absolute bottom-20 right-20 text-4xl">🚀</div>
        <div className="absolute top-1/2 left-1/5 text-3xl">⭐</div>
        <div className="absolute top-1/3 right-1/3 text-3xl">🎖️</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">          {/* Enhanced Left Side - Background Image with 3D Effects - Updated for better visibility */}
          <div className="lg:w-1/2 h-[700px] relative rounded-3xl overflow-hidden shadow-2xl mb-8 lg:mb-0">
            <img 
              src="/images/img_beautifullandscapetouristbustraveltransportbackground87582536524.png" 
              alt="Tourist Bus Landscape" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 brightness-110 contrast-110"
            />
            
            {/* Subtle border overlay without blur */}
            <div className="absolute inset-0 border-4 border-white/30 rounded-3xl pointer-events-none"></div>
            
            {/* 3D Floating Badges - Updated for better visibility */}
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm border border-white/40 rounded-2xl px-4 py-2 shadow-xl z-20 hover:bg-black/70 transition-all duration-300">
              <span className="text-sm font-bold text-white">Premium Experience</span>
            </div>
            
            <div className="absolute bottom-6 right-6 bg-gradient-to-r from-orange-500/80 to-red-500/80 backdrop-blur-sm border border-white/40 rounded-2xl px-4 py-2 shadow-xl z-20 hover:from-orange-500/90 hover:to-red-500/90 transition-all duration-300">
              <span className="text-sm font-bold text-white">★ 4.9/5 Rating</span>
            </div>
          </div>
            {/* Enhanced Right Side - Content with 3D Glassmorphism - Updated for dark theme */}
          <div className="lg:w-1/2 lg:pl-12">
            {/* Main Title with Glassmorphism - Updated for dark theme */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
              {/* Excellence Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                EXCELLENCE
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform duration-500">
                Experience the Difference with Our Service!
              </h2>
            </div>            {/* Enhanced Service Cards - Updated for dark theme */}
            <div className="space-y-8">
              {/* Service 1 - Exceptional Service */}
              <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="relative">
                    {/* 3D Icon Container - Updated for dark theme */}
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <img 
                        src="/images/img_eosiconsserviceoutlined.svg" 
                        alt="Service Icon" 
                        className="w-14 h-14 filter brightness-0 invert"
                      />
                    </div>
                    {/* Floating Glow Effect */}
                    <div className="absolute inset-0 bg-blue-400/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3 group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
                      Exceptional Service
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Experience unparalleled customer support and a seamless booking process every time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 2 - Affordable Prices */}
              <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <img 
                        src="/images/img_solartagpricelinear.svg" 
                        alt="Price Icon" 
                        className="w-14 h-14 filter brightness-0 invert"
                      />
                    </div>
                    <div className="absolute inset-0 bg-emerald-400/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3 group-hover:from-emerald-300 group-hover:to-teal-300 transition-all duration-300">
                      Affordable Prices
                    </h3>                    <p className="text-xl text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Enjoy competitive rates and exclusive discounts on all your travel needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 3 - Comfortable Travel */}
              <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <img 
                        src="/images/img_tdesignsleep.svg" 
                        alt="Comfort Icon" 
                        className="w-14 h-14 filter brightness-0 invert"
                      />
                    </div>
                    <div className="absolute inset-0 bg-purple-400/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                      Comfortable Travel
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Travel in comfort with our modern and well-maintained fleet of buses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Booking Stats with 3D Effects - Updated for dark theme */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Booking Counter */}
          <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">                  <img 
                    src="/images/img_hugeiconsticket02.svg" 
                    alt="Ticket Icon" 
                    className="w-14 h-14 filter brightness-0 invert"
                  />
                </div>
                <div className="absolute inset-0 bg-orange-400/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
              
              <div className="ml-6">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-red-300 transition-all duration-300">
                  15,340 Bookings
                </h3>
              </div>
            </div>
          </div>
          
          {/* Success Message - Updated for dark theme */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 max-w-md group">
            <p className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent leading-relaxed group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
              Join thousands of satisfied travelers who have booked their journeys with us!
            </p>
            
            {/* Rating Stars - Updated for dark theme */}
            <div className="mt-4 flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse hover:scale-110 transition-transform duration-300"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <span className="text-white text-xs">★</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Decorative Elements - Updated for dark theme */}
        <div className="mt-16 flex justify-center space-x-6">
          {['🚌', '✨', '🎯'].map((emoji, i) => (
            <div 
              key={i} 
              className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-xl text-2xl animate-bounce hover:bg-white/20 hover:scale-110 transition-all duration-500"
              style={{ animationDelay: `${i * 0.5}s`, animationDuration: '3s' }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;