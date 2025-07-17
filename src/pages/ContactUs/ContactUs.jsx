import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import FloatingActionBar from '../../components/common/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';

const ContactUs = () => {
  const { isVisible, socialActions } = useSocialActions();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with Glassmorphism */}
      <section className="relative pt-32 pb-16 overflow-hidden">        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-100/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-64 h-64 bg-gradient-to-r from-purple-100/40 to-pink-200/40 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-100/25 to-teal-200/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-r from-orange-100/30 to-amber-200/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">          {/* Hero Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-600 font-medium">GET IN TOUCH</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We're here to help make your journey unforgettable. Reach out to us for any questions, 
              booking assistance, or travel support.
            </p>
          </div>
        </div>
      </section>      {/* Main Content Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Contact Information Card */}
            <div className="relative h-full">
              {/* Glassmorphism Card */}
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-700 group h-full flex flex-col">
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                  24/7 SUPPORT
                </div>                <div className="space-y-8 flex-grow">
                  <div>
                    {/* 3D Contact Hero Image */}
                    <div className="flex justify-center mb-8">
                      <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse shadow-2xl"></div>
                        <div className="relative z-10 w-full h-full bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-full shadow-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                        </div>
                        {/* 3D Shadow Effect */}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-300/30 rounded-full blur-md"></div>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 group-hover:scale-105 transition-transform duration-500 text-center">
                      Get in Touch
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed text-center">
                      Our dedicated team is available around the clock to assist you with bookings, 
                      travel inquiries, and any support you might need.
                    </p>
                  </div>{/* Contact Details */}
                  <div className="space-y-6 flex-grow">                    {/* Email */}
                    <div className="flex items-center space-x-4 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30 hover:bg-white/60 transition-all duration-300 group relative overflow-hidden">
                      {/* 3D Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full transform translate-x-8 -translate-y-8"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full transform -translate-x-6 translate-y-6"></div>
                      </div>
                      
                      {/* 3D Icon Container */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden">
                          {/* Inner glow effect */}
                          <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                          <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        {/* 3D Shadow */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-cyan-500/20 rounded-full blur-sm group-hover:scale-125 transition-all duration-500"></div>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Email Address</p>
                        <p className="text-gray-800 text-lg font-bold group-hover:text-cyan-600 transition-colors duration-300">info@sonatraveltours.com</p>
                        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 mt-1"></div>
                      </div>
                    </div>                    {/* Phone */}
                    <div className="flex items-center space-x-4 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30 hover:bg-white/60 transition-all duration-300 group relative overflow-hidden">
                      {/* 3D Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full transform translate-x-8 -translate-y-8"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full transform -translate-x-6 translate-y-6"></div>
                      </div>
                      
                      {/* 3D Icon Container */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden">
                          {/* Inner glow effect */}
                          <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                          <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        {/* 3D Shadow */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-purple-500/20 rounded-full blur-sm group-hover:scale-125 transition-all duration-500"></div>
                      </div>
                        <div className="flex-1">
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Phone Numbers</p>
                        <p className="text-gray-800 text-lg font-bold group-hover:text-purple-600 transition-colors duration-300">(+977) 9802353260</p>
                        <p className="text-gray-800 text-lg font-bold group-hover:text-purple-600 transition-colors duration-300">(+977) 9802374215</p>
                        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 mt-1"></div>
                      </div>
                    </div>                    {/* Address */}
                    <div className="flex items-start space-x-4 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30 hover:bg-white/60 transition-all duration-300 group relative overflow-hidden">
                      {/* 3D Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full transform translate-x-8 -translate-y-8"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full transform -translate-x-6 translate-y-6"></div>
                      </div>
                      
                      {/* 3D Icon Container */}
                      <div className="relative mt-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden">
                          {/* Inner glow effect */}
                          <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                          <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        {/* 3D Shadow */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-emerald-500/20 rounded-full blur-sm group-hover:scale-125 transition-all duration-500"></div>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Office Locations</p>
                        <p className="text-gray-800 text-lg font-bold mb-2 group-hover:text-emerald-600 transition-colors duration-300">(HQ) Maharajgunj 03, Kathmandu</p>
                        <p className="text-gray-800 text-lg font-bold group-hover:text-emerald-600 transition-colors duration-300">(BO) Adarsha nagar 10, Birgunj</p>
                        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 mt-1"></div>
                      </div>
                    </div>                    {/* Office Hours */}
                    <div className="flex items-center space-x-4 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30 hover:bg-white/60 transition-all duration-300 group relative overflow-hidden">
                      {/* 3D Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full transform translate-x-8 -translate-y-8"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-red-400 to-orange-400 rounded-full transform -translate-x-6 translate-y-6"></div>
                      </div>
                      
                      {/* 3D Icon Container */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden">
                          {/* Inner glow effect */}
                          <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                          <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        {/* 3D Shadow */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-orange-500/20 rounded-full blur-sm group-hover:scale-125 transition-all duration-500"></div>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Office Hours</p>
                        <p className="text-gray-800 text-lg font-bold group-hover:text-orange-600 transition-colors duration-300">SUN - SAT (9 AM - 8 PM)</p>
                        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 mt-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>            {/* Contact Form Card */}
            <div className="relative h-full">
              {/* Glassmorphism Form Card */}
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-700 group h-full flex flex-col">
                {/* Floating Badge */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-bounce">
                  QUICK RESPONSE
                </div>                <div className="flex-grow">
                  {/* 3D Form Hero Section */}
                  <div className="text-center mb-8">
                    {/* 3D Message Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="relative w-24 h-24 group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl animate-pulse shadow-2xl transform rotate-6"></div>
                        <div className="relative z-10 w-full h-full bg-gradient-to-br from-white via-emerald-50 to-teal-100 rounded-2xl shadow-xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </div>
                        </div>
                        {/* 3D Shadow Effect */}
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-emerald-300/40 rounded-full blur-lg"></div>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 group-hover:scale-105 transition-transform duration-500">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </div>                  {/* Contact Form */}
                  <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
                    {/* Name Field */}
                    <div className="relative group">
                      {/* Field Label */}
                      <label className="block text-gray-700 text-sm font-semibold mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        {/* 3D Icon */}
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-md group-focus-within:scale-110 transition-transform duration-300">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-16 pr-6 py-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                          placeholder="Enter your full name"
                        />
                        {/* 3D Bottom Shadow */}
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full h-2 bg-blue-200/20 rounded-full blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Email and Phone Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email Field */}
                      <div className="relative group">
                        <label className="block text-gray-700 text-sm font-semibold mb-2 transition-colors duration-300 group-focus-within:text-cyan-600">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md group-focus-within:scale-110 transition-transform duration-300">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-16 pr-6 py-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:bg-white/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                            placeholder="your@email.com"
                          />
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full h-2 bg-cyan-200/20 rounded-full blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="relative group">
                        <label className="block text-gray-700 text-sm font-semibold mb-2 transition-colors duration-300 group-focus-within:text-purple-600">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-md group-focus-within:scale-110 transition-transform duration-300">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-16 pr-6 py-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                            placeholder="+977 98XXXXXXXX"
                          />
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full h-2 bg-purple-200/20 rounded-full blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="relative group">
                      <label className="block text-gray-700 text-sm font-semibold mb-2 transition-colors duration-300 group-focus-within:text-emerald-600">
                        Subject *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-md group-focus-within:scale-110 transition-transform duration-300">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                          </div>
                        </div>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-16 pr-6 py-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                          placeholder="What can we help you with?"
                        />
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full h-2 bg-emerald-200/20 rounded-full blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>                    {/* Message Field */}
                    <div className="relative group">
                      <label className="block text-gray-700 text-sm font-semibold mb-2 transition-colors duration-300 group-focus-within:text-orange-600">
                        Your Message *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-6 z-10">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center shadow-md group-focus-within:scale-110 transition-transform duration-300">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                        </div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full pl-16 pr-6 py-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white/70 transition-all duration-300 resize-none shadow-lg hover:shadow-xl"
                          placeholder="Tell us about your travel plans, questions, or how we can assist you..."
                        />
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full h-2 bg-orange-200/20 rounded-full blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="relative group">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full py-5 px-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                      >
                        {/* 3D Button Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Button Content */}
                        <div className="relative z-10">
                          {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-3">
                              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span className="text-lg">Sending Message...</span>
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center space-x-3 group-hover:space-x-4 transition-all duration-300">
                              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                              </div>
                              <span className="text-lg font-bold tracking-wide">Send Message</span>
                              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:-rotate-12 transition-transform duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* 3D Button Shadow */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-3 bg-indigo-500/30 rounded-full blur-lg group-hover:scale-110 transition-transform duration-300"></div>
                      </button>
                    </div>                    {/* Success Message */}
                    {submitStatus === 'success' && (
                      <div className="relative p-6 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm border border-green-200/60 rounded-2xl shadow-lg animate-fade-in">
                        {/* Success Icon */}
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-green-800 font-bold text-lg mb-1">Message Sent Successfully! 🎉</h4>
                            <p className="text-green-700 font-medium">
                              Thank you for reaching out! We've received your message and will get back to you within 24 hours.
                            </p>
                            <div className="mt-3 flex items-center space-x-2 text-green-600 text-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Expected response time: 2-24 hours</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-2 right-2 opacity-20">
                          <div className="w-8 h-8 bg-green-400 rounded-full animate-ping"></div>
                        </div>
                        <div className="absolute bottom-2 left-2 opacity-10">
                          <div className="w-6 h-6 bg-emerald-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Additional Info Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Map Section */}
            <div className="relative h-full">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-700 group h-full flex flex-col">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                  FIND US
                </div>                
                <h3 className="text-3xl font-bold text-gray-800 mb-6 group-hover:scale-105 transition-transform duration-500">
                  Our Locations
                </h3>
                  {/* Google Maps Iframe */}
                <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/30 overflow-hidden mb-6 flex-shrink-0">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220.72371009746533!2d85.32558519519672!3d27.730270916747184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1967680a4f19%3A0x5abd5fe1add52f2a!2sSona%20Consolidate%20Pvt%20Ltd!5e0!3m2!1sen!2snp!4v1749801676363!5m2!1sen!2snp" 
                    width="100%" 
                    height="300" 
                    style={{border: 0, borderRadius: '16px'}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sona Travel and Tours Location"
                    className="w-full h-[300px] rounded-2xl"
                  />
                  
                  {/* Map Overlay for Better Integration */}
                  <div className="absolute top-4 left-4 bg-white/60 backdrop-blur-sm border border-gray-200/30 rounded-lg px-3 py-2">
                    <p className="text-gray-800 text-sm font-medium">📍 Sona Consolidate Pvt Ltd</p>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2">
                    <p className="text-white text-xs font-medium">Interactive Map</p>
                  </div>
                </div>                {/* Location Details */}
                <div className="space-y-4 flex-grow">
                  <div className="p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-200/30">
                    <h4 className="text-gray-800 font-bold text-lg mb-2">Headquarters - Kathmandu</h4>
                    <p className="text-gray-600">Maharajgunj 03, Kathmandu, Nepal</p>
                    <p className="text-gray-500 text-sm mt-1">Main office with full services</p>
                  </div>
                  <div className="p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-200/30">
                    <h4 className="text-gray-800 font-bold text-lg mb-2">Branch Office - Birgunj</h4>
                    <p className="text-gray-600">Adarsha nagar 10, Birgunj, Nepal</p>
                    <p className="text-gray-500 text-sm mt-1">Regional office for southern routes</p>
                  </div>
                </div>
              </div>
            </div>            {/* Social Media & Quick Contact */}
            <div className="relative h-full">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/40 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-700 group h-full flex flex-col">
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-bounce">
                  SOCIAL
                </div>                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4 group-hover:scale-105 transition-transform duration-500">
                    Connect With Us
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Follow us on social media for the latest updates, travel tips, and exclusive offers!
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8 flex-grow">
                  {/* Social Media Icons */}
                  <a href="#" className="group/social">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group-hover/social:rotate-12 mx-auto">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm text-center mt-2">Twitter</p>
                  </a>

                  <a href="#" className="group/social">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group-hover/social:rotate-12 mx-auto">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm text-center mt-2">Facebook</p>
                  </a>

                  <a href="#" className="group/social">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group-hover/social:rotate-12 mx-auto">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm text-center mt-2">Pinterest</p>
                  </a>

                  <a href="#" className="group/social">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group-hover/social:rotate-12 mx-auto">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm text-center mt-2">YouTube</p>
                  </a>

                  <a href="#" className="group/social">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group-hover/social:rotate-12 mx-auto">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.0008 3.00703C14.7608 3.00703 15.0608 3.01703 16.1208 3.06703C17.1008 3.11703 17.6208 3.27703 17.9808 3.41703C18.4808 3.60703 18.8308 3.83703 19.2008 4.20703C19.5708 4.57703 19.8008 4.92703 19.9908 5.42703C20.1308 5.78703 20.2908 6.30703 20.3408 7.28703C20.3908 8.34703 20.4008 8.64703 20.4008 11.4070C20.4008 14.1670 20.3908 14.4670 20.3408 15.5270C20.2908 16.5070 20.1308 17.0270 19.9908 17.3870C19.8008 17.8870 19.5708 18.2370 19.2008 18.6070C18.8308 18.9770 18.4808 19.2070 17.9808 19.3970C17.6208 19.5370 17.1008 19.6970 16.1208 19.7470C15.0608 19.7970 14.7608 19.8070 12.0008 19.8070C9.24076 19.8070 8.94076 19.7970 7.88076 19.7470C6.90076 19.6970 6.38076 19.5370 6.02076 19.3970C5.52076 19.2070 5.17076 18.9770 4.80076 18.6070C4.43076 18.2370 4.20076 17.8870 4.01076 17.3870C3.87076 17.0270 3.71076 16.5070 3.66076 15.5270C3.61076 14.4670 3.60076 14.1670 3.60076 11.4070C3.60076 8.64703 3.61076 8.34703 3.66076 7.28703C3.71076 6.30703 3.87076 5.78703 4.01076 5.42703C4.20076 4.92703 4.43076 4.57703 4.80076 4.20703C5.17076 3.83703 5.52076 3.60703 6.02076 3.41703C6.38076 3.27703 6.90076 3.11703 7.88076 3.06703C8.94076 3.01703 9.24076 3.00703 12.0008 3.00703ZM12.0008 1.20703C9.20076 1.20703 8.87076 1.21703 7.79076 1.26703C6.71076 1.31703 5.95076 1.48703 5.30076 1.73703C4.61076 2.00703 4.02076 2.36703 3.43076 2.95703C2.84076 3.54703 2.48076 4.13703 2.21076 4.82703C1.96076 5.47703 1.79076 6.23703 1.74076 7.31703C1.69076 8.39703 1.68076 8.72703 1.68076 11.5270C1.68076 14.3270 1.69076 14.6570 1.74076 15.7370C1.79076 16.8170 1.96076 17.5770 2.21076 18.2270C2.48076 18.9170 2.84076 19.5070 3.43076 20.0970C4.02076 20.6870 4.61076 21.0470 5.30076 21.3170C5.95076 21.5670 6.71076 21.7370 7.79076 21.7870C8.87076 21.8370 9.20076 21.8470 12.0008 21.8470C14.8008 21.8470 15.1308 21.8370 16.2108 21.7870C17.2908 21.7370 18.0508 21.5670 18.7008 21.3170C19.3908 21.0470 19.9808 20.6870 20.5708 20.0970C21.1608 19.5070 21.5208 18.9170 21.7908 18.2270C22.0408 17.5770 22.2108 16.8170 22.2608 15.7370C22.3108 14.6570 22.3208 14.3270 22.3208 11.5270C22.3208 8.72703 22.3108 8.39703 22.2608 7.31703C22.2108 6.23703 22.0408 5.47703 21.7908 4.82703C21.5208 4.13703 21.1608 3.54703 20.5708 2.95703C19.9808 2.36703 19.3908 2.00703 18.7008 1.73703C18.0508 1.48703 17.2908 1.31703 16.2108 1.26703C15.1308 1.21703 14.8008 1.20703 12.0008 1.20703Z"/>
                        <path d="M12.0008 6.40703C9.06076 6.40703 6.68076 8.78703 6.68076 11.7270C6.68076 14.6670 9.06076 17.0470 12.0008 17.0470C14.9408 17.0470 17.3208 14.6670 17.3208 11.7270C17.3208 8.78703 14.9408 6.40703 12.0008 6.40703ZM12.0008 15.2470C10.0408 15.2470 8.48076 13.6870 8.48076 11.7270C8.48076 9.76703 10.0408 8.20703 12.0008 8.20703C13.9608 8.20703 15.5208 9.76703 15.5208 11.7270C15.5208 13.6870 13.9608 15.2470 12.0008 15.2470Z"/>
                        <path d="M18.6908 6.19703C18.6908 6.89703 18.1208 7.46703 17.4208 7.46703C16.7208 7.46703 16.1508 6.89703 16.1508 6.19703C16.1508 5.49703 16.7208 4.92703 17.4208 4.92703C18.1208 4.92703 18.6908 5.49703 18.6908 6.19703Z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm text-center mt-2">Instagram</p>
                  </a>

                  <a href="#" className="group/social">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group-hover/social:rotate-12 mx-auto">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm text-center mt-2">LinkedIn</p>
                  </a>                </div>

                {/* Quick Contact Buttons */}
                <div className="space-y-4 flex-shrink-0">
                  <a href="tel:+97798451222260" className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call Now</span>
                  </a>
                  
                  <a href="mailto:info@sonatraveltours.com" className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Send Email</span>
                  </a>
                  
                  <a href="#" className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.109"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActionBar
        isVisible={isVisible}
        socialActions={socialActions}
      />
    </div>
  );
};

export default ContactUs;
