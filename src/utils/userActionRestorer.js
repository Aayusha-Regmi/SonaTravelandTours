/**
 * User Action Restoration Service
 * Handles restoration of user actions and state after successful login
 */

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userActionTracker, { ACTION_TYPES } from './userActionTracker';

/**
 * User Action Restoration Service
 */
class UserActionRestorer {
  constructor() {
    this.restorationStrategies = new Map();
    this.setupDefaultStrategies();
  }

  /**
   * Setup default restoration strategies for different action types
   */
  setupDefaultStrategies() {
    // Search form restoration
    this.restorationStrategies.set(ACTION_TYPES.SEARCH_FORM_FILL, {
      priority: 1,
      handler: this.restoreSearchForm.bind(this)
    });

    // Payment process restoration
    this.restorationStrategies.set(ACTION_TYPES.PAYMENT_INITIATE, {
      priority: 2,
      handler: this.restorePaymentProcess.bind(this)
    });

    // Seat selection restoration
    this.restorationStrategies.set(ACTION_TYPES.SEAT_SELECTION, {
      priority: 3,
      handler: this.restoreSeatSelection.bind(this)
    });

    // Form fill restoration
    this.restorationStrategies.set(ACTION_TYPES.FORM_FILL, {
      priority: 4,
      handler: this.restoreFormData.bind(this)
    });

    // Page navigation restoration
    this.restorationStrategies.set(ACTION_TYPES.PAGE_NAVIGATION, {
      priority: 5,
      handler: this.restorePageNavigation.bind(this)
    });

    // Filter application restoration
    this.restorationStrategies.set(ACTION_TYPES.FILTER_APPLY, {
      priority: 6,
      handler: this.restoreFilters.bind(this)
    });

    // Modal state restoration
    this.restorationStrategies.set(ACTION_TYPES.MODAL_OPEN, {
      priority: 7,
      handler: this.restoreModalState.bind(this)
    });

    // Booking process restoration
    this.restorationStrategies.set(ACTION_TYPES.BOOKING_PROCESS, {
      priority: 8,
      handler: this.restoreBookingProcess.bind(this)
    });

    // Profile edit restoration
    this.restorationStrategies.set(ACTION_TYPES.PROFILE_EDIT, {
      priority: 9,
      handler: this.restoreProfileEdit.bind(this)
    });
  }

  /**
   * Restore user actions after successful login
   * @param {Function} navigate - React Router navigate function
   * @returns {Promise<boolean>} Success status
   */
  async restoreUserActions(navigate) {
    try {
     
      
      const context = userActionTracker.getRestorationContext();
      
      if (!context.hasContent) {
        return false;
      }

      // Sort actions by priority and timestamp
      const sortedActions = this.sortActionsByPriority(context.actions);
      
      // Execute restoration strategies
      let restorationSuccess = false;
      
      for (const action of sortedActions) {
        const strategy = this.restorationStrategies.get(action.type);
        if (strategy) {
          try {
           
            const result = await strategy.handler(action, context, navigate);
            if (result) {
              restorationSuccess = true;
              break; // Stop after first successful restoration
            }
          } catch (error) {
            console.error(` Failed to restore action ${action.type}:`, error);
          }
        }
      }

      // If no specific action was restored, try general page restoration
      if (!restorationSuccess) {
        restorationSuccess = await this.restoreGeneralPageState(context, navigate);
      }

      // Show restoration notification
     

      return restorationSuccess;
    } catch (error) {
      console.error(' User action restoration failed:', error);
      return false;
    }
  }

  /**
   * Sort actions by priority and timestamp
   * @param {Array} actions - Actions to sort
   * @returns {Array} Sorted actions
   */
  sortActionsByPriority(actions) {
    return actions.sort((a, b) => {
      const strategyA = this.restorationStrategies.get(a.type);
      const strategyB = this.restorationStrategies.get(b.type);
      
      const priorityA = strategyA ? strategyA.priority : 999;
      const priorityB = strategyB ? strategyB.priority : 999;
      
      // Sort by priority first, then by timestamp (newest first)
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      return b.timestamp - a.timestamp;
    });
  }

  /**
   * Restore search form state
   * @param {Object} action - Action to restore
   * @param {Object} context - Restoration context
   * @param {Function} navigate - Navigation function
   * @returns {Promise<boolean>} Success status
   */
  async restoreSearchForm(action, context, navigate) {
    try {
      const { formData } = action.data;
      
      if (!formData || Object.keys(formData).length === 0) {
        return false;
      }

     
      
      // Navigate directly to search results page with search form data
      // The SearchResultsPage will automatically perform the search with the provided parameters
      navigate('/search-results', {
        state: {
          fromLogin: true,
          searchParams: formData,
          searchResults: [], // Empty results - will be populated by automatic search
          restoreSearch: true
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to restore search form:', error);
      return false;
    }
  }

  /**
   * Restore payment process
   * @param {Object} action - Action to restore
   * @param {Object} context - Restoration context
   * @param {Function} navigate - Navigation function
   * @returns {Promise<boolean>} Success status
   */
  async restorePaymentProcess(action, context, navigate) {
    try {
      const { paymentData } = action.data;
      
      if (!paymentData) {
        return false;
      }

      console.log('💳 Restoring payment process');
      
      // Navigate to payment page with restored data
      navigate('/payment', {
        state: {
          fromLogin: true,
          ...paymentData
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to restore payment process:', error);
      return false;
    }
  }

  /**
   * Restore seat selection
   * @param {Object} action - Action to restore
   * @param {Object} context - Restoration context
   * @param {Function} navigate - Navigation function
   * @returns {Promise<boolean>} Success status
   */
  async restoreSeatSelection(action, context, navigate) {
    try {
      const { seatData } = action.data;
      
      if (!seatData) {
        return false;
      }

      console.log('🪑 Restoring seat selection');
      
      // Navigate to seat selection page with restored data
      navigate('/seat-selection', {
        state: {
          fromLogin: true,
          ...seatData
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to restore seat selection:', error);
      return false;
    }
  }

  /**
   * Restore form data
   * @param {Object} action - Action to restore
   * @param {Object} context - Restoration context
   * @param {Function} navigate - Navigation function
   * @returns {Promise<boolean>} Success status
   */
  async restoreFormData(action, context, navigate) {
    try {
      const { formId, formData } = action.data;
      
      if (!formId || !formData) {
        return false;
      }

      console.log('📝 Restoring form data for:', formId);
      
      // Navigate to the page containing the form
      navigate(action.pathname, {
        state: {
          fromLogin: true,
          restoreForm: true,
          formId,
          formData
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to restore form data:', error);
      return false;
    }
  }

  /**
   * Restore page navigation
   * @param {Object} action - Action to restore
   * @param {Object} context - Restoration context
   * @param {Function} navigate - Navigation function
   * @returns {Promise<boolean>} Success status
   */
  async restorePageNavigation(action, context, navigate) {
    try {
      const { targetPath, navigationData } = action.data;
      
      if (!targetPath) {
        return false;
      }

      console.log('🧭 Restoring page navigation to:', targetPath);
      
      // Navigate to the target page
      navigate(targetPath, {
        state: {
          fromLogin: true,
          ...navigationData
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to restore page navigation:', error);
      return false;
    }
  }

  /**
   * Restore filters
   * @param {Object} action - Action to restore
   * @param {Object} context - Restoration context
   * @param {Function} navigate - Navigation function
   * @returns {Promise<boolean>} Success status
   */
  async restoreFilters(action, context, navigate) {
    try {
      const { filters } = action.data;
      
      if (!filters) {
        return false;
      }

      console.log('🔍 Restoring filters:', filters);
      
      // Navigate to the page with filters applied
      navigate(action.pathname, {
        state: {
          fromLogin: true,
          restoreFilters: true,
          filters
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to restore filters:', error);
      return false;
    }
  }

  /**
   * Restore modal state
   * @param {Object} action - Action to restore
   * @param {Object} context - Restoration context
   * @param {Function} navigate - Navigation function
   * @returns {Promise<boolean>} Success status
   */
  async restoreModalState(action, context, navigate) {
    try {
      const { modalType, modalData } = action.data;
      
      if (!modalType) {
        return false;
      }

      console.log('🪟 Restoring modal state:', modalType);
      
      // Navigate to the page with modal state
      navigate(action.pathname, {
        state: {
          fromLogin: true,
          restoreModal: true,
          modalType,
          modalData
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to restore modal state:', error);
      return false;
    }
  }

  /**
   * Restore booking process
   * @param {Object} action - Action to restore
   * @param {Object} context - Restoration context
   * @param {Function} navigate - Navigation function
   * @returns {Promise<boolean>} Success status
   */
  async restoreBookingProcess(action, context, navigate) {
    try {
      const { bookingData } = action.data;
      
      if (!bookingData) {
        return false;
      }

      console.log('📅 Restoring booking process');
      
      // Navigate to booking page with restored data
      navigate('/booking', {
        state: {
          fromLogin: true,
          ...bookingData
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to restore booking process:', error);
      return false;
    }
  }

  /**
   * Restore profile edit
   * @param {Object} action - Action to restore
   * @param {Object} context - Restoration context
   * @param {Function} navigate - Navigation function
   * @returns {Promise<boolean>} Success status
   */
  async restoreProfileEdit(action, context, navigate) {
    try {
      const { profileData } = action.data;
      
      if (!profileData) {
        return false;
      }

      console.log('👤 Restoring profile edit');
      
      // Navigate to profile page with edit state
      navigate('/profile', {
        state: {
          fromLogin: true,
          restoreProfileEdit: true,
          profileData
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to restore profile edit:', error);
      return false;
    }
  }

  /**
   * Restore general page state when no specific action handlers apply
   * @param {Object} context - Restoration context
   * @param {Function} navigate - Navigation function
   * @returns {Promise<boolean>} Success status
   */
  async restoreGeneralPageState(context, navigate) {
    try {
      // Check if there's navigation state
      if (context.navigationState) {
        const { url, pathname, state } = context.navigationState;
        
        console.log('🔄 Restoring general page state to:', pathname);
        
        navigate(pathname, {
          state: {
            fromLogin: true,
            ...state
          }
        });
        
        return true;
      }

      // Check if there's page state
      if (context.pageState && Object.keys(context.pageState).length > 0) {
        const { pathname } = context.pageState;
        
        if (pathname && pathname !== '/login') {
          console.log('🔄 Restoring page state to:', pathname);
          
          navigate(pathname, {
            state: {
              fromLogin: true,
              ...context.pageState
            }
          });
          
          return true;
        }
      }

      // Check if there are any recent actions with paths
      if (context.actions.length > 0) {
        const mostRecentAction = context.actions[context.actions.length - 1];
        const { pathname } = mostRecentAction;
        
        if (pathname && pathname !== '/login') {
          console.log('🔄 Restoring from most recent action to:', pathname);
          
          navigate(pathname, {
            state: {
              fromLogin: true,
              restoredFromAction: true
            }
          });
          
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Failed to restore general page state:', error);
      return false;
    }
  }

  /**
   * Register custom restoration strategy
   * @param {string} actionType - Action type
   * @param {number} priority - Priority (lower = higher priority)
   * @param {Function} handler - Handler function
   */
  registerRestorationStrategy(actionType, priority, handler) {
    this.restorationStrategies.set(actionType, {
      priority,
      handler
    });
  }

  /**
   * Clear all restoration data
   */
  clearRestorationData() {
    userActionTracker.clearAll();
    console.log('🧹 All restoration data cleared');
  }
}

// Create singleton instance
const userActionRestorer = new UserActionRestorer();

export default userActionRestorer;
export { UserActionRestorer };

// Hook for easy use in React components
export const useUserActionRestoration = () => {
  const navigate = useNavigate();
  
  return {
    restoreUserActions: () => userActionRestorer.restoreUserActions(navigate),
    clearRestorationData: () => userActionRestorer.clearRestorationData(),
    registerStrategy: (actionType, priority, handler) => 
      userActionRestorer.registerRestorationStrategy(actionType, priority, handler)
  };
};
