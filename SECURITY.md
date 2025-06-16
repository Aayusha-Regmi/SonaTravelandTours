# Environment Variables and Security Guide

## Overview
This project uses environment variables to securely manage API endpoints and configuration settings. This approach provides better security, flexibility, and maintainability.

## Environment Variables

### Setup
1. Copy `.env.example` to `.env`
2. Update the values in `.env` with your actual API endpoints
3. Never commit `.env` to version control (it's already in `.gitignore`)

### Available Variables

#### API Configuration
- `VITE_API_BASE_URL` - Base URL for your API Gateway
- `VITE_API_VERSION` - API version (e.g., 'dev', 'v1', 'v2')

#### Authentication Endpoints
- `VITE_AUTH_LOGIN_ENDPOINT` - Login endpoint path
- `VITE_AUTH_REGISTER_ENDPOINT` - Registration endpoint path
- `VITE_AUTH_VERIFY_OTP_ENDPOINT` - OTP verification endpoint path
- `VITE_AUTH_RESEND_OTP_ENDPOINT` - Resend OTP endpoint path

#### App Configuration
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version

## Security Benefits

### 1. **Environment Separation**
- Different environments (dev, staging, prod) can use different API endpoints
- Easy to switch between local development and production APIs

### 2. **Secret Management**
- API keys and sensitive URLs are not hardcoded in source code
- Reduces risk of accidental exposure in version control

### 3. **Configuration Flexibility**
- Easy to update API endpoints without code changes
- Team members can use different local configurations

### 4. **Build-time Security**
- Vite only includes environment variables prefixed with `VITE_`
- Server-side secrets can be kept separate from client-side config

## Usage in Code

### Import API Configuration
```javascript
import { API_URLS } from '../../config/api';

// Use predefined URLs
fetch(API_URLS.AUTH.LOGIN, { ... });
```

### Build Custom URLs
```javascript
import { buildApiUrl } from '../../config/api';

// Build custom endpoint URL
const customUrl = buildApiUrl('/custom/endpoint');
```

## Best Practices

### ✅ Do's
- Always use `VITE_` prefix for client-side environment variables
- Keep `.env` file in `.gitignore`
- Use `.env.example` to document required variables
- Use descriptive variable names
- Group related variables with consistent naming

### ❌ Don'ts
- Never commit `.env` files to version control
- Don't include sensitive secrets in client-side environment variables
- Don't use environment variables for truly sensitive data (use server-side config instead)
- Don't hardcode URLs in component files

## Development vs Production

### Development
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_API_VERSION=dev
```

### Production
```env
VITE_API_BASE_URL=https://your-production-api.com/prod
VITE_API_VERSION=v1
```

## Troubleshooting

### Environment Variables Not Loading
1. Ensure variables start with `VITE_`
2. Restart development server after adding new variables
3. Check for syntax errors in `.env` file

### API Endpoints Not Working
1. Verify API base URL is correct
2. Check endpoint paths match your API documentation
3. Ensure environment variables are properly set

## Security Considerations

### Client-Side Exposure
- All `VITE_` environment variables are bundled with your app
- They are visible to end users in the browser
- Only put non-sensitive configuration in these variables

### API Security
- Use HTTPS in production
- Implement proper authentication and authorization
- Use CORS policies to restrict API access
- Consider rate limiting and API keys for additional security

### Deployment
- Set environment variables in your deployment platform
- Use platform-specific secret management for sensitive data
- Regularly rotate API keys and endpoints if needed
