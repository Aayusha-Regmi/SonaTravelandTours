// API Service for handling all backend communication

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.sonatraveltours.com';

/**
 * Get the authentication token from localStorage
 * @returns {string|null} The auth token or null if not found
 */
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Create headers object with optional authentication
 * @param {boolean} includeAuth - Whether to include auth token in headers
 * @returns {Object} Headers object
 */
const createHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Handle API responses and errors consistently
 * @param {Response} response - Fetch Response object
 * @returns {Promise<any>} Parsed response data
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    // Try to get error details from response
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || `API error: ${response.status}`;
    } catch (e) {
      errorMessage = `API error: ${response.status} ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }
  
  return response.json();
};

/**
 * API Services object
 */
const apiService = {
  /**
   * Get available routes
   * @returns {Promise<Array>} List of routes
   */
  getRoutes: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/routes`, {
        headers: createHeaders(false) // Public endpoint, no auth needed
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Failed to fetch routes:', error);
      
      // Return fallback data in case of error
      return [
        { id: 1, name: 'Kathmandu', code: 'KTM' },
        { id: 2, name: 'Pokhara', code: 'PKR' },
        { id: 3, name: 'Birgunj', code: 'BRG' },
        { id: 4, name: 'Biratnagar', code: 'BRT' },
        { id: 5, name: 'Nepalgunj', code: 'NPG' }
      ];
    }
  },
  
  /**
   * Search for bus routes
   * @param {Object} searchParams - Search parameters
   * @returns {Promise<Object>} Search results
   */
  searchBusRoutes: async (searchParams) => {
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: createHeaders(false), // Assuming search doesn't need auth
        body: JSON.stringify(searchParams)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Failed to search routes:', error);
        // Return fallback data in case of error
      return {
        success: true,
        results: [
          {
            id: 'bus-1',
            busName: 'Sona Deluxe',
            busType: 'AC Sleeper',
            from: searchParams.from,
            to: searchParams.to,
            date: searchParams.date,
            price: 'Rs. 1500.00',
            fare: 1500,
            departureTime: '08:00 PM',
            arrivalTime: '06:00 AM',
            boardingPoint: 'New Bus Park',
            droppingPoint: 'Adarsha Nagar',
            rating: '4.8',
            duration: '10h',
            availableSeats: 18,
            facilities: ['WiFi', 'Charging Point', 'Blanket', 'Water Bottle']
          },
          {
            id: 'bus-2',
            busName: 'Sona Express',
            busType: 'Non-AC Seater',
            from: searchParams.from,
            to: searchParams.to,
            date: searchParams.date,
            price: 'Rs. 1200.00',
            fare: 1200,
            departureTime: '09:00 PM',
            arrivalTime: '07:30 AM',
            boardingPoint: 'Kalanki',
            droppingPoint: 'Ghantaghar',
            rating: '4.5',
            duration: '10h 30m',
            availableSeats: 12,
            facilities: ['Charging Point', 'Water Bottle']
          },
          {
            id: 'bus-3',
            busName: 'Sona Premium',
            busType: 'AC Seater',
            from: searchParams.from,
            to: searchParams.to,
            date: searchParams.date,
            price: 'Rs. 1350.00',
            fare: 1350,
            departureTime: '07:00 PM',
            arrivalTime: '05:00 AM',
            boardingPoint: 'Koteshwor',
            droppingPoint: 'Birta',
            rating: '4.7',
            duration: '10h',
            availableSeats: 24,
            facilities: ['WiFi', 'Charging Point', 'Water Bottle', 'Snacks']
          }
        ]
      };
    }
  },
  
  /**
   * Book a ticket
   * @param {Object} bookingDetails - Booking details
   * @returns {Promise<Object>} Booking confirmation
   */
  bookTicket: async (bookingDetails) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: createHeaders(true), // Requires auth
      body: JSON.stringify(bookingDetails)
    });
    return handleResponse(response);
  },
  
  /**
   * Get user bookings
   * @returns {Promise<Array>} List of user bookings
   */
  getUserBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/bookings/user`, {
      headers: createHeaders(true) // Requires auth
    });
    return handleResponse(response);
  }
};

export default apiService;
