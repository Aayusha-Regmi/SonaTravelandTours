import React, { useState } from 'react';

const InputField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  disabled = false,
  required = false,
  error,
  className = '',
  showPasswordToggle = false,
  icon,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? 'password' : 'text');
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label className="text-[20px] font-bold leading-[28px] text-[#5f5f5f] font-opensans">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="bg-[#f5f5f5] rounded-[12px] h-[80px] flex items-center px-4 border border-transparent focus-within:border-[#0a639d]">
          {icon && (
            <div className="flex-shrink-0 mr-3">
              {icon}
            </div>
          )}
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 bg-transparent text-[18px] font-semibold leading-[25px] text-[#d9d9d9] placeholder-[#d9d9d9] focus:outline-none focus:text-[#3d3d3d] font-opensans"
            {...props}
          />
          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="flex-shrink-0 ml-3 p-1 hover:bg-gray-200 rounded"
            >
              <img
                src="/images/img_hicon_outline_show.svg"
                alt={showPassword ? 'Hide password' : 'Show password'}
                className="w-[24px] h-[24px]"
              />
            </button>
          )}
        </div>
      </div>
      {error && (
        <span className="text-red-500 text-sm font-opensans">{error}</span>
      )}
    </div>
  );
};

export default InputField;