import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center w-full max-w-3xl mx-auto px-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step */}
          <div className="flex flex-col items-center relative">
            {/* Step Number Circle */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 mb-2 ${
              index < currentStep 
                ? 'bg-[#0a639d] border-[#0a639d] text-white' 
                : index === currentStep 
                ? 'bg-[#0a639d] border-[#0a639d] text-white' 
                : 'bg-white border-gray-300 text-gray-400'
            }`}>
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-sm font-bold">{index + 1}</span>
              )}
            </div>
            
            {/* Step Label */}
            <div className="text-center">
              <span className={`text-xs font-medium text-gray-500 block mb-1 font-opensans`}>
                Step {index + 1}
              </span>
              <span className={`text-sm font-semibold font-opensans ${
                index <= currentStep ? 'text-[#0a639d]' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
          </div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="flex-1 mx-4 mt-[-20px] mb-8">
              <div className={`h-0.5 transition-all duration-200 ${
                index < currentStep ? 'bg-[#0a639d]' : 'bg-gray-300'
              }`}></div>
            </div>
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
