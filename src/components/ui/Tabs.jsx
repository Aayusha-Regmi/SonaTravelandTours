import React, { useState } from 'react';

const Tabs = ({ tabs, defaultActiveTab = 0, onTabChange, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };  return (
    <div className={`w-full ${className}`}>
      {/* Tab Navigation */}
      <div className="relative bg-gray-50/50 border-b border-gray-200">
        {/* Tab Buttons */}
        <div className="flex items-center overflow-x-auto scrollbar-hide px-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-opensans transition-all duration-200 border-b-2 ${
                activeTab === index
                  ? 'font-medium text-blue-600 border-blue-600'
                  : 'font-normal text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;