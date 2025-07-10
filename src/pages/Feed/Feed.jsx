import React, { useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Feed = () => {
  useEffect(() => {
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      const script = document.createElement('script');
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v23.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    };

    if (!document.getElementById('facebook-jssdk')) {
      loadFacebookSDK();
    }
  }, []);

  return (
    <>
      <Header />
      <main className="pt-[100px] min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-[#ff8f1f]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-[15%] w-96 h-96 bg-[#0a639d]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-[20%] w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating 3D Shapes */}
          <div className="absolute top-40 left-[5%] w-20 h-20 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl transform rotate-12 animate-float"></div>
          <div className="absolute top-60 right-[8%] w-16 h-16 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Glass Header */}
            <div className="relative backdrop-blur-xl bg-gradient-to-r from-white/40 via-white/30 to-white/40 rounded-2xl p-8 mb-8 shadow-xl border border-white/40 transform hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a639d]/5 to-[#ff8f1f]/5 rounded-2xl"></div>
              <div className="relative">
                <h1 className="text-4xl font-bold text-[#0a639d] mb-3 flex items-center gap-3">
                  Latest Updates
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </h1>
                <p className="text-[#5f5f5f] text-lg">Stay connected with our latest news and announcements</p>
              </div>
              
              {/* Quick Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0a639d]">50+</div>
                  <div className="text-sm text-[#5f5f5f]">Daily Tours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0a639d]">1000+</div>
                  <div className="text-sm text-[#5f5f5f]">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0a639d]">30+</div>
                  <div className="text-sm text-[#5f5f5f]">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0a639d]">24/7</div>
                  <div className="text-sm text-[#5f5f5f]">Support</div>
                </div>
              </div>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Facebook Feed Section */}
            <div className="relative transform hover:scale-[1.02] transition-all duration-300">
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/50 via-white/40 to-white/30 rounded-2xl p-6 shadow-xl border border-white/40">
                <div className="relative mb-4 p-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a639d]/5 to-[#ff8f1f]/5 rounded-xl"></div>
                  <h2 className="relative text-2xl font-semibold text-[#0a639d] mb-2 flex items-center gap-3">
                    <svg className="w-6 h-6 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook Updates
                    <span className="inline-block w-2 h-2 bg-[#1877f2] rounded-full animate-pulse"></span>
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#0a639d] to-[#ff8f1f] rounded-full"></div>
                </div>
                <div id="fb-root"></div>
                <div className="fb-page-container relative z-10">
                  <div 
                    className="fb-page" 
                    data-href="https://www.facebook.com/sonatraveltours" 
                    data-tabs="timeline" 
                    data-width="500" 
                    data-height="800" 
                    data-small-header="true" 
                    data-adapt-container-width="true" 
                    data-hide-cover="false" 
                    data-show-facepile="true"
                  >
                    <blockquote 
                      cite="https://www.facebook.com/sonatraveltours" 
                      className="fb-xfbml-parse-ignore"
                    >
                      <a href="https://www.facebook.com/sonatraveltours">
                        Sona Travel &amp; Tours Pvt. Ltd.
                      </a>
                    </blockquote>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ff8f1f]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#0a639d]/10 rounded-full blur-3xl"></div>
            </div>

            {/* Company Updates Section */}
            <div className="space-y-6">
              {/* Latest News Card */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/50 via-white/40 to-white/30 rounded-2xl p-6 shadow-xl border border-white/40 transform hover:scale-[1.02] transition-all duration-300">
                <h2 className="text-2xl font-semibold text-[#0a639d] mb-4 flex items-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2C5.589 2 2 5.589 2 10s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
                    <path d="M11 9.586V5a1 1 0 10-2 0v5c0 .265.105.52.293.707l3 3a1 1 0 001.414-1.414L11 9.586z"/>
                  </svg>
                  Latest News
                </h2>
                <div className="space-y-4">
                  <div className="group p-3 bg-white/30 rounded-xl backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-[#0a639d] rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                      <div>
                        <h3 className="font-medium text-[#333] group-hover:text-[#0a639d] transition-colors">New Routes Added</h3>
                        <p className="text-[#5f5f5f] text-sm">Explore our newly added routes connecting major cities.</p>
                        <span className="text-xs text-[#0a639d]/70 mt-2 inline-block">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group p-3 bg-white/30 rounded-xl backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-[#ff8f1f] rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                      <div>
                        <h3 className="font-medium text-[#333] group-hover:text-[#0a639d] transition-colors">Special Monsoon Offers</h3>
                        <p className="text-[#5f5f5f] text-sm">Get exciting discounts on selected tour packages.</p>
                        <span className="text-xs text-[#0a639d]/70 mt-2 inline-block">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events Card */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/50 via-white/40 to-white/30 rounded-2xl p-6 shadow-xl border border-white/40 transform hover:scale-[1.02] transition-all duration-300">
                <h2 className="text-2xl font-semibold text-[#0a639d] mb-4 flex items-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                  </svg>
                  Upcoming Events
                </h2>
                <div className="space-y-4">
                  <div className="group relative p-4 bg-white/30 rounded-xl backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all">
                    <div className="absolute -right-2 -top-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Today</div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0a639d] to-[#ff8f1f] text-white flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform">
                        <span className="text-xs font-medium">JUL</span>
                        <span className="text-2xl font-bold">15</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#333] group-hover:text-[#0a639d] transition-colors">Summer Travel Festival</h3>
                        <p className="text-[#5f5f5f] text-sm">Join us for exclusive travel deals and packages.</p>
                        <div className="flex items-center gap-2 mt-2">
                          <svg className="w-4 h-4 text-[#0a639d]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                          </svg>
                          <span className="text-xs text-[#0a639d]">10:00 AM - 5:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative p-4 bg-white/30 rounded-xl backdrop-blur-sm border border-white/40 hover:bg-white/40 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0a639d] to-[#07456e] text-white flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform">
                        <span className="text-xs font-medium">JUL</span>
                        <span className="text-2xl font-bold">20</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#333] group-hover:text-[#0a639d] transition-colors">Travel Photography Workshop</h3>
                        <p className="text-[#5f5f5f] text-sm">Learn tips and tricks for capturing your travel moments.</p>
                        <div className="flex items-center gap-2 mt-2">
                          <svg className="w-4 h-4 text-[#0a639d]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                          </svg>
                          <span className="text-xs text-[#0a639d]">2:00 PM - 4:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/50 via-white/40 to-white/30 rounded-2xl p-6 shadow-xl border border-white/40 transform hover:scale-[1.02] transition-all duration-300">
                <div className="relative">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#ff8f1f]/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-[#0a639d]/10 rounded-full blur-2xl"></div>
                  
                  <h2 className="text-2xl font-semibold text-[#0a639d] mb-4 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    Stay Updated
                  </h2>
                  <p className="text-[#5f5f5f] mb-6">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
                  
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/30 backdrop-blur-sm focus:outline-none focus:border-[#0a639d] focus:bg-white/50 transition-all pr-36"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-[#0a639d] to-[#07456e] text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                      Subscribe
                      <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 text-sm text-[#5f5f5f]">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>No spam, unsubscribe at any time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Slim Premium Features Marquee */}
        <div className="relative py-6 mt-8 bg-gradient-to-r from-[#0a639d]/5 via-white to-[#ff8f1f]/5 overflow-hidden">
          {/* Minimal Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/80 to-transparent"></div>
          </div>

          {/* Compact Header */}
          <div className="relative z-20 text-center mb-6 px-4">
            <h2 className="text-2xl font-bold text-[#0a639d] mb-2">
              Premium Features
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#0a639d] to-[#ff8f1f] mx-auto rounded-full"></div>
          </div>

          {/* Single Optimized Marquee */}
          <div className="relative overflow-hidden w-full">
            {/* Side Gradients */}
            <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            {/* Continuous Marquee */}
            <div className="flex gap-4 animate-marquee-continuous">
              {/* ISO Certified */}
              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">ISO Certified</h3>
                    <p className="text-xs text-[#5f5f5f]">Quality assured service</p>
                  </div>
                </div>
              </div>

              {/* Airbag Safety */}
              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">Airbag Protected</h3>
                    <p className="text-xs text-[#5f5f5f]">Enhanced safety</p>
                  </div>
                </div>
              </div>

              {/* IR Camera */}
              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">IR Camera</h3>
                    <p className="text-xs text-[#5f5f5f]">24/7 surveillance</p>
                  </div>
                </div>
              </div>

              {/* GPS Tracking */}
              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-red-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">GPS Tracking</h3>
                    <p className="text-xs text-[#5f5f5f]">Real-time location</p>
                  </div>
                </div>
              </div>

              {/* Smart Navigation */}
              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">Smart Navigation</h3>
                    <p className="text-xs text-[#5f5f5f]">Route optimization</p>
                  </div>
                </div>
              </div>

              {/* Online Booking */}
              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">Online Booking</h3>
                    <p className="text-xs text-[#5f5f5f]">Secure reservations</p>
                  </div>
                </div>
              </div>

              {/* Extra Security */}
              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-indigo-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">Extra Security</h3>
                    <p className="text-xs text-[#5f5f5f]">Safety protocols</p>
                  </div>
                </div>
              </div>

              {/* Orthopedic Seat */}
              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10l-1 14H8L7 4zM9 9v6M15 9v6" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M9 12h6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">Orthopedic Seat</h3>
                    <p className="text-xs text-[#5f5f5f]">Ergonomic comfort</p>
                  </div>
                </div>
              </div>

              {/* Duplicate for seamless loop */}
              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">ISO Certified</h3>
                    <p className="text-xs text-[#5f5f5f]">Quality assured service</p>
                  </div>
                </div>
              </div>

              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">Airbag Protected</h3>
                    <p className="text-xs text-[#5f5f5f]">Enhanced safety</p>
                  </div>
                </div>
              </div>

              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">IR Camera</h3>
                    <p className="text-xs text-[#5f5f5f]">24/7 surveillance</p>
                  </div>
                </div>
              </div>

              <div className="feature-card flex-none w-56 backdrop-blur-lg bg-white/40 rounded-xl p-4 shadow-lg border border-white/30 hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-red-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a639d] text-sm">GPS Tracking</h3>
                    <p className="text-xs text-[#5f5f5f]">Real-time location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced marquee animation and 3D effects with compact design */}
      <style jsx>{`
        @keyframes marquee-continuous {
          0% { 
            transform: translateX(0);
          }
          100% { 
            transform: translateX(-100%);
          }
        }
        .animate-marquee-continuous {
          animation: marquee-continuous 40s linear infinite;
        }
        .feature-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          backdrop-filter: blur(8px);
          width: 14rem !important;
          padding: 1rem !important;
          border-radius: 0.75rem !important;
        }
        .feature-card:hover {
          transform: translateZ(20px) scale(1.05);
          box-shadow: 
            0 10px 25px -5px rgba(10, 99, 157, 0.2),
            0 15px 30px -8px rgba(0, 0, 0, 0.1);
        }
        .feature-card .w-10 {
          width: 2.5rem !important;
          height: 2.5rem !important;
        }
        .feature-card h3 {
          font-size: 0.875rem !important;
          margin-bottom: 0.25rem !important;
        }
        .feature-card p {
          font-size: 0.75rem !important;
        }
        .feature-card .gap-3 {
          gap: 0.75rem !important;
        }
      `}</style>
      <Footer />
    </>
  );
};

export default Feed;