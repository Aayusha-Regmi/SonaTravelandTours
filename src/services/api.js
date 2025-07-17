/**
 * API service for bus search and booking operations
 */

import { API_URLS } from '../config/api';
import { getAuthToken, getAuthHeaders, isAuthenticated } from '../utils/authToken';
import { authenticatedFetch, apiCall } from './httpInterceptor';

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
      console.log('API returned empty data - no buses found');
      return [];
    }

    // Transform API response to match our component's expected format
    const transformedBuses = result.data.map((bus, index) => {
      // DEBUG: Log raw API data
      console.log('Raw bus data from API:', bus);
      console.log('Original availableSeats:', bus.availableSeats);
      console.log('Original bookedSeats:', bus.bookedSeats);
      
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

    console.log('Transformed bus data:', transformedBuses);
    return transformedBuses;
    
  } else if (result.success && (!result.data || result.data.length === 0)) {
    // API returned success but no data
    console.log('API returned empty data array');
    return [];
  } else {
    // API returned unexpected structure
    console.error('API response has unexpected structure:', result);
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
    
    console.log('🚌 Bus Search API Request:', {
      fromCity,
      toCity,
      originalDate: date,
      formattedDate: apiDate
    });

    const requestBody = {
      destination: toCity,
      origin: fromCity,
      date: apiDate
    };

    // Check if URL is properly constructed
    if (!API_URLS.BUS.SEARCH || API_URLS.BUS.SEARCH.includes('undefined')) {
      throw new Error('Bus API URL is not properly configured. Check environment variables.');
    }

    // Use HTTP interceptor for authentication and request handling
    const response = await authenticatedFetch(API_URLS.BUS.SEARCH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API returned ${response.status}: ${response.statusText}. Response: ${errorText}`);
    }

    const result = await response.json();
    console.log('🚌 Bus Search API Response:', result);
    console.log('🚌 Number of buses returned:', result.data ? result.data.length : 0);

    // Process the successful response and return
    return processSuccessfulResponse(result, fromCity, toCity);
    
  } catch (error) {
    console.error('🚌 Bus search API error:', error);
    
    // HTTP interceptor will handle authentication errors automatically
    if (error.message === 'AUTHENTICATION_REQUIRED') {
      throw error; // Re-throw to be handled by calling code
    }
    
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

/**
 * Payment Gateway API Functions
 */

/**
 * Step 1: Initiate payment process
 * @param {number} amount - Payment amount
 * @returns {Promise} - Promise resolving to payment initiation data
 */
const initiatePayment = async (amount) => {
  try {
    console.log('💳 Step 1: Initiating payment for amount:', amount);

    const url = `${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/initiate-payment`;
    console.log('💳 Using API URL:', url);
    
    // Use HTTP interceptor for authentication and request handling
    const response = await authenticatedFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ amount })
    });

    console.log('💳 Response status:', response.status, response.statusText);
    console.log('💳 Response headers:', Object.fromEntries(response.headers.entries()));
    
    // Get response text first to see what the server is actually returning
    const responseText = await response.text();
    console.log('💳 Raw response text:', responseText);
    
    let result;
    try {
      if (responseText) {
        result = JSON.parse(responseText);
      } else {
        result = { message: 'Empty response from server' };
      }
    } catch (parseError) {
      console.error('💳 Failed to parse JSON response:', parseError);
      result = { 
        message: 'Invalid JSON response from server',
        rawResponse: responseText 
      };
    }
    
    console.log('💳 Parsed payment initiation response:', result);

    if (response.ok) {
      return {
        success: true,
        data: {
          merchantId: result.data?.merchantId || result.merchantId,
          merchantName: result.data?.merchantName || result.merchantName,
          amount: result.data?.amount || result.amount,
          merchantTransactionId: result.data?.merchantTransactionId || result.merchantTransactionId,
          processId: result.data?.processId || result.processId
        }
      };
    } else {
      return {
        success: false,
        message: result.message || result.error || `HTTP ${response.status}: ${response.statusText}`,
        details: result,
        statusCode: response.status
      };
    }
  } catch (error) {
    console.error('💳 Payment initiation error:', error);
    
    // HTTP interceptor will handle authentication errors automatically
    if (error.message === 'AUTHENTICATION_REQUIRED') {
      return {
        success: false,
        message: 'Authentication required. Please log in to continue with payment.',
        statusCode: 401,
        requiresAuth: true
      };
    }
    
    return {
      success: false,
      message: error.message || 'Network error occurred',
      error: error.name
    };
  }
};

/**
 * Step 2: Get all available payment instruments
 * @returns {Promise} - Promise resolving to payment instruments list
 */
const getPaymentInstruments = async () => {
  try {
    console.log('💳 Step 2: Getting payment instruments...');
    
    const url = `${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/get-all-payment-instruments`;
    
    // Use HTTP interceptor for authentication and request handling
    const response = await authenticatedFetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    console.log('💳 Payment instruments response status:', response.status);
    console.log('💳 Payment instruments response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('💳 Payment instruments raw response:', responseText);

    let result;
    try {
      if (responseText) {
        result = JSON.parse(responseText);
      } else {
        result = { message: 'Empty response from payment instruments API' };
      }
    } catch (parseError) {
      console.error('💳 Failed to parse payment instruments JSON:', parseError);
      result = { message: 'Invalid JSON response', rawResponse: responseText };
    }
    
    console.log('💳 Payment instruments parsed response:', result);

    if (response.ok) {
      // Try different response formats
      let rawInstruments = [];
      
      if (result.success && result.data && result.data.paymentInstruments) {
        rawInstruments = result.data.paymentInstruments;
      } else if (result.success && result.data && Array.isArray(result.data)) {
        rawInstruments = result.data;
      } else if (Array.isArray(result)) {
        rawInstruments = result;
      } else {
        console.log('💳 Unexpected response format, using fallback');
        return {
          success: true,
          data: getFallbackPaymentInstruments(),
          fallback: true
        };
      }
      
      console.log('💳 Raw payment instruments from API:', rawInstruments);
      
      // Map API response to our expected format
      const instruments = rawInstruments.map((instrument, index) => ({
        instrumentCode: instrument.InstrumentCode || `UNKNOWN_${index}`,
        name: instrument.InstrumentName || instrument.InstitutionName || 'Unknown Payment Method',
        logoUrl: instrument.LogoUrl && instrument.LogoUrl.trim() !== '' 
          ? instrument.LogoUrl 
          : null,
        bankUrl: instrument.BankUrl,
        bankType: instrument.BankType,
        institutionName: instrument.InstitutionName,
        description: `Pay with ${instrument.InstrumentName || instrument.InstitutionName}`
      }));
      
      console.log('💳 Mapped payment instruments:', instruments);
      
      // If no instruments found, use fallback
      if (!instruments || instruments.length === 0) {
        console.log('💳 No payment instruments from API, using fallback');
        return {
          success: true,
          data: getFallbackPaymentInstruments(),
          fallback: true
        };
      }
      
      return {
        success: true,
        data: instruments
      };
    } else {
      console.error('💳 Payment instruments API failed:', response.status, result);
      
      // Return fallback instruments on API failure
      console.log('💳 Using fallback payment instruments due to API failure');
      return {
        success: true,
        data: getFallbackPaymentInstruments(),
        fallback: true
      };
    }
  } catch (error) {
    console.error('💳 Get payment instruments error:', error);
    
    // HTTP interceptor will handle authentication errors automatically
    if (error.message === 'AUTHENTICATION_REQUIRED') {
      return {
        success: false,
        message: 'Authentication required to load payment options.',
        statusCode: 401,
        requiresAuth: true
      };
    }
    
    // Return fallback instruments on network error
    console.log('💳 Using fallback payment instruments due to network error');
    return {
      success: true,
      data: getFallbackPaymentInstruments(),
      fallback: true
    };
  }
};

/**
 * Get fallback payment instruments when API fails
 * @returns {Array} - Array of fallback payment instruments
 */
const getFallbackPaymentInstruments = () => {
  return [
    {
      instrumentCode: 'IMEPAYG',
      name: 'IME Pay',
      logoUrl: null,
      bankType: 'CheckoutGateway',
      institutionName: 'IME Pay',
      description: 'Pay with IME Pay digital wallet'
    },
    {
      instrumentCode: 'HAMROPAYG',
      name: 'Hamro Pay',
      logoUrl: null,
      bankType: 'CheckoutGateway',
      institutionName: 'Hamro Pay',
      description: 'Pay with Hamro Pay digital wallet'
    },
    {
      instrumentCode: 'PRABHUPAYG',
      name: 'Prabhu Pay',
      logoUrl: null,
      bankType: 'CheckoutGateway',
      institutionName: 'Prabhu Pay',
      description: 'Pay with Prabhu Pay digital wallet'
    },
    {
      instrumentCode: 'MYPAYG',
      name: 'MyPay',
      logoUrl: null,
      bankType: 'CheckoutGateway',
      institutionName: 'MyPay',
      description: 'Pay with MyPay digital wallet'
    },
    {
      instrumentCode: 'NICENPKA',
      name: 'NIC ASIA Bank',
      logoUrl: null,
      bankType: 'EBanking',
      institutionName: 'NIC ASIA',
      description: 'Pay with NIC ASIA Bank E-Banking'
    },
    {
      instrumentCode: 'MBLNNPKA',
      name: 'Machhapuchchhre Bank',
      logoUrl: null,
      bankType: 'EBanking',
      institutionName: 'MBL',
      description: 'Pay with MBL E-Banking'
    }
  ];
};

/**
 * Step 3: Get service charge for selected instrument
 * @param {number} amount - Payment amount
 * @param {string} instrumentCode - Selected payment instrument code
 * @returns {Promise} - Promise resolving to service charge data
 */
const getServiceCharge = async (amount, instrumentCode) => {
  try {
    console.log('Step 3: Getting service charge for:', instrumentCode);
    console.log('Service charge parameters:', { amount, instrumentCode });
    
    // Check for authentication token using the enhanced utility function
    const authCheck = checkAuthentication();
    
    if (!authCheck.isAuthenticated) {
      console.warn('No authentication found for service charge, using default');
      // Return default service charge instead of failing
      const defaultServiceCharge = Math.round(amount * 0.02); // 2% default
      return {
        success: true,
        serviceCharge: defaultServiceCharge,
        fallback: true
      };
    }
    
    console.log(`Using authentication from ${authCheck.source}`);
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${authCheck.token}`
    };
    
    const requestBody = {
      amount: amount,
      instrumentCode: instrumentCode
    };
    
    console.log('Service charge request:', requestBody);
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/get-service-charge`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    console.log('Service charge response status:', response.status, response.statusText);
    console.log('Service charge response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Service charge raw response:', responseText);

    let result;
    try {
      if (responseText) {
        result = JSON.parse(responseText);
      } else {
        result = { message: 'Empty response from service charge API' };
      }
    } catch (parseError) {
      console.error('Failed to parse service charge JSON:', parseError);
      result = { 
        message: 'Invalid JSON response from service charge API',
        rawResponse: responseText 
      };
    }
    
    console.log('Service charge parsed response:', result);

    if (response.ok) {
      let serviceCharge = 0;
      
      // Handle different response formats
      if (result.success && result.data && typeof result.data.serviceCharge === 'number') {
        serviceCharge = result.data.serviceCharge;
      } else if (result.success && typeof result.serviceCharge === 'number') {
        serviceCharge = result.serviceCharge;
      } else if (typeof result.serviceCharge === 'number') {
        serviceCharge = result.serviceCharge;
      } else if (result.data && typeof result.data.serviceCharge === 'number') {
        serviceCharge = result.data.serviceCharge;
      } else {
        console.warn('Service charge not found in response, using default');
        serviceCharge = Math.round(amount * 0.02); // 2% default
      }
      
      return {
        success: true,
        serviceCharge: serviceCharge,
        data: result.data || result
      };
    } else if (response.status === 401) {
      console.error('Authentication failed - 401 Unauthorized for service charge');
      // Return default service charge instead of failing
      const defaultServiceCharge = Math.round(amount * 0.02); // 2% default
      return {
        success: true,
        serviceCharge: defaultServiceCharge,
        fallback: true,
        message: 'Using default service charge due to authentication issue'
      };
    } else {
      console.error('Service charge API failed:', response.status, result);
      // Return default service charge instead of failing
      const defaultServiceCharge = Math.round(amount * 0.02); // 2% default
      return {
        success: true,
        serviceCharge: defaultServiceCharge,
        fallback: true,
        message: 'Using default service charge due to API failure'
      };
    }
  } catch (error) {
    console.error('Get service charge error:', error);
    // Return default service charge instead of failing
    const defaultServiceCharge = Math.round(amount * 0.02); // 2% default
    return {
      success: true,
      serviceCharge: defaultServiceCharge,
      fallback: true,
      message: 'Using default service charge due to network error'
    };
  }
};

/**
 * Step 4: Generate QR code for payment
 * @param {number} amount - Total amount including service charge
 * @param {string} travelDate - Travel date (remarks1)
 * @param {string} seatNumbers - Comma-separated seat numbers (remarks2)
 * @returns {Promise} - Promise resolving to QR code data
 */
/**
 * Enhanced QR Code generation with multiple authentication strategies
 * @param {number} amount - Payment amount
 * @param {string} travelDate - Travel date
 * @param {string} seatNumbers - Comma-separated seat numbers
 * @returns {Promise} - Promise resolving to QR generation result
 */
const generateQRCode = async (amount, travelDate, seatNumbers) => {
  try {
    console.log('Step 4: Generating QR code...');
    console.log('QR Code parameters:', { amount, travelDate, seatNumbers });
    
    // Check for authentication token first
    const authCheck = checkAuthentication();
    
    if (!authCheck.isAuthenticated) {
      console.error('Authentication required for QR generation');
      return {
        success: false,
        message: authCheck.error || 'Authentication required to generate QR code.',
        statusCode: 401,
        requiresAuth: true
      };
    }
    
    console.log(`Using authentication from ${authCheck.source}`);
    console.log(`Token preview: ${authCheck.token.substring(0, 30)}...`);
    
    // Prepare request body
    const requestBody = {
      amount: amount,
      remarks1: travelDate,
      remarks2: seatNumbers
    };
    
    console.log('QR Generation request:', requestBody);
    
    // Strategy 1: Try with Bearer token (current approach)
    console.log('Attempting QR generation with Bearer token...');
    
    const bearerHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${authCheck.token}`
    };
    
    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/qr/generate`, {
      method: 'POST',
      headers: bearerHeaders,
      body: JSON.stringify(requestBody)
    });

    console.log('QR generation (Bearer) response status:', response.status, response.statusText);

    let responseText = await response.text();
    console.log('QR generation (Bearer) raw response:', responseText);

    // If Bearer token fails with authentication error, try alternative strategies
    if (response.status === 401 || response.status === 500) {
      console.log('Bearer token failed, trying alternative authentication...');
      
      // Strategy 2: Try without authentication (some QR APIs might be public)
      console.log('Attempting QR generation without authentication...');
      
      const publicHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      
      response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/qr/generate`, {
        method: 'POST',
        headers: publicHeaders,
        body: JSON.stringify(requestBody)
      });

      console.log('QR generation (Public) response status:', response.status, response.statusText);
      responseText = await response.text();
      console.log('QR generation (Public) raw response:', responseText);
      
      // Strategy 3: Try with API key if public also fails
      if (response.status === 401 || response.status === 500) {
        console.log('Attempting QR generation with API key pattern...');
        
        // Try with token as API key in different header formats
        const apiKeyHeaders = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-API-Key': authCheck.token,
          'API-Key': authCheck.token,
          'Authorization': authCheck.token // Without Bearer prefix
        };
        
        response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/qr/generate`, {
          method: 'POST',
          headers: apiKeyHeaders,
          body: JSON.stringify(requestBody)
        });

        console.log('QR generation (API-Key) response status:', response.status, response.statusText);
        responseText = await response.text();
        console.log('QR generation (API-Key) raw response:', responseText);
      }
    }

    let result;
    try {
      if (responseText) {
        result = JSON.parse(responseText);
      } else {
        result = { message: 'Empty response from QR generation API' };
      }
    } catch (parseError) {
      console.error('Failed to parse QR generation JSON:', parseError);
      result = { 
        message: 'Invalid JSON response from QR generation API',
        rawResponse: responseText 
      };
    }
    
    console.log('QR generation final parsed response:', result);

    if (response.ok) {
      // Check for different response formats
      if (result.success && result.data) {
        return {
          success: true,
          data: {
            qrMessage: result.data.qrMessage || result.data.qrCode,
            thirdpartyQrWebSocketUrl: result.data.thirdpartyQrWebSocketUrl || result.data.webSocketUrl,
            prn: result.data.prn || result.data.paymentReferenceNumber
          }
        };
      } else if (result.qrMessage || result.qrCode) {
        return {
          success: true,
          data: {
            qrMessage: result.qrMessage || result.qrCode,
            thirdpartyQrWebSocketUrl: result.thirdpartyQrWebSocketUrl || result.webSocketUrl,
            prn: result.prn || result.paymentReferenceNumber
          }
        };
      } else {
        console.error('QR generation successful but missing qrMessage/qrCode in response');
        return {
          success: false,
          message: 'QR code generation failed - missing QR data in response',
          details: result
        };
      }
    } else {
      console.error('QR generation API failed with all strategies:', response.status, result);
      
      // Provide specific error messages based on the error
      let errorMessage = 'Failed to generate QR code';
      
      if (response.status === 401) {
        errorMessage = 'Authentication failed. Please log in again.';
      } else if (response.status === 500 && result.message?.includes('USERNAME OR PASSWORD')) {
        errorMessage = 'Payment service authentication error. Please contact support.';
      } else if (result.message) {
        errorMessage = result.message;
      }
      
      return {
        success: false,
        message: errorMessage,
        details: result,
        statusCode: response.status
      };
    }
  } catch (error) {
    console.error('QR generation error:', error);
    return {
      success: false,
      message: error.message || 'Network error occurred during QR generation',
      error: error.name
    };
  }
};

/**
 * Step 5: Check payment status and complete booking
 * @param {Object} seatInfo - Complete seat and passenger information
 * @param {Object} paymentInfo - Payment information with PRN
 * @returns {Promise} - Promise resolving to payment verification result
 */
const checkPaymentStatus = async (seatInfo, paymentInfo) => {
  try {
    console.log('Step 5: Checking payment status...');
    console.log('Payment check parameters:', { seatInfo, paymentInfo });
    
    // Check for authentication token
    const authCheck = checkAuthentication();
    
    if (!authCheck.isAuthenticated) {
      console.error('Authentication required for payment status check');
      return {
        success: false,
        message: authCheck.error || 'Authentication required to check payment status.',
        statusCode: 401,
        requiresAuth: true
      };
    }
    
    console.log(`Using authentication from ${authCheck.source}`);
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${authCheck.token}`
    };
    
    const requestBody = {
      seatInfo: seatInfo,
      paymentInfo: paymentInfo
    };
    
    console.log('Payment status check request:', requestBody);
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/qr/check-payment`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    console.log('Payment status response status:', response.status, response.statusText);
    console.log('Payment status response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Payment status raw response:', responseText);

    let result;
    try {
      if (responseText) {
        result = JSON.parse(responseText);
      } else {
        result = { message: 'Empty response from payment status API' };
      }
    } catch (parseError) {
      console.error('Failed to parse payment status JSON:', parseError);
      result = { 
        message: 'Invalid JSON response from payment status API',
        rawResponse: responseText 
      };
    }
    
    console.log('Payment status parsed response:', result);

    if (response.ok) {
      // Check for different response formats
      if (result.success && (result.paymentStatus === 'success' || result.data?.paymentStatus === 'success')) {
        return {
          success: true,
          data: result.data || result
        };
      } else if (result.paymentStatus === 'success') {
        return {
          success: true,
          data: result
        };
      } else {
        return {
          success: false,
          message: result.message || 'Payment verification failed - payment not completed'
        };
      }
    } else if (response.status === 401) {
      console.error('Authentication failed - 401 Unauthorized for payment status check');
      return {
        success: false,
        message: 'Authentication required. Please log in to check payment status.',
        details: result,
        statusCode: response.status,
        requiresAuth: true
      };
    } else {
      console.error('Payment status check API failed:', response.status, result);
      return {
        success: false,
        message: result.message || result.error || `HTTP ${response.status}: Failed to check payment status`,
        details: result,
        statusCode: response.status
      };
    }
  } catch (error) {
    console.error('Payment status check error:', error);
    return {
      success: false,
      message: error.message || 'Network error occurred during payment status check',
      error: error.name
    };
  }
};

/**
 * FonePay API Functions
 */

/**
 * Generate FonePay QR code for payment
 * @param {number} amount - Payment amount
 * @param {string} remarks1 - First remark (travel date)
 * @param {string} remarks2 - Second remark (seat numbers)
 * @param {string} prn - Payment reference number
 * @returns {Promise} - Promise resolving to FonePay QR data
 */
const generateFonePayQR = async (amount, remarks1, remarks2, prn) => {
  try {
    console.log('FonePay: Generating QR code...');
    
    // Generate data validation hash (you may need to implement the actual hash logic)
    const dataValidation = generateFonePayHash(amount, remarks1, remarks2, prn);
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/fonepay/qr-generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        remarks1: remarks1,
        remarks2: remarks2,
        prn: prn,
        merchantCode: "0012345076",
        dataValidation: dataValidation,
        username: "SONATRAVELANDTOURSPVTLTD",
        password: "Sona@2024"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`FonePay QR API failed: HTTP ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('FonePay QR generation response:', result);

    if (!result.qrCode && !result.qrMessage) {
      throw new Error('FonePay API did not return a valid QR code');
    }

    return {
      success: true,
      data: {
        qrMessage: result.qrCode || result.qrMessage,
        prn: prn,
        amount: amount
      }
    };
  } catch (error) {
    console.error('FonePay QR generation error:', error);
    return {
      success: false,
      message: `FonePay QR generation failed: ${error.message}`
    };
  }
};

/**
 * Check FonePay payment status
 * @param {string} prn - Payment reference number
 * @returns {Promise} - Promise resolving to payment status
 */
const checkFonePayStatus = async (prn) => {
  try {
    console.log('FonePay: Checking payment status for PRN:', prn);
    
    // Generate data validation hash for status check
    const dataValidation = generateFonePayStatusHash(prn);
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/fonepay/check-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prn: prn,
        merchantCode: "0012345076",
        dataValidation: dataValidation,
        username: "SONATRAVELANDTOURSPVTLTD",
        password: "Sona@2024"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`FonePay status API failed: HTTP ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('FonePay status response:', result);

    return {
      success: true,
      paymentStatus: result.status || result.paymentStatus,
      data: result
    };
  } catch (error) {
    console.error('FonePay status check error:', error);
    return {
      success: false,
      message: `FonePay status check failed: ${error.message}`
    };
  }
};

/**
 * Generate data validation hash for FonePay QR
 * Note: This is a placeholder - implement actual hash logic based on FonePay documentation
 */
const generateFonePayHash = (amount, remarks1, remarks2, prn) => {
  // This should implement the actual hash generation logic as per FonePay documentation
  // For now, returning a placeholder hash
  return "a66a0088c21d87c43aed67bed19aeccc8f32673399976adb1c64007c999f8acc19a052c3a8c0b815c96b8827831c6800eae69686d8857885faa42685d7fab1ff";
};

/**
 * Generate data validation hash for FonePay status check
 */
const generateFonePayStatusHash = (prn) => {
  // This should implement the actual hash generation logic as per FonePay documentation
  // For now, returning a placeholder hash
  return "cc3ec18d77af04adafead9c7822d72a1cf35367a2e2390c27a402c27ab87bd874665019b551adcef486e71b817cfd95d11b62a4e027dd246551b7ca6afc0afe0";
};

/**
 * Get payment redirect URL for non-QR payments (EBanking, Wallets)
 * @param {string} merchantTransactionId - Transaction ID from initiate payment
 * @param {string} processId - Process ID from initiate payment
 * @param {string} instrumentCode - Selected payment instrument code
 * @param {string} successUrl - Success callback URL
 * @param {string} failureUrl - Failure callback URL
 * @returns {Promise} - Promise resolving to redirect URL
 */
const getPaymentRedirectUrl = async (merchantTransactionId, processId, instrumentCode, successUrl, failureUrl) => {
  try {
    console.log('Getting payment redirect URL...');
    
    // Check for authentication token using the utility function
    const authCheck = checkAuthentication();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (authCheck.isAuthenticated) {
      headers.Authorization = `Bearer ${authCheck.token}`;
      console.log(`Adding authorization header from ${authCheck.source}`);
    } else {
      console.log('No authentication token found for payment redirect URL');
    }
    
    // Construct URL with query parameters for GET request as shown in your attachment
    const params = new URLSearchParams({
      MerchantTxnId: merchantTransactionId,
      GatewayTxnId: processId || ''
    });
    
    const url = `${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/onepg?${params.toString()}`;
    
    console.log('Redirect URL:', url);
    
    // For redirect payments, we typically just return the constructed URL
    // The user will be redirected to this URL which handles the payment flow
    return {
      success: true,
      data: {
        paymentUrl: url,
        merchantTransactionId,
        processId,
        instrumentCode
      }
    };
    
  } catch (error) {
    console.error('Get payment redirect URL error:', error);
    return {
      success: false,
      message: error.message || 'Failed to generate payment redirect URL'
    };
  }
};

/**
 * Confirm seat booking after successful payment
 * @param {Object} seatInfo - Seat and passenger information
 * @param {Object} paymentInfo - Payment information
 * @returns {Promise} - Promise resolving to booking confirmation
 */
const confirmSeatBooking = async (seatInfo, paymentInfo) => {
  try {
    console.log('Confirming seat booking...');
    
    // Check for authentication token using the utility function
    const authCheck = checkAuthentication();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (authCheck.isAuthenticated) {
      headers.Authorization = `Bearer ${authCheck.token}`;
      console.log(`Adding authorization header from ${authCheck.source}`);
    } else {
      console.log('No authentication token found for seat booking confirmation');
      throw new Error('Authentication required. Please login first.');
    }
    
    const requestBody = {
      seatInfo,
      paymentInfo
    };
    
    console.log('Seat booking confirmation request:', requestBody);
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/seat/payment`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    console.log('Seat booking response status:', response.status);

    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      console.error('Failed to parse seat booking JSON:', parseError);
      result = { message: 'Invalid response from server' };
    }
    
    console.log('Seat booking response:', result);

    if (response.ok && result.success) {
      return {
        success: true,
        data: result.data,
        message: result.message
      };
    } else {
      return {
        success: false,
        message: result.message || `HTTP ${response.status}: Seat booking failed`,
        data: result.data
      };
    }
  } catch (error) {
    console.error('Confirm seat booking error:', error);
    return {
      success: false,
      message: error.message || 'Network error occurred'
    };
  }
};

/**
 * Migrate tokens to ensure compatibility with legacy code
 * Uses centralized auth utility for token management
 */
const migrateAuthTokens = () => {
  try {
    // Use centralized token checking
    const currentToken = getAuthToken();
    if (currentToken) {
      // Ensure token exists in both storage locations for compatibility
      localStorage.setItem('token', currentToken);
      localStorage.setItem('authToken', currentToken);
      localStorage.setItem('loginSuccess', 'true');
      console.log('Token migration completed using centralized auth');
    } else {
      console.log('No token found during migration');
    }
    
    return true;
  } catch (error) {
    console.error('Token migration failed:', error);
    return false;
  }
};

/**
 * Validate JWT token format and expiration
 * @param {string} token - JWT token to validate
 * @returns {Object} - Validation result with isValid boolean and details
 */
const validateJWTToken = (token) => {
  if (!token) {
    return { isValid: false, reason: 'No token provided' };
  }
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { isValid: false, reason: 'Invalid JWT format (should have 3 parts)' };
    }
    
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < currentTime) {
      return { 
        isValid: false, 
        reason: 'Token expired',
        expiredAt: new Date(payload.exp * 1000),
        currentTime: new Date()
      };
    }
    
    return { 
      isValid: true, 
      payload,
      expiresAt: payload.exp ? new Date(payload.exp * 1000) : null
    };
  } catch (error) {
    return { isValid: false, reason: 'Failed to parse token', error: error.message };
  }
};

/**
 * Enhanced authentication check with token validation
 * @returns {Object} - Object with authentication status and token details
 */
const checkAuthentication = () => {
  // Migrate tokens before checking to ensure we have consistency
  migrateAuthTokens();
  
  // Use our centralized auth utility to get the token
  const token = getAuthToken();
  
  if (token) {
    console.log('Found authentication token');
    
    // Validate the token
    const validation = validateJWTToken(token);
    if (!validation.isValid) {
      console.log('Token validation failed:', validation.reason);
      
      // Clear invalid tokens
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('token');
      localStorage.removeItem('loginSuccess');
      
      return { 
        isAuthenticated: false, 
        token: null, 
        source: null,
        error: `Token invalid: ${validation.reason}`
      };
    }
    
    console.log('Token validation passed');
    return { 
      isAuthenticated: true, 
      token: token, 
      source: 'authToken utility',
      validation
    };
  }
  
  // No token found in any storage
  
  console.log('No authentication token found');
  return { isAuthenticated: false, token: null, source: null };
};

// Debug helpers for browser console
if (typeof window !== 'undefined') {
  window.checkAuth = checkAuthentication;
  window.migrateTokens = migrateAuthTokens;
  window.debugAuth = () => {
    console.log('Authentication Debug Information:');
    console.log('Using centralized auth utility:');
    console.log('getAuthToken():', getAuthToken());
    console.log('isAuthenticated():', isAuthenticated());
    console.log('localStorage.authToken:', localStorage.getItem('authToken'));
    console.log('localStorage.token:', localStorage.getItem('token'));
    console.log('localStorage.loginSuccess:', localStorage.getItem('loginSuccess'));
    console.log('localStorage.userRole:', localStorage.getItem('userRole'));
    console.log('sessionStorage.authToken:', sessionStorage.getItem('authToken'));
    console.log('sessionStorage.token:', sessionStorage.getItem('token'));
    
    const authCheck = checkAuthentication();
    console.log('Authentication Check Result:', authCheck);
    
    // Try to decode JWT token if present
    const currentToken = getAuthToken();
    if (currentToken) {
      try {
        const tokenParts = currentToken.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log('JWT Token Payload:', payload);
          console.log('Token Expiry:', new Date(payload.exp * 1000));
          console.log('Current Time:', new Date());
          console.log('Token Valid:', payload.exp * 1000 > Date.now());
        }
      } catch (e) {
        console.log('Failed to decode JWT token:', e.message);
      }
    }
    
    return authCheck;
  };

  // Test payment API authentication
  window.testPaymentAuth = async () => {
    console.log('Testing Payment API Authentication');
    
    const authCheck = checkAuthentication();
    if (!authCheck.isAuthenticated) {
      console.log('Not authenticated');
      return false;
    }
    
    console.log('Using token from:', authCheck.source);
    console.log('Token preview:', authCheck.token.substring(0, 20) + '...');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/initiate-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authCheck.token}`
        },
        body: JSON.stringify({ amount: 1000 })
      });
      
      console.log('Payment API Status:', response.status, response.statusText);
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
      
      const text = await response.text();
      console.log('Raw Response:', text);
      
      if (response.status === 401) {
        console.log('401 Unauthorized - Token rejected by payment API');
        
        // Check if token is expired
        try {
          const tokenParts = authCheck.token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            const isExpired = payload.exp * 1000 <= Date.now();
            console.log('Token expired:', isExpired);
            if (isExpired) {
              console.log('Token has expired - need to re-authenticate');
            } else {
              console.log('Token is valid but rejected - check API endpoint or token format');
            }
          }
        } catch (e) {
          console.log('Could not analyze token expiration');
        }
      } else if (response.ok) {
        console.log('Payment API authentication successful');
        try {
          const data = JSON.parse(text);
          console.log('Response data:', data);
        } catch (e) {
          console.log('Response not JSON');
        }
      }
      
      return { status: response.status, ok: response.ok, text };
    } catch (error) {
      console.error('Payment API test failed:', error);
      return false;
    }
  };
  
  console.log('Debug helpers loaded:');
  console.log('- window.checkAuth() - Check authentication status');
  console.log('- window.debugAuth() - Full authentication debug info');
  console.log('- window.migrateTokens() - Migrate authToken to token');
  console.log('- window.testPaymentAuth() - Test payment API authentication');
}

/**
 * Get applied coupons for the current user
 * @returns {Promise<Array>} Array of applied coupons
 */
const getAppliedCoupons = async () => {
  try {
    const response = await authenticatedFetch(API_URLS.COUPONS.APPLIED_COUPONS);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch applied coupons: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    } else {
      throw new Error('Invalid response format for applied coupons');
    }
  } catch (error) {
    console.error('Error fetching applied coupons:', error);
    throw error;
  }
};

/**
 * Diagnostic function to test API endpoints
 */
const testAPIEndpoints = async () => {
  console.log('Testing API endpoints...');
  
  const endpoints = [
    {
      name: 'Payment API Base URL',
      url: import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV,
    },
    {
      name: 'Payment Initiate',
      url: `${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/initiate-payment`,
      method: 'POST',
      body: { amount: 100 }
    },
    {
      name: 'Payment Instruments',
      url: `${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/get-all-payment-instruments`,
      method: 'GET'
    }
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.name}: ${endpoint.url}`);
      
      if (endpoint.method) {
        // Get authentication for API calls
        const authCheck = checkAuthentication();
        const headers = { 'Content-Type': 'application/json' };
        
        if (authCheck.isAuthenticated) {
          headers.Authorization = `Bearer ${authCheck.token}`;
        }
        
        const response = await fetch(endpoint.url, {
          method: endpoint.method,
          headers: headers,
          body: endpoint.body ? JSON.stringify(endpoint.body) : undefined
        });
        
        console.log(`${endpoint.name} - Status: ${response.status} ${response.statusText}`);
        
        if (response.ok) {
          console.log(`${endpoint.name} - Working`);
        } else {
          console.log(`${endpoint.name} - Failed: ${response.status}`);
        }
      } else {
        console.log(`${endpoint.name} - URL: ${endpoint.url}`);
      }
    } catch (error) {
      console.log(`${endpoint.name} - Error: ${error.message}`);
    }
  }
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
  getAvailableSeats,

  // Payment gateway functions
  initiatePayment,
  getPaymentInstruments,
  getServiceCharge,
  generateQRCode,
  checkPaymentStatus,
  getPaymentRedirectUrl,
  confirmSeatBooking,

  // FonePay functions
  generateFonePayQR,
  checkFonePayStatus,

  // Coupon functions
  getAppliedCoupons,

  // Authentication utilities
  checkAuthentication,
  migrateAuthTokens,
  
  // Fallback utilities
  getFallbackPaymentInstruments,

  // Diagnostic function
  testAPIEndpoints
};