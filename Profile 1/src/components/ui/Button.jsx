import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  className = '',
  icon,
  ...props 
}) => {
  const baseClasses = 'font-bold rounded-[12px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2 font-opensans';
  
  const variants = {
    primary: 'bg-[#0a639d] text-white hover:bg-[#084d7a] disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400',
    edit: 'text-[#0a639d] hover:text-[#084d7a] bg-transparent'
  };
  
  const sizes = {
    small: 'px-3 py-1 text-sm h-[40px]',
    medium: 'px-4 py-2 text-base h-[60px]',
    large: 'px-6 py-3 text-lg h-[60px]',
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
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;