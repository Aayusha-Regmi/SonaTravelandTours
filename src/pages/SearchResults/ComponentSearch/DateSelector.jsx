import React, { useState, useEffect } from 'react';

const DateSelector = ({ onDateChange, initialDate, departureDate, returnDate }) => {
  const today = new Date();  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Create a ref for the date cards container
  const dateCardsContainerRef = React.useRef(null);

  // Always use ISO date string for internal logic
  // Parse date as local date and return YYYY-MM-DD
  const toISODate = (date) => {
    if (!date) return null;
    if (typeof date === 'string') {
      // Try ISO first (YYYY-MM-DD)
      const ymd = /^\d{4}-\d{2}-\d{2}$/;
      if (ymd.test(date)) {
        const [year, month, day] = date.split('-');
        return `${year}-${month}-${day}`;
      }
      // Try "25 Jul 2025" format
      const dmy = /^\d{1,2} [A-Za-z]{3} \d{4}$/;
      if (dmy.test(date)) {
        const parts = date.split(' ');
        // Parse as local date
        const localDate = new Date(Number(parts[2]),
          ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].indexOf(parts[1]),
          Number(parts[0]));
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      // Fallback: parse as local date
      const parsed = new Date(date);
      if (!isNaN(parsed)) {
        const year = parsed.getFullYear();
        const month = String(parsed.getMonth() + 1).padStart(2, '0');
        const day = String(parsed.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      return null;
    }
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return null;
  };

  // Current date for the demo - use June 6, 2025 as specified in context
  // If initialDate is provided, use it instead
  const currentDate = initialDate ? new Date(initialDate) : new Date('2025-06-06');
  // Use departureDate as selected if provided, else fallback to initialDate
  const [selectedDate, setSelectedDate] = useState(toISODate(departureDate || currentDate));
  const [visibleDates, setVisibleDates] = useState([]);
  const [currentStartDate, setCurrentStartDate] = useState(new Date(yesterday));
  const [isSearching, setIsSearching] = useState(false);
  const [selectionMode, setSelectionMode] = useState('departure'); // 'departure' or 'return'
  const [showReturnMessage, setShowReturnMessage] = useState(false);
  
  // Format date for display
  function formatDateForDisplay(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Format day only
  function formatDayOnly(date) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  // Format month and date only
  function formatMonthDateOnly(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  // Check if date is today
  function isToday(date) {
    return toISODate(date) === toISODate(today);
  }

  useEffect(() => {
    // Use departureDate as selected if provided, else fallback to initialDate
    const isoDate = toISODate(departureDate || initialDate);
    setSelectedDate(isoDate);

    // Adjust the current view to make the selected date visible
    const date = isoDate ? new Date(isoDate) : null;
    if (date) {
      const targetDate = new Date(date);
      const endOfCurrentRange = new Date(currentStartDate);
      endOfCurrentRange.setDate(currentStartDate.getDate() + 10);
      if (targetDate < currentStartDate || targetDate > endOfCurrentRange) {
        const newStartDate = new Date(targetDate);
        newStartDate.setDate(targetDate.getDate() - 3);
        const todayDate = new Date();
        if (newStartDate < todayDate) {
          newStartDate.setDate(todayDate.getDate());
        }
        setCurrentStartDate(newStartDate);
      }
    }
  }, [departureDate, initialDate]);
  // Generate dates for display
  useEffect(() => {
    const generateDates = () => {
      const dates = [];
      const startDate = new Date(currentStartDate);
      for (let i = 0; i < 11; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i);
        const isYesterday = toISODate(newDate) === toISODate(yesterday);
        dates.push({
          fullDate: newDate,
          iso: toISODate(newDate),
          day: formatDayOnly(newDate),
          date: formatMonthDateOnly(newDate),
          isDisabled: isYesterday,
          isToday: isToday(newDate)
        });
      }
      setVisibleDates(dates);
    };
    generateDates();
  }, [currentStartDate]);
  
  // Effect to scroll to the selected date when dates change
  useEffect(() => {
    // Give a small timeout to ensure the DOM has updated
    const scrollTimeout = setTimeout(() => {
      if (dateCardsContainerRef.current) {
        const selectedCard = document.getElementById('selected-date-card');
        if (selectedCard) {
          // Get container dimensions
          const container = dateCardsContainerRef.current;
          const containerRect = container.getBoundingClientRect();
          const cardRect = selectedCard.getBoundingClientRect();
          
          // Calculate the scroll position to center the card
          const scrollLeft = selectedCard.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2);
          
          // Smooth scroll to the position
          container.scrollTo({
            left: Math.max(0, scrollLeft),
            behavior: 'smooth'
          });
        }
      }
    }, 100);
    
    return () => clearTimeout(scrollTimeout);
  }, [visibleDates, selectedDate]);
  // Navigate to previous set of dates
  const handlePrevious = () => {
    const newStartDate = new Date(currentStartDate);
    newStartDate.setDate(currentStartDate.getDate() - 7);
    
    // Don't go earlier than yesterday
    const yesterdayPlus1 = new Date(yesterday);
    yesterdayPlus1.setDate(yesterday.getDate() + 1); // Today
    
    if (newStartDate < yesterdayPlus1) {
      newStartDate.setDate(yesterdayPlus1.getDate());
    }
    setCurrentStartDate(newStartDate);
  };

  // Navigate to next set of dates
  const handleNext = () => {
    const newStartDate = new Date(currentStartDate);
    newStartDate.setDate(currentStartDate.getDate() + 7);
    setCurrentStartDate(newStartDate);
  };  // Handle date selection
  const handleDateSelect = (dateItem) => {
    if (!dateItem.isDisabled) {
      const isoDeparture = toISODate(departureDate);
      const isoReturn = toISODate(returnDate);
      
      // Determine selection type based on current state and proximity
      let isReturnSelection = false;
      let isDepartureSelection = false;
      let needsReturnReset = false;
      
      // If both departure and return dates exist, determine which one to change based on proximity
      if (isoDeparture && isoReturn) {
        const selectedDate = new Date(dateItem.iso);
        const departureDate_obj = new Date(isoDeparture);
        const returnDate_obj = new Date(isoReturn);
        
        // Calculate days difference from selected date to departure and return
        const daysToDeparture = Math.abs((selectedDate - departureDate_obj) / (1000 * 60 * 60 * 24));
        const daysToReturn = Math.abs((selectedDate - returnDate_obj) / (1000 * 60 * 60 * 24));
        
        console.log('📅 Date proximity analysis:', {
          selectedDate: dateItem.iso,
          departure: isoDeparture,
          return: isoReturn,
          daysToDeparture,
          daysToReturn
        });
        
        // If the selected date is closer to return date, or equal distance but after departure
        if (daysToReturn < daysToDeparture || (daysToReturn === daysToDeparture && dateItem.iso > isoDeparture)) {
          // Change return date, but only if it's after departure
          if (dateItem.iso > isoDeparture) {
            isReturnSelection = true;
          } else {
            // If trying to set return date before departure, change departure instead and reset return
            isDepartureSelection = true;
            needsReturnReset = true;
          }
        } else {
          // Change departure date
          isDepartureSelection = true;
          // If new departure is at or after current return, reset return
          if (dateItem.iso >= isoReturn) {
            needsReturnReset = true;
          }
        }
      } 
      // If we're in return selection mode or no return date exists and departure exists
      else if (selectionMode === 'return' || (isoDeparture && !isoReturn)) {
        // Check if selected date is after departure date
        if (dateItem.iso > isoDeparture) {
          isReturnSelection = true;
        } else {
          // Prevent selecting return date before or same as departure
          console.log('Cannot select return date before or same as departure date');
          return;
        }
      } else {
        isDepartureSelection = true;
        // Check if departure date is being changed and it's beyond current return date
        if (isoDeparture && isoReturn && dateItem.iso >= isoReturn) {
          needsReturnReset = true;
        }
      }
      
      setSelectedDate(dateItem.iso);
      setIsSearching(true);
      
      // If we need to reset return date
      if (needsReturnReset) {
        // Reset return date and show message
        setShowReturnMessage(true);
        setSelectionMode('return');
        
        // Hide message after 3 seconds
        setTimeout(() => {
          setShowReturnMessage(false);
        }, 3000);
      }
      
      // If this is a return date selection, switch back to departure mode
      if (isReturnSelection) {
        setSelectionMode('departure');
        setShowReturnMessage(false);
      }
      
      if (dateCardsContainerRef.current) {
        const index = visibleDates.findIndex(d => d.iso === dateItem.iso);
        if (index !== -1) {
          const scrollAmount = index * 83;
          dateCardsContainerRef.current.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      }
      
      // Format date in a format the parent component can use
      const formattedDate = dateItem.fullDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      
      if (onDateChange) {
        // Pass additional info about selection type
        const action = needsReturnReset ? 'resetReturn' : (isReturnSelection ? 'returnDate' : 'departureDate');
        console.log('📅 DateSelector action:', action, 'for date:', formattedDate);
        onDateChange(formattedDate, dateItem.fullDate, action);
        setTimeout(() => {
          setIsSearching(false);
        }, 1200);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-5 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
        <h3 className="text-sm sm:text-base font-medium text-gray-800">Select Travel Date</h3>
        {showReturnMessage && (
          <div className="bg-green-100 border border-green-300 text-green-800 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium animate-pulse">
            Please select return date
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Left Arrow */}
        <button 
          className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 shrink-0"
          onClick={handlePrevious}
          aria-label="Previous dates"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>        {/* Date Cards */}
        <div className="relative mt-2 flex-1 min-w-0">
          {/* Departure and Return Tags */}
          {(visibleDates.some(dateItem => {
            const isoDeparture = toISODate(departureDate);
            const isoSelected = selectedDate;
            return (isoDeparture ? isoDeparture : isoSelected) === dateItem.iso;
          }) || visibleDates.some(dateItem => {
            const isoReturn = toISODate(returnDate);
            return isoReturn === dateItem.iso;
          })) && (
            <div className="absolute -top-8 sm:-top-10 left-0 right-0 flex mb-4">
              {visibleDates.map((dateItem, tagIndex) => {
                const isoDeparture = toISODate(departureDate);
                const isoSelected = selectedDate;
                const isoReturn = toISODate(returnDate);
                const isDeparture = (isoDeparture ? isoDeparture : isoSelected) === dateItem.iso;
                const isReturn = isoReturn === dateItem.iso;
                
                return (
                  <div key={tagIndex} className="min-w-[60px] sm:min-w-[80px] mx-[3px] sm:mx-[6px] flex justify-center">
                    {isDeparture && (
                      <span className="bg-blue-600 text-white text-xs font-medium px-1 sm:px-2 py-1 rounded-md">
                        Departure
                      </span>
                    )}
                    {isReturn && (
                      <span className="bg-green-600 text-white text-xs font-medium px-1 sm:px-2 py-1 rounded-md">
                        Return
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          <div 
            ref={dateCardsContainerRef}
            className="flex overflow-x-auto space-x-2 sm:space-x-3 pb-2 no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {visibleDates.map((dateItem, index) => {
            const isoDeparture = toISODate(departureDate);
            const isoSelected = selectedDate;
            const isoReturn = toISODate(returnDate);
            const isDeparture = (isoDeparture ? isoDeparture : isoSelected) === dateItem.iso;
            const isReturn = isoReturn === dateItem.iso;
            // Debug log
            if (index === 0) {
              console.log('DEBUG DateSelector:', {
                isoDeparture,
                isoSelected,
                isoReturn,
                dateItemIso: dateItem.iso,
                departureDate,
                returnDate,
                selectedDate
              });
            }
            // Highlight between departure and return
            let buttonClass = '';
            const isBetween = (() => {
              if (isoDeparture && isoReturn && isoDeparture !== isoReturn) {
                return dateItem.iso > isoDeparture && dateItem.iso < isoReturn;
              }
              return false;
            })();
            
            // Check if date is selectable for return (only if in return selection mode)
            const isSelectableForReturn = selectionMode === 'return' && isoDeparture && dateItem.iso > isoDeparture;
            
            if (isDeparture) {
              buttonClass = 'bg-blue-600 text-white shadow-sm';
            } else if (isReturn) {
              buttonClass = 'bg-green-600 text-white shadow-sm';
            } else if (isBetween) {
              buttonClass = 'bg-gray-300 text-gray-700';
            } else if (isSelectableForReturn) {
              buttonClass = 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200';
            } else if (dateItem.isToday) {
              buttonClass = 'bg-blue-100 text-blue-700 border border-blue-200';
            } else {
              buttonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';
            }
            return (
              <button
                key={index}
                onClick={() => handleDateSelect(dateItem)}
                disabled={dateItem.isDisabled}
                id={isDeparture ? 'selected-date-card' : ''}
                className={`
                  rounded-lg p-1 sm:p-2 min-w-[60px] sm:min-w-[80px] h-[48px] sm:h-[58px] flex flex-col items-center justify-center
                  transition-all font-medium text-xs sm:text-sm shrink-0
                  ${dateItem.isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                  ${buttonClass}
                `}
                aria-pressed={isDeparture}
              >
                <span className="text-xs sm:text-sm font-semibold leading-tight">
                  {dateItem.day}
                </span>
                <span className="text-xs sm:text-sm mt-0.5 sm:mt-1 leading-tight">
                  {dateItem.date}
                </span>
              </button>
            );
          })}
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 shrink-0"
          onClick={handleNext}
          aria-label="Next dates"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DateSelector;