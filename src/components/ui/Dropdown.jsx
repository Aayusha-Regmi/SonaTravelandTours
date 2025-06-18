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
  icon,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputId = id || name;

  // Check if options are simple strings or complex objects with value/label
  const isObjectOptions = options.length > 0 && typeof options[0] !== 'string';
  
  // Find selected option (works with both string options and object options)
  const selectedOption = isObjectOptions 
    ? options.find(option => option.value === value)
    : value;
  
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
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
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[12px] shadow-lg z-50 max-h-60 overflow-y-auto">
            {isObjectOptions ? (
              options.map((option, index) => (
                <div 
                  key={option.value || index}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full px-4 py-3 text-left hover:bg-[#f5f5f5] transition-colors cursor-pointer first:rounded-t-[12px] last:rounded-b-[12px]"
                >
                  <div className="text-[16px] font-bold font-opensans text-[#3d3d3d]">
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
              options.map((option, index) => (
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
  icon: PropTypes.node
};

export default Dropdown;