import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import FloatingActionBar from '../Home/ComponentHome/UI/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';

const TermsConditions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const { handleSocialClick } = useSocialActions();

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  const termsData = [
    {
      id: 'booking',
      title: 'Booking and Payments',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      content: `All bookings made through our app are subject to availability and confirmation. Payments must be made in full at the time of booking. We accept various payment methods for your convenience.`
    },
    {
      id: 'cancellation',
      title: 'Cancellation and Refunds',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
        </svg>
      ),
      content: `Cancellations must be made at least 24 hours before the scheduled departure time to qualify for a refund. Refunds will be processed according to our cancellation policy. Please refer to our cancellation policy for detailed information.`
    },
    {
      id: 'travel',
      title: 'Travel Policies',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v4a4 4 0 004 4h8a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a4 4 0 004-4v-4" />
        </svg>
      ),
      content: `Passengers must carry a valid ticket and a government-issued ID during the journey. Please arrive at the boarding point at least 15 minutes before the scheduled departure time. We reserve the right to deny boarding to passengers who fail to comply with our travel policies.`
    },
    {
      id: 'baggage',
      title: 'Baggage Policy',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      content: `Passengers are allowed to bring a limited amount of baggage, as specified in our baggage policy. Additional charges may apply for excess baggage. We are not responsible for any loss or damage to personal belongings during the journey.`
    },
    {
      id: 'liability',
      title: 'Liability',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      content: `We strive to provide timely and safe travel services. However, we are not liable for any delays, cancellations, or interruptions caused by circumstances beyond our control, such as weather conditions, traffic, or technical issues.`
    },
    {
      id: 'conduct',
      title: 'User Conduct',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      content: `Users are expected to use our app and services responsibly. Any misuse, including but not limited to fraudulent bookings, tampering with the app, or abusive behavior towards staff or other passengers, will result in termination of services and potential legal action.`
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: `We are committed to protecting your privacy. Please review our Privacy Policy to understand how we collect, use, and safeguard your personal information.`
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      content: `We reserve the right to modify these terms and conditions at any time. Any changes will be communicated through our app or website. Continued use of our services constitutes acceptance of the revised terms.`
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
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-600 font-medium">LEGAL INFORMATION</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Terms & Conditions
            </h1>            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              By using our app and services, you agree to comply with the following terms and conditions. 
              Please read them carefully before using Sona Travel & Tours services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction Card */}
            <div className="relative mb-12">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl hover:scale-[1.01] transition-all duration-700 group">
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                  UPDATED 2025
                </div>
                
                {/* 3D Legal Icon */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl animate-pulse shadow-2xl"></div>
                    <div className="relative z-10 w-full h-full bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl shadow-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    {/* 3D Shadow Effect */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-gray-300/30 rounded-full blur-md"></div>
                  </div>
                </div>                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 group-hover:scale-105 transition-transform duration-500">
                    Terms & Conditions
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    By using our app and services, you agree to comply with the following terms and conditions. 
                    These terms govern your use of Sona Travel & Tours services. Last updated: June 13, 2025.
                  </p>
                  <div className="inline-flex items-center gap-3 bg-blue-50/60 backdrop-blur-sm border border-blue-200/40 rounded-full px-6 py-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-blue-700 font-medium">Please read carefully before using our services</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Sections */}
            <div className="space-y-6">
              {termsData.map((term, index) => (
                <div key={term.id} className="relative">
                  <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-200/40 shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden">
                    
                    {/* Section Header */}
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleSection(term.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* 3D Icon */}
                          <div className="relative">
                            <div className={`w-14 h-14 bg-gradient-to-br ${
                              index % 4 === 0 ? 'from-blue-400 via-blue-500 to-indigo-600' :
                              index % 4 === 1 ? 'from-emerald-400 via-emerald-500 to-teal-600' :
                              index % 4 === 2 ? 'from-purple-400 via-purple-500 to-pink-600' :
                              'from-orange-400 via-orange-500 to-red-600'
                            } rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden`}>
                              {/* Inner glow effect */}
                              <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                              <div className="text-white relative z-10">
                                {term.icon}
                              </div>
                            </div>
                            {/* 3D Shadow */}
                            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-3 ${
                              index % 4 === 0 ? 'bg-blue-500/20' :
                              index % 4 === 1 ? 'bg-emerald-500/20' :
                              index % 4 === 2 ? 'bg-purple-500/20' :
                              'bg-orange-500/20'
                            } rounded-full blur-sm group-hover:scale-125 transition-all duration-500`}></div>
                          </div>
                          
                          <div>
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                              {index + 1}. {term.title}
                            </h3>
                            <p className="text-gray-500 text-sm">Click to expand details</p>
                          </div>
                        </div>
                        
                        {/* Expand/Collapse Icon */}
                        <div className={`w-10 h-10 bg-gray-100/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeSection === term.id ? 'rotate-180 bg-indigo-100/60' : 'group-hover:bg-gray-200/60'
                        }`}>
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      activeSection === term.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6">
                        <div className="ml-18 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {term.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="mt-16">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl transition-all duration-700 group">
                {/* Floating Badge */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-bounce">
                  NEED HELP?
                </div>
                  <div className="text-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                    Questions About These Terms?
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    If you have any questions or need further clarification, please contact our customer support team. 
                    <br />
                    <strong>Thank you for choosing Sona Travel & Tours for your travel needs.</strong>
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a href="mailto:info@sonatraveltours.com" className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Email Us</span>
                    </a>
                    
                    <a href="tel:+97798451222260" className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Call Us</span>
                    </a>
                    
                    <a href="/contact" className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Visit Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActionBar handleSocialClick={handleSocialClick} />
    </div>
  );
};

export default TermsConditions;
