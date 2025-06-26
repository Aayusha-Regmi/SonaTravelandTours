# Backend API Setup for FonePay Integration

## Required Backend Endpoints

To fix the CORS issues with FonePay, your backend needs to implement these proxy endpoints:

### 1. FonePay QR Generation Proxy

**Endpoint**: `POST /payment/fonepay/qr-generate`

**Purpose**: Proxy the FonePay QR generation API to avoid CORS issues

**Request Body**:
```json
{
  "amount": 10,
  "remarks1": "sona-test",
  "remarks2": "sona-chalyo-ra",
  "prn": "prn-15dc8cc0-41bb-11ef-8b90-db97b4841119",
  "merchantCode": "0012345076",
  "dataValidation": "a66a0088c21d87c43aed67bed19aeccc8f32673399976adb1c64007c999f8acc19a052c3a8c0b815c96b8827831c6800eae69686d8857885faa42685d7fab1ff",
  "username": "SONATRAVELANDTOURSPVTLTD",
  "password": "Sona@2024"
}
```

**Backend Implementation (Node.js/Express example)**:
```javascript
app.post('/payment/fonepay/qr-generate', async (req, res) => {
  try {
    const response = await fetch('https://fonepay-api-url.com/api/merchant/merchantDetailsForThirdParty/thirdPartyDynamicQrDownload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 2. FonePay Status Check Proxy

**Endpoint**: `POST /payment/fonepay/check-status`

**Purpose**: Proxy the FonePay status check API

**Request Body**:
```json
{
  "prn": "prn-15dc8cc0-41bb-11ef-8b90-db97b4841119",
  "merchantCode": "0012345076",
  "dataValidation": "cc3ec18d77af04adafead9c7822d72a1cf35367a2e2390c27a402c27ab87bd874665019b551adcef486e71b817cfd95d11b62a4e027dd246551b7ca6afc0afe0",
  "username": "SONATRAVELANDTOURSPVTLTD",
  "password": "Sona@2024"
}
```

**Backend Implementation**:
```javascript
app.post('/payment/fonepay/check-status', async (req, res) => {
  try {
    const response = await fetch('https://fonepay-api-url.com/api/merchant/merchantDetailsForThirdParty/thirdPartyDynamicQrGetStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Alternative Solution: Add CORS Headers

If you have access to your backend server configuration, you can add CORS headers:

```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

## Current Fallback Behavior

Until the backend proxy is implemented, the frontend will:

1. ✅ **Try to call the proxy endpoints first**
2. ✅ **Fall back to test/demo mode if APIs fail**
3. ✅ **Show appropriate user messages**
4. ✅ **Allow testing of the payment flow**

## Testing the Integration

1. **With Backend Proxy**: Real FonePay QR codes will be generated
2. **Without Backend Proxy**: Demo mode with test QR codes
3. **Payment Status**: Polling every 3 seconds for status updates

## Security Considerations

- Keep FonePay credentials secure in backend environment variables
- Implement proper authentication for proxy endpoints
- Validate request data before forwarding to FonePay
- Log all payment transactions for audit purposes

## Implementation Priority

1. **High Priority**: Set up proxy endpoints in your backend
2. **Medium Priority**: Implement proper hash generation for dataValidation
3. **Low Priority**: Add webhook support for real-time status updates

The frontend is now ready to work with both scenarios - with or without the backend proxy implementation.
