import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import FloatingActionBar from '../Home/ComponentHome/UI/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);
  const { handleSocialClick } = useSocialActions();

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const privacyData = [
    {
      id: 'collection',
      title: 'Information Collection',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: `We collect personal information such as your name, contact details, payment information, and travel preferences when you book a ticket or create an account. We may also collect non-personal information such as device details and usage data to enhance our app's functionality.`
    },
    {
      id: 'usage',
      title: 'Use of Information',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      content: `Your personal information is used to process bookings, facilitate payments, and provide customer support. We use your contact details to communicate with you about your bookings, send travel updates, and inform you about special offers. Non-personal information helps us improve our services and user experience.`
    },
    {
      id: 'security',
      title: 'Data Security',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: `We employ industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, or destruction. Your payment information is encrypted and processed through secure gateways. We regularly review and update our security practices to maintain the highest level of protection.`
    },
    {
      id: 'third-party',
      title: 'Third-Party Services',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      content: `We may use third-party services such as payment processors, analytics providers, and advertising partners. These third parties have access to your information only to perform specific tasks on our behalf and are obligated to protect your data in accordance with our privacy policy.`
    },
    {
      id: 'sharing',
      title: 'Data Sharing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      content: `We do not sell, rent, or share your personal information with third parties for their marketing purposes. We may share your information with trusted partners and service providers who assist us in delivering our services. Your data may also be disclosed if required by law or to protect our rights and safety.`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      content: `Our app may use cookies and similar tracking technologies to enhance your user experience, analyze usage patterns, and deliver personalized content. You can control the use of cookies through your browser settings.`
    },
    {
      id: 'rights',
      title: 'User Rights',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      content: `You have the right to access, update, or delete your personal information at any time. You can also opt out of receiving promotional communications. To exercise these rights, please contact our customer support team.`
    },
    {
      id: 'updates',
      title: 'Policy Updates',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      content: `We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Any updates will be communicated through our app or website. Continued use of our services constitutes acceptance of the revised policy.`
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with Glassmorphism */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-100/30 to-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-64 h-64 bg-gradient-to-r from-blue-100/40 to-indigo-200/40 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-100/25 to-pink-200/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-r from-orange-100/30 to-amber-200/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-600 font-medium">PRIVACY INFORMATION</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We are committed to protecting your privacy and ensuring the security of your personal information. 
              Learn how we collect, use, and safeguard your data when you use our services.
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
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                  UPDATED 2025
                </div>
                
                {/* 3D Privacy Icon */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl animate-pulse shadow-2xl"></div>
                    <div className="relative z-10 w-full h-full bg-gradient-to-br from-white via-emerald-50 to-teal-100 rounded-3xl shadow-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    {/* 3D Shadow Effect */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-gray-300/30 rounded-full blur-md"></div>
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 group-hover:scale-105 transition-transform duration-500">
                    Privacy Policy
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    At Sona Travel & Tours, we are committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy outlines how we collect, use, and safeguard your data when you use our app and services. Last updated: June 13, 2025.
                  </p>
                  <div className="inline-flex items-center gap-3 bg-emerald-50/60 backdrop-blur-sm border border-emerald-200/40 rounded-full px-6 py-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-emerald-700 font-medium">Your privacy is our priority</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-6">
              {privacyData.map((section, index) => (
                <div key={section.id} className="relative">
                  <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-200/40 shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden">
                    
                    {/* Section Header */}
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* 3D Icon */}
                          <div className="relative">
                            <div className={`w-14 h-14 bg-gradient-to-br ${
                              index % 4 === 0 ? 'from-emerald-400 via-emerald-500 to-teal-600' :
                              index % 4 === 1 ? 'from-blue-400 via-blue-500 to-indigo-600' :
                              index % 4 === 2 ? 'from-purple-400 via-purple-500 to-pink-600' :
                              'from-orange-400 via-orange-500 to-red-600'
                            } rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden`}>
                              {/* Inner glow effect */}
                              <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                              <div className="text-white relative z-10">
                                {section.icon}
                              </div>
                            </div>
                            {/* 3D Shadow */}
                            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-3 ${
                              index % 4 === 0 ? 'bg-emerald-500/20' :
                              index % 4 === 1 ? 'bg-blue-500/20' :
                              index % 4 === 2 ? 'bg-purple-500/20' :
                              'bg-orange-500/20'
                            } rounded-full blur-sm group-hover:scale-125 transition-all duration-500`}></div>
                          </div>
                          
                          <div>
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                              {index + 1}. {section.title}
                            </h3>
                            <p className="text-gray-500 text-sm">Click to expand details</p>
                          </div>
                        </div>
                        
                        {/* Expand/Collapse Icon */}
                        <div className={`w-10 h-10 bg-gray-100/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeSection === section.id ? 'rotate-180 bg-emerald-100/60' : 'group-hover:bg-gray-200/60'
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
                        <div className="ml-18 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
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

            {/* Contact Information */}
            <div className="mt-16">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl transition-all duration-700 group">
                {/* Floating Badge */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-bounce">
                  NEED HELP?
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                    Questions About Your Privacy?
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    By using our app and services, you consent to the collection, use, and protection of your information as described in this Privacy Policy. 
                    If you have any questions, please contact our customer support team.
                    <br />
                    <strong>Thank you for trusting Sona Travel & Tours with your travel needs.</strong>
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a href="mailto:info@sonatraveltours.com" className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Email Us</span>
                    </a>
                    
                    <a href="tel:+97798451222260" className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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

export default PrivacyPolicy;
