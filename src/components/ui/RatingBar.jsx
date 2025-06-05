import React from 'react';

const RatingBar = ({ 
  rating = 0, 
  maxRating = 5, 
  size = 'medium',
  readonly = false,
  onChange,
  className = '',
  ...props 
}) => {
  const sizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-6 h-6',
  };

  const handleStarClick = (starIndex) => {
    if (!readonly && onChange) {
      onChange(starIndex + 1);
    }
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`} {...props}>
      {Array.from({ length: maxRating }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleStarClick(index)}
          disabled={readonly}
          className={`
            ${sizes[size]} 
            ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} 
            transition-transform
          `}
        >
          <svg
            viewBox="0 0 24 24"
            fill={index < rating ? '#fbbf24' : '#e5e7eb'}
            className="w-full h-full"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default RatingBar;