import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import FloatingActionBar from '../../components/common/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';

const HotelsPage = () => {
  const { isVisible, socialActions } = useSocialActions();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set launch date (example: 30 days from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hotelFeatures = [
    {
      icon: "🏨",
      title: "Luxury Hotels",
      description: "Premium accommodations with world-class amenities"
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Guaranteed lowest prices with exclusive deals"
    },
    {
      icon: "📍",
      title: "Prime Locations",
      description: "Hotels in the heart of popular destinations"
    },
    {
      icon: "⭐",
      title: "Top Rated",
      description: "Carefully selected 4-5 star properties"
    },
    {
      icon: "🎯",
      title: "Easy Booking",
      description: "Simple and secure booking process"
    },
    {
      icon: "🔄",
      title: "Free Cancellation",
      description: "Flexible cancellation policies"
    }
  ];

  const popularDestinations = [
    { 
      name: "Kathmandu", 
      hotels: "150+ Hotels",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      name: "Pokhara", 
      hotels: "80+ Hotels",
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      name: "Chitwan", 
      hotels: "45+ Hotels",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      name: "Bhaktapur", 
      hotels: "30+ Hotels",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      name: "Nagarkot", 
      hotels: "25+ Hotels",
      image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      name: "Bandipur", 
      hotels: "20+ Hotels",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-orange-100/30 to-amber-100/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
      </div>

      <Header />
      
      <main className="pt-[80px] relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/60 backdrop-blur-xl border border-gray-200/60 text-blue-800 text-sm font-medium mb-8 shadow-2xl">
                <span className="animate-pulse mr-2">🚀</span>
                Coming Soon
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Find Your Perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Hotel Stay
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                We're working hard to bring you the best hotel booking experience in Nepal. 
                Discover amazing accommodations at unbeatable prices.
              </p>

              {/* Countdown Timer */}
              <div className="flex justify-center items-center space-x-4 mb-12">
                <div className="text-center">
                  <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 min-w-[90px] border border-gray-200/40 hover:bg-white/80 transition-all duration-300">
                    <div className="text-3xl font-bold text-blue-600">{timeLeft.days}</div>
                    <div className="text-sm text-gray-500">Days</div>
                  </div>
                </div>
                <div className="text-2xl text-gray-400">:</div>
                <div className="text-center">
                  <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 min-w-[90px] border border-gray-200/40 hover:bg-white/80 transition-all duration-300">
                    <div className="text-3xl font-bold text-indigo-600">{timeLeft.hours}</div>
                    <div className="text-sm text-gray-500">Hours</div>
                  </div>
                </div>
                <div className="text-2xl text-gray-400">:</div>
                <div className="text-center">
                  <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 min-w-[90px] border border-gray-200/40 hover:bg-white/80 transition-all duration-300">
                    <div className="text-3xl font-bold text-purple-600">{timeLeft.minutes}</div>
                    <div className="text-sm text-gray-500">Minutes</div>
                  </div>
                </div>
                <div className="text-2xl text-gray-400">:</div>
                <div className="text-center">
                  <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 min-w-[90px] border border-gray-200/40 hover:bg-white/80 transition-all duration-300">
                    <div className="text-3xl font-bold text-pink-600">{timeLeft.seconds}</div>
                    <div className="text-sm text-gray-500">Seconds</div>
                  </div>
                </div>
              </div>

              {/* Notify Button */}
              <div className="max-w-md mx-auto">
                <div className="flex rounded-2xl shadow-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-gray-200/40">
                  <input
                    type="email"
                    placeholder="Enter your email for updates"
                    className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:ring-0 focus:outline-none"
                  />
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Notify Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
          {/* Dark section animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What to Expect
              </h2>
              <p className="text-xl text-white/80">
                Amazing features coming your way
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotelFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 p-8 border border-white/20 hover:border-white/40 transform hover:-translate-y-2 hover:scale-105"
                >
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Destinations Preview */}
        <section className="py-20 relative bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Destinations
              </h2>
              <p className="text-xl text-gray-600">
                Discover amazing hotels in these beautiful locations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularDestinations.map((destination, index) => (
                <div
                  key={index}
                  className="group bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-gray-200/40 hover:border-gray-300/60"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={`Hotels in ${destination.name}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-2xl font-bold drop-shadow-lg">{destination.name}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {destination.hotels}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 relative bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Be the First to Know
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Get exclusive early access, special discounts, and be notified when we launch!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 rounded-2xl text-white placeholder-white/60 bg-white/10 backdrop-blur-sm border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition-all duration-300"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-2xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Subscribe
                </button>
              </div>
              
              <p className="text-white/60 text-sm mt-4">
                * We respect your privacy. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Progress Section */}
        <section className="py-20 relative bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Development Progress
              </h2>
              <p className="text-xl text-gray-600">
                We're working hard to bring you the best experience
              </p>
            </div>

            <div className="space-y-6">
              {[
                { task: "Hotel Search & Filter System", progress: 85, color: "from-cyan-500 to-blue-500" },
                { task: "Booking Management", progress: 70, color: "from-blue-500 to-indigo-500" },
                { task: "Payment Integration", progress: 60, color: "from-indigo-500 to-purple-500" },
                { task: "User Reviews & Ratings", progress: 45, color: "from-purple-500 to-pink-500" },
                { task: "Mobile App", progress: 30, color: "from-pink-500 to-rose-500" }
              ].map((item, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/40 hover:border-gray-300/60 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.task}
                    </h3>
                    <span className="text-blue-600 font-medium text-lg">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200/60 rounded-full h-3 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000 shadow-lg`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActionBar
        isVisible={isVisible}
        socialActions={socialActions}
      />
    </div>
  );
};

export default HotelsPage;
