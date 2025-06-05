import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'font-opensans font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';
  
  const variants = {
    primary: 'bg-[#0a639d] text-white hover:bg-[#084d7a] disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400',
  };

  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed' : ''} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;