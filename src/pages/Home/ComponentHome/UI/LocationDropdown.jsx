import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const LocationDropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select location',
  name,
  required = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  
  const selectedOption = options.find(option => option.value === value);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm('');
    setFilteredOptions(options);
    
    // Focus search input when dropdown opens
    if (!isOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  };
  
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = options.filter(option => 
      option.label.toLowerCase().includes(term) || 
      (option.description && option.description.toLowerCase().includes(term))
    );
    
    setFilteredOptions(filtered);
  };
  
  const handleOptionSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    // Handle keyboard navigation
  const handleKeyDown = (e, option) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionSelect(option);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>      {label && (
        <label className="block text-[#5f5f5f] font-semibold text-sm mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
        <button
        type="button"
        onClick={toggleDropdown}
        className="w-full px-4 h-[50px] bg-[#f5f5f5] rounded-xl text-sm font-medium flex justify-between items-center hover:bg-[#efefef] focus:outline-none focus:ring-2 focus:ring-blue-300 border border-transparent hover:border-[#0a639d]/20 transition-all duration-200 shadow-sm"
      >
        <span className={selectedOption ? 'text-[#5f5f5f]' : 'text-[#d9d9d9]'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`flex items-center justify-center h-8 w-8 rounded-full ${isOpen ? 'bg-[#0a639d]/10' : ''}`}>
          <img 
            src="/images/img_hicon_linear_down_2.svg" 
            alt="Down Arrow" 
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto border border-gray-200">
          {/* Search box */}
          <div className="sticky top-0 bg-white p-2 border-b border-gray-100">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search locations..."
                className="w-full p-2 pl-8 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <div className="absolute left-2 top-2.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Location options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (              <div 
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                onKeyDown={(e) => handleKeyDown(e, option)}
                className={`p-3 sm:p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 focus:outline-none focus:bg-blue-50 transition-colors duration-150 ${option.value === value ? 'bg-blue-50' : ''}`}
                tabIndex="0"
                role="option"
                aria-selected={option.value === value}
              >
                <div className="flex items-center">
                  {option.value === value && (
                    <span className="mr-2 text-[#0a639d]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                  )}
                  <div className="text-[#3d3d3d] text-sm font-semibold">{option.label}</div>
                </div>
                {option.description && (
                  <div className="text-[#8f8f8f] text-xs mt-1 ml-6">{option.description}</div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No locations match your search
            </div>
          )}
        </div>
      )}
    </div>
  );
};

LocationDropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  ),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string
};

export default LocationDropdown;
