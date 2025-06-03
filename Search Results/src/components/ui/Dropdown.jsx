import React, { useState } from 'react';

const Dropdown = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-[20px] font-semibold leading-[28px] text-[#8f8f8f] font-opensans mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-[12px] bg-[#f5f5f5] border-none
            text-left text-[18px] font-opensans leading-[25px]
            focus:outline-none focus:ring-2 focus:ring-[#0a639d]
            disabled:bg-gray-100 disabled:cursor-not-allowed
            flex items-center justify-between
            ${className}
          `}
          {...props}
        >
          <span className={value ? 'text-[#3d3d3d] font-bold' : 'text-[#8f8f8f] font-semibold'}>
            {value || placeholder}
          </span>
          <img 
            src="/images/img_hicon_linear_down_2_gray_500.svg" 
            alt="dropdown" 
            className={`w-[24px] h-[24px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[12px] shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full px-4 py-3 text-left text-[16px] font-opensans hover:bg-[#f5f5f5] transition-colors first:rounded-t-[12px] last:rounded-b-[12px]"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;