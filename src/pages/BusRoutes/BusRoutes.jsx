import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const BusRoutes = () => {
  return (    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/80 to-indigo-100/60 relative overflow-hidden">
        {/* Ultra Premium Background with Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main ultra-large gradient orbs */}
          <div className="absolute -top-96 -right-96 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/20 via-cyan-400/15 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-96 -left-96 w-[800px] h-[800px] bg-gradient-to-tr from-purple-400/20 via-pink-400/15 to-violet-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          
          {/* Medium floating orbs */}
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-emerald-400/12 to-teal-400/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-orange-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-2/3 right-1/5 w-80 h-80 bg-gradient-to-r from-pink-400/8 to-rose-400/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
          
          {/* Premium mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/20"></div>
          
          {/* Enhanced geometric pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.15) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 60px 60px, 80px 80px'
          }}></div>
          
          {/* Floating animated particles with variety */}
          <div className="absolute top-20 left-20 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-40 right-32 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute top-1/2 left-10 w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '3.2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.8s' }}></div>
          
          {/* Subtle moving waves */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-200/20 to-transparent transform -skew-y-1 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/3 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-200/20 to-transparent transform skew-y-1 animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">          {/* Ultra Premium Header Section */}
          <div className="text-center mb-24">
            {/* Ultra elegant animated badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-white/70 via-blue-50/90 to-white/70 backdrop-blur-xl border border-white/50 shadow-2xl px-10 py-4 rounded-full text-sm font-bold mb-10 hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
              <div className="relative">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mr-4 animate-pulse"></span>
                <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mr-4 blur-sm animate-pulse opacity-70"></div>
              </div>
              <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent font-black tracking-wider group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300">
                OUR EXTENSIVE PREMIUM NETWORK
              </span>
              <div className="ml-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* Ultra premium main heading with enhanced typography */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-12 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent drop-shadow-lg">
                Bus Routes &
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent drop-shadow-2xl animate-pulse" style={{ animationDuration: '3s' }}>
                Network Coverage
              </span>
            </h1>
            
            {/* Enhanced subtitle with better typography */}
            <p className="text-2xl md:text-3xl text-gray-700 max-w-5xl mx-auto leading-relaxed font-light mb-12">
              Discover our <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">extensive network</span> of bus routes connecting major cities across Nepal. 
              <br className="hidden md:block" />
              Experience <span className="font-bold text-gray-900">comfortable and reliable transportation</span> with Sona Travel & Tours.
            </p>
            
            {/* Premium trust indicators with enhanced design */}
            <div className="flex flex-wrap justify-center items-center gap-10 mt-16">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-4 bg-white/80 backdrop-blur-xl border border-white/50 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-green-600">50+</div>
                    <div className="text-gray-700 font-semibold">Cities Connected</div>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-4 bg-white/80 backdrop-blur-xl border border-white/50 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-blue-600">200+</div>
                    <div className="text-gray-700 font-semibold">Daily Departures</div>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-4 bg-white/80 backdrop-blur-xl border border-white/50 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-purple-600">24/7</div>
                    <div className="text-gray-700 font-semibold">Premium Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* Ultra Premium Video Section with Supreme Glassmorphism */}
          <div className="mb-32">
            <div className="max-w-8xl mx-auto">
              <div className="relative group">
                {/* Supreme main container with ultra-enhanced glassmorphism */}
                <div className="relative backdrop-blur-3xl bg-gradient-to-br from-white/60 via-white/40 to-white/20 border-2 border-white/60 rounded-[3rem] p-16 shadow-3xl hover:shadow-4xl transition-all duration-1000 hover:scale-[1.01] hover:bg-gradient-to-br hover:from-white/70 hover:via-white/50 hover:to-white/30 group-hover:border-white/80">
                  {/* Supreme glassmorphism overlay effects with enhanced depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-purple-500/12 to-pink-500/15 rounded-[3rem] blur-3xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 via-transparent to-violet-500/10 rounded-[3rem]"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-[3rem]"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30 rounded-[3rem]"></div>
                  
                  {/* Ultra premium animated gradient orbs with enhanced effects */}
                  <div className="absolute -top-60 -left-60 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/40 via-cyan-400/30 to-indigo-400/40 rounded-full blur-3xl animate-pulse opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>
                  <div className="absolute -bottom-60 -right-60 w-[600px] h-[600px] bg-gradient-to-r from-pink-400/40 via-purple-400/30 to-violet-400/40 rounded-full blur-3xl animate-pulse opacity-70 group-hover:opacity-90 transition-opacity duration-700" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-400/25 via-blue-400/20 to-cyan-400/25 rounded-full blur-3xl animate-pulse opacity-50 group-hover:opacity-70 transition-opacity duration-700" style={{ animationDelay: '3s' }}></div>
                  
                  {/* Floating crystal-like elements */}
                  <div className="absolute top-20 left-20 w-8 h-8 bg-gradient-to-r from-blue-400/60 to-cyan-400/60 rounded-lg rotate-45 animate-pulse blur-sm"></div>
                  <div className="absolute bottom-20 right-20 w-6 h-6 bg-gradient-to-r from-purple-400/60 to-pink-400/60 rounded-lg rotate-12 animate-pulse blur-sm" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-gradient-to-r from-indigo-400/60 to-blue-400/60 rounded-full animate-pulse blur-sm" style={{ animationDelay: '2s' }}></div>
                  
                  <div className="relative z-30">
                    <div className="text-center mb-16">
                      <div className="inline-flex items-center bg-gradient-to-r from-white/90 via-red-50/90 to-white/90 backdrop-blur-xl border-2 border-white/60 shadow-2xl px-12 py-6 rounded-3xl text-lg font-black mb-12 hover:shadow-3xl transition-all duration-500 hover:scale-105 group-hover:border-red-200/80">
                        <div className="relative mr-4">
                          <span className="w-4 h-4 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-full animate-pulse flex"></span>
                          <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-red-400 via-pink-400 to-red-500 rounded-full blur-md animate-pulse opacity-70"></div>
                        </div>
                        <span className="bg-gradient-to-r from-red-600 via-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent tracking-wider">
                          ● LIVE • FEATURED JOURNEY VIDEO • PREMIUM EXPERIENCE
                        </span>
                        <div className="ml-4 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5v10l6-5-6-5z"/>
                          </svg>
                        </div>
                      </div>
                      
                      <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight tracking-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
                          Journey Through Nepal
                        </span>
                      </h2>
                      <p className="text-gray-800 text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed font-light">
                        Experience the <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">scenic beauty of Nepal</span> as our premium buses traverse through 
                        <br className="hidden lg:block" />
                        <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">majestic mountains, serene valleys,</span> and vibrant cities
                      </p>
                    </div>
                    
                    {/* Ultra Premium YouTube Video Embed with Supreme styling */}
                    <div className="relative group/video">
                      {/* Animated rainbow gradient border with enhanced glow */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-[2.5rem] blur-2xl opacity-70 group-hover/video:opacity-90 transition-opacity duration-700 animate-pulse" style={{ animationDuration: '4s' }}></div>
                      
                      <div className="relative bg-gradient-to-br from-white/50 to-white/20 p-6 rounded-[2.5rem] backdrop-blur-xl border-2 border-white/60 shadow-3xl group-hover/video:shadow-4xl transition-all duration-500">
                        <div className="relative w-full overflow-hidden rounded-[2rem] shadow-3xl" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-[2rem]"
                            src="https://www.youtube.com/embed/3HtnJHP0sRI?si=jLIEqPtu0Co3k_rP&autoplay=1&loop=1&mute=1&playlist=3HtnJHP0sRI&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&quality=hd1080&cc_load_policy=1&hl=en&cc_lang_pref=en"
                            title="Sona Travel & Tours - Premium Bus Routes Network Journey Across Nepal | Ultra HD Experience"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen="true"
                          ></iframe>
                          
                          {/* Premium video overlay with enhanced gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent via-transparent to-white/10 rounded-[2rem] pointer-events-none"></div>
                          
                          {/* Floating play indicator */}
                          <div className="absolute top-6 left-6 bg-red-500/20 backdrop-blur-sm border border-red-300/50 px-4 py-2 rounded-full flex items-center space-x-2 pointer-events-none">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-white text-sm font-semibold">LIVE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Supreme video description with ultra-premium glassmorphism */}
                    <div className="mt-12 backdrop-blur-3xl bg-gradient-to-r from-white/50 via-white/40 to-white/50 border-2 border-white/60 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-gradient-to-r hover:from-white/60 hover:via-white/50 hover:to-white/60">
                      <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
                        <div className="text-center xl:text-left">
                          <h3 className="text-3xl font-black text-gray-900 mb-4">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Watch Our Premium Fleet in Action</span>
                          </h3>
                          <p className="text-gray-700 text-xl leading-relaxed">
                            Discover why <span className="font-bold text-gray-900">thousands of travelers</span> choose Sona Travel & Tours for their journey across Nepal
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-6">
                          <div className="flex items-center space-x-3 bg-white/40 backdrop-blur-xl px-6 py-3 rounded-2xl border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold text-gray-700">Live Coverage</span>
                          </div>
                          <div className="flex items-center space-x-3 bg-white/40 backdrop-blur-xl px-6 py-3 rounded-2xl border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-bold text-gray-700">Ultra HD 4K</span>
                          </div>
                          <div className="flex items-center space-x-3 bg-white/40 backdrop-blur-xl px-6 py-3 rounded-2xl border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-bold text-gray-700">Premium Quality</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* Premium Unified Service Overview Card */}
          <div className="mb-32">
            <div className="relative group">
              {/* Ultra Premium Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/15 via-pink-500/15 to-indigo-500/20 rounded-[4rem] blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
              
              <div className="relative backdrop-blur-3xl bg-gradient-to-br from-white/85 via-white/75 to-white/70 border-2 border-white/60 rounded-[4rem] p-16 shadow-3xl hover:shadow-4xl transition-all duration-700 hover:scale-[1.01] overflow-hidden">
                {/* Floating Elements */}
                <div className="absolute top-20 left-20 w-6 h-6 bg-gradient-to-r from-blue-400/60 to-cyan-400/60 rounded-full animate-pulse blur-sm"></div>
                <div className="absolute bottom-20 right-20 w-4 h-4 bg-gradient-to-r from-purple-400/60 to-pink-400/60 rounded-full animate-pulse blur-sm" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-gradient-to-r from-green-400/60 to-emerald-400/60 rounded-full animate-pulse blur-sm" style={{ animationDelay: '2s' }}></div>
                
                <div className="relative z-10">
                  {/* Header Section */}
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center bg-gradient-to-r from-white/90 via-blue-50/90 to-white/90 backdrop-blur-xl border-2 border-white/60 shadow-2xl px-12 py-6 rounded-full text-lg font-black mb-10 hover:shadow-3xl transition-all duration-500 hover:scale-105">
                      <div className="relative mr-4">
                        <span className="w-4 h-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse flex"></span>
                        <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-md animate-pulse opacity-70"></div>
                      </div>
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wider">
                        COMPLETE SERVICE OVERVIEW
                      </span>
                      <div className="ml-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                      <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent drop-shadow-lg">
                        Our Premium
                      </span>
                      <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Service Experience
                      </span>
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
                      Discover comprehensive travel solutions with <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">industry-leading services</span> and 
                      <span className="font-bold text-gray-900"> unmatched coverage</span> across Nepal
                    </p>
                  </div>
                    {/* Main Content Grid - Equal Height Cards */}
                  <div className="grid lg:grid-cols-3 gap-12">
                    {/* Popular Routes Section */}
                    <div className="group relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-indigo-500/15 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/60 to-white/40 border-2 border-white/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 h-full flex flex-col">
                        <div className="text-center mb-8">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">Popular Routes</h3>
                        </div>
                        
                        <div className="space-y-3 flex-grow">
                          <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 rounded-xl border border-blue-100/40 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 transition-all duration-300">
                            <span className="text-gray-800 font-semibold text-sm">Kathmandu - Pokhara</span>
                            <span className="text-blue-600 font-bold bg-blue-100/80 px-2 py-1 rounded-lg text-xs">6-7 hrs</span>
                          </div>
                          <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 rounded-xl border border-blue-100/40 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 transition-all duration-300">
                            <span className="text-gray-800 font-semibold text-sm">Kathmandu - Chitwan</span>
                            <span className="text-blue-600 font-bold bg-blue-100/80 px-2 py-1 rounded-lg text-xs">4-5 hrs</span>
                          </div>
                          <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 rounded-xl border border-blue-100/40 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 transition-all duration-300">
                            <span className="text-gray-800 font-semibold text-sm">Kathmandu - Butwal</span>
                            <span className="text-blue-600 font-bold bg-blue-100/80 px-2 py-1 rounded-lg text-xs">7-8 hrs</span>
                          </div>
                          <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 rounded-xl border border-blue-100/40 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 transition-all duration-300">
                            <span className="text-gray-800 font-semibold text-sm">Pokhara - Chitwan</span>
                            <span className="text-blue-600 font-bold bg-blue-100/80 px-2 py-1 rounded-lg text-xs">3-4 hrs</span>
                          </div>
                          <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 rounded-xl border border-blue-100/40 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 transition-all duration-300">
                            <span className="text-gray-800 font-semibold text-sm">Kathmandu - Birgunj</span>
                            <span className="text-blue-600 font-bold bg-blue-100/80 px-2 py-1 rounded-lg text-xs">5-6 hrs</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Service Features Section */}
                    <div className="group relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 to-emerald-500/15 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/60 to-white/40 border-2 border-white/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 h-full flex flex-col">
                        <div className="text-center mb-8">
                          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">Premium Features</h3>
                        </div>
                        
                        <div className="space-y-3 flex-grow">
                          <div className="flex items-center py-3 px-4 bg-gradient-to-r from-green-50/60 to-emerald-50/60 rounded-xl border border-green-100/40 hover:bg-gradient-to-r hover:from-green-50/80 hover:to-emerald-50/80 transition-all duration-300">
                            <div className="w-8 h-8 bg-green-100/80 rounded-lg flex items-center justify-center mr-3 text-lg">🚌</div>
                            <span className="text-gray-800 font-semibold text-sm">Modern AC Buses</span>
                          </div>
                          <div className="flex items-center py-3 px-4 bg-gradient-to-r from-green-50/60 to-emerald-50/60 rounded-xl border border-green-100/40 hover:bg-gradient-to-r hover:from-green-50/80 hover:to-emerald-50/80 transition-all duration-300">
                            <div className="w-8 h-8 bg-green-100/80 rounded-lg flex items-center justify-center mr-3 text-lg">📍</div>
                            <span className="text-gray-800 font-semibold text-sm">GPS Tracking</span>
                          </div>
                          <div className="flex items-center py-3 px-4 bg-gradient-to-r from-green-50/60 to-emerald-50/60 rounded-xl border border-green-100/40 hover:bg-gradient-to-r hover:from-green-50/80 hover:to-emerald-50/80 transition-all duration-300">
                            <div className="w-8 h-8 bg-green-100/80 rounded-lg flex items-center justify-center mr-3 text-lg">🎵</div>
                            <span className="text-gray-800 font-semibold text-sm">Entertainment System</span>
                          </div>
                          <div className="flex items-center py-3 px-4 bg-gradient-to-r from-green-50/60 to-emerald-50/60 rounded-xl border border-green-100/40 hover:bg-gradient-to-r hover:from-green-50/80 hover:to-emerald-50/80 transition-all duration-300">
                            <div className="w-8 h-8 bg-green-100/80 rounded-lg flex items-center justify-center mr-3 text-lg">💺</div>
                            <span className="text-gray-800 font-semibold text-sm">Sofa Seat</span>
                          </div>
                          <div className="flex items-center py-3 px-4 bg-gradient-to-r from-green-50/60 to-emerald-50/60 rounded-xl border border-green-100/40 hover:bg-gradient-to-r hover:from-green-50/80 hover:to-emerald-50/80 transition-all duration-300">
                            <div className="w-8 h-8 bg-green-100/80 rounded-lg flex items-center justify-center mr-3 text-lg">🛡️</div>
                            <span className="text-gray-800 font-semibold text-sm">Safety First</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Coverage Statistics Section */}
                    <div className="group relative h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/60 to-white/40 border-2 border-white/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 h-full flex flex-col">
                        <div className="text-center mb-8">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Network Coverage</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 flex-grow">
                          <div className="text-center p-3 bg-gradient-to-br from-purple-50/60 to-pink-50/60 rounded-xl border border-purple-100/40 hover:bg-gradient-to-br hover:from-purple-50/80 hover:to-pink-50/80 transition-all duration-300 flex flex-col justify-center">
                            <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">50+</div>
                            <div className="text-gray-700 font-semibold text-xs">Cities Connected</div>
                          </div>
                          <div className="text-center p-3 bg-gradient-to-br from-purple-50/60 to-pink-50/60 rounded-xl border border-purple-100/40 hover:bg-gradient-to-br hover:from-purple-50/80 hover:to-pink-50/80 transition-all duration-300 flex flex-col justify-center">
                            <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">200+</div>
                            <div className="text-gray-700 font-semibold text-xs">Daily Departures</div>
                          </div>
                          <div className="text-center p-3 bg-gradient-to-br from-purple-50/60 to-pink-50/60 rounded-xl border border-purple-100/40 hover:bg-gradient-to-br hover:from-purple-50/80 hover:to-pink-50/80 transition-all duration-300 flex flex-col justify-center">
                            <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">24/7</div>
                            <div className="text-gray-700 font-semibold text-xs">Customer Support</div>
                          </div>
                          <div className="text-center p-3 bg-gradient-to-br from-purple-50/60 to-pink-50/60 rounded-xl border border-purple-100/40 hover:bg-gradient-to-br hover:from-purple-50/80 hover:to-pink-50/80 transition-all duration-300 flex flex-col justify-center">
                            <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">99%</div>
                            <div className="text-gray-700 font-semibold text-xs">On-Time Performance</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Innovation Showcase Section */}
          <div className="mb-32">
            <div className="relative group">
              {/* Dark Premium Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-black/95 rounded-[4rem] blur-xl opacity-90"></div>
              
              <div className="relative backdrop-blur-3xl bg-gradient-to-br from-gray-900/90 via-slate-900/85 to-black/90 border-2 border-white/20 rounded-[4rem] p-20 shadow-4xl overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden rounded-[4rem]">
                  <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}></div>
                
                <div className="relative z-10 text-center">
                  {/* Header Section */}
                  <div className="mb-16">
                    <div className="inline-flex items-center bg-gradient-to-r from-white/15 via-blue-100/20 to-white/15 backdrop-blur-xl border border-white/25 shadow-2xl px-10 py-5 rounded-full text-lg font-bold mb-10 hover:shadow-3xl transition-all duration-500 hover:scale-105">
                      <div className="relative mr-4">
                        <span className="w-4 h-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-full animate-pulse flex"></span>
                        <div className="absolute inset-0 w-4 h-4 bg-cyan-400 rounded-full blur-md animate-pulse opacity-70"></div>
                      </div>
                      <span className="text-white tracking-wider font-black">
                        CUTTING-EDGE TECHNOLOGY
                      </span>
                      <div className="ml-4 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
                      <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
                        Innovation in
                      </span>
                      <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">
                        Transportation
                      </span>
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                      Discover how we're revolutionizing bus travel with <span className="font-semibold text-cyan-300">smart technology</span> and
                      <br className="hidden md:block" />
                      <span className="font-semibold text-white">passenger-centric innovations</span>
                    </p>
                  </div>
                  
                  {/* Innovation Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {/* Smart GPS Tracking */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Smart GPS Tracking</h3>
                        <p className="text-gray-300 leading-relaxed">Real-time location tracking with precision accuracy for enhanced safety and peace of mind.</p>
                      </div>
                    </div>
                    
                    {/* Mobile Integration */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Mobile Integration</h3>
                        <p className="text-gray-300 leading-relaxed">Seamless mobile app experience for booking, tracking, and managing your entire journey.</p>
                      </div>
                    </div>
                    
                    {/* AI-Powered Analytics */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">AI-Powered Analytics</h3>
                        <p className="text-gray-300 leading-relaxed">Advanced analytics for route optimization and predictive maintenance ensuring reliability.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Call to Action */}
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold text-white mb-6">Experience the Future of Bus Travel</h3>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      Join us in revolutionizing transportation across Nepal with cutting-edge technology and unmatched comfort.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                        Explore Technology
                      </button>
                      <button className="backdrop-blur-xl bg-white/20 border border-white/30 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* Ultra Premium CTA Section */}
          <div className="text-center">
            <div className="relative group">
              {/* Supreme glassmorphism container */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
              <div className="relative backdrop-blur-3xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-2 border-white/60 rounded-[3rem] p-16 shadow-3xl hover:shadow-4xl transition-all duration-700 hover:scale-[1.02] max-w-6xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/8 to-pink-500/10 rounded-[3rem]"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-white/20 rounded-[3rem]"></div>
                
                <div className="relative z-10">
                  <div className="mb-12">
                    <div className="inline-flex items-center bg-gradient-to-r from-white/80 via-green-50/90 to-white/80 backdrop-blur-xl border-2 border-white/60 shadow-xl px-10 py-4 rounded-2xl text-lg font-black mb-8 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                      <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wider">
                        READY FOR YOUR ADVENTURE?
                      </span>
                    </div>
                  </div>
                  
                  <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
                      Ready to Explore
                    </span>
                    <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Beautiful Nepal?
                    </span>
                  </h2>
                  
                  <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                    Book your journey with <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sona Travel & Tours</span> and experience the 
                    <span className="font-bold text-gray-900"> best bus service in Nepal.</span>
                    <br className="hidden md:block" />
                    <span className="font-semibold text-gray-800">Comfortable, reliable, and always on time.</span>
                  </p>
                  
                  <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-12">
                    <div className="group/btn relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-60 group-hover/btn:opacity-80 transition-opacity duration-300"></div>
                      <button className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-2 border-white/20">
                        <div className="flex items-center space-x-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>Book Your Premium Ticket</span>
                        </div>
                      </button>
                    </div>
                    
                    <div className="group/btn relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-lg opacity-40 group-hover/btn:opacity-60 transition-opacity duration-300"></div>
                      <button className="relative backdrop-blur-xl bg-white/30 border-2 border-white/60 text-gray-800 px-12 py-6 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
                        <div className="flex items-center space-x-3">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>View Live Tracking</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Premium trust badges */}
                  <div className="flex flex-wrap justify-center items-center gap-8">
                    <div className="flex items-center space-x-3 bg-white/40 backdrop-blur-xl px-6 py-3 rounded-xl border border-white/50 shadow-lg">
                      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-gray-700">Instant Confirmation</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/40 backdrop-blur-xl px-6 py-3 rounded-xl border border-white/50 shadow-lg">
                      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-gray-700">Secure Payment</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/40 backdrop-blur-xl px-6 py-3 rounded-xl border border-white/50 shadow-lg">
                      <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-gray-700">Premium Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default BusRoutes;
