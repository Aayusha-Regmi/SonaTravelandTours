# Payment Gateway Setup Guide

## Environment Variables Required

Create a `.env` file in your project root with the following variables:

```bash
# API Configuration
VITE_API_BASE_URL=https://your-api-base-url.com
VITE_API_VERSION=prod

# Authentication Endpoints
VITE_AUTH_API_BASE_URL=https://your-auth-api-url.com
VITE_AUTH_LOGIN_ENDPOINT=/prod/login
VITE_AUTH_REGISTER_ENDPOINT=/prod/register
VITE_AUTH_SEND_OTP_ENDPOINT=/prod/otp
VITE_AUTH_VERIFY_OTP_ENDPOINT=/prod/otp/verify
VITE_AUTH_RESEND_OTP_ENDPOINT=/prod/resend-otp

# Bus Search Endpoints
VITE_BUS_SEARCH_ENDPOINT=/prod/bus/search
VITE_BUS_SEAT_DETAILS_ENDPOINT=/prod/seat

# App Configuration
VITE_APP_NAME=Sona Travel & Tours
VITE_APP_VERSION=1.0.0
```

## Payment Gateway API Endpoints

The payment gateway integration uses the following API endpoints (all relative to `VITE_API_BASE_URL`):

1. **Initiate Payment**: `POST /payment/initiate-payment`
2. **Get Payment Instruments**: `GET /payment/get-all-payment-instruments`  
3. **Get Service Charge**: `POST /payment/get-service-charge`
4. **Generate QR Code**: `POST /payment/qr/generate`
5. **Check Payment Status**: `POST /payment/qr/check-payment`

## Setup Instructions

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `VITE_API_BASE_URL` with your actual API server URL

3. Ensure your backend API server supports all the payment gateway endpoints listed above

4. Start your development server:
   ```bash
   npm run dev
   ```

## Testing the Payment Gateway

1. Navigate to the bus search page
2. Select a bus and seats
3. Fill in passenger details
4. Go to the payment page
5. Select a payment method
6. Click "Go to payment gateway"
7. The payment modal will open with the 5-step process:
   - Payment initiation
   - Payment instrument selection
   - Service charge calculation
   - QR code generation
   - Payment verification

## API Response Formats

### Initiate Payment Response
```json
{
  "merchantId": "7367",
  "merchantName": "sonatravelapi",
  "amount": 2600,
  "merchantTransactionId": "xxxxxxxx",
  "processId": "xxxxxxxx"
}
```

### Payment Instruments Response
```json
[
  {
    "instrumentCode": "IMEPAYG",
    "name": "IME Pay",
    "logoUrl": "https://..."
  }
]
```

### Service Charge Response
```json
{
  "serviceCharge": 10
}
```

### QR Generate Response
```json
{
  "qrMessage": "base64-encoded-qr-image",
  "thirdpartyQrWebSocketUrl": "wss://...",
  "prn": "prn-xxxx"
}
```

### Payment Status Response
```json
{
  "paymentStatus": "success"
}
```

## Features Implemented

✅ **Step 1**: Payment initiation with amount
✅ **Step 2**: Fetch available payment instruments (digital wallets/banks)
✅ **Step 3**: Calculate service charge based on selected instrument
✅ **Step 4**: Generate QR code for payment
✅ **Step 5**: WebSocket listening for real-time payment updates
✅ **Step 6**: Payment confirmation and booking completion
✅ **Additional**: Success modal with booking details
✅ **Additional**: Error handling and user feedback
✅ **Additional**: Dynamic fare calculation
✅ **Additional**: Booking data persistence

## Components Added/Modified

- ✅ **PaymentModal.jsx** - Complete payment gateway flow
- ✅ **PaymentPage.jsx** - Integration with payment modal
- ✅ **BookingSuccessModal.jsx** - Post-payment confirmation
- ✅ **api.js** - All payment gateway API functions
- ✅ **Dynamic pricing** - Replaces hardcoded amounts

The payment gateway is fully integrated and ready for testing!
