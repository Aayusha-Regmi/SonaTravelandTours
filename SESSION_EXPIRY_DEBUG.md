# Session Expiry Debugging Guide

## The Issue: "Session Expired While Providing Login Request"

When you see session expiry messages during login, it means something is trying to make authenticated API calls while the user is on the login page. This shouldn't happen because login is the process of creating a session, not using one.

## Common Causes

### 1. **API Calls During Login Page Load**
- Some component is making authenticated API calls when the login page loads
- Navigation guards or route protection is triggering API calls
- Background components are trying to fetch user data

### 2. **Session Monitor Over-Triggering**
- The SessionMonitor is checking for session expiry too aggressively
- It's running on pages where it shouldn't
- Token expiry detection is incorrect

### 3. **Global API Interceptors**
- API service is being used incorrectly for login requests
- Global interceptors are adding auth headers to login requests
- Session management is interfering with login process

## Debugging Steps

### 1. **Check Session Status**
Open browser console and run:
```javascript
// Check current session status
window.sessionDebug.getStatus()

// Log detailed session information
window.sessionDebug.logStatus('Manual Check')

// Check if current page should require auth
window.sessionDebug.shouldRequireAuth()

// Check if we're on login page
window.sessionDebug.isLoginPage()
```

### 2. **Monitor API Calls**
- Open Network tab in browser DevTools
- Navigate to login page
- Look for any API calls being made automatically
- Check if any calls have Authorization headers (they shouldn't on login page)

### 3. **Check Console Logs**
Look for these log messages:
- `SessionMonitor: Skipping session check for public page: /login`
- `API Service: Making request to: [URL] requireAuth: false`
- `LoginPage: Session expiry message set: [message]`

### 4. **Test Session Scenarios**
```javascript
// Reset session completely
window.sessionDebug.resetSession()

// Create mock expired session
window.sessionDebug.triggerExpiry()

// Create mock valid session
window.sessionDebug.createMockSession()
```

## Solutions Implemented

### 1. **Enhanced Session Monitor**
```javascript
// SessionMonitor now properly skips login pages
const publicPaths = ['/login', '/register', '/forgot-password', '/', '/about', '/contact', '/signup', '/otp-verification'];

// Added better logging
console.log('SessionMonitor: Skipping session check for public page:', currentPath);
```

### 2. **API Service Improvements**
```javascript
// Clear separation of authenticated vs public API calls
export const apiPost = async (url, data, options, requireAuth = true) => {
  // Default requires auth
}

export const apiLoginPost = async (url, data, options) => {
  // Never requires auth
}
```

### 3. **Login Page Enhancements**
```javascript
// Better session message handling
if (location.state.sessionExpired || 
    (location.state.message && location.state.message.toLowerCase().includes('session'))) {
  setSessionMessage(location.state.message || 'Your session has expired. Please login again.');
}
```

## Best Practices

### 1. **For Login/Registration Pages**
- ✅ Use regular `fetch()` for login API calls
- ✅ Never use session-managed API services
- ✅ Handle session expiry messages from navigation state
- ❌ Don't make authenticated API calls on login pages

### 2. **For Protected Pages**
- ✅ Use session-managed API services (`apiPost`, `apiGet`, etc.)
- ✅ Handle 401 responses gracefully
- ✅ Redirect to login with proper state
- ❌ Don't ignore session expiry

### 3. **For API Services**
- ✅ Set `requireAuth: false` for public endpoints
- ✅ Log API calls for debugging
- ✅ Handle network errors gracefully
- ❌ Don't add auth headers to login requests

## Testing the Fix

1. **Clear all sessions:**
   ```javascript
   window.sessionDebug.resetSession()
   ```

2. **Visit a protected page** (like dashboard) → Should redirect to login with session expiry message

3. **Check login page** → Should show session expiry message, no additional API calls

4. **Login successfully** → Should create new session and redirect properly

5. **Check console logs** → Should see proper session handling messages

## Expected Behavior

### Before Fix:
- ❌ Session expiry messages during login
- ❌ Failed API calls on login page
- ❌ Confusing error messages
- ❌ Incorrect session state

### After Fix:
- ✅ Clear session expiry messages on login page
- ✅ No authenticated API calls during login
- ✅ Proper session state management
- ✅ Smooth login flow

## Troubleshooting

If you still see session expiry during login:

1. **Check for rogue API calls:**
   ```javascript
   // Monitor all fetch calls
   const originalFetch = window.fetch;
   window.fetch = function(...args) {
     console.log('FETCH CALL:', args[0], args[1]);
     return originalFetch.apply(this, args);
   };
   ```

2. **Verify SessionMonitor is skipping login:**
   ```javascript
   window.sessionDebug.logStatus('Login Page Check')
   ```

3. **Check for global state management issues:**
   - Redux/Context providers making API calls
   - Route guards triggering authenticated requests
   - Component lifecycle methods fetching user data

The key is that **login should never require an existing session** - it creates one!
