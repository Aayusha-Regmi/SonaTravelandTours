import React, { useState } from 'react';

const Tabs = ({ tabs, defaultActiveTab = 0, onTabChange, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Navigation */}
      <div className="relative">
        {/* Top Border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#b0b0b0]"></div>
        
        {/* Tab Buttons */}
        <div className="flex items-center justify-start space-x-8 px-4 py-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`text-[20px] leading-[28px] font-opensans transition-colors duration-200 ${
                activeTab === index
                  ? 'font-bold text-[#3d3d3d]'
                  : 'font-normal text-[#8f8f8f] hover:text-[#3d3d3d]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#b0b0b0]"></div>
        
        {/* Active Tab Indicator */}
        <div 
          className="absolute bottom-0 h-[2px] bg-[#3d3d3d] transition-all duration-300"
          style={{
            left: `${(activeTab * 156) + 171}px`,
            width: '156px'
          }}
        ></div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;