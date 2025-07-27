import apiConfig from './api-config';
import { authenticatedFetch } from './httpInterceptor';
import { getAuthHeaders } from '../utils/authToken';

class PaymentService {
  constructor() {
    this.baseUrl = apiConfig.getBaseUrl();
  }

  async getPaymentInstrumentDetails() {
    
    
    try {
      const url = `${this.baseUrl}/GetPaymentInstrumentDetails`;
      
      const requestBody = {
        "MerchantId": "335",
        "MerchantName": "sonatravelsapi",
        "Signature": "7a611a234fa25b3a54752071d01408119e351fec556e9f193f780e091fc3bfb6ea0cfbee574de27d541e78cd733a6ba1748fd692e6afd0744c14ee2c6ea017b"
      };
      
      const response = await authenticatedFetch(url, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data: data };

    } catch (error) {
      console.error('Error fetching payment instruments:', error);
      return { success: false, error: error.message, data: null };
    }
  }

  async initiatePayment(paymentData) {
   
    
    try {
      const url = `${this.baseUrl}/payment/initiate-payment`;
      
      
      
      const response = await authenticatedFetch(url, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

     
      
      // Check if response has redirect information
      const locationHeader = response.headers.get('location');
      const redirectHeader = response.headers.get('redirect');
   

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      
      // Check if response contains any URL fields that might indicate redirection
      const urlFields = ['npsUrl', 'paymentUrl', 'redirectUrl', 'url', 'gatewayUrl', 'portalUrl'];
      const foundUrls = {};
      urlFields.forEach(field => {
        if (data[field]) {
          foundUrls[field] = data[field];
        }
      });
      
     
      
   
      
  
      
     
      return { success: true, data: data };

    } catch (error) {
     
      return { success: false, error: error.message, data: null };
    }
  }

  /**
   * Check payment status using the /payment/onepg API
   * This is called from HomeCallback with MerchantTxnId and GatewayTxnId
   */
  async checkPaymentOnePg(merchantTxnId, gatewayTxnId) {
   
    
    try {
      // Ensure GatewayTxnId is treated as integer as per API spec
      const gatewayTxnIdInt = parseInt(gatewayTxnId, 10);
      const url = `${this.baseUrl}/payment/onepg?MerchantTxnId=${merchantTxnId}&GatewayTxnId=${gatewayTxnIdInt}`;
      
      
      
      const response = await authenticatedFetch(url, {
        method: 'GET',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        }
      });

     

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.text(); // API returns text/plain response
    

      // Check if payment is successful based on response
      const isSuccessful = result.trim() === 'received' || result.trim() === 'already received';
      
      return {
        success: true,
        isPaymentSuccessful: isSuccessful,
        status: result.trim(),
        data: { status: result.trim(), merchantTxnId, gatewayTxnId: gatewayTxnIdInt }
      };

    } catch (error) {
     
      return { 
        success: false, 
        error: error.message, 
        isPaymentSuccessful: false,
        data: null 
      };
    }
  }

  /**
   * Process seat payment after NPS callback
   * This method is called after user returns from NPS with merchantTxnId and gatewayTxnId
   */
  async processSeatPayment(seatPaymentData) {
   
    
    try {
      const url = `${this.baseUrl}/seat/payment`;
      
      const response = await authenticatedFetch(url, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seatPaymentData)
      });

      

      if (!response.ok) {
        console.error('❌ Seat payment request failed:', response.status, response.statusText);
        
        // Enhanced error debugging for 500 errors
        if (response.status === 500) {
          console.error('🚨 SERVER ERROR DETAILS:');
          console.error('- URL:', response.url);
          console.error('- Request headers sent:', JSON.stringify({...getAuthHeaders(), 'Content-Type': 'application/json'}, null, 2));
          console.error('- Request body sent:', JSON.stringify(seatPaymentData, null, 2));
          
          try {
            const errorText = await response.text();
            console.error('- Server error response:', errorText);
          } catch (e) {
            console.error('- Could not read server error response');
          }
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      

      // Check if the response indicates successful booking
      const isSuccessful = this.isSeatPaymentSuccessful(data);
      
      return {
        success: true,
        isBookingSuccessful: isSuccessful,
        receiptData: data,
        message: data.message || 'Seat payment processed successfully'
      };

    } catch (error) {
    
      return { 
        success: false, 
        error: error.message, 
        receiptData: null 
      };
    }
  }

  /**
   * Complete payment flow after NPS callback
   * This method combines transaction verification and seat booking
   */
  async completePaymentFlow(merchantTxnId, gatewayTxnId, originalPaymentData) {
   
    
    try {
      // Step 1: Check payment status using onepg API
 
      const statusResult = await this.checkPaymentOnePg(merchantTxnId, gatewayTxnId);
      
      if (!statusResult.success) {
       
        return {
          success: false,
          error: 'Failed to verify payment status',
          step: 'status_check',
          details: statusResult.error
        };
      }

      if (!statusResult.isPaymentSuccessful) {
       
        return {
          success: false,
          error: 'Payment was not successful',
          step: 'payment_failed',
          details: statusResult.data
        };
      }

    
      // Step 2: Process seat payment/booking
   
      // Prepare seat payment data with transaction IDs
      const seatPaymentData = {
        ...originalPaymentData,
        merchantTxnId: merchantTxnId,
        gatewayTxnId: gatewayTxnId,
        paymentStatus: 'SUCCESS',
        transactionVerified: true
      };

      const seatResult = await this.processSeatPayment(seatPaymentData);

      if (!seatResult.success) {
        console.error('❌ Seat booking failed:', seatResult.error);
        return {
          success: false,
          error: 'Seat booking failed after successful payment',
          step: 'seat_booking',
          details: seatResult.error,
          paymentData: statusResult.data
        };
      }

     

      return {
        success: true,
        paymentSuccessful: true,
        bookingSuccessful: seatResult.isBookingSuccessful,
        receiptData: seatResult.receiptData,
        transactionData: statusResult.data,
        merchantTxnId: merchantTxnId,
        gatewayTxnId: gatewayTxnId,
        message: 'Payment and booking completed successfully'
      };

    } catch (error) {
      
      return {
        success: false,
        error: error.message,
        step: 'flow_error',
        details: error.stack
      };
    }
  }

  /**
   * Check if seat payment/booking was successful
   */
  isSeatPaymentSuccessful(responseData) {
    // Check various success indicators
    if (responseData.success === true) return true;
    if (responseData.statusCode === 200) return true;
    if (responseData.message && responseData.message.includes('Successfully')) return true;
    if (responseData.data && responseData.data.status === 'success') return true;
    if (responseData.paymentMessage && responseData.paymentMessage.includes('Successfully')) return true;
    
    return false;
  }

  

  async processPayment(paymentData) {
    try {
     
      
      // Step 1: Initiate payment
      const initiateResult = await this.initiatePayment(paymentData);
      
      if (!initiateResult.success) {
        console.error('❌ Payment initiation failed:', initiateResult.error);
        return { success: false, error: initiateResult.error, step: 'initiate' };
      }

      

      // Payment initiated successfully - browser will be redirected automatically
      if (initiateResult.success && initiateResult.data) {
        
        
        const responseData = initiateResult.data;
        
        // Since the API redirects automatically, we just return success
      
        
        return {
          success: true,
          autoRedirect: true,
          message: 'Payment initiated successfully. Redirecting to NPS portal...',
          data: {
            initiate: responseData,
            merchantTxnId: responseData.merchantTransactionId || responseData.merchantId,
            processId: responseData.processId
          }
        };
        
      } else {
        console.error('❌ Payment initiation was not successful');
        return { 
          success: false, 
          error: 'Payment initiation was not successful', 
          step: 'initiate_verification' 
        };
      }

      
    } catch (error) {
      
      return { success: false, error: error.message, step: 'flow' };
    }
  }

  isPaymentSuccessful(responseData) {
    if (responseData.success === true) return true;
    if (responseData.status === 'SUCCESS' || responseData.status === 'COMPLETED') return true;
    if (responseData.paymentStatus === 'SUCCESS') return true;
    if (responseData.transactionStatus === 'SUCCESS') return true;
    return false;
  }

  // Note: This method is for manual redirects only
  // The initiate-payment API handles automatic redirection
  async redirectToNPSPortal(npsUrl) {
   
    
    try {
      // For web applications, redirect the browser
      if (typeof window !== 'undefined') {
        
        window.location.href = npsUrl;
      } else {
        
        return { success: true, redirectUrl: npsUrl, message: 'Redirect required' };
      }
      
      return { success: true, redirected: true };
      
    } catch (error) {
      
      return { success: false, error: error.message };
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getPaymentMethodDisplayName(code) {
    const names = {
      'CARD': 'Credit/Debit Card',
      'WALLET': 'Digital Wallet',
      'MOBILE': 'Mobile Banking',
      'INTERNET': 'Internet Banking',
      'NMB': 'NMB Bank',
      'ESEWA': 'eSewa',
      'KHALTI': 'Khalti'
    };
    return names[code] || code;
  }

  /**
   * Process payment callback from NPS gateway
   * Extracts query parameters directly from NPS callback response
   */
  async processPaymentCallback() {
    
    
    try {
      // Import URL utilities
      const { extractPaymentParams } = await import('../utils/urlUtils');
      
      // Extract payment parameters from current URL (NPS callback)
      const paymentParams = extractPaymentParams();
      
      if (!paymentParams.isValid) {
        throw new Error('Invalid NPS callback - missing required parameters');
      }
      
      
      
      // Process the callback data directly from NPS
      // No need to call backend API - NPS provides all the needed data
      const receiptData = {
        // Transaction details
        merchantTxnId: paymentParams.merchantTxnId,
        gatewayTxnId: paymentParams.gatewayTxnId,
        transactionId: paymentParams.merchantTxnId,
        gatewayTransactionId: paymentParams.gatewayTxnId,
        
        // Payment status and details
        status: paymentParams.status,
        amount: paymentParams.amount,
        totalAmount: paymentParams.amount,
        message: paymentParams.message,
        paymentMethod: 'NPS Gateway',
        
        // Timestamps
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        
        // Retrieve booking details from localStorage (if stored during payment initiation)
        ...this.getStoredBookingDetails()
      };
      
      
      
      return {
        success: true,
        data: receiptData,
        isPaymentSuccessful: this.isNPSPaymentSuccessful(paymentParams.status),
        message: paymentParams.message || 'Payment callback processed successfully'
      };
      
    } catch (error) {
     
      return {
        success: false,
        message: error.message || 'Failed to process NPS payment callback',
        error: error
      };
    }
  }

  /**
   * Check if NPS payment was successful based on status
   */
  isNPSPaymentSuccessful(status) {
    if (!status) return false;
    
    const successStatuses = ['success', 'completed', 'SUCCESS', 'COMPLETED', 'SUCCESSFUL'];
    return successStatuses.includes(status);
  }

  /**
   * Retrieve stored booking details from localStorage or sessionStorage
   * These should be stored during payment initiation
   */
  getStoredBookingDetails() {
    try {
      // Check both localStorage and sessionStorage for booking data
      let storedData = localStorage.getItem('currentBookingData') || 
                     sessionStorage.getItem('pendingBooking') ||
                     localStorage.getItem('redirectAfterLogin');
      
      if (storedData) {
        const bookingData = JSON.parse(storedData);
        
        
        // Handle different storage formats
        let processedData = {};
        
        if (bookingData.state) {
          // Data from redirectAfterLogin
          processedData = bookingData.state;
        } else {
          // Direct booking data
          processedData = bookingData;
        }
        
        const result = {
          bookingDetails: {
            route: processedData.searchParams ? {
              from: processedData.searchParams.from,
              to: processedData.searchParams.to
            } : processedData.route,
            departureDate: processedData.travelDate,
            seats: Array.isArray(processedData.selectedSeats) ? processedData.selectedSeats : [],
            passengers: processedData.passengers?.length || (Array.isArray(processedData.passengers) ? processedData.passengers.length : 0)
          },
          fareBreakdown: {
            baseFare: processedData.seatPrice * (processedData.selectedSeats?.length || 0),
            vat: processedData.seatPrice * 0.13 * (processedData.selectedSeats?.length || 0),
            serviceFee: 0
          },
          customerDetails: processedData.passengers?.[0] ? {
            name: processedData.passengers[0].name,
            email: processedData.passengers[0].email,
            phone: processedData.passengers[0].phone
          } : (processedData.bookingDetails?.contactInfo || {}),
          tripType: processedData.tripType || 'oneWay'
        };
        
       
        return result;
      }
    } catch (error) {
      console.warn(' Could not retrieve stored booking details:', error);
    }
    
    return {};
  }

  sanitizeLogData(data) {
    const sanitized = { ...data };
    
    if (sanitized.seatInfo?.passengersList) {
      sanitized.seatInfo.passengersList = `[${sanitized.seatInfo.passengersList.length} passengers]`;
    }
    
    if (sanitized.amount) {
      sanitized.amount = `NPR ${sanitized.amount}`;
    }
    
    return sanitized;
  }
}

export default new PaymentService();

// Export individual methods for direct use
export const processPaymentCallback = async () => {
  const paymentService = new PaymentService();
  return await paymentService.processPaymentCallback();
};
