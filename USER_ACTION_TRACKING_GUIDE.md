# User Action Tracking and Restoration System

## Overview

This system tracks user actions and form data before authentication errors occur, then restores the user's progress after successful login. This ensures a seamless user experience where users can continue exactly where they left off.

## Architecture

### Core Components

1. **UserActionTracker** (`src/utils/userActionTracker.js`)
   - Tracks and stores user actions
   - Manages form data and page state
   - Provides restoration context

2. **UserActionRestorer** (`src/utils/userActionRestorer.js`)
   - Handles restoration of user actions after login
   - Implements restoration strategies for different action types
   - Manages navigation and state restoration

3. **HTTP Interceptor Integration** (`src/services/httpInterceptor.js`)
   - Automatically tracks failed API calls due to authentication
   - Stores restoration context when session expires
   - Redirects to login with proper context

4. **React Hooks** (`src/hooks/useUserActionTracking.js`)
   - Provides easy integration with React components
   - Handles automatic tracking of page views and form changes
   - Manages restoration state in components

## How It Works

### 1. Action Tracking

The system tracks various types of user actions:

```javascript
// Available action types
const ACTION_TYPES = {
  SEARCH_FORM_FILL: 'SEARCH_FORM_FILL',
  PAYMENT_INITIATE: 'PAYMENT_INITIATE',
  SEAT_SELECTION: 'SEAT_SELECTION',
  FORM_FILL: 'FORM_FILL',
  PAGE_NAVIGATION: 'PAGE_NAVIGATION',
  FILTER_APPLY: 'FILTER_APPLY',
  MODAL_OPEN: 'MODAL_OPEN',
  BOOKING_PROCESS: 'BOOKING_PROCESS',
  PROFILE_EDIT: 'PROFILE_EDIT',
  API_CALL: 'API_CALL'
};
```

### 2. Automatic Tracking

The system automatically tracks:
- Page navigation
- Form data changes (debounced)
- API calls that fail due to authentication
- Payment initiation attempts
- Search form submissions

### 3. Restoration Process

When authentication is required:
1. Current user actions and form data are stored
2. User is redirected to login page with contextual message
3. After successful login, restoration system attempts to restore user's progress
4. User continues from where they left off

## Implementation Guide

### Basic Setup

1. **Initialize in your app** (already done in `main.jsx`):
```javascript
import { setSessionExpiredCallback } from './services/httpInterceptor';

setSessionExpiredCallback((errorDetails) => {
  // Handle session expiry with user action tracking
  console.log('Session expired:', errorDetails);
});
```

2. **Use in React components**:
```javascript
import { useUserActionTracking } from '../hooks/useUserActionTracking';

const MyComponent = () => {
  const { trackAction, trackFormData } = useUserActionTracking();
  
  const handleFormSubmit = (formData) => {
    trackAction('FORM_SUBMIT', { formData });
    // ... rest of submit logic
  };
  
  return (
    // ... your component JSX
  );
};
```

### Advanced Integration

#### Search Form Tracking

```javascript
import { useUserActionTracking, useStateRestoration } from '../hooks/useUserActionTracking';

const SearchForm = () => {
  const { trackSearchForm } = useUserActionTracking();
  const { shouldRestoreState, getSearchRestoration } = useStateRestoration();
  
  // Auto-restore search form after login
  useEffect(() => {
    if (shouldRestoreState()) {
      const searchData = getSearchRestoration();
      if (searchData) {
        setFormData(searchData);
      }
    }
  }, [shouldRestoreState, getSearchRestoration]);
  
  const handleSearch = () => {
    trackSearchForm(formData);
    // ... search logic
  };
};
```

#### Payment Process Tracking

```javascript
import { useUserActionTracking } from '../hooks/useUserActionTracking';

const PaymentPage = () => {
  const { trackPaymentInitiation } = useUserActionTracking();
  
  const handlePayment = (paymentData) => {
    trackPaymentInitiation({
      amount: paymentData.amount,
      currency: 'NPR',
      paymentMethod: paymentData.method,
      // ... other payment details
    });
    
    // ... payment logic
  };
};
```

#### Automatic Form Tracking

```javascript
import { useFormTracking } from '../hooks/useUserActionTracking';

const MyForm = () => {
  const [formData, setFormData] = useState({});
  
  // Automatically track form changes
  useFormTracking('my_form', formData, { 
    debounceMs: 2000,
    trackEmptyFields: false 
  });
  
  return (
    // ... your form JSX
  );
};
```

## Integration Examples

### Current Integrations

1. **LoginPage.jsx**
   - Displays restoration messages
   - Handles user action restoration after login
   - Shows contextual messages about session expiry

2. **PaymentPage.jsx**
   - Tracks payment initiation attempts
   - Tracks page access and user data
   - Handles restoration of payment context

3. **SearchForm.jsx**
   - Tracks search form submissions
   - Auto-restores search form data after login
   - Tracks authentication requirements during search

4. **HTTP Interceptor**
   - Automatically tracks failed API calls
   - Stores restoration context on session expiry
   - Redirects to login with proper context

### Message Flow

1. **User Action Tracking**:
   ```
   User Action → Track Action → Store in localStorage
   ```

2. **Authentication Error**:
   ```
   API Call → 401/403 → Store Context → Redirect to Login
   ```

3. **Login Success**:
   ```
   Login Success → Restore Actions → Navigate to Previous Context
   ```

4. **User Experience**:
   ```
   User continues where they left off with all data intact
   ```

## Storage Structure

### localStorage Keys

- `pendingUserActions`: Array of tracked actions
- `currentPageState`: Current page state
- `pendingFormData`: Form data by form ID
- `pendingNavigationState`: Navigation state
- `authRedirectData`: Full restoration context
- `lastUserActivity`: Timestamp of last activity

### Action Structure

```javascript
{
  id: "action_1640995200000_abc123",
  type: "SEARCH_FORM_FILL",
  data: {
    formId: "search_form",
    formData: { from: "Kathmandu", to: "Birgunj" }
  },
  context: {
    component: "SearchForm",
    page: "/"
  },
  timestamp: 1640995200000,
  url: "https://example.com/",
  pathname: "/",
  search: "?param=value"
}
```

## User Messages

The system provides contextual messages to users:

1. **Session Expiry**: "Your session has expired. Please log in to continue where you left off."
2. **Payment Authentication**: "Please log in to continue with your payment"
3. **Search Authentication**: "Please log in to search for buses"
4. **Restoration Success**: "Your previous session has been restored!"

## Benefits

1. **Seamless User Experience**: Users never lose their progress
2. **Reduced Friction**: No need to re-enter form data after login
3. **Context Preservation**: Full page state and navigation context maintained
4. **Automatic Cleanup**: Old actions are automatically cleaned up
5. **Flexible Integration**: Easy to add to any React component

## Configuration

### Tracking Options

```javascript
const { trackAction } = useUserActionTracking({
  trackPageViews: true,
  trackFormChanges: true,
  autoTrackEnabled: true
});
```

### Restoration Strategies

The system uses priority-based restoration:
1. Search form restoration (Priority 1)
2. Payment process restoration (Priority 2)
3. Seat selection restoration (Priority 3)
4. General form restoration (Priority 4)
5. Page navigation restoration (Priority 5)

## Debug and Monitoring

### Console Helpers

Available in browser console:
- `window.userActionTracker` - Access tracker instance
- `window.debugUserActions()` - Get debugging information
- `debugUserActions()` - Show current tracking state

### Logging

The system provides comprehensive logging:
- Action tracking: `🎯 User action tracked`
- Page state: `📄 Page state tracked`
- Restoration: `🔄 Starting user action restoration`
- Success: `✅ User actions restored successfully`
- Errors: `❌ User action restoration failed`

## Security Considerations

1. **No Sensitive Data**: Payment details and passwords are never stored
2. **Automatic Cleanup**: Old actions are cleaned up after 24 hours
3. **Session-Based**: Data is cleared on explicit logout
4. **Local Storage**: All data stored locally, not transmitted

## Performance

1. **Debounced Tracking**: Form changes are debounced to prevent excessive storage
2. **Selective Tracking**: Only relevant actions are tracked
3. **Automatic Cleanup**: Old data is automatically removed
4. **Minimal Impact**: Lightweight tracking with minimal performance overhead

## Future Enhancements

1. **Custom Strategies**: Allow custom restoration strategies
2. **Encrypted Storage**: Optional encryption of sensitive restoration data
3. **Analytics Integration**: Track user behavior patterns
4. **Advanced Filtering**: More sophisticated action filtering
5. **Cross-Device Sync**: Sync restoration data across devices (with user consent)

This system ensures that users never lose their progress due to authentication requirements, providing a smooth and professional user experience throughout the application.
