import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center w-full max-w-[1043px] mx-auto">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step */}
          <div className={`flex flex-col items-center ${
            index === 0 ? 'w-[175px]' : 
            index === 1 ? 'w-[244px]': 'w-[140px]'
          }`}>
            <div className={`w-full h-[96px] rounded-[8px] flex flex-col items-center justify-center ${
              index < currentStep ? 'bg-white' :
              index === currentStep ? 'bg-[#e7eff5]' : 'bg-white'
            }`}>
              <span className={`text-[20px] font-semibold mb-1 font-opensans ${
                index < currentStep ? 'text-[#b0b0b0]' :
                index === currentStep ? 'text-[#0a639d]' : 'text-[#b0b0b0]'
              }`}>
                Step {index + 1}
              </span>
              <span className={`text-[24px] font-bold font-opensans ${
                index < currentStep ? 'text-[#b0b0b0]' :
                index === currentStep ? 'text-[#0a639d]' : 'text-[#b0b0b0]'
              }`}>
                {step}
              </span>
            </div>
          </div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="w-[178px] h-[2px] bg-[#347eae] mx-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

ProgressBar.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default ProgressBar;