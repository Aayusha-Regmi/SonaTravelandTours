import React from 'react';

const AppPromotion = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-pink-500/25 rounded-full blur-3xl animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 right-1/3 w-56 h-56 bg-gradient-to-r from-orange-400/30 to-red-500/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-violet-400/15 to-fuchsia-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* 3D Floating App Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 backdrop-blur-xl rounded-2xl rotate-12 animate-bounce shadow-lg border border-white/20" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-r from-purple-500/50 to-pink-500/50 backdrop-blur-xl rounded-xl -rotate-12 animate-bounce shadow-lg border border-white/20" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/6 w-20 h-20 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-xl rounded-3xl rotate-45 animate-bounce shadow-lg border border-white/20" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-20 right-1/6 w-14 h-14 bg-gradient-to-r from-orange-500/40 to-red-500/40 backdrop-blur-xl rounded-2xl -rotate-24 animate-bounce shadow-lg border border-white/20" style={{animationDelay: '3.5s'}}></div>
      </div>

    

      <div className="relative container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content - Enhanced Glassmorphism */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 relative">
            {/* Glassmorphism Container */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-700 group">
              {/* Floating Badges */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-bounce">
                FREE DOWNLOAD
              </div>
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                NEW APP
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight group-hover:scale-105 transition-transform duration-500">
                Smart Travel Starts Here!
              </h2>
              
              <p className="text-xl lg:text-2xl font-semibold text-white/90 leading-relaxed mb-8 group-hover:text-white transition-colors duration-500">
                Experience seamless booking, exclusive offers, real-time updates, and 24/7 support. 
                <br />Download the <img 
                  src="/images/img_logo_with_name_png_1.png" 
                  alt="Sona Travel" 
                  className="inline-block h-[37px] mx-2 filter drop-shadow-lg hover:scale-110 transition-transform duration-300"
                /> app and make every journey smarter!
              </p>
                {/* Enhanced Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="#" className="group/btn relative block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/30 hover:bg-white/20 hover:scale-110 hover:rotate-2 transition-all duration-500 shadow-xl">
                    <img 
                      src="/images/img_70ic901408727_2.png" 
                      alt="App Store" 
                      className="h-16 filter drop-shadow-lg"
                    />
                  </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.sonatravel.android" target="_blank" rel="noopener noreferrer" className="group/btn relative block">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/30 hover:bg-white/20 hover:scale-110 hover:-rotate-2 transition-all duration-500 shadow-xl">
                    <img 
                      src="/images/img_70ic901408727_1.png" 
                      alt="Google Play" 
                      className="h-16 filter drop-shadow-lg"
                    />
                  </div>
                </a>
              </div>

              {/* App Features Showcase */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl mb-1">🎫</div>
                  <div className="text-sm text-white/80 font-medium">Easy Booking</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl mb-1">💰</div>
                  <div className="text-sm text-white/80 font-medium">Best Offers</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl mb-1">🔔</div>
                  <div className="text-sm text-white/80 font-medium">Live Updates</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl mb-1">🎧</div>
                  <div className="text-sm text-white/80 font-medium">24/7 Support</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Image - 3D Enhanced */}
          <div className="lg:w-1/2 relative">
            {/* 3D Glassmorphism Frame */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-700 group">
              {/* Floating Elements around Phone */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-green-400/60 to-emerald-500/60 backdrop-blur-xl rounded-full animate-bounce shadow-lg border border-white/30" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center justify-center h-full text-white text-xl">✓</div>
              </div>
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-blue-400/60 to-cyan-500/60 backdrop-blur-xl rounded-full animate-bounce shadow-lg border border-white/30" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center justify-center h-full text-white text-xl">⭐</div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-purple-400/60 to-pink-500/60 backdrop-blur-xl rounded-full animate-bounce shadow-lg border border-white/30" style={{animationDelay: '2.5s'}}>
                <div className="flex items-center justify-center h-full text-white text-xl">🚀</div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-r from-orange-400/60 to-red-500/60 backdrop-blur-xl rounded-full animate-bounce shadow-lg border border-white/30" style={{animationDelay: '3.5s'}}>
                <div className="flex items-center justify-center h-full text-white text-xl">📱</div>
              </div>

              <img 
                src="/images/img_iphone_15_pro.png" 
                alt="App Screenshot" 
                className="max-w-full h-auto mx-auto filter drop-shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700"
              />

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>

            {/* Floating Download Stats */}
            <div className="absolute top-4 -left-8 bg-white/15 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/20 shadow-lg animate-pulse">
              <div className="text-sm text-white/90 font-bold">1M+ Downloads</div>
              <div className="text-xs text-white/70">⭐⭐⭐⭐⭐ 4.8</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromotion;