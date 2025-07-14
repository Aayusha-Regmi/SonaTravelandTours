import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const VisitCounters = () => {
  // Counter locations with embedded map URLs
  const counterLocations = [
    {
      id: 1,
      name: "Sona Travels Counter - Kathmandu",
      address: "Civil Mall, Kathmandu",
      phone: "(+977) 9802353260",
      hours: "SUN - SAT (9 AM - 8 PM)",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5803829254414!2d85.31290010000001!3d27.6993613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198043c0c19d%3A0x3bf16770e7fed605!2sSona%20travels!5e0!3m2!1sen!2snp!4v1751437139717!5m2!1sen!2snp",
      city: "Kathmandu",
      type: "Counter"
    },
    {
      id: 2,
      name: "Sona Travel Counter - Birgunj",
      address: "Adarsha Nagar, Main Road, Birgunj, Parsa",
      phone: "(+977) 9802374215",
      hours: "SUN - SAT (9 AM - 8 PM)",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.617050739767!2d84.87517249999999!3d27.010661200000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993554c9ef26717%3A0x12be606538873660!2sSona%20Travel!5e0!3m2!1sen!2snp!4v1751437183882!5m2!1sen!2snp",
      city: "Birgunj",
      type: "Counter"
    },
    {
      id: 3,
      name: "Sona Travel Counter - Gaushala Counter No. 31",
      address: "Gaushala - Chowk ",
      phone: "(+977) 9802362125",
      hours: "SUN - SAT (9 AM - 8 PM)",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.351356409447!2d85.3448566!3d27.706436000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198043c0c19d%3A0x3bf16770e7fed605!2sSona%20travels!5e0!3m2!1sen!2snp!4v1752467759771!5m2!1sen!2snp",
      city: "Pokhara",
      type: "Counter"
    },
    {
      id: 4,
      name: "Sona Travel Counter - Chitwan",
      address: "Bus Station Area, Bharatpur, Chitwan",
      phone: "(+977) 9845678901",
      hours: "SUN - SAT (9 AM - 8 PM)",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3542.2896391738!2d84.4328!3d27.6838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQxJzAxLjciTiA4NMKwMjUnNTguMUUi!5e0!3m2!1sen!2snp!4v1751437220000!5m2!1sen!2snp",
      city: "Chitwan",
      type: "Counter"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with Glassmorphism */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-100/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-64 h-64 bg-gradient-to-r from-purple-100/40 to-pink-200/40 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-100/25 to-teal-200/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-r from-orange-100/30 to-amber-200/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-600 font-medium">FIND US</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Visit Our Counters
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Visit us at any of our convenient locations across Nepal. Our friendly staff is ready to assist you with all your travel needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Location Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {counterLocations.map((location) => (
                <div key={location.id} className="relative h-full">
                  {/* Glassmorphism Card */}
                  <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/40 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-700 group h-full flex flex-col">
                    {/* Floating Badge */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                      {location.type}
                    </div>

                    <div className="space-y-6 flex-grow">
                      {/* Header */}
                      <div>
                        {/* 3D Location Icon */}
                        <div className="flex justify-center mb-6">
                          <div className="relative w-20 h-20 group-hover:scale-110 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse shadow-2xl"></div>
                            <div className="relative z-10 w-full h-full bg-gradient-to-br from-white via-emerald-50 to-teal-100 rounded-full shadow-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                            </div>
                            {/* 3D Shadow Effect */}
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-emerald-300/30 rounded-full blur-md"></div>
                          </div>
                        </div>
                        
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 group-hover:scale-105 transition-transform duration-500 text-center">
                          {location.name}
                        </h2>
                      </div>

                      {/* Contact Details */}
                      <div className="space-y-4 flex-grow">
                        {/* Address */}
                        <div className="flex items-start space-x-4 p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30 hover:bg-white/60 transition-all duration-300 group relative overflow-hidden">
                          {/* 3D Background Pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full transform translate-x-6 -translate-y-6"></div>
                            <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full transform -translate-x-4 translate-y-4"></div>
                          </div>
                          
                          {/* 3D Icon Container */}
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden">
                              {/* Inner glow effect */}
                              <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
                              <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            {/* 3D Shadow */}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-emerald-500/20 rounded-full blur-sm group-hover:scale-125 transition-all duration-500"></div>
                          </div>
                          
                          <div className="flex-1">
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Address</p>
                            <p className="text-gray-800 text-sm font-bold group-hover:text-emerald-600 transition-colors duration-300">{location.address}</p>
                            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 mt-1"></div>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center space-x-4 p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30 hover:bg-white/60 transition-all duration-300 group relative overflow-hidden">
                          {/* 3D Background Pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full transform translate-x-6 -translate-y-6"></div>
                            <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full transform -translate-x-4 translate-y-4"></div>
                          </div>
                          
                          {/* 3D Icon Container */}
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden">
                              {/* Inner glow effect */}
                              <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
                              <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            {/* 3D Shadow */}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-purple-500/20 rounded-full blur-sm group-hover:scale-125 transition-all duration-500"></div>
                          </div>
                          
                          <div className="flex-1">
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Phone</p>
                            <p className="text-gray-800 text-sm font-bold group-hover:text-purple-600 transition-colors duration-300">{location.phone}</p>
                            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 mt-1"></div>
                          </div>
                        </div>

                        {/* Office Hours */}
                        <div className="flex items-center space-x-4 p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30 hover:bg-white/60 transition-all duration-300 group relative overflow-hidden">
                          {/* 3D Background Pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full transform translate-x-6 -translate-y-6"></div>
                            <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-br from-red-400 to-orange-400 rounded-full transform -translate-x-4 translate-y-4"></div>
                          </div>
                          
                          {/* 3D Icon Container */}
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden">
                              {/* Inner glow effect */}
                              <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
                              <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            {/* 3D Shadow */}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-orange-500/20 rounded-full blur-sm group-hover:scale-125 transition-all duration-500"></div>
                          </div>
                          
                          <div className="flex-1">
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Hours</p>
                            <p className="text-gray-800 text-sm font-bold group-hover:text-orange-600 transition-colors duration-300">{location.hours}</p>
                            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 mt-1"></div>
                          </div>
                        </div>
                      </div>

                      {/* 3D Interactive Google Maps Embed */}
                      <div className="mt-6">
                        {/* 3D Map Container with Glassmorphism */}
                        <div className="relative group cursor-pointer">
                          {/* 3D Floating Frame */}
                          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 via-teal-500/30 to-cyan-400/20 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                          
                          {/* Main Map Container */}
                          <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-4 border border-white/30 shadow-2xl group-hover:shadow-3xl transition-all duration-700 transform group-hover:scale-[1.02] group-hover:rotate-1">
                            {/* Map Header with 3D Icon */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                {/* 3D Map Icon */}
                                <div className="relative">
                                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                                    <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-lg"></div>
                                    <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                  </div>
                                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-emerald-500/30 rounded-full blur-sm group-hover:scale-125 transition-all duration-500"></div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">Interactive Map</h4>
                                  <p className="text-xs text-gray-500">Click to explore location</p>
                                </div>
                              </div>
                              
                              {/* 3D Action Buttons */}
                              <div className="flex gap-2">
                                {/* Fullscreen Button */}
                                <button 
                                  onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(location.address)}`, '_blank')}
                                  className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110 hover:rotate-12 transition-all duration-300 group relative overflow-hidden"
                                  title="Open in Google Maps"
                                >
                                  <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-md"></div>
                                  <svg className="w-4 h-4 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </button>
                                
                                {/* Directions Button */}
                                <button 
                                  onClick={() => window.open(`https://www.google.com/maps/dir//${encodeURIComponent(location.address)}`, '_blank')}
                                  className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110 hover:rotate-12 transition-all duration-300 group relative overflow-hidden"
                                  title="Get Directions"
                                >
                                  <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-md"></div>
                                  <svg className="w-4 h-4 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            
                            {/* 3D Map Frame */}
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/40 group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-[1.01]">
                              {/* Animated Border Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                              
                              {/* Map Iframe */}
                              <iframe
                                src={location.mapUrl}
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-2xl relative z-10"
                                title={`${location.name} Location`}
                              ></iframe>
                              
                              {/* Interactive Overlay */}
                              <div className="absolute inset-0 bg-transparent hover:bg-gradient-to-br hover:from-emerald-500/10 hover:via-transparent hover:to-teal-500/10 transition-all duration-300 rounded-2xl pointer-events-none"></div>
                              
                              {/* 3D Floating Elements */}
                              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-90">
                                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/30">
                                  <p className="text-xs font-semibold text-gray-800">{location.city}</p>
                                  <p className="text-xs text-gray-600">📍 Counter Location</p>
                                </div>
                              </div>
                              
                              {/* Corner Decorative Elements */}
                              <div className="absolute top-2 right-2 w-4 h-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-bounce"></div>
                              <div className="absolute bottom-2 left-2 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-bounce" style={{animationDelay: '0.5s'}}></div>
                            </div>
                            
                            {/* Quick Action Bar */}
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-gray-600 font-medium">Live Location</span>
                              </div>
                              
                              <button 
                                onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(location.address)}`, '_blank')}
                                className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 backdrop-blur-sm border border-emerald-300/30 rounded-full px-3 py-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-all duration-300 transform hover:scale-105"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                View on Map
                              </button>
                            </div>
                          </div>
                          
                          {/* 3D Shadow Effect */}
                          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full h-6 bg-emerald-500/20 rounded-full blur-xl opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Information Section */}
            <div className="mt-16">
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/40 shadow-2xl">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Directions?</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Can't find us? Call any of our offices and our friendly staff will guide you to the nearest location. 
                    We're here to make your journey as smooth as possible.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href="tel:+9779802353260"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Kathmandu Office
                    </a>
                    <a
                      href="tel:+9779802374215"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Birgunj Office
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisitCounters;
