import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import Stepper from '../../components/ui/Stepper';
import Card from '../../components/ui/Card';

const BusSeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState(['B16', 'B18']);

  const steps = [
    { title: 'Seat Details', width: '175px' },
    { title: 'Passenger Details', width: '244px' },
    { title: 'Payment', width: '140px' }
  ];

  const seatData = [
    // Row 1
    { id: 'S4', type: 'available', position: { row: 1, col: 1 } },
    { id: 'B2', type: 'available', position: { row: 1, col: 2 } },
    { id: 'B4', type: 'available', position: { row: 1, col: 3 } },
    { id: 'B6', type: 'available', position: { row: 1, col: 4 } },
    { id: 'B8', type: 'available', position: { row: 1, col: 5 } },
    { id: 'B10', type: 'available', position: { row: 1, col: 6 } },
    { id: 'B12', type: 'available', position: { row: 1, col: 7 } },
    { id: 'B14', type: 'available', position: { row: 1, col: 8 } },
    { id: 'B16', type: 'selected', position: { row: 1, col: 9 } },
    { id: 'B18', type: 'selected', position: { row: 1, col: 10 } },
    { id: 'A20', type: 'available', position: { row: 1, col: 11 } },
    
    // Row 2
    { id: 'S3', type: 'booked', position: { row: 2, col: 1 } },
    { id: 'B1', type: 'booked', position: { row: 2, col: 2 } },
    { id: 'B3', type: 'booked', position: { row: 2, col: 3 } },
    { id: 'B5', type: 'booked', position: { row: 2, col: 4 } },
    { id: 'B7', type: 'available', position: { row: 2, col: 5 } },
    { id: 'B9', type: 'available', position: { row: 2, col: 6 } },
    { id: 'B11', type: 'available', position: { row: 2, col: 7 } },
    { id: 'B13', type: 'available', position: { row: 2, col: 8 } },
    { id: 'B15', type: 'available', position: { row: 2, col: 9 } },
    { id: 'B17', type: 'available', position: { row: 2, col: 10 } },
    { id: 'A19', type: 'available', position: { row: 2, col: 11 } },
    
    // Row 3 (single seats)
    { id: 'B3_2', type: 'available', position: { row: 3, col: 2 } },
    { id: 'A21', type: 'available', position: { row: 3, col: 10 } },
    
    // Row 4
    { id: 'B5_2', type: 'available', position: { row: 4, col: 1 } },
    { id: 'A2', type: 'available', position: { row: 4, col: 3 } },
    { id: 'A4', type: 'available', position: { row: 4, col: 4 } },
    { id: 'A6', type: 'available', position: { row: 4, col: 5 } },
    { id: 'A8', type: 'booked', position: { row: 4, col: 6 } },
    { id: 'A10', type: 'booked', position: { row: 4, col: 7 } },
    { id: 'A12', type: 'booked', position: { row: 4, col: 8 } },
    { id: 'A14', type: 'booked', position: { row: 4, col: 9 } },
    { id: 'A16', type: 'booked', position: { row: 4, col: 10 } },
    { id: 'A18', type: 'available', position: { row: 4, col: 11 } },
    
    // Row 5
    { id: 'A1', type: 'available', position: { row: 5, col: 3 } },
    { id: 'A3', type: 'available', position: { row: 5, col: 4 } },
    { id: 'A5', type: 'available', position: { row: 5, col: 5 } },
    { id: 'A7', type: 'available', position: { row: 5, col: 6 } },
    { id: 'A9', type: 'available', position: { row: 5, col: 7 } },
    { id: 'A11', type: 'available', position: { row: 5, col: 8 } },
    { id: 'A13', type: 'available', position: { row: 5, col: 9 } },
    { id: 'A15', type: 'available', position: { row: 5, col: 10 } },
    { id: 'A17', type: 'available', position: { row: 5, col: 11 } },
  ];

  const handleSeatClick = (seatId, seatType) => {
    if (seatType === 'booked') return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatIcon = (type) => {
    switch (type) {
      case 'booked':
        return '/images/img_mdicarseat_red_300_01.svg';
      case 'selected':
        return '/images/img_mdicarseat_blue_gray_500.svg';
      default:
        return '/images/img_mdicarseat_gray_400.svg';
    }
  };

  const getSeatCursor = (type) => {
    return type === 'booked' ? 'cursor-not-allowed' : 'cursor-pointer';
  };

  const totalPrice = selectedSeats.length * 2000;
  const availableSeats = seatData.filter(seat => seat.type === 'available').length;

  const handleProceedToPassengerDetails = () => {
    if (selectedSeats.length > 0) {
      alert(`Proceeding to passenger details with seats: ${selectedSeats.join(', ')}`);
    } else {
      alert('Please select at least one seat to proceed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-opensans">
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-[75px] py-8">
        {/* Bus Information Card */}
        <Card className="mb-8 h-[121px] flex items-center justify-between px-[51px]">
          <div>
            <h2 className="text-[20px] font-bold text-[#3d3d3d] mb-1">
              Name or No of the bus
            </h2>
            <p className="text-[14px] font-semibold text-[#8f8f8f]">
              Tourist A/c, Delux
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-[18px] font-bold text-[#3d3d3d] mb-1">
              06/06/2024
            </p>
            <p className="text-[24px] font-bold text-[#3d3d3d]">
              16:00
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-[20px] font-bold text-[#3d3d3d] mb-1">
                Kathmandu
              </h3>
              <p className="text-[18px] font-semibold text-[#8f8f8f]">
                Boarding place name
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-[98px] h-[3px] bg-[#efbdc0]"></div>
              <img
                src="/images/img_group_red_300.svg"
                alt="bus icon"
                className="w-[32px] h-[32px]"
              />
              <div className="w-[98px] h-[3px] bg-[#efbdc0]"></div>
            </div>
            
            <div>
              <h3 className="text-[20px] font-bold text-[#3d3d3d] mb-1">
                Birgunj
              </h3>
              <p className="text-[18px] font-semibold text-[#8f8f8f]">
                Dropping place name
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-[14px] font-bold text-[#8f8f8f]">9h</p>
            </div>
          </div>
        </Card>

        {/* Progress Stepper */}
        <div className="flex justify-center mb-8">
          <Stepper steps={steps} currentStep={0} />
        </div>

        {/* Seat Selection */}
        <Card className="mb-8 p-6">
          {/* Legend */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-[16px] h-[16px] bg-[#df7a80] rounded-full"></div>
                <span className="text-[20px] font-bold text-[#3d3d3d]">Booked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-[16px] h-[16px] bg-[#5a9f82] rounded-full"></div>
                <span className="text-[20px] font-bold text-[#3d3d3d]">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-[16px] h-[16px] bg-[#b0b0b0] rounded-full"></div>
                <span className="text-[20px] font-bold text-[#3d3d3d]">Available</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <img
                src="/images/img_mdicarseat.svg"
                alt="seat icon"
                className="w-[32px] h-[32px]"
              />
              <span className="text-[24px] font-bold text-[#388b68]">
                {availableSeats} Seats left
              </span>
            </div>
          </div>

          {/* Seat Layout */}
          <div className="grid grid-cols-11 gap-4 max-w-[1270px] mx-auto">
            {Array.from({ length: 5 }, (_, rowIndex) => (
              seatData
                .filter(seat => seat.position.row === rowIndex + 1)
                .map(seat => {
                  const seatType = selectedSeats.includes(seat.id) ? 'selected' : seat.type;
                  return (
                    <div
                      key={seat.id}
                      className={`flex flex-col items-center ${getSeatCursor(seat.type)}`}
                      style={{ gridColumn: seat.position.col }}
                      onClick={() => handleSeatClick(seat.id, seat.type)}
                    >
                      <img
                        src={getSeatIcon(seatType)}
                        alt={`seat ${seat.id}`}
                        className="w-[68px] h-[68px] mb-2"
                      />
                      <span className="text-[20px] font-bold text-[#8f8f8f]">
                        {seat.id}
                      </span>
                    </div>
                  );
                })
            ))}
          </div>
        </Card>

        {/* Booking Summary */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[24px] font-bold text-[#3d3d3d] mb-2">
                Selected Seat(s)
              </h3>
              <p className="text-[28px] font-bold text-[#388b68]">
                {selectedSeats.join(', ') || 'No seats selected'}
              </p>
            </div>
            
            <div className="flex items-center space-x-8">
              <span className="text-[28px] font-bold text-[#3d3d3d]">
                Rs. {totalPrice.toFixed(2)}
              </span>
              
              <Button
                onClick={handleProceedToPassengerDetails}
                className="bg-[#0a639d] text-white px-4 py-3 rounded-[12px] h-[60px] w-[348px] flex items-center justify-center space-x-2"
                disabled={selectedSeats.length === 0}
              >
                <span className="text-[24px] font-bold">
                  Go to passenger details
                </span>
                <img
                  src="/images/img_hicon_bold_right_2.svg"
                  alt="arrow right"
                  className="w-[28px] h-[28px]"
                />
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default BusSeatSelection;