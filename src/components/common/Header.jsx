import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { isAuthenticated } from '@/utils/authGuard';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temperature: 'Loading...',
    location: 'Loading...',
    description: 'Loading...'
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get weather information based on user's current location
    const getWeatherByLocation = async () => {
      const apiKey = 'AIzaSyASvLhW9AUNMx90pTe4bx-Ljzq73HMiFfs';
      
      try {
        // Get user's current position
        const getCurrentPosition = () => {
          return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
              reject(new Error('Geolocation is not supported'));
              return;
            }
            
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position),
              (error) => reject(error),
              { 
                enableHighAccuracy: true, 
                timeout: 10000, 
                maximumAge: 300000 // 5 minutes cache
              }
            );
          });
        };

        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        // Reverse geocode to get city name
        const reverseGeoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
        const geoRes = await fetch(reverseGeoUrl);
        const geoData = await geoRes.json();
        
        // Extract city name from address components
        let cityName = 'Unknown Location';
        if (geoData.results && geoData.results.length > 0) {
          const addressComponents = geoData.results[0].address_components;
          
          // Look for locality (city) first, then administrative_area_level_2 (district)
          const cityComponent = addressComponents.find(component => 
            component.types.includes('locality') || 
            component.types.includes('administrative_area_level_2')
          );
          
          if (cityComponent) {
            cityName = cityComponent.long_name;
          }
        }

        // Get weather data from Open Meteo API using current coordinates
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        
        // Weather condition mapping based on WMO weather codes
        const getWeatherCondition = (code) => {
          if (code === 0) return 'clear sky';
          if (code <= 3) return 'partly cloudy';
          if (code <= 48) return 'foggy';
          if (code <= 67) return 'rainy';
          if (code <= 77) return 'snowy';
          if (code <= 82) return 'shower';
          if (code <= 99) return 'thunderstorm';
          return 'unknown';
        };
        
        setWeather({
          temperature: `${Math.round(weatherData.current_weather.temperature)}°C`,
          location: cityName,
          description: getWeatherCondition(weatherData.current_weather.weathercode)
        });
        
      } catch (error) {
        console.error("Error getting location or weather:", error);
        
        // Fallback to Kathmandu if location access fails
        try {
          const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent('Kathmandu')}&key=${apiKey}`;
          const geoRes = await fetch(geoUrl);
          const geoData = await geoRes.json();
          
          if (geoData.results && geoData.results.length > 0) {
            const location = geoData.results[0].geometry.location;
            
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lng}&current_weather=true&timezone=auto`;
            const weatherRes = await fetch(weatherUrl);
            const weatherData = await weatherRes.json();
            
            const getWeatherCondition = (code) => {
              if (code === 0) return 'clear sky';
              if (code <= 3) return 'partly cloudy';
              if (code <= 48) return 'foggy';
              if (code <= 67) return 'rainy';
              if (code <= 77) return 'snowy';
              if (code <= 82) return 'shower';
              if (code <= 99) return 'thunderstorm';
              return 'unknown';
            };
            
            setWeather({
              temperature: `${Math.round(weatherData.current_weather.temperature)}°C`,
              location: 'Kathmandu',
              description: getWeatherCondition(weatherData.current_weather.weathercode)
            });
          }
        } catch (fallbackError) {
          console.error("Fallback weather fetch failed:", fallbackError);
          setWeather({
            temperature: 'N/A',
            location: 'Nepal',
            description: 'Weather unavailable'
          });
        }
      }
    };

    getWeatherByLocation();

    return () => {
      clearInterval(timeInterval);
    };
  }, []);return (
    <header className="backdrop-blur-md bg-white/80 border-b border-[#ececec]/60 h-[80px] w-full fixed top-0 left-0 right-0 shadow-md z-50 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/10 after:to-white/20 after:z-[-1]">
      <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
        {/* Decorative blobs for enhanced glass morphism effect */}
        <div className="absolute -top-10 -left-20 w-48 h-48 rounded-full bg-[#ff8f1f]/15 blur-3xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-[#0a639d]/15 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute -bottom-10 left-1/3 w-32 h-32 rounded-full bg-[#ff8f1f]/10 blur-2xl animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        
        <div className="flex items-center relative z-10">
          <Link to="/">
            <img 
              src="/images/img_logo_with_name_png_1.png" 
              alt="Sona Travel & Tours Logo" 
              className="h-10 w-auto"
            />
          </Link>
        </div>        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7 relative z-10">
          <Link to="/" className="text-[#5f5f5f] text-base font-medium hover:text-[#0a639d] transition-colors">
            Home
          </Link>
          <Link to="/bus-routes" className="text-[#5f5f5f] text-base font-medium hover:text-[#0a639d] transition-colors">
            Bus Routes
          </Link>
          <Link to="/bookings" className="text-[#5f5f5f] text-base font-medium hover:text-[#0a639d] transition-colors">
            Bookings
          </Link>
          <Link to="/live-track" className="text-[#5f5f5f] text-base font-medium hover:text-[#0a639d] transition-colors">
            Live Track
          </Link>          <Link to="/faqs" className="text-[#5f5f5f] text-base font-medium hover:text-[#0a639d] transition-colors">
            FAQs
          </Link><div className="relative group">
            <div className="flex items-center cursor-pointer text-base font-medium text-[#5f5f5f] hover:text-[#0a639d] transition-colors">
              Contact Us
              <img 
                src="/images/img_hicon_linear_down_2_gray_700.svg" 
                alt="Down Arrow" 
                className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
              />
            </div>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
              <Link to="/about-us" className="block px-4 py-2 text-sm text-[#5f5f5f] hover:bg-[#0a639d]/10 hover:text-[#0a639d]">
                About Us
              </Link>
              <Link to="/testimonials" className="block px-4 py-2 text-sm text-[#5f5f5f] hover:bg-[#0a639d]/10 hover:text-[#0a639d]">
                Testimonials
              </Link>
            </div>
          </div>          {/* Time and Weather Section */}
          <div className="flex items-center gap-3">
            {/* Time Section */}
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl px-4 py-2 shadow-lg hover:bg-white/30 transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="text-lg">🕐</div>
                <div className="text-right">
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
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl px-4 py-2 shadow-lg hover:bg-white/30 transition-all duration-300 min-w-[180px]">
              <div className="flex items-center gap-2">
                <div className="text-lg flex-shrink-0">🌤️</div>
                <div className="text-right flex-1 min-w-0">
                  <div className="flex items-center gap-1 justify-end mb-0.5">
                    <span className="text-[#0a639d] font-bold text-sm">
                      {weather.temperature}
                    </span>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                  </div>
                  <div className="text-[#5f5f5f] text-xs capitalize leading-tight text-right">
                    {weather.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>       
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated() ? (
            <div className="relative">
  {/* Profile Photo */}
              <div 
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-[#0a639d] transition-all group"
              >
                <img 
                  src="/images/profileimg.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border border-gray-200 py-2 w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    to="/user-profile"
                    className="block px-4 py-2 text-[#5f5f5f] hover:bg-gray-100 hover:text-[#0a639d] transition-colors"
                  >
                    My Dashboard
                  </Link>
                  <button
        onClick={() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('token');
          sessionStorage.removeItem('authToken');
          sessionStorage.removeItem('token');
          window.location.href = '/';
        }}
        className="block w-full text-left px-4 py-2 text-[#5f5f5f] hover:bg-gray-100 hover:text-[#0a639d] transition-colors"
      >
        Logout
      </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link 
                to="/login"
                className="text-[#5f5f5f] text-base font-medium hover:text-[#0a639d] transition-colors px-3 py-2"
              >
                Login
              </Link>
              <Link to="/signup">
                <Button 
                  variant="primary" 
              className="bg-[#0a639d] rounded-lg h-[45px] px-4 flex items-center hover:bg-[#07456e] transition-colors"
            >
              <img 
                src="/images/img_hicon_outline_profile_1.svg" 
                alt="Profile Icon" 
                className="w-5 h-5 mr-2"
              />
              <span className="text-lg font-bold">Sign Up</span>
            </Button>
          </Link>
          </>
            
          )}
        </div>
  

       

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
        <div className="md:hidden fixed top-[80px] left-0 right-0 bg-white/90 backdrop-blur-md py-6 px-5 shadow-lg border-b border-[#ececec]/60 z-50 max-h-[calc(100vh-80px)] overflow-y-auto">          <nav className="flex flex-col space-y-5">
            <Link 
              to="/" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/bus-routes" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Bus Routes
            </Link>
            <Link 
              to="/bookings" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Bookings
            </Link>
            <Link 
              to="/live-track" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Live Track
            </Link>
            <Link 
              to="/faqs" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </Link>
            
            {/* Contact Us Dropdown for Mobile */}
            <div className="py-2 space-y-3 pl-2 border-l-2 border-[#ececec]">
              <div className="text-[#5f5f5f] text-base sm:text-lg font-medium">
                Contact Us
              </div>
              <Link 
                to="/about-us" 
                className="block text-sm sm:text-base text-[#5f5f5f] hover:text-[#0a639d] pl-3"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/testimonials" 
                className="block text-sm sm:text-base text-[#5f5f5f] hover:text-[#0a639d] pl-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>            </div>
            
            {/* Authentication options for Mobile */}
            {isAuthenticated() ? (
               <div className="relative">
  {/* Profile Photo */}
              <div 
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-[#0a639d] transition-all group"
              >
                <img 
                  src="/images/profileimg.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border border-gray-200 py-2 w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    to="/dashboard"
                    className="block px-4 py-2 text-[#5f5f5f] hover:bg-gray-100 hover:text-[#0a639d] transition-colors"
                  >
                    My Dashboard
                  </Link>
                  <button
        onClick={() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('token');
          sessionStorage.removeItem('authToken');
          sessionStorage.removeItem('token');
          window.location.href = '/';
        }}
        className="block w-full text-left px-4 py-2 text-[#5f5f5f] hover:bg-gray-100 hover:text-[#0a639d] transition-colors"
      >
        Logout
      </button>
                </div>
              </div>
            </div>):(
              <div className="space-y-3 pt-4 border-t border-[#ececec]/60">
                <Link 
                  to="/login" 
                  className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                  variant="primary" 
                  className="bg-[#0a639d] rounded-lg h-[50px] w-full flex items-center justify-center hover:bg-[#07456e] transition-colors"
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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;