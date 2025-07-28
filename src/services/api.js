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
 * @param {string} fromCity - Origin city (default: 'Kathmandu')
 * @returns {Array} - Array of boarding point names for the specified city
 */
const getBoardingPoints = (fromCity = 'Kathmandu') => {
  const boardingPointsByCity = {
    'Kathmandu': [
      'Banepa', 'Sanga', 'Palanse', 'Nalinchowk', 'Bhaktapur', 'Jagati', 
      'Sallaghari', 'Bhatbhateni,Thimi', 'SS Chowk', 'Sagbari', 'Kaushaltar', 
      'Lokanthali', 'Jadibuti', 'Tinkune', 'Airport', 'Gaushala', 'Chabahil', 
      'GopiKrishna', 'Sukedhara', 'Dhumbarahi', 'ChappalKarkhana', 'Chakrapath', 
      'Basundhara', 'Samakhusi', 'Gangabu', 'Buspark', 'Machapokhari', 'Balaju', 
      'Banasthali', 'Sitapaila', 'Kalanki (Narayani Petrol Pump)', 'Swyambhu', 
      'Naikap', 'Satungal', 'Gurjudhare', 'Chandrasiri', 'Koteshwor'
    ],
    'Birgunj': [
      'Simara', 'Kalaiya', 'Jeetpur', 'Parwanipur', 'Gandak', 'Pipra', 'Ghantaghar'
    ]
  };
  
  return boardingPointsByCity[fromCity] || boardingPointsByCity['Kathmandu'];
};

/**
 * Get all dropping points for filtering
 * @param {string} toCity - Destination city (default: 'Birgunj')
 * @returns {Array} - Array of dropping point names for the specified city
 */
const getDroppingPoints = (toCity = 'Birgunj') => {
  const droppingPointsByCity = {
    'Kathmandu': [
      'Banepa', 'Sanga', 'Palanse', 'Nalinchowk', 'Bhaktapur', 'Jagati', 
      'Sallaghari', 'Bhatbhateni,Thimi', 'SS Chowk', 'Sagbari', 'Kaushaltar', 
      'Lokanthali', 'Jadibuti', 'Tinkune', 'Airport', 'Gaushala', 'Chabahil', 
      'GopiKrishna', 'Sukedhara', 'Dhumbarahi', 'ChappalKarkhana', 'Chakrapath', 
      'Basundhara', 'Samakhusi', 'Gangabu', 'Buspark', 'Machapokhari', 'Balaju', 
      'Banasthali', 'Sitapaila', 'Kalanki (Narayani Petrol Pump)', 'Swyambhu', 
      'Naikap', 'Satungal', 'Gurjudhare', 'Chandrasiri', 'Koteshwor'
    ],
    'Birgunj': [
      'Simara', 'Kalaiya', 'Jeetpur', 'Parwanipur', 'Gandak', 'Pipra', 'Ghantaghar'
    ]
  };
  
  return droppingPointsByCity[toCity] || droppingPointsByCity['Birgunj'];
};

/**
 * Get boarding and dropping points for a specific journey direction
 * Useful for two-way trips where points need to be swapped for return journey
 * @param {string} fromCity - Origin city
 * @param {string} toCity - Destination city
 * @param {boolean} isReturnJourney - Whether this is the return leg of a two-way trip
 * @returns {Object} - Object with boardingPoints and droppingPoints arrays
 */
const getJourneyPoints = (fromCity, toCity, isReturnJourney = false) => {
  // For return journey, swap the cities to get correct boarding/dropping points
  const effectiveFromCity = isReturnJourney ? toCity : fromCity;
  const effectiveToCity = isReturnJourney ? fromCity : toCity;
  
  return {
    boardingPoints: getBoardingPoints(effectiveFromCity),
    droppingPoints: getDroppingPoints(effectiveToCity),
    fromCity: effectiveFromCity,
    toCity: effectiveToCity
  };
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
      return [];
    }

    // Transform API response to match our component's expected format
    const transformedBuses = result.data.map((bus, index) => {
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
      
      return transformedBus;  // ← RETURN THE TRANSFORMED OBJECT
    });

    return transformedBuses;
    
  } else if (result.success && (!result.data || result.data.length === 0)) {
    // API returned success but no data
    return [];
  } else {
    // API returned unexpected structure
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

    // Process the successful response and return
    return processSuccessfulResponse(result, fromCity, toCity);
    
  } catch (error) {
    
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
 * @param {string} instrumentCode - Optional instrument code for direct payment method selection
 * @returns {Promise} - Promise resolving to payment initiation data
 */
const initiatePayment = async (amount, instrumentCode) => {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV;
    
    // Validate base URL to ensure it's not using frontend domain
    if (!baseUrl || baseUrl.includes('sonatraveltours.com')) {
      throw new Error('Payment API base URL is not configured correctly');
    }
    
    const url = `${baseUrl}/payment/initiate-payment`;
    
    // Prepare request body with optional instrument code
    const requestBody = { amount };
    if (instrumentCode) {
      requestBody.instrumentCode = instrumentCode;
    }
    
    // Use HTTP interceptor for authentication and request handling
    const response = await authenticatedFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    // Get response text first to see what the server is actually returning
    const responseText = await response.text();
    
    let result;
    try {
      if (responseText) {
        result = JSON.parse(responseText);
      } else {
        result = { message: 'Empty response from server' };
      }
    } catch (parseError) {
      result = { 
        message: 'Invalid JSON response from server',
        rawResponse: responseText 
      };
    }
    
    if (response.ok) {
      return {
        success: true,
        data: {
          merchantId: result.data?.merchantId || result.merchantId,
          merchantName: result.data?.merchantName || result.merchantName,
          amount: result.data?.amount || result.amount,
          merchantTransactionId: result.data?.merchantTransactionId || result.merchantTransactionId,
          processId: result.data?.processId || result.processId,
          instrumentCode: instrumentCode // Include the instrument code if provided
          
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
 * Check payment status using onepg endpoint
 * @param {string} merchantTxnId - Merchant Transaction ID
 * @param {string} gatewayTxnId - Gateway Transaction ID (optional, defaults to merchantTxnId)
 * @returns {Promise} - Promise resolving to payment status
 */
const checkPaymentStatusOnePG = async (merchantTxnId, gatewayTxnId) => {
  try {
    // Silent execution - console logging disabled

    const baseUrl = import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV;
    const endpoint = import.meta.env.VITE_PAYMENT_STATUS_ENDPOINT || '/payment/onepg';
    const url = `${baseUrl}${endpoint}?MerchantTxnId=${encodeURIComponent(merchantTxnId)}&GatewayTxnId=${encodeURIComponent(gatewayTxnId || merchantTxnId)}`;
    
    // Use HTTP interceptor for authentication and request handling
    const response = await authenticatedFetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    
    // Get response text first to see what the server is actually returning
    const responseText = await response.text();
    
    let result;
    try {
      if (responseText) {
        result = JSON.parse(responseText);
      } else {
        result = { message: 'Empty response from server' };
      }
    } catch (parseError) {
      // Silent error handling
      result = { 
        message: 'Invalid JSON response from server',
        rawResponse: responseText 
      };
    }

    if (response.ok) {
      return {
        success: true,
        data: result.data || result,
        statusMessage: result.message || 'Status check successful'
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
    // Silent error handling
    
    // HTTP interceptor will handle authentication errors automatically
    if (error.message === 'AUTHENTICATION_REQUIRED') {
      return {
        success: false,
        message: 'Authentication required for status check.',
        statusCode: 401,
        requiresAuth: true
      };
    }
    
    return {
      success: false,
      message: error.message || 'Network error occurred during status check',
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
    const baseUrl = import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV;
    
    // Validate base URL to ensure it's not using frontend domain
    if (!baseUrl || baseUrl.includes('sonatraveltours.com')) {
      throw new Error('Payment API base URL is not configured correctly');
    }
    
    const url = `${baseUrl}/payment/get-all-payment-instruments`;
    
    // Use HTTP interceptor for authentication and request handling
    const response = await authenticatedFetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    const responseText = await response.text();    let result;
    try {
      if (responseText) {
        result = JSON.parse(responseText);
      } else {
        result = { message: 'Empty response from payment instruments API' };
      }
    } catch (parseError) {
      result = { message: 'Invalid JSON response', rawResponse: responseText };
    }

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
        return {
          success: true,
          data: getFallbackPaymentInstruments(),
          fallback: true
        };
      }
      
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
      
      // If no instruments found, use fallback
      if (!instruments || instruments.length === 0) {
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
      // Return fallback instruments on API failure
      return {
        success: true,
        data: getFallbackPaymentInstruments(),
        fallback: true
      };
    }
  } catch (error) {
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
    return {
      success: true,
      data: getFallbackPaymentInstruments(),
      fallback: true
    };
  }
};

/**
 * Debug NPS payment gateway request
 * @param {HTMLFormElement} form - The form being submitted
 * @param {string} gatewayUrl - The gateway URL
 */
const debugNpsPaymentRequest = (form, gatewayUrl) => {
  const formData = Object.fromEntries(
    Array.from(form.elements).map(el => [el.name, el.value])
  );
  
  // Highlight the instrument code specifically
  const instrumentCodeValue = formData.InstrumentCode;
  if (instrumentCodeValue) {
    const validation = validateInstrumentCode(instrumentCodeValue);
  } else {
  }
  
  // Create a cURL command for debugging
  const curlCommand = `curl -X POST "${gatewayUrl}" \\\n` + 
    `  -H "Content-Type: application/x-www-form-urlencoded" \\\n` +
    Array.from(form.elements)
      .map(el => `  -d "${el.name}=${encodeURIComponent(el.value)}"`)
      .join(' \\\n');
};

/**
 * Validate instrument code for NPS gateway
 * @param {string} instrumentCode - The instrument code to validate
 * @returns {Object} - Validation result with recommendations
 */
const validateInstrumentCode = (instrumentCode) => {
  const validCodes = {
    // Cards - NPS Card Selection
    '': 'NPS Card Selection Page', // Empty code shows NPS card selection
    'CARD': 'Generic Card Payment',
    'VISA': 'Visa Card',
    'MASTERCARD': 'Mastercard',
    'NCHL': 'NCHL Card Payment',
    
    // Digital Wallets / Checkout Gateways
    'IMEPAYG': 'IME Pay Digital Wallet',
    'HAMROPAYG': 'Hamro Pay Digital Wallet',
    'PRABHUPAYG': 'Prabhu Pay Digital Wallet',
    'MYPAYG': 'MyPay Digital Wallet',
    'ESEWAG': 'eSewa Digital Wallet',
    'KHALTIG': 'Khalti Digital Wallet',
    
    // E-Banking
    'NICENPKA': 'NIC ASIA Bank E-Banking',
    'MBLNNPKA': 'Machhapuchchhre Bank E-Banking',
    'RBBLNPKA': 'Rastriya Banijya Bank E-Banking',
    'NABILNPKA': 'NABIL Bank E-Banking',
    'SCBLNPKA': 'Standard Chartered Bank E-Banking',
    'HBLNPKA': 'Himalayan Bank E-Banking',
    'NCCNPKA': 'Nepal Credit & Commerce Bank E-Banking',
    'NBBLNPKA': 'Nepal Bangladesh Bank E-Banking',
    'ADBLNPKA': 'Agriculture Development Bank E-Banking',
    'GBIMENPKA': 'Global IME Bank E-Banking',
    
    // Mobile Banking
    'NICMBNPKA': 'NIC ASIA Mobile Banking',
    'MBLMBNPKA': 'Machhapuchchhre Mobile Banking',
    'NABILMBNPKA': 'NABIL Mobile Banking'
  };
  
  if (!instrumentCode) {
    return {
      isValid: false,
      message: 'No instrument code provided',
      recommendation: 'Provide a valid instrument code to bypass NPS selection page'
    };
  }
  
  if (validCodes[instrumentCode]) {
    return {
      isValid: true,
      message: `Valid instrument code for ${validCodes[instrumentCode]}`,
      bankName: validCodes[instrumentCode]
    };
  }
  
  return {
    isValid: false,
    message: `Unknown instrument code: ${instrumentCode}`,
    recommendation: `Try one of these common codes: ${Object.keys(validCodes).slice(0, 5).join(', ')}`,
    validCodes: Object.keys(validCodes)
  };
};

/**
 * Get fallback payment instruments when API fails
 * @returns {Array} - Array of fallback payment instruments
 */
const getFallbackPaymentInstruments = () => {
  return [
    // Card payment options
    {
      instrumentCode: '', // Empty code for NPS card selection page
      name: 'Credit/Debit Card',
      logoUrl: null,
      bankType: 'Card',
      institutionName: 'Card Payment',
      description: 'Pay with Credit or Debit Card'
    },
    // Digital wallets
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
    // E-Banking
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
    // Check for authentication token using the enhanced utility function
    const authCheck = checkAuthentication();
    
    if (!authCheck.isAuthenticated) {
      // Return default service charge instead of failing
      const defaultServiceCharge = Math.round(amount * 0.02); // 2% default
      return {
        success: true,
        serviceCharge: defaultServiceCharge,
        fallback: true
      };
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${authCheck.token}`
    };
    
    const requestBody = {
      amount: amount,
      instrumentCode: instrumentCode
    };
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/get-service-charge`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    const responseText = await response.text();

    let result;
    try {
      if (responseText) {
        result = JSON.parse(responseText);
      } else {
        result = { message: 'Empty response from service charge API' };
      }
    } catch (parseError) {
      result = { 
        message: 'Invalid JSON response from service charge API',
        rawResponse: responseText 
      };
    }
    
    

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
        serviceCharge = Math.round(amount * 0.02); // 2% default
      }
      
      return {
        success: true,
        serviceCharge: serviceCharge,
        data: result.data || result
      };
    } else if (response.status === 401) {
      // Return default service charge instead of failing
      const defaultServiceCharge = Math.round(amount * 0.02); // 2% default
      return {
        success: true,
        serviceCharge: defaultServiceCharge,
        fallback: true,
        message: 'Using default service charge due to authentication issue'
      };
    } else {
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
 * NPS Payment Status Check
 * @param {Object} seatInfo - Complete seat and passenger information
 * @param {Object} paymentInfo - Payment information with transaction ID
 * @returns {Promise} - Promise resolving to payment verification result
 */
const checkPaymentStatus = async (seatInfo, paymentInfo) => {
  try {
    // Check for authentication token
    const authCheck = checkAuthentication();
    
    if (!authCheck.isAuthenticated) {
      return {
        success: false,
        message: authCheck.error || 'Authentication required to check payment status.',
        statusCode: 401,
        requiresAuth: true
      };
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${authCheck.token}`
    };
    
    const requestBody = {
      seatInfo: seatInfo,
      paymentInfo: paymentInfo
    };
    
    // Payment status check removed - using NPS flow instead
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/check-status`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    const responseText = await response.text();

    let result;
    try {
      if (responseText) {
        result = JSON.parse(responseText);
      } else {
        result = { message: 'Empty response from payment status API' };
      }
    } catch (parseError) {
      result = { 
        message: 'Invalid JSON response from payment status API',
        rawResponse: responseText 
      };
    }
    
    

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
      return {
        success: false,
        message: 'Authentication required. Please log in to check payment status.',
        details: result,
        statusCode: response.status,
        requiresAuth: true
      };
    } else {
      return {
        success: false,
        message: result.message || result.error || `HTTP ${response.status}: Failed to check payment status`,
        details: result,
        statusCode: response.status
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Network error occurred during payment status check',
      error: error.name
    };
  }
};

/**
 * NPS Payment Redirect Functions
 */

/**
 * Make a direct POST request to the Nepal Payment Gateway
 * This function creates a hidden form and submits it programmatically to redirect the user
 * @param {Object} paymentData - Payment data from initiate-payment API
 * @param {string} successUrl - Success callback URL
 * @param {string} failureUrl - Failure callback URL
 * @param {Object} additionalParams - Any additional parameters required by the gateway
 */
const redirectToPaymentGateway = (paymentData, successUrl, failureUrl, additionalParams = {}) => {
  try {
    // Gateway URL
    const gatewayUrl = "https://gateway.nepalpayment.com/payment/index";
    
    // Create form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = gatewayUrl;
    form.style.display = 'none'; // Hidden form
    form.enctype = 'application/x-www-form-urlencoded'; // Use the correct content type
    form.enctype = 'application/x-www-form-urlencoded'; // Use the correct content type
    
    // Check for authentication token
    const authCheck = checkAuthentication();
    const authToken = authCheck.isAuthenticated ? authCheck.token : '';
    
    // Add required parameters from initiate-payment response
    // Using the EXACT field names required by Nepal Payment Gateway (case sensitive)
    const params = {
      MerchantId: paymentData.merchantId, // Capital M
      MerchantName: paymentData.merchantName || 'sonatravelapi', // Capital M
      MerchantTxnId: paymentData.merchantTransactionId, // Capital M, Txn
      Amount: paymentData.amount, // Capital A
      ProcessId: paymentData.processId, // Capital P
      InstrumentCode: paymentData.instrumentCode || additionalParams.instrumentCode || '', // Use instrument code from payment data first, then additional params
      TransactionRemarks: additionalParams.remarks || 'Bus ticket booking',
      returnUrl:"https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/prod/payment/callback", // Capital T, R
      
      // Don't include ReturnUrl, CancelUrl, or AuthToken as NPS doesn't support these
      
      // Include any other required additional parameters (except auth token and instrument code since it's already handled above)
      ...Object.fromEntries(
        Object.entries(additionalParams).filter(([key]) => 
          !['authToken', 'returnUrl', 'cancelUrl', 'AuthToken', 'ReturnUrl', 'CancelUrl', 'instrumentCode'].includes(key)
        )
      )
    };

    // Validate the instrument code
    const validation = validateInstrumentCode(params.InstrumentCode);
    
    // Add all parameters to form
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
      }
    });
    
    // Debug the payment request
    debugNpsPaymentRequest(form, gatewayUrl);
    
    // Add form to body and submit
    document.body.appendChild(form);
    form.submit();
    
    // Return true to indicate the redirect is in progress
    return true;
  } catch (error) {
      // Attempt to use direct fetch with correct content type as fallback
      try {
        // Get authentication token for fallback method
        const authCheck = checkAuthentication();
        const authToken = authCheck.isAuthenticated ? authCheck.token : '';
        
        // Try using fetch with application/x-www-form-urlencoded format
        const formData = new URLSearchParams();
        formData.append('MerchantId', paymentData.merchantId);
        formData.append('MerchantName', paymentData.merchantName || 'sonatravelapi');
        formData.append('MerchantTxnId', paymentData.merchantTransactionId);
        formData.append('Amount', paymentData.amount);
        formData.append('ProcessId', paymentData.processId || '');
        formData.append('InstrumentCode', paymentData.instrumentCode || additionalParams.instrumentCode || '');
        formData.append('TransactionRemarks', additionalParams.remarks || 'Bus ticket booking');
        
        // Create a new hidden form for manual submission
        const manualForm = document.createElement('form');
        manualForm.method = 'POST';
        manualForm.action = gatewayUrl;
        manualForm.enctype = 'application/x-www-form-urlencoded';
        manualForm.style.display = 'none';
        
        // Add form fields with correct parameter names for NPS gateway
        Object.entries({
          'MerchantId': paymentData.merchantId,
          'MerchantName': paymentData.merchantName || 'sonatravelapi',
          'MerchantTxnId': paymentData.merchantTransactionId,
          'Amount': paymentData.amount,
          'ProcessId': paymentData.processId || '',
          'InstrumentCode': paymentData.instrumentCode || additionalParams.instrumentCode || '',
          'TransactionRemarks': additionalParams.remarks || 'Bus ticket booking'
        }).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          manualForm.appendChild(input);
        });
        
        // Add form to body and submit
        document.body.appendChild(manualForm);
        
        // Submit the form
        manualForm.submit();
        return true;
    } catch (fallbackError) {
      return false;
    }
  }
};

/**
 * Get payment redirect URL for non-direct payments (EBanking, Wallets)
 * @param {string} merchantTransactionId - Transaction ID from initiate payment
 * @param {string} processId - Process ID from initiate payment
 * @param {string} instrumentCode - Selected payment instrument code
 * @param {string} successUrl - Success callback URL
 * @param {string} failureUrl - Failure callback URL
 * @returns {Promise} - Promise resolving to redirect URL
 */
const getPaymentRedirectUrl = async (merchantTransactionId, processId, instrumentCode, successUrl, failureUrl) => {
  try {
    // Check for authentication token using the utility function
    const authCheck = checkAuthentication();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (authCheck.isAuthenticated) {
      headers.Authorization = `Bearer ${authCheck.token}`;
    }
    
    // Construct URL with query parameters for GET request as shown in your attachment
    const params = new URLSearchParams({
      MerchantTxnId: merchantTransactionId,
      GatewayTxnId: processId || ''
    });
    
    const url = `${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/onepg?${params.toString()}`;
    
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
    return {
      success: false,
      message: error.message || 'Failed to generate payment redirect URL'
    };
  }
};

/**
 * Check NPS transaction status using CheckTransactionStatus endpoint
 * @param {string} merchantTxnId - Merchant Transaction ID
 * @returns {Promise} - Promise resolving to NPS transaction status
 */
const checkNPSTransactionStatus = async (merchantTxnId) => {
  try {
    // Check for authentication token
    const authCheck = checkAuthentication();
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (authCheck.isAuthenticated) {
      headers.Authorization = `Bearer ${authCheck.token}`;
    } else {
      throw new Error('Authentication required. Please login first.');
    }
    
    // Prepare request body in the format expected by NPS CheckTransactionStatus
    const requestBody = {
      MerchantId: 'sonatravelapi', // Your merchant ID
      MerchantName: 'sonatravelapi', // Your merchant name
      MerchantTxnId: merchantTxnId,
      // Signature will be generated by backend if needed
    };
    
    // Use the CheckTransactionStatus endpoint
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_PAYMENT_DEV}/payment/CheckTransactionStatus`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      result = { message: 'Invalid response from NPS status API' };
    }

    if (response.ok && result.success) {
      // NPS returns status codes: 000=Success, 001/002=Pending, others=Failed
      const statusCode = result.data?.StatusCode || result.StatusCode;
      const message = result.data?.Message || result.Message || 'Transaction status retrieved';
      
      return {
        success: true,
        data: {
          StatusCode: statusCode,
          Message: message,
          GatewayTransactionId: result.data?.GatewayTransactionId || result.GatewayTransactionId,
          MerchantTransactionId: merchantTxnId
        }
      };
    } else {
      return {
        success: false,
        message: result.message || `HTTP ${response.status}: NPS status check failed`,
        data: result.data,
        statusCode: result.statusCode || response.status
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Network error occurred during NPS status check',
      error: error.name
    };
  }
};

/**
 * Transform booking details into seatInfoList format for two-way bookings
 * @param {Object} bookingDetails - Booking information
 * @returns {Array} - Array of seatInfo objects for each journey leg
 */
const transformBookingToSeatInfoList = (bookingDetails) => {
  const seatInfoList = [];
  
  // Handle passengers array (for two-way bookings)
  if (bookingDetails.passengers && Array.isArray(bookingDetails.passengers)) {
    // Group passengers by journey (departure/return)
    const journeyGroups = {};
    
    bookingDetails.passengers.forEach(passenger => {
      const journeyKey = `${passenger.travelDate}-${passenger.vesselId || passenger.busId}`;
      
      if (!journeyGroups[journeyKey]) {
        journeyGroups[journeyKey] = {
          dateOfTravel: passenger.travelDate,
          busId: parseInt(passenger.vesselId || passenger.busId),
          passengersList: []
        };
      }
      
      journeyGroups[journeyKey].passengersList.push({
        passengerName: passenger.fullName || passenger.passengerName || passenger.name,
        contactNumber: passenger.phoneNumber || passenger.contactNumber || passenger.phone,
        seatNo: passenger.seatNumber || passenger.seatNo,
        origin: passenger.origin || 'kathmandu',
        destination: passenger.destination || 'birgunj',
        gender: (passenger.gender || 'male').toLowerCase(),
        boardingLocation: passenger.boardingLocation,
        deboardingLocation: passenger.deboardingLocation,
        residence: passenger.residence || 'nepali',
        email: passenger.email || passenger.emailId || ''
      });
    });
    
    // Convert groups to array
    seatInfoList.push(...Object.values(journeyGroups));
  } else if (bookingDetails.passengersList && Array.isArray(bookingDetails.passengersList)) {
    // Handle single journey with passengers list
    seatInfoList.push({
      dateOfTravel: bookingDetails.travelDate || bookingDetails.dateOfTravel,
      busId: parseInt(bookingDetails.vesselId || bookingDetails.busId),
      passengersList: bookingDetails.passengersList.map(passenger => ({
        passengerName: passenger.fullName || passenger.passengerName || passenger.name,
        contactNumber: passenger.phoneNumber || passenger.contactNumber || passenger.phone,
        seatNo: passenger.seatNumber || passenger.seatNo,
        origin: passenger.origin || bookingDetails.origin || 'kathmandu',
        destination: passenger.destination || bookingDetails.destination || 'birgunj',
        gender: (passenger.gender || 'male').toLowerCase(),
        boardingLocation: passenger.boardingLocation || bookingDetails.boardingLocation,
        deboardingLocation: passenger.deboardingLocation || bookingDetails.onboardingLocation,
        residence: passenger.residence || 'nepali',
        email: passenger.email || passenger.emailId || ''
      }))
    });
  } else {
    // Handle legacy single passenger booking
    const selectedSeatsArray = Array.isArray(bookingDetails.selectedSeats) 
      ? bookingDetails.selectedSeats 
      : [bookingDetails.selectedSeats];
    
    seatInfoList.push({
      dateOfTravel: bookingDetails.travelDate,
      busId: parseInt(bookingDetails.vesselId || bookingDetails.busId),
      passengersList: selectedSeatsArray.map(seat => ({
        passengerName: bookingDetails.passengerName || bookingDetails.fullName,
        contactNumber: bookingDetails.contactNumber || bookingDetails.phoneNumber,
        seatNo: seat,
        origin: bookingDetails.origin || 'kathmandu',
        destination: bookingDetails.destination || 'birgunj',
        gender: (bookingDetails.gender || 'male').toLowerCase(),
        boardingLocation: bookingDetails.boardingLocation,
        deboardingLocation: bookingDetails.onboardingLocation,
        residence: 'nepali',
        email: bookingDetails.emailId || bookingDetails.email || ''
      }))
    });
  }
  
  return seatInfoList;
};

/**
 * Update payment status using setPayment endpoint (like Flutter setPayment)
 * @param {Object} paymentInfo - Payment information including transaction IDs
 * @param {string} status - Payment status (SUCCESS, FAILED, PENDING)
 * @param {Object} seatInfo - Seat booking information (optional, for compatibility)
 * @returns {Promise} - Promise resolving to payment update result
 */
const updatePaymentStatus = async (paymentInfo, status, seatInfo = null) => {
  try {
    // Check for authentication token
    const authCheck = checkAuthentication();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (authCheck.isAuthenticated) {
      headers.Authorization = `Bearer ${authCheck.token}`;
    } else {
      throw new Error('Authentication required. Please login first.');
    }
    
    let requestBody;
    
    // Check if this is a two-way booking with seatInfoList
    if (seatInfo && seatInfo.seatInfoList && Array.isArray(seatInfo.seatInfoList)) {
      // Two-way booking format with seatInfoList array
      requestBody = {
        seatInfoList: seatInfo.seatInfoList,
        paymentInfo: {
          merchantTransactionId: paymentInfo.merchantTransactionId
        }
      };
    } else if (seatInfo && (seatInfo.passengers || seatInfo.passengersList)) {
      // Transform booking details to seatInfoList format for two-way bookings
      const seatInfoList = transformBookingToSeatInfoList(seatInfo);
      
      if (seatInfoList.length > 1) {
        // Two-way booking detected
        requestBody = {
          seatInfoList: seatInfoList,
          paymentInfo: {
            merchantTransactionId: paymentInfo.merchantTransactionId
          }
        };
      } else {
        // One-way booking format (existing format)
        requestBody = {
          merchantTransactionId: paymentInfo.merchantTransactionId,
          gatewayTransactionId: paymentInfo.gatewayTransactionId,
          amount: paymentInfo.amount,
          paymentStatus: status,
          paymentMethod: paymentInfo.paymentMethod || 'NPS',
          transactionDate: new Date().toISOString(),
          remarks: paymentInfo.remarks || `Payment ${status.toLowerCase()}`
        };
      }
    } else {
      // One-way booking format (existing format)
      requestBody = {
        merchantTransactionId: paymentInfo.merchantTransactionId,
        gatewayTransactionId: paymentInfo.gatewayTransactionId,
        amount: paymentInfo.amount,
        paymentStatus: status,
        paymentMethod: paymentInfo.paymentMethod || 'NPS',
        transactionDate: new Date().toISOString(),
        remarks: paymentInfo.remarks || `Payment ${status.toLowerCase()}`
      };
    }
    
    // Use the seat/payment endpoint like Flutter setPayment
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seat/payment`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      result = { message: 'Invalid response from server' };
    }
    
    if (response.ok && result.success) {
      return {
        success: true,
        data: result.data,
        message: result.message || 'Payment status updated successfully'
      };
    } else {
      return {
        success: false,
        message: result.message || `HTTP ${response.status}: Payment status update failed`,
        data: result.data,
        statusCode: result.statusCode || response.status
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Network error occurred during payment status update',
      error: error.name
    };
  }
};

/**
 * Book tickets after successful payment (like Flutter bookTickets)
 * @param {Object} bookingInfo - Complete booking information
 * @returns {Promise} - Promise resolving to ticket booking result
 */
const bookTickets = async (bookingInfo) => {
  try {
    // Check for authentication token
    const authCheck = checkAuthentication();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (authCheck.isAuthenticated) {
      headers.Authorization = `Bearer ${authCheck.token}`;
    } else {
      throw new Error('Authentication required. Please login first.');
    }
    
    // Transform booking info to match the expected API format exactly
    let passengersList = [];
    
    if (Array.isArray(bookingInfo.passengers)) {
      // For two-way trips: passengers array contains entries for both departure and return
      // For one-way trips: passengers array contains entries for single direction
      // Each passenger entry already has the correct seat number and route details
      passengersList = bookingInfo.passengers.map((passenger, index) => ({
        passengerName: passenger.fullName || passenger.passengerName || passenger.name,
        contactNumber: parseInt(passenger.phoneNumber || passenger.contactNumber || passenger.phone),
        // Use passenger's specific seat number (already assigned for their direction)
        seatNo: passenger.seatNumber || passenger.seatNo || 
                (Array.isArray(bookingInfo.selectedSeats) ? bookingInfo.selectedSeats[index] : null),
        // Use passenger-specific origin/destination (already set for departure/return)
        origin: passenger.origin || bookingInfo.origin || bookingInfo.boardingLocation || 'Kathmandu',
        destination: passenger.destination || bookingInfo.destination || bookingInfo.onboardingLocation || 'Birgunj',
        gender: (passenger.gender || 'male').toLowerCase(),
        // Use passenger-specific boarding/deboarding locations (already set for direction)
        boardingLocation: passenger.boardingLocation || bookingInfo.boardingLocation || bookingInfo.boardingPoint || 'Bus Park',
        deboardingLocation: passenger.deboardingLocation || bookingInfo.onboardingLocation || bookingInfo.droppingPoint || 'Terminal',
        residence: passenger.address || passenger.residence || 'N/A',
        email: passenger.email || passenger.emailId || ''
      }));
    } else {
      // Legacy single passenger case - convert to array format
      // This handles cases where bookingInfo doesn't have passengers array
      const selectedSeatsArray = Array.isArray(bookingInfo.selectedSeats) 
        ? bookingInfo.selectedSeats 
        : [bookingInfo.selectedSeats];
      
      passengersList = selectedSeatsArray.map(seat => ({
        passengerName: bookingInfo.passengerName || bookingInfo.fullName,
        contactNumber: parseInt(bookingInfo.contactNumber || bookingInfo.phoneNumber),
        seatNo: seat,
        origin: bookingInfo.origin || bookingInfo.boardingLocation || 'Kathmandu',
        destination: bookingInfo.destination || bookingInfo.onboardingLocation || 'Birgunj',
        gender: (bookingInfo.gender || 'male').toLowerCase(),
        boardingLocation: bookingInfo.boardingLocation || bookingInfo.boardingPoint || 'Bus Park',
        deboardingLocation: bookingInfo.onboardingLocation || bookingInfo.droppingPoint || 'Terminal',
        residence: bookingInfo.address || bookingInfo.residence || 'N/A',
        email: bookingInfo.emailId || bookingInfo.email || ''
      }));
    }
    
    // Prepare request body matching the exact format you provided
    const requestBody = {
      dateOfTravel: bookingInfo.travelDate || new Date().toISOString().split('T')[0],
      paymentAmount: parseFloat(bookingInfo.amount || bookingInfo.paymentAmount || 0),
      payment_status: "Completed", // Fixed value for successful bookings
      paymentMode: bookingInfo.paymentMethod === 'NPS' ? 'online' : (bookingInfo.paymentMethod || 'online').toLowerCase(),
      busId: parseInt(bookingInfo.vesselId || bookingInfo.busId || 0),
      passengersList: passengersList
    };
    
    // Use the /seat endpoint exactly as specified
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seat`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      result = { message: 'Invalid response from server' };
    }

    if (response.ok && result.success) {
      return {
        success: true,
        data: {
          bookingId: result.data?.bookingId || result.bookingId,
          ticketNumber: result.data?.ticketNumber || result.ticketNumber,
          confirmationCode: result.data?.confirmationCode || result.confirmationCode,
          bookingDetails: result.data || result
        },
        message: result.message || 'Tickets booked successfully'
      };
    } else {
      return {
        success: false,
        message: result.message || `HTTP ${response.status}: Ticket booking failed`,
        data: result.data,
        statusCode: result.statusCode || response.status
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Network error occurred during ticket booking',
      error: error.name
    };
  }
};

/**
 * Get user's booking history (like Flutter getMyBookings)
 * @param {Object} params - Query parameters for bookings
 * @returns {Promise} - Promise resolving to booking history
 */
const getMyBookings = async (params = {}) => {
  try {
    // Check for authentication token
    const authCheck = checkAuthentication();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (authCheck.isAuthenticated) {
      headers.Authorization = `Bearer ${authCheck.token}`;
    } else {
      throw new Error('Authentication required. Please login first.');
    }
    
    // Prepare query parameters
    const queryParams = new URLSearchParams({
      date: params.date || new Date().toISOString().split('T')[0], // Default to today
      pageSize: params.pageSize || '100',
      currentPage: params.currentPage || '1',
      ...params // Include any additional parameters
    });
    
    const url = `${import.meta.env.VITE_API_BASE_URL}/bookings?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      result = { message: 'Invalid response from server' };
    }

    if (response.ok && result.success) {
      return {
        success: true,
        data: result.data || [],
        totalCount: result.totalCount || 0,
        currentPage: result.currentPage || 1,
        pageSize: result.pageSize || 100,
        message: result.message || 'Booking history retrieved successfully'
      };
    } else {
      return {
        success: false,
        message: result.message || `HTTP ${response.status}: Failed to fetch booking history`,
        data: [],
        statusCode: result.statusCode || response.status
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Network error occurred while fetching booking history',
      data: [],
      error: error.name
    };
  }
};

/**
 * Complete NPS payment flow handler
 * Orchestrates the entire payment success/failure flow like Flutter
 * @param {Object} callbackData - Data from NPS callback
 * @param {Object} bookingDetails - Original booking information
 * @returns {Promise} - Promise resolving to complete flow result
 */
const handleNPSPaymentCallback = async (callbackData, bookingDetails) => {
  try {
    const { MerchantTxnId, GatewayTxnId } = callbackData;
    
    // Step 1: Check NPS transaction status
    const statusResult = await checkNPSTransactionStatus(MerchantTxnId);
    
    if (!statusResult.success) {
      throw new Error(`Status check failed: ${statusResult.message}`);
    }
    
    const { StatusCode, Message } = statusResult.data;
    
    // Step 2: Update payment status based on NPS response
    const paymentInfo = {
      merchantTransactionId: MerchantTxnId,
      gatewayTransactionId: GatewayTxnId || statusResult.data.GatewayTransactionId,
      amount: bookingDetails.amount,
      paymentMethod: 'NPS',
      remarks: Message
    };
    
    let paymentStatus;
    if (StatusCode === '000') {
      paymentStatus = 'SUCCESS';
    } else if (StatusCode === '001' || StatusCode === '002') {
      paymentStatus = 'PENDING';
    } else {
      paymentStatus = 'FAILED';
    }
    
    const paymentUpdateResult = await updatePaymentStatus(paymentInfo, paymentStatus, bookingDetails);
    
    if (paymentStatus === 'SUCCESS') {
      // Step 3: Book tickets for successful payment
      const ticketBookingInfo = {
        ...bookingDetails,
        merchantTransactionId: MerchantTxnId,
        gatewayTransactionId: GatewayTxnId || statusResult.data.GatewayTransactionId,
        paymentMethod: 'NPS'
      };
      
      const bookingResult = await bookTickets(ticketBookingInfo);
      
      if (bookingResult.success) {
        return {
          success: true,
          status: 'SUCCESS',
          message: 'Payment successful and tickets booked',
          data: {
            payment: paymentUpdateResult.data,
            booking: bookingResult.data,
            transactionId: MerchantTxnId,
            statusCode: StatusCode,
            statusMessage: Message
          }
        };
      } else {
        // Payment successful but booking failed
        return {
          success: false,
          status: 'BOOKING_FAILED',
          message: `Payment successful but booking failed: ${bookingResult.message}`,
          data: {
            payment: paymentUpdateResult.data,
            transactionId: MerchantTxnId,
            statusCode: StatusCode,
            statusMessage: Message,
            bookingError: bookingResult.message
          }
        };
      }
    } else if (paymentStatus === 'FAILED') {
      // Step 3: Handle payment failure - release seats
      
      return {
        success: false,
        status: 'FAILED',
        message: `Payment failed: ${Message}`,
        data: {
          payment: paymentUpdateResult.data,
          transactionId: MerchantTxnId,
          statusCode: StatusCode,
          statusMessage: Message
        }
      };
    } else {
      // Payment pending
      return {
        success: true,
        status: 'PENDING',
        message: `Payment is pending: ${Message}`,
        data: {
          payment: paymentUpdateResult.data,
          transactionId: MerchantTxnId,
          statusCode: StatusCode,
          statusMessage: Message
        }
      };
    }
    
  } catch (error) {
    return {
      success: false,
      status: 'ERROR',
      message: error.message || 'Error processing payment callback',
      error: error.name
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
    // Use the complete NPS payment flow instead of simple seat booking
    const callbackData = {
      MerchantTxnId: paymentInfo.merchantTransactionId || paymentInfo.merchantTxnId,
      GatewayTxnId: paymentInfo.gatewayTransactionId || paymentInfo.gatewayTxnId
    };
    
    const bookingDetails = {
      // Passenger details
      passengerName: seatInfo.passengerName || seatInfo.fullName,
      contactNumber: seatInfo.contactNumber || seatInfo.phoneNumber,
      emailId: seatInfo.emailId || seatInfo.email,
      gender: seatInfo.gender,
      age: seatInfo.age,
      
      // Seat selection details
      selectedSeats: seatInfo.selectedSeats,
      seatNumber: Array.isArray(seatInfo.selectedSeats) ? seatInfo.selectedSeats.join(',') : seatInfo.selectedSeats,
      
      // Travel details
      boardingLocation: seatInfo.boardingLocation || seatInfo.boardingPoint,
      onboardingLocation: seatInfo.onboardingLocation || seatInfo.droppingPoint,
      destination: seatInfo.destination,
      vesselId: seatInfo.vesselId || seatInfo.busId,
      travelDate: seatInfo.travelDate,
      
      // Payment details
      amount: paymentInfo.amount,
      paymentMethod: paymentInfo.paymentMethod || 'NPS',
      remarks: paymentInfo.remarks || 'Bus ticket booking via NPS gateway'
    };
    
    // Use the complete NPS payment callback handler
    const result = await handleNPSPaymentCallback(callbackData, bookingDetails);
    
    if (result.success && result.status === 'SUCCESS') {
      return {
        success: true,
        data: result.data,
        message: result.message,
        statusCode: 200
      };
    } else {
      return {
        success: false,
        message: result.message,
        data: result.data,
        statusCode: result.status === 'FAILED' ? 400 : 500
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Network error occurred during seat booking',
      error: error.name
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
    }
    
    return true;
  } catch (error) {
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
    // Validate the token
    const validation = validateJWTToken(token);
    if (!validation.isValid) {
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
    
    return { 
      isAuthenticated: true, 
      token: token, 
      source: 'authToken utility',
      validation
    };
  }
  
  // No token found in any storage
  return { isAuthenticated: false, token: null, source: null };
};

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
    throw error;
  }
};

/**
 * Diagnostic function to test API endpoints
 */
const testAPIEndpoints = async () => {
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
        
        // API testing completed silently for production
      }
    } catch (error) {
      // Handle API testing errors silently for production
    }
  }
};

/**
 * User Authentication Functions
 */

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Promise resolving to login result
 */
const loginUser = async (email, password) => {
  try {
    // Clear any existing authentication state first
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('loginSuccess');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('token');
    
    // Use the correct API URL for login - NEVER use frontend domain
    const loginUrl = API_URLS.AUTH.LOGIN;
    
    // Ensure we're not using the wrong domain
    if (loginUrl.includes('sonatraveltours.com')) {
      throw new Error('Invalid API configuration - login URL points to frontend domain');
    }
    
    // Direct fetch without authentication interceptor for login
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${response.status} ${response.statusText}. ${errorText}`);
    }
    
    const result = await response.json();
    
    // Extract token from response
    const token = result.token || result.accessToken || result.authToken || result.data?.token;
    
    if (token) {
      // Store token in both locations for compatibility
      localStorage.setItem('authToken', token);
      localStorage.setItem('token', token);
      localStorage.setItem('loginSuccess', 'true');
      
      // Store user info if available
      if (result.user || result.data?.user) {
        const user = result.user || result.data.user;
        localStorage.setItem('userRole', user.role || 'user');
        localStorage.setItem('userName', user.name || user.fullName || '');
        localStorage.setItem('userEmail', user.email || '');
      }
      
      return {
        success: true,
        data: result,
        token: token,
        message: 'Login successful'
      };
    } else {
      throw new Error('No authentication token received from server');
    }
    
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Login failed',
      error: error.name
    };
  }
};

/**
 * Logout user and clear authentication
 */
const logoutUser = () => {
  // Clear all authentication data
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
  localStorage.removeItem('loginSuccess');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('token');
  
  return {
    success: true,
    message: 'Logged out successfully'
  };
};

export default {
  searchBuses,
  getRoutes,

  getBusFacilities,
  getBusTypes,
  getBoardingPoints,
  getDroppingPoints,
  getJourneyPoints, // New function for two-way trip boarding/dropping points
  getBusDetails,
  bookSeats,
  getAvailableSeats,

  // Payment gateway functions
  initiatePayment,
  getPaymentInstruments,
  getServiceCharge,
  // generateQRCode, // Removed - using NPS payment flow
  checkPaymentStatus,
  checkPaymentStatusOnePG,
  redirectToPaymentGateway,
  getPaymentRedirectUrl,
  confirmSeatBooking,

  // NPS Payment Flow Functions (matching Flutter app)
  checkNPSTransactionStatus,
  updatePaymentStatus,
  transformBookingToSeatInfoList,
  bookTickets,
  getMyBookings,
  handleNPSPaymentCallback,

  // FonePay functions (Removed - using NPS payment flow)
  // generateFonePayQR,
  // checkFonePayStatus,

  // Coupon functions
  getAppliedCoupons,

  // Authentication utilities
  checkAuthentication,
  migrateAuthTokens,
  loginUser,
  logoutUser,
  
  // Fallback utilities
  getFallbackPaymentInstruments,
  
  // Debug utilities
  validateInstrumentCode,
  debugNpsPaymentRequest,

  // Diagnostic function
  testAPIEndpoints
};