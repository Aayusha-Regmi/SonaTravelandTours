import React from 'react';

const Chip = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  selected = false,
  onClick,
  onRemove,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClassSearch = 'inline-flex items-center rounded-[13px] font-opensans transition-colors';
    const variants = {
    default: selected 
      ? 'bg-[#0a639d] text-white' 
      : 'bg-[#f5f5f5] text-[#5f5f5f] hover:bg-[#ececec]',
    rating: 'bg-[#d85f66] text-white flex items-center',
    new: 'bg-[#ff8f1f] text-white',
    facility: 'bg-[#f5f5f5] text-[#3d3d3d]',
  };

  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base',
  };

  const chipClasses = `
    ${baseClassSearch} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${onClick && !disabled ? 'cursor-pointer' : ''} 
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <span
      className={chipClasses}
      onClick={handleClick}
      {...props}
    >
      {variant === 'rating' && (
        <img 
          src="/images/img_hicon_outline_tick.svg" 
          alt="star" 
          className="w-[12px] h-[12px] mr-2 bg-white rounded-full p-1"
        />
      )}
      {children}
      {onRemove && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-2 text-current hover:text-red-500 transition-colors"
        >
          ×
        </button>
      )}
    </span>
  );
};

export default Chip;