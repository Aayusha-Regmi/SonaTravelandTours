import React from 'react';
import Button from '../../../components/ui/Button';

const MyBookings = ({ bookings = [] }) => {
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
        <div className="max-w-sm mx-auto">
          <img 
            src="/images/img_hicon_outline_bookmark_3.svg" 
            alt="bookings" 
            className="w-12 h-12 mx-auto mb-3 opacity-40" 
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-2 font-opensans">
            No Bookings Yet
          </h3>
          <p className="text-gray-500 text-sm font-opensans mb-4">
            Your travel bookings will appear here once you make your first reservation.
          </p>
          <Button variant="primary" className="h-9 px-4 text-sm">
            Explore Destinations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 font-opensans">
          My Bookings
        </h2>
        <Button variant="outline" className="h-8 px-3 text-xs">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {bookings.map((booking, index) => (
          <div key={index} className="border border-gray-100 rounded-lg p-3 hover:shadow-sm hover:border-gray-200 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 font-opensans text-sm">
                  {booking.destination}
                </h4>
                <p className="text-xs text-gray-500 font-opensans">
                  {booking.dates} • {booking.guests} guests
                </p>
                <p className="text-xs text-gray-400 font-opensans mt-1">
                  Booking ID: {booking.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : booking.status === 'pending'
                    ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
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

export default MyBookings;
