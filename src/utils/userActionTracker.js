/**
 * User Action Tracker
 * Tracks and stores user actions before authentication errors
 * Restores actions after successful login
 */

/**
 * User Action Types
 */
export const ACTION_TYPES = {
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

/**
 * Storage Keys
 */
const STORAGE_KEYS = {
  PENDING_ACTIONS: 'pendingUserActions',
  CURRENT_PAGE_STATE: 'currentPageState',
  FORM_DATA: 'pendingFormData',
  NAVIGATION_STATE: 'pendingNavigationState',
  LAST_ACTIVITY: 'lastUserActivity'
};

/**
 * Action Tracker Class
 */
class UserActionTracker {
  constructor() {
    this.actions = [];
    this.pageState = {};
    this.isTracking = true;
    this.lastActivity = Date.now();
    this.loadStoredActions();
  }

  /**
   * Enable/disable tracking
   * @param {boolean} enabled - Whether to track actions
   */
  setTrackingEnabled(enabled) {
    this.isTracking = enabled;
  }

  /**
   * Track a user action
   * @param {string} type - Action type (from ACTION_TYPES)
   * @param {Object} data - Action data
   * @param {Object} context - Additional context
   */
  trackAction(type, data, context = {}) {
    if (!this.isTracking) return;

    const action = {
      id: this.generateActionId(),
      type,
      data,
      context,
      timestamp: Date.now(),
      url: window.location.href,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash
    };

    this.actions.push(action);
    this.lastActivity = Date.now();
    this.saveActions();
  }

  /**
   * Track page state for restoration
   * @param {Object} state - Page state to track
   */
  trackPageState(state) {
    if (!this.isTracking) return;

    this.pageState = {
      ...this.pageState,
      ...state,
      timestamp: Date.now(),
      url: window.location.href,
      pathname: window.location.pathname
    };

    this.savePageState();
  }

  /**
   * Track form data for restoration
   * @param {string} formId - Form identifier
   * @param {Object} formData - Form data to track
   */
  trackFormData(formId, formData) {
    if (!this.isTracking) return;

    this.trackAction(ACTION_TYPES.FORM_FILL, {
      formId,
      formData,
      fields: Object.keys(formData),
      filledFields: Object.keys(formData).filter(key => formData[key] && formData[key].toString().trim() !== '')
    });
  }

  /**
   * Track navigation state for restoration
   * @param {Object} navigationState - Navigation state to track
   */
  trackNavigationState(navigationState) {
    if (!this.isTracking) return;

    try {
      localStorage.setItem(STORAGE_KEYS.NAVIGATION_STATE, JSON.stringify({
        ...navigationState,
        timestamp: Date.now(),
        url: window.location.href
      }));
    } catch (error) {
      console.error('Error saving navigation state:', error);
    }
  }

  /**
   * Get all stored actions
   * @returns {Array} Array of tracked actions
   */
  getStoredActions() {
    this.loadStoredActions();
    return this.actions;
  }

  /**
   * Get stored page state
   * @returns {Object} Stored page state
   */
  getStoredPageState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_PAGE_STATE);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading page state:', error);
      return {};
    }
  }

  /**
   * Get stored form data
   * @param {string} formId - Form identifier
   * @returns {Object} Stored form data
   */
  getStoredFormData(formId) {
    const formActions = this.actions.filter(action => 
      action.type === ACTION_TYPES.FORM_FILL && 
      action.data.formId === formId
    );

    if (formActions.length === 0) return null;

    // Return the most recent form data
    const mostRecent = formActions[formActions.length - 1];
    return mostRecent.data.formData;
  }

  /**
   * Get stored navigation state
   * @returns {Object} Stored navigation state
   */
  getStoredNavigationState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NAVIGATION_STATE);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading navigation state:', error);
      return null;
    }
  }

  /**
   * Get actions by type
   * @param {string} type - Action type to filter by
   * @returns {Array} Filtered actions
   */
  getActionsByType(type) {
    return this.actions.filter(action => action.type === type);
  }

  /**
   * Get actions within time range
   * @param {number} minutes - Minutes to look back
   * @returns {Array} Recent actions
   */
  getRecentActions(minutes = 30) {
    const cutoff = Date.now() - (minutes * 60 * 1000);
    return this.actions.filter(action => action.timestamp > cutoff);
  }

  /**
   * Clear all stored actions and state
   */
  clearAll() {
    this.actions = [];
    this.pageState = {};
    
    // Clear from localStorage
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  /**
   * Clear old actions (older than specified time)
   * @param {number} hours - Hours to keep actions for
   */
  clearOldActions(hours = 24) {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000);
    this.actions = this.actions.filter(action => action.timestamp > cutoff);
    this.saveActions();
  }

  /**
   * Get restoration context for login redirect
   * @returns {Object} Context for restoration after login
   */
  getRestorationContext() {
    const recentActions = this.getRecentActions(10); // Last 10 minutes
    const pageState = this.getStoredPageState();
    const navigationState = this.getStoredNavigationState();

    return {
      actions: recentActions,
      pageState,
      navigationState,
      lastActivity: this.lastActivity,
      hasContent: recentActions.length > 0 || Object.keys(pageState).length > 0
    };
  }

  /**
   * Create restoration payload for login page
   * @param {string} reason - Reason for authentication requirement
   * @returns {Object} Restoration payload
   */
  createRestorationPayload(reason = 'Authentication required') {
    const context = this.getRestorationContext();
    
    return {
      reason,
      timestamp: Date.now(),
      url: window.location.href,
      pathname: window.location.pathname,
      search: window.location.search,
      ...context
    };
  }

  /**
   * Safe JSON stringify that handles circular references
   */
  safeStringify(obj) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, val) => {
      if (val != null && typeof val === "object") {
        if (seen.has(val)) {
          return {};
        }
        seen.add(val);
      }
      return val;
    });
  }

  /**
   * Save actions to localStorage
   */
  saveActions() {
    try {
      localStorage.setItem(STORAGE_KEYS.PENDING_ACTIONS, this.safeStringify(this.actions));
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, this.lastActivity.toString());
    } catch (error) {
      // Silent error handling - no sensitive information logged
    }
  }

  /**
   * Save page state to localStorage
   */
  savePageState() {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PAGE_STATE, this.safeStringify(this.pageState));
    } catch (error) {
      // Silent error handling - no sensitive information logged
    }
  }

  /**
   * Load stored actions from localStorage
   */
  loadStoredActions() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PENDING_ACTIONS);
      if (stored) {
        this.actions = JSON.parse(stored);
      }

      const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
      if (lastActivity) {
        this.lastActivity = parseInt(lastActivity, 10);
      }
    } catch (error) {
      console.error('Error loading stored actions:', error);
      this.actions = [];
    }
  }

  /**
   * Generate unique action ID
   * @returns {string} Unique action ID
   */
  generateActionId() {
    return `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Debug: Get tracking summary
   * @returns {Object} Tracking summary
   */
  getTrackingSummary() {
    const summary = {
      totalActions: this.actions.length,
      actionTypes: {},
      recentActions: this.getRecentActions(5).length,
      pageState: Object.keys(this.pageState),
      lastActivity: new Date(this.lastActivity).toLocaleString(),
      isTracking: this.isTracking
    };

    // Count actions by type
    this.actions.forEach(action => {
      summary.actionTypes[action.type] = (summary.actionTypes[action.type] || 0) + 1;
    });

    return summary;
  }
}

// Create singleton instance
const userActionTracker = new UserActionTracker();

// Export both the instance and the class
export default userActionTracker;
export { UserActionTracker };

// Helper functions for easy use
export const trackAction = (type, data, context) => userActionTracker.trackAction(type, data, context);
export const trackPageState = (state) => userActionTracker.trackPageState(state);
export const trackFormData = (formId, formData) => userActionTracker.trackFormData(formId, formData);
export const trackNavigationState = (state) => userActionTracker.trackNavigationState(state);
export const getRestorationContext = () => userActionTracker.getRestorationContext();
export const createRestorationPayload = (reason) => userActionTracker.createRestorationPayload(reason);
export const clearAllActions = () => userActionTracker.clearAll();
export const getTrackingSummary = () => userActionTracker.getTrackingSummary();

// Debug helpers for browser console
if (typeof window !== 'undefined') {
  window.userActionTracker = userActionTracker;
  window.debugUserActions = () => {
    return userActionTracker.getTrackingSummary();
  };
}
