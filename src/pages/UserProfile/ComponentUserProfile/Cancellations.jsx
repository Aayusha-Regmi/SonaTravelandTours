import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const Cancellations = ({ cancellations = [] }) => {
  const [expandedId, setExpandedId] = useState(null);

  // Static data for demonstration
  const staticCancellations = [
    {
      id: "BK-67890123",
      destination: "Birgunj to Gaushala",
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
      destination: "Birgunj to Kathmandu",
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
      destination: "Kathmandu to Kalaiya",
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
      destination: "Banepa to Birgunj",
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

  // Download history as PDF using client-side generation
  const downloadHistoryAsPDF = () => {
    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Cancellation History</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { color: #1f2937; margin-bottom: 5px; }
          .header p { color: #6b7280; }
          .cancellation { border: 1px solid #e5e7eb; margin-bottom: 20px; padding: 15px; border-radius: 8px; }
          .cancellation-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
          .booking-id { font-weight: bold; color: #1f2937; }
          .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
          .completed { background-color: #d1fae5; color: #065f46; }
          .processing { background-color: #fed7aa; color: #9a3412; }
          .pending { background-color: #fef3c7; color: #92400e; }
          .details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .detail-item { margin-bottom: 8px; }
          .detail-label { font-weight: bold; color: #374151; }
          .detail-value { color: #6b7280; }
          .amounts { background-color: #f9fafb; padding: 10px; border-radius: 4px; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Cancellation History</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        ${displayCancellations.map(cancellation => `
          <div class="cancellation">
            <div class="cancellation-header">
              <span class="booking-id">Booking ID: ${cancellation.id}</span>
              <span class="status ${cancellation.refundStatus}">${cancellation.refundStatus.toUpperCase()}</span>
            </div>
            
            <div class="details">
              <div>
                <div class="detail-item">
                  <span class="detail-label">Route:</span>
                  <span class="detail-value">${cancellation.destination}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Bus Operator:</span>
                  <span class="detail-value">${cancellation.busOperator}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Travel Dates:</span>
                  <span class="detail-value">${cancellation.originalDates}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Cancelled On:</span>
                  <span class="detail-value">${cancellation.cancelledDate}</span>
                </div>
              </div>
              
              <div>
                <div class="detail-item">
                  <span class="detail-label">Seats:</span>
                  <span class="detail-value">${cancellation.seats.join(', ')}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Reason:</span>
                  <span class="detail-value">${cancellation.reason}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Refund Method:</span>
                  <span class="detail-value">${cancellation.refundMethod}</span>
                </div>
                ${cancellation.refundDate ? `
                <div class="detail-item">
                  <span class="detail-label">Refund Date:</span>
                  <span class="detail-value">${cancellation.refundDate}</span>
                </div>
                ` : ''}
              </div>
            </div>
            
            <div class="amounts">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                <div>
                  <span class="detail-label">Original Amount:</span><br>
                  <span class="detail-value">Rs. ${cancellation.originalAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span class="detail-label">Processing Fee:</span><br>
                  <span class="detail-value">Rs. ${cancellation.processingFee.toLocaleString()}</span>
                </div>
                <div>
                  <span class="detail-label">Refund Amount:</span><br>
                  <span class="detail-value">Rs. ${cancellation.refundAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </body>
      </html>
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      
      // Close the window after printing (with a small delay)
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    };
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cancellations & Refunds</h2>
          <p className="text-gray-600">Track your cancelled bookings and refund status</p>
        </div>
        <Button variant="outline" className="px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={downloadHistoryAsPDF}>
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
