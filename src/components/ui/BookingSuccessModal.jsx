import React from 'react';

const BookingSuccessModal = ({ 
  isOpen, 
  onClose, 
  bookingDetails 
}) => {
  if (!isOpen || !bookingDetails) return null;

  const {
    bookingId,
    merchantTransactionId,
    prn,
    amount,
    passengers,
    selectedSeats,
    travelDate,
    origin,
    destination,
    paymentMethod
  } = bookingDetails;

  const handlePrintTicket = () => {
    window.print();
  };

  const handleDownloadTicket = () => {
    // Convert booking details to a simple text format for download
    const ticketContent = `
SONA TRAVEL & TOURS - BOOKING CONFIRMATION
==========================================

Booking ID: ${bookingId || merchantTransactionId}
Transaction ID: ${merchantTransactionId}
PRN: ${prn}

JOURNEY DETAILS:
From: ${origin}
To: ${destination}
Date: ${travelDate}
Seats: ${selectedSeats?.join(', ')}

PASSENGER DETAILS:
${passengers?.map((p, i) => `${i + 1}. ${p.fullName} (${p.gender}) - ${p.phoneNumber}`).join('\n')}

PAYMENT DETAILS:
Amount Paid: Rs. ${amount?.toLocaleString()}
Payment Method: ${paymentMethod}
Payment Status: Completed

Thank you for choosing Sona Travel & Tours!
`;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-${bookingId || merchantTransactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-green-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700 mb-2">
              Your bus ticket has been successfully booked!
            </p>
            <p className="text-sm text-gray-600">
              Please save your booking details and arrive at the boarding point 30 minutes early.
            </p>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Booking ID</label>
                <p className="text-base font-bold text-blue-600 font-mono">{bookingId || merchantTransactionId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">PRN</label>
                <p className="text-base font-bold text-blue-600 font-mono">{prn}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-600">From</label>
                <p className="text-base font-semibold text-gray-800">{origin}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">To</label>
                <p className="text-base font-semibold text-gray-800">{destination}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Travel Date</label>
                <p className="text-base font-semibold text-gray-800">{travelDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Seats</label>
                <p className="text-base font-semibold text-gray-800">{selectedSeats?.join(', ')}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total Amount Paid</span>
                <span className="text-xl font-bold text-green-600">Rs. {amount?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          {passengers && passengers.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Passenger Details</h3>
              <div className="space-y-3">
                {passengers.map((passenger, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-blue-200 last:border-b-0">
                    <div>
                      <p className="font-semibold text-gray-800">{passenger.fullName}</p>
                      <p className="text-sm text-gray-600">{passenger.gender} • {passenger.phoneNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">Seat {passenger.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={handlePrintTicket}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              🖨️ Print Ticket
            </button>
            
            <button 
              onClick={handleDownloadTicket}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              💾 Download Ticket
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Please arrive at the boarding point 30 minutes before departure</li>
              <li>• Carry a valid ID proof along with this ticket</li>
              <li>• No refund for no-show or late arrival</li>
              <li>• For any queries, contact customer support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessModal;
