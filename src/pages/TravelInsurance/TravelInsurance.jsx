import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import FloatingActionBar from '../Home/ComponentHome/UI/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';

const TravelInsurance = () => {
  const { handleSocialClick } = useSocialActions();
  const [activeSection, setActiveSection] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const insurancePlans = [
    {
      id: 'essential',
      name: 'Essential Shield',
      coverage: '₹3,00,000',
      price: '₹199',
      duration: 'Per Journey',
      features: [
        'Accidental Death Cover',
        'Medical Emergency Treatment',
        'Trip Cancellation Protection',
        '24/7 Emergency Assistance',
        'Baggage Loss Coverage',
        'Emergency Evacuation'
      ],
      popular: false,
      color: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium Protection',
      coverage: '₹5,00,000',
      price: '₹299',
      duration: 'Per Journey',
      features: [
        'Complete Accidental Death & Disability',
        'Comprehensive Medical Coverage',
        'Trip Cancellation & Interruption',
        '24/7 Premium Emergency Support',
        'Enhanced Baggage Protection',
        'Personal Liability Coverage',
        'Emergency Medical Evacuation',
        'COVID-19 Protection'
      ],
      popular: true,
      color: 'emerald'
    },
    {
      id: 'family',
      name: 'Family Guardian',
      coverage: '₹5,00,000',
      price: '₹699',
      duration: 'Per Family (up to 6 members)',
      features: [
        'Family Coverage (6 members max)',
        'Individual ₹5 Lakh Coverage Each',
        'Complete Medical Protection',
        'Family Trip Cancellation',
        '24/7 Family Emergency Hotline',
        'Enhanced Child Protection',
        'Group Emergency Evacuation',
        'COVID-19 Family Shield'
      ],
      popular: false,
      color: 'orange'
    }
  ];

  const coverageDetails = [
    {
      id: 'medical',
      title: 'Medical Emergency Coverage',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Comprehensive medical coverage up to ₹5,00,000 per person for unexpected medical emergencies during your Sona Travel journey.',
      benefits: [
        'Hospitalization expenses up to ₹5 Lakh',
        'Emergency medical treatment',
        'Doctor consultation & specialist fees',
        'Prescription medications',
        'Ambulance & emergency transport'
      ]
    },
    {
      id: 'accident',
      title: 'Accidental Death & Disability',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: 'Complete financial protection for you and your family with ₹5,00,000 coverage in case of accidental death or permanent disability.',
      benefits: [
        'Accidental death compensation ₹5 Lakh',
        'Permanent disability benefits',
        'Temporary disability support',
        'Emergency repatriation services',
        'Funeral & final expense coverage'
      ]
    },
    {
      id: 'trip',
      title: 'Trip Cancellation & Interruption',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Complete protection for trip cancellations, delays, and interruptions due to unforeseen circumstances with Sona Travel.',
      benefits: []
    },
    {
      id: 'baggage',
      title: 'Baggage & Personal Effects',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      description: 'Enhanced protection against loss, theft, or damage to your personal belongings during Sona Travel journeys.',
      benefits: []
    }
  ];

  const claimProcess = [
    {
      step: 1,
      title: 'Report Incident',
      description: 'Immediately contact our 24/7 Sona Travel Insurance helpline',
      icon: '📞',
      color: 'blue'
    },
    {
      step: 2,
      title: 'Submit Documents',
      description: 'Upload required documents through our secure online portal',
      icon: '📄',
      color: 'emerald'
    },
    {
      step: 3,
      title: 'Quick Assessment',
      description: 'Our expert team reviews your claim within 24-48 hours',
      icon: '🔍',
      color: 'orange'
    },
    {
      step: 4,
      title: 'Fast Settlement',
      description: 'Claim amount processed and transferred to your account',
      icon: '💰',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/40 relative overflow-hidden">
      <Header />
      
      {/* Hero Section with Glassmorphism */}
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
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-600 font-medium">SONA TRAVEL INSURANCE</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Travel Insurance
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              <strong>Sona Travel & Tours</strong> provides you with complete travel insurance protection including <strong>₹5,00,000 per person accidental death coverage</strong> and comprehensive medical benefits. 
              Travel with absolute confidence knowing you and your family are fully protected.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-4 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction Card */}
            <div className="relative mb-12">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl hover:scale-[1.01] transition-all duration-700 group">
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                  UP TO ₹5 LAKH
                </div>
                
                {/* 3D Insurance Icon */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl animate-pulse shadow-2xl"></div>
                    <div className="relative z-10 w-full h-full bg-gradient-to-br from-white via-emerald-50 to-blue-100 rounded-3xl shadow-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors duration-500">
                    Complete Travel Protection with Death Coverage
                  </h2>
                  
                  <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                    At <strong>Sona Travel & Tours</strong>, we provide you with complete peace of mind through comprehensive travel insurance. 
                    Our policy includes <strong>₹5,00,000 per person accidental death coverage</strong> along with full medical protection, 
                    ensuring your family's financial security during your journey.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-6 max-w-4xl mx-auto">
                    <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                      <div className="text-2xl font-bold text-emerald-600">₹5 Lakh</div>
                      <div className="text-sm text-gray-600">Death Coverage</div>
                    </div>
                    <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                      <div className="text-2xl font-bold text-blue-600">₹5 Lakh</div>
                      <div className="text-sm text-gray-600">Medical Coverage</div>
                    </div>
                    <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                      <div className="text-2xl font-bold text-orange-600">24/7</div>
                      <div className="text-sm text-gray-600">Emergency Support</div>
                    </div>
                    <div className="text-center p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                      <div className="text-2xl font-bold text-purple-600">100%</div>
                      <div className="text-sm text-gray-600">Secure Coverage</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Details Section */}
            <div className="space-y-6 mb-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-6">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-600 font-medium">COMPLETE PROTECTION</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  Full Insurance Coverage
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Sona Travel provides complete insurance protection including ₹5 lakh death coverage per person
                </p>
              </div>

              {coverageDetails.map((detail, index) => (
                <div key={detail.id} className="group">
                  <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-200/40 shadow-xl hover:shadow-2xl hover:bg-white/70 transition-all duration-500 overflow-hidden">
                    {/* Section Header */}
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleSection(detail.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          {/* 3D Icon */}
                          <div className="relative">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-500 ${
                              index % 3 === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                              index % 3 === 1 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                              'bg-gradient-to-r from-orange-500 to-orange-600'
                            }`}>
                              <div className="relative z-10">
                                {detail.icon}
                              </div>
                            </div>
                            {/* 3D Shadow */}
                            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-3 ${
                              index % 3 === 0 ? 'bg-blue-500/20' :
                              index % 3 === 1 ? 'bg-emerald-500/20' :
                              'bg-orange-500/20'
                            } rounded-full blur-sm group-hover:scale-125 transition-all duration-500`}></div>
                          </div>
                          
                          <div>
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                              {detail.title}
                            </h3>
                            <p className="text-gray-500 text-sm">Click to expand details</p>
                          </div>
                        </div>
                        
                        {/* Expand/Collapse Icon */}
                        <div className={`w-10 h-10 bg-gray-100/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeSection === detail.id ? 'rotate-180 bg-emerald-100/60' : 'group-hover:bg-gray-200/60'
                        }`}>
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      activeSection === detail.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6">
                        <div className="ml-22 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30">
                          <p className="text-gray-700 leading-relaxed text-lg mb-4">
                            {detail.description}
                          </p>
                          <ul className="space-y-2">
                            {detail.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Claim Process Section */}
            <div className="mt-16">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl transition-all duration-700">
                {/* Section Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-6">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-purple-600 font-medium">CLAIM PROCESS</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                    Simple Claim Process
                  </h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Easy and hassle-free claim settlement with Sona Travel Insurance in just 4 simple steps
                  </p>
                </div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                  {claimProcess.map((step, index) => (
                    <div key={step.step} className="relative group">
                      {/* Card Container */}
                      <div className="bg-white/50 backdrop-blur-lg rounded-[2rem] p-6 lg:p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl hover:bg-white/70 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-700 ease-out h-full">
                        
                        {/* Step Number Badge */}
                        <div className="flex justify-center mb-6">
                          <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-all duration-500 ${
                            step.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                            step.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                            step.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                            'bg-gradient-to-br from-purple-500 to-purple-600'
                          }`}>
                            {step.step}
                            {/* 3D Shadow Effect */}
                            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-2 ${
                              step.color === 'blue' ? 'bg-blue-500/30' :
                              step.color === 'emerald' ? 'bg-emerald-500/30' :
                              step.color === 'orange' ? 'bg-orange-500/30' :
                              'bg-purple-500/30'
                            } rounded-full blur-sm group-hover:scale-125 transition-all duration-500`}></div>
                          </div>
                        </div>
                        
                        {/* Icon */}
                        <div className="text-center mb-6">
                          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                            {step.icon}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="text-center">
                          <h3 className={`text-xl lg:text-2xl font-bold mb-3 group-hover:scale-105 transition-all duration-300 ${
                            step.color === 'blue' ? 'text-blue-600 group-hover:text-blue-700' :
                            step.color === 'emerald' ? 'text-emerald-600 group-hover:text-emerald-700' :
                            step.color === 'orange' ? 'text-orange-600 group-hover:text-orange-700' :
                            'text-purple-600 group-hover:text-purple-700'
                          }`}>
                            {step.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                            {step.description}
                          </p>
                        </div>

                        {/* Connecting Arrow for Desktop */}
                        {index < claimProcess.length - 1 && (
                          <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
                              step.color === 'blue' ? 'bg-blue-500' :
                              step.color === 'emerald' ? 'bg-emerald-500' :
                              step.color === 'orange' ? 'bg-orange-500' :
                              'bg-purple-500'
                            }`}>
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        )}

                        {/* Connecting Arrow for Mobile */}
                        {index < claimProcess.length - 1 && (
                          <div className="lg:hidden flex justify-center mt-6">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg rotate-90 ${
                              step.color === 'blue' ? 'bg-blue-500' :
                              step.color === 'emerald' ? 'bg-emerald-500' :
                              step.color === 'orange' ? 'bg-orange-500' :
                              'bg-purple-500'
                            }`}>
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                  <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                    File a Claim Now
                  </button>
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="mt-16">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-[3rem] p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl transition-all duration-700 group">
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-orange-600 text-white px-4 py-2 rounded-[2rem] text-sm font-bold shadow-lg animate-pulse">
                  24/7 SUPPORT
                </div>
                
                {/* Section Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-6">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-600 font-medium">EMERGENCY ASSISTANCE</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
                    24/7 Emergency Support
                  </h2>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    Our dedicated emergency assistance team is available round the clock to help you during any travel emergency with Sona Travel Insurance.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Emergency Hotline */}
                  <div className="group/contact">
                    <div className="relative bg-white/50 backdrop-blur-lg rounded-[2rem] p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl hover:bg-white/70 hover:scale-[1.02] transition-all duration-500 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover/contact:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Hotline</h3>
                      <p className="text-2xl font-bold text-red-600 mb-1">1800-SONA-911</p>
                      <p className="text-gray-600 text-sm">Toll-free 24/7 Support</p>
                    </div>
                  </div>

                  {/* Email Support */}
                  <div className="group/contact">
                    <div className="relative bg-white/50 backdrop-blur-lg rounded-[2rem] p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl hover:bg-white/70 hover:scale-[1.02] transition-all duration-500 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover/contact:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Support</h3>
                      <p className="text-lg text-blue-600 mb-1">insurance@sonatours.com</p>
                      <p className="text-gray-600 text-sm">24/7 Email Assistance</p>
                    </div>
                  </div>

                  {/* Live Chat */}
                  <div className="group/contact">
                    <div className="relative bg-white/50 backdrop-blur-lg rounded-[2rem] p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl hover:bg-white/70 hover:scale-[1.02] transition-all duration-500 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover/contact:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Live Chat</h3>
                      <p className="text-lg text-emerald-600 mb-1">Available Now</p>
                      <p className="text-gray-600 text-sm">Instant Assistance</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-red-400/40 rounded-full animate-ping"></div>
                <div className="absolute top-8 right-8 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-6 left-6 w-2.5 h-2.5 bg-emerald-400/40 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl transition-all duration-700 group text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors duration-500">
                  Get Full Insurance Protection with Sona Travel
                </h3>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Don't let unexpected events ruin your Sona Travel experience. Get comprehensive protection with coverage up to ₹5,00,000 per person for accidental death and complete medical coverage.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Get Quote Now
                  </button>
                  <button className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105">
                    Compare Plans
                  </button>
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

export default TravelInsurance;
