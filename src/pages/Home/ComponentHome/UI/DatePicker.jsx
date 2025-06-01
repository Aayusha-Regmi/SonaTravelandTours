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
  maxDate = null         // Optional maximum date
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
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
  
  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prev.getMonth() - 1);
      return prevMonth;
    });
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(prev.getMonth() + 1);
      return nextMonth;
    });
  };
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
        <div key={`empty-${i}`} className="h-10 w-10"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const disabled = isDateDisabled(day);
      const isCurrentDay = isToday(day);
      const isSelectedDay = isSelected(day);
      
      days.push(
        <div key={`day-${day}`} className="h-10 w-10 flex items-center justify-center p-0.5">
          <button
            type="button"
            onClick={() => handleDateClick(day)}
            disabled={disabled}
            className={`
              h-full w-full rounded-lg flex items-center justify-center text-sm transition-all duration-200
              ${isSelectedDay 
                ? 'bg-[#0a639d] text-white font-bold shadow-md transform scale-105' 
                : isCurrentDay 
                  ? 'bg-blue-100 text-[#0a639d] font-bold ring-1 ring-[#0a639d]' 
                  : 'hover:bg-gray-100'}
              ${disabled 
                ? 'opacity-30 cursor-not-allowed hover:bg-transparent line-through' 
                : 'hover:scale-110'}
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
        <label className="block text-[#5f5f5f] font-bold text-2xl mb-2 flex items-center">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          <svg className="w-5 h-5 ml-2 text-[#0a639d] opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </label>
      )}
        <div className="relative" ref={calendarRef}>
        <button
          type="button"
          className={`w-full px-4 py-4 bg-[#f5f5f5] rounded-xl text-lg font-semibold flex justify-between items-center hover:bg-[#efefef] focus:outline-none focus:ring-2 focus:ring-blue-300 border border-transparent hover:border-[#0a639d]/20 transition-all duration-200 shadow-sm ${animate ? 'animate-pulse' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            <span className={`${value ? 'text-[#5f5f5f]' : 'text-[#a9a9a9]'} mr-2`}>
              {value || placeholder}
            </span>
            {value && (
              <span className="bg-[#0a639d]/10 text-[#0a639d] text-xs px-2 py-0.5 rounded-full">
                Selected
              </span>
            )}
          </div>
          <span className={`flex items-center justify-center h-8 w-8 rounded-full ${isOpen ? 'bg-[#0a639d]/10' : ''}`}>
            <svg 
              className={`w-6 h-6 text-[#0a639d] transition-all duration-300 ${isOpen ? 'rotate-180 scale-110' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </span>
        </button>
          {isOpen && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[350px] bg-white rounded-xl shadow-2xl p-4 z-50 border border-gray-100 animate-fadeIn transition-all duration-300 ease-out">
            {/* Triangle indicator pointing to input field */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
            </div>
            {/* Calendar header with gradient background */}
            <div className="flex justify-between items-center mb-4 bg-gradient-to-r from-[#0a639d] to-[#1a85c9] rounded-lg p-3 text-white shadow-sm">
              <button 
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 hover:bg-white/20 rounded-full flex items-center justify-center focus:outline-none transition-all duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="text-lg font-bold text-white">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              
              <button 
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 hover:bg-white/20 rounded-full flex items-center justify-center focus:outline-none transition-all duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map(day => (
                <div key={day} className="text-center text-xs font-medium text-[#0a639d]">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1 mt-3">
              {renderDays()}
            </div>              <div className="mt-5 pt-3 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-100 to-blue-200 text-[#0a639d] rounded-lg hover:shadow-md transition-all duration-200 focus:outline-none font-medium"
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
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Today
                </div>
              </button>
              
              <button
                type="button"
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 focus:outline-none font-medium"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Close
                </div>
              </button>
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
  className: PropTypes.string
};

export default DatePicker;
