import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const DatePicker = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "Select date", 
  name, 
  required = false,
  className = "",
  minDate = new Date(),  // Default minimum date is today
  maxDate = null,        // Optional maximum date
  disabled = false,      // Whether the datepicker is disabled
  isReturnDate = false   // Whether this is a return date picker for special handling
}) => {  
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value.split(' ').join(' ')) : new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value.split(' ').join(' ')) : null);
  const [animate, setAnimate] = useState(false);
  const calendarRef = useRef(null);
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const formatDate = (date) => {
    if (!date) return "";
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    // Format: 01 Jun 2025 (add leading zero to day)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day < 10 ? '0' + day : day} ${monthNames[month - 1]} ${year}`;
  };
  
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };
    // Handle month navigation
  const handleMonthChange = (change) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + change);
      return newDate;
    });
  };
  
  const handlePrevMonth = () => {
    handleMonthChange(-1);
  };
  
  const handleNextMonth = () => {
    handleMonthChange(1);
  };
  
  // Make sure we can navigate through all months properly
  const goToSpecificMonth = (month, year) => {
    const newDate = new Date();
    newDate.setMonth(month);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
  };
  
  const handleReset = () => {
    setSelectedDate(null);
    onChange({ target: { name, value: '' } });
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
    setIsOpen(false);
  };  // Ensure the calendar is visible when opening
  useEffect(() => {
    if (isOpen) {
      // Set current month to selected date if available, otherwise current date
      if (selectedDate) {
        // Create a fresh Date object to avoid reference issues
        const newDate = new Date(selectedDate);
        setCurrentMonth(newDate);
      } else if (minDate && new Date() < new Date(minDate)) {
        const newDate = new Date(minDate);
        setCurrentMonth(newDate);
      } else {
        // Always create a fresh Date object
        const today = new Date();
        setCurrentMonth(today);
      }
      
      // Enhanced scrolling to make the calendar fully visible
      setTimeout(() => {
        if (calendarRef.current) {
          const rect = calendarRef.current.getBoundingClientRect();
          const calendarHeight = rect.height;
          const viewportHeight = window.innerHeight;
          const isCalendarBelowViewport = rect.bottom > viewportHeight;
          const isCalendarPartiallyVisible = rect.top < 0 || rect.bottom > viewportHeight;
          const isCalendarTooTall = calendarHeight > viewportHeight * 0.8; // Calendar takes up more than 80% of viewport
          
          if (isCalendarBelowViewport || isCalendarPartiallyVisible) {
            // Calculate the optimal scroll position
            let scrollPosition;
            
            if (isCalendarTooTall) {
              // If calendar is very tall, position it near the top of the viewport
              scrollPosition = rect.top + window.scrollY - 50; // 50px from top
            } else {
              // Center the calendar in the viewport
              scrollPosition = rect.top + window.scrollY - ((viewportHeight - calendarHeight) / 2);
            }
            
            window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 150); // Increased delay to ensure DOM is fully updated
    }
  }, [isOpen, selectedDate, minDate]);
  
  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    // Only allow selection if date is not disabled
    if (!isDateDisabled(day)) {
      setSelectedDate(newDate);
      onChange({ target: { name, value: formatDate(newDate) } });
      
      // Add animation effect
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
      
      // Close dropdown
      setIsOpen(false);
    }
  };
  
  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };
  
  const isSelected = (day) => {
    return selectedDate && 
           day === selectedDate.getDate() && 
           currentMonth.getMonth() === selectedDate.getMonth() && 
           currentMonth.getFullYear() === selectedDate.getFullYear();
  };
  
  const isDateDisabled = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    // Check if date is before minimum date
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) {
      return true;
    }
    
    // Check if date is after maximum date
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) {
      return true;
    }
    
    return false;
  };
  
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const firstDay = getFirstDayOfMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-[30px]"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const disabled = isDateDisabled(day);
      const isCurrentDay = isToday(day);
      const isSelectedDay = isSelected(day);
      
      days.push(
        <div key={`day-${day}`} className="h-[30px] flex items-center justify-center">
          <button
            type="button"
            onClick={() => handleDateClick(day)}
            disabled={disabled}
            className={`
              h-7 w-7 rounded-md flex items-center justify-center text-xs font-medium transition-all duration-200
              ${isSelectedDay 
                ? 'bg-[#0a639d] text-white font-bold' 
                : isCurrentDay 
                  ? 'bg-blue-100 text-[#0a639d] font-bold ring-1 ring-[#0a639d]' 
                  : 'hover:bg-gray-100'}
              ${disabled 
                ? 'opacity-30 cursor-not-allowed hover:bg-transparent line-through' 
                : 'hover:bg-blue-50 hover:text-[#0a639d]'}
            `}
          >
            {day}
          </button>
        </div>
      );
    }
    
    return days;
  };
  
  // Close the calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-[#5f5f5f] font-semibold text-sm mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative" ref={calendarRef}>
        <button
          type="button"
          className={`w-full px-4 h-[50px] bg-[#f5f5f5] rounded-xl text-sm font-medium flex justify-between items-center 
            ${!disabled && 'hover:bg-[#efefef]'} focus:outline-none focus:ring-2 focus:ring-blue-300 
            border border-transparent ${!disabled && 'hover:border-[#0a639d]/20'} 
            transition-all duration-200 shadow-sm ${animate ? 'animate-pulse' : ''} 
            ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <div className="flex items-center">
            <span className={`${value ? 'text-[#5f5f5f]' : 'text-[#a9a9a9]'}`}>
              {value || placeholder}
            </span>
          </div>
          <span className={`flex items-center justify-center h-8 w-8 rounded-full ${isOpen ? 'bg-[#0a639d]/10' : ''}`}>
            <svg 
              className={`w-5 h-5 text-[#0a639d] transition-all duration-300 ${isOpen ? 'rotate-180 scale-110' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>            {isOpen && (
          <div className="absolute left-0 right-0 mt-2 z-50">
            <div className="relative bg-white rounded-xl shadow-2xl p-4 border-2 border-[#0a639d]/20 animate-slideDown transition-all duration-200 ease-out max-h-[400px] overflow-auto">
              {/* Close button in the corner */}
              <button 
                type="button"
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none flex items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
                  {/* Calendar header with month and year */}
              <div className="mb-3">
                <div className="flex justify-between items-center bg-gradient-to-r from-[#0a639d] to-[#1a85c9] rounded-lg p-3 text-white shadow-md">
                  <button 
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1.5 hover:bg-white/20 rounded-full flex items-center justify-center focus:outline-none transition-all duration-200"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="text-base font-bold text-white select-none">
                    {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </div>
                  
                  <button 
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1.5 hover:bg-white/20 rounded-full flex items-center justify-center focus:outline-none transition-all duration-200"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Day headers */}
              <div className="grid grid-cols-7 h-[28px] mb-1">
                {days.map(day => (
                  <div key={day} className="flex items-center justify-center text-xs font-semibold text-[#0a639d]">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid with fixed height */}
              <div className="grid grid-cols-7 gap-1 mb-2 h-[180px]">
                {renderDays()}
              </div>
              
              {/* Footer buttons */}
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 focus:outline-none font-medium"
                  onClick={handleReset}
                >
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Reset
                  </div>
                </button>
                
                <button
                  type="button"
                  className="px-4 py-2 text-xs bg-blue-50 text-[#0a639d] rounded-lg hover:bg-blue-100 transition-all duration-200 focus:outline-none font-medium"
                  onClick={() => {
                    const today = new Date();
                    setCurrentMonth(today);
                    setSelectedDate(today);
                    onChange({ target: { name, value: formatDate(today) } });
                    setIsOpen(false);
                    setAnimate(true);
                    setTimeout(() => setAnimate(false), 300);
                  }}
                >
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Today
                  </div>
                </button>              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disabled: PropTypes.bool,
  isReturnDate: PropTypes.bool
};

export default DatePicker;
