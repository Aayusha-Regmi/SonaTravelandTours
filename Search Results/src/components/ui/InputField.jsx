import React from 'react';

const InputField = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  disabled = false,
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-[20px] font-semibold leading-[28px] text-[#8f8f8f] font-opensans">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-[12px] bg-[#f5f5f5] border-none
            text-[18px] font-opensans leading-[25px]
            placeholder:text-[#8f8f8f] placeholder:font-semibold
            focus:outline-none focus:ring-2 focus:ring-[#0a639d]
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'ring-2 ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-red-500 text-sm font-opensans">{error}</span>
      )}
    </div>
  );
};

export default InputField;