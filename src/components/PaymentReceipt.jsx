import React from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

const PaymentReceipt = ({ receiptData, onClose }) => {
  if (!receiptData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Loading receipt...</h3>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
        return <CheckCircleIcon className="h-8 w-8 text-green-500" />;
      case 'failed':
      case 'error':
        return <XCircleIcon className="h-8 w-8 text-red-500" />;
      default:
        return <ClockIcon className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'failed':
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'Rs. 0';
    return `Rs. ${parseFloat(amount).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {getStatusIcon(receiptData.status)}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Receipt</h1>
          <p className="text-gray-600 mt-2">
            {receiptData.status === 'success' || receiptData.status === 'completed' 
              ? 'Your payment has been processed successfully' 
              : 'Payment processing status'}
          </p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Status Banner */}
          <div className={`px-6 py-4 border-b ${getStatusColor(receiptData.status)}`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm uppercase tracking-wide">
                Payment Status: {receiptData.status || 'Unknown'}
              </span>
              <span className="text-sm">
                {formatDate(receiptData.createdAt || receiptData.timestamp)}
              </span>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="px-6 py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Transaction ID</label>
                <p className="mt-1 text-sm text-gray-900 font-mono">
                  {receiptData.merchantTxnId || receiptData.transactionId || 'N/A'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Gateway Transaction ID</label>
                <p className="mt-1 text-sm text-gray-900 font-mono">
                  {receiptData.gatewayTxnId || receiptData.gatewayTransactionId || 'N/A'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Payment Method</label>
                <p className="mt-1 text-sm text-gray-900">
                  {receiptData.paymentMethod || 'Online Payment'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Amount Paid</label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {formatCurrency(receiptData.amount || receiptData.totalAmount)}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          {receiptData.bookingDetails && (
            <div className="px-6 py-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
              <div className="space-y-3">
                {receiptData.bookingDetails.route && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Route</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {receiptData.bookingDetails.route.from} → {receiptData.bookingDetails.route.to}
                    </p>
                  </div>
                )}
                {receiptData.bookingDetails.departureDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Departure Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(receiptData.bookingDetails.departureDate)}
                    </p>
                  </div>
                )}
                {receiptData.bookingDetails.seats && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Seats</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {Array.isArray(receiptData.bookingDetails.seats) 
                        ? receiptData.bookingDetails.seats.join(', ')
                        : receiptData.bookingDetails.seats}
                    </p>
                  </div>
                )}
                {receiptData.bookingDetails.passengers && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Number of Passengers</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {receiptData.bookingDetails.passengers}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fare Breakdown */}
          {receiptData.fareBreakdown && (
            <div className="px-6 py-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fare Breakdown</h3>
              <div className="space-y-2">
                {receiptData.fareBreakdown.baseFare && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Base Fare</span>
                    <span className="text-sm text-gray-900">{formatCurrency(receiptData.fareBreakdown.baseFare)}</span>
                  </div>
                )}
                {receiptData.fareBreakdown.vat && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">VAT (13%)</span>
                    <span className="text-sm text-gray-900">{formatCurrency(receiptData.fareBreakdown.vat)}</span>
                  </div>
                )}
                {receiptData.fareBreakdown.serviceFee && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Service Fee</span>
                    <span className="text-sm text-gray-900">{formatCurrency(receiptData.fareBreakdown.serviceFee)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-sm text-gray-900">Total Amount</span>
                    <span className="text-sm text-gray-900">
                      {formatCurrency(receiptData.amount || receiptData.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customer Details */}
          {receiptData.customerDetails && (
            <div className="px-6 py-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {receiptData.customerDetails.name && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{receiptData.customerDetails.name}</p>
                  </div>
                )}
                {receiptData.customerDetails.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{receiptData.customerDetails.email}</p>
                  </div>
                )}
                {receiptData.customerDetails.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{receiptData.customerDetails.phone}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message/Note */}
          {receiptData.message && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Note:</span> {receiptData.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Print Receipt
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Thank you for choosing Sona Travel and Tours</p>
          <p>For support, contact us at support@sonatraveltours.com</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
