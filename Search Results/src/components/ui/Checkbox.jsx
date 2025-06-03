import React from 'react';

const Checkbox = ({ 
  label, 
  checked = false, 
  onChange, 
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div 
          className={`
            w-[18px] h-[18px] rounded-[5px] border transition-colors cursor-pointer
            ${checked 
              ? 'bg-white border-[#0a639d] border-1' 
              : 'bg-white border-[#b0b0b0] border-1'
            }
            ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          `}
          onClick={() => !disabled && onChange(!checked)}
        >
          {checked && (
            <img 
              src="/images/img_hicon_outline_tick.svg" 
              alt="checked" 
              className="w-[14px] h-[14px] absolute top-[2px] left-[2px]"
            />
          )}
        </div>
      </div>
      {label && (
        <label 
          className="text-[14px] font-semibold leading-[20px] text-[#5f5f5f] font-opensans cursor-pointer"
          onClick={() => !disabled && onChange(!checked)}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;