import apiConfig from './api-config';
import { authenticatedFetch } from './httpInterceptor';
import { getAuthHeaders } from '../utils/authToken';

class PaymentService {
  constructor() {
    this.baseUrl = apiConfig.getBaseUrl();
  }

  async getPaymentInstrumentDetails() {
    console.log('Getting payment instruments...');
    
    try {
      const url = `${this.baseUrl}/GetPaymentInstrumentDetails`;
      
      const requestBody = {
        "MerchantId": "7367",
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
    console.log('🚀 Initiating payment...');
    console.log('📤 REQUEST DATA:');
    console.log('🌐 URL:', `${this.baseUrl}/payment/initiate-payment`);
    console.log('📋 Headers:', {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    });
    console.log('📦 Payload:', JSON.stringify(paymentData, null, 2));
    console.log('🔄 Note: API should redirect browser to NPS portal automatically');
    
    try {
      const url = `${this.baseUrl}/payment/initiate-payment`;
      
      console.log('⏳ Making request to initiate-payment...');
      
      const response = await authenticatedFetch(url, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      console.log('📥 RESPONSE STATUS:', response.status, response.statusText);
      console.log('📥 RESPONSE HEADERS:', Object.fromEntries(response.headers.entries()));
      
      // Check if response has redirect information
      const locationHeader = response.headers.get('location');
      const redirectHeader = response.headers.get('redirect');
      if (locationHeader) {
        console.log('🔗 Location header found:', locationHeader);
      }
      if (redirectHeader) {
        console.log('🔗 Redirect header found:', redirectHeader);
      }

      if (!response.ok) {
        console.error('❌ Response not OK:', response.status, response.statusText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📥 RESPONSE DATA:');
      console.log(JSON.stringify(data, null, 2));
      
      // Check if response contains any URL fields that might indicate redirection
      const urlFields = ['npsUrl', 'paymentUrl', 'redirectUrl', 'url', 'gatewayUrl', 'portalUrl'];
      const foundUrls = {};
      urlFields.forEach(field => {
        if (data[field]) {
          foundUrls[field] = data[field];
        }
      });
      
      if (Object.keys(foundUrls).length > 0) {
        console.log('🔗 URL fields found in response:', foundUrls);
      } else {
        console.log('⚠️ No URL fields found in response');
      }
      
      // Check response type and browser behavior
      console.log('🌐 Browser location before:', window?.location?.href || 'N/A (server-side)');
      
      // Add a small delay to see if redirect happens
      setTimeout(() => {
        console.log('🌐 Browser location after 2s:', window?.location?.href || 'N/A (server-side)');
      }, 2000);
      
      console.log('✅ Payment initiated - checking if browser redirected...');
      
      return { success: true, data: data };

    } catch (error) {
      console.error('❌ Error initiating payment:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack
      });
      return { success: false, error: error.message, data: null };
    }
  }

  /**
   * Check payment status using the /payment/onepg API
   * This is called from HomeCallback with MerchantTxnId and GatewayTxnId
   */
  async checkPaymentOnePg(merchantTxnId, gatewayTxnId) {
    console.log('🔍 Checking payment status with /payment/onepg API...');
    console.log('📤 API Parameters:', { merchantTxnId, gatewayTxnId });
    
    try {
      // Ensure GatewayTxnId is treated as integer as per API spec
      const gatewayTxnIdInt = parseInt(gatewayTxnId, 10);
      const url = `${this.baseUrl}/payment/onepg?MerchantTxnId=${merchantTxnId}&GatewayTxnId=${gatewayTxnIdInt}`;
      
      console.log('🌐 URL:', url);
      console.log('📋 Headers:', {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      });
      
      const response = await authenticatedFetch(url, {
        method: 'GET',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        }
      });

      console.log('📥 Response Status:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.text(); // API returns text/plain response
      console.log(' RESPONSE TEXT:', result);

      // Check if payment is successful based on response
      const isSuccessful = result.trim() === 'received' || result.trim() === 'already received';
      
      return {
        success: true,
        isPaymentSuccessful: isSuccessful,
        status: result.trim(),
        data: { status: result.trim(), merchantTxnId, gatewayTxnId: gatewayTxnIdInt }
      };

    } catch (error) {
      console.error(' Error checking payment onepg:', error);
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
    console.log('🎫 Processing seat payment...');
    console.log('📤 REQUEST DATA:');
    console.log('🌐 URL:', `${this.baseUrl}/seat/payment`);
    console.log('📋 Headers:', {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    });
    console.log('📦 Payload:', JSON.stringify(seatPaymentData, null, 2));
    
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

      console.log('📥 RESPONSE STATUS:', response.status, response.statusText);

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
      console.log('📥 SEAT PAYMENT RESPONSE:');
      console.log(JSON.stringify(data, null, 2));

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
    console.log('🔄 Completing payment flow...');
    console.log('📋 Parameters:', { merchantTxnId, gatewayTxnId });
    
    try {
      // Step 1: Check payment status using onepg API
      console.log('📊 Step 1: Checking payment status with onepg...');
      const statusResult = await this.checkPaymentOnePg(merchantTxnId, gatewayTxnId);
      
      if (!statusResult.success) {
        console.error('❌ Payment status check failed:', statusResult.error);
        return {
          success: false,
          error: 'Failed to verify payment status',
          step: 'status_check',
          details: statusResult.error
        };
      }

      if (!statusResult.isPaymentSuccessful) {
        console.log('❌ Payment was not successful according to onepg');
        return {
          success: false,
          error: 'Payment was not successful',
          step: 'payment_failed',
          details: statusResult.data
        };
      }

      console.log('✅ Payment verified as successful with onepg');

      // Step 2: Process seat payment/booking
      console.log('🎫 Step 2: Processing seat booking...');
      
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

      console.log('✅ Payment flow completed successfully');

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
      console.error('❌ Complete payment flow failed:', error);
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

  // COMMENTED OUT - OnePG functionality on hold
  /*
  async checkPaymentStatusOnePG(merchantTxnId, gatewayTxnId) {
    console.log('🔍 Checking payment status via OnePG API...');
    console.log('📊 Parameters:', { merchantTxnId, gatewayTxnId });
    
    try {
      // Construct URL with query parameters for OnePG endpoint
      const url = `${this.baseUrl}/payment/onepg?MerchantTxnId=${encodeURIComponent(merchantTxnId)}&GatewayTxnId=${encodeURIComponent(gatewayTxnId)}`;
      console.log('🌐 OnePG URL:', url);
      
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

      const data = await response.json();
      console.log(' OnePG Response:', data);
      
      return {
        success: true,
        isPaymentSuccessful: this.isPaymentSuccessful(data),
        data: data
      };

    } catch (error) {
      console.error(' Error checking OnePG status:', error);
      return { success: false, error: error.message, data: null };
    }
  }

  async pollPaymentStatusOnePG(merchantTxnId, gatewayTxnId, maxAttempts = 30, intervalMs = 10000) {
    console.log(' Starting OnePG payment status polling...');
    console.log(' Polling config:', { maxAttempts, intervalMs });
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`🔍 OnePG polling attempt ${attempt}/${maxAttempts}...`);
      
      try {
        const statusResult = await this.checkPaymentStatusOnePG(merchantTxnId, gatewayTxnId);
        
        if (!statusResult.success) {
          console.warn(` OnePG check failed on attempt ${attempt}:`, statusResult.error);
          
          // Continue polling on network errors
          if (attempt < maxAttempts) {
            console.log(` Retrying in ${intervalMs/1000} seconds...`);
            await this.delay(intervalMs);
            continue;
          } else {
            return { success: false, error: statusResult.error, step: 'polling_failed' };
          }
        }

        const statusData = statusResult.data;
        
        // Check for successful payment
        if (statusData && (
          statusData.status === 'SUCCESS' || 
          statusData.paymentStatus === 'SUCCESS' || 
          statusData === 'already received' ||
          statusResult.isPaymentSuccessful
        )) {
          console.log('✅ Payment confirmed as successful via OnePG!');
          return {
            success: true,
            paymentSuccessful: true,
            data: statusData,
            attempts: attempt
          };
        }
        
        // Check for failed payment
        if (statusData && (
          statusData.status === 'FAILED' || 
          statusData.paymentStatus === 'FAILED'
        )) {
          console.log('❌ Payment confirmed as failed via OnePG');
          return {
            success: true,
            paymentSuccessful: false,
            data: statusData,
            attempts: attempt
          };
        }
        
        // Payment still pending
        console.log('⏳ Payment still pending, continuing to poll...');
        
        if (attempt < maxAttempts) {
          await this.delay(intervalMs);
        }
        
      } catch (error) {
        console.error(`❌ OnePG polling error on attempt ${attempt}:`, error);
        
        if (attempt < maxAttempts) {
          console.log(`🔄 Retrying in ${intervalMs/1000} seconds...`);
          await this.delay(intervalMs);
        } else {
          return { success: false, error: error.message, step: 'polling_error' };
        }
      }
    }
    
    console.log('⏰ OnePG polling timeout reached');
    return { 
      success: false, 
      error: 'Payment status polling timeout', 
      step: 'polling_timeout',
      attempts: maxAttempts
    };
  }
  */

  async processPayment(paymentData) {
    try {
     
      
      // Step 1: Initiate payment
      const initiateResult = await this.initiatePayment(paymentData);
      
      if (!initiateResult.success) {
        console.error('❌ Payment initiation failed:', initiateResult.error);
        return { success: false, error: initiateResult.error, step: 'initiate' };
      }

      console.log('✅ Payment initiated successfully:', initiateResult.data);

      // Payment initiated successfully - browser will be redirected automatically
      if (initiateResult.success && initiateResult.data) {
        console.log('🎯 Payment initiation successful - browser should redirect to NPS portal automatically');
        
        const responseData = initiateResult.data;
        
        // Since the API redirects automatically, we just return success
        console.log('✅ Payment initiation completed');
        console.log('🔄 User will be redirected to NPS portal for payment');
        
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

      // COMMENTED OUT - OnePG related unreachable code
      /*
      const merchantTxnId = initiateResult.data?.merchantTransactionId || initiateResult.data?.merchantId || initiateResult.data?.transactionId;
      const gatewayTxnId = initiateResult.data?.processId || initiateResult.data?.gatewayTxnId;
      
      if (!merchantTxnId || !gatewayTxnId) {
        console.error('❌ Missing transaction IDs:', { merchantTxnId, gatewayTxnId });
        return { success: false, error: 'Missing transaction IDs from payment initiation', step: 'initiate' };
      }

      console.log('📋 Transaction IDs:', { merchantTxnId, gatewayTxnId });

      // Step 2: Wait a moment before starting polling
      console.log('⏳ Waiting before starting OnePG status polling...');
      await this.delay(5000);
      
      // Step 3: Poll payment status using OnePG
      console.log('� Starting OnePG status polling...');
      const statusResult = await this.pollPaymentStatusOnePG(merchantTxnId, gatewayTxnId);
      
      if (!statusResult.success) {
        console.error('❌ OnePG status polling failed:', statusResult.error);
        return { success: false, error: statusResult.error, step: 'onepg_polling_failed' };
      }

      console.log('📊 OnePG polling result:', statusResult);

      return {
        success: true,
        paymentSuccessful: statusResult.paymentSuccessful,
        data: { 
          initiate: initiateResult.data, 
          onepgStatus: statusResult.data,
          merchantTxnId,
          gatewayTxnId,
          pollingAttempts: statusResult.attempts
        }
      };
      */

    } catch (error) {
      console.error('❌ Payment flow failed:', error);
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
    console.log('🌐 Manual redirect to NPS Portal:', npsUrl);
    console.log('⚠️  Note: initiate-payment API should handle redirection automatically');
    
    try {
      // For web applications, redirect the browser
      if (typeof window !== 'undefined') {
        console.log('🔄 Browser redirect initiated...');
        window.location.href = npsUrl;
      } else {
        console.log('🔄 Server-side redirect requested for:', npsUrl);
        return { success: true, redirectUrl: npsUrl, message: 'Redirect required' };
      }
      
      return { success: true, redirected: true };
      
    } catch (error) {
      console.error('❌ Error redirecting to NPS portal:', error);
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
    console.log('🎯 Processing NPS payment callback...');
    
    try {
      // Import URL utilities
      const { extractPaymentParams } = await import('../utils/urlUtils');
      
      // Extract payment parameters from current URL (NPS callback)
      const paymentParams = extractPaymentParams();
      
      if (!paymentParams.isValid) {
        throw new Error('Invalid NPS callback - missing required parameters');
      }
      
      console.log('📥 NPS callback params:', {
        merchantTxnId: paymentParams.merchantTxnId,
        gatewayTxnId: paymentParams.gatewayTxnId,
        status: paymentParams.status,
        amount: paymentParams.amount,
        message: paymentParams.message
      });
      
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
      
      console.log('✅ NPS callback processed successfully');
      console.log('📋 Receipt data prepared:', receiptData);
      
      return {
        success: true,
        data: receiptData,
        isPaymentSuccessful: this.isNPSPaymentSuccessful(paymentParams.status),
        message: paymentParams.message || 'Payment callback processed successfully'
      };
      
    } catch (error) {
      console.error('❌ NPS callback processing error:', error);
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
        console.log('📦 Retrieved stored booking details from storage');
        
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
        
        console.log('✅ Processed booking details:', result);
        return result;
      }
    } catch (error) {
      console.warn('⚠️ Could not retrieve stored booking details:', error);
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
