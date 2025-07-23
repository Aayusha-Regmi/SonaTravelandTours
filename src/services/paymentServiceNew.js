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

  async checkTransactionStatus(merchantTxnId) {
    console.log('Checking transaction status...');
    
    try {
      const url = `${this.baseUrl}/CheckTransactionStatus`;
      
      const requestBody = {
        "MerchantId": "7367",
        "MerchantName": "sonatravelsapi",
        "MerchantTxnId": merchantTxnId,
        "Signature": "de73b4e6a8b496f880b23b8e7055990f61a9d4337dbbf44f3f1edb62321eb43e671a958bd437ccf59cc5c500a13c48d8226e74906357429f5d63fc5635bd4911ed"
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
      return {
        success: true,
        isPaymentSuccessful: this.isPaymentSuccessful(data),
        data: data
      };

    } catch (error) {
      console.error('Error checking transaction status:', error);
      return { success: false, error: error.message, data: null };
    }
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
      console.log('🚀 Starting payment process...');
      
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
