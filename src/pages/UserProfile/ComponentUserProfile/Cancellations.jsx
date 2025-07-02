import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const Cancellations = ({ cancellations = [] }) => {
  const [expandedId, setExpandedId] = useState(null);

  // Static data for demonstration
  const staticCancellations = [
    {
      id: "BK-67890123",
      destination: "Kathmandu to Pokhara",
      busOperator: "Sona Travel",
      originalDates: "2024-07-15 to 2024-07-18",
      cancelledDate: "2024-07-10",
      refundStatus: "completed",
      refundAmount: 2500,
      originalAmount: 3000,
      processingFee: 500,
      seats: ["A1", "A2"],
      reason: "Change in travel plans",
      refundMethod: "Bank Transfer",
      refundDate: "2024-07-12",
      cancellationPolicy: "Standard cancellation - 5 days before travel"
    },
    {
      id: "BK-67890124",
      destination: "Kathmandu to Chitwan",
      busOperator: "Sona Travel",
      originalDates: "2024-06-20 to 2024-06-22",
      cancelledDate: "2024-06-15",
      refundStatus: "processing",
      refundAmount: 1800,
      originalAmount: 2200,
      processingFee: 400,
      seats: ["B3"],
      reason: "Medical emergency",
      refundMethod: "Digital Wallet",
      refundDate: null,
      cancellationPolicy: "Medical emergency - Special consideration"
    },
    {
      id: "BK-67890125",
      destination: "Kathmandu to Lumbini",
      busOperator: "Sona Travel",
      originalDates: "2024-05-10 to 2024-05-13",
      cancelledDate: "2024-05-05",
      refundStatus: "pending",
      refundAmount: 3200,
      originalAmount: 4000,
      processingFee: 800,
      seats: ["C1", "C2", "C3"],
      reason: "Weather conditions",
      refundMethod: "Bank Transfer",
      refundDate: null,
      cancellationPolicy: "Weather cancellation - Full consideration"
    },
    {
      id: "BK-67890126",
      destination: "Pokhara to Jomsom",
      busOperator: "Sona Travel",
      originalDates: "2024-04-25 to 2024-04-28",
      cancelledDate: "2024-04-20",
      refundStatus: "completed",
      refundAmount: 1400,
      originalAmount: 1800,
      processingFee: 400,
      seats: ["D2"],
      reason: "Personal reasons",
      refundMethod: "Digital Wallet",
      refundDate: "2024-04-22",
      cancellationPolicy: "Standard cancellation - Within policy"
    }
  ];

  const displayCancellations = cancellations.length > 0 ? cancellations : staticCancellations;

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'processing':
        return (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (displayCancellations.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
            No Cancellations Found
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Your cancelled bookings and refund information will appear here when available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cancellations & Refunds</h2>
          <p className="text-gray-600">Track your cancelled bookings and refund status</p>
        </div>
        <Button variant="outline" className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download History
        </Button>
      </div>

      {/* Cancellations List */}
      <div className="space-y-6">
        {displayCancellations.map((cancellation, index) => (
          <div key={cancellation.id || index} className="group relative">
            {/* 3D Card Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-105"></div>
            
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              {/* Main Content */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{cancellation.destination}</h4>
                        <p className="text-sm text-gray-600">{cancellation.busOperator}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="flex items-center gap-2 text-gray-600 mb-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          Booking ID: <span className="font-mono font-medium">{cancellation.id}</span>
                        </span>
                        <span className="flex items-center gap-2 text-gray-600 mb-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Travel Dates: {cancellation.originalDates}
                        </span>
                        <span className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Cancelled: {cancellation.cancelledDate}
                        </span>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 text-gray-600 mb-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Seats: {cancellation.seats.join(', ')}
                        </span>
                        <span className="flex items-center gap-2 text-gray-600 mb-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          Refund: Rs. {cancellation.refundAmount}
                        </span>
                        <span className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Reason: {cancellation.reason}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-full border font-semibold text-sm ${getStatusColor(cancellation.refundStatus)}`}>
                      {getStatusIcon(cancellation.refundStatus)}
                      {cancellation.refundStatus.toUpperCase()}
                    </div>
                    <button
                      onClick={() => toggleExpanded(cancellation.id)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 text-sm font-medium flex items-center gap-2"
                    >
                      <span>Details</span>
                      <svg 
                        className={`w-4 h-4 transform transition-transform duration-200 ${expandedId === cancellation.id ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Expanded Details */}
              {expandedId === cancellation.id && (
                <div className="border-t border-gray-100 bg-gray-50/50 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3">Financial Details</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Original Amount:</span>
                          <span className="font-medium">Rs. {cancellation.originalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Processing Fee:</span>
                          <span className="font-medium text-red-600">- Rs. {cancellation.processingFee}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200">
                          <span className="text-gray-800 font-semibold">Refund Amount:</span>
                          <span className="font-bold text-green-600">Rs. {cancellation.refundAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Refund Method:</span>
                          <span className="font-medium">{cancellation.refundMethod}</span>
                        </div>
                        {cancellation.refundDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Refund Date:</span>
                            <span className="font-medium">{cancellation.refundDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3">Cancellation Policy</h5>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {cancellation.cancellationPolicy}
                      </p>
                      
                      {cancellation.refundStatus === 'pending' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-yellow-800 text-sm font-medium">
                            Your refund is being processed and will be completed within 5-7 business days.
                          </p>
                        </div>
                      )}
                      
                      {cancellation.refundStatus === 'processing' && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-blue-800 text-sm font-medium">
                            Refund in progress. You will receive a confirmation once completed.
                          </p>
                        </div>
                      )}
                      
                      {cancellation.refundStatus === 'completed' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-green-800 text-sm font-medium">
                            Refund completed successfully on {cancellation.refundDate}.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cancellations;
