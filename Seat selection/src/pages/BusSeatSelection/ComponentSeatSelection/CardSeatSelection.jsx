import React from 'react';
import PropTypes from 'prop-types';

const CardSeatSelection = ({ 
  children, 
  className = '', 
  padding = 'default',
  shadow = true,
  rounded = true,
  ...props 
}) => {
  const baseClasses = 'bg-white';
  
  const paddingClasses = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };
  
  const shadowClass = shadow ? 'shadow-[0_2px_5px_rgba(0,0,0,0.1)]' : '';
  const roundedClass = rounded ? 'rounded-[16px]' : '';
  
  const cardClasses = `${baseClasses} ${paddingClasses[padding]} ${shadowClass} ${roundedClass} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

CardSeatSelection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'small', 'default', 'large']),
  shadow: PropTypes.bool,
  rounded: PropTypes.bool,
};

export default CardSeatSelection;