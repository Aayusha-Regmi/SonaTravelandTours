import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  className = '',
  icon,
  buttonType = 'default', // Add this prop to explicitly control styling
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded transition-colors duration-200 focus:outline-none flex items-center justify-center';
  const baseClassSearch = 'font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center';
   const baseClassesSelectSeat = 'font-bold rounded-[12px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center font-opensans';
  const variants = {
    primary: 'bg-[#0a639d] text-white hover:bg-[#085283] disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400',
     danger: 'bg-[#d85f66] text-white hover:bg-[#c54d54] disabled:bg-gray-400',
    warning: 'bg-[#ff8f1f] text-white hover:bg-[#e67e1c] disabled:bg-gray-400',
  };
  
  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',  };
    // Determine which base classes to use based on buttonType prop
  let finalClasses;
  if (buttonType === 'selectseat') {
    finalClasses = `${baseClassesSelectSeat} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed' : ''} ${className}`;
  } else if (buttonType === 'search') {
    finalClasses = `${baseClassSearch} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed' : ''} ${className}`;
  } else {
    finalClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed' : ''} ${className}`;
  }
  
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled} 
      className={finalClasses}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  icon: PropTypes.node,
  buttonType: PropTypes.oneOf(['default', 'search', 'selectseat'])
};

export default Button;