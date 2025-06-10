import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '',
  padding = 'default',
  border = true,
  shadow = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-[16px]';
  
  const paddingClasses = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };
  
  const borderClass = border ? 'border border-[#ececec]' : '';
  const shadowClass = shadow ? 'shadow-md' : '';
  
  const cardClasses = `${baseClasses} ${paddingClasses[padding]} ${borderClass} ${shadowClass} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'small', 'default', 'large']),
  border: PropTypes.bool,
  shadow: PropTypes.bool,
};

export default Card;