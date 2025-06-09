import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'p-4',
  shadow = 'shadow-md',
  rounded = 'rounded-[16px]',
  background = 'bg-white',
  ...props 
}) => {
  const cardClasses = `${background} ${rounded} ${shadow} ${padding} ${className}`;

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;