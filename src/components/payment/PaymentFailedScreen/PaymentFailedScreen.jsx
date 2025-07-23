import React from 'react';
import PropTypes from 'prop-types';

const PaymentFailedScreen = ({ 
  errorMessage, 
  onRetry, 
  onClose,
  bookingDetails 
}) => {
  const {
    amount,
    busDetails,
    dateOfTravel
  } = bookingDetails || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 m-4 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Error Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-600">Unfortunately, your payment could not be processed</p>
        </div>

        {/* Error Message */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
          <p className="text-red-700 text-sm">
            {errorMessage || 'An unexpected error occurred during payment processing. Please try again.'}
          </p>
        </div>

        {/* Booking Summary */}
        {bookingDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
            
            <div className="space-y-2">
              {amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-gray-900">NPR {amount}</span>
                </div>
              )}
              
              {dateOfTravel && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Travel Date:</span>
                  <span className="font-semibold text-gray-900">{dateOfTravel}</span>
                </div>
              )}
              
              {busDetails?.route && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-semibold text-gray-900">{busDetails.route}</span>
                </div>
              )}
              
              {busDetails?.departureTime && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure:</span>
                  <span className="font-semibold text-gray-900">{busDetails.departureTime}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Common Reasons */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Common Reasons for Payment Failure:</h3>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>Insufficient balance in your account</li>
            <li>Incorrect payment credentials</li>
            <li>Network connectivity issues</li>
            <li>Bank server temporarily unavailable</li>
            <li>Transaction limit exceeded</li>
            <li>Card expired or blocked</li>
          </ul>
        </div>

        {/* What to do next */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">What to do next:</h3>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            <li>Check your account balance and try again</li>
            <li>Verify your payment credentials</li>
            <li>Try using a different payment method</li>
            <li>Contact your bank if the issue persists</li>
            <li>Contact our support team for assistance</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retry Payment
            </button>
          )}
          
          <button
            onClick={() => {
              // You can add logic here to redirect to search page or home
              onClose();
            }}
            className="w-full bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Back to Search
          </button>
          
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>

        {/* Support Information */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Need help? Contact our support team</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
              <a 
                href="tel:+977-1-4441234" 
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +977-1-4441234
              </a>
              <a 
                href="mailto:support@sonatours.com" 
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@sonatours.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PaymentFailedScreen.propTypes = {
  errorMessage: PropTypes.string,
  onRetry: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  bookingDetails: PropTypes.shape({
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    busDetails: PropTypes.object,
    dateOfTravel: PropTypes.string
  })
};

export default PaymentFailedScreen;
