/**
 * User Action Tracking Hook
 * React hook for easy integration of user action tracking
 */

import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import userActionTracker, { ACTION_TYPES } from '../utils/userActionTracker';

/**
 * Hook for tracking user actions in React components
 * @param {Object} options - Tracking options
 * @returns {Object} Tracking functions
 */
export const useUserActionTracking = (options = {}) => {
  const location = useLocation();
  const { 
    trackPageViews = true, 
    trackFormChanges = true, 
    autoTrackEnabled = true 
  } = options;
  
  const lastPageRef = useRef(null);
  const formDataRef = useRef({});

  // Track page navigation
  useEffect(() => {
    if (trackPageViews && autoTrackEnabled) {
      // Don't track login page views to avoid noise
      if (location.pathname !== '/login') {
        userActionTracker.trackAction(ACTION_TYPES.PAGE_NAVIGATION, {
          from: lastPageRef.current,
          to: location.pathname,
          search: location.search,
          hash: location.hash
        });
        
        userActionTracker.trackPageState({
          pathname: location.pathname,
          search: location.search,
          hash: location.hash
        });
      }
      
      lastPageRef.current = location.pathname;
    }
  }, [location, trackPageViews, autoTrackEnabled]);

  // Track user action
  const trackAction = useCallback((type, data, context = {}) => {
    if (!autoTrackEnabled) return;
    
    userActionTracker.trackAction(type, data, {
      ...context,
      component: context.component || 'unknown',
      page: location.pathname
    });
  }, [autoTrackEnabled, location.pathname]);

  // Track form data changes
  const trackFormData = useCallback((formId, formData, options = {}) => {
    if (!trackFormChanges || !autoTrackEnabled) return;
    
    const { immediate = false, onlyWhenChanged = true } = options;
    
    // Check if form data has changed
    const currentFormKey = `${formId}_${location.pathname}`;
    const lastFormData = formDataRef.current[currentFormKey];
    
    if (onlyWhenChanged && lastFormData && JSON.stringify(lastFormData) === JSON.stringify(formData)) {
      return; // No changes, don't track
    }
    
    // Store current form data
    formDataRef.current[currentFormKey] = formData;
    
    if (immediate) {
      userActionTracker.trackFormData(formId, formData);
    } else {
      // Debounce form tracking to avoid too many updates
      setTimeout(() => {
        userActionTracker.trackFormData(formId, formData);
      }, 1000);
    }
  }, [trackFormChanges, autoTrackEnabled, location.pathname]);

  // Track search form specifically
  const trackSearchForm = useCallback((searchData) => {
    if (!autoTrackEnabled) return;
    
    trackAction(ACTION_TYPES.SEARCH_FORM_FILL, {
      formId: 'search_form',
      formData: searchData,
      searchFields: Object.keys(searchData),
      filledFields: Object.keys(searchData).filter(key => 
        searchData[key] && searchData[key].toString().trim() !== ''
      )
    });
  }, [trackAction, autoTrackEnabled]);

  // Track payment initiation
  const trackPaymentInitiation = useCallback((paymentData) => {
    if (!autoTrackEnabled) return;
    
    trackAction(ACTION_TYPES.PAYMENT_INITIATE, {
      paymentData: {
        amount: paymentData.amount,
        currency: paymentData.currency || 'NPR',
        paymentMethod: paymentData.paymentMethod,
        // Don't store sensitive payment details
        hasPassengerInfo: !!paymentData.passengers,
        hasSeatsSelected: !!paymentData.selectedSeats,
        tripType: paymentData.tripType
      }
    });
  }, [trackAction, autoTrackEnabled]);

  // Track seat selection
  const trackSeatSelection = useCallback((seatData) => {
    if (!autoTrackEnabled) return;
    
    trackAction(ACTION_TYPES.SEAT_SELECTION, {
      seatData: {
        busId: seatData.busId,
        selectedSeats: seatData.selectedSeats,
        seatCount: seatData.selectedSeats?.length || 0,
        totalPrice: seatData.totalPrice,
        date: seatData.date
      }
    });
  }, [trackAction, autoTrackEnabled]);

  // Track filter application
  const trackFilterApplication = useCallback((filters) => {
    if (!autoTrackEnabled) return;
    
    trackAction(ACTION_TYPES.FILTER_APPLY, {
      filters: filters,
      activeFilters: Object.keys(filters).filter(key => 
        filters[key] && 
        (Array.isArray(filters[key]) ? filters[key].length > 0 : filters[key] !== '')
      )
    });
  }, [trackAction, autoTrackEnabled]);

  // Track modal opening
  const trackModalOpen = useCallback((modalType, modalData = {}) => {
    if (!autoTrackEnabled) return;
    
    trackAction(ACTION_TYPES.MODAL_OPEN, {
      modalType,
      modalData,
      timestamp: Date.now()
    });
  }, [trackAction, autoTrackEnabled]);

  // Track booking process steps
  const trackBookingStep = useCallback((step, bookingData) => {
    if (!autoTrackEnabled) return;
    
    trackAction(ACTION_TYPES.BOOKING_PROCESS, {
      step,
      bookingData: {
        ...bookingData,
        step,
        timestamp: Date.now()
      }
    });
  }, [trackAction, autoTrackEnabled]);

  // Track profile editing
  const trackProfileEdit = useCallback((profileData) => {
    if (!autoTrackEnabled) return;
    
    trackAction(ACTION_TYPES.PROFILE_EDIT, {
      profileData: {
        fieldsEdited: Object.keys(profileData),
        hasPersonalInfo: !!(profileData.firstName || profileData.lastName),
        hasContactInfo: !!(profileData.email || profileData.phone),
        hasAddressInfo: !!profileData.address
      }
    });
  }, [trackAction, autoTrackEnabled]);

  // Get current tracking state
  const getTrackingState = useCallback(() => {
    return {
      isTracking: autoTrackEnabled,
      currentPage: location.pathname,
      trackingSummary: userActionTracker.getTrackingSummary()
    };
  }, [autoTrackEnabled, location.pathname]);

  // Clear tracking data
  const clearTrackingData = useCallback(() => {
    userActionTracker.clearAll();
    formDataRef.current = {};
  }, []);

  return {
    // Core tracking functions
    trackAction,
    trackFormData,
    
    // Specific tracking functions
    trackSearchForm,
    trackPaymentInitiation,
    trackSeatSelection,
    trackFilterApplication,
    trackModalOpen,
    trackBookingStep,
    trackProfileEdit,
    
    // Utility functions
    getTrackingState,
    clearTrackingData,
    
    // State
    isTracking: autoTrackEnabled,
    currentPage: location.pathname
  };
};

/**
 * Hook for components that need to restore state after login
 * @returns {Object} Restoration functions
 */
export const useStateRestoration = () => {
  const location = useLocation();

  // Check if component should restore state
  const shouldRestoreState = useCallback(() => {
    return location.state?.fromLogin === true;
  }, [location.state]);

  // Get restoration data
  const getRestorationData = useCallback(() => {
    if (!shouldRestoreState()) return null;
    
    return {
      searchParams: location.state?.searchParams,
      formData: location.state?.formData,
      pageState: location.state?.pageState,
      filters: location.state?.filters,
      modalState: location.state?.modalState,
      restoreSearch: location.state?.restoreSearch,
      restoreForm: location.state?.restoreForm,
      restoreFilters: location.state?.restoreFilters,
      restoreModal: location.state?.restoreModal
    };
  }, [location.state, shouldRestoreState]);

  // Get form restoration data
  const getFormRestoration = useCallback((formId) => {
    const restorationData = getRestorationData();
    if (!restorationData) return null;
    
    if (restorationData.restoreForm && restorationData.formData) {
      return restorationData.formData;
    }
    
    return null;
  }, [getRestorationData]);

  // Get search restoration data
  const getSearchRestoration = useCallback(() => {
    const restorationData = getRestorationData();
    if (!restorationData) return null;
    
    if (restorationData.restoreSearch && restorationData.searchParams) {
      return restorationData.searchParams;
    }
    
    return null;
  }, [getRestorationData]);

  return {
    shouldRestoreState,
    getRestorationData,
    getFormRestoration,
    getSearchRestoration,
    fromLogin: location.state?.fromLogin === true
  };
};

/**
 * Hook for automatic form tracking
 * @param {string} formId - Form identifier
 * @param {Object} formData - Form data object
 * @param {Object} options - Tracking options
 */
export const useFormTracking = (formId, formData, options = {}) => {
  const { trackFormData } = useUserActionTracking();
  const { debounceMs = 1000, trackEmptyFields = false } = options;
  
  const timeoutRef = useRef(null);
  
  useEffect(() => {
    if (!formId || !formData) return;
    
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Filter out empty fields if needed
    const dataToTrack = trackEmptyFields ? formData : Object.keys(formData).reduce((acc, key) => {
      const value = formData[key];
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      if (Object.keys(dataToTrack).length > 0) {
        trackFormData(formId, dataToTrack, { immediate: true });
      }
    }, debounceMs);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [formId, formData, trackFormData, debounceMs, trackEmptyFields]);
};

export default useUserActionTracking;
