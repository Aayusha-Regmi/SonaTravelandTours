import React, { useState } from 'react';

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState('Mar 12');

  const dates = [
    { day: 'Mon', date: 'Mar 11' },
    { day: 'Mon', date: 'Mar 11' },
    { day: 'Mon', date: 'Mar 11' },
    { day: 'Mon', date: 'Mar 11' },
    { day: 'Mon', date: 'Mar 11' },
    { day: 'Tue', date: 'Mar 12' },
    { day: 'Wed', date: 'Mar 13' },
    { day: 'Thu', date: 'Mar 14' },
    { day: 'Fri', date: 'Mar 15' },
    { day: 'Sat', date: 'Mar 16' },
    { day: 'Sun', date: 'Mar 17' },
  ];

  return (
    <div className="flex items-center space-x-[20px] mb-[55px]">
      {/* Left Arrow */}
      <button className="p-2">
        <img 
          src="/images/img_hicon_linear_left_circle_2.svg" 
          alt="previous" 
          className="w-[28px] h-[28px]"
        />
      </button>

      {/* Date Cards */}
      <div className="flex space-x-[20px]">
        {dates.map((dateItem, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(dateItem.date)}
            className={`
              rounded-[8px] p-[8px] w-[83px] h-[58px] flex flex-col items-center justify-center
              transition-colors font-opensans
              ${selectedDate === dateItem.date 
                ? 'bg-[#0a639d] text-white' 
                : 'bg-[#ececec] text-[#8f8f8f] hover:bg-[#d0d0d0]'
              }
            `}
          >
            <span className={`
              text-[16px] font-semibold leading-[21px]
              ${selectedDate === dateItem.date ? 'text-[#ececec]' : 'text-[#8f8f8f]'}
            `}>
              {dateItem.day}
            </span>
            <span className={`
              text-[18px] font-bold leading-[24px]
              ${selectedDate === dateItem.date ? 'text-white' : 'text-[#8f8f8f]'}
            `}>
              {dateItem.date}
            </span>
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button className="p-2">
        <img 
          src="/images/img_hicon_linear_right_circle_2.svg" 
          alt="next" 
          className="w-[28px] h-[28px]"
        />
      </button>
    </div>
  );
};

export default DateSelector;