import React from 'react';

const AppPromotion = () => {
  return (
    <section className="relative py-4 lg:py-6 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 min-h-[35vh] lg:min-h-[40vh]">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Primary Floating Orbs */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-400/15 rounded-full blur-3xl animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/6 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/25 to-red-400/25 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
        
        {/* Secondary Accent Orbs */}
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-violet-500/10 to-fuchsia-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-56 h-56 bg-gradient-to-r from-sky-500/15 to-indigo-400/15 rounded-full blur-2xl animate-bounce" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-1/5 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-cyan-400/30 backdrop-blur-2xl rounded-3xl rotate-12 animate-bounce shadow-2xl border border-white/20" style={{animationDelay: '0.5s'}}>
          <div className="flex items-center justify-center h-full text-white text-2xl"></div>
        </div>
        <div className="absolute top-1/3 right-1/5 w-16 h-16 bg-gradient-to-br from-purple-500/40 to-pink-400/40 backdrop-blur-2xl rounded-2xl -rotate-12 animate-bounce shadow-2xl border border-white/20" style={{animationDelay: '1.5s'}}>
          <div className="flex items-center justify-center h-full text-white text-xl"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/8 w-24 h-24 bg-gradient-to-br from-emerald-500/25 to-teal-400/25 backdrop-blur-2xl rounded-full rotate-45 animate-bounce shadow-2xl border border-white/20" style={{animationDelay: '2.5s'}}>
          <div className="flex items-center justify-center h-full text-white text-2xl -rotate-45"></div>
        </div>
        <div className="absolute bottom-24 right-1/8 w-18 h-18 bg-gradient-to-br from-orange-500/35 to-red-400/35 backdrop-blur-2xl rounded-2xl -rotate-24 animate-bounce shadow-2xl border border-white/20" style={{animationDelay: '3.5s'}}>
          <div className="flex items-center justify-center h-full text-white text-xl"></div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 z-10">
        {/* Premium Marquee Text Strip */}
        <div className="mb-6 lg:mb-8 overflow-hidden bg-gradient-to-r from-transparent via-white/5 to-transparent backdrop-blur-sm rounded-2xl border border-white/10">
          <div className="py-3 relative overflow-hidden">
            <div className="flex gap-12 items-center text-white/80 font-semibold whitespace-nowrap animate-marquee hover:pause-animation">
              <span className="flex items-center gap-2">✨ Premium Travel Experience</span>
              <span className="flex items-center gap-2">🎯 Instant Booking</span>
              <span className="flex items-center gap-2">💰 Best Price Guarantee</span>
              <span className="flex items-center gap-2">🔔 Real-time Updates</span>
              <span className="flex items-center gap-2">🛡️ Secure Payments</span>
              <span className="flex items-center gap-2">🎧 24/7 Support</span>
              <span className="flex items-center gap-2">🏆 #1 Travel App</span>
              <span className="flex items-center gap-2">⭐ 4.9 Star Rating</span>
              <span className="flex items-center gap-2">📱 1.5M+ Downloads</span>
              <span className="flex items-center gap-2">🌍 50+ Cities</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {/* Card 1 - Travel Smarter */}
          <div className="relative group md:col-span-2 lg:col-span-1">
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-[1rem] sm:rounded-[1.5rem] lg:rounded-[2rem] p-4 sm:p-6 lg:p-8 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.3)] hover:scale-[1.02] transition-all duration-500 group overflow-visible h-full">
              {/* Floating Badges */}
              <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 bg-gradient-to-br from-emerald-400 to-green-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold shadow-xl animate-bounce border border-white/20 z-20">
                <span className="flex items-center gap-1">
                  <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white rounded-full animate-pulse"></span>
                  FREE
                </span>
              </div>
              <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-gradient-to-br from-orange-400 to-red-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold shadow-xl animate-pulse border border-white/20 z-20">
                ✨ PREMIUM
              </div>

              {/* Heading */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight group-hover:scale-105 transition-transform duration-500">
                  Travel Smarter
                </h2>
                <div className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-2 sm:mb-3"></div>
                <p className="text-xs sm:text-sm text-white/70 font-medium">Your journey begins with a tap</p>
              </div>
              
              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg font-medium text-white/90 leading-relaxed mb-4 sm:mb-6 group-hover:text-white transition-colors duration-500">
                Experience <span className="text-blue-400 font-bold">seamless booking</span>, 
                <span className="text-purple-400 font-bold"> exclusive offers</span>, and 
                <span className="text-cyan-400 font-bold"> real-time updates</span>.
                <br className="hidden sm:block" />
                <span className="text-emerald-400 font-bold">Download</span> the 
                <img 
                  src="/images/img_logo_with_name_png_1.png" 
                  alt="Sona Travel" 
                  className="inline-block h-[20px] sm:h-[25px] lg:h-[30px] mx-1 sm:mx-2 filter drop-shadow-xl hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/sona travel logo.png";
                  }}
                /> 
                app and <span className="text-orange-400 font-bold">transform every journey!</span>
              </p>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                <a href="#" className="group/btn relative flex-1 transform hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl blur-lg opacity-50 group-hover/btn:opacity-80 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl">
                    <img 
                      src="/images/img_70ic901408727_2.png" 
                      alt="App Store" 
                      className="h-8 sm:h-10 lg:h-12 w-full object-contain filter drop-shadow-lg"
                    />
                  </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.sonatravel.android" target="_blank" rel="noopener noreferrer" className="group/btn relative flex-1 transform hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg sm:rounded-xl blur-lg opacity-50 group-hover/btn:opacity-80 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl">
                    <img 
                      src="/images/img_70ic901408727_1.png" 
                      alt="Google Play" 
                      className="h-8 sm:h-10 lg:h-12 w-full object-contain filter drop-shadow-lg"
                    />
                  </div>
                </a>
              </div>

              {/* App Features Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/10 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 hover:scale-105 transition-all duration-300 group/feature">
                  <div className="text-lg sm:text-2xl mb-1 sm:mb-2 group-hover/feature:scale-110 transition-transform duration-300">🎫</div>
                  <div className="text-[10px] sm:text-xs text-white/90 font-semibold">Instant Booking</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/10 hover:bg-gradient-to-br hover:from-emerald-500/20 hover:to-teal-500/20 hover:scale-105 transition-all duration-300 group/feature">
                  <div className="text-lg sm:text-2xl mb-1 sm:mb-2 group-hover/feature:scale-110 transition-transform duration-300">💰</div>
                  <div className="text-[10px] sm:text-xs text-white/90 font-semibold">Best Prices</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/10 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 hover:scale-105 transition-all duration-300 group/feature">
                  <div className="text-lg sm:text-2xl mb-1 sm:mb-2 group-hover/feature:scale-110 transition-transform duration-300">🔔</div>
                  <div className="text-[10px] sm:text-xs text-white/90 font-semibold">Live Tracking</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/10 hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-red-500/20 hover:scale-105 transition-all duration-300 group/feature">
                  <div className="text-lg sm:text-2xl mb-1 sm:mb-2 group-hover/feature:scale-110 transition-transform duration-300">🎧</div>
                  <div className="text-[10px] sm:text-xs text-white/90 font-semibold">24/7 Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - iPhone Showcase */}
          <div className="relative group">
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-[1rem] sm:rounded-[1.5rem] lg:rounded-[2rem] p-3 sm:p-4 md:p-6 lg:p-8 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.3)] hover:scale-[1.02] transition-all duration-500 group h-full flex flex-col justify-center items-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
              {/* Phone Image Container */}
              <div className="relative flex-1 flex items-center justify-center w-full max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="/images/img_iphone_15_pro.png" 
                  alt="Sona Travel App" 
                  className="relative w-full h-auto filter drop-shadow-2xl group-hover:scale-105 transition-all duration-500 z-10"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/img_esewazoneofficebayalbasgoogleplayiphoneiphoneremovebgpreview_1.png";
                  }}
                />
              </div>
              
              {/* Mobile Optimized Top Left Stats */}
              <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 border border-white/30 shadow-xl animate-pulse z-20 max-w-[70px] sm:max-w-[90px] lg:max-w-none">
                <div className="text-[10px] sm:text-xs lg:text-sm text-white/95 font-bold leading-tight">1.5M+</div>
                <div className="text-[8px] sm:text-[10px] lg:text-xs text-white/80 font-medium">Downloads</div>
                <div className="flex items-center justify-center mt-0.5">
                  <div className="flex text-yellow-400 text-[8px] sm:text-[10px] lg:text-sm">⭐⭐⭐⭐⭐</div>
                </div>
              </div>

              {/* Mobile Optimized Top Right Badge */}
              <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-gradient-to-br from-green-500/25 to-emerald-500/15 backdrop-blur-xl rounded-lg sm:rounded-xl px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 border border-white/30 shadow-xl z-20 max-w-[60px] sm:max-w-[80px] lg:max-w-none">
                <div className="text-[10px] sm:text-xs lg:text-sm text-white/95 font-bold text-center leading-tight">#1 App</div>
                <div className="text-[8px] sm:text-[10px] lg:text-xs text-white/80 text-center mt-0.5 font-medium">4.9 Rating</div>
              </div>

              {/* Mobile Optimized Bottom Stats */}
              <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-2 sm:left-3 lg:left-4 right-2 sm:right-3 lg:right-4 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-white/30 shadow-xl">
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 lg:gap-3 text-center">
                  <div className="bg-white/10 rounded-md sm:rounded-lg lg:rounded-xl p-1 sm:p-1.5 lg:p-3 border border-white/20">
                    <div className="text-blue-400 font-bold text-xs sm:text-sm lg:text-lg">50+</div>
                    <div className="text-white/80 text-[8px] sm:text-[10px] lg:text-xs font-medium">Cities</div>
                  </div>
                  <div className="bg-white/10 rounded-md sm:rounded-lg lg:rounded-xl p-1 sm:p-1.5 lg:p-3 border border-white/20">
                    <div className="text-purple-400 font-bold text-xs sm:text-sm lg:text-lg">24/7</div>
                    <div className="text-white/80 text-[8px] sm:text-[10px] lg:text-xs font-medium">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - QR Code Download */}
          <div className="relative group">
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-[1rem] sm:rounded-[1.5rem] lg:rounded-[2rem] p-4 sm:p-6 lg:p-8 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-all duration-500 group/qr h-full flex flex-col justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
              {/* QR Code Header */}
              <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  Quick Download
                </h3>
                <div className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mx-auto mb-2 sm:mb-3"></div>
                <p className="text-xs sm:text-sm text-white/70 font-medium">Scan with your camera</p>
              </div>
              
              {/* QR Code Container - Centered and Responsive */}
              <div className="flex-1 flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
                <div className="relative transform transition-all duration-500 hover:scale-110">
                  {/* Glowing Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-2xl sm:rounded-3xl blur-xl scale-125 opacity-0 group-hover/qr:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* QR Code Frame */}
                  <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 border border-white/20 shadow-2xl">
                    {/* Top Label */}
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold shadow-xl animate-bounce z-10">
                      📱 SCAN
                    </div>
                    
                    {/* QR Code */}
                    <div className="relative">
                      <img 
                        src="/images/QR Code Play Store.png" 
                        alt="Download App QR Code" 
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-xl sm:rounded-2xl shadow-2xl filter drop-shadow-xl group-hover/qr:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Corner Decorations */}
                      <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6 border-l-2 sm:border-l-3 border-t-2 sm:border-t-3 border-emerald-400 rounded-tl-lg sm:rounded-tl-xl"></div>
                      <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6 border-r-2 sm:border-r-3 border-t-2 sm:border-t-3 border-emerald-400 rounded-tr-lg sm:rounded-tr-xl"></div>
                      <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6 border-l-2 sm:border-l-3 border-b-2 sm:border-b-3 border-emerald-400 rounded-bl-lg sm:rounded-bl-xl"></div>
                      <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6 border-r-2 sm:border-r-3 border-b-2 sm:border-b-3 border-emerald-400 rounded-br-lg sm:rounded-br-xl"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Instructions - Mobile Optimized */}
              <div className="text-center bg-gradient-to-r from-white/5 to-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <span className="text-emerald-400 text-sm sm:text-lg">📲</span>
                  <span className="text-white font-semibold text-xs sm:text-sm">Open Camera App</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <span className="text-blue-400 text-sm sm:text-lg">🎯</span>
                  <span className="text-white font-semibold text-xs sm:text-sm">Point at QR Code</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <span className="text-purple-400 text-sm sm:text-lg">⚡</span>
                  <span className="text-white font-semibold text-xs sm:text-sm">Instant Download</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom CTA Section - Full Width */}
        <div className="mt-8 lg:mt-12">
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
              {/* Left - Main CTA */}
              <div className="lg:col-span-2">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                  Join millions of happy travelers
                </h3>
                <p className="text-white/80 text-sm lg:text-base">
                  Experience the future of travel booking today
                </p>
              </div>
              
              {/* Right - Stats Grid */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-emerald-400 font-bold text-lg">1.5M+</div>
                  <div className="text-white/70 text-xs">Users</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-blue-400 font-bold text-lg">50+</div>
                  <div className="text-white/70 text-xs">Cities</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-purple-400 font-bold text-lg">24/7</div>
                  <div className="text-white/70 text-xs">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromotion;