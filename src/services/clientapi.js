// // API Service for handling all backend communication
// import apiConfig from './api-config';

// const API_BASE_URL = apiConfig.getBaseUrl();

// /**
//  * Get the authentication token from localStorage
//  * @returns {string|null} The auth token or null if not found
//  */
// const getAuthToken = () => {
//   return localStorage.getItem('authToken');
// };

// /**
//  * Create headers object with optional authentication
//  * @param {boolean} includeAuth - Whether to include auth token in headers
//  * @returns {Object} Headers object
//  */
// const createHeaders = (includeAuth = true) => {
//   const headers = {
//     'Content-Type': 'application/json'
//   };

//   if (includeAuth) {
//     const token = getAuthToken();
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }
//   }

//   return headers;
// };

// /**
//  * Handle API responses and errors consistently
//  * @param {Response} response - Fetch Response object
//  * @returns {Promise<any>} Parsed response data
//  */
// const handleResponse = async (response) => {
//   if (!response.ok) {
//     // Try to get error details from response
//     let errorMessage;
//     try {
//       const errorData = await response.json();
//       errorMessage = errorData.message || errorData.error || `API error: ${response.status}`;
//     } catch (e) {
//       errorMessage = `API error: ${response.status} ${response.statusText}`;
//     }
//     throw new Error(errorMessage);
//   }
  
//   return response.json();
// };

// /**
//  * API Services object
//  */
// const apiService = {
//   /**
//    * Get available routes
//    * @returns {Promise<Array>} List of routes
//    */  getRoutes: async () => {
//     try {
//       const response = await fetch(apiConfig.buildUrl(apiConfig.endpoints.routes.list), {
//         headers: createHeaders(false) // Public endpoint, no auth needed
//       });
//       return handleResponse(response);
//     } catch (error) {
//       console.error('Failed to fetch routes:', error);
      
//       // Return fallback data in case of error
//       return [
//         { id: 1, name: 'Kathmandu', code: 'KTM' },
//         { id: 2, name: 'Pokhara', code: 'PKR' },
//         { id: 3, name: 'Birgunj', code: 'BRG' },
//         { id: 4, name: 'Biratnagar', code: 'BRT' },
//         { id: 5, name: 'Nepalgunj', code: 'NPG' }
//       ];
//     }
//   },
//     /**
//    * Search for bus routes
//    * @param {Object} searchParams - Search parameters
//    * @returns {Promise<Object>} Search results
//    */  searchBusRoutes: async (searchParams) => {
//     try {
//       // Format request body according to API documentation
//       const requestBody = {
//         source: searchParams.from,
//         destination: searchParams.to,
//         date: searchParams.date
//       };
      
//       // Add optional parameters if they exist
//       if (searchParams.tripType === 'twoWay' && searchParams.returnDate) {
//         requestBody.returnDate = searchParams.returnDate;
//       }
      
//       console.log('Sending bus search request:', requestBody);
      
//       const response = await fetch(apiConfig.buildUrl(apiConfig.endpoints.bus.search), {
//         method: 'POST',
//         headers: createHeaders(false), // Public endpoint, no auth needed
//         body: JSON.stringify(requestBody)
//       });
      
//       const responseData = await handleResponse(response);
//       console.log('Bus search response:', responseData);
      
//       // Handle various response formats from API
//       if (responseData.data) {
//         return responseData; // Standard format: { success, message, data: [...] }
//       } else if (responseData.results) {
//         return { success: true, message: "Buses found", data: responseData.results }; // Format with results array
//       } else if (Array.isArray(responseData)) {
//         return { success: true, message: "Buses found", data: responseData }; // Direct array response
//       } else {
//         return { success: false, message: "No buses found", data: [] }; 
//       }
//     } catch (error) {
//       console.error('Failed to search routes:', error);
      
//       // Return fallback data in case of error based on API documentation format
//       return {
//         statusCode: 200,
//         success: true,
//         message: "Buses found (fallback data)",
//         data: [
//           {
//     id: 'bus-001',
//     busName: 'Sona Travels -1708',
//     busType: 'Deluxe A/C',
//     departureTime: '06:30',
//     arrivalTime: '12:45',
//     boardingPoint: 'New Bus Park, Kathmandu',
//     droppingPoint: 'Adarsha Nagar, Birgunj',
//     duration: '6h 15m',
//     fare: 1250,
//     rating: '4.8',
//     availableSeats: 22,
//     facilities: ['OLED OnePlus 42" TV', 'Full A/C & Air Suspension', 'Multi-zone A/C', 'CCTV Surveillance'],
//   },
//   {
//     id: 'bus-002',
//     busName: 'Sona Travels Super -1705',
//     busType: 'Super Deluxe',
//     departureTime: '08:00',
//     arrivalTime: '14:30',
//     boardingPoint: 'Kalanki, Kathmandu',
//     droppingPoint: 'Ghantaghar, Birgunj',
//     duration: '6h 30m',
//     fare: 1450,
//     rating: '4.5',
//     availableSeats: 15,
//     facilities: ['Navigation system', 'Full A/C & Air Suspension', 'Heated front seats', 'CCTV Surveillance', 'Sony Dolby Digital system'],
//   },
//   {
//     id: 'bus-003',
//     busName: 'Sona Travels Tourist -1701',
//     busType: 'Tourist',
//     departureTime: '10:15',
//     arrivalTime: '16:30',
//     boardingPoint: 'Balkhu, Kathmandu',
//     droppingPoint: 'Birta, Birgunj',
//     duration: '6h 15m',
//     fare: 950,
//     rating: '3.7',
//     availableSeats: 8,
//     facilities: ['Multi-zone A/C', 'CCTV Surveillance'],
//   },
//   {
//     id: 'bus-004',
//     busName: 'Sona Travels -1709',
//     busType: 'AC',
//     departureTime: '12:30',
//     arrivalTime: '19:00',
//     boardingPoint: 'Koteshwor, Kathmandu',
//     droppingPoint: 'Powerhouse, Birgunj',
//     duration: '6h 30m',
//     fare: 1100,
//     rating: '4.2',
//     availableSeats: 19,
//     facilities: ['Full A/C & Air Suspension', 'Navigation system', 'OLED OnePlus 42" TV'],
//   },
//   {
//     id: 'bus-005',
//     busName: 'Sona Travels Luxury -1721',
//     busType: 'Luxury',
//     departureTime: '15:45',
//     arrivalTime: '21:45',
//     boardingPoint: 'New Bus Park, Kathmandu',
//     droppingPoint: 'Rangeli, Birgunj',
//     duration: '6h',
//     fare: 1850,
//     rating: '4.9',
//     availableSeats: 12,
//     facilities: ['OLED OnePlus 42" TV', 'Navigation system', 'Full A/C & Air Suspension', 'Multi-zone A/C', 'Heated front seats', 'CCTV Surveillance', 'Sony Dolby Digital system'],
//   },
//   {
//     id: 'bus-006',
//     busName: 'Sona Travels Express -1806',
//     busType: 'Deluxe A/C',
//     departureTime: '17:30',
//     arrivalTime: '23:45',
//     boardingPoint: 'Chabahil, Kathmandu',
//     droppingPoint: 'Adarsha Nagar, Birgunj',
//     duration: '6h 15m',
//     fare: 1250,
//     rating: '4.3',
//     availableSeats: 16,
//     facilities: ['Full A/C & Air Suspension', 'OLED OnePlus 42" TV', 'Multi-zone A/C', 'Sony Dolby Digital system'],
//   },
//   {
//     id: 'bus-007',
//     busName: 'Sona Travels -1701',
//     busType: 'Super Deluxe',
//     departureTime: '19:00',
//     arrivalTime: '01:15',
//     boardingPoint: 'New Bus Park, Kathmandu',
//     droppingPoint: 'Ghantaghar, Birgunj',
//     duration: '6h 15m',
//     fare: 1350,
//     rating: '4.6',
//     availableSeats: 14,
//     facilities: ['Navigation system', 'Full A/C & Air Suspension', 'Heated front seats', 'Sony Dolby Digital system'],
//   },
//   {
//     id: 'bus-008',
//     busName: 'Highway Express -1902',
//     busType: 'Tourist',
//     departureTime: '22:30',
//     arrivalTime: '04:45',
//     boardingPoint: 'Kalanki, Kathmandu',
//     droppingPoint: 'Birta, Birgunj',
//     duration: '6h 15m',
//     fare: 950,
//     rating: '3.8',
//     availableSeats: 22,
//     facilities: ['CCTV Surveillance', 'Multi-zone A/C'],
//   }
//         ]
//       };
//     }
//   },
  
//   /**
//    * Book a ticket
//    * @param {Object} bookingDetails - Booking details
//    * @returns {Promise<Object>} Booking confirmation
//    */  bookTicket: async (bookingDetails) => {
//     const response = await fetch(apiConfig.buildUrl(apiConfig.endpoints.booking.create), {
//       method: 'POST',
//       headers: createHeaders(true), // Requires auth
//       body: JSON.stringify(bookingDetails)
//     });
//     return handleResponse(response);
//   },
  
//   /**
//    * Get user bookings
//    * @returns {Promise<Array>} List of user bookings
//    */  getUserBookings: async () => {
//     const response = await fetch(apiConfig.buildUrl(apiConfig.endpoints.booking.list), {
//       headers: createHeaders(true) // Requires auth
//     });
//     return handleResponse(response);
//   }
// };

// export default apiService;
