/**
 * API service for bus search and booking operations
 */

// Sample bus data for testing filters - at least 8 buses with different values
const sampleBusData = [
  {
    id: 'bus-001',
    busName: 'Sona Travels -1708',
    busType: 'Deluxe A/C',
    departureTime: '06:30',
    arrivalTime: '12:45',
    boardingPoint: 'New Bus Park, Kathmandu',
    droppingPoint: 'Adarsha Nagar, Birgunj',
    duration: '6h 15m',
    fare: 1250,
    rating: '4.8',
    availableSeats: 22,
    facilities: ['OLED OnePlus 42" TV', 'Full A/C & Air Suspension', 'Multi-zone A/C', 'CCTV Surveillance'],
  },
  {
    id: 'bus-002',
    busName: 'Sona Travels Super -1705',
    busType: 'Super Deluxe',
    departureTime: '08:00',
    arrivalTime: '14:30',
    boardingPoint: 'Kalanki, Kathmandu',
    droppingPoint: 'Ghantaghar, Birgunj',
    duration: '6h 30m',
    fare: 1450,
    rating: '4.5',
    availableSeats: 15,
    facilities: ['Navigation system', 'Full A/C & Air Suspension', 'Heated front seats', 'CCTV Surveillance', 'Sony Dolby Digital system'],
  },
  {
    id: 'bus-003',
    busName: 'Sona Travels Tourist -1701',
    busType: 'Tourist',
    departureTime: '10:15',
    arrivalTime: '16:30',
    boardingPoint: 'Balkhu, Kathmandu',
    droppingPoint: 'Birta, Birgunj',
    duration: '6h 15m',
    fare: 950,
    rating: '3.7',
    availableSeats: 8,
    facilities: ['Multi-zone A/C', 'CCTV Surveillance'],
  },
  {
    id: 'bus-004',
    busName: 'Sona Travels -1709',
    busType: 'AC',
    departureTime: '12:30',
    arrivalTime: '19:00',
    boardingPoint: 'Koteshwor, Kathmandu',
    droppingPoint: 'Powerhouse, Birgunj',
    duration: '6h 30m',
    fare: 1100,
    rating: '4.2',
    availableSeats: 19,
    facilities: ['Full A/C & Air Suspension', 'Navigation system', 'OLED OnePlus 42" TV'],
  },
  {
    id: 'bus-005',
    busName: 'Sona Travels Luxury -1721',
    busType: 'Luxury',
    departureTime: '15:45',
    arrivalTime: '21:45',
    boardingPoint: 'New Bus Park, Kathmandu',
    droppingPoint: 'Rangeli, Birgunj',
    duration: '6h',
    fare: 1850,
    rating: '4.9',
    availableSeats: 12,
    facilities: ['OLED OnePlus 42" TV', 'Navigation system', 'Full A/C & Air Suspension', 'Multi-zone A/C', 'Heated front seats', 'CCTV Surveillance', 'Sony Dolby Digital system'],
  },
  {
    id: 'bus-006',
    busName: 'Sona Travels Express -1806',
    busType: 'Deluxe A/C',
    departureTime: '17:30',
    arrivalTime: '23:45',
    boardingPoint: 'Chabahil, Kathmandu',
    droppingPoint: 'Adarsha Nagar, Birgunj',
    duration: '6h 15m',
    fare: 1250,
    rating: '4.3',
    availableSeats: 16,
    facilities: ['Full A/C & Air Suspension', 'OLED OnePlus 42" TV', 'Multi-zone A/C', 'Sony Dolby Digital system'],
  },
  {
    id: 'bus-007',
    busName: 'Sona Travels -1701',
    busType: 'Super Deluxe',
    departureTime: '19:00',
    arrivalTime: '01:15',
    boardingPoint: 'New Bus Park, Kathmandu',
    droppingPoint: 'Ghantaghar, Birgunj',
    duration: '6h 15m',
    fare: 1350,
    rating: '4.6',
    availableSeats: 14,
    facilities: ['Navigation system', 'Full A/C & Air Suspension', 'Heated front seats', 'Sony Dolby Digital system'],
  },
  {
    id: 'bus-008',
    busName: 'Highway Express -1902',
    busType: 'Tourist',
    departureTime: '22:30',
    arrivalTime: '04:45',
    boardingPoint: 'Kalanki, Kathmandu',
    droppingPoint: 'Birta, Birgunj',
    duration: '6h 15m',
    fare: 950,
    rating: '3.8',
    availableSeats: 22,
    facilities: ['CCTV Surveillance', 'Multi-zone A/C'],
  }
];



/**
 * Get all available facilities for bus filtering
 * @returns {Array} - Array of facility names
 */
const getBusFacilities = () => {
  return [
    'OLED OnePlus 42" TV',
    'Navigation system',
    'Full A/C & Air Suspension',
    'Multi-zone A/C',
    'Heated front seats',
    'CCTV Surveillance',
    'Sony Dolby Digital system'
  ];
};

/**
 * Get all available bus types for filtering
 * @returns {Array} - Array of bus type names
 */
const getBusTypes = () => {
  return ['AC', 'Deluxe A/C', 'Super Deluxe', 'Tourist', 'Luxury'];
};

/**
 * Get all boarding points for filtering
 * @returns {Array} - Array of boarding point names
 */
const getBoardingPoints = () => {
  return [
    'New Bus Park, Kathmandu',
    'Kalanki, Kathmandu',
    'Balkhu, Kathmandu',
    'Koteshwor, Kathmandu',
    'Chabahil, Kathmandu',
    // Add more for demo
    
  ];
};

/**
 * Get all dropping points for filtering
 * @returns {Array} - Array of dropping point names
 */
const getDroppingPoints = () => {
  return [
    'Adarsha Nagar, Birgunj',
    'Ghantaghar, Birgunj',
    'Birta, Birgunj',
    'Powerhouse, Birgunj',
    'Rangeli, Birgunj',
   
  ];
};

/**
 * Get bus details by ID
 * @param {string} busId - ID of the bus to retrieve
 * @returns {Promise} - Promise resolving to bus details or null if not found
 */
const getBusDetails = (busId) => {
  // Return bus details instantly
  const bus = sampleBusData.find(b => b.id === busId) || null;
  return Promise.resolve(bus);
};

/**
 * Book seats on a specific bus
 * @param {string} busId - ID of the bus
 * @param {Array} selectedSeats - Array of selected seat numbers
 * @param {Object} passengerInfo - Passenger information
 * @returns {Promise} - Promise resolving to booking information
 */
const bookSeats = (busId, selectedSeats, passengerInfo) => {
  // Return booking info instantly
  const bookingId = `BK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  return Promise.resolve({
    bookingId,
    busId,
    selectedSeats,
    passengerInfo,
    status: 'Confirmed',
    bookingDate: new Date().toISOString(),
    paymentStatus: 'Pending'
  });
};

/**
 * Get available seats for a specific bus
 * @param {string} busId - ID of the bus
 * @param {string} date - Travel date
 * @returns {Promise} - Promise resolving to available seats information
 */
const getAvailableSeats = (busId, date) => {
  // Generate 40 seats with some randomly booked
  const totalSeats = 40;
  const seats = [];
  for (let i = 1; i <= totalSeats; i++) {
    const seatNumber = i.toString().padStart(2, '0');
    const isBooked = Math.random() < 0.3;
    const seatType = i % 3 === 0 ? 'Sleeper' : 'Seater';
    const gender = isBooked ? (Math.random() < 0.5 ? 'Male' : 'Female') : null;
    seats.push({
      seatNumber,
      isBooked,
      price: seatType === 'Sleeper' ? 1500 : 1200,
      type: seatType,
      gender
    });
  }
  return Promise.resolve({
    busId,
    travelDate: date,
    totalSeats,
    availableSeats: seats.filter(seat => !seat.isBooked).length,
    seats
  });
};

const searchBuses = async (searchParams) => {
  // Optionally filter sampleBusData here based on searchParams
  return sampleBusData;
};

const getRoutes = async () => {
  return [
    { id: 1, name: 'Kathmandu', code: 'KTM' },
    { id: 2, name: 'Birgunj', code: 'BRG' }
  ];
};

export default {
  searchBuses,
  getRoutes,
  getBusFacilities,
  getBusTypes,
  getBoardingPoints,
  getDroppingPoints,
  getBusDetails,
  bookSeats,
  getAvailableSeats
};