import React from 'react';
import PropTypes from 'prop-types';

const Chip = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200 font-opensans';
  
  const variants = {
    default: 'bg-[#f5f5f5] text-[#3d3d3d] border border-[#ececec]',
    primary: 'bg-[#0a639d] text-white',
    secondary: 'bg-[#e7eff5] text-[#0a639d]',
    success: 'bg-[#388b68] text-white',
    warning: 'bg-[#f5c21e] text-[#3d3d3d]',
  };
  
  const sizes = {
    small: 'px-2 py-1 text-[12px] h-[24px]',
    medium: 'px-3 py-1 text-[14px] h-[28px]',
    large: 'px-4 py-2 text-[16px] h-[32px]',
  };
  
  const chipClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`;
  
  return (
    <span
      className={chipClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
};

Chip.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Chip;