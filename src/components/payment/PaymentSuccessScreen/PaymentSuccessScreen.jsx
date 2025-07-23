import React from 'react';
import PropTypes from 'prop-types';

const PaymentSuccessScreen = ({ 
  bookingDetails, 
  onClose 
}) => {
  const {
    bookingId,
    transactionId,
    amount,
    passengerInfo,
    busDetails,
    dateOfTravel
  } = bookingDetails || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 m-4 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your booking has been confirmed</p>
        </div>

        {/* Booking Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Booking Confirmation</h3>
          
          <div className="space-y-3">
            {bookingId && (
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-semibold text-gray-900">{bookingId}</span>
              </div>
            )}
            
            {transactionId && (
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-semibold text-gray-900">{transactionId}</span>
              </div>
            )}
            
            {amount && (
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold text-green-600">NPR {amount}</span>
              </div>
            )}
            
            {dateOfTravel && (
              <div className="flex justify-between">
                <span className="text-gray-600">Travel Date:</span>
                <span className="font-semibold text-gray-900">{dateOfTravel}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bus Details */}
        {busDetails && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Bus Details</h3>
            <div className="space-y-2">
              {busDetails.busName && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Bus:</span>
                  <span className="font-semibold text-gray-900">{busDetails.busName}</span>
                </div>
              )}
              {busDetails.route && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-semibold text-gray-900">{busDetails.route}</span>
                </div>
              )}
              {busDetails.departureTime && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure:</span>
                  <span className="font-semibold text-gray-900">{busDetails.departureTime}</span>
                </div>
              )}
              {busDetails.seatNumbers && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Seats:</span>
                  <span className="font-semibold text-gray-900">{busDetails.seatNumbers}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Passenger Details */}
        {passengerInfo && passengerInfo.length > 0 && (
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Passenger Details</h3>
            <div className="space-y-2">
              {passengerInfo.map((passenger, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">Passenger {index + 1}:</span>
                  <span className="font-semibold text-gray-900">
                    {passenger.name} ({passenger.age || 'N/A'})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            <li>Please arrive at the departure point 30 minutes early</li>
            <li>Carry a valid ID proof during travel</li>
            <li>SMS confirmation will be sent to your registered mobile number</li>
            <li>For any queries, contact our customer support</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => window.print()}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Ticket
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

PaymentSuccessScreen.propTypes = {
  bookingDetails: PropTypes.shape({
    bookingId: PropTypes.string,
    transactionId: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    passengerInfo: PropTypes.array,
    busDetails: PropTypes.object,
    dateOfTravel: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
};

export default PaymentSuccessScreen;
