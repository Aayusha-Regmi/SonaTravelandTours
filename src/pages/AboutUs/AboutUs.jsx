import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  const teamMembers = [
    {
      id: 1,
      name: "Mr. Jaleshwar Pandit",
      position: "Founder",
      image: "/images/img_group.png", // placeholder image
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      id: 2,
      name: "Mr. Dayashankar Prajapati",
      position: "Chief Executive Officer (CEO)",
      image: "/images/img_group.png",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      id: 3,
      name: "Mr. Raju Kumar Prajapati",
      position: "Business Head (Kathmandu)",
      image: "/images/img_group.png",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      id: 4,
      name: "Mr. Niraj Mahato",
      position: "Supervisor",
      image: "/images/img_group.png",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      id: 5,
      name: "Aswani Kumar Jha",
      position: "Supervisor",
      image: "/images/img_group.png",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      id: 6,
      name: "Mr. Rakesh Manandhar",
      position: "Counter Incharge (Birgunj)",
      image: "/images/img_group.png",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      id: 7,
      name: "Mr. Sitaram Thapa",
      position: "Counter Incharge (Birgunj)",
      image: "/images/img_group.png",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      id: 8,
      name: "Mr. Ramesh KC",
      position: "Counter Incharge (Kathmandu)",
      image: "/images/img_group.png",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      id: 9,
      name: "Mr. Kamal Prasad Ghimire",
      position: "Counter Assistant (Kathmandu)",
      image: "/images/img_group.png",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      id: 10,
      name: "Mr. Hira Lama",
      position: "Travel Driver (5529)",
      image: "/images/img_group.png",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      id: 11,
      name: "Mr. Deepak Khadka",
      position: "Travel Assistant (5529)",
      image: "/images/img_group.png",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    },
    {
      id: 12,
      name: "Mr. Ramesh Giri",
      position: "Travel Driver (5524)",
      image: "/images/img_group.png",
      social: {
        twitter: "#",
        linkedin: "#",
        facebook: "#"
      }
    }
  ];

  const aboutSections = [
    {
      id: 'mission',
      title: 'Our Mission',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      content: `With a dedicated team focused on customer satisfaction, we strive to offer top-notch services, including easy booking, real-time updates, and 24/7 support. Learn more about our story, values, and the innovative solutions we implement to ensure every trip you take with us is the best it can be. Join us and discover the difference of traveling with Sona Travel & Tours.`
    },
    {
      id: 'values',
      title: 'Our Values',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      content: `We believe in reliability, comfort, and exceptional customer service. Our core values include transparency, innovation, and building lasting relationships with our passengers. Every journey with us is backed by our commitment to safety and quality.`
    },
    {
      id: 'services',
      title: 'Our Services',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      content: `We offer comprehensive travel solutions including online booking, real-time bus tracking, multiple payment options, customer support, and route management. Our user-friendly app makes travel planning simple and convenient. Additionally, we provide complimentary sanitary products for female passengers to ensure comfort and dignity during travel, reflecting our commitment to inclusive and considerate passenger care.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/40 relative overflow-hidden">
      <Header />      {/* Hero Section with Glassmorphism */}
      <section className="relative pt-32 pb-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-100/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-64 h-64 bg-gradient-to-r from-orange-100/40 to-amber-200/40 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-100/25 to-teal-200/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-r from-purple-100/30 to-pink-200/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">         
          {/* Hero Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-600 font-medium">ABOUT SONA TRAVEL & TOURS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-orange-600 bg-clip-text text-transparent mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in reliable and comfortable travel. We are committed to making your journeys 
              seamless and enjoyable through our extensive network of routes and user-friendly app.
            </p>
          </div>
        </div>      </section>      
        {/* Main Content Section */}
      <section className="py-4 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
              {/* Introduction Card */}
            <div className="relative mb-12">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl hover:scale-[1.01] transition-all duration-700 group">
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-orange-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                  EST. 2024
                </div>
                
                {/* 3D Company Icon */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-600 rounded-3xl animate-pulse shadow-2xl"></div>
                    <div className="relative z-10 w-full h-full bg-gradient-to-br from-white via-blue-50 to-orange-100 rounded-3xl shadow-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="text-center">                  
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-500">
                    Welcome to Sona Travel & Tours
                  </h2>
                  {/* Animated Bus Image */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">{/* Bus Image with Animation - Made Ultra Wide and More Attractive */}
                      <div className="relative z-10 group-hover:scale-110 transition-transform duration-700">                        <img 
                          src="/images/Bus.png" 
                          alt="Sona Travel Bus" 
                          className="w-[480px] h-64 md:w-[600px] md:h-80 lg:w-[720px] lg:h-96 xl:w-[840px] xl:h-[420px] 2xl:w-[960px] 2xl:h-[480px] object-contain animate-pulse hover:animate-none transition-all duration-500 filter drop-shadow-2xl hover:drop-shadow-3xl hover:brightness-110"
                        />
                      </div>
                        {/* Enhanced Moving Road Animation - Made Much Wider */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[530px] md:w-[650px] lg:w-[770px] xl:w-[890px] 2xl:w-[1010px] h-5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full opacity-60">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse"></div>
                        {/* Road markings */}
                        <div className="absolute top-1/2 left-1/4 w-8 h-0.5 bg-white/60 rounded-full transform -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-1/2 w-8 h-0.5 bg-white/60 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute top-1/2 right-1/4 w-8 h-0.5 bg-white/60 rounded-full transform -translate-y-1/2"></div>
                      </div>
                      
                      {/* Enhanced Floating Particles around Bus */}
                      <div className="absolute top-6 left-12 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0s'}}></div>
                      <div className="absolute top-12 right-16 w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute top-16 left-20 w-2 h-2 bg-emerald-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '1s'}}></div>
                      <div className="absolute top-8 right-8 w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '1.5s'}}></div>
                      <div className="absolute top-20 left-32 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '2s'}}></div>
                      <div className="absolute top-4 right-24 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '2.5s'}}></div>
                      
                      {/* Enhanced Speed Lines Animation */}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex flex-col gap-3">
                          <div className="w-12 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
                          <div className="w-10 h-0.5 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-14 h-1 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                          <div className="w-8 h-0.5 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
                        </div>
                      </div>
                      
                      {/* Enhanced Glowing Aura */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-orange-400/20 to-emerald-400/20 rounded-3xl blur-2xl scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
                      
                      {/* Additional Atmospheric Effects */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </div>                  
                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                    Welcome to <strong>Sona Travel & Tours</strong>, your trusted partner in reliable and comfortable travel. 
                    We are committed to making your journeys seamless and enjoyable through our extensive network of routes 
                    and user-friendly app. Our mission is to provide exceptional travel experiences, whether you're commuting 
                    daily or exploring new destinations.
                  </p>                    {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-6 max-w-4xl mx-auto">
                    <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                      <div className="text-2xl font-bold text-blue-600">1000+</div>
                      <div className="text-sm text-gray-600">Happy Customers</div>
                    </div>
                    <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                      <div className="text-2xl font-bold text-orange-600">50+</div>
                      <div className="text-sm text-gray-600">Routes</div>
                    </div>
                    <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                      <div className="text-2xl font-bold text-emerald-600">24/7</div>
                      <div className="text-sm text-gray-600">Support</div>
                    </div>
                    <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                      <div className="text-2xl font-bold text-purple-600">99%</div>
                      <div className="text-sm text-gray-600">On Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Sections */}
            <div className="space-y-6 mb-16">
              {aboutSections.map((section, index) => (
                <div key={section.id} className="group">
                  <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-200/40 shadow-xl hover:shadow-2xl hover:bg-white/70 transition-all duration-500 overflow-hidden">
                    {/* Section Header */}
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          {/* 3D Icon */}
                          <div className="relative">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-500 ${
                              index % 3 === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                              index % 3 === 1 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                              'bg-gradient-to-r from-emerald-500 to-emerald-600'
                            }`}>
                              <div className="relative z-10">
                                {section.icon}
                              </div>
                            </div>
                            {/* 3D Shadow */}
                            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-3 ${
                              index % 3 === 0 ? 'bg-blue-500/20' :
                              index % 3 === 1 ? 'bg-orange-500/20' :
                              'bg-emerald-500/20'
                            } rounded-full blur-sm group-hover:scale-125 transition-all duration-500`}></div>
                          </div>
                          
                          <div>
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                              {section.title}
                            </h3>
                            <p className="text-gray-500 text-sm">Click to expand details</p>
                          </div>
                        </div>
                        
                        {/* Expand/Collapse Icon */}
                        <div className={`w-10 h-10 bg-gray-100/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeSection === section.id ? 'rotate-180 bg-blue-100/60' : 'group-hover:bg-gray-200/60'
                        }`}>
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      activeSection === section.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6">
                        <div className="ml-22 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Section */}
            <div className="mt-16">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl transition-all duration-700">
                {/* Section Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-6">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-emerald-600 font-medium">MEET OUR TEAM</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                    Our Team
                  </h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Meet the dedicated professionals behind <strong>Sona Travel & Tours</strong>. Our team is committed to 
                    providing exceptional service and ensuring your travel experience is seamless and enjoyable.
                  </p>
                </div>                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {teamMembers.map((member, index) => (
                    <div key={member.id} className="group h-full">                      <div className="relative bg-white/60 backdrop-blur-lg rounded-[3rem] p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl hover:bg-white/80 hover:scale-[1.05] hover:-translate-y-2 transition-all duration-700 ease-out h-full flex flex-col transform hover:rotate-1 hover:shadow-blue-200/50">
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-orange-50/50 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                          {/* Decorative Elements with Animation */}
                        <div className="absolute top-2 right-2 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="absolute bottom-2 left-2 w-12 h-12 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                        
                        {/* Floating Particles Animation */}
                        <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400/40 rounded-full animate-ping"></div>
                        <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-orange-400/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                        <div className="absolute bottom-8 left-8 w-1 h-1 bg-emerald-400/40 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
                        
                        {/* Profile Image with Enhanced Animation */}
                        <div className="relative mb-6 flex-shrink-0 z-10">
                          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-orange-500 p-1.5 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-700 group-hover:rotate-6">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full rounded-full object-cover bg-white group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          {/* Profile Ring Animation */}
                          <div className="absolute inset-0 w-28 h-28 mx-auto rounded-full border-2 border-blue-400/30 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 animate-pulse"></div>
                        </div>

                        {/* Member Info with Animation */}
                        <div className="text-center mb-6 flex-grow flex flex-col justify-center z-10 group-hover:transform group-hover:scale-105 transition-transform duration-500">
                          <h3 className="font-bold text-gray-800 text-lg mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-500">{member.name}</h3>
                          <div className="min-h-[2.5rem] flex items-center justify-center">                            {member.position ? (
                              <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-[1.5rem] px-4 py-2 group-hover:bg-blue-100/90 group-hover:border-blue-300/60 group-hover:scale-105 transition-all duration-500">
                                <p className="text-sm text-blue-700 font-semibold group-hover:text-blue-800 transition-colors duration-300">{member.position}</p>
                              </div>
                            ) : (
                              <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-[1.5rem] px-4 py-2 group-hover:bg-gray-100/90 group-hover:border-gray-300/60 group-hover:scale-105 transition-all duration-500">
                                <p className="text-sm text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">Team Member</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Social Links with Enhanced Animation */}
                        <div className="flex justify-center gap-4 mt-auto z-10">
                          {/* Twitter */}                          <a 
                            href={member.social.twitter} 
                            className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-[1.5rem] flex items-center justify-center text-white transition-all duration-500 hover:scale-125 hover:-translate-y-1 hover:rotate-12 shadow-lg hover:shadow-2xl hover:shadow-blue-300/50 group-hover:animate-bounce"
                            title="Twitter"
                            style={{animationDelay: `${index * 0.1}s`}}
                          >
                            <svg className="w-5 h-5 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>

                          {/* LinkedIn */}
                          <a 
                            href={member.social.linkedin} 
                            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-[1.5rem] flex items-center justify-center text-white transition-all duration-500 hover:scale-125 hover:-translate-y-1 hover:rotate-12 shadow-lg hover:shadow-2xl hover:shadow-blue-400/50 group-hover:animate-bounce"
                            title="LinkedIn"
                            style={{animationDelay: `${index * 0.1 + 0.1}s`}}
                          >
                            <svg className="w-5 h-5 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>

                          {/* Facebook */}
                          <a 
                            href={member.social.facebook} 
                            className="w-12 h-12 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-indigo-900 rounded-[1.5rem] flex items-center justify-center text-white transition-all duration-500 hover:scale-125 hover:-translate-y-1 hover:rotate-12 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 group-hover:animate-bounce"
                            title="Facebook"
                            style={{animationDelay: `${index * 0.1 + 0.2}s`}}
                          >
                            <svg className="w-5 h-5 transition-transform duration-300 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </a>
                        </div>
                        
                        {/* Floating Number Badge with Animation */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-emerald-300/50 transition-all duration-500 z-20">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                          {/* Pulse Ring Animation on Hover */}
                        <div className="absolute inset-0 rounded-[3rem] border border-blue-400/30 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Insurance Section */}
            <div className="mt-16">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-[3rem] p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl transition-all duration-700 group">
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-[2rem] text-sm font-bold shadow-lg animate-pulse">
                  PROTECT YOUR JOURNEY
                </div>
                
                {/* Section Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-6">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-emerald-600 font-medium">TRAVEL PROTECTION</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                    Travel Insurance
                  </h2>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    At <strong>Sona Travel Bus</strong>, we understand the importance of ensuring your journey is worry-free. 
                    That's why we offer optional travel insurance to provide you with added peace of mind.
                  </p>
                </div>

                {/* Insurance Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {/* Trip Protection */}
                  <div className="group/feature">
                    <div className="relative bg-white/50 backdrop-blur-lg rounded-[2rem] p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl hover:bg-white/70 hover:scale-[1.02] transition-all duration-500">
                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover/feature:scale-110 group-hover/feature:rotate-12 transition-all duration-500">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 text-center mb-3 group-hover/feature:text-blue-600 transition-colors duration-300">
                        Trip Protection
                      </h3>
                      <p className="text-gray-600 text-center text-sm leading-relaxed">
                        Trip cancellation or interruption due to unforeseen circumstances.
                      </p>
                    </div>
                  </div>

                  {/* Medical Coverage */}
                  <div className="group/feature">
                    <div className="relative bg-white/50 backdrop-blur-lg rounded-[2rem] p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl hover:bg-white/70 hover:scale-[1.02] transition-all duration-500">
                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover/feature:scale-110 group-hover/feature:rotate-12 transition-all duration-500">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 text-center mb-3 group-hover/feature:text-emerald-600 transition-colors duration-300">
                        Medical Coverage
                      </h3>
                      <p className="text-gray-600 text-center text-sm leading-relaxed">
                        Medical expenses incurred during your journey.
                      </p>
                    </div>
                  </div>

                  {/* Luggage Protection */}
                  <div className="group/feature">
                    <div className="relative bg-white/50 backdrop-blur-lg rounded-[2rem] p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl hover:bg-white/70 hover:scale-[1.02] transition-all duration-500">
                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover/feature:scale-110 group-hover/feature:rotate-12 transition-all duration-500">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 text-center mb-3 group-hover/feature:text-orange-600 transition-colors duration-300">
                        Luggage Protection
                      </h3>
                      <p className="text-gray-600 text-center text-sm leading-relaxed">
                        Lost or delayed luggage
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-50/80 to-emerald-50/80 backdrop-blur-sm border border-blue-200/30 rounded-[2rem] p-8 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Complete Peace of Mind
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Our goal is to protect you from unexpected events that could disrupt your travel plans. 
                      For more information about our travel insurance options, please contact our customer service team. 
                      Travel confidently with <strong>Sona Travel Bus</strong> knowing that you're covered.
                    </p>
                      {/* CTA Buttons */}
                    <div className="flex justify-center">
                      <a 
                        href="tel:+977-1234567890" 
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-[1.5rem] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Contact Support
                      </a>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-emerald-400/40 rounded-full animate-ping"></div>
                <div className="absolute top-8 right-8 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-6 left-6 w-2.5 h-2.5 bg-orange-400/40 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-16">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl transition-all duration-700 group">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-500">
                    Get in Touch
                  </h3>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                    Have questions about our services or need assistance with your booking? 
                    Our team is here to help you 24/7.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="mailto:info@sonatours.com" 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Email Us
                    </a>
                    <a 
                      href="tel:+977-1234567890" 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Call Us
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

export default AboutUs;
