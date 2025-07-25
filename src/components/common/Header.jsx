import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { isAuthenticated } from '@/utils/authGuard';
import { API_URLS } from '../../config/api';
import weatherService from '../../services/weatherService';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [weather, setWeather] = useState({
    temperature: 'Loading...',
    location: 'Loading...',
    description: 'Loading...'
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to get user first name from profile API or storage
  const getUserName = async () => {
    try {
      // If user is authenticated, always try to fetch fresh profile data
      if (isAuthenticated()) {
        try {
          const profileData = await fetchUserProfile();
          if (profileData && profileData.firstName) {
            console.log('Retrieved firstName from API:', profileData.firstName);
            // Cache the name for future use
            localStorage.setItem('userFirstName', profileData.firstName);
            return profileData.firstName;
          }
        } catch (error) {
          console.warn('Failed to fetch profile from API:', error);
        }
      }

      // Fallback to cached data if API call fails
      const cachedName = getCachedUserName();
      return cachedName;
    } catch (error) {
      console.error('Error getting user name:', error);
      return '';
    }
  };

  // Helper function to get cached user name from storage
  const getCachedUserName = () => {
    // Check for cached firstName first
    let firstName = localStorage.getItem('userFirstName');
    if (firstName && firstName !== 'User') {
      console.log('Found cached firstName:', firstName);
      return firstName;
    }

    // Try to get from user profile data in localStorage
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      try {
        const profile = JSON.parse(userProfile);
        console.log('userProfile data:', profile);
        
        if (profile.firstName) {
          console.log('Found firstName in userProfile:', profile.firstName);
          localStorage.setItem('userFirstName', profile.firstName);
          return profile.firstName;
        }
      } catch (e) {
        console.warn('Error parsing userProfile:', e);
      }
    }

    console.log('No cached user name found');
    return '';
  };

  // Function to fetch user profile from API
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await fetch(API_URLS.PROFILE.GET, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        // Store the profile data for future use
        localStorage.setItem('userProfile', JSON.stringify(result.data));
        return result.data;
      }
      
      throw new Error(result.message || 'Failed to fetch profile');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get weather information based on user's current location
    const getWeatherByLocation = async () => {
      try {
        const weatherData = await weatherService.getWeatherByLocation();
        setWeather(weatherData);
      } catch (error) {
        console.error("Error getting weather:", error);
        setWeather({
          temperature: 'N/A',
          location: 'Nepal',
          description: 'Weather unavailable'
        });
      }
    };

    // Get user name and set up listener for changes
    const updateUserName = async () => {
      // Debug: Log ALL available localStorage data
      console.log('=== ALL localStorage Keys ===');
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`${key}:`, value);
      }
      
      console.log('=== ALL sessionStorage Keys ===');
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        console.log(`${key}:`, value);
      }
      
      try {
        const name = await getUserName();
        console.log('Final resolved name:', name);
        setUserName(name);
      } catch (error) {
        console.error('Error updating user name:', error);
        setUserName('');
      }
    };

    // Initial load
    updateUserName();
    getWeatherByLocation();

    // Listen for storage changes (when user logs in/out)
    window.addEventListener('storage', updateUserName);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('storage', updateUserName);
    };
  }, []);return (
    <header className="backdrop-blur-md bg-white/80 border-b border-[#ececec]/60 h-[70px] sm:h-[80px] w-full fixed top-0 left-0 right-0 shadow-md z-50 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/10 after:to-white/20 after:z-[-1]">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 h-full flex items-center justify-between relative">
        {/* Decorative blobs for enhanced glass morphism effect */}
        <div className="absolute -top-10 -left-20 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-[#ff8f1f]/15 blur-3xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-[#0a639d]/15 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute -bottom-10 left-1/3 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-[#ff8f1f]/10 blur-2xl animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        
        <div className="flex items-center relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/images/img_logo_with_name_png_1.png" 
              alt="Sona Travel & Tours Logo" 
              className="h-8 sm:h-9 lg:h-10 w-auto"
            />
            
            {/* Static Decorative Ava Section with Lines */}
            <div className="flex items-center gap-2">
              {/* Left decorative line */}
              <div className="flex items-center gap-1">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-[#ff8f1f] to-[#0a639d] rounded-full opacity-60"></div>
                <div className="w-1 h-1 bg-[#ff8f1f] rounded-full animate-pulse"></div>
              </div>
              
              {/* Static Ava Image */}
              <div className="relative">
                <img 
                  src="/images/ava.png" 
                  alt="Ava AI Assistant" 
                  className="h-6 sm:h-7 lg:h-8 w-auto drop-shadow-lg"
                />
                {/* Active indicator */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              
              {/* Right decorative line */}
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-[#0a639d] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-[#0a639d] via-[#ff8f1f] to-transparent rounded-full opacity-60"></div>
              </div>
            </div>
          </Link>
        </div>        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 relative z-10">
          <Link to="/" className="text-[#5f5f5f] text-sm xl:text-base font-medium hover:text-[#0a639d] transition-all duration-300 cursor-pointer hover:scale-105 hover:font-semibold">
            Home
          </Link>
          <Link to="/bus-routes" className="text-[#5f5f5f] text-sm xl:text-base font-medium hover:text-[#0a639d] transition-all duration-300 cursor-pointer hover:scale-105 hover:font-semibold">
            Bus Routes
          </Link>
          <Link to="/trending-offers" className="text-[#5f5f5f] text-sm xl:text-base font-medium hover:text-[#0a639d] transition-all duration-300 cursor-pointer hover:scale-105 hover:font-semibold">
            Offers
          </Link>
          <Link to="/live-track" className="text-[#5f5f5f] text-sm xl:text-base font-medium hover:text-[#0a639d] transition-all duration-300 cursor-pointer hover:scale-105 hover:font-semibold">
            Live Track
          </Link>
          <Link to="/feed" className="text-[#5f5f5f] text-sm xl:text-base font-medium hover:text-[#0a639d] transition-all duration-300 cursor-pointer hover:scale-105 hover:font-semibold">
            Feeds
          </Link>
          <Link to="/faqs" className="text-[#5f5f5f] text-sm xl:text-base font-medium hover:text-[#0a639d] transition-all duration-300 cursor-pointer hover:scale-105 hover:font-semibold">
            FAQs
          </Link>

          <Link to="/contact" className="text-[#5f5f5f] text-sm xl:text-base font-medium hover:text-[#0a639d] transition-all duration-300 cursor-pointer hover:scale-105 hover:font-semibold">
            Contact Us
          </Link>

          {/* Time and Weather Section */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {/* Time Section */}
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl px-2 lg:px-4 py-1.5 lg:py-2 shadow-lg hover:bg-white/30 transition-all duration-300">
              <div className="flex items-center gap-1.5 lg:gap-2">
                <div className="text-base lg:text-lg">🕐</div>
                <div className="text-right">
                  <div className="text-[#0a639d] font-bold text-xs lg:text-sm leading-none">
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </div>
                  <div className="text-[#5f5f5f] text-xs">
                    {currentTime.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>           
             {/* Weather Section */}
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl px-2 lg:px-4 py-1.5 lg:py-2 shadow-lg hover:bg-white/30 transition-all duration-300 min-w-[140px] lg:min-w-[180px]">
              <div className="flex items-center gap-1.5 lg:gap-2">
                <div className="text-base lg:text-lg flex-shrink-0">🌤️</div>
                <div className="text-right flex-1 min-w-0">
                  <div className="flex items-center gap-1 justify-end mb-0.5">
                    <span className="text-[#0a639d] font-bold text-xs lg:text-sm">
                      {weather.temperature}
                    </span>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                  </div>
                  <div className="text-[#5f5f5f] text-xs capitalize leading-tight text-right truncate">
                    {weather.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>       
        <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
          {isAuthenticated() ? (
            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Greeting Text */}
              {userName && (
                <div className="text-[#5f5f5f] text-sm lg:text-base font-medium">
                  Hi, <span className="text-[#0a639d] font-semibold">
                    {userName}
                  </span>
                </div>
              )}
              
              <div className="relative">
  {/* Profile Photo */}
              <div 
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-[#0a639d] transition-all group"
              >
                <img 
                  src="/images/profileimg.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-10 lg:top-12 bg-white shadow-lg rounded-lg border border-gray-200 py-2 w-44 lg:w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    to="/user-profile"
                    className="block px-3 lg:px-4 py-2 text-sm text-[#5f5f5f] hover:bg-gray-100 hover:text-[#0a639d] transition-colors"
                  >
                    My Dashboard
                  </Link>
                  <Link 
                    to="/profile?tab=mybookings"
                    className="block px-3 lg:px-4 py-2 text-sm text-[#5f5f5f] hover:bg-gray-100 hover:text-[#0a639d] transition-colors"
                  >
                    My Bookings
                  </Link>
                  <button
        onClick={() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('token');
          sessionStorage.removeItem('authToken');
          sessionStorage.removeItem('token');
          window.location.href = '/';
        }}
        className="block w-full text-left px-3 lg:px-4 py-2 text-sm text-[#5f5f5f] hover:bg-gray-100 hover:text-[#0a639d] transition-colors"
      >
        Logout
      </button>
                </div>
              </div>
            </div>
            </div>
          ) : (
            <>
              <Link 
                to="/login"
                className="text-[#5f5f5f] text-sm lg:text-base font-medium hover:text-[#0a639d] transition-colors px-2 lg:px-3 py-2"
              >
                Login
              </Link>
              <Link to="/signup">
                <Button 
                  variant="primary" 
              className="bg-[#0a639d] rounded-lg h-[38px] lg:h-[45px] px-3 lg:px-4 flex items-center hover:bg-[#07456e] transition-colors"
            >
              <img 
                src="/images/img_hicon_outline_profile_1.svg" 
                alt="Profile Icon" 
                className="w-4 h-4 lg:w-5 lg:h-5 mr-1.5 lg:mr-2"
              />
              <span className="text-sm lg:text-lg font-bold">Sign Up</span>
            </Button>
          </Link>
          </>
            
          )}
        </div>
  

       

        {/* Mobile/Tablet Menu Button */}
        <div className="lg:hidden flex items-center space-x-2">
          {/* Mobile Time/Weather - Compact - Only show on md screens */}
          <div className="hidden md:block backdrop-blur-xl bg-white/20 border border-white/30 rounded-lg px-2 py-1 shadow-lg">
            <div className="flex items-center gap-1.5">
              <div className="text-sm">🕐</div>
              <span className="text-[#0a639d] font-bold text-xs">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </span>
            </div>
          </div>
          
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[70px] sm:top-[80px] left-0 right-0 bg-white/95 backdrop-blur-md py-4 sm:py-6 px-4 sm:px-5 shadow-lg border-b border-[#ececec]/60 z-50 max-h-[calc(100vh-70px)] sm:max-h-[calc(100vh-80px)] overflow-y-auto">
          
          {/* Mobile Time and Weather Section */}
          <div className="md:hidden mb-4 grid grid-cols-2 gap-3">
            {/* Time Section */}
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="text-lg">🕐</div>
                <div className="text-left">
                  <div className="text-[#0a639d] font-bold text-sm leading-none">
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </div>
                  <div className="text-[#5f5f5f] text-xs">
                    {currentTime.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Weather Section */}
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="text-lg flex-shrink-0">🌤️</div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[#0a639d] font-bold text-sm">
                      {weather.temperature}
                    </span>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                  </div>
                  <div className="text-[#5f5f5f] text-xs capitalize leading-tight truncate">
                    {weather.description}
                  </div>
                </div>
              </div>
            </div>
          </div>          <nav className="flex flex-col space-y-4 sm:space-y-5">
            <Link 
              to="/" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-all duration-300 py-2 border-b border-gray-100 last:border-b-0 cursor-pointer hover:scale-105 hover:font-semibold hover:pl-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/bus-routes" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-all duration-300 py-2 border-b border-gray-100 last:border-b-0 cursor-pointer hover:scale-105 hover:font-semibold hover:pl-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Bus Routes
            </Link>
            <Link 
              to="/trending-offers" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-all duration-300 py-2 border-b border-gray-100 last:border-b-0 cursor-pointer hover:scale-105 hover:font-semibold hover:pl-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Exclusive Offers
            </Link>
            <Link 
              to="/live-track" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-all duration-300 py-2 border-b border-gray-100 last:border-b-0 cursor-pointer hover:scale-105 hover:font-semibold hover:pl-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Live Track
            </Link>
            <Link 
              to="/feed" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-all duration-300 py-2 border-b border-gray-100 last:border-b-0 cursor-pointer hover:scale-105 hover:font-semibold hover:pl-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Feeds
            </Link>
            <Link 
              to="/faqs" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-all duration-300 py-2 border-b border-gray-100 last:border-b-0 cursor-pointer hover:scale-105 hover:font-semibold hover:pl-2"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </Link>
            
            <Link 
              to="/contact" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-all duration-300 py-2 border-b border-gray-100 last:border-b-0 cursor-pointer hover:scale-105 hover:font-semibold hover:pl-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            
            {/* Authentication options for Mobile */}
            <div className="pt-4 border-t border-[#ececec]/60">
              {isAuthenticated() ? (
                <div className="flex items-center space-x-3 p-3 bg-gray-50/50 rounded-lg">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                    <img 
                      src="/images/profileimg.png"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link 
                      to="/user-profile"
                      className="block text-[#0a639d] font-medium text-base hover:text-[#07456e] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Dashboard
                    </Link>
                    <Link 
                      to="/profile?tab=mybookings"
                      className="block text-[#0a639d] font-medium text-base hover:text-[#07456e] transition-colors mt-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('token');
                        sessionStorage.removeItem('authToken');
                        sessionStorage.removeItem('token');
                        setIsMenuOpen(false);
                        window.location.href = '/';
                      }}
                      className="text-sm text-[#5f5f5f] hover:text-red-600 transition-colors mt-1"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link 
                    to="/login" 
                    className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="primary" 
                      className="bg-[#0a639d] rounded-lg h-[45px] sm:h-[50px] w-full flex items-center justify-center hover:bg-[#07456e] transition-colors"
                    >
                      <img 
                        src="/images/img_hicon_outline_profile_1.svg" 
                        alt="Profile Icon" 
                        className="w-5 h-5 mr-2"
                      />
                      <span className="text-base sm:text-lg font-bold">Sign Up</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;