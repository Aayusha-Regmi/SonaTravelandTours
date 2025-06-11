
import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/ui/Button';
import Stepper from '../../../components/common/BookingStepComponent/Stepper';
import Card from './ComponentSeatSelection/CardSeatSelection';

const BusSeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableSeatsCount, setAvailableSeatsCount] = useState(0);

  const steps = ['Seat Details', 'Passenger Details', 'Payment'];
  const currentStep = 1;
  const seatPrice = 2000; // Price per seat in Rs.

  // Seat configuration with their status
  const seatConfig = {
    // Row 1 (S4, B2, B4, B6, B8, B10, B12, B14, B16, B18)
    row1: [
      { id: 'S4', type: 'available', position: { x: 32, y: 119 } },
      { id: 'B2', type: 'available', position: { x: 212, y: 124 } },
      { id: 'B4', type: 'available', position: { x: 320, y: 124 } },
      { id: 'B6', type: 'available', position: { x: 427, y: 124 } },
      { id: 'B8', type: 'available', position: { x: 535, y: 124 } },
      { id: 'B10', type: 'available', position: { x: 643, y: 124 } },
      { id: 'B12', type: 'available', position: { x: 762, y: 124 } },
      { id: 'B14', type: 'available', position: { x: 882, y: 124 } },
      { id: 'B16', type: 'available', position: { x: 1002, y: 124 } },
      { id: 'B18', type: 'available', position: { x: 1121, y: 124 } },
    ],
    // Row 2 (S3, B1, B3, B5, B7, B9, B11, B13, B15, B17)
    row2: [
      { id: 'S3', type: 'booked', position: { x: 32, y: 217 } },
      { id: 'B1', type: 'booked', position: { x: 207, y: 217 } },
      { id: 'B3', type: 'booked', position: { x: 316, y: 217 } },
      { id: 'B5', type: 'booked', position: { x: 425, y: 217 } },
      { id: 'B7', type: 'available', position: { x: 534, y: 217 } },
      { id: 'B9', type: 'available', position: { x: 643, y: 217 } },
      { id: 'B11', type: 'available', position: { x: 752, y: 217 } },
      { id: 'B13', type: 'available', position: { x: 873, y: 217 } },
      { id: 'B15', type: 'available', position: { x: 994, y: 217 } },
      { id: 'B17', type: 'available', position: { x: 1115, y: 217 } },
    ],
    // Row 3 (S2, A19)
    row3: [
      { id: 'S2', type: 'available', position: { x: 32, y: 308 } },
      { id: 'A19', type: 'available', position: { x: 1121, y: 308 } },
    ],
    // Row 4 (S1, A2, A4, A6, A8, A10, A12, A14, A16)
    row4: [
      { id: 'S1', type: 'available', position: { x: 32, y: 399 } },
      { id: 'A2', type: 'available', position: { x: 318, y: 399 } },
      { id: 'A4', type: 'available', position: { x: 428, y: 399 } },
      { id: 'A6', type: 'available', position: { x: 538, y: 399 } },
      { id: 'A8', type: 'booked', position: { x: 648, y: 399 } },
      { id: 'A10', type: 'booked', position: { x: 758, y: 399 } },
      { id: 'A12', type: 'booked', position: { x: 879, y: 399 } },
      { id: 'A14', type: 'booked', position: { x: 1000, y: 399 } },
      { id: 'A16', type: 'booked', position: { x: 1121, y: 399 } },
    ],
    // Row 5 (A1, A3, A5, A7, A9, A11, A13, A15)
    row5: [
      { id: 'A1', type: 'available', position: { x: 323, y: 494 } },
      { id: 'A3', type: 'available', position: { x: 433, y: 494 } },
      { id: 'A5', type: 'available', position: { x: 543, y: 494 } },
      { id: 'A7', type: 'available', position: { x: 653, y: 494 } },
      { id: 'A9', type: 'available', position: { x: 763, y: 494 } },
      { id: 'A11', type: 'available', position: { x: 873, y: 494 } },
      { id: 'A13', type: 'available', position: { x: 994, y: 494 } },
      { id: 'A15', type: 'available', position: { x: 1115, y: 494 } },
    ],
  };

  // Calculate available seats and update price when selectedSeats change
  useEffect(() => {
    // Calculate available seats count
    const availableCount = Object.values(seatConfig)
      .flat()
      .filter(seat => seat.type === 'available' && !selectedSeats.includes(seat.id)).length;
    
    setAvailableSeatsCount(availableCount);
    
    // Update total price based on selected seats
    setTotalPrice(selectedSeats.length * seatPrice);
  }, [selectedSeats, seatConfig]);

  const handleSeatClick = (seatId, seatType) => {
    if (seatType === 'booked') return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatIcon = (seatType, isSelected) => {
    if (seatType === 'booked') return '/images/img_mdicarseat_red_300_01.svg';
    if (isSelected) return '/images/img_mdicarseat_blue_gray_500.svg';
    return '/images/img_mdicarseat_gray_400.svg';
  };

  const handleProceedToPassengerDetails = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to continue.');
      return;
    }
    alert(`Proceeding to passenger details with seats: ${selectedSeats.join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-[75px] py-8">
        {/* Bus Details Card */}
        <Card className="mb-8 h-[121px] w-full">
          <div className="flex items-center justify-between h-full px-[51px]">
            <div>
              <h2 className="text-[20px] font-bold text-[#3d3d3d] font-opensans mb-1">
                Name or No of the bus
              </h2>
              <p className="text-[14px] font-semibold text-[#8f8f8f] font-opensans">
                Tourist A/c, Delux
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-[18px] font-bold text-[#3d3d3d] font-opensans">
                06/06/2024
              </p>
              <p className="text-[24px] font-bold text-[#3d3d3d] font-opensans">
                16:00
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="text-[20px] font-bold text-[#3d3d3d] font-opensans">
                  Kathmandu
                </h3>
                <p className="text-[18px] font-semibold text-[#8f8f8f] font-opensans">
                  Boarding place name
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-[98px] h-[3px] bg-[#efbdc0]"></div>
                <img 
                  src="/images/img_group_red_300.svg" 
                  alt="Bus icon" 
                  className="w-[32px] h-[32px]"
                />
                <div className="w-[98px] h-[3px] bg-[#efbdc0]"></div>
              </div>
              
              <div>
                <h3 className="text-[20px] font-bold text-[#3d3d3d] font-opensans">
                  Birgunj
                </h3>
                <p className="text-[18px] font-semibold text-[#8f8f8f] font-opensans">
                  Dropping place name
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-[14px] font-bold text-[#8f8f8f] font-opensans">
                9h
              </p>
            </div>
          </div>
        </Card>

        {/* Stepper */}
        <div className="mb-8 flex justify-center">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Seat Selection Card */}
        <Card className="mb-8 h-[594px] w-full relative">
          {/* Legend */}
          <div className="flex items-center justify-between mb-8 px-[19px] pt-[37px]">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-[16px] h-[16px] bg-[#df7a80] rounded-full"></div>
                <span className="text-[20px] font-bold text-[#3d3d3d] font-opensans">Booked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-[16px] h-[16px] bg-[#5a9f82] rounded-full"></div>
                <span className="text-[20px] font-bold text-[#3d3d3d] font-opensans">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-[16px] h-[16px] bg-[#b0b0b0] rounded-full"></div>
                <span className="text-[20px] font-bold text-[#3d3d3d] font-opensans">Available</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <img 
                src="/images/img_mdicarseat.svg" 
                alt="Seat icon" 
                className="w-[32px] h-[32px]"
              />
              <span className="text-[24px] font-bold text-[#388b68] font-opensans">
                {availableSeatsCount} Seats left
              </span>
            </div>
          </div>

          {/* Seat Map */}
          <div className="relative px-[32px]">
            {/* Render all seats */}
            {Object.values(seatConfig).flat().map((seat) => {
              const isSelected = selectedSeats.includes(seat.id);
              const currentType = isSelected ? 'selected' : seat.type;
              
              return (
                <div
                  key={seat.id}
                  className={`absolute cursor-pointer ${currentType === 'booked' ? 'cursor-not-allowed' : 'hover:scale-105'} transition-transform`}
                  style={{
                    left: `${seat.position.x}px`,
                    top: `${seat.position.y - 119}px`,
                  }}
                  onClick={() => handleSeatClick(seat.id, seat.type)}
                  title={`Seat ${seat.id} - ${currentType.charAt(0).toUpperCase() + currentType.slice(1)}`}
                >
                  <div className="relative">
                    <img
                      src={getSeatIcon(seat.type, isSelected)}
                      alt={`Seat ${seat.id}`}
                      className="w-[68px] h-[68px]"
                    />
                    <span className="absolute bottom-0 right-0 text-[20px] font-bold text-[#8f8f8f] font-opensans">
                      {seat.id}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Selected Seats and Proceed Card */}
        <Card className="h-[111px] w-full">
          <div className="flex items-center justify-between h-full px-[24px]">
            <div>
              <h3 className="text-[24px] font-bold text-[#3d3d3d] font-opensans mb-2">
                Selected Seat(s)
              </h3>
              <p className="text-[28px] font-bold text-[#388b68] font-opensans">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
              </p>
            </div>
            
            <div className="flex items-center space-x-8">
              <span className="text-[28px] font-bold text-[#3d3d3d] font-opensans">
                Rs. {totalPrice.toFixed(2)}
              </span>
              
              <Button
                onClick={handleProceedToPassengerDetails}
                className={`w-[348px] h-[60px] text-[24px] ${selectedSeats.length === 0 ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={selectedSeats.length === 0}
                icon={
                  <img 
                    src="/images/img_hicon_bold_right_2.svg" 
                    alt="Arrow right" 
                    className="w-[28px] h-[28px] ml-4"
                  />
                }
              >
                Go to passenger details
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