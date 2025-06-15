import React from 'react';

const BookingSteps = () => {
  return (
    <section className="py-12 sm:py-16">      <div className="container mx-auto px-4">{/* Ultra-Professional Header Design */}
        <div className="text-center mb-32">          <div className="relative inline-block">
            {/* Premium Black Glassmorphism Header Container */}
            <div className="glass-blend rounded-[4rem] px-16 py-12 shadow-2xl hover:shadow-3xl transition-all duration-1000 transform hover:scale-[1.02] group animate-glow glass-shimmer">
              {/* Professional Badge */}
              <div className="absolute -top-8 -right-8 glass-black-intense text-white px-8 py-4 rounded-3xl text-sm font-bold shadow-2xl animate-pulse border border-white/30">
                <span className="relative z-10 text-on-glass-black">PROFESSIONAL GUIDE</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-3xl blur-lg"></div>
              </div>
              
              {/* Premium Black Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent rounded-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 glass-black-shimmer"></div>
              
              <div className="relative z-10">
                <h2 className="text-6xl lg:text-7xl font-black mb-6 group-hover:scale-105 transition-transform duration-700 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-black/90 to-black/60">
                  How To Book Your Perfect Journey?
                </h2>
                <p className="text-2xl text-slate-800 font-medium leading-relaxed group-hover:text-black transition-colors duration-700 max-w-4xl mx-auto">
                  Experience seamless booking with our innovative 4-step professional process
                </p>
              </div>
            </div>
          </div>
        </div>        {/* Professional Step Connection System */}
        <div className="relative">
          {/* Ultra-Professional Connection Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-slate-300/80 via-blue-400/60 via-indigo-400/60 via-slate-300/80 to-transparent transform -translate-x-1/2 rounded-full shadow-sm"></div>
          
          {/* Premium Step Indicators */}
          <div className="hidden lg:block absolute left-1/2 top-40 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform -translate-x-1/2 shadow-xl animate-pulse border-4 border-white">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500 animate-ping opacity-30"></div>
          </div>
          <div className="hidden lg:block absolute left-1/2 top-[28rem] w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transform -translate-x-1/2 shadow-xl animate-pulse border-4 border-white" style={{ animationDelay: '1s' }}>
            <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 animate-ping opacity-30" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="hidden lg:block absolute left-1/2 bottom-[28rem] w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transform -translate-x-1/2 shadow-xl animate-pulse border-4 border-white" style={{ animationDelay: '2s' }}>
            <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-500 animate-ping opacity-30" style={{ animationDelay: '2s' }}></div>
          </div>
          <div className="hidden lg:block absolute left-1/2 bottom-40 w-12 h-12 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full transform -translate-x-1/2 shadow-xl animate-pulse border-4 border-white" style={{ animationDelay: '3s' }}>
            <div className="w-full h-full rounded-full bg-gradient-to-r from-slate-400 to-slate-500 animate-ping opacity-30" style={{ animationDelay: '3s' }}></div>
          </div>{/* STEP 1 - Ultra-Professional Design */}
          <div className="flex flex-col lg:flex-row items-center mb-32 relative group">            {/* Premium Image Container */}
            <div className="relative mb-16 lg:mb-0 lg:w-1/2 animate-slide-left">
              <div className="relative glass-morphism rounded-[3rem] p-12 shadow-2xl hover:shadow-3xl transition-all duration-1000 transform hover:scale-[1.02] hover:-rotate-1 group">
                {/* Professional Depth Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-indigo-200/30 rounded-[3rem] transform translate-x-3 translate-y-3 -z-10 opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 to-slate-200/20 rounded-[3rem] transform translate-x-6 translate-y-6 -z-20 opacity-40"></div>
                
                {/* Enhanced Image Container */}
                <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 rounded-3xl w-[360px] h-[360px] mx-auto overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                  <img 
                    src="/images/img_manusinghismobilephone5341912193.png" 
                    alt="Enter Trip Information" 
                    className="absolute -top-24 left-6 w-[320px] h-[480px] filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-1000 object-cover"
                  />
                  {/* Professional Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-blue-500/20"></div>
                </div>
                
                {/* Professional Step Badge */}
                <div className="absolute -top-6 -left-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-2xl animate-bounce border-4 border-white">
                  01
                </div>
              </div>
            </div>
            
            {/* Premium Content Container */}
            <div className="lg:w-1/2 lg:ml-20 animate-slide-right">
              <div className="glass-morphism-intense rounded-[2.5rem] p-12 shadow-2xl hover:shadow-3xl transition-all duration-1000 transform hover:scale-[1.02] group relative overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shimmer"></div>
                
                <div className="relative z-10">
                  {/* Professional Step Header */}
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-3xl text-sm font-bold shadow-xl mr-6 animate-pulse">
                      STEP 1
                    </div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                  
                  <h3 className="text-5xl font-black text-gradient mb-8 group-hover:scale-105 transition-transform duration-700 leading-tight">
                    Enter Trip Information
                  </h3>
                  
                  <p className="text-2xl text-slate-600 leading-relaxed mb-10 group-hover:text-slate-700 transition-colors duration-700">
                    Begin your journey by selecting your <span className="font-bold text-blue-600">departure</span> and <span className="font-bold text-indigo-600">destination</span> points with our intelligent location system.
                  </p>
                  
                  {/* Professional Features */}
                  <div className="space-y-6">
                    <div className="flex items-center glass-morphism rounded-2xl p-6 hover:bg-white/70 transition-all duration-500 transform hover:scale-[1.02] shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                        <span className="text-white text-lg">📍</span>
                      </div>
                      <span className="text-slate-700 font-semibold text-lg">Smart Location Detection</span>
                    </div>
                    <div className="flex items-center glass-morphism rounded-2xl p-6 hover:bg-white/70 transition-all duration-500 transform hover:scale-[1.02] shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                        <span className="text-white text-lg">📅</span>
                      </div>
                      <span className="text-slate-700 font-semibold text-lg">Flexible Date Selection</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* STEP 2 - Ultra-Professional Mirror Layout */}
          <div className="flex flex-col lg:flex-row-reverse items-center mb-32 relative group">
            {/* Premium Image Container */}
            <div className="relative mb-16 lg:mb-0 lg:w-1/2 animate-slide-right">
              <div className="relative glass-morphism rounded-[3rem] p-12 shadow-2xl hover:shadow-3xl transition-all duration-1000 transform hover:scale-[1.02] hover:rotate-1 group">
                {/* Professional Depth Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 to-purple-200/30 rounded-[3rem] transform translate-x-3 translate-y-3 -z-10 opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-slate-200/20 rounded-[3rem] transform translate-x-6 translate-y-6 -z-20 opacity-40"></div>
                
                {/* Enhanced Image Container */}
                <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 rounded-3xl w-[360px] h-[420px] mx-auto overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                  <img 
                    src="/images/img_indianwomenwearingcasualethnicclothingusinghersmartphone862994120134.png" 
                    alt="Choose The Best Match" 
                    className="w-full h-full object-cover filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-1000"
                  />
                  {/* Professional Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-indigo-500/20"></div>
                </div>
                
                {/* Professional Step Badge */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-2xl animate-bounce border-4 border-white" style={{ animationDelay: '1s' }}>
                  02
                </div>
              </div>
            </div>
            
            {/* Premium Content Container */}
            <div className="lg:w-1/2 lg:mr-20 animate-slide-left">
              <div className="glass-morphism-intense rounded-[2.5rem] p-12 shadow-2xl hover:shadow-3xl transition-all duration-1000 transform hover:scale-[1.02] group relative overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shimmer"></div>
                
                <div className="relative z-10">
                  {/* Professional Step Header */}
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-3xl text-sm font-bold shadow-xl mr-6 animate-pulse" style={{ animationDelay: '1s' }}>
                      STEP 2
                    </div>
                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <h3 className="text-5xl font-black text-gradient mb-8 group-hover:scale-105 transition-transform duration-700 leading-tight">
                    Choose The Perfect Match
                  </h3>
                  
                  <p className="text-2xl text-slate-600 leading-relaxed mb-10 group-hover:text-slate-700 transition-colors duration-700">
                    Our <span className="font-bold text-indigo-600">AI-powered system</span> analyzes your preferences to recommend the <span className="font-bold text-purple-600">perfect bus</span> for your journey.
                  </p>
                  
                  {/* Professional Features */}
                  <div className="space-y-6">
                    <div className="flex items-center glass-morphism rounded-2xl p-6 hover:bg-white/70 transition-all duration-500 transform hover:scale-[1.02] shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                        <span className="text-white text-lg">🎯</span>
                      </div>
                      <span className="text-slate-700 font-semibold text-lg">Smart Filtering System</span>
                    </div>
                    <div className="flex items-center glass-morphism rounded-2xl p-6 hover:bg-white/70 transition-all duration-500 transform hover:scale-[1.02] shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                        <span className="text-white text-lg">⭐</span>
                      </div>
                      <span className="text-slate-700 font-semibold text-lg">Real-time Availability</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* STEP 3 - Ultra-Professional Enhanced Layout */}
          <div className="flex flex-col lg:flex-row items-center mb-32 relative group">
            {/* Premium Dual-Image Container */}
            <div className="relative mb-16 lg:mb-0 lg:w-1/2 animate-slide-left">
              <div className="relative glass-morphism rounded-[3rem] p-12 shadow-2xl hover:shadow-3xl transition-all duration-1000 transform hover:scale-[1.02] hover:-rotate-1 group">
                {/* Professional Depth Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-rose-200/30 rounded-[3rem] transform translate-x-3 translate-y-3 -z-10 opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 to-slate-200/20 rounded-[3rem] transform translate-x-6 translate-y-6 -z-20 opacity-40"></div>
                
                {/* Professional Dual Image Container */}
                <div className="flex items-center justify-center space-x-8">
                  <div className="relative bg-gradient-to-br from-purple-600 to-rose-600 rounded-3xl p-6 shadow-2xl transform hover:scale-110 transition-transform duration-1000 group-hover:rotate-2">
                    <img 
                      src="/images/img_passenger_details_1.png" 
                      alt="Passenger Details" 
                      className="w-[180px] h-[320px] rounded-2xl filter drop-shadow-xl object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-3xl"></div>
                  </div>
                  <div className="relative bg-gradient-to-br from-rose-600 to-orange-600 rounded-3xl p-6 shadow-2xl transform hover:scale-110 transition-transform duration-1000 group-hover:-rotate-2" style={{ animationDelay: '0.2s' }}>
                    <img 
                      src="/images/img_payment_details_1.png" 
                      alt="Payment Details" 
                      className="w-[140px] h-[400px] rounded-2xl filter drop-shadow-xl object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent rounded-3xl"></div>
                  </div>
                </div>
                
                {/* Professional Security Badge */}
                <div className="absolute top-6 right-6 glass-morphism rounded-2xl px-4 py-3 animate-pulse shadow-lg">
                  <span className="text-purple-700 text-sm font-bold tracking-wide">🔒 SECURE</span>
                </div>
                
                {/* Professional Step Badge */}
                <div className="absolute -top-6 -left-6 bg-gradient-to-r from-purple-500 to-rose-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-2xl animate-bounce border-4 border-white" style={{ animationDelay: '2s' }}>
                  03
                </div>
              </div>
            </div>
            
            {/* Premium Content Container */}
            <div className="lg:w-1/2 lg:ml-20 animate-slide-right">
              <div className="glass-morphism-intense rounded-[2.5rem] p-12 shadow-2xl hover:shadow-3xl transition-all duration-1000 transform hover:scale-[1.02] group relative overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shimmer"></div>
                
                <div className="relative z-10">
                  {/* Professional Step Header */}
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-purple-500 to-rose-600 text-white px-8 py-4 rounded-3xl text-sm font-bold shadow-xl mr-6 animate-pulse" style={{ animationDelay: '2s' }}>
                      STEP 3
                    </div>
                    <div className="w-4 h-4 bg-rose-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '2s' }}></div>
                  </div>
                  
                  <h3 className="text-5xl font-black text-gradient mb-8 group-hover:scale-105 transition-transform duration-700 leading-tight">
                    Complete Your Booking
                  </h3>
                  
                  <p className="text-2xl text-slate-600 leading-relaxed mb-10 group-hover:text-slate-700 transition-colors duration-700">
                    Finalize your journey with our <span className="font-bold text-purple-600">secure checkout</span> process and <span className="font-bold text-rose-600">multiple payment options</span>.
                  </p>
                  
                  {/* Professional Features */}
                  <div className="space-y-6">
                    <div className="flex items-center glass-morphism rounded-2xl p-6 hover:bg-white/70 transition-all duration-500 transform hover:scale-[1.02] shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-rose-500 rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                        <span className="text-white text-lg">💺</span>
                      </div>
                      <span className="text-slate-700 font-semibold text-lg">Interactive Seat Selection</span>
                    </div>
                    <div className="flex items-center glass-morphism rounded-2xl p-6 hover:bg-white/70 transition-all duration-500 transform hover:scale-[1.02] shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                        <span className="text-white text-lg">💳</span>
                      </div>
                      <span className="text-slate-700 font-semibold text-lg">Secure Payment Gateway</span>
                    </div>
                    <div className="flex items-center glass-morphism rounded-2xl p-6 hover:bg-white/70 transition-all duration-500 transform hover:scale-[1.02] shadow-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                        <span className="text-white text-lg">📱</span>
                      </div>
                      <span className="text-slate-700 font-semibold text-lg">Instant Mobile Tickets</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* STEP 4 - Ultra-Professional Grand Finale */}
          <div className="flex flex-col lg:flex-row-reverse items-center mb-20 relative group">
            {/* Premium Celebration Container */}
            <div className="relative mb-16 lg:mb-0 lg:w-1/2 animate-slide-right">
              <div className="relative glass-morphism rounded-[3rem] p-12 shadow-2xl hover:shadow-3xl transition-all duration-1000 transform hover:scale-[1.02] hover:rotate-1 group">
                {/* Professional Depth Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100/30 to-amber-200/30 rounded-[3rem] transform translate-x-3 translate-y-3 -z-10 opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-slate-200/20 rounded-[3rem] transform translate-x-6 translate-y-6 -z-20 opacity-40"></div>
                
                {/* Enhanced Celebration Image Container */}
                <div className="relative bg-gradient-to-br from-rose-600 via-orange-600 to-amber-600 rounded-3xl w-[360px] h-[400px] mx-auto overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                  <img 
                    src="/images/img_coupletakingselfiewhiletravelingbytrain232149304471.png" 
                    alt="Enjoy Your Journey" 
                    className="w-full h-full object-cover filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-1000"
                  />
                  {/* Professional Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 via-transparent to-rose-500/20"></div>
                  {/* Success Badge */}
                  <div className="absolute top-6 left-6 glass-morphism rounded-2xl px-4 py-3 animate-pulse shadow-lg">
                    <span className="text-orange-700 text-sm font-bold tracking-wide">✨ JOURNEY</span>
                  </div>
                  {/* Professional Celebration Elements */}
                  <div className="absolute top-8 right-8 text-3xl animate-bounce filter drop-shadow-lg">🎉</div>
                  <div className="absolute bottom-8 left-8 text-2xl animate-pulse filter drop-shadow-lg" style={{ animationDelay: '1s' }}>⭐</div>
                </div>
                
                {/* Professional Step Badge */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-rose-500 to-orange-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-2xl animate-bounce border-4 border-white" style={{ animationDelay: '3s' }}>
                  04
                </div>
              </div>
            </div>
            
            {/* Premium Content Container */}
            <div className="lg:w-1/2 lg:mr-20 animate-slide-left">
              <div className="glass-morphism-intense rounded-[2.5rem] p-12 shadow-2xl hover:shadow-3xl transition-all duration-1000 transform hover:scale-[1.02] group relative overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shimmer"></div>
                
                <div className="relative z-10">
                  {/* Professional Step Header */}
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-rose-500 to-orange-600 text-white px-8 py-4 rounded-3xl text-sm font-bold shadow-xl mr-6 animate-pulse" style={{ animationDelay: '3s' }}>
                      STEP 4
                    </div>
                    <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '3s' }}></div>
                  </div>
                  
                  <h3 className="text-5xl font-black text-gradient mb-8 group-hover:scale-105 transition-transform duration-700 leading-tight">
                    Enjoy Your Premium Journey
                  </h3>
                  
                  <p className="text-2xl text-slate-600 leading-relaxed mb-12 group-hover:text-slate-700 transition-colors duration-700">
                    Experience luxury travel with our <span className="font-bold text-rose-600">world-class amenities</span> and <span className="font-bold text-orange-600">premium comfort</span> features.
                  </p>
                  
                  {/* Premium Features Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { icon: '❄️', feature: 'Full A/C & Climate Control', color: 'from-blue-500 to-cyan-500' },
                      { icon: '🛋️', feature: 'Luxury Reclining Seats', color: 'from-purple-500 to-violet-500' },
                      { icon: '📶', feature: 'Free High-Speed WiFi', color: 'from-emerald-500 to-teal-500' },
                      { icon: '🍿', feature: 'Complimentary Refreshments', color: 'from-orange-500 to-amber-500' },
                      { icon: '🎵', feature: 'Entertainment System', color: 'from-rose-500 to-pink-500' },
                      { icon: '🛡️', feature: '24/7 Safety Monitoring', color: 'from-slate-500 to-gray-500' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center glass-morphism rounded-2xl p-6 hover:bg-white/70 transition-all duration-500 transform hover:scale-[1.02] shadow-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mr-6 shadow-xl`}>
                          <span className="text-xl">{item.icon}</span>
                        </div>
                        <span className="text-slate-700 font-semibold text-lg">{item.feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Ultra-Professional Bottom CTA */}
        <div className="text-center mt-32">
          <div className="relative inline-block">
            <div className="glass-morphism-intense rounded-[3rem] px-20 py-16 shadow-2xl hover:shadow-3xl transition-all duration-1000 transform hover:scale-[1.02] group relative overflow-hidden">
              {/* Premium Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-shimmer"></div>
              
              <div className="relative z-10">
                <h4 className="text-4xl font-black text-gradient mb-6 tracking-tight">
                  Ready to Start Your Professional Journey?
                </h4>
                <p className="text-slate-600 text-xl mb-10 group-hover:text-slate-700 transition-colors duration-700 leading-relaxed">
                  Join thousands of satisfied travelers who trust our professional service
                </p>
                
                <button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white px-16 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20 relative overflow-hidden group">
                  <span className="relative z-10">Book Your Ticket Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSteps;