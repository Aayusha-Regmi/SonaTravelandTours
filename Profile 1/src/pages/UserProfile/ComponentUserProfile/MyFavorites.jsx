import React from 'react';
import Button from '../../../components/ui/Button';

const MyFavorites = ({ favorites = [] }) => {
  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-12 h-12 mx-auto mb-3 bg-pink-50 rounded-full flex items-center justify-center">
            <span className="text-lg">❤️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 font-opensans">
            Save Your Favorites
          </h3>
          <p className="text-gray-500 text-sm font-opensans mb-4">
            Keep track of destinations and experiences you'd love to visit.
          </p>
          <Button variant="outline" className="h-9 px-4 text-sm">
            Browse Destinations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 font-opensans">
          My Favorites
        </h2>
        <Button variant="outline" className="h-8 px-3 text-xs">
          Organize
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((favorite, index) => (
          <div key={index} className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-sm hover:border-gray-200 transition-all">
            <div className="relative">
              <img 
                src={favorite.image || "/images/img_ellipse_184_209x209.png"} 
                alt={favorite.name}
                className="w-full h-36 object-cover"
              />
              <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors">
                <span className="text-red-500 text-sm">❤️</span>
              </button>
              {favorite.type && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">                  {favorite.type}
                </span>
              )}
            </div>
            
            <div className="p-3">
              <h4 className="font-medium text-gray-800 font-opensans mb-1 text-sm">
                {favorite.name}
              </h4>
              <p className="text-xs text-gray-500 font-opensans mb-2">
                📍 {favorite.location}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-sm">⭐</span>
                  <span className="text-xs font-medium text-gray-800">
                    {favorite.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({favorite.reviews})
                  </span>
                </div>
                {favorite.price && (
                  <span className="text-xs font-semibold text-blue-600">
                    ${favorite.price}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="primary" size="small" className="flex-1 h-7 text-xs">
                  Book
                </Button>
                <Button variant="outline" size="small" className="h-7 px-2 text-xs">
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
