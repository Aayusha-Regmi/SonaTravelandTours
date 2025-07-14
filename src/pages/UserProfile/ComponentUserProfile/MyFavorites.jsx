import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const MyFavorites = ({ favorites = [] }) => {
  const [deletingId, setDeletingId] = useState(null);

  // Static data for demonstration
  const staticFavorites = [
    {
      id: 1,
      name: "Birgunj to Gaushala",
      location: "Central Nepal Route",
      type: "Express Bus",
      image: "/images/Bus.png",
      rating: 4.8,
      reviews: 245,
      price: 2500,
      duration: "4-5 hours",
      features: ["AC", "WiFi", "Comfortable Seats"],
      description: "Direct route connecting southern border to central Nepal",
      operator: "Sona Travel"
    },
    {
      id: 2,
      name: "Birgunj to Kathmandu",
      location: "Capital Connection",
      type: "Deluxe Bus",
      image: "/images/img_beautifullandscapetouristbustraveltransportbackground87582536524.png",
      rating: 4.6,
      reviews: 180,
      price: 2200,
      duration: "5-6 hours",
      features: ["AC", "Snacks", "Rest Stops"],
      description: "Main highway route to Nepal's capital city",
      operator: "Sona Travel"
    },
    {
      id: 3,
      name: "Kathmandu to Kalaiya",
      location: "Terai Region",
      type: "Tourist Bus",
      image: "/images/img_busroadgenerativeai22087319731_1.png",
      rating: 4.7,
      reviews: 156,
      price: 4000,
      duration: "6-7 hours",
      features: ["AC", "Meals", "Guide"],
      description: "Journey from capital to southern plains region",
      operator: "Sona Travel"
    },
    {
      id: 4,
      name: "Banepa to Birgunj",
      location: "Historical Route",
      type: "Premium Bus",
      image: "/images/img_bestplacestovsitinkathmandunepal71683x1024_1.png",
      rating: 4.9,
      reviews: 98,
      price: 1800,
      duration: "4-5 hours",
      features: ["AC", "WiFi", "Premium Seats"],
      description: "Connecting ancient town to border region",
      operator: "Sona Travel"
    },
    {
      id: 5,
      name: "Gaushala to Banepa",
      location: "Valley Connection",
      type: "Standard Bus",
      image: "/images/img_coupletakingselfiewhiletravelingbytrain232149304471.png",
      rating: 4.5,
      reviews: 89,
      price: 1500,
      duration: "2-3 hours",
      features: ["Comfortable Seats", "Local Guide"],
      description: "Short route within Kathmandu valley region",
      operator: "Sona Travel"
    },
    {
      id: 6,
      name: "Kalaiya to Kathmandu",
      location: "Return Journey",
      type: "Express Bus",
      image: "/images/img_ellipse_184.png",
      rating: 4.4,
      reviews: 67,
      price: 3800,
      duration: "6-7 hours",
      features: ["AC", "WiFi", "Evening Service"],
      description: "Return trip from southern region to capital",
      operator: "Sona Travel"
    }
  ];

  const displayFavorites = favorites.length > 0 ? favorites : staticFavorites;

  // Handle delete functionality
  const handleDelete = (id) => {
    setDeletingId(id);
    // Simulate API call
    setTimeout(() => {
      console.log(`Deleting favorite with ID: ${id}`);
      // In real implementation, you would call an API to delete the favorite
      // and then update the state or refetch the data
      setDeletingId(null);
    }, 1000);
  };

  // Handle view details functionality
  const handleViewDetails = (favorite) => {
    console.log('Viewing details for:', favorite);
    // In real implementation, you could navigate to a details page
    // or open a modal with detailed information
    alert(`Viewing details for: ${favorite.name}\nDestination: ${favorite.location}\nPrice: Rs. ${favorite.price}`);
  };

  return (
    <div className="p-6">
      {/* TODO: REMOVE THIS NOTICE SECTION WHEN DEVELOPMENT IS COMPLETE */}
      {/* Professional Notice Banner with Marquee - TEMPORARY DEVELOPMENT NOTICE */}
      <div className="mb-8 relative overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-indigo-100/20 to-purple-100/20 animate-pulse"></div>
        
        <div className="relative bg-white/80 backdrop-blur-sm border-l-4 border-blue-500 rounded-r-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-b border-blue-200/30">
            {/* Professional Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            {/* Header Text */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-blue-600">सूचना</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Notice</span>
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="flex gap-2">
              <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-full px-2 py-1">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-yellow-700">Development</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-2 py-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-medium text-blue-700">Static Mode</span>
              </div>
            </div>
          </div>
          
          {/* Professional Marquee Section */}
          <div className="p-4">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-3 shadow-inner">
              {/* Marquee Container */}
              <div className="relative overflow-hidden h-12 flex items-center">
                {/* Gradient overlays for smooth fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none"></div>
                
                {/* Professional Marquee Text */}
                <div className="flex items-center whitespace-nowrap animate-marquee">
                  <div className="flex items-center gap-8 text-gray-700 font-medium">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      हाम्रो प्राविधिक टोली
                    </span>
                    
                    <span className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancellation
                      </span>
                      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        My Review
                      </span>
                      <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        My Fav
                      </span>
                      पृष्ठहरूको विकासमा सक्रिय रूपमा कार्यरत छ
                    </span>
                    
                    <span className="flex items-center gap-2 text-green-700">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      यी सेवाहरू चाँडै नै प्रयोगका लागि उपलब्ध हुनेछन्
                    </span>
                    
                    <span className="flex items-center gap-2 text-blue-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      तपाईंको धैर्यताको लागि धन्यवाद
                    </span>
                    
                    {/* Spacing for seamless loop */}
                    <span className="ml-16"></span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Updates in progress
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Sona Travel Tech Team
              </span>
            </div>
          </div>
        </div>
        
        {/* Custom CSS for Marquee Animation - REMOVE WITH NOTICE */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
      {/* END OF TEMPORARY NOTICE SECTION - REMOVE WHEN DEVELOPMENT IS COMPLETE */}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">My Favorites</h2>
          <p className="text-gray-600">Your saved favorite destinations and routes</p>
        </div>
      </div>

      {/* Favorites Grid with 3D Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {displayFavorites.map((favorite, index) => (
          <div key={favorite.id || index} className="group relative">
            {/* 3D Card Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-105"></div>
            
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/30 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              {/* Image Section */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={favorite.image || "/images/Bus.png"} 
                  alt={favorite.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Action Buttons - Top Right */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {/* View Details Button */}
                  <button 
                    onClick={() => handleViewDetails(favorite)}
                    className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 group/btn"
                    title="View Details"
                  >
                    <svg className="w-4 h-4 text-blue-600 group-hover/btn:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  
                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDelete(favorite.id)}
                    disabled={deletingId === favorite.id}
                    className={`w-9 h-9 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 group/btn ${
                      deletingId === favorite.id 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-red-500/90 hover:bg-red-600/90'
                    }`}
                    title="Remove from Favorites"
                  >
                    {deletingId === favorite.id ? (
                      <svg className="w-4 h-4 text-gray-600 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white group-hover/btn:text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Heart Icon - Top Left */}
                <div className="absolute top-3 left-3">
                  <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Type Badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-lg">
                  {favorite.type}
                </div>
                
                {/* Rating Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-gray-800 text-xs font-medium">{favorite.rating}</span>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-4">
                {/* Title and Price */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-bold text-gray-800 leading-tight flex-1 mr-2">{favorite.name}</h3>
                  <span className="text-lg font-bold text-blue-600 whitespace-nowrap">Rs. {favorite.price}</span>
                </div>
                
                {/* Location */}
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-3 h-3 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600 text-sm truncate">{favorite.location}</span>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                  {favorite.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {favorite.features && favorite.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100 font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {favorite.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    {favorite.reviews} reviews
                  </span>
                </div>
                
                {/* Action Button */}
                <Button 
                  variant="primary" 
                  className="w-full py-2 text-sm rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 0112 0v3a2 2 0 01-2 2v0a2 2 0 01-2-2v-5H8z" />
                  </svg>
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State for real scenario */}
      {displayFavorites.length === 0 && (
        <div className="text-center py-16">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
            Start Building Your Favorites
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Discover amazing destinations and save them for quick access. Your perfect journey is just a click away!
          </p>
          <Button variant="primary" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-5H8z" />
            </svg>
            Explore Routes
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
