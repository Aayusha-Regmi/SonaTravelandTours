/**
 * API service for bus search and booking operations
 */

import { API_URLS } from '../config/api';

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
  // Return booking info instantly with deterministic ID
  const timestamp = Date.now();
  const bookingId = `BK-${timestamp.toString(36).toUpperCase()}`;
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
 * 
 * 
 */
//For Marking the seats red on seat sets.
const getAvailableSeats = async (busId, date, destination = "kathmandu") => {
  try {
    // Call the real backend API for seat details
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_BUS_SEAT_DETAILS_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        travelDate: date,
        destination: destination.toLowerCase() // Dynamic destination
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Seat details API response:', result);

    // Extract booked seat numbers from API response
    const bookedSeatNumbers = result.data ? result.data.map(booking => booking.seatNumber) : [];
    
   

    const availableSeatsCount = seats.filter(seat => !seat.isBooked).length;

    return {
      busId,
      travelDate: date,
      totalSeats,
      availableSeats: availableSeatsCount, // Real count from backend
      seats
    };

  } catch (error) {
    console.error('Failed to fetch real seat data:', error);
    
   
  }
};

// Helper function to determine bus type based on name and facilities
const determineBusType = (busName, facilities) => {
  if (!busName) return 'AC';
  
  const name = busName.toLowerCase();
  const facilitiesStr = Array.isArray(facilities) ? facilities.join(' ').toLowerCase() : '';
  
  if (name.includes('luxury') || facilitiesStr.includes('luxury')) {
    return 'Luxury';
  } else if (name.includes('super') || name.includes('deluxe')) {
    return 'Super Deluxe';
  } else if (name.includes('deluxe')) {
    return 'Deluxe A/C';
  } else if (name.includes('tourist')) {
    return 'Tourist';
  } else if (name.includes('a/c') || facilitiesStr.includes('a/c')) {
    return 'AC';
  } else {
    return 'Standard';
  }
};

// Helper function to process successful API response for bus search
const processSuccessfulResponse = (result, fromCity, toCity) => {
  // Check if the response has the expected structure
  if (result.success && result.data && Array.isArray(result.data)) {
    if (result.data.length === 0) {
      console.log('📭 API returned empty data - no buses found');
      return [];
    }

    // Transform API response to match our component's expected format
    const transformedBuses = result.data.map((bus, index) => {
      // DEBUG: Log raw API data
      console.log('🔍 Raw bus data from API:', bus);
      console.log('📊 Original availableSeats:', bus.availableSeats);
      console.log('📊 Original bookedSeats:', bus.bookedSeats);
      
      // Parse comma-separated strings into arrays
      const facilitiesArray = bus.facilities ? bus.facilities.split(',').map(f => f.trim()) : [];
      const routesArray = bus.routes ? bus.routes.split(',').map(r => r.trim()) : [];
      
      // Calculate departure and arrival times based on routes or use defaults
      const departureTime = '19:30'; // Default - could be enhanced based on API data
      const arrivalTime = '4:30'; // Default - could be enhanced based on API data
      
      // Create the transformed bus object
      const transformedBus = {
        id: `bus-${bus.busId || index}`,
        busName: bus.busName || bus.secondaryBusNumber || 'Unknown Bus',
        busNumber: bus.secondaryBusNumber || bus.busNumber || 'Bus Number Not Available',
        busType: determineBusType(bus.busName, facilitiesArray),
        departureTime,
        arrivalTime,
        boardingPoint: `${fromCity} Bus Park`,
        droppingPoint: `${toCity} Terminal`,
        duration: '6h 15m', // Default - could be calculated
        fare: bus.fair || bus.fare || 1000,
        rating: '4.5', // Default since not provided in API
        availableSeats: bus.availableSeats || 0,  // ← EXTRACT FROM API
        bookedSeats: bus.bookedSeats || 0,        // ← EXTRACT FROM API
        facilities: facilitiesArray,
        routes: routesArray,
        description: bus.description || '',
        baseOrigin: bus.baseOrigin || '',
        baseDestination: bus.baseDestination || '',
        baseDate: bus.baseDate || '',
        status: bus.status || false,
        // Keep original API data for reference
        originalData: bus
      };

      // DEBUG: Log transformed data
      console.log('✅ COMPARISON:');
      console.log('   Postman shows: availableSeats=35, bookedSeats=8');
      console.log('   API returned:', bus.availableSeats, bus.bookedSeats);
      console.log('   Transformed to:', transformedBus.availableSeats, transformedBus.bookedSeats);
      
      return transformedBus;  // ← RETURN THE TRANSFORMED OBJECT
    });

    console.log('🔄 Transformed bus data:', transformedBuses);
    return transformedBuses;
    
  } else if (result.success && (!result.data || result.data.length === 0)) {
    // API returned success but no data
    console.log('📭 API returned empty data array');
    return [];
  } else {
    // API returned unexpected structure
    console.error('🚨 API response has unexpected structure:', result);
    throw new Error(`Invalid API response structure. Expected success=true and data array, got: ${JSON.stringify(result)}`);
  }
};

const searchBuses = async (searchParams) => {
  try {
    const { fromCity, toCity, date, returnDate, tripType } = searchParams;
    
    // FIX: Proper date formatting without timezone issues
    let apiDate = date;
    if (date) {
      // Handle different date formats properly
      if (typeof date === 'string') {
        // If it's already in YYYY-MM-DD format, use as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          apiDate = date;
        } else {
          // Parse the date and format without timezone conversion
          const parsedDate = new Date(date);
          if (!isNaN(parsedDate.getTime())) {
            // Use local date parts instead of UTC to avoid timezone issues
            const year = parsedDate.getFullYear();
            const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
            const day = String(parsedDate.getDate()).padStart(2, '0');
            apiDate = `${year}-${month}-${day}`;
          }
        }
      }
    }
    
    // Add debug log to verify date conversion
    console.log('🗓️ Date conversion check:');
    console.log('   Original date:', date);
    console.log('   Formatted for API:', apiDate);
    
    const requestBody = {
      destination: toCity,
      origin: fromCity,
      date: apiDate  // Now correctly formatted
    };
    
    console.log('🚌 Bus Search API Request:', requestBody);
    console.log('🌐 API URL:', API_URLS.BUS.SEARCH);
    console.log('� Environment variables:', {
      baseUrl: import.meta.env.VITE_API_BASE_URL,
      endpoint: import.meta.env.VITE_BUS_SEARCH_ENDPOINT,
      fullUrl: API_URLS.BUS.SEARCH
    });

    // Check if URL is properly constructed
    if (!API_URLS.BUS.SEARCH || API_URLS.BUS.SEARCH.includes('undefined')) {
      throw new Error('Bus API URL is not properly configured. Check environment variables.');
    }

    // Try different CORS configurations if the main one fails
    const corsConfigs = [
      {
        name: 'Standard CORS',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      },
      {
        name: 'CORS with Origin',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        }
      },
      {
        name: 'No-CORS (limited response)',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ];

    let lastError = null;

    for (let i = 0; i < corsConfigs.length; i++) {
      const config = corsConfigs[i];
      console.log(` Trying ${config.name}...`);

      try {
        // Add timeout and better error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
          console.error(` ${config.name} timeout after 30 seconds`);
        }, 30000); // 30 second timeout

        try {
          console.log(` Making fetch request with ${config.name}...`);
          const response = await fetch(API_URLS.BUS.SEARCH, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(requestBody),
            signal: controller.signal,
            mode: config.mode,
          });

          clearTimeout(timeoutId);

          console.log(`${config.name} completed successfully`);
          console.log(' Response Status:', response.status, response.statusText);
          console.log(' Response Headers:', Object.fromEntries(response.headers.entries()));
          console.log('  Response URL:', response.url);
          console.log('  Response Type:', response.type);

          if (!response.ok) {
            const errorText = await response.text();
            console.error(' HTTP Error Response Body:', errorText);
            throw new Error(`API returned ${response.status}: ${response.statusText}. Response: ${errorText}`);
          }          // If we reach here, the request was successful
          const result = await response.json();
          console.log(' Bus Search API Response:', result);
          console.log(' Number of buses returned:', result.data ? result.data.length : 0);

          // Process the successful response and return
          return processSuccessfulResponse(result, fromCity, toCity);

        } catch (fetchError) {
          clearTimeout(timeoutId);
          lastError = fetchError;
          console.error(`  ${config.name} failed:`, fetchError.message);
          
          if (i === corsConfigs.length - 1) {
            // This was our last attempt, throw the error
            if (fetchError.name === 'AbortError') {
              throw new Error('Request timeout - API took too long to respond');
            } else if (fetchError.message === 'Failed to fetch') {
              throw new Error('Network error - Cannot connect to API. Check if API is running and CORS is configured.');
            } else {
              throw new Error(`Network request failed: ${fetchError.message}`);
            }
          } else {
            console.log(`  Trying next configuration...`);
            continue;
          }
        }
      } catch (configError) {
        lastError = configError;
        console.error(`  Configuration ${config.name} failed:`, configError.message);
        if (i === corsConfigs.length - 1) {
          throw configError;
        }
        continue;
      }    }

    // If we get here, all CORS configurations failed
    throw new Error('All CORS configuration attempts failed. Please check API server and CORS settings.');
    
  } catch (error) {
    console.error('  Bus search API error:', error);
    
    // Re-throw the error instead of falling back to sample data
    throw new Error(`Failed to fetch bus data from API: ${error.message}`);
  }
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