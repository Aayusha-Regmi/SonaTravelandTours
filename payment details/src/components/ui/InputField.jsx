import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ 
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 rounded-[12px] border border-[#b0b0b0] bg-[#f5f5f5] text-[18px] font-semibold text-[#3d3d3d] placeholder-[#d9d9d9] focus:outline-none focus:ring-2 focus:ring-[#0a639d] focus:border-transparent font-opensans';
  
  const inputClasses = `${baseClasses} ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`;
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={inputClasses}
      {...props}
    />
  );
};

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default InputField;