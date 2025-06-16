import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const FAQs = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const faqData = [
    {
      id: 'online-reservation',
      title: 'How do you do online bus reservation?',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      content: `Booking a bus ticket online in Nepal is easy with Sona Travel. Simply enter the boarding place from (Origin City) – Going to (destination city) details along with the date you wish to travel in the bus search option on the site. Within seconds you will be given a list of available running buses for your route. Select the bus that best suits you, then just follow the bus ticket booking process by selecting your seat, providing passenger details and completing the payment process. Upon successful booking confirmation, you will receive an e-ticket over SMS/whatsapp and email.`
    },
    {
      id: 'account-creation',
      title: 'Do I need to create an account to book bus tickets on SonaTravel?',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      content: `Yes, you need to create an account so that you get the latest information about bus availability, ticket details and other features which will help you book faster during future transactions.`
    },
    {
      id: 'signup-process',
      title: 'How to sign-up SonaTravel?',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      content: `You can sign-up using your email. SonaTravel offers a one-step sign-up & login process with just an OTP received on your mobile.`
    },
    {
      id: 'arrival-time',
      title: 'How early should I arrive at the bus station before departure?',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: `It's recommended to arrive at least 30 minutes to an hour before the scheduled departure time. This allows for ticket verification, baggage check (if applicable), and boarding procedures.`
    },
    {
      id: 'bus-stops',
      title: 'Are there designated stops along the bus route?',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      content: `Yes, buses have designated stops along their routes. Passengers can board or alight at these stops. Make sure to check the bus schedule to know the specific stops for your journey.`
    },
    {
      id: 'food-drinks',
      title: 'Can I bring food and drinks on the bus?',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      content: `Our bus company allows passengers to bring snacks and non-alcoholic beverages. However, it's essential to be mindful of fellow passengers and keep the bus clean.`
    },
    {
      id: 'bus-tracking',
      title: 'Are there options for tracking the bus in real-time?',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      content: `Yes! our bus services offer real-time tracking through mobile apps or websites. This allows passengers to monitor the bus's location and estimated arrival time.`
    },
    {
      id: 'stt-benefits',
      title: 'What are the benefits that are provided by STT?',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      content: `Comfort, friendly environment and pleasant travels.`
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with Glassmorphism */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-100/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-64 h-64 bg-gradient-to-r from-purple-100/40 to-indigo-200/40 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-orange-100/25 to-amber-200/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-r from-green-100/30 to-emerald-200/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-600 font-medium">FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              FAQs
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Find quick and clear answers to common questions about our services, booking process, payment options, and travel policies. 
              If you need more help, our customer support team is always ready to assist.
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
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                  HELP CENTER
                </div>
                
                {/* 3D FAQ Icon */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl animate-pulse shadow-2xl"></div>
                    <div className="relative z-10 w-full h-full bg-gradient-to-br from-white via-blue-50 to-cyan-100 rounded-3xl shadow-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    {/* 3D Shadow Effect */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-gray-300/30 rounded-full blur-md"></div>
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 group-hover:scale-105 transition-transform duration-500">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Welcome to our FAQ section! Here you'll find answers to the most common questions about booking bus tickets, 
                    our services, and travel policies. We've organized these questions to help you find the information you need quickly and easily.
                  </p>
                  <div className="inline-flex items-center gap-3 bg-blue-50/60 backdrop-blur-sm border border-blue-200/40 rounded-full px-6 py-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-blue-700 font-medium">Here to help you travel better</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Sections */}
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={faq.id} className="relative">
                  <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-200/40 shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden">
                    
                    {/* Section Header */}
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleSection(faq.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* 3D Icon */}
                          <div className="relative">
                            <div className={`w-14 h-14 bg-gradient-to-br ${
                              index % 4 === 0 ? 'from-blue-400 via-blue-500 to-cyan-600' :
                              index % 4 === 1 ? 'from-purple-400 via-purple-500 to-indigo-600' :
                              index % 4 === 2 ? 'from-orange-400 via-orange-500 to-red-600' :
                              'from-green-400 via-green-500 to-emerald-600'
                            } rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden`}>
                              {/* Inner glow effect */}
                              <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                              <div className="text-white relative z-10">
                                {faq.icon}
                              </div>
                            </div>
                            {/* 3D Shadow */}
                            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-3 ${
                              index % 4 === 0 ? 'bg-blue-500/20' :
                              index % 4 === 1 ? 'bg-purple-500/20' :
                              index % 4 === 2 ? 'bg-orange-500/20' :
                              'bg-green-500/20'
                            } rounded-full blur-sm group-hover:scale-125 transition-all duration-500`}></div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                              {faq.title}
                            </h3>
                            <p className="text-gray-500 text-sm">Click to view answer</p>
                          </div>
                        </div>
                        
                        {/* Expand/Collapse Icon */}
                        <div className={`w-10 h-10 bg-gray-100/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeSection === faq.id ? 'rotate-180 bg-blue-100/60' : 'group-hover:bg-gray-200/60'
                        }`}>
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      activeSection === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6">
                        <div className="ml-18 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {faq.content}
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
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-bounce">
                  STILL NEED HELP?
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                    Can't Find What You're Looking For?
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    If you didn't find the answer to your question in our FAQ section, don't worry! 
                    Our friendly customer support team is here to help you with any questions or concerns you may have.
                    <br />
                    <strong>We're committed to making your journey with Sona Travel & Tours as smooth as possible.</strong>
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a href="mailto:info@sonatraveltours.com" className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Email Us</span>
                    </a>
                    
                    <a href="tel:+97798451222260" className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Call Us</span>
                    </a>
                    
                    <a href="/contact" className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
    </div>
  );
};

export default FAQs;
