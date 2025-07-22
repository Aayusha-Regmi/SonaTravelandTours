import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  name,
  id,
  error,
  className = '',
  containerClassName = '',
  labelClassName = '',
  required = false,
  disabled = false,
  searchable = false,
  icon,
  onKeyPress,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const inputId = id || name;

  // Check if options are simple strings or complex objects with value/label
  const isObjectOptions = options.length > 0 && typeof options[0] !== 'string';
  
  // Filter options based on search term
  const filteredOptions = searchable && searchTerm 
    ? options.filter(option => {
        const searchText = isObjectOptions 
          ? `${option.label} ${option.description || ''}`.toLowerCase()
          : option.toLowerCase();
        return searchText.includes(searchTerm.toLowerCase());
      })
    : options;
  
  // Find selected option (works with both string options and object options)
  const selectedOption = isObjectOptions 
    ? options.find(option => option.value === value)
    : value;
  
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        // Focus search input when opening dropdown
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    }
  };
  
  const handleOptionSelect = (option) => {
    if (isObjectOptions) {
      // For object options with { value, label } format
      onChange(name ? { target: { name, value: option.value } } : option.value);
    } else {
      // For simple string options (maintain backward compatibility)
      onChange(name ? { target: { name, value: option } } : option);
    }
    setIsOpen(false);
    setSearchTerm(''); // Clear search when option is selected
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (onKeyPress && e.key && e.key.length === 1) {
      // Call the onKeyPress prop with the pressed key
      onKeyPress(e.key);
      e.preventDefault(); // Prevent default behavior
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm(''); // Clear search when closing
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className={`relative ${containerClassName}`} ref={dropdownRef}>      {label && (
        <label 
          htmlFor={inputId} 
          className={`block text-[#5f5f5f] font-medium text-sm mb-1.5 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">        <button
          type="button"
          id={inputId}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            w-full px-3 py-2.5 rounded-lg bg-[#f5f5f5]
            text-left text-sm font-normal
            focus:outline-none focus:ring-2 focus:ring-[#0a639d]
            disabled:bg-gray-100 disabled:cursor-not-allowed
            flex items-center justify-between
            ${error ? 'border border-red-500' : 'border-none'}
            ${className}
          `}
          {...props}
        >{isObjectOptions ? (
            <div>
              <div className={selectedOption ? 'text-[#3d3d3d] text-sm font-normal' : 'text-[#8f8f8f] text-sm font-normal'}>
                {selectedOption ? selectedOption.label : placeholder}
              </div>
              {selectedOption && selectedOption.description && (
                <div className="text-sm text-[#8f8f8f]">
                  {selectedOption.description}
                </div>
              )}
            </div>
          ) : (
            <span className={selectedOption ? 'text-[#3d3d3d] text-sm font-normal' : 'text-[#8f8f8f] text-sm font-normal'}>
              {selectedOption || placeholder}
            </span>
          )}
          
          {icon || (
            <img 
              src="/images/img_hicon_linear_down_2_gray_500.svg" 
              alt="dropdown" 
              className={`w-[24px] h-[24px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          )}
        </button>

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[12px] shadow-2xl z-[9999] max-h-60 overflow-y-auto">
            {searchable && (
              <div className="sticky top-0 bg-white border-b border-gray-100 p-3 z-[10000]">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a639d] focus:border-transparent"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                {searchable && searchTerm ? 'No results found' : 'No options available'}
              </div>
            ) : (
              <>
                {isObjectOptions ? (
                  filteredOptions.map((option, index) => (
                    <div 
                      key={option.value || index}
                      onClick={() => handleOptionSelect(option)}
                      className="w-full px-4 py-3 text-left hover:bg-[#f5f5f5] transition-colors cursor-pointer first:rounded-t-[12px] last:rounded-b-[12px]"
                    >
                      <div className="text-[16px] font-opensans text-[#3d3d3d]">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-[14px] font-opensans text-[#8f8f8f]">
                          {option.description}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  filteredOptions.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleOptionSelect(option)}
                      className="w-full px-4 py-3 text-left text-[16px] font-opensans hover:bg-[#f5f5f5] transition-colors first:rounded-t-[12px] last:rounded-b-[12px]"
                    >
                      {option}
                    </button>
                  ))
                )}
              </>
            )}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
        description: PropTypes.string
      })
    ])
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  icon: PropTypes.node,
  onKeyPress: PropTypes.func
};

export default Dropdown;