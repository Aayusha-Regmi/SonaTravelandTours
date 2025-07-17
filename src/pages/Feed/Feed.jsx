import React, { useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import FloatingActionBar from '../../components/common/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';

const Feed = () => {
  const { isVisible, socialActions } = useSocialActions();
  
  useEffect(() => {
    // Load Facebook SDK with correct configuration
    const loadFacebookSDK = () => {
      // Add fb-root div if it doesn't exist
      if (!document.getElementById('fb-root')) {
        const fbRoot = document.createElement('div');
        fbRoot.id = 'fb-root';
        document.body.appendChild(fbRoot);
      }

      // Load Facebook SDK script
      if (!document.getElementById('facebook-jssdk')) {
        const script = document.createElement('script');
        script.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v23.0";
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        script.id = "facebook-jssdk";
        document.body.appendChild(script);
      }
    };

    loadFacebookSDK();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-[100px] min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Cosmic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Animated Gradient Orbs */}
          <div className="absolute top-20 left-[10%] w-96 h-96 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-[15%] w-80 h-80 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-[20%] w-72 h-72 bg-gradient-to-r from-emerald-400/20 via-teal-500/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          
          {/* Floating Geometric Shapes */}
          <div className="absolute top-40 left-[5%] w-24 h-24 bg-gradient-to-br from-cyan-400/40 to-blue-600/20 backdrop-blur-sm rounded-2xl border border-cyan-400/30 shadow-2xl transform rotate-12 animate-float-slow"></div>
          <div className="absolute top-60 right-[8%] w-20 h-20 bg-gradient-to-br from-purple-500/40 to-pink-600/20 backdrop-blur-sm rounded-full border border-purple-400/30 shadow-2xl animate-float-slow" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-60 left-[70%] w-16 h-16 bg-gradient-to-br from-emerald-400/40 to-teal-600/20 backdrop-blur-sm rounded-lg border border-emerald-400/30 shadow-2xl transform rotate-45 animate-float-slow" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative">
          <div className="max-w-7xl mx-auto">
            {/* Futuristic Glass Header */}
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-all duration-500"></div>
              <div className="relative backdrop-blur-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 flex items-center gap-4">
                    Latest Updates
                    <span className="inline-block w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping"></span>
                  </h1>
                  <p className="text-gray-300 text-xl mb-6">Stay connected with our latest news and cosmic adventures</p>
                  
                  {/* Holographic Divider */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
                  </div>
                </div>
                
                {/* Neon Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <div className="group text-center">
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      <div className="relative bg-gray-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-4 group-hover:border-cyan-400/50 transition-all duration-300">
                        <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">50+</div>
                      </div>
                    </div>
                    <div className="text-gray-400 font-medium">Daily Tours</div>
                  </div>
                  <div className="group text-center">
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4 group-hover:border-purple-400/50 transition-all duration-300">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">1000+</div>
                      </div>
                    </div>
                    <div className="text-gray-400 font-medium">Happy Customers</div>
                  </div>
                  <div className="group text-center">
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      <div className="relative bg-gray-900/50 backdrop-blur-sm border border-emerald-400/30 rounded-xl p-4 group-hover:border-emerald-400/50 transition-all duration-300">
                        <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">30+</div>
                      </div>
                    </div>
                    <div className="text-gray-400 font-medium">Destinations</div>
                  </div>
                  <div className="group text-center">
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      <div className="relative bg-gray-900/50 backdrop-blur-sm border border-orange-400/30 rounded-xl p-4 group-hover:border-orange-400/50 transition-all duration-300">
                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">24/7</div>
                      </div>
                    </div>
                    <div className="text-gray-400 font-medium">Support</div>
                  </div>
                </div>
              </div>
            </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {/* Facebook Updates Section */}
            <div className="relative flex flex-col items-center">
              {/* Facebook Section Header */}
              <div className="mb-4 px-2 w-full max-w-md">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 rounded-lg blur-sm"></div>
                      <div className="relative flex items-center gap-3 px-4 py-2 backdrop-blur-sm border border-cyan-400/30 rounded-lg">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                          Facebook Updates
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-3">
                      <div className="w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                      <div className="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Facebook Root Element */}
              <div id="fb-root"></div>
              
              {/* Centered Facebook Iframe Container */}
              <div className="flex justify-center w-full">
                <div className="w-full max-w-md mx-auto">
                  <div className="w-full h-[400px] sm:h-[500px] lg:h-[850px] relative border border-gray-700/30 rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsonatraveltours%2F&tabs=timeline&width=400&height=850&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
                      width="100%" 
                      height="100%" 
                      style={{border: 'none', overflow: 'hidden'}} 
                      scrolling="no" 
                      frameBorder="0" 
                      allowFullScreen={true} 
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Mobile Responsive Status Indicator */}
              <div className="mt-3 text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 rounded-lg blur-sm"></div>
                  <div className="relative px-3 py-2 backdrop-blur-sm border border-cyan-400/30 rounded-lg">
                    <p className="text-gray-300 text-xs sm:text-sm">
                      <span className="inline-flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        Live updates from our Facebook page
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Futuristic Travel Gallery Section */}
            <div className="space-y-4 sm:space-y-6">
              {/* Holographic Gallery Header */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-700"></div>
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-gray-900/80 rounded-2xl p-4 sm:p-6 border border-purple-400/30 shadow-2xl group-hover:border-purple-400/50 transition-all duration-700">
                  <div className="relative text-center">
                    {/* Floating Orbs - Hidden on small screens */}
                    <div className="hidden sm:block absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="hidden sm:block absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    
                    <div className="relative z-10">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl mb-3 sm:mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2 sm:mb-3">
                        Travel Memories
                      </h2>
                      <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 max-w-xs sm:max-w-md mx-auto px-4 sm:px-0">Discover breathtaking moments from our incredible cosmic journeys</p>
                      
                      {/* Animated Divider */}
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full animate-ping"></div>
                        <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cyberpunk Gallery Grid */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-lg"></div>
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 rounded-2xl p-4 sm:p-6 border border-gray-700/50 shadow-2xl">
                  <div className="space-y-4 sm:space-y-6">
                    
                    {/* Featured Holographic Image */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-700"></div>
                      <div className="relative overflow-hidden rounded-xl border-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-700 cursor-pointer">
                        <div className="relative h-48 sm:h-56 lg:h-64">
                          <img 
                            src="/images/IMG_1.JPG" 
                            alt="Featured Travel Moment" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = "/images/img_beautifullandscapetouristbustraveltransportbackground87582536524.png";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                          
                          {/* Holographic HUD Elements */}
                          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                              <span className="text-cyan-400 text-xs font-mono">SCAN_ACTIVE</span>
                            </div>
                          </div>
                          
                          {/* Floating Action Button */}
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-180 border border-cyan-400/30">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Neon Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      
                      {/* Cyberpunk Card 1 */}
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500"></div>
                        <div className="relative overflow-hidden rounded-lg border-2 border-emerald-400/30 group-hover:border-emerald-400/60 bg-gray-900/60 backdrop-blur-sm transition-all duration-500 cursor-pointer">
                          <div className="relative h-36 sm:h-40 lg:h-48">
                            <img 
                              src="/images/IMG_2.JPG" 
                              alt="Adventure Portal 2" 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = "/images/img_beautifullandscapetouristbustraveltransportbackground87582536524.png";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Holographic HUD */}
                            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="flex items-center gap-1">
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span className="text-emerald-400 text-xs font-mono hidden sm:inline">ADV_MODE</span>
                              </div>
                            </div>
                            
                            {/* Floating Icon */}
                            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-125 border border-emerald-400/30">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cyberpunk Card 2 */}
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500"></div>
                        <div className="relative overflow-hidden rounded-lg border-2 border-purple-400/30 group-hover:border-purple-400/60 bg-gray-900/60 backdrop-blur-sm transition-all duration-500 cursor-pointer">
                          <div className="relative h-36 sm:h-40 lg:h-48">
                            <img 
                              src="/images/IMG_3.JPG" 
                              alt="Cultural Matrix 3" 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = "/images/img_beautifullandscapetouristbustraveltransportbackground87582536524.png";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Holographic HUD */}
                            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="flex items-center gap-1">
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                                <span className="text-purple-400 text-xs font-mono hidden sm:inline">CULT_SYS</span>
                              </div>
                            </div>
                            
                            {/* Floating Icon */}
                            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-125 border border-purple-400/30">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cyberpunk Card 3 */}
                      <div className="group relative sm:col-span-2 lg:col-span-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500"></div>
                        <div className="relative overflow-hidden rounded-lg border-2 border-orange-400/30 group-hover:border-orange-400/60 bg-gray-900/60 backdrop-blur-sm transition-all duration-500 cursor-pointer">
                          <div className="relative h-36 sm:h-40 lg:h-48">
                            <img 
                              src="/images/IMG_4.jpg" 
                              alt="Solar Vista 4" 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = "/images/img_beautifullandscapetouristbustraveltransportbackground87582536524.png";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Holographic HUD */}
                            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="flex items-center gap-1">
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
                                <span className="text-orange-400 text-xs font-mono hidden sm:inline">SOLAR_ON</span>
                              </div>
                            </div>
                            
                            {/* Floating Icon */}
                            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-125 border border-orange-400/30">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  {/* Holographic Statistics Panel */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="text-center group">
                        <div className="relative mb-2 sm:mb-3">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                          <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-cyan-400/30">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">1000+</div>
                        <div className="text-gray-400 font-medium text-xs sm:text-sm">Captured Moments</div>
                      </div>
                      <div className="text-center group">
                        <div className="relative mb-2 sm:mb-3">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                          <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 border border-emerald-400/30">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-1">50+</div>
                        <div className="text-gray-400 font-medium text-xs sm:text-sm">Dream Destinations</div>
                      </div>
                      <div className="text-center group">
                        <div className="relative mb-2 sm:mb-3">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                          <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-purple-400/30">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-1">5000+</div>
                        <div className="text-gray-400 font-medium text-xs sm:text-sm">Happy Travelers</div>
                      </div>
                      <div className="text-center group">
                        <div className="relative mb-2 sm:mb-3">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                          <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 border border-yellow-400/30">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-1">5★</div>
                        <div className="text-gray-400 font-medium text-xs sm:text-sm">Premium Memories</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>

        {/* Cyberpunk Premium Features Marquee */}
        <div className="relative py-8 mt-12 bg-gradient-to-r from-gray-900/90 via-purple-900/80 to-gray-900/90 overflow-hidden border-y border-gray-700/50">
          {/* Dynamic Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEwMCwgMjU1LCAyMTgsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
          </div>

          {/* Holographic Header */}
          <div className="relative z-20 text-center mb-8 px-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              Premium Features
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full"></div>
            </div>
          </div>

          {/* Neon Marquee Container */}
          <div className="relative overflow-hidden w-full">
            {/* Side Gradient Masks */}
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
            
            {/* Continuous Holographic Marquee */}
            <div className="flex gap-6 animate-marquee-cyber">
              {/* ISO Certified */}
              <div className="feature-card-cyber flex-none w-64 group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative backdrop-blur-lg bg-gray-900/80 rounded-xl p-5 border border-emerald-400/30 group-hover:border-emerald-400/60 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-500/10 flex items-center justify-center border border-emerald-400/30">
                      <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-400 text-base mb-1">ISO Certified</h3>
                      <p className="text-gray-400 text-sm">Quality assured service matrix</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Airbag Safety */}
              <div className="feature-card-cyber flex-none w-64 group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative backdrop-blur-lg bg-gray-900/80 rounded-xl p-5 border border-blue-400/30 group-hover:border-blue-400/60 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/10 flex items-center justify-center border border-blue-400/30">
                      <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-400 text-base mb-1">Airbag Protected</h3>
                      <p className="text-gray-400 text-sm">Enhanced safety protocol</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* IR Camera */}
              <div className="feature-card-cyber flex-none w-64 group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative backdrop-blur-lg bg-gray-900/80 rounded-xl p-5 border border-purple-400/30 group-hover:border-purple-400/60 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-violet-500/10 flex items-center justify-center border border-purple-400/30">
                      <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-400 text-base mb-1">IR Camera</h3>
                      <p className="text-gray-400 text-sm">24/7 surveillance system</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* GPS Tracking */}
              <div className="feature-card-cyber flex-none w-64 group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative backdrop-blur-lg bg-gray-900/80 rounded-xl p-5 border border-red-400/30 group-hover:border-red-400/60 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/30 to-pink-500/10 flex items-center justify-center border border-red-400/30">
                      <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-400 text-base mb-1">GPS Tracking</h3>
                      <p className="text-gray-400 text-sm">Real-time location grid</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smart Navigation */}
              <div className="feature-card-cyber flex-none w-64 group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative backdrop-blur-lg bg-gray-900/80 rounded-xl p-5 border border-amber-400/30 group-hover:border-amber-400/60 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/30 to-yellow-500/10 flex items-center justify-center border border-amber-400/30">
                      <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-400 text-base mb-1">Smart Navigation</h3>
                      <p className="text-gray-400 text-sm">Route optimization AI</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Online Booking */}
              <div className="feature-card-cyber flex-none w-64 group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative backdrop-blur-lg bg-gray-900/80 rounded-xl p-5 border border-teal-400/30 group-hover:border-teal-400/60 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500/30 to-cyan-500/10 flex items-center justify-center border border-teal-400/30">
                      <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-teal-400 text-base mb-1">Online Booking</h3>
                      <p className="text-gray-400 text-sm">Secure reservation hub</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Duplicate for seamless loop */}
              <div className="feature-card-cyber flex-none w-64 group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative backdrop-blur-lg bg-gray-900/80 rounded-xl p-5 border border-emerald-400/30 group-hover:border-emerald-400/60 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-500/10 flex items-center justify-center border border-emerald-400/30">
                      <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-400 text-base mb-1">ISO Certified</h3>
                      <p className="text-gray-400 text-sm">Quality assured service matrix</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Cyberpunk Animations and 3D Effects */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        @keyframes marquee-cyber {
          0% { 
            transform: translateX(0);
          }
          100% { 
            transform: translateX(-100%);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-marquee-cyber {
          animation: marquee-cyber 45s linear infinite;
        }
        
        .feature-card-cyber {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        
        .feature-card-cyber:hover {
          transform: translateZ(30px) scale(1.05) rotateY(5deg);
          box-shadow: 
            0 20px 40px -10px rgba(0, 255, 255, 0.3),
            0 25px 50px -15px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        /* Holographic text effects */
        .text-hologram {
          background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff);
          background-size: 400% 400%;
          animation: hologram 3s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @keyframes hologram {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        /* Neon glow effects */
        .neon-border {
          box-shadow: 
            0 0 5px currentColor,
            0 0 10px currentColor,
            0 0 15px currentColor,
            0 0 20px currentColor;
        }
        
        /* Cyber grid overlay */
        .cyber-grid {
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        /* Glitch effect */
        @keyframes glitch {
          0%, 100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-2px);
          }
          40% {
            transform: translateX(2px);
          }
          60% {
            transform: translateX(-1px);
          }
          80% {
            transform: translateX(1px);
          }
        }
        
        .glitch-effect:hover {
          animation: glitch 0.5s ease-in-out;
        }
        
        /* Enhanced backdrop blur */
        .backdrop-blur-cyber {
          backdrop-filter: blur(16px) saturate(180%);
        }
        
        /* Pulse animation for accents */
        @keyframes pulse-cyber {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        .animate-pulse-cyber {
          animation: pulse-cyber 2s ease-in-out infinite;
        }
      `}</style>
      <Footer />
      <FloatingActionBar
        isVisible={isVisible}
        socialActions={socialActions}
      />
    </>
  );
};

export default Feed;