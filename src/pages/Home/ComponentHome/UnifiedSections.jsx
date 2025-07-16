import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Card from './UI/HomeCards';
import API_URLS from '../../../config/api';

const UnifiedSections = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [offers, setOffers] = useState([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);  const [weatherData, setWeatherData] = useState({
    kathmandu: { temperature: 'Loading...', humidity: '--', windSpeed: '--', condition: 'Loading...', icon: '⛅' },
    pokhara: { temperature: 'Loading...', humidity: '--', windSpeed: '--', condition: 'Loading...', icon: '⛅' },
    birgunj: { temperature: 'Loading...', humidity: '--', windSpeed: '--', condition: 'Loading...', icon: '⛅' },
    chitwan: { temperature: 'Loading...', humidity: '--', windSpeed: '--', condition: 'Loading...', icon: '⛅' }
  });

  const [forecasts, setForecasts] = useState({
    kathmandu: [],
    pokhara: [],
    birgunj: [],
    chitwan: []
  });

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);    // Get current weather for all cities with retry logic
    const getCurrentWeather = async (cityName, cityKey, retryCount = 0) => {
      const apiKey = "907961ecf95a2fcfe579e9f7edaf9652";
      
      // Use coordinates for Chitwan since city name isn't recognized
      let weatherUrl;
      if (cityKey === 'chitwan') {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=27.5291&lon=84.3542&appid=${apiKey}&units=metric`;
      } else {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},NP&appid=${apiKey}&units=metric`;
      }

      try {
        const response = await fetch(weatherUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.cod && data.cod !== 200) {
          throw new Error(`API error: ${data.message || 'Unknown error'}`);
        }
        
        setWeatherData(prev => ({
          ...prev,
          [cityKey]: {
            temperature: `${Math.round(data.main.temp)}°C`,
            humidity: `${data.main.humidity}%`,
            windSpeed: `${Math.round(data.wind.speed * 3.6)}km/h`, // Convert m/s to km/h
            condition: data.weather[0].main,
            description: data.weather[0].description,
            icon: getWeatherIcon(data.weather[0].main),
            feelsLike: `${Math.round(data.main.feels_like)}°C`,
            pressure: `${data.main.pressure}hPa`,
            visibility: data.visibility ? `${(data.visibility / 1000).toFixed(1)}km` : 'N/A'
          }
        }));
      } catch (error) {
        console.error(`Error fetching weather for ${cityName} (attempt ${retryCount + 1}):`, error);
        
        // Retry up to 2 times with exponential backoff
        if (retryCount < 2) {
          setTimeout(() => {
            getCurrentWeather(cityName, cityKey, retryCount + 1);
          }, (retryCount + 1) * 2000);
          return;
        }
        
        // Set fallback weather data after all retries failed
        const fallbackData = {
          kathmandu: { temp: 27, humidity: 66, wind: 12, condition: 'Clear', icon: '☀️' },
          pokhara: { temp: 19, humidity: 80, wind: 8, condition: 'Clouds', icon: '⛅' },
          birgunj: { temp: 28, humidity: 71, wind: 15, condition: 'Clear', icon: '☀️' },
          chitwan: { temp: 25, humidity: 83, wind: 10, condition: 'Rain', icon: '🌧️' }
        };
        
        const fallback = fallbackData[cityKey];
        setWeatherData(prev => ({
          ...prev,
          [cityKey]: {
            temperature: `${fallback.temp}°C`,
            humidity: `${fallback.humidity}%`,
            windSpeed: `${fallback.wind}km/h`,
            condition: fallback.condition,
            description: fallback.condition.toLowerCase(),
            icon: fallback.icon,
            feelsLike: `${fallback.temp + 2}°C`,
            pressure: '1013hPa',
            visibility: '10km'
          }
        }));      }
    };

    // Get enhanced 3-day forecast for all cities with retry logic
    const getForecast = async (cityName, cityKey, retryCount = 0) => {
      const apiKey = "907961ecf95a2fcfe579e9f7edaf9652";
      
      // Use coordinates for Chitwan since city name isn't recognized
      let forecastUrl;
      if (cityKey === 'chitwan') {
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=27.5291&lon=84.3542&appid=${apiKey}&units=metric`;
      } else {
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},NP&appid=${apiKey}&units=metric`;
      }

      try {
        const response = await fetch(forecastUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.cod && data.cod !== "200") {
          throw new Error(`API error: ${data.message || 'Unknown error'}`);
        }
        
        // Get forecast for next 3 days (skip today, take every 8th entry for daily forecast)
        const dailyForecasts = [];
        for (let i = 8; i < data.list.length && dailyForecasts.length < 3; i += 8) {
          const forecast = data.list[i];
          const date = new Date(forecast.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          dailyForecasts.push({
            day: dailyForecasts.length === 0 ? 'Tomorrow' : `${dayName}`,
            temp: Math.round(forecast.main.temp),
            maxTemp: Math.round(forecast.main.temp_max),
            minTemp: Math.round(forecast.main.temp_min),
            weather: forecast.weather[0].main,
            description: forecast.weather[0].description,
            icon: getWeatherIcon(forecast.weather[0].main),
            humidity: forecast.main.humidity,
            windSpeed: Math.round(forecast.wind.speed * 3.6),
            pressure: forecast.main.pressure,
            clouds: forecast.clouds.all,
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          });
        }

        setForecasts(prev => ({
          ...prev,
          [cityKey]: dailyForecasts
        }));
      } catch (error) {
        console.error(`Error fetching forecast for ${cityName} (attempt ${retryCount + 1}):`, error);
        
        // Retry up to 2 times with exponential backoff
        if (retryCount < 2) {
          setTimeout(() => {
            getForecast(cityName, cityKey, retryCount + 1);
          }, (retryCount + 1) * 2000);
          return;
        }
        
        // Set fallback forecast data with actual day names and more details after all retries failed
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const dayAfterTomorrow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
        const thirdDay = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
        
        const fallbackForecasts = {
          kathmandu: [
            { temp: 25, maxTemp: 28, minTemp: 22, weather: 'Clear', icon: '☀️', humidity: 65, windSpeed: 12 },
            { temp: 23, maxTemp: 26, minTemp: 20, weather: 'Clouds', icon: '⛅', humidity: 70, windSpeed: 10 },
            { temp: 26, maxTemp: 29, minTemp: 23, weather: 'Rain', icon: '🌧️', humidity: 85, windSpeed: 15 }
          ],
          pokhara: [
            { temp: 17, maxTemp: 20, minTemp: 14, weather: 'Rain', icon: '🌧️', humidity: 85, windSpeed: 8 },
            { temp: 20, maxTemp: 23, minTemp: 17, weather: 'Clouds', icon: '⛅', humidity: 75, windSpeed: 10 },
            { temp: 22, maxTemp: 25, minTemp: 19, weather: 'Clear', icon: '☀️', humidity: 60, windSpeed: 12 }
          ],
          birgunj: [
            { temp: 30, maxTemp: 33, minTemp: 27, weather: 'Clear', icon: '☀️', humidity: 55, windSpeed: 15 },
            { temp: 29, maxTemp: 32, minTemp: 26, weather: 'Clouds', icon: '⛅', humidity: 60, windSpeed: 12 },
            { temp: 31, maxTemp: 34, minTemp: 28, weather: 'Clear', icon: '☀️', humidity: 50, windSpeed: 18 }
          ],
          chitwan: [
            { temp: 23, maxTemp: 26, minTemp: 20, weather: 'Clouds', icon: '⛅', humidity: 80, windSpeed: 10 },
            { temp: 26, maxTemp: 29, minTemp: 23, weather: 'Clear', icon: '☀️', humidity: 70, windSpeed: 8 },
            { temp: 24, maxTemp: 27, minTemp: 21, weather: 'Rain', icon: '🌧️', humidity: 90, windSpeed: 12 }
          ]
        };
          const cityFallback = fallbackForecasts[cityKey] || fallbackForecasts.kathmandu;
        
        setForecasts(prev => ({
          ...prev,
          [cityKey]: [
            { 
              day: 'Tomorrow', 
              ...cityFallback[0],
              description: cityFallback[0].weather.toLowerCase(),
              pressure: 1013,
              clouds: 20,
              date: tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            },
            { 
              day: dayAfterTomorrow.toLocaleDateString('en-US', { weekday: 'short' }), 
              ...cityFallback[1],
              description: cityFallback[1].weather.toLowerCase(),
              pressure: 1015,
              clouds: 50,
              date: dayAfterTomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            },
            { 
              day: thirdDay.toLocaleDateString('en-US', { weekday: 'short' }), 
              ...cityFallback[2],
              description: cityFallback[2].weather.toLowerCase(),
              pressure: 1010,
              clouds: 80,
              date: thirdDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            }          ]
        }));
      }
    };

    // Helper function to get weather icon
    const getWeatherIcon = (weatherMain) => {
      const icons = {
        'Clear': '☀️',
        'Clouds': '⛅',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Haze': '🌫️'
      };
      return icons[weatherMain] || '⛅';
    };    // Fetch current weather for all cities
    getCurrentWeather('Kathmandu', 'kathmandu');
    getCurrentWeather('Pokhara', 'pokhara');
    getCurrentWeather('Birgunj', 'birgunj');
    getCurrentWeather('Chitwan', 'chitwan');
    
    // Fetch forecasts for all cities
    getForecast('Kathmandu', 'kathmandu');
    getForecast('Pokhara', 'pokhara');
    getForecast('Birgunj', 'birgunj');
    getForecast('Chitwan', 'chitwan');

    // Fetch offers from API
    const fetchOffers = async () => {
      try {
        setIsLoadingOffers(true);
        console.log('Fetching offers from:', API_URLS.COUPONS.GET_COUPONS);
        
        const response = await fetch(API_URLS.COUPONS.GET_COUPONS);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Full API response:', data);
        
        if (data.success && data.data) {
          console.log('Raw offers data:', data.data);
          console.log('Number of offers received:', data.data.length);
          
          // Filter active offers only (temporarily disabled for debugging)
          const now = new Date();
          console.log('Current date:', now.toISOString());
          
          const activeOffers = data.data.filter(offer => {
            const initDate = new Date(offer.couponInitDate);
            const expDate = new Date(offer.couponExpDate);
            
            console.log(`Offer ${offer.couponCode}:`, {
              initDate: initDate.toISOString(),
              expDate: expDate.toISOString(),
              isActive: now >= initDate && now <= expDate
            });
            
            // Temporarily show all offers for debugging
            return true; // This will show all offers regardless of date
            // return now >= initDate && now <= expDate; // Re-enable this later
          });
          
          console.log('Active offers after filtering:', activeOffers);
          console.log('Number of active offers:', activeOffers.length);
          
          // Show only first 4 offers for home page
          const homeOffers = activeOffers.slice(0, 4);
          console.log('Home offers (first 4):', homeOffers);
          
          setOffers(homeOffers);
        } else {
          console.log('API response structure issue:', data);
          setOffers([]);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
        // Fallback to empty array if API fails
        setOffers([]);
      } finally {
        setIsLoadingOffers(false);
      }
    };

    fetchOffers();

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {    // Add custom animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
      }
      .weather-card {
        animation: float 6s ease-in-out infinite;
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-shimmer {
        animation: shimmer 3s infinite;
      }
      .animate-spin-slow {
        animation: spin-slow 8s linear infinite;
      }
      .marquee-container {
        display: flex;
        overflow: hidden;
        width: 100%;
      }
      .marquee-content {
        display: flex;
        animation: marquee 30s linear infinite;
        min-width: 100%;
      }
      .animate-marquee {
        animation: marquee 30s linear infinite;
      }
    `;
    document.head.appendChild(style);

    // Clean up function to remove style when component unmounts
    return () => {
      const existingStyle = document.querySelector('style');
      if (existingStyle && existingStyle.textContent.includes('float')) {
        existingStyle.remove();
      }
    };
  }, []);

  const routes = [
    {
      id: 1,
      title: 'Birgunj to Kathmandu',
      offerType: "Today's Offer",
      price: 'R.s 1100.00',
      image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1.png'
    },
    {
      id: 2,
      title: 'Kathmandu to Birgunj',
      offerType: "Holiday's Offer",
      price: 'R.s 1100.00',
      image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1_487x388.png'
    },
    {
      id: 3,
      title: 'Banepa To Kalaiya',
      offerType: "Weekend's Offer",
      price: 'R.s 1100.00',
      image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1_1.png'
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-800 via-gray-900 to-zinc-900 min-h-screen">
      {/* Unified Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-72 h-72 bg-gradient-to-r from-emerald-400/25 to-teal-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-cyan-500/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-16 right-1/3 w-56 h-56 bg-gradient-to-r from-orange-400/25 to-amber-500/25 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
        
        {/* Additional background elements */}
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-pink-400/15 to-rose-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-bounce" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Service Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-6xl">🏆</div>
        <div className="absolute top-40 right-40 text-4xl">💎</div>
        <div className="absolute bottom-40 left-40 text-5xl">🎯</div>
        <div className="absolute bottom-20 right-20 text-4xl">🚀</div>
        <div className="absolute top-1/2 left-1/5 text-3xl">⭐</div>
        <div className="absolute top-1/3 right-1/3 text-3xl">🎖️</div>
        <div className="absolute top-2/3 left-2/3 text-4xl">%</div>
        <div className="absolute bottom-1/5 left-3/4 text-5xl">₹</div>
        <div className="absolute top-1/5 right-1/5 text-3xl">✨</div>
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-24 pt-20">          {/* WEATHER FORECAST SECTION */}
            <div>
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 bg-gray-700/60 backdrop-blur-xl border border-gray-600/30 rounded-full px-6 py-3 mb-6">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-400 font-medium text-sm tracking-wide">WEATHER FORECAST</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Plan Your Journey with Weather Updates
                </h2>
                <p className="text-white/70 text-lg max-w-3xl mx-auto">
                  Stay informed about weather conditions for your travel destinations
                </p>
              </div>          {/* Main Weather Container Card */}
              <div className="relative backdrop-blur-2xl bg-gradient-to-br from-gray-800/60 via-gray-900/40 to-black/20 border border-gray-600/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
                
                {/* Weather Cards Grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Kathmandu Weather Card */}
                  <div className="group relative backdrop-blur-xl bg-gradient-to-br from-blue-900/50 via-blue-800/40 to-blue-700/30 border border-blue-400/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    {/* Weather Map Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/25 via-yellow-500/20 to-green-500/15 opacity-70"></div>
                    <div className="absolute inset-0 opacity-25">
                      <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full"></div>
                      <div className="absolute top-8 right-6 w-1 h-1 bg-white/30 rounded-full"></div>
                      <div className="absolute bottom-6 left-8 w-1 h-1 bg-white/35 rounded-full"></div>
                      <div className="absolute bottom-4 right-4 w-2 h-2 bg-white/40 rounded-full"></div>
                    </div>
                    
                    {/* Location Pin */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-300 text-xs font-medium">📍 Capital</span>
                    </div>                  {/* LIVE Status */}
                    <div className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
                      LIVE
                    </div>                  {/* 3-Day Forecast */}
                    <div className="absolute top-12 right-4 bg-blue-900/70 backdrop-blur-sm border border-blue-400/30 rounded-lg px-2 py-1 text-xs">
                      <div className="text-blue-200 text-xs space-y-0.5">
                        {forecasts.kathmandu.length > 0 ? (
                          forecasts.kathmandu.map((forecast, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <span className="font-medium">{forecast.day}:</span>
                              <span className="text-white">{forecast.temp}°</span>
                              <span>{forecast.icon}</span>
                              <span className="text-blue-300 text-xs">{forecast.humidity}%</span>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="flex items-center gap-1">
                              <span>Tomorrow:</span>
                              <span className="text-white">25°</span>
                              <span>⛅</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}:</span>
                              <span className="text-white">23°</span>
                              <span>🌧️</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}:</span>
                              <span className="text-white">26°</span>
                              <span>☀️</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                      {/* Weather Content */}
                    <div className="relative z-10 p-6 pt-12">                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-4xl">{weatherData.kathmandu.icon}</div>
                        <div className="text-4xl font-bold text-white">{weatherData.kathmandu.temperature}</div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">Kathmandu</h3>
                      <p className="text-blue-200 text-sm mb-3 capitalize">{weatherData.kathmandu.description}</p>
                        {/* Kathmandu Map */}
                      <div className="relative bg-gradient-to-br from-blue-900/30 to-blue-700/20 rounded-lg p-3 mb-3 border border-blue-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-300 text-xs font-medium">📍 Capital Valley</span>
                          <span className="text-blue-200 text-xs">27.7172° N, 85.3240° E</span>
                        </div>

                        <div className="relative h-28 rounded border border-blue-300/30 overflow-hidden">
                          {/* Google Maps Embed */}
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.277768685635!2d85.28493324095915!3d27.709030241454187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1750676388226!5m2!1sen!2snp&disableDefaultUI=true&scrollwheel=false&draggable=false&panControl=false&zoomControl=false&mapTypeControl=false&scaleControl=false&streetViewControl=false&overviewMapControl=false&rotateControl=false"
                            width="100%"
                            height="100%"
                            style={{ border: 0, pointerEvents: 'none' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Kathmandu Map"
                            className="rounded"
                          ></iframe>
                          <span className="absolute bottom-0 right-1 text-blue-300 text-xs opacity-70 bg-black/50 px-1 rounded">KTM</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-white/90">
                        <div className="flex items-center gap-1">
                          <span>💧</span>
                          <span>{weatherData.kathmandu.humidity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>💨</span>
                          <span>{weatherData.kathmandu.windSpeed}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🌡️</span>
                          <span>{weatherData.kathmandu.feelsLike}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>👁️</span>
                          <span>{weatherData.kathmandu.visibility}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pokhara Weather Card */}
                  <div className="group relative backdrop-blur-xl bg-gradient-to-br from-slate-900/50 via-slate-800/40 to-slate-700/30 border border-slate-400/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    {/* Weather Map Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-500/25 via-blue-500/20 to-cyan-500/15 opacity-70"></div>
                    <div className="absolute inset-0 opacity-25">
                      <div className="absolute top-6 left-6 w-1 h-1 bg-white/40 rounded-full"></div>
                      <div className="absolute top-4 right-8 w-2 h-2 bg-white/35 rounded-full"></div>
                      <div className="absolute bottom-8 left-4 w-2 h-2 bg-white/40 rounded-full"></div>
                      <div className="absolute bottom-6 right-6 w-1 h-1 bg-white/30 rounded-full"></div>
                    </div>
                    
                    {/* Location Pin */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-cyan-300 text-xs font-medium">📍 Lake City</span>
                    </div>                  {/* LIVE Status */}
                    <div className="absolute top-4 right-4 bg-cyan-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
                      LIVE
                    </div>                  {/* 3-Day Forecast */}
                    <div className="absolute top-12 right-4 bg-cyan-900/70 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-2 py-1 text-xs">
                      <div className="text-cyan-200 text-xs space-y-0.5">
                        {forecasts.pokhara.length > 0 ? (
                          forecasts.pokhara.map((forecast, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <span className="font-medium">{forecast.day}:</span>
                              <span className="text-white">{forecast.temp}°</span>
                              <span>{forecast.icon}</span>
                              <span className="text-cyan-300 text-xs">{forecast.humidity}%</span>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="flex items-center gap-1">
                              <span>Tomorrow:</span>
                              <span className="text-white">17°</span>
                              <span>🌧️</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}:</span>
                              <span className="text-white">20°</span>
                              <span>⛅</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}:</span>
                              <span className="text-white">22°</span>
                              <span>☀️</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                      {/* Weather Content */}
                    <div className="relative z-10 p-6 pt-12">                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-4xl">{weatherData.pokhara.icon}</div>
                        <div className="text-4xl font-bold text-white">{weatherData.pokhara.temperature}</div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">Pokhara</h3>
                      <p className="text-cyan-200 text-sm mb-3 capitalize">{weatherData.pokhara.description}</p>
                        {/* Pokhara Map */}
                      <div className="relative bg-gradient-to-br from-cyan-900/30 to-cyan-700/20 rounded-lg p-3 mb-3 border border-cyan-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-cyan-300 text-xs font-medium">📍 Lake City</span>
                          <span className="text-cyan-200 text-xs">28.2096° N, 83.9856° E</span>
                        </div>
                        <div className="relative h-28 rounded border border-cyan-300/30 overflow-hidden">
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112488.25482335828!2d83.87421753369678!3d28.229848956021193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sPokhara!5e0!3m2!1sen!2snp!4v1750675437147!5m2!1sen!2snp&disableDefaultUI=true&scrollwheel=false&draggable=false&panControl=false&zoomControl=false&mapTypeControl=false&scaleControl=false&streetViewControl=false&overviewMapControl=false&rotateControl=false"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'sepia(0.1) hue-rotate(180deg) saturate(1.2)', pointerEvents: 'none' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Pokhara Map"
                            className="rounded"
                          />
                          <span className="absolute bottom-0 right-1 text-cyan-300 text-xs opacity-70 bg-black/50 px-1 rounded">PKR</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-white/90">
                        <div className="flex items-center gap-1">
                          <span>💧</span>
                          <span>{weatherData.pokhara.humidity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>💨</span>
                          <span>{weatherData.pokhara.windSpeed}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🌡️</span>
                          <span>{weatherData.pokhara.feelsLike}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>�️</span>
                          <span>{weatherData.pokhara.visibility}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Birgunj Weather Card */}
                  <div className="group relative backdrop-blur-xl bg-gradient-to-br from-orange-900/50 via-orange-800/40 to-orange-700/30 border border-orange-400/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    {/* Weather Map Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/25 via-orange-500/20 to-yellow-500/15 opacity-70"></div>
                    <div className="absolute inset-0 opacity-25">
                      <div className="absolute top-6 left-8 w-2 h-2 bg-white/40 rounded-full"></div>
                      <div className="absolute top-8 right-4 w-1 h-1 bg-white/35 rounded-full"></div>
                      <div className="absolute bottom-4 left-6 w-1 h-1 bg-white/30 rounded-full"></div>
                      <div className="absolute bottom-8 right-8 w-2 h-2 bg-white/40 rounded-full"></div>
                    </div>
                    
                    {/* Location Pin */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-orange-300 text-xs font-medium">📍 Border City</span>
                    </div>                  {/* LIVE Status */}
                    <div className="absolute top-4 right-4 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
                      LIVE
                    </div>                  {/* 3-Day Forecast */}
                    <div className="absolute top-12 right-4 bg-orange-900/70 backdrop-blur-sm border border-orange-400/30 rounded-lg px-2 py-1 text-xs">
                      <div className="text-orange-200 text-xs space-y-0.5">
                        {forecasts.birgunj.length > 0 ? (
                          forecasts.birgunj.map((forecast, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <span className="font-medium">{forecast.day}:</span>
                              <span className="text-white">{forecast.temp}°</span>
                              <span>{forecast.icon}</span>
                              <span className="text-orange-300 text-xs">{forecast.humidity}%</span>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="flex items-center gap-1">
                              <span>Tomorrow:</span>
                              <span className="text-white">30°</span>
                              <span>☀️</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}:</span>
                              <span className="text-white">29°</span>
                              <span>⛅</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}:</span>
                              <span className="text-white">31°</span>
                              <span>☀️</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                      {/* Weather Content */}
                    <div className="relative z-10 p-6 pt-12">                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-4xl">{weatherData.birgunj.icon}</div>
                        <div className="text-4xl font-bold text-white">{weatherData.birgunj.temperature}</div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">Birgunj</h3>
                      <p className="text-orange-200 text-sm mb-3 capitalize">{weatherData.birgunj.description}</p>
                        {/* Birgunj Map */}
                      <div className="relative bg-gradient-to-br from-orange-900/30 to-orange-700/20 rounded-lg p-3 mb-3 border border-orange-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-orange-300 text-xs font-medium">📍 Border City</span>
                          <span className="text-orange-200 text-xs">27.0460° N, 84.8742° E</span>
                        </div>
                        <div className="relative h-28 rounded border border-orange-300/30 overflow-hidden">
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114570.08536938424!2d84.79427919318373!3d27.038093838583377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994f98e92b8e035%3A0x13af2c25cbfa2d86!2sBirgunj%2C%20Nepal!5e0!3m2!1sen!2sus!4v1697824856849!5m2!1sen!2sus&q=Birgunj"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'sepia(0.1) hue-rotate(15deg) saturate(1.1)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-white/90">
                        <div className="flex items-center gap-1">
                          <span>💧</span>
                          <span>{weatherData.birgunj.humidity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>💨</span>
                          <span>{weatherData.birgunj.windSpeed}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🌡️</span>
                          <span>{weatherData.birgunj.feelsLike}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>👁️</span>
                          <span>{weatherData.birgunj.visibility}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chitwan Weather Card */}
                  <div className="group relative backdrop-blur-xl bg-gradient-to-br from-green-900/50 via-green-800/40 to-green-700/30 border border-green-400/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    {/* Weather Map Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/25 via-emerald-500/20 to-teal-500/15 opacity-70"></div>
                    <div className="absolute inset-0 opacity-25">
                      <div className="absolute top-4 left-6 w-1 h-1 bg-white/35 rounded-full"></div>
                      <div className="absolute top-6 right-4 w-2 h-2 bg-white/40 rounded-full"></div>
                      <div className="absolute bottom-6 left-4 w-2 h-2 bg-white/40 rounded-full"></div>
                      <div className="absolute bottom-4 right-6 w-1 h-1 bg-white/30 rounded-full"></div>
                    </div>
                    
                    {/* Location Pin */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 text-xs font-medium">📍 National Park</span>
                    </div>                  {/* LIVE Badge */}
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                      LIVE
                    </div>                  {/* 3-Day Forecast */}
                    <div className="absolute top-12 right-4 bg-green-900/70 backdrop-blur-sm border border-green-400/30 rounded-lg px-2 py-1 text-xs">
                      <div className="text-green-200 text-xs space-y-0.5">
                        {forecasts.chitwan.length > 0 ? (
                          forecasts.chitwan.map((forecast, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <span className="font-medium">{forecast.day}:</span>
                              <span className="text-white">{forecast.temp}°</span>
                              <span>{forecast.icon}</span>
                              <span className="text-green-300 text-xs">{forecast.humidity}%</span>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="flex items-center gap-1">
                              <span>Tomorrow:</span>
                              <span className="text-white">23°</span>
                              <span>⛅</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}:</span>
                              <span className="text-white">26°</span>
                              <span>☀️</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}:</span>
                              <span className="text-white">24°</span>
                              <span>🌧️</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                      {/* Weather Content */}
                    <div className="relative z-10 p-6 pt-12">                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-4xl">{weatherData.chitwan.icon}</div>
                        <div className="text-4xl font-bold text-white">{weatherData.chitwan.temperature}</div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">Chitwan</h3>
                      <p className="text-green-200 text-sm mb-3 capitalize">{weatherData.chitwan.description}</p>
                        {/* Chitwan Map */}
                      <div className="relative bg-gradient-to-br from-green-900/30 to-green-700/20 rounded-lg p-3 mb-3 border border-green-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-300 text-xs font-medium">📍 National Park</span>
                          <span className="text-green-200 text-xs">27.5291° N, 84.3542° E</span>
                        </div>
                        <div className="relative h-28 rounded border border-green-300/30 overflow-hidden">
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d452504.73584058834!2d83.73378143491963!3d27.618530944965496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994439ad1ca5a8d%3A0x6c5e40f75e1f474f!2sChitwan%20District!5e0!3m2!1sen!2snp!4v1750675767795!5m2!1sen!2snp&disableDefaultUI=true&scrollwheel=false&draggable=false&panControl=false&zoomControl=false&mapTypeControl=false&scaleControl=false&streetViewControl=false&overviewMapControl=false&rotateControl=false"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'sepia(0.1) hue-rotate(90deg) saturate(1.3)', pointerEvents: 'none' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Chitwan Map"
                            className="rounded"
                          />
                          <span className="absolute bottom-0 right-1 text-green-300 text-xs opacity-70 bg-black/50 px-1 rounded">CNP</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-white/90">
                        <div className="flex items-center gap-1">
                          <span>💧</span>
                          <span>{weatherData.chitwan.humidity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>💨</span>
                          <span>{weatherData.chitwan.windSpeed}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🌡️</span>
                          <span>{weatherData.chitwan.feelsLike}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>👁️</span>
                          <span>{weatherData.chitwan.visibility}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

            {/* Decorative Elements for Main Card */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/4 -right-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* TOP BUS ROUTES SECTION */}
        <div>
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 font-medium">POPULAR ROUTES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Top Bus Routes This Month
            </h2>            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Discover the most popular routes and start planning your next adventure!
            </p>
            
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
              <span className="text-white/80 group-hover:text-white font-medium">View all</span>
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img 
                  src="/images/img_hicon_linear_right_1.svg" 
                  alt="Right Arrow" 
                  className="w-3 h-3 filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
          
          {/* Route Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {routes.map((route, index) => (
              <div 
                key={route.id}
                className="group relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/25 to-white/10 border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 transform-gpu">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <Card
                    key={route.id}
                    type="route"
                    title={route.title}
                    offerType={route.offerType}
                    price={route.price}
                    image={route.image}
                  />

                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#ff8f1f] to-[#ff6b35] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-[#0a639d]/20 to-transparent rounded-3xl blur-xl transform translate-y-6 scale-95 opacity-0 group-hover:opacity-60 transition-all duration-700 -z-10"></div>
              </div>
            ))}
          </div>
        </div>

        {/* TRENDING OFFERS SECTION */}
        <div>
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-orange-400 font-medium">HOT DEALS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trending Offers for You
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
              Explore the Latest Discounts and Special Deals Tailored Just for You. Don't Miss Out on Amazing Savings for Your Next Journey!
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingOffers ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="group relative h-full">
                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col animate-pulse">
                    <div className="relative h-48 overflow-hidden flex-shrink-0 bg-gray-300/20"></div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="h-4 bg-white/20 rounded mb-2"></div>
                      <div className="h-6 bg-white/20 rounded mb-3"></div>
                      <div className="h-6 bg-white/20 rounded mb-4"></div>
                      <div className="h-12 bg-white/20 rounded mt-auto"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : offers.length > 0 ? (
              offers.map((offer, index) => (
                <div key={offer.couponId} className="group relative h-full" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 h-full flex flex-col">
                    
                    {/* HOT Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20 animate-pulse">
                      HOT!
                    </div>

                    {/* Background Image */}
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <img 
                        src={offer.couponImageUrl} 
                        alt={offer.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 brightness-75"
                        onError={(e) => {
                          e.target.src = '/images/636589929000896220-EPA-NEPAL-BISKA-FESTIVAL.webp';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-white/80 text-sm mb-2">{offer.couponType}</div>
                      <h3 className="text-white text-lg font-bold mb-3 leading-tight line-clamp-2" title={offer.description}>
                        {offer.title}
                      </h3>
                      <div className="text-orange-400 text-lg font-bold mb-2">
                        {offer.discountAmount > 0 ? `Rs. ${offer.discountAmount} OFF` : `Up to Rs. ${offer.discountUpperLimit} OFF`}
                      </div>
                      
                      {/* Description */}
                      <div className="text-white/70 text-xs mb-2 line-clamp-2">
                        {offer.description}
                      </div>
                      
                      {/* Expiration Date */}
                      <div className="text-white/60 text-xs mb-4">
                        Valid till: {new Date(offer.couponExpDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      
                      <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3 mt-auto">
                        <div className="flex-1 min-w-0 mr-3">
                          <div className="text-white/80 text-xs">Promo Code:</div>
                          <div className="text-white font-mono font-bold text-sm truncate">{offer.couponCode}</div>
                        </div>
                        <button 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex-shrink-0"
                          onClick={() => {
                            navigator.clipboard.writeText(offer.couponCode);
                            toast.success(`Copied "${offer.couponCode}" to clipboard!`, {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                            });
                          }}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // No offers available
              <div className="col-span-full text-center py-12">
                <div className="text-white/60 text-lg">No offers available at the moment</div>
                <div className="text-white/40 text-sm mt-2">Check back later for exciting deals!</div>
              </div>
            )}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 hover:bg-white/20 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={() => window.location.href = '/trending-offers'}
              aria-label="View all Exclusive Offers"
            >
              <span className="text-white/80 group-hover:text-white font-medium">View all Exclusive Offers</span>
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img 
                  src="/images/img_hicon_linear_right_1.svg" 
                  alt="Right Arrow" 
                  className="w-3 h-3 filter brightness-0 invert"
                />
              </div>
            </button>
          </div>
        </div>

        {/* SERVICE HIGHLIGHTS SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side - Background Image */}
          <div className="lg:w-1/2 h-[700px] relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/images/img_beautifullandscapetouristbustraveltransportbackground87582536524.png" 
              alt="Tourist Bus Landscape" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 brightness-110 contrast-110"
            />
            
            {/* Subtle border overlay */}
            <div className="absolute inset-0 border-4 border-white/30 rounded-3xl pointer-events-none"></div>
            
            {/* Floating Badges */}
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm border border-white/40 rounded-2xl px-4 py-2 shadow-xl z-20 hover:bg-black/70 transition-all duration-300">
              <span className="text-sm font-bold text-white">Premium Experience</span>
            </div>
            
            <div className="absolute bottom-6 right-6 bg-gradient-to-r from-orange-500/80 to-red-500/80 backdrop-blur-sm border border-white/40 rounded-2xl px-4 py-2 shadow-xl z-20 hover:from-orange-500/90 hover:to-red-500/90 transition-all duration-300">
              <span className="text-sm font-bold text-white">★ 4.9/5 Rating</span>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2">
            {/* Main Title */}
            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 mb-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group relative">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                EXCELLENCE
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:scale-105 transition-transform duration-500">
                Experience the Difference with Our Service!
              </h2>
            </div>

            {/* Service Cards */}
            <div className="space-y-8">
              {/* Service 1 - Exceptional Service */}
              <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <img 
                        src="/images/img_eosiconsserviceoutlined.svg" 
                        alt="Service Icon" 
                        className="w-14 h-14 filter brightness-0 invert opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 bg-blue-400/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white/90 transition-all duration-300">
                      Exceptional Service
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Experience unparalleled customer support and a seamless booking process every time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 2 - Affordable Prices */}
              <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <img 
                        src="/images/img_solartagpricelinear.svg" 
                        alt="Price Icon" 
                        className="w-14 h-14 filter brightness-0 invert opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 bg-emerald-400/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white/90 transition-all duration-300">
                      Affordable Prices
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Enjoy competitive rates and exclusive discounts on all your travel needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 3 - Comfortable Travel */}
              <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <img 
                        src="/images/img_tdesignsleep.svg" 
                        alt="Comfort Icon" 
                        className="w-14 h-14 filter brightness-0 invert opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 bg-purple-400/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white/90 transition-all duration-300">
                      Comfortable Travel
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Travel in comfort with our modern and well-maintained fleet of buses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOOKING STATS SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Booking Counter */}
          <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <img 
                    src="/images/img_hugeiconsticket02.svg" 
                    alt="Ticket Icon" 
                    className="w-14 h-14 filter brightness-0 invert opacity-100"
                  />
                </div>
                <div className="absolute inset-0 bg-orange-400/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
              
              <div className="ml-6">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-red-300 transition-all duration-300">
                  15,340 Bookings
                </h3>
              </div>
            </div>
          </div>
          
          {/* Success Message */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 max-w-md group">
            <p className="text-2xl font-semibold text-white leading-relaxed group-hover:text-white/90 transition-all duration-300">
              Join thousands of satisfied travelers who have booked their journeys with us!
            </p>
            
            {/* Rating Stars */}
            <div className="mt-4 flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse hover:scale-110 transition-transform duration-300"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <span className="text-white text-xs">★</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="flex justify-center space-x-6">
          {['🚌', '✨', '🎯'].map((emoji, i) => (
            <div 
              key={i} 
              className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-xl text-2xl animate-bounce hover:bg-white/20 hover:scale-110 transition-all duration-500"
              style={{ animationDelay: `${i * 0.5}s`, animationDuration: '3s' }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnifiedSections;
