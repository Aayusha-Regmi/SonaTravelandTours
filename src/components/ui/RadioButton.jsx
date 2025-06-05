import React from 'react';

const RadioButton = ({ 
  label, 
  name,
  value,
  checked = false, 
  onChange, 
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div 
          className={`
            w-[18px] h-[18px] rounded-full border-2 transition-colors cursor-pointer flex items-center justify-center
            ${checked 
              ? 'border-[#0a639d]' 
              : 'border-[#b0b0b0]'
            }
            ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          `}
          onClick={() => !disabled && onChange(value)}
        >
          {checked && (
            <div className="w-[8px] h-[8px] rounded-full bg-[#0a639d]"></div>
          )}
        </div>
      </div>
      {label && (
        <label 
          className="text-[14px] font-semibold leading-[20px] text-[#5f5f5f] font-opensans cursor-pointer"
          onClick={() => !disabled && onChange(value)}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default RadioButton;