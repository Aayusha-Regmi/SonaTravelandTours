// /home/ubuntu/app/niki_s_application/src/components/ui/Stepper.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center w-full h-[96px]">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step */}
          <div className={`flex flex-col items-center ${index + 1 === currentStep ? 'bg-[#e7eff5]' : 'bg-white'} rounded-[8px] h-[96px] justify-center ${
            index === 0 ? 'w-[175px]' : index === 1 ? 'w-[244px]' : 'w-[140px]'
          }`}>
            <span className={`text-[20px] font-semibold font-opensans ${
              index + 1 <= currentStep ? 'text-[#0a639d]' : 'text-[#b0b0b0]'
            }`}>
              Step {index + 1}
            </span>
            <span className={`text-[24px] font-bold font-opensans ${
              index + 1 <= currentStep ? 'text-[#0a639d]' : 'text-[#b0b0b0]'
            }`}>
              {step}
            </span>
          </div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="w-[178px] h-[2px] bg-[#9bbfd7] mx-2"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default Stepper;