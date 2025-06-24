import React from 'react';
import Button from '../../../components/ui/Button';

const Cancellations = ({ cancellations = [] }) => {
  if (cancellations.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-12 h-12 mx-auto mb-3 bg-red-50 rounded-full flex items-center justify-center">
            <span className="text-lg text-red-500">✕</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 font-opensans">
            No Cancellations
          </h3>
          <p className="text-gray-500 text-sm font-opensans">
            Your cancelled bookings and refund information will be displayed here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 font-opensans">
          Cancellations & Refunds
        </h2>
        <Button variant="outline" className="h-8 px-3 text-xs">
          Download History
        </Button>
      </div>

      <div className="space-y-3">
        {cancellations.map((cancellation, index) => (
          <div key={index} className="border border-red-100 bg-red-50/30 rounded-lg p-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 font-opensans text-sm">
                  {cancellation.destination}
                </h4>
                <p className="text-xs text-gray-500 font-opensans">
                  Originally booked: {cancellation.originalDates}
                </p>
                <p className="text-xs text-red-600 font-opensans">
                  Cancelled on: {cancellation.cancelledDate}
                </p>
                <p className="text-xs text-gray-400 font-opensans mt-1">
                  Booking ID: {cancellation.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cancellation.refundStatus === 'completed' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : cancellation.refundStatus === 'processing'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                }`}>
                  {cancellation.refundStatus}
                </span>
                <Button variant="outline" size="small" className="h-7 px-2 text-xs">
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>    </div>
  );
};

export default Cancellations;
